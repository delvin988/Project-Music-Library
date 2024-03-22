const { comparePass } = require("../helper/bycrypt");
const { signToken } = require("../helper/jwt");
const { Favourite, User, Order, sequelize } = require("../models/index");
const midtransClient = require("midtrans-client");
const axios = require("axios");
const {OAuth2Client} = require('google-auth-library');
const oauth2Client = new OAuth2Client();

class controller {
   static async login(req, res, next) {
      try {
         const { email, password } = req.body;
         if (!email) throw { name: "EmailRequired" };
         if (!password) throw { name: "PasswordRequired" };

         const user = await User.findOne({ where: { email } });
         if (!user) throw { name: "InvalidUser" };

         const comparedUser = comparePass(password, user.password);
         if (!comparedUser) throw { name: "InvalidUser" };

         const access_token = signToken({ id: user.id });

         res.status(200).json({ message: "Success Login", access_token });
      } catch (error) {
         next(error);
      }
   }

   static async register(req, res, next) {
      const { username, email, password } = req.body;
      const roleMember = "Member";
      try {
         const created = await User.create({ username, email, password, role: roleMember });
         res.status(201).json({
            data: {
               username: created.username,
               email: created.email,
               role: created.role,
            },
         });
      } catch (error) {
         next(error);
      }
   }

   static async googleLogin(req,res,next){
      try {
         const ticket = await oauth2Client.verifyIdToken({
            idToken: req.headers['google-token'],
            audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        console.log(payload);
        let user = await User.findOne({
         where: {
            email: payload.email
         }
        })

        if(!user){
          user = await User.create({
            username: payload.name,
            email: payload.email,
            password:"dummy-password" + Date.now() + Math.random(),
            role: "Member"
         })
      }

      const access_token = signToken({id: user.id})
      res.status(200).json({access_token})
        res.json(payload)
      } catch (error) {
         next(error)
      }
   }

   static async createFavourite(req, res, next) {
      const { artistName, genres, imgUrl, album, title, preview, lyric } = req.body;
      const UserId = req.user.id;

      try {
         const existingFavourite = await Favourite.findOne({
            where: {
               artistName,
               genres,
               imgUrl,
               album,
               title,
               preview,
               lyric,
               UserId,
            },
         });
         if (existingFavourite) throw { name: "already exist" };
         const favourite = await Favourite.create({ artistName, genres, imgUrl, album, title, preview, lyric, UserId });
         res.status(201).json(favourite);
      } catch (error) {
         next(error);
      }
   }

   static async favourite(req, res, next) {
      try {
         const favourite = await Favourite.findAll({
            where: { UserId: req.user.id },
         });
         res.status(200).json(favourite);
      } catch (error) {
         next(error);
      }
   }

   static async deleteFavourite(req, res, next) {
      try {
         const favourite = await Favourite.findByPk(req.params.id);
         if (!favourite) {
            throw { name: "NotFound" };
         }
         await favourite.destroy();
         res.status(200).json({ message: `success to delete` });
      } catch (error) {
         next(error);
      }
   }



   static async initiateMidtransTrx(req, res, next) {
      const orderId = Math.random().toString();
      const amount = 10000;
      try {
         let snap = new midtransClient.Snap({
            // Set to true if you want Production Environment (accept real transaction).
            isProduction: false,
            serverKey: "SB-Mid-server-80reExAd7AJo_FbbElP2C301",
         });

         let parameter = {
            transaction_details: {
               order_id: orderId,
               gross_amount: amount,
            },
            credit_card: {
               secure: true,
            },
            customer_details: {
               first_name: req.user.username,
               email: req.user.email,
            },
         };

         const transaction = await snap.createTransaction(parameter);
         let transactionToken = transaction.token;
         await Order.create({
            orderId,
            amount,
            UserrId: req.user.id,
         });
         // console.log("transactionToken:", transactionToken);
         res.json({ message: "Order created", transactionToken, orderId });
      } catch (error) {
         next(error);
      }
   }
   static async upgradeAccount(req, res, next) {
      const { orderId } = req.body;
      try {
         const order = await Order.findOne({ where: { orderId } });
         if (!order) {
            return res.status(404).json({ message: "Order not found" });
         }
         if (req.user.role === "Premium") {
            return res.status(400).json({ message: "You are already premium" });
         }
         if (order.status === "paid") {
            return res.status(400).json({ message: "Order already paid" });
         }
         console.log(order, "<<<<<<");
         const serverKey = "SB-Mid-server-80reExAd7AJo_FbbElP2C301";
         const base64ServerKey = Buffer.from(serverKey + ":").toString("base64");
         const { data } = await axios.get(`https://api.sandbox.midtrans.com/v2/${orderId}/status`, {
            headers: {
               Authorization: `Basic ${base64ServerKey}`,
            },
         });

         if (data.transaction_status === "capture" && data.status_code === "200") {
            await req.user.update({ role: "Premium" });

            await order.update({ status: "paid", paidDate: new Date() });
            res.json({ message: "Upgrade success" });
         } else {
            res.status(400).json({ message: "Upgrade failed, please call our customer support", midtransMessage: data.status_message });
         }
      } catch (error) {
         next(error);
      }
   }
}
module.exports = controller;
