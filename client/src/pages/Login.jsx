import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/server";
import { User, Lock, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginApi(username, password); 
      console.log(res)
      localStorage.setItem("accessToken",res.accessToken)
      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 flex items-center justify-center px-4 py-12 transition-all duration-500 overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-float-med"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl animate-float-fast"></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        {/* Glassmorphism Card */}
        <div className="bg-white/85 dark:bg-gray-900/85 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 dark:border-gray-800/60 overflow-hidden animate-pop-in">
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 px-8 py-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -skew-x-12 -translate-x-8 h-32 w-32 rounded-full blur-xl animate-pulse-slow"></div>
            <div className="absolute top-4 -right-4 w-24 h-24 bg-white/10 rounded-2xl blur-xl animate-bounce-slow"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-center tracking-tight relative z-10 animate-slide-in-down">Welcome Back</h2>
            <p className="mt-3 text-indigo-100 text-center text-sm opacity-90 relative z-10 animate-slide-in-up delay-200">
              Sign in to your dashboard
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-50/90 dark:bg-red-900/50 backdrop-blur-sm border-2 border-red-200/80 dark:border-red-800/80 rounded-2xl p-5 text-sm text-red-800 dark:text-red-200 animate-shake animate-fade-in">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 mt-0.5 flex-shrink-0 animate-ping-slow" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                </div>
              )}

              {/* Username Input */}
              <div className="animate-slide-in-left delay-300">
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                  Username
                </label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-violet-500 transition-colors duration-300" />
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value.trim())}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200/70 dark:border-gray-700/70 bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 focus:animate-glow-lg outline-none transition-all duration-400 hover:border-violet-400/50 hover:shadow-md hover:shadow-violet-500/10 hover:animate-pulse-slow"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              {/* Password Input with Eye Toggle */}
              <div className="animate-slide-in-right delay-400">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-violet-500 transition-colors duration-300" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-gray-200/70 dark:border-gray-700/70 bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 focus:animate-glow-lg outline-none transition-all duration-400 hover:border-violet-400/50 hover:shadow-md hover:shadow-violet-500/10 hover:animate-pulse-slow"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-violet-500 transition-all duration-300 hover:scale-110 active:scale-95"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`
                  group relative w-full flex items-center justify-center gap-2 py-5 px-8
                  font-bold text-xl text-white tracking-wide overflow-hidden
                  bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-700 hover:via-indigo-700 hover:to-purple-700 active:from-violet-800 active:via-indigo-800 active:to-purple-800
                  rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 active:translate-y-0 hover:scale-[1.02]
                  focus:outline-none focus:ring-4 focus:ring-violet-500/40 focus:ring-offset-2 focus:ring-offset-white/60 dark:focus:ring-offset-gray-950/60
                  transition-all duration-500 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:blur before:animate-shimmer before:group-hover:opacity-100
                  disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg
                  animate-bounce-slow hover:animate-none
                `}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 h-6 w-6 text-white shrink-0" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12c0-4.042 3.295-7.337 7.373-7.373A7.962 7.962 0 0121 12a7.962 7.962 0 01-5.29 7.291 7.16 7.16 0 01-1.483.175 6.52 6.52 0 01-3.017-.774l-.003-.01-.01-.003a6.978 6.978 0 01-.766-.83A6.498 6.498 0 0112 21a6.498 6.498 0 01-3.833-1.144 7.16 7.16 0 01-.768.832l-.01.003-.003.01A6.52 6.52 0 016.291 21z" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
