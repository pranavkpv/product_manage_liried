const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());


// Routes (will be added later)
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/reports", require("./routes/report.routes"));

// Global error handler (basic)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

module.exports = app;
