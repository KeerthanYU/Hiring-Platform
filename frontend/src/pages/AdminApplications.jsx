import { useState, useEffect } from "react";
import axios from "axios";
import {
    Users,
    Briefcase,
    FileText,
    TrendingUp,
    Search,
    Filter,
    CheckCircle2,
    XCircle,
    Clock,
    ExternalLink,
    ShieldCheck
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { cn } from "../utils/cn";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5002/api";

export default function AdminApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const res = await axios.get(`${API_BASE_URL}/admin/applications`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) {
                setApplications(res.data.applications);
            }
        } catch (err) {
            console.error("Failed to fetch admin applications:", err);
        } finally {
            setLoading(false);
        }
    };

    const filteredApps = applications.filter(app => {
        const searchLower = search.toLowerCase();
        const candidateMatches = app.candidate?.name?.toLowerCase().includes(searchLower);
        const jobMatches = app.job?.title?.toLowerCase().includes(searchLower);
        const recruiterMatches = app.recruiter?.name?.toLowerCase().includes(searchLower);

        const matchesSearch = candidateMatches || jobMatches || recruiterMatches;
        const matchesFilter = filter === "all" || app.status === filter.toUpperCase();

        return matchesSearch && matchesFilter;
    });

    const getStatusBadge = (status) => {
        const statusMap = {
            APPLIED: { color: "text-blue-400", bg: "bg-blue-400/10", icon: Clock },
            REVIEWED: { color: "text-amber-400", bg: "bg-amber-400/10", icon: Search },
            SHORTLISTED: { color: "text-blue-500", bg: "bg-blue-500/10", icon: ShieldCheck },
            REJECTED: { color: "text-rose-500", bg: "bg-rose-500/10", icon: XCircle },
            ACCEPTED: { color: "text-emerald-500", bg: "bg-emerald-500/10", icon: CheckCircle2 },
            HIRED: { color: "text-emerald-500", bg: "bg-emerald-500/10", icon: CheckCircle2 },
        };

        const config = statusMap[status] || statusMap.APPLIED;
        const Icon = config.icon;

        return (
            <div className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest", config.bg, config.color)}>
                <Icon className="w-3 h-3" />
                {status}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg-primary)] p-8">
            <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-black text-[var(--color-text-primary)] tracking-tighter uppercase">
                            System Applications
                        </h1>
                        <p className="text-[var(--color-text-secondary)] font-medium mt-1">
                            Global visibility into all candidate submissions
                        </p>
                    </div>
                    <div className="flex gap-4 p-1 bg-[var(--color-bg-tertiary)] rounded-2xl border border-[var(--color-border-primary)] shadow-xl">
                        <div className="px-6 py-3 border-r border-[var(--color-border-primary)]">
                            <p className="text-[10px] text-[var(--color-text-muted)] font-black uppercase tracking-widest mb-1">Total</p>
                            <p className="text-2xl font-black text-brand-violet">{applications.length}</p>
                        </div>
                        <div className="px-6 py-3">
                            <p className="text-[10px] text-[var(--color-text-muted)] font-black uppercase tracking-widest mb-1">Filtered</p>
                            <p className="text-2xl font-black text-brand-cyan">{filteredApps.length}</p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[var(--color-bg-tertiary)] p-6 rounded-2xl border border-[var(--color-border-primary)] shadow-2xl">
                    <div className="md:col-span-2">
                        <Input
                            icon={Search}
                            placeholder="Search by candidate, job, or recruiter..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-xl px-4 h-12 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-brand-violet/50 transition-all font-bold"
                        >
                            <option value="all">All Statuses</option>
                            <option value="applied">Applied</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-2xl border border-[var(--color-border-primary)] shadow-2xl bg-[var(--color-bg-tertiary)] backdrop-blur-3xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[var(--color-border-primary)] bg-[var(--color-bg-primary)]/50">
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[var(--color-text-secondary)]">Candidate</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[var(--color-text-secondary)]">Job / Recruiter</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[var(--color-text-secondary)]">AI Score</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[var(--color-text-secondary)]">Status</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[var(--color-text-secondary)]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border-primary)]/40">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="p-20 text-center">
                                        <div className="w-10 h-10 border-4 border-brand-violet/20 border-t-brand-violet rounded-full animate-spin mx-auto mb-4"></div>
                                        <p className="font-bold text-[var(--color-text-secondary)]">Loading global data...</p>
                                    </td>
                                </tr>
                            ) : filteredApps.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-20 text-center text-[var(--color-text-muted)] italic font-medium">
                                        No applications matching your search criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredApps.map((app) => (
                                    <tr key={app.id} className="hover:bg-brand-violet/[0.02] transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-brand-violet/10 flex items-center justify-center font-black text-brand-violet group-hover:scale-110 transition-transform">
                                                    {(app.candidate?.name || "U").charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-[var(--color-text-primary)]">{app.candidate?.name || "Unknown"}</p>
                                                    <p className="text-xs text-[var(--color-text-secondary)]">{app.candidate?.email || "No email"}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div>
                                                <p className="font-bold text-[var(--color-text-primary)]">{app.job?.title || "Deleted Job"}</p>
                                                <div className="flex items-center gap-1.5 text-xs text-brand-violet font-black">
                                                    <Users className="w-3 h-3" />
                                                    {app.recruiter?.name || "Admin Created"}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 max-w-[100px] h-1.5 bg-[var(--color-bg-primary)] rounded-full overflow-hidden">
                                                    <div
                                                        className={cn("h-full transition-all duration-1000", app.aiScore >= 80 ? "bg-emerald-500" : "bg-brand-violet")}
                                                        style={{ width: `${app.aiScore}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm font-black text-[var(--color-text-primary)]">{app.aiScore}%</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            {getStatusBadge(app.status)}
                                        </td>
                                        <td className="p-6">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                icon={ExternalLink}
                                                onClick={() => window.open(app.resumeUrl, "_blank")}
                                            >
                                                Resume
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
