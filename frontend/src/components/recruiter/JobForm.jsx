import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  MapPin,
  Briefcase,
  FileText,
  Code,
  Star,
  CheckCircle2,
  X,
  DollarSign,
  Building2
} from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import api from "../../api/axios";

export default function JobForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    skills: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      await api.post("/jobs", {
        title: formData.title,
        description: formData.description,
        company: formData.company,
        location: formData.location,
        salary: formData.salary || null,
        skills: formData.skills,
      });

      setSuccess(true);
      setFormData({
        title: "",
        description: "",
        company: "",
        location: "",
        salary: "",
        skills: "",
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error("Error posting job:", err);
      const message = err.response?.data?.message || err.response?.data?.error || "Failed to post job. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-8 md:p-10 border-[var(--color-border-primary)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-violet/10 blur-[60px] rounded-full"></div>

        <header className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Create New Opening</h2>
          <p className="text-[var(--color-text-secondary)]">Fill in the details to publish your job listing.</p>
        </header>

        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-4 text-emerald-400">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-bold">Job Published!</p>
                  <p className="text-sm opacity-80">Your listing is now live in the talent marketplace.</p>
                </div>
                <button onClick={() => setSuccess(false)}><X className="w-4 h-4" /></button>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center gap-4 text-red-400">
                <X className="w-6 h-6 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-bold">Error</p>
                  <p className="text-sm opacity-80">{error}</p>
                </div>
                <button onClick={() => setError("")}><X className="w-4 h-4" /></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--color-text-secondary)]">Job Title</label>
            <Input
              name="title"
              required
              icon={Briefcase}
              placeholder="e.g. Senior Frontend Engineer"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--color-text-secondary)]">Company Name</label>
              <Input
                name="company"
                required
                icon={Building2}
                placeholder="e.g. StarkTech AI"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--color-text-secondary)]">Location</label>
              <Input
                name="location"
                required
                icon={MapPin}
                placeholder="Remote / New York"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--color-text-secondary)]">Salary Range (Optional)</label>
            <Input
              name="salary"
              icon={DollarSign}
              placeholder="e.g. $120k - $160k"
              value={formData.salary}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--color-text-secondary)]">Required Skills (Comma separated)</label>
            <Input
              name="skills"
              icon={Code}
              placeholder="e.g. React, Node.js, TypeScript"
              value={formData.skills}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--color-text-secondary)]">Description</label>
            <Textarea
              name="description"
              required
              icon={FileText}
              rows={5}
              placeholder="Tell us about the role, responsibilities, and requirements..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-14 text-lg"
            disabled={loading}
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <PlusCircle className="w-5 h-5" />
                Publish Job Listing
              </span>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}
