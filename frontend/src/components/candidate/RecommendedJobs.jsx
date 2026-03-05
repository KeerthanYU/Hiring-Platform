import { motion } from "framer-motion";
import { Briefcase, TrendingUp } from "lucide-react";

export default function RecommendedJobs({ jobs }) {
    if (!jobs || jobs.length === 0) {
        return <p className="text-xs text-[var(--color-text-muted)] italic">No job recommendations available.</p>;
    }

    const getScoreColor = (score) => {
        if (score >= 75) return "text-emerald-500 bg-emerald-500/10";
        if (score >= 50) return "text-amber-500 bg-amber-500/10";
        return "text-rose-500 bg-rose-500/10";
    };

    return (
        <div className="space-y-3">
            {jobs.map((job, idx) => (
                <motion.div
                    key={job.jobId}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="p-4 bg-[var(--color-bg-tertiary)]/50 rounded-2xl border border-[var(--color-border-primary)] hover:border-brand-violet/30 transition-all group"
                >
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-brand-violet/10 rounded-xl flex items-center justify-center mt-0.5">
                                <Briefcase className="w-5 h-5 text-brand-violet" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-[var(--color-text-primary)] group-hover:text-brand-violet transition-colors">
                                    {job.title}
                                </h4>
                                <p className="text-[10px] text-[var(--color-text-secondary)] font-medium">{job.company}</p>
                            </div>
                        </div>
                        <span className={`text-xs font-black px-3 py-1 rounded-full ${getScoreColor(job.matchScore)}`}>
                            {job.matchScore}%
                        </span>
                    </div>

                    {/* Match bar */}
                    <div className="mt-3 h-1.5 bg-[var(--color-border-primary)] rounded-full overflow-hidden">
                        <motion.div
                            className="h-full rounded-full"
                            style={{
                                background: job.matchScore >= 75
                                    ? "linear-gradient(90deg, #22c55e, #4ade80)"
                                    : job.matchScore >= 50
                                        ? "linear-gradient(90deg, #eab308, #facc15)"
                                        : "linear-gradient(90deg, #ef4444, #f87171)",
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${job.matchScore}%` }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
