const { User, sequelize } = require("../models/index");
const { verifyToken } = require("../helper/jwt");

const authentication = async (req, res, next) => {
   try {
      const { authorization } = req.headers;
      if (!authorization) throw { name: "InvalidToken" };

      const [type, token] = authorization.split(" ");
      if (type !== "Bearer") throw { name: "InvalidToken" };
      // console.log(token);

      const decodedToken = verifyToken(token);
      // console.log(decodedToken);

      const role = await User.findByPk(decodedToken.id);
      if (!role) throw { name: "InvalidToken" };

      req.user = role;
      next();
   } catch (error) {
     next(error)
   }
};

module.exports = authentication;
