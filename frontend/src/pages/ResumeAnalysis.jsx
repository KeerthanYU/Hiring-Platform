import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Upload,
    Loader2,
    Bot,
    FileText,
    Briefcase,
    Sparkles,
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import MatchScoreCard from "../components/candidate/MatchScoreCard";
import { matchResumeWithJob } from "../services/ai.api";
import { toast } from "react-hot-toast";

export default function ResumeAnalysis() {
    const [jobId, setJobId] = useState("");
    const [matchData, setMatchData] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [fileName, setFileName] = useState("");
    const fileInputRef = useRef(null);

    const handleAnalyze = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFileName(file.name);

        if (!jobId.trim()) {
            toast.error("Please enter a Job ID first.");
            return;
        }

        try {
            setIsAnalyzing(true);
            setMatchData(null);
            const data = await matchResumeWithJob(file, jobId);
            setMatchData(data);
            toast.success(
                `Analysis complete! Match score: ${data.matchScore}%`
            );
        } catch (err) {
            console.error("Analysis failed:", err.response?.data || err);
            toast.error(
                err.response?.data?.message || "Resume analysis failed"
            );
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg-primary)] py-12 px-4">
            <div className="max-w-2xl mx-auto space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-violet/10 rounded-full mb-4">
                        <Sparkles className="w-4 h-4 text-brand-violet" />
                        <span className="text-xs font-black text-brand-violet uppercase tracking-widest">
                            AI-Powered
                        </span>
                    </div>
                    <h1 className="text-3xl font-black text-[var(--color-text-primary)]">
                        Resume{" "}
                        <span className="gradient-text">Analysis</span>
                    </h1>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-md mx-auto">
                        Upload your resume and select a job to see how well
                        your skills match.
                    </p>
                </motion.div>

                {/* Input Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card hover={false} className="p-6 space-y-5">
                        {/* Job ID Input */}
                        <div>
                            <label className="text-xs font-black text-[var(--color-text-muted)] uppercase tracking-widest mb-2 block">
                                <Briefcase className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
                                Job ID
                            </label>
                            <input
                                type="text"
                                value={jobId}
                                onChange={(e) => setJobId(e.target.value)}
                                placeholder="Enter job ID to match against"
                                className="w-full px-4 py-3 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] rounded-xl text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-brand-violet/50 transition-colors"
                            />
                        </div>

                        {/* Upload Area */}
                        <div>
                            <label className="text-xs font-black text-[var(--color-text-muted)] uppercase tracking-widest mb-2 block">
                                <FileText className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
                                Resume
                            </label>
                            <div
                                onClick={() =>
                                    fileInputRef.current?.click()
                                }
                                className="w-full p-6 border-2 border-dashed border-[var(--color-border-primary)] rounded-2xl cursor-pointer hover:border-brand-violet/40 transition-all text-center group"
                            >
                                {fileName ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <FileText className="w-5 h-5 text-brand-violet" />
                                        <span className="text-sm font-bold text-[var(--color-text-primary)]">
                                            {fileName}
                                        </span>
                                    </div>
                                ) : (
                                    <>
                                        <Upload className="w-8 h-8 text-[var(--color-text-muted)] mx-auto mb-2 group-hover:text-brand-violet transition-colors" />
                                        <p className="text-xs text-[var(--color-text-secondary)] font-medium">
                                            Click to upload{" "}
                                            <span className="font-bold text-brand-violet">
                                                PDF or DOCX
                                            </span>
                                        </p>
                                    </>
                                )}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,.docx"
                                onChange={handleAnalyze}
                                className="hidden"
                            />
                        </div>

                        {/* Upload Button (re-upload) */}
                        {fileName && !isAnalyzing && (
                            <Button
                                onClick={() =>
                                    fileInputRef.current?.click()
                                }
                                variant="outline"
                                size="sm"
                                className="w-full"
                            >
                                <Upload className="w-4 h-4" />
                                <span>Re-upload & Analyze</span>
                            </Button>
                        )}
                    </Card>
                </motion.div>

                {/* Loading State */}
                <AnimatePresence>
                    {isAnalyzing && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                        >
                            <Card
                                hover={false}
                                className="p-12 text-center"
                            >
                                <div className="relative w-20 h-20 mx-auto mb-6">
                                    <Loader2 className="w-20 h-20 text-brand-violet animate-spin opacity-20" />
                                    <Bot className="w-10 h-10 text-brand-violet absolute inset-0 m-auto animate-bounce" />
                                </div>
                                <h3 className="text-sm font-black text-[var(--color-text-primary)] mb-2">
                                    Analyzing Your Resume
                                </h3>
                                <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest">
                                    Extracting skills &amp; calculating
                                    match score...
                                </p>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Results */}
                <AnimatePresence>
                    {matchData && !isAnalyzing && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <MatchScoreCard data={matchData} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
