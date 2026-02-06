import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const Card = ({ children, className, hover = true, ...props }) => {
    return (
        <motion.div
            whileHover={hover ? { y: -5 } : {}}
            className={cn(
                "glass-card bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] rounded-2xl p-6 shadow-sm",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};
