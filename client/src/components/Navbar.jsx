import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left - Logo / Brand + Links */}
          <div className="flex items-center gap-10">
            {/* Brand / Logo (optional - you can customize) */}
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

          {/* Right - Logout */}
          <div className="flex items-center">
            <button
              onClick={logout}
              className="
                flex items-center gap-2 px-4 py-2 
                text-sm font-medium text-white 
                bg-gradient-to-r from-red-600 to-rose-600 
                hover:from-red-700 hover:to-rose-700 
                active:from-red-800 active:to-rose-800
                rounded-lg shadow-sm hover:shadow 
                transition-all duration-200
              "
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}