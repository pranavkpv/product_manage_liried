const { ACCESS_SECRET } = require("../config/env");
const { findByUsername } = require("../repositories/user.repository");
const { verifyAccessTokenFun } = require("../services/jwt.helper");


exports.verifyAccessToken = async (req, res, next) => {
   try {
      
      const authHeader = req.headers.authorization;
      if (!authHeader)
         return res.status(401).json({ message: "Access token missing" });

      const token = authHeader.split(" ")[1];
      const decoded = verifyAccessTokenFun(token,ACCESS_SECRET)

      // 🔍 check user exists
      const user = await findByUsername(decoded.username);
      if (!user) return res.status(401).json({ message: "Invalid token user" });

      next();
   } catch (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
   }
};
