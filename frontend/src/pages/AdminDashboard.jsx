import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const { user, token, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("users");
    const [metrics, setMetrics] = useState(null);
    const [users, setUsers] = useState([]);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:5002/api") + "/admin";

    useEffect(() => {
        fetchMetrics();
        fetchUsers();
    }, [token]);

    const fetchWithAuth = async (endpoint, options = {}) => {
        const res = await fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers: {
                ...options.headers,
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return res.json();
    };

    const fetchMetrics = async () => {
        const data = await fetchWithAuth("/metrics");
        if (data.success) setMetrics(data.metrics);
    };

    const fetchUsers = async () => {
        setLoading(true);
        const data = await fetchWithAuth("/users");
        if (data.success) setUsers(data.users);
        setLoading(false);
    };

    const fetchLogs = async () => {
        const data = await fetchWithAuth("/audit-logs");
        if (data.success) setLogs(data.logs);
    };

    const handleUserAction = async (id, action, value) => {
        let endpoint = "";
        let method = "PATCH";
        let body = {};

        if (action === "status") {
            endpoint = `/users/${id}/status`;
            body = { status: value };
        } else if (action === "approve") {
            endpoint = `/recruiters/${id}/approve`;
        }

        await fetchWithAuth(endpoint, {
            method,
            body: JSON.stringify(body),
        });

        fetchUsers();
        fetchMetrics();
    };

    useEffect(() => {
        if (activeTab === "logs") fetchLogs();
    }, [activeTab]);

    return (
        <div className="h-screen pt-24 bg-[var(--bg-primary)] text-[var(--text-primary)] flex overflow-hidden">
            {/* Sidebar */}
            <aside className="hidden md:flex w-64 h-full bg-[var(--bg-secondary)] border-r border-[var(--border-primary)] p-6 flex-col overflow-y-auto">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[var(--color-brand-violet)] to-[var(--color-brand-cyan)] bg-clip-text text-transparent mb-8">
                    Admin Panel
                </h2>
                <nav className="flex-1 space-y-2">
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === "users" ? "bg-[var(--color-brand-violet)] text-white" : "hover:bg-[var(--border-primary)]"
                            }`}
                    >
                        User Management
                    </button>
                    <button
                        onClick={() => setActiveTab("logs")}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === "logs" ? "bg-[var(--color-brand-violet)] text-white" : "hover:bg-[var(--border-primary)]"
                            }`}
                    >
                        Audit Logs
                    </button>
                </nav>
                <div className="mt-auto pt-6 border-t border-[var(--border-primary)]">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-brand-violet)] to-[var(--color-brand-cyan)] flex items-center justify-center text-white font-bold">
                            {user?.name?.[0] || "A"}
                        </div>
                        <div>
                            <p className="font-medium text-sm">{user?.name}</p>
                            <p className="text-xs text-[var(--text-secondary)] capitalize">{user?.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 h-full p-8 overflow-y-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
                    {metrics && (
                        <div className="grid grid-cols-4 gap-4 mt-6">
                            <MetricCard title="Total Users" value={metrics.totalUsers} />
                            <MetricCard title="Total Jobs" value={metrics.totalJobs} />
                            <MetricCard title="Applications" value={metrics.totalApplications} />
                            <MetricCard title="Pending Recruiters" value={metrics.pendingRecruiters} highlight />
                        </div>
                    )}
                </header>

                {activeTab === "users" && (
                    <div className="bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-primary)] overflow-hidden">
                        <div className="p-6 border-b border-[var(--border-primary)]">
                            <h3 className="text-xl font-semibold">User Management</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-[var(--border-primary)]/20 text-[var(--text-secondary)]">
                                    <tr>
                                        <th className="p-4">User</th>
                                        <th className="p-4">Role</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Verification</th>
                                        <th className="p-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[var(--border-primary)]">
                                    {users.map((u) => (
                                        <tr key={u.id} className="hover:bg-[var(--border-primary)]/10">
                                            <td className="p-4">
                                                <div>
                                                    <div className="font-medium">{u.name}</div>
                                                    <div className="text-[var(--text-secondary)] text-xs">{u.email}</div>
                                                </div>
                                            </td>
                                            <td className="p-4 capitalize">
                                                <span className={`px-2 py-1 rounded-full text-xs ${u.role === 'recruiter' ? 'bg-blue-500/10 text-blue-500' : 'bg-gray-500/10 text-gray-500'}`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-full text-xs ${u.accountStatus === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                    {u.accountStatus}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                {u.role === 'recruiter' && (
                                                    u.isVerifiedRecruiter
                                                        ? <span className="text-green-500 text-xs">Verified</span>
                                                        : <button
                                                            onClick={() => handleUserAction(u.id, "approve")}
                                                            className="text-xs bg-brand-violet/10 text-brand-violet px-2 py-1 rounded hover:bg-brand-violet/20"
                                                        >
                                                            Approve
                                                        </button>
                                                )}
                                            </td>
                                            <td className="p-4 flex gap-2">
                                                {u.accountStatus === 'active' ? (
                                                    <button
                                                        onClick={() => handleUserAction(u.id, "status", "suspended")}
                                                        className="text-xs text-red-500 hover:underline"
                                                    >
                                                        Suspend
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleUserAction(u.id, "status", "active")}
                                                        className="text-xs text-green-500 hover:underline"
                                                    >
                                                        Activate
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === "logs" && (
                    <div className="space-y-4">
                        {logs.map((log) => (
                            <div key={log.id} className="p-4 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl flex justify-between items-center">
                                <div>
                                    <p className="font-medium">{log.action}</p>
                                    <p className="text-sm text-[var(--text-secondary)]">{log.details}</p>
                                </div>
                                <div className="text-right text-xs text-[var(--text-secondary)]">
                                    <p>Admin: {log.admin?.name}</p>
                                    <p>{new Date(log.timestamp).toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

const MetricCard = ({ title, value, highlight }) => (
    <div className={`p-6 rounded-xl border ${highlight ? 'bg-brand-violet/5 border-brand-violet/20' : 'bg-[var(--bg-secondary)] border-[var(--border-primary)]'}`}>
        <p className="text-[var(--text-secondary)] text-sm mb-1">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
    </div>
);

export default AdminDashboard;
