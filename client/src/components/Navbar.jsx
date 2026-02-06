import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSignOutAlt, FaTimes } from "react-icons/fa";
import { Loader2, X } from "lucide-react";
import { logoutApi } from "../api/server"; 

export default function Navbar() {
  const navigate = useNavigate();
  const [logoutModal, setLogoutModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const openLogoutModal = () => {
    setLogoutModal(true);
  };

  const confirmLogout = async () => {
    try {
      setLoading(true);
      await logoutApi(); 
      localStorage.removeItem("accessToken");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
      setLogoutModal(false);
    }
  };

  const closeLogoutModal = () => {
    setLogoutModal(false);
  };

  return (
    <>
      <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left - Logo / Brand + Links */}
            <div className="flex items-center gap-10">
              {/* Brand / Logo */}
              <Link to="/products" className="flex items-center">
                <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  Dashboard
                </span>
              </Link>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-8">
                <Link
                  to="/products"
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm tracking-wide"
                >
                  Products
                </Link>
                <Link
                  to="/report"
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm tracking-wide"
                >
                  Report
                </Link>
              </div>
            </div>

            {/* Right - Logout Button */}
            <div className="flex items-center">
              <button
                onClick={openLogoutModal}
                disabled={loading}
                className="
                  flex items-center gap-2 px-4 py-2 
                  text-sm font-medium text-white 
                  bg-gradient-to-r from-red-600 to-rose-600 
                  hover:from-red-700 hover:to-rose-700 
                  active:from-red-800 active:to-rose-800
                  rounded-lg shadow-sm hover:shadow-lg
                  transform hover:-translate-y-0.5
                  transition-all duration-200
                  disabled:opacity-60 disabled:cursor-not-allowed
                "
              >
                <FaSignOutAlt className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {logoutModal && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
            onClick={closeLogoutModal}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-pop-in">
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/60 dark:border-gray-800/60 w-full max-w-md mx-4">
              {/* Header */}
              <div className="p-8 border-b border-gray-200/50 dark:border-gray-800/50 flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-red-500 to-rose-500 rounded-2xl flex items-center justify-center mt-1 shadow-lg">
                  <FaSignOutAlt className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Sign Out?
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    Are you sure you want to log out? You'll need to sign in again to access your dashboard.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="p-8 pt-0 flex gap-4 justify-end bg-gradient-to-t from-white/50 dark:from-gray-900/50">
                <button
                  onClick={closeLogoutModal}
                  disabled={loading}
                  className="
                    px-6 py-3 rounded-2xl bg-gray-200/80 dark:bg-gray-700/80 
                    hover:bg-gray-300 dark:hover:bg-gray-600 
                    text-gray-800 dark:text-gray-200 font-semibold 
                    transition-all duration-200 flex items-center gap-2 
                    disabled:opacity-60 shadow-sm hover:shadow-md
                  "
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  disabled={loading}
                  className="
                    px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 
                    hover:from-red-700 hover:to-rose-700 active:from-red-800 active:to-rose-800
                    text-white font-semibold shadow-lg hover:shadow-xl 
                    transform hover:-translate-y-0.5 transition-all duration-200 
                    flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed
                  "
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <FaSignOutAlt className="w-4 h-4" />
                  )}
                  {loading ? "Signing out..." : "Sign Out"}
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
          0% { 
            transform: scale(0.95) translateY(20px); 
            opacity: 0; 
          }
          70% { 
            transform: scale(1.03); 
          }
          100% { 
            transform: scale(1) translateY(0); 
            opacity: 1; 
          }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-pop-in { animation: pop-in 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
      `}</style>
    </>
  );
}
