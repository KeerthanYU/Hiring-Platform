import { cn } from "../../utils/cn";

export const Badge = ({ children, variant = "default", className }) => {
    const variants = {
        default: "bg-slate-500/10 text-slate-500 border-slate-500/20",
        primary: "bg-brand-violet/15 text-brand-violet border-brand-violet/30",
        success: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
        info: "bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30",
        warning: "bg-amber-500/15 text-amber-500 border-amber-500/30",
        error: "bg-rose-500/15 text-rose-500 border-rose-500/30",
    };

    return (
        <span className={cn(
            "px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-widest border transition-all duration-300",
            variants[variant],
            className
        )}>
            {children}
        </span>
    );
};
