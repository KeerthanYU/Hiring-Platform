import { useState } from "react";
import { applyJob } from "./api/applications";

export default function ApplyJob({ jobId }) {
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleApply = async () => {
        console.log("Apply button clicked");
        if (!resume) {
            alert("Please upload your resume");
            return;
        }

        try {
            setLoading(true);
            await applyJob(jobId, resume);
            alert("Application submitted successfully");
        } catch (err) {
            alert(err.response?.data?.message || "Apply failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept=".pdf"
                onChange={(e) => setResume(e.target.files[0])}
            />

            <button onClick={handleApply} disabled={loading}>
                {loading ? "Applying..." : "Apply"}
            </button>
        </div>
    );
}
