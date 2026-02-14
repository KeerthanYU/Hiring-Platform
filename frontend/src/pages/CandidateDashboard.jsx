import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Target,
  FileText,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Activity,
  Briefcase,
  Bell,
  Clock,
  CheckCircle2,
  Plus,
  Loader2,
  Bot
} from "lucide-react";
import { useRef } from "react";
import SkillTest from "../components/candidate/SkillTest";
import ReportCard from "../components/candidate/ReportCard";
import JobListings from "../components/candidate/JobListings";
import ApplyJob from "../components/candidate/ApplyJob";
import useAuth from "../hooks/useAuth";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { getNotifications, markAsRead } from "../services/notificationService";
import { getJobRecommendations } from "../services/jobMatch.api";
import { toast } from "react-hot-toast";

const formatRelativeTime = (date) => {
  const diff = new Date() - new Date(date);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 600);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "just now";
};

export default function CandidateDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("jobs");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadNotifications();
    // Optional: Refresh notifications every 60 seconds
    const interval = setInterval(loadNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error("Failed to load notifications", err);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      console.error("Failed to mark read", err);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsAnalyzing(true);
      const data = await getJobRecommendations(file);
      setRecommendations(data.bestMatches);
      toast.success(`Analysis complete! Identified ${data.resumeSkills.length} skills.`);
    } catch (err) {
      console.error("Analysis failed:", err);
      toast.error(err.response?.data?.message || "Resume analysis failed");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const tabs = [
    { id: "jobs", label: "Open Roles", icon: Briefcase },
    { id: "test", label: "Assessment", icon: Target },
    { id: "report", label: "Performance", icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-32 pb-12 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex-1">
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

          <div className="flex items-center gap-6">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-3 rounded-2xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] hover:border-brand-violet/50 transition-all group"
              >
                <Bell className={`w-5 h-5 transition-colors ${unreadCount > 0 ? "text-brand-violet" : "text-[var(--color-text-muted)]"}`} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-violet text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[var(--color-bg-primary)] animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Overlay/Panel */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-80 md:w-96 bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl"
                  >
                    <div className="p-4 border-b border-[var(--color-border-primary)] flex justify-between items-center bg-[var(--color-bg-tertiary)]/50">
                      <h3 className="text-[var(--color-text-primary)] font-bold">Updates</h3>
                      <span className="text-[10px] bg-brand-violet/10 text-brand-violet px-2 py-1 rounded-full font-black uppercase tracking-tighter">
                        {unreadCount} New
                      </span>
                    </div>
                    <div className="max-h-96 overflow-y-auto custom-scrollbar">
                      {notifications.length === 0 ? (
                        <div className="p-12 text-center">
                          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bell className="w-6 h-6 text-white/20" />
                          </div>
                          <p className="text-[var(--color-text-muted)] text-sm">No notifications yet</p>
                        </div>
                      ) : (
                        notifications.map(notif => (
                          <div
                            key={notif.id}
                            onClick={() => !notif.isRead && handleMarkAsRead(notif.id)}
                            className={`p-4 border-b border-[var(--color-border-primary)] transition-all cursor-pointer relative group ${notif.isRead ? "opacity-60 grayscale-[0.5]" : "bg-brand-violet/5 hover:bg-brand-violet/10"
                              }`}
                          >
                            <div className="flex gap-4">
                              <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${notif.isRead ? "bg-transparent" : "bg-brand-violet shadow-[0_0_8px_rgba(139,92,246,0.5)]"}`} />
                              <div className="flex-1">
                                <p className={`text-sm leading-snug ${notif.isRead ? "text-[var(--color-text-secondary)]" : "text-[var(--color-text-primary)] font-medium"}`}>
                                  {notif.message}
                                </p>
                                <div className="flex items-center gap-2 mt-2 text-[10px] text-[var(--color-text-muted)]">
                                  <Clock className="w-3 h-3" />
                                  {formatRelativeTime(notif.createdAt)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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

                  <Card className="p-6 bg-gradient-to-br from-brand-violet/10 to-transparent border-brand-violet/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-violet/5 blur-[40px] rounded-full pointer-events-none"></div>

                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <div>
                        <h3 className="text-lg font-bold text-[var(--color-text-primary)] leading-tight">Best Jobs For You</h3>
                        <p className="text-[10px] text-brand-violet font-black uppercase tracking-widest mt-1">AI Recommendation</p>
                      </div>
                      <div className="p-2 bg-brand-violet/10 rounded-xl">
                        <Sparkles className="w-5 h-5 text-brand-violet" />
                      </div>
                    </div>

                    {isAnalyzing ? (
                      <div className="py-12 text-center animate-fade-in">
                        <div className="relative w-16 h-16 mx-auto mb-6">
                          <Loader2 className="w-16 h-16 text-brand-violet animate-spin opacity-20" />
                          <Bot className="w-8 h-8 text-brand-violet absolute inset-0 m-auto animate-bounce" />
                        </div>
                        <h4 className="text-sm font-bold text-[var(--color-text-primary)] mb-2">Analyzing Resume</h4>
                        <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-tighter">Matching skills with target roles...</p>
                      </div>
                    ) : recommendations.length > 0 ? (
                      <div className="space-y-4 animate-fade-in">
                        {recommendations.map((job, idx) => (
                          <motion.div
                            key={job.jobId}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-4 bg-[var(--color-bg-tertiary)]/50 rounded-2xl border border-[var(--color-border-primary)] hover:border-brand-violet/30 transition-all group relative"
                          >
                            <div className="absolute top-4 right-4">
                              <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">{job.score}% Match</span>
                            </div>
                            <h4 className="text-sm font-bold text-[var(--color-text-primary)] mb-1 group-hover:text-brand-violet transition-colors">{job.title}</h4>
                            <p className="text-[10px] text-[var(--color-text-secondary)] font-medium mb-3">{job.company}</p>

                            <div className="flex flex-wrap gap-1 mb-4">
                              {job.matchedSkills.slice(0, 3).map(skill => (
                                <span key={skill} className="text-[9px] bg-brand-violet/5 text-brand-violet px-2 py-0.5 rounded-lg font-bold uppercase border border-brand-violet/10">
                                  {skill}
                                </span>
                              ))}
                              {job.matchedSkills.length > 3 && (
                                <span className="text-[9px] text-[var(--color-text-muted)] font-black">+{job.matchedSkills.length - 3}</span>
                              )}
                            </div>

                            <ApplyJob
                              jobId={job.jobId}
                              jobTitle={job.title}
                              className="w-full h-10 bg-brand-violet text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
                            >
                              <span>Apply Now</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </ApplyJob>
                          </motion.div>
                        ))}
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full py-3 text-[10px] font-black text-brand-violet uppercase tracking-widest hover:bg-brand-violet/5 rounded-xl transition-all mt-2 border border-dashed border-brand-violet/20"
                        >
                          Refresh Analysis
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-6 animate-fade-in relative z-10">
                        <div className="w-16 h-16 bg-[var(--color-bg-tertiary)] rounded-2xl flex items-center justify-center mx-auto mb-6 text-[var(--color-text-muted)]">
                          <FileText className="w-8 h-8 opacity-20" />
                        </div>
                        <p className="text-xs text-[var(--color-text-secondary)] font-medium mb-8 leading-relaxed px-4">
                          Upload your resume to see personalized <span className="text-brand-violet font-bold">AI-driven</span> matches.
                        </p>
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] hover:opacity-90 h-12 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-brand-violet/10"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Upload Resume
                        </Button>
                      </div>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleResumeUpload}
                      className="hidden"
                      accept=".pdf,.docx"
                    />
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
