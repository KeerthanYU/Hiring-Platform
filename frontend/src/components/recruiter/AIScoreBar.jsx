import { cn } from "../../utils/cn";

export const AIScoreBar = ({ score }) => {
    if (score === null || score === undefined) {
        return <span className="text-[var(--color-text-muted)] text-xs font-bold uppercase tracking-widest italic leading-none">Not scored</span>;
    }

    const getScoreColor = (s) => {
        if (s >= 75) return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
        if (s >= 50) return "text-amber-500 bg-amber-500/10 border-amber-500/20";
        return "text-rose-500 bg-rose-500/10 border-rose-500/20";
    };

    const getBarColor = (s) => {
        if (s >= 75) return "bg-emerald-500";
        if (s >= 50) return "bg-amber-500";
        return "bg-rose-500";
    };

    return (
        <div className="w-full space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-black tracking-widest leading-none">AI Match Score</span>
                <span className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-black border",
                    getScoreColor(score)
                )}>
                    {score}%
                </span>
            </div>
            <div className="h-2 w-full bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden border border-[var(--color-border-primary)] shadow-inner">
                <div
                    className={cn("h-full transition-all duration-1000 ease-out", getBarColor(score))}
                    style={{ width: `${score}%` }}
                ></div>
            </div>
        </div>
    );
};
