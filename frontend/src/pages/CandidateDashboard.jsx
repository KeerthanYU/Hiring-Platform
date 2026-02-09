import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Target,
  FileText,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Activity,
  Briefcase
} from "lucide-react";
import SkillTest from "../components/candidate/SkillTest";
import ReportCard from "../components/candidate/ReportCard";
import JobListings from "../components/candidate/JobListings";
import useAuth from "../hooks/useAuth";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export default function CandidateDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("jobs");

  const tabs = [
    { id: "jobs", label: "Open Roles", icon: Briefcase },
    { id: "test", label: "Assessment", icon: Target },
    { id: "report", label: "Performance", icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-28 pb-12 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-brand-violet font-medium mb-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Candidate Portal</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-[var(--color-text-primary)] mb-2"
            >
              Master Your <span className="gradient-text">Future</span>
            </motion.h1>
            <p className="text-[var(--color-text-secondary)]">Welcome back, {user?.name || 'Explorer'}. Ready for your next challenge?</p>
          </div>

          <div className="flex gap-4">
            <div className="glass px-6 py-3 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-[var(--color-text-secondary)] uppercase">Avg. Score</div>
                <div className="text-lg font-bold text-[var(--color-text-primary)]">85%</div>
              </div>
            </div>
            <div className="glass px-6 py-3 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 bg-brand-violet/10 rounded-full flex items-center justify-center text-brand-violet">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-[var(--color-text-secondary)] uppercase">Tests</div>
                <div className="text-lg font-bold text-[var(--color-text-primary)]">12</div>
              </div>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex bg-[var(--color-bg-tertiary)] p-1 rounded-2xl mb-8 w-fit border border-[var(--color-border-primary)]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 relative ${activeTab === tab.id ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] rounded-xl shadow-sm -z-10"
                />
              )}
            </button>
          ))}
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
            {activeTab === "test" ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <SkillTest />
                </div>
                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">Upcoming Deadlines</h3>
                    <div className="space-y-4">
                      {[1, 2].map(i => (
                        <div key={i} className="flex items-center justify-between p-4 bg-[var(--color-bg-tertiary)] rounded-xl border border-[var(--color-border-primary)] group hover:border-[var(--color-border-primary)]/80 transition-colors">
                          <div>
                            <div className="text-sm font-medium text-[var(--color-text-primary)]">Advanced React Hooks</div>
                            <div className="text-xs text-[var(--color-text-muted)]">Due in 2 days</div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-brand-violet transition-colors" />
                        </div>
                      ))}
                    </div>
                    <Button variant="ghost" className="w-full mt-4 text-xs">View All Tasks</Button>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-brand-violet/10 to-transparent border-brand-violet/20">
                    <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-primary)]">AI Career Path</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-6">Based on your HTML/CSS scores, you're ready for Advanced UI Design.</p>
                    <Button className="w-full bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] hover:opacity-90">Unlock Mastery</Button>
                  </Card>
                </div>
              </div>
            ) : activeTab === "report" ? (
              <ReportCard />
            ) : (
              <JobListings />
            )}
          </motion.div>
        </AnimatePresence>
      </div >
    </div >
  );
}
