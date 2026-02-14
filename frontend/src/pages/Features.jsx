import { motion } from "framer-motion";
import {
    Zap,
    Bot,
    Target,
    Activity,
    ShieldCheck,
    MessageSquare,
    Sparkles,
    ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import ResumeJobMatcher from "../components/ResumeJobMatcher";
import useAuth from "../hooks/useAuth";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export default function Features() {
    const { isAuthenticated } = useAuth();

    const features = [
        {
            icon: Bot,
            title: "AI Resume Analysis",
            description: "Our proprietary AI extracts skills and experience from PDF/DOCX resumes with 99% accuracy.",
            color: "text-brand-violet",
            bgColor: "bg-brand-violet/10"
        },
        {
            icon: Target,
            title: "Smart Job Matching",
            description: "Get instantly matched with roles that align with your unique skill set and career goals.",
            color: "text-brand-cyan",
            bgColor: "bg-brand-cyan/10"
        },
        {
            icon: Activity,
            title: "Performance Tracking",
            description: "Monitor your technical growth and compare your ranking across the platform talent pool.",
            color: "text-emerald-500",
            bgColor: "bg-emerald-500/10"
        },
        {
            icon: ShieldCheck,
            title: "Verified Assessments",
            description: "Skill tests are periodically updated and proctored to ensure high-quality, trustworthy results.",
            color: "text-blue-500",
            bgColor: "bg-blue-500/10"
        },
        {
            icon: Zap,
            title: "Real-time Feedback",
            description: "Receive instant feedback on your applications and test performance to improve your strategy.",
            color: "text-amber-500",
            bgColor: "bg-amber-500/10"
        },
        {
            icon: MessageSquare,
            title: "Direct Recruiter Comm",
            description: "Skip the black hole. Get notified directly when recruiters view your profile or results.",
            color: "text-rose-500",
            bgColor: "bg-rose-500/10"
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--color-bg-primary)] pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Content */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 text-brand-violet font-medium mb-6 uppercase tracking-[0.2em] text-xs"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>Platform Capabilities</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black text-[var(--color-text-primary)] mb-8 leading-[1.1]"
                        >
                            The Future of <br />
                            <span className="gradient-text">Intelligent Hiring</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-[var(--color-text-secondary)] mb-12 max-w-xl leading-relaxed"
                        >
                            SkillTestAI combines advanced resume parsing with predictive matching to help you find your dream role 80% faster. Explore our core features below.
                        </motion.p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 + 0.2 }}
                                >
                                    <Card className="p-6 h-full border-white/5 hover:border-white/10 transition-all flex flex-col gap-4">
                                        <div className={`w-12 h-12 ${feature.bgColor} rounded-2xl flex items-center justify-center ${feature.color}`}>
                                            <feature.icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">{feature.title}</h3>
                                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        {!isAuthenticated && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="mt-12 p-8 glass rounded-3xl border-brand-violet/20 flex flex-col md:flex-row items-center justify-between gap-8"
                            >
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-2">Ready to unlock your potential?</h4>
                                    <p className="text-sm text-slate-400">Create an account to apply instantly to matched roles.</p>
                                </div>
                                <Button variant="primary" className="whitespace-nowrap group">
                                    <Link to="/register" className="flex items-center gap-2">
                                        Join SkillTestAI
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </motion.div>
                        )}
                    </div>

                    {/* Right: Interactive Feature */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="lg:sticky lg:top-32"
                    >
                        <div className="mb-6">
                            <h2 className="text-2xl font-black text-[var(--color-text-primary)] mb-2">Try AI Matching Now</h2>
                            <p className="text-sm text-[var(--color-text-secondary)]">Drop your resume below to see our recommendation engine in action.</p>
                        </div>
                        <ResumeJobMatcher showApply={isAuthenticated} />

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="p-4 bg-[var(--color-bg-secondary)] rounded-2xl border border-[var(--color-border-primary)] text-center">
                                <div className="text-2xl font-black text-brand-violet mb-1">99%</div>
                                <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest font-bold">Accuracy</div>
                            </div>
                            <div className="p-4 bg-[var(--color-bg-secondary)] rounded-2xl border border-[var(--color-border-primary)] text-center">
                                <div className="text-2xl font-black text-brand-cyan mb-1">&lt;2s</div>
                                <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest font-bold">Analysis</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
