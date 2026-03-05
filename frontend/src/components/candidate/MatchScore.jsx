import { motion } from "framer-motion";

function CircularScore({ score, label, size = 120 }) {
    const radius = (size - 16) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    const color = score >= 75 ? "#22c55e" : score >= 50 ? "#eab308" : "#ef4444";

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative" style={{ width: size, height: size }}>
                <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
                    <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--color-border-primary)" strokeWidth="8" />
                    <motion.circle
                        cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        className="text-2xl font-black text-[var(--color-text-primary)]"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {score}%
                    </motion.span>
                </div>
            </div>
            <span className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest">{label}</span>
        </div>
    );
}

function ProgressBar({ label, value, max = 50 }) {
    const pct = Math.min((value / max) * 100, 100);
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">
                <span>{label}</span>
                <span>{value}/{max}</span>
            </div>
            <div className="h-2 bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-brand-violet to-brand-cyan"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
            </div>
        </div>
    );
}

export default function MatchScore({ resumeScore, interviewReadiness, breakdown }) {
    return (
        <div className="space-y-6">
            <div className="flex justify-center gap-8">
                <CircularScore score={resumeScore} label="Resume Score" />
                <CircularScore score={interviewReadiness} label="Interview Ready" />
            </div>

            {breakdown && (
                <div className="space-y-3 pt-4 border-t border-[var(--color-border-primary)]">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">Readiness Breakdown</h4>
                    <ProgressBar label="Skill Match" value={breakdown.skillMatch} max={50} />
                    <ProgressBar label="Projects" value={breakdown.projects} max={20} />
                    <ProgressBar label="Experience" value={breakdown.experience} max={20} />
                    <ProgressBar label="Resume Quality" value={breakdown.resumeQuality} max={10} />
                </div>
            )}
        </div>
    );
}
