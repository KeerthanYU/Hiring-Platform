import { useState } from "react";
import { applyJob } from "./api/applyJob";

export default function ApplyJob({ jobId }) {
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleApply = async () => {
        if (!resume) {
            alert("Please upload resume");
            return;
        }

        try {
            setLoading(true);
            await applyJob(jobId, resume);
            alert("Application submitted successfully");
        } catch (err) {
            alert(err.message);
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
