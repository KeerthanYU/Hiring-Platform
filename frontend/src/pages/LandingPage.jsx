import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Zap,
    Search,
    Users,
    Bot,
    ArrowRight,
    CheckCircle2,
    LineChart
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-brand-black overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-brand-violet/20 blur-[120px] rounded-full animate-pulse-slow"></div>
                <div className="absolute bottom-[10%] -right-[10%] w-[30%] h-[30%] bg-brand-cyan/10 blur-[100px] rounded-full"></div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-brand-violet/10 text-brand-violet border border-brand-violet/20 rounded-full">
                            Powered by Advanced AI
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-tight">
                            Scale Your Team with <br />
                            <span className="gradient-text">Intelligent Hiring</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Find, assess, and hire the top 1% of talent using our AI-driven assessment engine.
                            Reduce selection time by 80% without compromising on quality.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button variant="primary" className="w-full sm:w-auto text-lg group">
                                <Link to="/register" className="flex items-center">
                                    Get Started for Free
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                            <Button variant="secondary" className="w-full sm:w-auto text-lg">
                                View Live Demo
                            </Button>
                        </div>
                    </motion.div>

                    {/* Floating UI Elements / Dashboard Preview Overlay */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mt-20 relative px-4"
                    >
                        <div className="relative glass border-white/20 rounded-2xl p-2 md:p-4 shadow-3xl max-w-5xl mx-auto overflow-hidden">
                            <div className="bg-brand-gray/50 rounded-xl overflow-hidden aspect-[16/9] flex items-center justify-center">
                                <div className="text-slate-500 animate-pulse text-sm">Dashboard Preview Engine Loading...</div>
                                {/* Decorative Dashboard Lines */}
                                <div className="absolute inset-0 p-8 opacity-20 pointer-events-none">
                                    <div className="w-full h-4 bg-white/10 rounded mb-4"></div>
                                    <div className="grid grid-cols-3 gap-4 mb-4">
                                        <div className="h-20 bg-white/10 rounded"></div>
                                        <div className="h-20 bg-white/10 rounded"></div>
                                        <div className="h-20 bg-white/10 rounded"></div>
                                    </div>
                                    <div className="w-2/3 h-4 bg-white/10 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Top Startups Choose Us</h2>
                        <p className="text-slate-400">Everything you need to automate your recruitment funnel.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="flex flex-col gap-4">
                            <div className="w-12 h-12 bg-brand-violet/10 rounded-lg flex items-center justify-center text-brand-violet">
                                <Bot className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold">AI Assessments</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Automated skill testing that adapts to candidate performance in real-time.
                            </p>
                        </Card>

                        <Card className="flex flex-col gap-4">
                            <div className="w-12 h-12 bg-brand-cyan/10 rounded-lg flex items-center justify-center text-brand-cyan">
                                <Search className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold">Smart Sourcing</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Connect with candidates from our curated pool based on technical alignment.
                            </p>
                        </Card>

                        <Card className="flex flex-col gap-4">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold">Predictive Analytics</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Data-driven insights to predict candidate success and retention.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-white/[0.02] border-y border-white/5 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-bold text-white mb-2">99%</div>
                        <div className="text-sm text-slate-500 uppercase tracking-wider">Accuracy Rate</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-white mb-2">10k+</div>
                        <div className="text-sm text-slate-500 uppercase tracking-wider">Hires Made</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-white mb-2">45%</div>
                        <div className="text-sm text-slate-500 uppercase tracking-wider">Cost Reduction</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-white mb-2">24h</div>
                        <div className="text-sm text-slate-500 uppercase tracking-wider">Avg. Time to Hire</div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-3xl mx-auto glass p-12 rounded-3xl border-brand-violet/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-violet/10 blur-[80px] rounded-full"></div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to find your next unicorn?</h2>
                    <p className="text-slate-400 mb-10">
                        Join 500+ forward-thinking companies reinventing their hiring process.
                    </p>
                    <Button variant="primary" className="px-10 h-14 text-lg">
                        Create Your Account
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/5 text-center text-slate-500 text-sm">
                <p>&copy; 2026 SkillTest AI. All rights reserved. Designed for elite teams.</p>
            </footer>
        </div>
    );
}
