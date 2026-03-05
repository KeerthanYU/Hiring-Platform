import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Bot, Loader2 } from "lucide-react";
import { Card } from "../components/ui/Card";
import ResumeUpload from "../components/candidate/ResumeUpload";
import SkillTags from "../components/candidate/SkillTags";
import MatchScore from "../components/candidate/MatchScore";
import RecommendedJobs from "../components/candidate/RecommendedJobs";
import SkillGap from "../components/candidate/SkillGap";
import InterviewQuestions from "../components/candidate/InterviewQuestions";
import ResumeSuggestions from "../components/candidate/ResumeSuggestions";
import { analyzeResume } from "../services/ai.api";
import { toast } from "react-hot-toast";

function SectionCard({ title, icon, children, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
        >
            <Card hover={false} className="p-6">
                <h2 className="text-sm font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-4 flex items-center gap-2">
                    {icon}
                    {title}
                </h2>
                {children}
            </Card>
        </motion.div>
    );
}

export default function AIResumeAnalyzer() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fileName, setFileName] = useState("");

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFileName(file.name);
        setIsLoading(true);
        setData(null);

        try {
            const result = await analyzeResume(file);
            setData(result);
            toast.success(`Analysis complete! Found ${result.skills.length} skills.`);
        } catch (err) {
            console.error("Analysis failed:", err.response?.data || err);
            toast.error(err.response?.data?.message || "Resume analysis failed. Please upload a valid resume.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg-primary)] pt-28 pb-12 px-4">
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-violet/10 rounded-full mb-4">
                        <Sparkles className="w-4 h-4 text-brand-violet" />
                        <span className="text-[10px] font-black text-brand-violet uppercase tracking-widest">AI-Powered Analysis</span>
                    </div>
                    <h1 className="text-3xl font-black text-[var(--color-text-primary)]">
                        Resume <span className="gradient-text">Analyzer</span>
                    </h1>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-md mx-auto">
                        Upload your resume to get an instant AI-powered analysis with skill detection, job matching, and interview preparation.
                    </p>
                </motion.div>

                {/* Section 1: Upload */}
                <Card hover={false} className="p-6">
                    <h2 className="text-sm font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-4">📄 Upload Resume</h2>
                    <ResumeUpload onFileSelect={handleFileSelect} isLoading={isLoading} fileName={fileName} />
                </Card>

                {/* Loading */}
                <AnimatePresence>
                    {isLoading && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Card hover={false} className="p-12 text-center">
                                <div className="relative w-20 h-20 mx-auto mb-6">
                                    <Loader2 className="w-20 h-20 text-brand-violet animate-spin opacity-20" />
                                    <Bot className="w-10 h-10 text-brand-violet absolute inset-0 m-auto animate-bounce" />
                                </div>
                                <h3 className="text-sm font-black text-[var(--color-text-primary)] mb-2">Analyzing Your Resume</h3>
                                <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest">
                                    Extracting skills • Matching jobs • Generating insights...
                                </p>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Results */}
                <AnimatePresence>
                    {data && !isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-6"
                        >
                            {/* Section 2: Extracted Skills */}
                            <SectionCard title="Extracted Skills" icon="🔍" delay={0.05}>
                                <SkillTags skills={data.skills} type="extracted" />
                            </SectionCard>

                            {/* Section 3: Scores */}
                            <SectionCard title="AI Resume Score" icon="📊" delay={0.1}>
                                <MatchScore
                                    resumeScore={data.resumeScore}
                                    interviewReadiness={data.interviewReadiness}
                                    breakdown={data.readinessBreakdown}
                                />
                            </SectionCard>

                            {/* Section 4: Recommended Jobs */}
                            <SectionCard title="Recommended Jobs" icon="💼" delay={0.15}>
                                <RecommendedJobs jobs={data.recommendedJobs} />
                            </SectionCard>

                            {/* Section 5: Skill Gap */}
                            <SectionCard title="Skill Gap Analysis" icon="⚠️" delay={0.2}>
                                <SkillGap missingSkills={data.missingSkills} />
                            </SectionCard>

                            {/* Section 6: Interview Questions */}
                            <SectionCard title="Interview Questions" icon="❓" delay={0.25}>
                                <InterviewQuestions questions={data.interviewQuestions} />
                            </SectionCard>

                            {/* Section 7: Suggestions */}
                            <SectionCard title="Resume Improvement Tips" icon="💡" delay={0.3}>
                                <ResumeSuggestions suggestions={data.suggestions} />
                            </SectionCard>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
