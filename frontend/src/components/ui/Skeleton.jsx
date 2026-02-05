import { cn } from "../../utils/cn";

export const Skeleton = ({ className, ...props }) => {
    return (
        <div
            className={cn(
                "animate-shimmer bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%] rounded-md",
                className
            )}
            {...props}
        />
    );
};
