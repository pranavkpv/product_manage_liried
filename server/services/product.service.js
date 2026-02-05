const productRepository = require("../repositories/product.repository");

// Create product
exports.createProduct = async (data) => {
  const { name, price, quantity } = data;

  if (!name || price == null || quantity == null) {
    throw new Error("All product fields are required");
  }

  return await productRepository.create({
    name,
    price,
    quantity,
  });
};

// Get all products
exports.getAllProducts = async () => {
  return await productRepository.findAll();
};

// Get product by ID
exports.getProductById = async (id) => {
  const product = await productRepository.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

// Update product
exports.updateProduct = async (id, data) => {
  const updated = await productRepository.update(id, data);

  if (!updated) {
    throw new Error("Product not found or not updated");
  }

  return updated;
};

// Delete product
exports.deleteProduct = async (id) => {
  const deleted = await productRepository.delete(id);

  if (!deleted) {
    throw new Error("Product not found");
  }

  return deleted;
};
