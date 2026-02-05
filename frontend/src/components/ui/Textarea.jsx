import { cn } from "../../utils/cn";

export const Textarea = ({ icon: Icon, className, ...props }) => {
    return (
        <div className="relative group/textarea">
            {Icon && (
                <Icon className="absolute left-3 top-4 w-4 h-4 text-slate-500 group-focus-within/textarea:text-brand-violet transition-colors" />
            )}
            <textarea
                className={cn(
                    "w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-slate-600",
                    "focus:outline-none focus:ring-2 focus:ring-brand-violet/50 focus:border-brand-violet/50 transition-all resize-none",
                    Icon && "pl-10",
                    className
                )}
                {...props}
            />
        </div>
    );
};
