import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Bot, Building2, UserCircle2 } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { cn } from "../utils/cn";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await register(formData);
      navigate(formData.role === "recruiter" ? "/recruiter" : "/candidate");
    } catch (err) {
      setError("Registration failed. Email might already be in use.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -bottom-[10%] -right-[10%] w-full max-w-lg aspect-square bg-brand-cyan/10 blur-[120px] rounded-full"></div>
      <div className="absolute -top-[10%] -left-[10%] w-full max-w-lg aspect-square bg-brand-violet/10 blur-[120px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl relative z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4 group">
            <div className="w-12 h-12 bg-brand-violet rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.4)] group-hover:scale-110 transition-transform">
              <Bot className="text-white w-7 h-7" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-slate-400">Join the future of AI-powered recruitment</p>
        </div>

        <Card className="p-8 border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "candidate" })}
                className={cn(
                  "p-4 rounded-xl border transition-all flex flex-col items-center gap-2 group",
                  formData.role === "candidate"
                    ? "bg-brand-violet/20 border-brand-violet text-white"
                    : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
                )}
              >
                <UserCircle2 className={cn("w-6 h-6", formData.role === "candidate" ? "text-brand-violet" : "text-slate-500")} />
                <span className="font-medium">Candidate</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "recruiter" })}
                className={cn(
                  "p-4 rounded-xl border transition-all flex flex-col items-center gap-2 group",
                  formData.role === "recruiter"
                    ? "bg-brand-violet/20 border-brand-violet text-white"
                    : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
                )}
              >
                <Building2 className={cn("w-6 h-6", formData.role === "recruiter" ? "text-brand-violet" : "text-slate-500")} />
                <span className="font-medium">Recruiter</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Full Name</label>
                <Input
                  type="text"
                  required
                  icon={User}
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email Address</label>
                <Input
                  type="email"
                  required
                  icon={Mail}
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Password</label>
              <Input
                type="password"
                required
                icon={Lock}
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-sm text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20"
              >
                {error}
              </motion.p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-base group"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
              ) : (
                <span className="flex items-center justify-center">
                  Create Account
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-slate-400 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-brand-violet font-semibold hover:text-brand-violet/80">
                Sign in instead
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
