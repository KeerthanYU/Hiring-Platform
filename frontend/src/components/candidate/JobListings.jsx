import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    MapPin,
    Clock,
    Briefcase,
    DollarSign,
    ArrowUpRight,
    Filter,
    CheckCircle2
} from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Input } from "../ui/Input";
import ApplyJob from "./ApplyJob";

export default function JobListings() {
    const [search, setSearch] = useState("");

    // Mock data - in a real app this would come from an API
    const jobs = [
        {
            id: 1,
            title: "Senior Frontend Engineer",
            company: "StarkTech AI",
            location: "San Francisco / Remote",
            salary: "$140k - $190k",
            type: "Full-Time",
            posted: "2 hours ago",
            tags: ["React", "Tailwind", "System Design"],
            level: "Senior"
        },
        {
            id: 2,
            title: "Full Stack Developer",
            company: "Nexus Systems",
            location: "New York / Remote",
            salary: "$120k - $160k",
            type: "Full-Time",
            posted: "5 hours ago",
            tags: ["Node.js", "TypeScript", "PostgreSQL"],
            level: "Mid-Senior"
        },
        {
            id: 3,
            title: "UI/UX Designer",
            company: "Flux Agency",
            location: "London / Remote",
            salary: "$90k - $130k",
            type: "Contract",
            posted: "1 day ago",
            tags: ["Figma", "Design Systems", "Prototyping"],
            level: "Senior"
        },
        {
            id: 4,
            title: "Backend Core Engineer",
            company: "Quantum Labs",
            location: "Remote",
            salary: "$150k - $210k",
            type: "Full-Time",
            posted: "3 days ago",
            tags: ["Go", "Kubernetes", "Redis"],
            level: "Lead"
        }
    ];

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Search & Stats */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="w-full md:max-w-md">
                    <Input
                        placeholder="Search jobs, companies, skills..."
                        icon={Search}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-4 text-slate-500 text-sm font-medium">
                    <span>Showing {filteredJobs.length} opportunities</span>
                    <Button variant="ghost" size="sm" className="gap-2">
                        <Filter className="w-4 h-4" />
                        Sort
                    </Button>
                </div>
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 gap-4">
                <AnimatePresence>
                    {filteredJobs.map((job, index) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className="hover:border-brand-violet/40 group p-6 md:p-8">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-start justify-between md:justify-start gap-4">
                                            <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center text-slate-400 font-black text-xl group-hover:bg-brand-violet/10 group-hover:text-brand-violet transition-all">
                                                {job.company[0]}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white group-hover:text-brand-violet transition-colors">
                                                    {job.title}
                                                </h3>
                                                <p className="text-slate-400 font-medium">{job.company}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="w-4 h-4" />
                                                {job.location}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <DollarSign className="w-4 h-4" />
                                                {job.salary}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-4 h-4" />
                                                {job.posted}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            <Badge variant="info">{job.type}</Badge>
                                            {job.tags.map((tag, i) => (
                                                <Badge key={i}>{tag}</Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-8">
                                        <ApplyJob
                                            jobId={job.id}
                                            jobTitle={job.title}
                                            className="w-full group/btn flex items-center justify-center gap-2 bg-white text-brand-black font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors"
                                        >
                                            Quick Apply
                                            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                        </ApplyJob>
                                        <Button variant="secondary" className="w-full">View Details</Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredJobs.length === 0 && (
                <div className="py-20 text-center">
                    <Briefcase className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No jobs found</h3>
                    <p className="text-slate-400">Try broaden your search terms or filters.</p>
                </div>
            )}
        </div>
    );
}
