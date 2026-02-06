const { ACCESS_SECRET, REFRESH_SECRET } = require('../config/env')
const jwt = require("jsonwebtoken");

exports.generateAccessToken = (user) => {
   return jwt.sign(
      { id: user.id, username: user.username },
      ACCESS_SECRET,
      { expiresIn: "15m" }
   );
};

exports.generateRefreshToken = (user) => {
   return jwt.sign(
      { id: user.id, username: user.username },
      REFRESH_SECRET,
      { expiresIn: "7d" }
   );
};

exports.verifyRefreshToken = (refreshToken, REFRESH_SECRET) => {
   const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
   return decoded
}

exports.verifyAccessTokenFun = (token)=>{
   const decoded = jwt.verify(token, ACCESS_SECRET);
   return decoded
}

