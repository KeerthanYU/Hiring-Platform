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
  ExternalLink
} from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { AIScoreBar } from "./AIScoreBar";
import { cn } from "../../utils/cn";

export default function CandidateList() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [errorIds, setErrorIds] = useState({}); // Tracking errors per application
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [minScore, setMinScore] = useState(0);
  const [sortBy, setSortBy] = useState("score");

  const loadApplications = async () => {
    try {
      setLoading(true);
      const data = await fetchRecruiterApplications();
      const mappedCandidates = data.map(app => ({
        id: app.id,
        name: app.candidate?.name || "Unknown Candidate",
        email: app.candidate?.email || "No Email",
        score: app.aiScore || 0,
        aiReason: app.aiReason || "No explanation provided.",
        status: (app.status || "APPLIED").toUpperCase(),
        testDate: new Date(app.createdAt).toLocaleDateString(),
        avatar: (app.candidate?.name || "U").charAt(0).toUpperCase(),
        feedback: app.aiFeedback,
        jobTitle: app.job?.title || "Unknown Position",
        resumeUrl: app.resumeUrl
      }));
      setCandidates(mappedCandidates);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
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
      toast.success(`Candidate ${newStatus.toLowerCase()} successfully`);

      // Update local state for immediate feedback
      setCandidates(prev => prev.map(c =>
        c.id === applicationId ? { ...c, status: newStatus } : c
      ));
    } catch (err) {
      console.error("Failed to update status:", err);
      const errMsg = err.response?.data?.message || "Update failed";
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
    switch (status) {
      case 'APPLIED': return { variant: 'info', icon: Clock, label: 'APPLIED', color: 'text-blue-400', bg: 'bg-blue-400/10' };
      case 'REVIEWED': return { variant: 'warning', icon: Search, label: 'REVIEWED', color: 'text-amber-400', bg: 'bg-amber-400/10' };
      case 'SHORTLISTED': return { variant: 'success', icon: UserCheck, label: 'SHORTLISTED', color: 'text-blue-500', bg: 'bg-blue-500/10' };
      case 'REJECTED': return { variant: 'danger', icon: XCircle, label: 'REJECTED', color: 'text-rose-500', bg: 'bg-rose-500/10' };
      case 'ACCEPTED':
      case 'HIRED': return { variant: 'success', icon: CheckCircle2, label: status, color: 'text-emerald-500', bg: 'bg-emerald-500/10' };
      default: return { variant: 'info', icon: Clock, label: status, color: 'text-slate-400', bg: 'bg-slate-400/10' };
    }
  };

  if (loading && candidates.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-brand-violet/20 border-t-brand-violet rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[var(--color-text-secondary)] font-medium">Fetching talent pool...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header / Search omitted for brevity in thought, but should be here */}
      <div className="flex flex-col gap-4 bg-[var(--color-bg-tertiary)] p-6 rounded-2xl border border-[var(--color-border-primary)] shadow-xl shadow-black/5">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:max-w-md">
            <Input
              placeholder="Search candidates or roles..."
              icon={Search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] font-medium">
              <Filter className="w-4 h-4" />
              <span>Status:</span>
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-xl px-4 h-12 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-brand-violet/50 transition-all font-medium min-w-[140px]"
            >
              <option value="all">All Statuses</option>
              <option value="applied">Applied</option>
              <option value="reviewed">Reviewed</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
              <option value="hired">Hired</option>
              <option value="accepted">Accepted</option>
            </select>
          </div>
        </div>

        <div className="h-px bg-[var(--color-border-primary)] w-full"></div>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex items-center gap-4 w-full md:w-auto flex-1 max-w-sm">
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] font-medium whitespace-nowrap">
              <SlidersHorizontal className="w-4 h-4 text-brand-violet" />
              <span>Min AI Score:</span>
              <span className="text-brand-violet font-black">{minScore}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={minScore}
              onChange={(e) => setMinScore(parseInt(e.target.value))}
              className="flex-1 h-1.5 bg-[var(--color-bg-primary)] rounded-lg appearance-none cursor-pointer accent-brand-violet"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] font-medium">
              <span>Sort By:</span>
            </div>
            <div className="flex p-1 bg-[var(--color-bg-primary)] rounded-xl border border-[var(--color-border-primary)]">
              <button
                onClick={() => setSortBy("score")}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                  sortBy === "score" ? "bg-brand-violet text-white shadow-lg shadow-brand-violet/20" : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                )}
              >
                Top Matches
              </button>
              <button
                onClick={() => setSortBy("date")}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                  sortBy === "date" ? "bg-brand-violet text-white shadow-lg shadow-brand-violet/20" : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                )}
              >
                Newest First
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCandidates.map((candidate, index) => {
            const statusCfg = getStatusConfig(candidate.status);
            const isFinalStatus = ["ACCEPTED", "REJECTED", "HIRED"].includes(candidate.status);

            return (
              <motion.div
                key={candidate.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
              >
                <Card className="hover:border-brand-violet/40 group p-6 relative overflow-hidden h-full flex flex-col">
                  <div className={cn(
                    "absolute -right-12 -top-12 w-24 h-24 blur-[40px] opacity-20 rounded-full transition-all duration-500",
                    candidate.score >= 80 ? "bg-emerald-500" : "bg-brand-violet"
                  )}></div>

                  <div className="flex items-start justify-between mb-6 relative">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-brand-violet/20 to-brand-cyan/20 rounded-2xl flex items-center justify-center text-brand-violet font-black text-xl shadow-inner">
                        {candidate.avatar}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[var(--color-text-primary)] group-hover:text-brand-violet transition-colors">
                          {candidate.name}
                        </h3>
                        <div className="flex items-center text-[var(--color-text-muted)] text-xs mt-1 font-medium italic">
                          <Building className="w-3 h-3 mr-1" />
                          {candidate.jobTitle}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <AIScoreBar score={candidate.score} />
                  </div>

                  <div className="bg-brand-violet/5 rounded-xl p-4 mb-6 flex-1">
                    <p className="text-[10px] text-brand-violet font-black uppercase tracking-[0.2em] mb-2">AI Analysis</p>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed italic line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                      "{candidate.aiReason}"
                    </p>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-[var(--color-border-primary)] relative">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-[var(--color-text-muted)] text-[10px] font-black uppercase tracking-widest italic">
                        <Calendar className="w-3 h-3 mr-2" />
                        Received: {candidate.testDate}
                      </div>
                      <div className={cn("flex items-center gap-2 px-3 py-1 rounded-full", statusCfg.bg)}>
                        <statusCfg.icon className={cn("w-3.5 h-3.5", statusCfg.color)} />
                        <span className={cn("text-[10px] font-black uppercase tracking-widest", statusCfg.color)}>
                          {statusCfg.label}
                        </span>
                      </div>
                    </div>

                    {errorIds[candidate.id] && (
                      <p className="text-[10px] text-rose-500 font-bold text-center animate-pulse">
                        {errorIds[candidate.id]}
                      </p>
                    )}

                    <div className="flex gap-2">
                      <div className="flex-1 flex gap-1.5">
                        <Button
                          size="sm"
                          variant="ghost"
                          className={cn(
                            "flex-1 text-[10px] font-black uppercase tracking-tighter h-9 border border-blue-500/20 text-blue-400 hover:bg-blue-500/10 disabled:opacity-30",
                            candidate.status === "SHORTLISTED" && "bg-blue-500/20 border-blue-500"
                          )}
                          disabled={updatingId === candidate.id || isFinalStatus || candidate.status === "SHORTLISTED"}
                          onClick={() => handleStatusUpdate(candidate.id, 'SHORTLISTED')}
                        >
                          Shortlist
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className={cn(
                            "flex-1 text-[10px] font-black uppercase tracking-tighter h-9 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 disabled:opacity-30",
                            candidate.status === "ACCEPTED" && "bg-emerald-500/20 border-emerald-500"
                          )}
                          disabled={updatingId === candidate.id || isFinalStatus}
                          onClick={() => handleStatusUpdate(candidate.id, 'ACCEPTED')}
                        >
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className={cn(
                            "flex-1 text-[10px] font-black uppercase tracking-tighter h-9 border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 disabled:opacity-30",
                            candidate.status === "REJECTED" && "bg-rose-500/20 border-rose-500"
                          )}
                          disabled={updatingId === candidate.id || isFinalStatus}
                          onClick={() => handleStatusUpdate(candidate.id, 'REJECTED')}
                        >
                          Reject
                        </Button>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="px-3"
                        onClick={() => window.open(candidate.resumeUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>

                    {updatingId === candidate.id && (
                      <div className="absolute inset-0 bg-[var(--color-bg-primary)]/40 backdrop-blur-[1px] flex items-center justify-center rounded-xl">
                        <div className="w-5 h-5 border-2 border-brand-violet/20 border-t-brand-violet rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredCandidates.length === 0 && !loading && (
        <Card className="py-24 text-center flex flex-col items-center border-dashed border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)]/50 backdrop-blur-xl">
          <div className="w-20 h-20 bg-brand-violet/5 rounded-full flex items-center justify-center mb-6 text-brand-violet/40">
            <Search className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black text-[var(--color-text-primary)] mb-2 uppercase tracking-tighter">No candidates found</h3>
          <p className="text-[var(--color-text-secondary)] font-medium max-w-xs mx-auto">Try adjusting your filters or search keywords to find the right talent.</p>
          <Button variant="secondary" className="mt-8" onClick={() => { setSearch(""); setFilter("all"); }}>Clear Filters</Button>
        </Card>
      )}
    </div>
  );
}
