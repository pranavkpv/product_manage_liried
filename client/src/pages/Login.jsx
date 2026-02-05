import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/server";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginApi(username, password ); 
      console.log(res)
      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 transition-colors duration-300">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-700 dark:to-indigo-700 px-10 py-12 text-white">
            <h2 className="text-3xl font-bold text-center tracking-tight">Sign In</h2>
            <p className="mt-3 text-indigo-100/90 text-center text-sm">
              Access your dashboard
            </p>
          </div>

          {/* Form */}
          <div className="p-10">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 dark:border-red-400 p-4 rounded text-sm text-red-700 dark:text-red-300">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  username
                </label>
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value.trim())}
                  className="block w-full px-4 py-3.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all duration-200"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-3.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`
                  w-full flex items-center justify-center gap-2 py-3.5 px-4
                  font-medium text-white
                  bg-violet-600 hover:bg-violet-700 active:bg-violet-800
                  dark:bg-violet-700 dark:hover:bg-violet-600 dark:active:bg-violet-800
                  rounded-lg shadow-md hover:shadow-lg
                  focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-950
                  transition-all duration-200
                  disabled:opacity-60 disabled:pointer-events-none
                `}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                <a href="#" className="text-violet-600 dark:text-violet-400 hover:underline font-medium">
                  Forgot password?
                </a>
                <span className="mx-3">•</span>
                <a href="#" className="text-violet-600 dark:text-violet-400 hover:underline font-medium">
                  Create account
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}