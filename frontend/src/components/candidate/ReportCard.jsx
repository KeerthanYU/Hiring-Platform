import { motion } from "framer-motion";
import {
  Award,
  TrendingUp,
  Calendar,
  ChevronRight,
  Activity,
  Star,
  Zap,
  CheckCircle2
} from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { cn } from "../../utils/cn";

export default function ReportCard() {
  const reportData = {
    overallScore: 85,
    testsTaken: 5,
    skills: [
      { name: "React", score: 92, level: "Advanced", trend: "up" },
      { name: "JavaScript", score: 88, level: "Advanced", trend: "up" },
      { name: "CSS", score: 82, level: "Intermediate", trend: "stable" },
      { name: "Node.js", score: 78, level: "Intermediate", trend: "up" },
    ],
    recentTests: [
      { title: "React Fundamentals", score: 92, date: "Feb 1, 2026", status: "excellent" },
      { title: "JavaScript ES6+", score: 88, date: "Jan 28, 2026", status: "excellent" },
      { title: "CSS & Responsive Design", score: 82, date: "Jan 25, 2026", status: "good" },
    ]
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-emerald-400";
    if (score >= 80) return "text-brand-violet";
    return "text-brand-cyan";
  };

  const ScoreCircle = ({ score }) => (
    <div className="relative w-40 h-40 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="80"
          cy="80"
          r="70"
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
          className="text-white/5"
        />
        <motion.circle
          cx="80"
          cy="80"
          r="70"
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
          strokeDasharray="440"
          initial={{ strokeDashoffset: 440 }}
          animate={{ strokeDashoffset: 440 - (440 * score) / 100 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-brand-violet"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-black text-white">{score}%</span>
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Mastery</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Overview Section */}
      <Card className="p-10 border-white/10 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-violet/10 blur-[80px] rounded-full"></div>

        <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <ScoreCircle score={reportData.overallScore} />

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <Award className="text-brand-violet w-6 h-6" />
                Elite Performance
              </h2>
              <p className="text-slate-400 mb-6">Your technical skills rank in the top 15% of candidates evaluated this month.</p>
              <div className="flex items-center gap-4">
                <div className="glass px-4 py-2 rounded-xl border-emerald-500/20">
                  <div className="text-emerald-400 font-bold text-lg flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +12%
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase">vs last month</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity className="text-brand-cyan w-5 h-5" />
                  <span className="text-sm font-medium text-slate-300">Tests Completed</span>
                </div>
                <span className="text-xl font-bold text-white">{reportData.testsTaken}</span>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Star className="text-brand-violet w-5 h-5" />
                  <span className="text-sm font-medium text-slate-300">Average Score</span>
                </div>
                <span className="text-xl font-bold text-white">85.4%</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Skills Matrix */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2 px-2">
            <Zap className="text-brand-violet w-5 h-5" />
            Competency Matrix
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportData.skills.map((skill, i) => (
              <Card key={i} className="p-6 hover:border-white/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-white">{skill.name}</h4>
                    <span className="text-xs text-slate-500 font-medium">{skill.level}</span>
                  </div>
                  <span className={cn("text-lg font-black", getScoreColor(skill.score))}>{skill.score}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.score}%` }}
                    className={cn("h-full",
                      skill.score > 90 ? "bg-emerald-500" :
                        skill.score > 80 ? "bg-brand-violet" : "bg-brand-cyan"
                    )}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent History */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2 px-2">
            <Calendar className="text-slate-500 w-5 h-5" />
            History
          </h3>
          <div className="space-y-4">
            {reportData.recentTests.map((test, i) => (
              <div key={i} className="glass p-5 rounded-2xl border-white/5 group hover:border-white/10 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-bold text-white group-hover:text-brand-violet transition-colors">{test.title}</h4>
                  <span className="text-brand-violet text-sm font-black">{test.score}%</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {test.date}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-500">
                    <CheckCircle2 className="w-3 h-3" />
                    {test.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full text-xs">Download Full Transcript</Button>
        </div>
      </div>
    </div>
  );
}
