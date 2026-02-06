const express = require("express");
const router = express.Router();

const {
  login,
  refreshToken,
  logout,
} = require("../controllers/auth.controller");

// Login route
router.post("/login", login);

//refresh token
router.get('/refresh',refreshToken)

//logout
router.post('/logout',logout)

module.exports = router;
