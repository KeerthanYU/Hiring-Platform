import { motion } from "framer-motion";
import { Zap, CheckCircle, XCircle } from "lucide-react";

const typeConfig = {
    extracted: { style: "bg-brand-violet/10 text-brand-violet border-brand-violet/20", icon: Zap },
    matched: { style: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20", icon: CheckCircle },
    missing: { style: "bg-rose-500/10 text-rose-500 border-rose-500/20", icon: XCircle },
};

export default function SkillTags({ skills, type = "extracted", label }) {
    const { style, icon: Icon } = typeConfig[type] || typeConfig.extracted;

    return (
        <div>
            {label && (
                <h3 className="text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
                    {label} ({skills.length})
                </h3>
            )}
            <div className="flex flex-wrap gap-2">
                {skills.length > 0 ? (
                    skills.map((skill, i) => (
                        <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.03 }}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${style}`}
                        >
                            <Icon className="w-3 h-3" />
                            {skill}
                        </motion.span>
                    ))
                ) : (
                    <p className="text-xs text-[var(--color-text-muted)] italic">None detected</p>
                )}
            </div>
        </div>
    );
}
