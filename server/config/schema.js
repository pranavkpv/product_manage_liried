const db = require("./db");

const createTables = () => {
  const usersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(100) NOT NULL
    )
  `;

  const productsTable = `
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      quantity INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.query(usersTable, (err) => {
    if (err) {
      console.error("Error creating users table:", err.message);
    } else {
      console.log("✅ Users table ready");
    }
  });

  db.query(productsTable, (err) => {
    if (err) {
      console.error("Error creating products table:", err.message);
    } else {
      console.log("Products table ready");
    }
  });
};

module.exports = createTables;
