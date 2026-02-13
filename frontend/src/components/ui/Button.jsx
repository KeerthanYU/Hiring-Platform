import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const Button = ({
    children,
    variant = "primary",
    size = "md",
    className,
    ...props
}) => {
    const baseStyles = "cursor-pointer font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed";

    const sizes = {
        sm: "px-4 py-2 text-xs rounded-xl",
        md: "px-6 py-3 text-sm rounded-2xl",
        lg: "px-8 py-4 text-base rounded-2xl",
    };

    const variants = {
        primary: "btn-primary",
        secondary: "bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] border border-[var(--color-border-primary)] hover:bg-[var(--color-border-primary)]",
        outline: "bg-transparent border-2 border-brand-violet text-brand-violet hover:bg-brand-violet hover:text-white",
        ghost: "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]",
        danger: "bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/20 shadow-lg",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                baseStyles,
                sizes[size],
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
};
