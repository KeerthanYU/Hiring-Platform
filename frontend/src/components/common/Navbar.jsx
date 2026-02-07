import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot, LogOut, User, Menu, X } from "lucide-react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Button } from "../ui/Button";
import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3 flex items-center justify-between border-[var(--color-border-primary)] shadow-sm">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-brand-violet rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)] group-hover:scale-110 transition-transform">
            <Bot className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">SkillTest<span className="text-brand-violet">AI</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-brand-violet' : 'text-[var(--color-text-secondary)] hover:text-brand-violet'}`}>Home</Link>
          <Link to="/features" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-brand-violet transition-colors">Features</Link>
          <Link to="/pricing" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-brand-violet transition-colors">Pricing</Link>
          <div className="h-4 w-[1px] bg-[var(--color-border-primary)]"></div>
          <ThemeToggle />
        </div>

        {/* Auth Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-brand-violet transition-colors">Sign in</Link>
              <Button variant="primary" className="py-2 px-5 text-sm">
                <Link to="/register">Join Platform</Link>
              </Button>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to={user?.role === 'recruiter' ? '/recruiter' : '/candidate'} className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-brand-violet transition-colors">
                Dashboard
              </Link>
              <div className="h-8 w-[1px] bg-[var(--color-border-primary)]"></div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-[var(--color-text-secondary)] hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-[var(--color-text-primary)]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-24 left-6 right-6 glass rounded-2xl p-6 flex flex-col space-y-4 border-white/10"
        >
          <Link to="/" onClick={() => setIsOpen(false)} className="text-lg font-medium text-white">Home</Link>
          <Link to="/features" onClick={() => setIsOpen(false)} className="text-lg font-medium text-white">Features</Link>
          {!isAuthenticated ? (
            <div className="flex flex-col space-y-4 pt-4 border-t border-white/10">
              <Link to="/login" onClick={() => setIsOpen(false)} className="text-lg font-medium text-white">Sign in</Link>
              <Button variant="primary" className="w-full">
                <Link to="/register" onClick={() => setIsOpen(false)}>Join Platform</Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col space-y-4 pt-4 border-t border-white/10">
              <Link to={user?.role === 'recruiter' ? '/recruiter' : '/candidate'} onClick={() => setIsOpen(false)} className="text-lg font-medium text-white">Dashboard</Link>
              <button onClick={handleLogout} className="flex items-center space-x-2 text-red-400">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </motion.div>
      )}
    </nav>
  );
}
