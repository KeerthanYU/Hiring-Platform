import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Calendar,
  Award,
  ExternalLink,
  CheckCircle2,
  Clock,
  Search,
  Filter
} from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Input } from "../ui/Input";
import { cn } from "../../utils/cn";

export default function CandidateList() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const candidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      score: 92,
      skills: ["React", "TypeScript", "Node.js"],
      status: "qualified",
      testDate: "Feb 1, 2026",
      avatar: "SJ"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.c@example.com",
      score: 88,
      skills: ["JavaScript", "Python", "AWS"],
      status: "qualified",
      testDate: "Jan 30, 2026",
      avatar: "MC"
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma.d@example.com",
      score: 76,
      skills: ["React", "CSS", "UI/UX"],
      status: "pending",
      testDate: "Jan 28, 2026",
      avatar: "ED"
    },
    {
      id: 4,
      name: "James Wilson",
      email: "james.w@example.com",
      score: 84,
      skills: ["Vue", "Node.js", "MongoDB"],
      status: "qualified",
      testDate: "Jan 25, 2026",
      avatar: "JW"
    },
  ];

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch = candidate.name.toLowerCase().includes(search.toLowerCase()) ||
      candidate.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    if (!matchesSearch) return false;
    if (filter === "all") return true;
    return candidate.status === filter;
  });

  return (
    <div className="space-y-8">
      {/* Header / Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5">
        <div className="w-full md:max-w-md">
          <Input
            placeholder="Search candidates or skills..."
            icon={Search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="secondary" className="gap-2 text-xs h-10">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 h-10 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-violet transition-all"
          >
            <option value="all">All Status</option>
            <option value="qualified">Qualified</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Grid of Candidates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredCandidates.map((candidate, index) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:border-brand-violet/30 group">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-brand-violet/10 rounded-2xl flex items-center justify-center text-brand-violet font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                      {candidate.avatar}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-brand-violet transition-colors">
                        {candidate.name}
                      </h3>
                      <div className="flex items-center text-slate-400 text-sm mt-1">
                        <Mail className="w-3.5 h-3.5 mr-1.5" />
                        {candidate.email}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={cn("text-2xl font-black",
                      candidate.score >= 90 ? "text-emerald-400" : "text-brand-violet"
                    )}>
                      {candidate.score}%
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">AI Score</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {candidate.skills.map((skill, idx) => (
                    <Badge key={idx}>{skill}</Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center text-slate-500 text-xs font-semibold tracking-wider">
                      <Calendar className="w-3.5 h-3.5 mr-1.5" />
                      {candidate.testDate}
                    </div>
                    <Badge variant={candidate.status === 'qualified' ? 'success' : 'info'}>
                      {candidate.status}
                    </Badge>
                  </div>
                  <Button variant="ghost" className="p-2 h-auto text-slate-400 hover:text-white">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredCandidates.length === 0 && (
        <Card className="py-20 text-center flex flex-col items-center border-dashed border-white/10">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 text-slate-600">
            <Search className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No candidates matched</h3>
          <p className="text-slate-400">Try adjusting your filters or search keywords.</p>
        </Card>
      )}
    </div>
  );
}
