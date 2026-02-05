const mysql = require("mysql2");
const {
   DB_HOST,
   DB_USER,
   DB_PASSWORD,
   DB_NAME,
   DB_PORT,
} = require("./env");

// Create MySQL connection
const db = mysql.createConnection({
   host: DB_HOST,
   user: DB_USER,
   password: DB_PASSWORD,
   database: DB_NAME,
   port: DB_PORT,
});

// Connect to database
db.connect((err) => {
   if (err) {
      console.error("❌ MySQL connection failed:", err.message);
      process.exit(1);
   }
   console.log("✅ MySQL connected successfully");
});

module.exports = db;
