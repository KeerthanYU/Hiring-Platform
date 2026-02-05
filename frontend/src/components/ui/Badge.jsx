import { cn } from "../../utils/cn";

export const Badge = ({ children, variant = "default", className }) => {
    const variants = {
        default: "bg-white/5 text-slate-300 border-white/10",
        primary: "bg-brand-violet/10 text-brand-violet border-brand-violet/20",
        success: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        info: "bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20",
        warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    };

    return (
        <span className={cn(
            "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border",
            variants[variant],
            className
        )}>
            {children}
        </span>
    );
};
