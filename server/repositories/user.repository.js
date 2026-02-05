const db = require("../config/db");

// Find user by username
exports.findByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE username = ?";

    db.query(query, [username], (err, results) => {
      if (err) return reject(err);

      resolve(results[0]);
    });
  });
};
