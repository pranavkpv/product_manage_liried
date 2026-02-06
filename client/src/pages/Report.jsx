import { useEffect, useState } from "react";
import api from "../api/axios";
import { 
  Package, 
  PackageMinus, 
  DollarSign, 
  Clock,
  AlertCircle 
} from "lucide-react";
import { FaPlus } from "react-icons/fa";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 p-6 md:p-8 transition-all duration-500 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-500/5 to-transparent rounded-full blur-2xl animate-float-med"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 animate-fade-in-up">
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-800/50 p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-violet-900 to-indigo-900 bg-clip-text text-transparent tracking-tight">
                  Inventory Report
                </h1>
                <p className="mt-2 text-xl text-gray-600 dark:text-gray-400 font-medium">
                  Complete overview of your product analytics
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-10 p-8 bg-red-50/90 dark:bg-red-900/50 backdrop-blur-xl border-2 border-red-200/80 dark:border-red-800/80 rounded-3xl shadow-2xl animate-shake">
            <div className="flex items-center gap-4 max-w-md mx-auto">
              <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded-2xl">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-2">Load Failed</h3>
                <p className="text-red-800 dark:text-red-200">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pop-in">
          {/* Total Products Card */}
          <div className="group bg-white/85 dark:bg-gray-900/85 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 dark:border-gray-800/60 overflow-hidden hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 hover:border-violet-300/50">
            <div className="p-8 relative overflow-hidden">
              <div className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-r from-violet-500/20 to-transparent rounded-2xl blur-xl group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300">
                    <Package className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-violet-700 dark:text-violet-300 uppercase tracking-wide">Total Products</p>
                    <p className="text-2xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-medium">Unique SKUs</p>
                  </div>
                </div>
                <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-violet-600 to-indigo-700 bg-clip-text text-transparent group-hover:scale-105 transition-all duration-300">
                  {loading ? (
                    <div className="w-32 h-20 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl animate-pulse"></div>
                  ) : (
                    report.totalProducts.toLocaleString()
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Total Quantity Card */}
          <div className="group bg-white/85 dark:bg-gray-900/85 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 dark:border-gray-800/60 overflow-hidden hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 hover:border-blue-300/50">
            <div className="p-8 relative overflow-hidden">
              <div className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-transparent rounded-2xl blur-xl group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300">
                    <PackageMinus className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">Total Quantity</p>
                    <p className="text-2xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-medium">Units Available</p>
                  </div>
                </div>
                <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 to-cyan-700 bg-clip-text text-transparent group-hover:scale-105 transition-all duration-300">
                  {loading ? (
                    <div className="w-32 h-20 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl animate-pulse"></div>
                  ) : (
                    report.totalQuantity.toLocaleString()
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Total Value Card */}
          <div className="group bg-white/85 dark:bg-gray-900/85 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 dark:border-gray-800/60 overflow-hidden hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 hover:border-emerald-300/50">
            <div className="p-8 relative overflow-hidden">
              <div className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-r from-emerald-500/20 to-transparent rounded-2xl blur-xl group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300">
                    <DollarSign className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">Inventory Value</p>
                    <p className="text-2xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-medium">Total Stock Worth</p>
                  </div>
                </div>
                <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent group-hover:scale-105 transition-all duration-300">
                  {loading ? (
                    <div className="w-40 h-20 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl animate-pulse"></div>
                  ) : (
                    formattedValue
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        {!loading && !error && (
          <div className="mt-16 text-center animate-fade-in-up delay-500">
            <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-800/50 px-8 py-6 inline-flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Last updated: {new Date().toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes float-med {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-1deg); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop-in {
          0% { transform: scale(0.95); opacity: 0; }
          70% { transform: scale(1.03); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-med { animation: float-med 12s ease-in-out infinite reverse; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        .animate-pop-in { animation: pop-in 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .animate-shake { animation: shake 0.6s ease-in-out; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>
    </div>
  );
}
