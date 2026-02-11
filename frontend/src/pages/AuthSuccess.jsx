import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AuthSuccess() {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const role = params.get("role");
        const name = params.get("name");

        if (token) {
            // Update context state with token and full user info
            setAuth(token, { role, name });

            // Use the generic /dashboard route for robust role-based redirection
            setTimeout(() => {
                navigate("/dashboard", { replace: true });
            }, 100);
        } else {
            console.error("AuthSuccess: No token found in URL");
            navigate("/login", { replace: true });
        }
    }, [navigate, setAuth]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)]">
            <div className="flex flex-col items-center space-y-4 text-center">
                <div className="w-12 h-12 border-4 border-brand-violet border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(139,92,246,0.5)]"></div>
                <div className="space-y-1">
                    <p className="text-[var(--color-text-primary)] font-bold text-xl">Securing your session</p>
                    <p className="text-[var(--color-text-secondary)] text-sm">Please wait while we redirect you...</p>
                </div>
            </div>
        </div>
    );
}
