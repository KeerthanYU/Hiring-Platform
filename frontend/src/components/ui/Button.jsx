import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const Button = ({
    children,
    variant = "primary",
    className,
    ...props
}) => {
    const variants = {
        primary: "btn-primary",
        secondary: "btn-secondary text-[var(--color-text-primary)]",
        ghost: "bg-transparent hover:bg-[var(--color-text-primary)]/5 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] px-4 py-2",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
};
