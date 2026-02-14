import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { updateApplicationStatus } from "../../services/applicationService";
import { fetchRecruiterApplications } from "./api/applications";
import { toast } from "react-hot-toast";
import {
  Clock,
  Search,
  UserCheck,
  XCircle,
  CheckCircle2,
  Filter,
  SlidersHorizontal,
  Building,
  Calendar,
  ExternalLink,
  ChevronDown,
  Info,
  Mail,
  Target
} from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { cn } from "../../utils/cn";

export default function CandidateList() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [errorIds, setErrorIds] = useState({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [minScore, setMinScore] = useState(0);
  const [sortBy, setSortBy] = useState("score");
  const [expandedId, setExpandedId] = useState(null);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const data = await fetchRecruiterApplications();
      console.log("[DEBUG] Applications fetched:", data.length);
      const mappedCandidates = data.map(app => ({
        id: app.id,
        name: app.candidate?.name || "Anonymous Talent",
        email: app.candidate?.email || "No direct contact",
        score: app.aiScore || 0,
        aiReason: app.aiReason || "Awaiting AI deeper analysis.",
        status: (app.status || "pending").toUpperCase(),
        testDate: new Date(app.createdAt).toLocaleDateString(),
        avatar: (app.candidate?.name || "U").charAt(0).toUpperCase(),
        feedback: app.aiFeedback,
        jobTitle: app.job?.title || "Unknown Position",
        resumeUrl: app.resumeUrl
      }));
      setCandidates(mappedCandidates);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
      toast.error("Cloud synchronization failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      setUpdatingId(applicationId);
      setErrorIds(prev => ({ ...prev, [applicationId]: null }));

      await updateApplicationStatus(applicationId, newStatus);
      toast.success(`Pipeline state updated: ${newStatus}`);

      setCandidates(prev => prev.map(c =>
        c.id === applicationId ? { ...c, status: newStatus } : c
      ));
    } catch (err) {
      console.error("Failed to update status:", err);
      const errMsg = err.response?.data?.message || "Communication error";
      setErrorIds(prev => ({ ...prev, [applicationId]: errMsg }));
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredCandidates = candidates
    .filter((candidate) => {
      const matchesSearch =
        candidate.name.toLowerCase().includes(search.toLowerCase()) ||
        candidate.jobTitle.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === "all" || candidate.status === filter.toUpperCase();
      const matchesScore = candidate.score >= minScore;

      return matchesSearch && matchesFilter && matchesScore;
    })
    .sort((a, b) => {
      if (sortBy === "score") return b.score - a.score;
      return new Date(b.testDate) - new Date(a.testDate);
    });

  const getStatusConfig = (status) => {
    const map = {
      PENDING: { icon: Clock, color: "text-blue-400", bg: "bg-blue-400/10", label: "PENDING" },
      SHORTLISTED: { icon: Target, color: "text-brand-violet", bg: "bg-brand-violet/10", label: "SELECTED" },
      REJECTED: { icon: XCircle, color: "text-rose-500", bg: "bg-rose-500/10", label: "REJECTED" },
      HIRED: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10", label: "HIRED" },
    };
    return map[status] || map.PENDING;
  };

  if (loading && candidates.length === 0) {
    return (
      <div className="py-32 text-center animate-pulse">
        <div className="w-16 h-16 border-4 border-brand-violet/10 border-t-brand-violet rounded-full animate-spin mx-auto mb-6"></div>
        <p className="text-2xl font-black text-brand-violet tracking-tighter uppercase">Initializing Talent Index...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      {/* Search and Filters */}
      <div className="bg-[var(--color-bg-tertiary)]/80 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-[var(--color-border-primary)] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)]">
        <div className="flex flex-col xl:flex-row gap-8">
          <div className="flex-1">
            <Input
              placeholder="Search talent pool, keywords, or roles..."
              icon={Search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-14 text-lg bg-[var(--color-bg-primary)]/50 border-none shadow-inner"
            />
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <div className="space-y-1.5 min-w-[200px]">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">
                <span>Performance Threshold</span>
                <span className="text-brand-violet">{minScore}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={minScore}
                onChange={(e) => setMinScore(parseInt(e.target.value))}
                className="w-full h-1.5 bg-brand-violet/10 rounded-full appearance-none cursor-pointer accent-brand-violet"
              />
            </div>
            <div className="h-10 w-px bg-[var(--color-border-primary)] hidden xl:block"></div>
            <div className="flex items-center gap-3">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-transparent text-sm font-black uppercase tracking-widest text-[var(--color-text-primary)] focus:outline-none cursor-pointer hover:text-brand-violet transition-colors"
              >
                <option value="all">Global Pipeline</option>
                <option value="applied">Pending</option>
                <option value="shortlisted">Selected</option>
                <option value="hired">Hired</option>
              </select>
              <Filter className="w-4 h-4 text-brand-violet" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredCandidates.map((candidate, index) => {
            const statusCfg = getStatusConfig(candidate.status);
            const isFinalStatus = ["HIRED", "REJECTED"].includes(candidate.status);
            const isExpanded = expandedId === candidate.id;

            return (
              <motion.div
                key={candidate.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className={cn(
                  "p-0 group relative overflow-hidden transition-all duration-500 hover:shadow-[0_48px_80px_-20px_rgba(0,0,0,0.3)]",
                  isExpanded ? "border-brand-violet ring-1 ring-brand-violet/20" : "hover:border-brand-violet/30"
                )}>
                  {/* Score Ring Background */}
                  <div className="absolute top-0 right-0 p-8">
                    <div className="relative w-20 h-20">
                      <svg className="w-full h-full -rotate-90">
                        <circle
                          cx="40" cy="40" r="36"
                          fill="none" stroke="currentColor"
                          strokeWidth="6" className="text-[var(--color-bg-primary)]"
                        />
                        <circle
                          cx="40" cy="40" r="36"
                          fill="none" stroke="currentColor"
                          strokeWidth="6" className={cn(
                            "transition-all duration-1000",
                            candidate.score >= 80 ? "text-emerald-500" : "text-brand-violet"
                          )}
                          strokeDasharray={`${candidate.score * 2.26} 226`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-black text-[var(--color-text-primary)] leading-none">{candidate.score}</span>
                        <span className="text-[8px] font-black text-[var(--color-text-muted)] tracking-tighter">AI IDX</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 space-y-6">
                    <div className="flex gap-5">
                      <div className="w-16 h-16 rounded-[1.25rem] bg-gradient-to-br from-brand-violet to-brand-cyan p-[2px]">
                        <div className="w-full h-full bg-[var(--color-bg-tertiary)] rounded-[1.15rem] flex items-center justify-center text-2xl font-black text-brand-violet">
                          {candidate.avatar}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 pr-24">
                        <h3 className="text-2xl font-black text-[var(--color-text-primary)] tracking-tight truncate leading-tight mb-1">
                          {candidate.name}
                        </h3>
                        <p className="text-xs text-[var(--color-text-secondary)] font-bold uppercase tracking-wider flex items-center gap-1.5 opacity-70">
                          <Building className="w-3.5 h-3.5" />
                          {candidate.jobTitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-center">
                      <div className={cn("inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-bg-primary)] rounded-full border border-[var(--color-border-primary)] shadow-sm")}>
                        <statusCfg.icon className={cn("w-4 h-4", statusCfg.color)} />
                        <span className={cn("text-[10px] font-black uppercase tracking-[0.1em]", statusCfg.color)}>
                          {statusCfg.label}
                        </span>
                      </div>
                      <div className="h-4 w-px bg-[var(--color-border-primary)]"></div>
                      <div className="flex items-center text-[var(--color-text-muted)] text-[10px] font-bold uppercase tracking-widest italic">
                        <Calendar className="w-3.5 h-3.5 mr-2 opacity-50" />
                        {candidate.testDate}
                      </div>
                    </div>

                    {/* Expandable Analysis Area */}
                    <div className={cn(
                      "bg-[var(--color-bg-primary)]/40 rounded-3xl p-6 border border-brand-violet/5 transition-all duration-300",
                      isExpanded ? "ring-2 ring-brand-violet/10" : ""
                    )}>
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : candidate.id)}
                        className="w-full flex items-center justify-between text-[10px] text-brand-violet font-black uppercase tracking-[0.2em] mb-3 group/btn"
                      >
                        <span className="flex items-center gap-2">
                          <Info className="w-3.5 h-3.5" />
                          Deep Intelligence
                        </span>
                        <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isExpanded ? "rotate-180" : "")} />
                      </button>
                      <p className={cn(
                        "text-xs text-[var(--color-text-secondary)] leading-relaxed italic transition-all duration-500",
                        isExpanded ? "" : "line-clamp-2"
                      )}>
                        "{candidate.aiReason}"
                      </p>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-[var(--color-border-primary)]/50">
                      <div className="flex-1 flex gap-2">
                        <button
                          onClick={() => handleStatusUpdate(candidate.id, 'SHORTLISTED')}
                          disabled={updatingId === candidate.id || isFinalStatus}
                          className={cn(
                            "flex-1 h-12 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                            candidate.status === "SHORTLISTED"
                              ? "bg-brand-violet text-white shadow-lg shadow-brand-violet/30"
                              : "bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] border border-[var(--color-border-primary)] hover:border-brand-violet/50"
                          )}
                        >
                          {candidate.status === "SHORTLISTED" ? "Shortlisted" : "Shortlist"}
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(candidate.id, 'HIRED')}
                          disabled={updatingId === candidate.id || isFinalStatus}
                          className="flex-1 h-12 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                        >
                          {candidate.status === "HIRED" ? "Hired" : "Hire"}
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(candidate.id, 'REJECTED')}
                          disabled={updatingId === candidate.id || isFinalStatus}
                          className="w-12 h-12 rounded-2xl flex items-center justify-center bg-rose-500/5 text-rose-500 border border-rose-500/10 hover:bg-rose-500 hover:text-white transition-all"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                      <button
                        onClick={() => window.open(candidate.resumeUrl, '_blank')}
                        className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] hover:border-brand-violet text-brand-violet transition-all"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Loading Overlay */}
                  <AnimatePresence>
                    {updatingId === candidate.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-[var(--color-bg-tertiary)]/60 backdrop-blur-md flex items-center justify-center z-50"
                      >
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-8 h-8 border-[3px] border-brand-violet/20 border-t-brand-violet rounded-full animate-spin"></div>
                          <span className="text-[10px] font-black text-brand-violet tracking-widest uppercase">Syncing...</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredCandidates.length === 0 && !loading && (
        <Card className="py-32 text-center border-dashed border-brand-violet/20 bg-brand-violet/[0.02]">
          <div className="w-24 h-24 bg-brand-violet/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-brand-violet/30">
            <Search className="w-12 h-12" />
          </div>
          <h3 className="text-3xl font-black text-[var(--color-text-primary)] mb-3 tracking-tighter uppercase">No Nodes Found</h3>
          <p className="text-[var(--color-text-secondary)] font-medium max-w-sm mx-auto opacity-70">The current filtering matrix yields zero matching entities. Reset to view global inventory.</p>
          <Button variant="secondary" className="mt-10 h-14 px-10 rounded-2xl shadow-xl shadow-black/5" onClick={() => { setSearch(""); setFilter("all"); setMinScore(0); }}>Clear Global Filters</Button>
        </Card>
      )}
    </div>
  );
}
