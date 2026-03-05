import { motion } from "framer-motion";
import { CheckCircle, XCircle, Zap } from "lucide-react";
import { Card } from "../ui/Card";

function CircularProgress({ score }) {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    const getColor = (s) => {
        if (s >= 75) return "#22c55e";
        if (s >= 50) return "#eab308";
        return "#ef4444";
    };

    return (
        <div className="relative w-36 h-36 mx-auto">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle
                    cx="60" cy="60" r={radius}
                    fill="none"
                    stroke="var(--color-border-primary)"
                    strokeWidth="8"
                />
                <motion.circle
                    cx="60" cy="60" r={radius}
                    fill="none"
                    stroke={getColor(score)}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                    className="text-3xl font-black text-[var(--color-text-primary)]"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {score}%
                </motion.span>
                <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">
                    Match
                </span>
            </div>
        </div>
    );
}

function SkillTag({ skill, type }) {
    const styles = {
        matched: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        missing: "bg-rose-500/10 text-rose-500 border-rose-500/20",
        extracted: "bg-brand-violet/10 text-brand-violet border-brand-violet/20",
    };

    const icons = {
        matched: <CheckCircle className="w-3 h-3" />,
        missing: <XCircle className="w-3 h-3" />,
        extracted: <Zap className="w-3 h-3" />,
    };

    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${styles[type]}`}
        >
            {icons[type]}
            {skill}
        </motion.span>
    );
}

export default function MatchScoreCard({ data }) {
    const {
        jobTitle,
        jobCompany,
        extractedSkills,
        matchedSkills,
        missingSkills,
        matchScore,
    } = data;

    return (
        <Card hover={false} className="p-8 space-y-8">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-xl font-black text-[var(--color-text-primary)]">
                    Resume Analysis
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                    {jobTitle} {jobCompany && `at ${jobCompany}`}
                </p>
            </div>

            {/* Score Circle */}
            <CircularProgress score={matchScore} />

            {/* Extracted Skills */}
            <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
                    📄 Extracted Skills ({extractedSkills.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                    {extractedSkills.map((skill) => (
                        <SkillTag key={skill} skill={skill} type="extracted" />
                    ))}
                </div>
            </div>

            {/* Matched Skills */}
            <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-3">
                    ✅ Matched Skills ({matchedSkills.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                    {matchedSkills.length > 0 ? (
                        matchedSkills.map((skill) => (
                            <SkillTag key={skill} skill={skill} type="matched" />
                        ))
                    ) : (
                        <p className="text-xs text-[var(--color-text-muted)]">No matching skills found.</p>
                    )}
                </div>
            </div>

            {/* Missing Skills */}
            <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-rose-500 mb-3">
                    ❌ Missing Skills ({missingSkills.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                    {missingSkills.length > 0 ? (
                        missingSkills.map((skill) => (
                            <SkillTag key={skill} skill={skill} type="missing" />
                        ))
                    ) : (
                        <p className="text-xs text-[var(--color-text-muted)]">You have all required skills! 🎉</p>
                    )}
                </div>
            </div>

            {/* Progress Bar */}
            <div>
                <div className="flex justify-between text-[10px] font-bold text-[var(--color-text-muted)] mb-2 uppercase tracking-widest">
                    <span>Job Fit</span>
                    <span>{matchScore}%</span>
                </div>
                <div className="h-3 bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden">
                    <motion.div
                        className="h-full rounded-full"
                        style={{
                            background: matchScore >= 75
                                ? "linear-gradient(90deg, #22c55e, #4ade80)"
                                : matchScore >= 50
                                    ? "linear-gradient(90deg, #eab308, #facc15)"
                                    : "linear-gradient(90deg, #ef4444, #f87171)",
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${matchScore}%` }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                </div>
            </div>
        </Card>
    );
}
