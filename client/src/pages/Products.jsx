import { useCallback, useEffect, useState } from "react";
import {
  addProductApi,
  deleteProductApi,
  getProductsApi,
  updateProductApi,
} from "../api/server";
import { FaTrash, FaEdit, FaSave, FaTimes, FaPlus, FaExclamationTriangle } from "react-icons/fa";
import { Loader2, AlertCircle, X } from "lucide-react";

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

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, productId: null, productName: "" });

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getProductsApi();
      setProducts(res.data.data || []);
      setError("")
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
      setError("")
    } catch(error) {
      setError(error.message || "Failed to add product");
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
      setError("")
    } catch(error) {
      setError(error.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  // Updated delete handler - opens modal instead of direct delete
  const openDeleteModal = (id, name) => {
    setDeleteModal({ isOpen: true, productId: id, productName: name });
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      await deleteProductApi(deleteModal.productId);
      fetchProducts();
      setError("");
    } catch (error) {
      setError(error.message || "Failed to delete product");
    } finally {
      setLoading(false);
      setDeleteModal({ isOpen: false, productId: null, productName: "" });
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, productId: null, productName: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 p-6 transition-all duration-500">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-violet-500/5 to-indigo-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-20 w-64 h-64 bg-gradient-to-r from-purple-500/5 to-transparent rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10 animate-fade-in-up">
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-800/50 p-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FaPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                  Product Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your inventory with ease</p>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-6 bg-red-50/80 dark:bg-red-900/40 backdrop-blur-sm border-2 border-red-200/80 dark:border-red-800/80 rounded-3xl animate-shake">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
              <span className="text-lg font-medium text-red-800 dark:text-red-200">{error}</span>
            </div>
          </div>
        )}

        {/* Add Product Form */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-800/50 overflow-hidden mb-10 animate-pop-in">
          <div className="p-8 border-b border-gray-200/50 dark:border-gray-800/50">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <FaPlus className="w-7 h-7 text-violet-600" />
              Add New Product
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Product Name</label>
                <input
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200/70 dark:border-gray-700/70 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 outline-none transition-all duration-300 hover:border-gray-300 hover:shadow-lg hover:shadow-violet-500/10"
                  placeholder="Product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200/70 dark:border-gray-700/70 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 outline-none transition-all duration-300 hover:border-gray-300 hover:shadow-lg hover:shadow-violet-500/10"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Quantity</label>
                <input
                  type="number"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200/70 dark:border-gray-700/70 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 outline-none transition-all duration-300 hover:border-gray-300 hover:shadow-lg hover:shadow-violet-500/10"
                  placeholder="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={addProduct}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 font-semibold text-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 active:from-violet-800 active:to-indigo-800 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <FaPlus className="w-5 h-5" />}
                  {loading ? "Adding..." : "Add Product"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-800/50 overflow-hidden animate-fade-in-up delay-200">
          <div className="px-8 py-6 border-b border-gray-200/50 dark:border-gray-800/50">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              Products List
              <span className="text-sm bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 px-3 py-1 rounded-full font-medium">
                {products.length} items
              </span>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm">
                  <th className="px-8 py-6 text-left text-lg font-bold text-gray-900 dark:text-white tracking-wide">Product</th>
                  <th className="px-8 py-6 text-left text-lg font-bold text-gray-900 dark:text-white tracking-wide">Price</th>
                  <th className="px-8 py-6 text-left text-lg font-bold text-gray-900 dark:text-white tracking-wide">Quantity</th>
                  <th className="px-8 py-6 text-right text-lg font-bold text-gray-900 dark:text-white tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50 dark:divide-gray-800/50">
                {loading ? (
                  Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="px-8 py-12">
                          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-48 mb-2"></div>
                        </td>
                        <td className="px-8 py-12">
                          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
                        </td>
                        <td className="px-8 py-12">
                          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
                        </td>
                        <td className="px-8 py-12 text-right">
                          <div className="flex gap-2 justify-end">
                            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                          </div>
                        </td>
                      </tr>
                    ))
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center">
                      <div className="text-gray-500 dark:text-gray-400 animate-fade-in-up">
                        <FaPlus className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p className="text-2xl font-semibold mb-2">No products yet</p>
                        <p>Add your first product using the form above</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  products.map((p, index) => (
                    <tr
                      key={p.id}
                      className={`hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-200 transform hover:scale-[1.01] ${index % 2 === 0 ? 'bg-white/50 dark:bg-gray-900/30' : ''}`}
                    >
                      {editingId === p.id ? (
                        <>
                          <td className="px-8 py-6">
                            <input
                              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-300/50 dark:border-gray-600/50 bg-white/70 dark:bg-gray-800/70 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 outline-none transition-all duration-200"
                              value={editData.name}
                              onChange={(e) =>
                                setEditData({ ...editData, name: e.target.value })
                              }
                              autoFocus
                            />
                          </td>
                          <td className="px-8 py-6">
                            <input
                              type="number"
                              step="0.01"
                              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-300/50 dark:border-gray-600/50 bg-white/70 dark:bg-gray-800/70 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 outline-none transition-all duration-200"
                              value={editData.price}
                              onChange={(e) =>
                                setEditData({ ...editData, price: e.target.value })
                              }
                            />
                          </td>
                          <td className="px-8 py-6">
                            <input
                              type="number"
                              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-300/50 dark:border-gray-600/50 bg-white/70 dark:bg-gray-800/70 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 outline-none transition-all duration-200"
                              value={editData.quantity}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  quantity: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td className="px-8 py-6 text-right space-x-3">
                            <button
                              onClick={() => saveEdit(p.id)}
                              disabled={loading}
                              className="p-3 rounded-2xl bg-green-500/90 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60"
                              title="Save"
                            >
                              <FaSave className="w-5 h-5" />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="p-3 rounded-2xl bg-gray-400/90 hover:bg-gray-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                              title="Cancel"
                            >
                              <FaTimes className="w-5 h-5" />
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-8 py-6 font-semibold text-gray-900 dark:text-white">
                            {p.name}
                          </td>
                          <td className="px-8 py-6">
                            <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-emerald-200 dark:from-emerald-900/50 dark:to-emerald-800/50 text-emerald-800 dark:text-emerald-200 rounded-full text-sm font-semibold shadow-md">
                              ₹{p.price}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <span className="inline-flex items-center px-4 py-2 bg-blue-100/80 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold shadow-sm">
                              {p.quantity}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right space-x-3">
                            <button
                              onClick={() => startEdit(p)}
                              className="p-3 rounded-2xl bg-blue-500/90 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:rotate-3 transition-all duration-200"
                              title="Edit"
                            >
                              <FaEdit className="w-5 h-5" />
                            </button>
                            {/* Updated delete button - opens modal */}
                            <button
                              onClick={() => openDeleteModal(p.id, p.name)}
                              className="p-3 rounded-2xl bg-red-500/90 hover:bg-red-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:rotate-12 transition-all duration-200"
                              title="Delete"
                            >
                              <FaTrash className="w-5 h-5" />
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in" 
            onClick={closeDeleteModal}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-pop-in">
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/60 dark:border-gray-800/60 w-full max-w-md mx-4 transform scale-100">
              {/* Header */}
              <div className="p-8 border-b border-gray-200/50 dark:border-gray-800/50 flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/50 rounded-2xl flex items-center justify-center mt-1">
                  <FaExclamationTriangle className="w-7 h-7 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Delete Product?
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    Are you sure you want to delete <span className="font-semibold text-red-600 dark:text-red-400">"{deleteModal.productName}"</span>?
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="p-8 pt-0 flex gap-4 justify-end bg-gradient-to-t from-white/50 dark:from-gray-900/50">
                <button
                  onClick={closeDeleteModal}
                  disabled={loading}
                  className="px-6 py-3 rounded-2xl bg-gray-200/80 dark:bg-gray-700/80 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold transition-all duration-200 flex items-center gap-2 disabled:opacity-60"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={loading}
                  className="px-6 py-3 rounded-2xl bg-red-500/90 hover:bg-red-600 active:bg-red-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FaTrash className="w-4 h-4" />}
                  {loading ? "Deleting..." : "Delete Product"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes pop-in {
          0% { transform: scale(0.95) translateY(20px); opacity: 0; }
          70% { transform: scale(1.03); }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-pop-in { animation: pop-in 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .animate-fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-pop-in { animation: pop-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .animate-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </div>
  );
}
