import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const Card = ({ children, className, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn("glass-card", className)}
            {...props}
        >
            {children}
        </motion.div>
    );
};
