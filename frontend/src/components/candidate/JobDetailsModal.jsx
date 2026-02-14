import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Briefcase,
    MapPin,
    DollarSign,
    Clock,
    GraduationCap,
    CheckCircle2,
    Calendar,
    Globe,
    Building2,
    Loader2
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { cn } from "../../utils/cn";

export default function JobDetailsModal({ isOpen, onClose, jobId }) {
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen && jobId) {
            fetchJobDetails();
        }
    }, [isOpen, jobId]);

    const fetchJobDetails = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await api.get(`/jobs/${jobId}`);
            setJob(res.data);
        } catch (err) {
            console.error("Failed to fetch job details:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Failed to load job details. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[var(--color-bg-primary)]/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                    >
                        {/* Header Image/Pattern */}
                        <div className="h-32 bg-gradient-to-r from-brand-violet/20 via-brand-cyan/20 to-brand-violet/20 relative">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                            >
                                <X className="w-5 h-5 text-[var(--color-text-primary)]" />
                            </button>
                            <div className="absolute -bottom-10 left-10 p-1 bg-[var(--color-bg-tertiary)] rounded-3xl border border-[var(--color-border-primary)] shadow-xl">
                                <div className="w-20 h-20 bg-brand-violet/10 rounded-2xl flex items-center justify-center text-brand-violet text-4xl font-black">
                                    {job?.company?.[0] || "?"}
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto pt-16 p-10 space-y-8 custom-scrollbar">
                            {loading ? (
                                <div className="py-20 text-center">
                                    <Loader2 className="w-10 h-10 text-brand-violet animate-spin mx-auto mb-4" />
                                    <p className="text-[var(--color-text-secondary)] font-bold uppercase tracking-widest text-[10px]">Retrieving Data...</p>
                                </div>
                            ) : error ? (
                                <div className="py-20 text-center">
                                    <X className="w-10 h-10 text-rose-500 mx-auto mb-4" />
                                    <p className="text-rose-500 font-bold mb-4">{error}</p>
                                    <Button onClick={fetchJobDetails} variant="secondary">Retry</Button>
                                </div>
                            ) : job && (
                                <>
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap gap-2">
                                            <Badge variant="primary">New Posting</Badge>
                                            {job.jobType && <Badge variant="info">{job.jobType}</Badge>}
                                            {job.experience && <Badge variant="secondary">{job.experience}</Badge>}
                                        </div>
                                        <h2 className="text-4xl font-black text-[var(--color-text-primary)] tracking-tighter uppercase leading-tight">
                                            {job.title}
                                        </h2>
                                        <div className="flex flex-wrap gap-6 text-[var(--color-text-secondary)] font-bold text-sm">
                                            <div className="flex items-center gap-2">
                                                <Building2 className="w-4 h-4 text-brand-violet" />
                                                {job.company}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-brand-violet" />
                                                {job.location}
                                            </div>
                                            {job.salary && (
                                                <div className="flex items-center gap-2 text-emerald-500">
                                                    <DollarSign className="w-4 h-4" />
                                                    {job.salary}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-[var(--color-border-primary)]/50">
                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-violet italic">Job Description</p>
                                            <p className="text-sm text-[var(--color-text-secondary)] leading-loose">
                                                {job.description}
                                            </p>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="space-y-4">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-violet italic">Required Skills</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {(job.skills || "").split(",").map(skill => (
                                                        <span key={skill} className="px-3 py-1 bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-lg text-xs font-bold text-[var(--color-text-primary)]">
                                                            {skill.trim()}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            {job.requirements && (
                                                <div className="space-y-4">
                                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-violet italic">Minimum Requirements</p>
                                                    <div className="space-y-2">
                                                        {(job.requirements || "").split("\n").map((req, i) => (
                                                            <div key={i} className="flex items-start gap-2 text-xs text-[var(--color-text-secondary)] font-medium">
                                                                <CheckCircle2 className="w-3.5 h-3.5 text-brand-violet mt-0.5 shrink-0" />
                                                                {req.trim()}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4">
                                        <div className="flex items-center gap-3 text-[var(--color-text-muted)] text-[10px] font-black uppercase tracking-widest italic">
                                            <Clock className="w-4 h-4 opacity-50" />
                                            Posted on {new Date(job.createdAt).toLocaleDateString()}
                                        </div>
                                        <Button onClick={onClose} className="px-8 h-12 rounded-2xl bg-brand-violet/10 text-brand-violet border border-brand-violet/20 hover:bg-brand-violet hover:text-white transition-all">
                                            Close Gallery
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
