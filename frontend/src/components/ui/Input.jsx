import { cn } from "../../utils/cn";

export const Input = ({ icon: Icon, className, ...props }) => {
    return (
        <div className="relative group/input">
            {Icon && (
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-brand-violet transition-colors" />
            )}
            <input
                className={cn(
                    "w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white placeholder:text-slate-600",
                    "focus:outline-none focus:ring-2 focus:ring-brand-violet/50 focus:border-brand-violet/50 transition-all",
                    Icon && "pl-10",
                    className
                )}
                {...props}
            />
        </div>
    );
};
