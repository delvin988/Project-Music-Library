const errorHandler = (err, req, res, next) => {
   switch (err.name) {
      case "InvalidToken":
      case "JsonWebTokenError":
         res.status(401).json({ message: "Invalid Token" });
         break;
      case "forbidden":
         res.status(403).json({ message: "Only premium member can add to favourite" });
         break;
      case "SequelizeValidationError":
      case "SequelizeUniqueConstraintError":
         res.status(400).json({ message: err.errors[0].message });
         break;
      case "NotFound":
         res.status(404).json({ message: "error not found" });
         break;
      case "EmailRequired":
         res.status(400).json({ message: "Email is required" });
         break;
      case "PasswordRequired":
         res.status(400).json({ message: "Password is required" });
         break;
      case "InvalidUser":
         res.status(401).json({ message: "error invalid username or email or password" });
         break;
      case "already exist":
         res.status(409).json({ message: "This song is already in favorites" });
         break;
      default:
         console.log(err);
         res.status(500).json({ message: "Internal Server Error" });
         break;
   }
};

module.exports = errorHandler;
