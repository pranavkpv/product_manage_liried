const express = require("express");
const router = express.Router();

const {
  login,
  refreshToken,
} = require("../controllers/auth.controller");

// Login route
router.post("/login", login);

//refresh token
router.get('/refresh',refreshToken)

module.exports = router;
