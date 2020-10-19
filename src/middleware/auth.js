const jwt = require("jsonwebtoken");
const user = require("../models/user");

const auth = async (req, res, next) => {

   try {
      const token = req.header('Authorization').replace('Bearer ', '');

      const decoded = jwt.verify(token, process.env.JWT_TOKEN);

      const user1 = await user.User.findOne({
         _id: decoded._id,
         'tokens.token': token
      });

      if (!user1) {
         throw new Error()
      }
      req.user = user1;
      req.token = token;
      next();
   } catch (e) {
      console.log(e);
      res.status(401).send({
         error: "Please authenticate"
      });

   }


}

module.exports = auth;