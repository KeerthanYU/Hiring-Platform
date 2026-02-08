import { useState } from "react";
import { applyJob } from "./api/applyJob";
import ApplyJobModal from "./ApplyJobModal";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function ApplyJob({ jobId, jobTitle = "this job", className = "", children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasApplied, setHasApplied] = useState(false);

    const handleApply = async (resumeFile) => {
        console.log("🔄 ApplyJob component: handleApply called", { jobId, resumeFile });
        try {
            setLoading(true);
            await applyJob(jobId, resumeFile);
            setHasApplied(true);
            setIsModalOpen(false);
            // alert("Application submitted successfully! Our AI is reviewing your resume."); // Removed alert for smoother UX
        } catch (err) {
            console.error("Apply failed:", err);
            alert(err.response?.data?.message || err.message || "Apply failed");
        } finally {
            setLoading(false);
        }
    };

    if (hasApplied) {
        return (
            <div className={`flex items-center justify-center gap-2 text-emerald-500 font-bold bg-emerald-500/10 py-3 rounded-xl border border-emerald-500/20 ${className}`}>
                <CheckCircle2 className="w-5 h-5" />
                Applied
            </div>
        );
    }

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className={className}
                disabled={loading}
            >
                {children || "Apply Now"}
            </button>

            <ApplyJobModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleApply}
                loading={loading}
                jobTitle={jobTitle}
            />
        </>
    );
}
