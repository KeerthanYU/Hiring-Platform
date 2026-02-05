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
  X
} from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { cn } from "../../utils/cn";

export default function JobForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requiredSkills: "",
    experience: "",
    location: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setFormData({
        title: "",
        description: "",
        requiredSkills: "",
        experience: "",
        location: "",
        type: "",
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Error posting job:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-8 md:p-10 border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-violet/10 blur-[60px] rounded-full"></div>

        <header className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Create New Opening</h2>
          <p className="text-slate-400">Fill in the details to publish your job listing.</p>
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
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Job Title</label>
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
              <label className="text-sm font-medium text-slate-300">Location</label>
              <Input
                name="location"
                required
                icon={MapPin}
                placeholder="Remote / New York"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Job Type</label>
              <select
                name="type"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-violet/50 transition-all font-medium"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="full-time">Full-Time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Experience Level</label>
            <div className="relative">
              <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <select
                name="experience"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-violet/50 transition-all font-medium appearance-none"
                value={formData.experience}
                onChange={handleChange}
              >
                <option value="">Select Level</option>
                <option value="entry">Entry (0-2 years)</option>
                <option value="mid">Mid (2-5 years)</option>
                <option value="senior">Senior (5+ years)</option>
                <option value="lead">Lead/Principal</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Required Skills</label>
            <Textarea
              name="requiredSkills"
              required
              icon={Code}
              rows={2}
              placeholder="React, Tailwind, TypeScript (comma separated)"
              value={formData.requiredSkills}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Description</label>
            <Textarea
              name="description"
              required
              icon={FileText}
              rows={5}
              placeholder="Tell us about the role..."
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
