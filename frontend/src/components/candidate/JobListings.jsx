import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    MapPin,
    Clock,
    Briefcase,
    DollarSign,
    ArrowUpRight,
    Filter,
    CheckCircle2,
    Loader2,
    ShieldCheck
} from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Input } from "../ui/Input";
import ApplyJob from "./ApplyJob";
import JobDetailsModal from "./JobDetailsModal"; // 👈 ADD
import api from "../../api/axios";
import { fetchCandidateApplications } from "./api/applications";
import useAuth from "../../hooks/useAuth";
import { cn } from "../../utils/cn";

export default function JobListings() {
    const { user } = useAuth();
    const [search, setSearch] = useState("");
    const [jobs, setJobs] = useState([]);
    const [candidateApplications, setCandidateApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedJobId, setSelectedJobId] = useState(null); // 👈 ADD
    const [isDetailsOpen, setIsDetailsOpen] = useState(false); // 👈 ADD

    // Fetch real jobs and candidate applications
    useEffect(() => {
        const loadPageData = async () => {
            try {
                setLoading(true);
                const [jobsRes, appsRes] = await Promise.all([
                    api.get("/jobs"),
                    user?.role === "candidate" ? fetchCandidateApplications() : Promise.resolve([])
                ]);

                setJobs(jobsRes.data);
                setCandidateApplications(appsRes);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch data:", err);
                setError("Failed to load job listings.");
            } finally {
                setLoading(false);
            }
        };

        loadPageData();
    }, [user?.role]);

    const getApplicationForJob = (jobId) => {
        return candidateApplications.find(app => app.jobId === jobId);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "APPLIED": return "warning";
            case "REVIEWED": return "info";
            case "SHORTLISTED": return "primary";
            case "ACCEPTED":
            case "HIRED": return "success";
            case "REJECTED": return "error";
            default: return "default";
        }
    };

    const filteredJobs = jobs.filter(job =>
        (job.title || "").toLowerCase().includes(search.toLowerCase()) ||
        (job.company || "").toLowerCase().includes(search.toLowerCase()) ||
        (job.location || "").toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="py-32 text-center animate-pulse">
                <Loader2 className="w-12 h-12 text-brand-violet mx-auto mb-6 animate-spin" />
                <p className="text-[var(--color-text-secondary)] font-bold tracking-widest uppercase text-xs">Loading Opportunities...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-32 text-center max-w-md mx-auto">
                <div className="w-20 h-20 bg-rose-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Briefcase className="w-10 h-10 text-rose-500" />
                </div>
                <h3 className="text-2xl font-black text-[var(--color-text-primary)] mb-3">Connection Lost</h3>
                <p className="text-[var(--color-text-secondary)] font-medium mb-8 leading-relaxed">{error}</p>
                <Button variant="secondary" className="w-full" onClick={() => window.location.reload()}>
                    Retry Connection
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-12 animate-fade-in py-6">
            {/* Search & Stats Header */}
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between pb-8 border-b border-[var(--color-border-primary)]">
                <div className="w-full md:max-w-xl">
                    <h2 className="text-3xl font-black mb-6 tracking-tight">Discover Your <span className="gradient-text">Next Career Move</span></h2>
                    <Input
                        placeholder="Search jobs, companies, or keywords..."
                        icon={Search}
                        className="shadow-xl shadow-brand-violet/5"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-6 self-end md:self-center">
                    <div className="flex flex-col items-end">
                        <span className="text-2xl font-black text-brand-violet leading-none">{filteredJobs.length}</span>
                        <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-1">Open Positions</span>
                    </div>
                    <Button variant="secondary" size="sm" className="gap-2 px-5">
                        <Filter className="w-4 h-4" />
                        Refine
                    </Button>
                </div>
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredJobs.map((job, index) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className="hover:border-brand-violet/40 group p-2 md:p-3 overflow-hidden">
                                <div className="flex flex-col md:flex-row md:items-stretch gap-6">
                                    {/* Job Info Section */}
                                    <div className="flex-1 p-4 md:p-5 flex flex-col justify-between space-y-8">
                                        <div className="flex items-start gap-6">
                                            <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-bg-tertiary)] to-[var(--color-bg-primary)] rounded-3xl border border-[var(--color-border-primary)] flex items-center justify-center text-brand-violet font-black text-3xl group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 shadow-sm">
                                                {(job.company || "?")[0]}
                                            </div>
                                            <div className="space-y-2 pt-1">
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    <Badge variant="primary">New Posting</Badge>
                                                    {job.type && <Badge variant="info">{job.type}</Badge>}
                                                </div>
                                                <h3 className="text-2xl font-black text-[var(--color-text-primary)] group-hover:text-brand-violet transition-all duration-300 tracking-tight leading-tight">
                                                    {job.title}
                                                </h3>
                                                <p className="text-lg font-bold text-[var(--color-text-secondary)] opacity-80">{job.company}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-x-8 gap-y-4 px-1">
                                            <div className="flex items-center gap-2.5 text-[var(--color-text-secondary)] font-bold text-sm">
                                                <div className="p-2 bg-brand-violet/5 rounded-xl"><MapPin className="w-4 h-4 text-brand-violet" /></div>
                                                {job.location}
                                            </div>
                                            {job.salary && (
                                                <div className="flex items-center gap-2.5 text-[var(--color-text-secondary)] font-bold text-sm">
                                                    <div className="p-2 bg-emerald-500/5 rounded-xl"><DollarSign className="w-4 h-4 text-emerald-500" /></div>
                                                    {job.salary}
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2.5 text-[var(--color-text-muted)] font-bold text-sm">
                                                <div className="p-2 bg-slate-500/5 rounded-xl"><Clock className="w-4 h-4" /></div>
                                                {new Date(job.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Section */}
                                    <div className="bg-[var(--color-bg-tertiary)]/30 dark:bg-white/5 md:w-64 p-6 md:p-8 flex flex-row md:flex-col items-center justify-center gap-4 border-t md:border-t-0 md:border-l border-[var(--color-border-primary)] relative">
                                        {getApplicationForJob(job.id) ? (
                                            <div className="space-y-4 w-full">
                                                <div className="space-y-2">
                                                    <p className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-[0.2em] text-center">Application Status</p>
                                                    <Badge
                                                        variant={getStatusStyle(getApplicationForJob(job.id).status)}
                                                        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl shadow-sm border-2"
                                                    >
                                                        {getApplicationForJob(job.id).status === 'HIRED' || getApplicationForJob(job.id).status === 'ACCEPTED' ? (
                                                            <ShieldCheck className="w-4 h-4" />
                                                        ) : (
                                                            <Clock className="w-4 h-4 animate-pulse-slow" />
                                                        )}
                                                        <span className="text-xs">{getApplicationForJob(job.id).status === 'APPLIED' ? 'PENDING' : getApplicationForJob(job.id).status}</span>
                                                    </Badge>
                                                </div>
                                                <Button
                                                    disabled
                                                    className="w-full bg-white/5 dark:bg-white/5 text-[var(--color-text-muted)] border-[var(--color-border-primary)] scale-[0.98] opacity-60 cursor-not-allowed font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl"
                                                >
                                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                                    Submitted
                                                </Button>
                                            </div>
                                        ) : (
                                            <>
                                                <ApplyJob
                                                    jobId={job.id}
                                                    jobTitle={job.title}
                                                    className="w-full group/btn relative overflow-hidden btn-primary text-sm tracking-tight h-14"
                                                >
                                                    <span>Quick Apply</span>
                                                    <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                                </ApplyJob>
                                                <Button
                                                    variant="secondary"
                                                    className="w-full h-14 bg-white/5 hover:bg-white/10 border-white/5 text-sm"
                                                    onClick={() => {
                                                        setSelectedJobId(job.id);
                                                        setIsDetailsOpen(true);
                                                    }}
                                                >
                                                    View Details
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <JobDetailsModal
                isOpen={isDetailsOpen}
                onClose={() => setIsDetailsOpen(false)}
                jobId={selectedJobId}
            />

            {filteredJobs.length === 0 && !loading && (
                <div className="py-32 text-center max-w-md mx-auto animate-fade-in">
                    <div className="w-24 h-24 bg-[var(--color-bg-tertiary)] rounded-full flex items-center justify-center mx-auto mb-8 opacity-50">
                        <Briefcase className="w-12 h-12 text-[var(--color-text-muted)]" />
                    </div>
                    <h3 className="text-2xl font-black text-[var(--color-text-primary)] mb-3">No Opportunities Found</h3>
                    <p className="text-[var(--color-text-secondary)] font-medium leading-relaxed">
                        {jobs.length === 0
                            ? "We're currently scouring the globe for new positions. Check back in a few hours!"
                            : `We couldn't find any results for "${search}". Try adjusting your keywords.`
                        }
                    </p>
                    <Button variant="ghost" className="mt-8 text-brand-violet font-black underline decoration-2 underline-offset-8" onClick={() => setSearch("")}>
                        Clear All Filters
                    </Button>
                </div>
            )}
        </div>
    );
}
