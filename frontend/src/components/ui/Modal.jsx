import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

export const Modal = ({ isOpen, onClose, title, children, className }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!mounted) return null;

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className={cn(
                            "relative w-full max-w-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] rounded-2xl shadow-2xl overflow-hidden z-50",
                            className
                        )}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-6 border-b border-[var(--color-border-primary)]">
                            <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{title}</h3>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-[var(--color-text-primary)]/5 text-[var(--color-text-secondary)] transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );

    const portalRoot = document.getElementById("modal-root") || document.body;
    return createPortal(modalContent, portalRoot);
};
