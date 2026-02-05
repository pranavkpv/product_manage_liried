import { useCallback, useEffect, useState } from "react";
import {
  addProductApi,
  deleteProductApi,
  getProductsApi,
  updateProductApi,
} from "../api/server";
import { FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getProductsApi();
      setProducts(res.data.data || []);
    } catch {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async () => {
    if (!name || !price || !quantity) return;

    try {
      setLoading(true);
      await addProductApi({
        name: name.trim(),
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
      });
      setName("");
      setPrice("");
      setQuantity("");
      fetchProducts();
    } catch {
      setError("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setEditData({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({ name: "", price: "", quantity: "" });
  };

  const saveEdit = async (id) => {
    try {
      setLoading(true);
      await updateProductApi(id, {
        name: editData.name.trim(),
        price: parseFloat(editData.price),
        quantity: parseInt(editData.quantity, 10),
      });
      cancelEdit();
      fetchProducts();
    } catch {
      setError("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await deleteProductApi(id);
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Product Management</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* ADD PRODUCT */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              className="border px-4 py-2 rounded focus:ring-2 focus:ring-violet-500"
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="border px-4 py-2 rounded focus:ring-2 focus:ring-violet-500"
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              className="border px-4 py-2 rounded focus:ring-2 focus:ring-violet-500"
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button
              onClick={addProduct}
              className="bg-violet-600 text-white rounded hover:bg-violet-700"
            >
              Add Product
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Qty</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t">
                  {editingId === p.id ? (
                    <>
                      <td className="p-3">
                        <input
                          className="border px-2 py-1 rounded w-full"
                          value={editData.name}
                          onChange={(e) =>
                            setEditData({ ...editData, name: e.target.value })
                          }
                        />
                      </td>
                      <td className="p-3">
                        <input
                          className="border px-2 py-1 rounded w-full"
                          type="number"
                          value={editData.price}
                          onChange={(e) =>
                            setEditData({ ...editData, price: e.target.value })
                          }
                        />
                      </td>
                      <td className="p-3">
                        <input
                          className="border px-2 py-1 rounded w-full"
                          type="number"
                          value={editData.quantity}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              quantity: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="p-3 text-right space-x-3">
                        <button
                          onClick={() => saveEdit(p.id)}
                          className="text-green-600"
                        >
                          <FaSave />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-gray-500"
                        >
                          <FaTimes />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-4">{p.name}</td>
                      <td className="p-4">₹{p.price}</td>
                      <td className="p-4">{p.quantity}</td>
                      <td className="p-4 text-right space-x-4">
                        <button
                          onClick={() => startEdit(p)}
                          className="text-blue-600"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="text-red-600"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
