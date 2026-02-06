import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] text-[var(--color-text-primary)] hover:scale-110 transition-all duration-300 shadow-sm"
            aria-label="Toggle theme"
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
                {theme === "dark" ? (
                    <Moon className="w-5 h-5 text-brand-violet" />
                ) : (
                    <Sun className="w-5 h-5 text-brand-cyan" />
                )}
            </motion.div>
        </button>
    );
}
