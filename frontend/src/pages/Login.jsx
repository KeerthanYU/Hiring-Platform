import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Bot, ShieldCheck } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Normal email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const loggedInUser = await login(formData.email, formData.password);
      navigate(loggedInUser.role === "recruiter" ? "/recruiter" : "/candidate");
    } catch (err) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Google OAuth login
  const googleLogin = () => {
    // Backend runs on 5000
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-300">

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg aspect-square bg-brand-violet/10 blur-[120px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4 group">
            <div className="w-12 h-12 bg-brand-violet rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.4)] group-hover:scale-110 transition-transform">
              <Bot className="text-white w-7 h-7" />
            </div>
          </Link>

          <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">
            Welcome Back
          </h1>
          <p className="text-[var(--color-text-secondary)]">
            Log in to your SkillTest AI account
          </p>
        </div>

        {/* Card */}
        <Card className="p-8">
          {/* Email / Password Login */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--color-text-secondary)]">
                Email Address
              </label>
              <Input
                type="email"
                required
                icon={Mail}
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-[var(--color-text-secondary)]">
                  Password
                </label>
                <Link
                  to="#"
                  className="text-xs text-brand-violet hover:text-brand-violet/80"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                type="password"
                required
                icon={Lock}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            {/* Error */}
            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-sm text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20"
              >
                {error}
              </motion.p>
            )}

            {/* Submit */}
            <Button type="submit" disabled={isLoading} className="w-full h-12">
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
              ) : (
                <span className="flex items-center justify-center">
                  Sign In
                  <ArrowRight className="ml-2 w-5 h-5" />
                </span>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-[var(--color-border-primary)]"></div>
            <span className="px-4 text-xs text-[var(--color-text-secondary)]">
              OR
            </span>
            <div className="flex-1 h-px bg-[var(--color-border-primary)]"></div>
          </div>

          {/* Google Login */}
          <Button
            type="button"
            onClick={googleLogin}
            variant="outline"
            className="w-full h-12 flex items-center justify-center gap-3"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </Button>

          {/* Register */}
          <div className="mt-8 pt-6 border-t border-[var(--color-border-primary)] text-center">
            <p className="text-[var(--color-text-secondary)] text-sm">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-brand-violet font-semibold hover:text-brand-violet/80"
              >
                Create one now
              </Link>
            </p>
          </div>
        </Card>

        {/* Trust Badge */}
        <div className="mt-8 flex items-center justify-center space-x-2 text-[var(--color-text-secondary)]/60 text-xs uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4" />
          <span>Enterprise Grade Security</span>
        </div>
      </motion.div>
    </div>
  );
}
