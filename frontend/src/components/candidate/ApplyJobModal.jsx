import { useState } from "react";
import {
    FileText,
    X,
    UploadCloud,
    CheckCircle2,
    AlertCircle,
    Loader2,
    ArrowRight
} from "lucide-react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";

export default function ApplyJobModal({ isOpen, onClose, onSubmit, loading, jobTitle }) {
    const [resume, setResume] = useState(null);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type !== "application/pdf") {
                setError("Only PDF files are allowed.");
                setResume(null);
                return;
            }
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setError("File size must be less than 5MB.");
                setResume(null);
                return;
            }
            setError("");
            setResume(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!resume) {
            setError("Please upload a resume.");
            return;
        }
        await onSubmit(resume);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Submit Application"
            className="w-full max-w-lg overflow-hidden border-[var(--color-border-primary)]"
        >
            <div className="p-1">
                <header className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-6 bg-brand-violet rounded-full"></div>
                        <h2 className="text-2xl font-black text-[var(--color-text-primary)] tracking-tight uppercase">
                            Apply for Role
                        </h2>
                    </div>
                    <p className="text-[var(--color-text-secondary)] font-medium text-sm">
                        Position: <span className="text-brand-violet font-bold">{jobTitle}</span>
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-4">
                        <label className="block text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)]">
                            Resume (PDF Only, Max 5MB)
                        </label>

                        <div className={cn(
                            "relative group border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300",
                            resume
                                ? "border-emerald-500/50 bg-emerald-500/5"
                                : "border-[var(--color-border-primary)] hover:border-brand-violet/50 bg-[var(--color-bg-tertiary)] hover:bg-brand-violet/5"
                        )}>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />

                            <div className="flex flex-col items-center gap-4 relative z-0">
                                {resume ? (
                                    <div className="flex flex-col items-center animate-bounce-subtle">
                                        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-2xl flex items-center justify-center mb-4">
                                            <CheckCircle2 className="w-8 h-8" />
                                        </div>
                                        <p className="text-emerald-500 font-bold max-w-xs truncate">{resume.name}</p>
                                        <p className="text-[var(--color-text-muted)] text-xs mt-1">Replace file</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-16 h-16 bg-brand-violet/10 text-brand-violet rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <UploadCloud className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <p className="text-[var(--color-text-primary)] font-bold">Drop your resume here</p>
                                            <p className="text-[var(--color-text-secondary)] text-sm mt-1">or click to browse from device</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-rose-500 text-xs font-bold bg-rose-500/10 p-3 rounded-xl border border-rose-500/20 animate-shake">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                            className="flex-1 order-2 sm:order-1 h-12"
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading || !resume}
                            className="flex-[2] order-1 sm:order-2 h-12 group/btn"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin mx-auto text-white" />
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    Finalize Application
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </Button>
                    </div>
                </form>

                <footer className="mt-8 pt-6 border-t border-[var(--color-border-primary)]">
                    <div className="flex items-center gap-3 text-brand-violet/60">
                        <FileText className="w-4 h-4" />
                        <p className="text-[10px] uppercase font-black tracking-widest leading-none">
                            AI-Powered Resume Analysis will begin instantly after submission
                        </p>
                    </div>
                </footer>
            </div>
        </Modal>
    );
}

// Helper for conditional classes - defining it locally to ensure it works
function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}
