import { cn } from "../../utils/cn";

export const Input = ({ className, ...props }) => {
    return (
        <input
            className={cn(
                "w-full px-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] text-[var(--color-text-primary)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-violet/50 focus:border-brand-violet placeholder:text-[var(--color-text-secondary)]/50",
                className
            )}
            {...props}
        />
    );
};
