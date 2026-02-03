import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass-dark sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur group-hover:blur-lg transition-all"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors leading-tight">
                SkillTest
              </h1>
              <p className="text-xs text-gray-400 group-hover:text-indigo-400 transition-colors">
                AI-Powered Platform
              </p>
            </div>
          </Link>

          {/* Navigation Links & User Section */}
          <div className="flex items-center space-x-6">
            {!user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${isActive('/')
                      ? 'text-white bg-white/20'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="group relative px-6 py-2.5 rounded-lg font-bold text-white overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:from-indigo-700 group-hover:to-purple-700 transition-all"></div>
                  <span className="relative flex items-center">
                    Register
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-5">
                {/* User Info */}
                <div className="hidden md:flex flex-col items-end">
                  <div className="text-sm font-semibold text-white">
                    {user.name || user.email}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-xs text-gray-400 capitalize">{user.role}</div>
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  </div>
                </div>

                {/* Avatar */}
                <div className="relative group/avatar">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur opacity-75 group-hover/avatar:opacity-100 transition-opacity animate-pulse"></div>
                  <div className="relative w-11 h-11 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-lg text-white shadow-lg ring-2 ring-white/30">
                    {(user.name || user.email || 'U')[0].toUpperCase()}
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="group flex items-center space-x-2 px-5 py-2.5 bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-red-500/50"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Border Animation */}
      <div className="h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
    </nav>
  );
}
