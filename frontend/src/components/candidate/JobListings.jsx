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
    Loader2
} from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Input } from "../ui/Input";
import ApplyJob from "./ApplyJob";
import api from "../../api/axios";

export default function JobListings() {
    const [search, setSearch] = useState("");
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch real jobs from the backend API
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const response = await api.get("/jobs");
                setJobs(response.data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch jobs:", err);
                setError("Failed to load job listings.");
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter(job =>
        (job.title || "").toLowerCase().includes(search.toLowerCase()) ||
        (job.company || "").toLowerCase().includes(search.toLowerCase()) ||
        (job.location || "").toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="py-20 text-center">
                <Loader2 className="w-8 h-8 text-brand-violet mx-auto mb-4 animate-spin" />
                <p className="text-[var(--color-text-secondary)]">Loading jobs...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-20 text-center">
                <Briefcase className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Error</h3>
                <p className="text-[var(--color-text-secondary)]">{error}</p>
                <Button variant="secondary" className="mt-4" onClick={() => window.location.reload()}>
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Search & Stats */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="w-full md:max-w-md">
                    <Input
                        placeholder="Search jobs, companies, locations..."
                        icon={Search}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-4 text-slate-500 text-sm font-medium">
                    <span>Showing {filteredJobs.length} opportunities</span>
                    <Button variant="ghost" size="sm" className="gap-2">
                        <Filter className="w-4 h-4" />
                        Sort
                    </Button>
                </div>
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 gap-4">
                <AnimatePresence>
                    {filteredJobs.map((job, index) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className="hover:border-brand-violet/40 group p-6 md:p-8">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-start justify-between md:justify-start gap-4">
                                            <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center text-slate-400 font-black text-xl group-hover:bg-brand-violet/10 group-hover:text-brand-violet transition-all">
                                                {(job.company || "?")[0]}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-[var(--color-text-primary)] group-hover:text-brand-violet transition-colors">
                                                    {job.title}
                                                </h3>
                                                <p className="text-[var(--color-text-secondary)] font-medium">{job.company}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-[var(--color-text-muted)]">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="w-4 h-4" />
                                                {job.location}
                                            </div>
                                            {job.salary && (
                                                <div className="flex items-center gap-1.5">
                                                    <DollarSign className="w-4 h-4" />
                                                    {job.salary}
                                                </div>
                                            )}
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-4 h-4" />
                                                {new Date(job.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto border-t md:border-t-0 md:border-l border-[var(--color-border-primary)] pt-6 md:pt-0 md:pl-8">
                                        <ApplyJob
                                            jobId={job.id}
                                            jobTitle={job.title}
                                            className="w-full group/btn flex items-center justify-center gap-2 bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] font-bold py-3 rounded-xl hover:opacity-90 transition-colors"
                                        >
                                            Quick Apply
                                            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                        </ApplyJob>
                                        <Button variant="secondary" className="w-full">View Details</Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredJobs.length === 0 && !loading && (
                <div className="py-20 text-center">
                    <Briefcase className="w-16 h-16 text-[var(--color-text-muted)] mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">No jobs found</h3>
                    <p className="text-[var(--color-text-secondary)]">
                        {jobs.length === 0
                            ? "No jobs have been posted yet. Check back later!"
                            : "Try broadening your search terms or filters."
                        }
                    </p>
                </div>
            )}
        </div>
    );
}
