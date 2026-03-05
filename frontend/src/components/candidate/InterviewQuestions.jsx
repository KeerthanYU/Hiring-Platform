import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

export default function InterviewQuestions({ questions }) {
    if (!questions || questions.length === 0) {
        return <p className="text-xs text-[var(--color-text-muted)] italic">No questions generated.</p>;
    }

    return (
        <div className="space-y-3">
            {questions.map((q, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="p-4 bg-[var(--color-bg-tertiary)]/50 rounded-2xl border border-[var(--color-border-primary)] flex items-start gap-3"
                >
                    <div className="w-7 h-7 bg-brand-violet/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-black text-brand-violet">{idx + 1}</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">{q}</p>
                </motion.div>
            ))}
        </div>
    );
}
