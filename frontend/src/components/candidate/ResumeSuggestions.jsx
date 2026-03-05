import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

export default function ResumeSuggestions({ suggestions }) {
    if (!suggestions || suggestions.length === 0) {
        return <p className="text-xs text-[var(--color-text-muted)] italic">No suggestions available.</p>;
    }

    return (
        <div className="space-y-3">
            {suggestions.map((tip, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="p-4 bg-amber-500/5 rounded-2xl border border-amber-500/15 flex items-start gap-3"
                >
                    <div className="w-7 h-7 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                    </div>
                    <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">{tip}</p>
                </motion.div>
            ))}
        </div>
    );
}
