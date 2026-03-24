import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AuthSuccess() {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            try {
                // Decode JWT payload (base64url → JSON)
                const payloadBase64 = token.split(".")[1];
                // Fix base64url padding before decoding
                const base64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
                const payload = JSON.parse(atob(base64));
                const { id, email, role, name } = payload;

                console.log("✅ OAuth Success. User:", name, "Role:", role);

                if (!role) {
                    throw new Error("Token payload missing role field");
                }

                // Store complete user object so all dashboards have access to user data
                setAuth(token, { id, email, role, name });

                // Redirect based on role
                const redirectPath = role === "admin" ? "/admin" : (role === "recruiter" ? "/recruiter" : "/candidate");

                setTimeout(() => {
                    navigate(redirectPath, { replace: true });
                }, 100);
            } catch (err) {
                console.error("❌ Failed to decode OAuth token:", err);
                navigate("/login?error=invalid_token", { replace: true });
            }
        } else {
            console.error("❌ AuthSuccess: No token found in URL");
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
