const express = require("express");
const router = express.Router();

const {
  getProductReport,
} = require("../controllers/report.controller");

// Basic reporting route
router.get("/products", getProductReport);

module.exports = router;
