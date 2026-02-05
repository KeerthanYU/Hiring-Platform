import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Briefcase,
  PlusCircle,
  Search,
  TrendingUp,
  Filter,
  MoreVertical
} from "lucide-react";
import JobForm from "../components/recruiter/JobForm";
import CandidateList from "../components/recruiter/CandidateList";
import useAuth from "../hooks/useAuth";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("candidates");

  const tabs = [
    { id: "candidates", label: "Talent Pool", icon: Users },
    { id: "post-job", label: "Post New Job", icon: PlusCircle },
  ];

  const stats = [
    { label: "Active Candidates", value: "42", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Open Roles", value: "8", icon: Briefcase, color: "text-brand-violet", bg: "bg-brand-violet/10" },
    { label: "Interviews Today", value: "5", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ];

  return (
    <div className="min-h-screen bg-brand-black pt-28 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-brand-cyan font-medium mb-2"
            >
              <Briefcase className="w-4 h-4" />
              <span>Recruiter Workspace</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white mb-2"
            >
              Find the Next <span className="gradient-text">Elite Team</span>
            </motion.h1>
            <p className="text-slate-400">Welcome, {user?.name || 'Partner'}. Monitor your talent pipeline and active listings.</p>
          </div>

          <div className="flex flex-wrap gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass px-6 py-4 rounded-2xl flex items-center gap-4 min-w-[180px]"
              >
                <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase font-medium">{stat.label}</div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </header>

        {/* Dashboard Actions Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex bg-white/5 p-1 rounded-2xl w-fit border border-white/5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 relative ${activeTab === tab.id ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="recruiterTab"
                    className="absolute inset-0 bg-brand-violet/20 border border-brand-violet/30 rounded-xl -z-10"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search candidates..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-violet/50"
              />
            </div>
            <Button variant="secondary" className="p-2.5 rounded-xl">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "candidates" ? (
              <CandidateList />
            ) : (
              <div className="max-w-2xl mx-auto">
                <JobForm />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
