import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText,
    Sparkles,
    ArrowRight,
    Loader2,
    Bot,
    Plus,
} from "lucide-react";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import ApplyJob from "./candidate/ApplyJob";
import { getJobRecommendations } from "../services/jobMatch.api";
import { toast } from "react-hot-toast";

export default function ResumeJobMatcher({ showApply = true }) {
    const [recommendations, setRecommendations] = useState([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const fileInputRef = useRef(null);

    const handleResumeUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setIsAnalyzing(true);
            const data = await getJobRecommendations(file);
            setRecommendations(data.bestMatches);
            toast.success(`Analysis complete! Identified ${data.resumeSkills.length} skills.`);
        } catch (err) {
            console.error("Analysis failed:", err);
            toast.error(err.response?.data?.message || "Resume analysis failed");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <Card className="p-6 bg-gradient-to-br from-brand-violet/10 to-transparent border-brand-violet/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-violet/5 blur-[40px] rounded-full pointer-events-none"></div>

            <div className="flex items-center justify-between mb-6 relative z-10">
                <div>
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] leading-tight">Best Jobs For You</h3>
                    <p className="text-[10px] text-brand-violet font-black uppercase tracking-widest mt-1">AI Recommendation</p>
                </div>
                <div className="p-2 bg-brand-violet/10 rounded-xl">
                    <Sparkles className="w-5 h-5 text-brand-violet" />
                </div>
            </div>

            {isAnalyzing ? (
                <div className="py-12 text-center animate-fade-in">
                    <div className="relative w-16 h-16 mx-auto mb-6">
                        <Loader2 className="w-16 h-16 text-brand-violet animate-spin opacity-20" />
                        <Bot className="w-8 h-8 text-brand-violet absolute inset-0 m-auto animate-bounce" />
                    </div>
                    <h4 className="text-sm font-bold text-[var(--color-text-primary)] mb-2">Analyzing Resume</h4>
                    <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-tighter">Matching skills with target roles...</p>
                </div>
            ) : recommendations.length > 0 ? (
                <div className="space-y-4 animate-fade-in">
                    {recommendations.map((job, idx) => (
                        <motion.div
                            key={job.jobId}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-4 bg-[var(--color-bg-tertiary)]/50 rounded-2xl border border-[var(--color-border-primary)] hover:border-brand-violet/30 transition-all group relative"
                        >
                            <div className="absolute top-4 right-4">
                                <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">{job.score}% Match</span>
                            </div>
                            <h4 className="text-sm font-bold text-[var(--color-text-primary)] mb-1 group-hover:text-brand-violet transition-colors">{job.title}</h4>
                            <p className="text-[10px] text-[var(--color-text-secondary)] font-medium mb-3">{job.company}</p>

                            <div className="flex flex-wrap gap-1 mb-4">
                                {job.matchedSkills.slice(0, 3).map(skill => (
                                    <span key={skill} className="text-[9px] bg-brand-violet/5 text-brand-violet px-2 py-0.5 rounded-lg font-bold uppercase border border-brand-violet/10">
                                        {skill}
                                    </span>
                                ))}
                                {job.matchedSkills.length > 3 && (
                                    <span className="text-[9px] text-[var(--color-text-muted)] font-black">+{job.matchedSkills.length - 3}</span>
                                )}
                            </div>

                            {showApply ? (
                                <ApplyJob
                                    jobId={job.jobId}
                                    jobTitle={job.title}
                                    className="w-full h-10 bg-brand-violet text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
                                >
                                    <span>Apply Now</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </ApplyJob>
                            ) : (
                                <p className="text-[10px] text-center text-brand-violet font-bold py-2 bg-brand-violet/5 rounded-xl border border-brand-violet/10">
                                    Sign in to Apply
                                </p>
                            )}
                        </motion.div>
                    ))}
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-3 text-[10px] font-black text-brand-violet uppercase tracking-widest hover:bg-brand-violet/5 rounded-xl transition-all mt-2 border border-dashed border-brand-violet/20"
                    >
                        Refresh Analysis
                    </button>
                </div>
            ) : (
                <div className="text-center py-6 animate-fade-in relative z-10">
                    <div className="w-16 h-16 bg-[var(--color-bg-tertiary)] rounded-2xl flex items-center justify-center mx-auto mb-6 text-[var(--color-text-muted)]">
                        <FileText className="w-8 h-8 opacity-20" />
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)] font-medium mb-8 leading-relaxed px-4">
                        Upload your resume to see personalized <span className="text-brand-violet font-bold">AI-driven</span> matches.
                    </p>
                    <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] hover:opacity-90 h-12 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-brand-violet/10"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Upload Resume
                    </Button>
                </div>
            )}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleResumeUpload}
                className="hidden"
                accept=".pdf,.docx"
            />
        </Card>
    );
}
