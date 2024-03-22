const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors')

app.use(cors())

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const controller = require("./controllers/controller");
const authentication = require("./midleware/authentication");
const { authorizationPremium} = require("./midleware/authorization");
const errorHandler = require("./midleware/errorHandler");


app.post("/login", controller.login)
app.post("/register", controller.register)
app.post("/google-login", controller.googleLogin)

app.use(authentication)
app.patch("/users/me/upgrade", controller.upgradeAccount)
app.get("/payment/midtrans/initiate", controller.initiateMidtransTrx)
app.use(authorizationPremium)
app.get("/favourite", controller.favourite)
app.post("/favourite", controller.createFavourite)
app.delete("/favourite/:id", controller.deleteFavourite);

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
 });

 module.exports = app