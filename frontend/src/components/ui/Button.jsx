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
        secondary: "btn-secondary",
        ghost: "bg-transparent hover:bg-white/5 text-white/70 hover:text-white px-4 py-2",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
};
