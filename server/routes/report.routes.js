const express = require("express");
const router = express.Router();

const {
  getProductReport,
} = require("../controllers/report.controller");
const { verifyAccessToken } = require("../miidleware/auth.middleware");

router.use(verifyAccessToken)

// Basic reporting route
router.get("/products", getProductReport);

module.exports = router;
