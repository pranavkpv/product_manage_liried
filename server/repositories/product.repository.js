const db = require("../config/db");

// Create product
exports.create = (product) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)";

    db.query(
      query,
      [product.name, product.price, product.quantity],
      (err, result) => {
        if (err) return reject(err);

        resolve({
          id: result.insertId,
          ...product,
        });
      }
    );
  });
};

// Get all products
exports.findAll = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM products";

    db.query(query, (err, results) => {
      if (err) return reject(err);

      resolve(results);
    });
  });
};

// Get product by ID
exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM products WHERE id = ?";

    db.query(query, [id], (err, results) => {
      if (err) return reject(err);

      resolve(results[0]);
    });
  });
};

// Update product
exports.update = (id, data) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?";

    db.query(
      query,
      [data.name, data.price, data.quantity, id],
      (err, result) => {
        if (err) return reject(err);

        if (result.affectedRows === 0) return resolve(null);

        resolve({ id, ...data });
      }
    );
  });
};

// Delete product
exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM products WHERE id = ?";

    db.query(query, [id], (err, result) => {
      if (err) return reject(err);

      resolve(result.affectedRows > 0);
    });
  });
};

// Find product by name
exports.findByName = (name) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM products WHERE name = ? LIMIT 1`;

    db.query(query, [name], (err, results) => {
      if (err) return reject(err);

      resolve(results[0]);
    });
  });
};

// Find product by name excluding a specific ID
exports.findByNameAndID = (name, id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT *
      FROM products
      WHERE name = ? AND id != ?
      LIMIT 1
    `;

    db.query(query, [name, id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};


