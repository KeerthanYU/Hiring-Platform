import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const Card = ({ children, className, hover = true, ...props }) => {
    return (
        <motion.div
            whileHover={hover ? { y: -5 } : {}}
            className={cn(
                "glass-card",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};
