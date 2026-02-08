import { useState } from "react";
import { applyJob } from "./api/applyJob";
import ApplyJobModal from "./ApplyJobModal";

export default function ApplyJob({ jobId, jobTitle = "this job" }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasApplied, setHasApplied] = useState(false);

    const handleApply = async (resumeFile) => {
        try {
            setLoading(true);
            await applyJob(jobId, resumeFile);
            setHasApplied(true);
            setIsModalOpen(false);
            alert("Application submitted successfully! Our AI is reviewing your resume.");
        } catch (err) {
            console.error("Apply failed:", err);
            alert(err.response?.data?.message || err.message || "Apply failed");
        } finally {
            setLoading(false);
        }
    };

    if (hasApplied) {
        return (
            <button
                disabled
                className="px-6 py-2 bg-green-600 text-white rounded-lg cursor-default opacity-80 font-medium"
            >
                Applied ✓
            </button>
        );
    }

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
            >
                Apply Now
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
