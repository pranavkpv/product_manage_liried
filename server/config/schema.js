const db = require("./db");
const bcrypt = require("bcrypt");

const createTables = async () => {
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

  // Create users table
  db.query(usersTable, (err) => {
    if (err) {
      console.error("Error creating users table:", err.message);
    } else {
      console.log("✅ Users table ready");
      createAdminUser(); // 👈 create admin after table ready
    }
  });

  // Create products table
  db.query(productsTable, (err) => {
    if (err) {
      console.error("Error creating products table:", err.message);
    } else {
      console.log("✅ Products table ready");
    }
  });
};

// Create Admin User
const createAdminUser = async () => {
  const username = "Admin";
  const plainPassword = "Admin@123";

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) {
        console.error("Error checking admin user:", err.message);
        return;
      }

      if (results.length > 0) {
        console.log("👤 Admin user already exists");
        return;
      }

      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      db.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        (err) => {
          if (err) {
            console.error("Error creating admin user:", err.message);
          } else {
            console.log("✅ Admin user created (username: Admin)");
          }
        }
      );
    }
  );
};

module.exports = createTables;
