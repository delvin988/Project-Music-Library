
const authorizationPremium = (req, res, next) => {
   try {
      //   console.log(req.user);
      if (req.user.role !== "Premium") throw { name: "forbidden" };
      next();
   } catch (error) {
     next(error)
   }
};


module.exports = {authorizationPremium};
