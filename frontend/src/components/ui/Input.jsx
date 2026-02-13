import { cn } from "../../utils/cn";

export const Input = ({ className, ...props }) => {
    return (
        <input
            className={cn(
                "w-full px-5 py-3.5 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] text-[var(--color-text-primary)] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brand-violet/10 focus:border-brand-violet/50 placeholder:text-[var(--color-text-muted)] hover:border-[var(--color-text-muted)]/30",
                className
            )}
            {...props}
        />
    );
};
