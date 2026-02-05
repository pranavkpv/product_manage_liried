const express = require("express");
const cors = require("cors");
require("dotenv").config(); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Product Management API is running 🚀");
});

// Server (use .env PORT)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
