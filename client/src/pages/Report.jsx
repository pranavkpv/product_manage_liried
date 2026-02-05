import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Report() {
  const [report, setReport] = useState({
    totalProducts: 0,
    totalQuantity: 0,
    totalValue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get("/reports/products");

        setReport(
          res.data.data || {
            totalProducts: 0,
            totalQuantity: 0,
            totalValue: 0,
          }
        );
      } catch (err) {
        console.error(err);
        setError("Failed to load report data");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  const formattedValue = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(Number(report.totalValue) || 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Report
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Overview of your product inventory
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 rounded">
            {error}
          </div>
        )}

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          {loading ? (
            <div className="p-12 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
              Loading report...
            </div>
          ) : (
            <div className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {/* Total Products */}
                <div className="bg-gradient-to-br from-violet-50 to-indigo-50 p-8 rounded-xl border">
                  <div className="text-sm font-medium text-violet-700 uppercase mb-2">
                    Total Products
                  </div>
                  <div className="text-5xl font-bold">
                    {report.totalProducts}
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Unique items
                  </div>
                </div>

                {/* Total Quantity */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl border">
                  <div className="text-sm font-medium text-blue-700 uppercase mb-2">
                    Total Quantity
                  </div>
                  <div className="text-5xl font-bold">
                    {report.totalQuantity}
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Units in stock
                  </div>
                </div>

                {/* Total Value */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-xl border">
                  <div className="text-sm font-medium text-emerald-700 uppercase mb-2">
                    Total Inventory Value
                  </div>
                  <div className="text-5xl font-bold">
                    {formattedValue}
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    ₹ stock value
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t text-center text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString("en-IN")}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
