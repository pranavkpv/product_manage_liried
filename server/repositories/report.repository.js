const db = require("../config/db");

// Product summary report
exports.getProductSummary = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        COUNT(*) AS totalProducts,
        SUM(quantity) AS totalQuantity,
        SUM(price * quantity) AS totalValue
      FROM products
    `;

    db.query(query, (err, results) => {
      if (err) return reject(err);

      resolve(results[0]);
    });
  });
};
