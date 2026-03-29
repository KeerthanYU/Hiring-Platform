import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AuthSuccess() {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    useEffect(() => {
        // 1. Parse token from URL
        const query = new URLSearchParams(window.location.search);
        const token = query.get("token");

        if (token) {
            // 2. IMMEDIATELY scrub the token from the URL to prevent it from entering history
            // Use replaceState to keep the user on /auth/success but remove the query string
            const cleanUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);

            try {
                // 3. Decode JWT payload
                const payloadBase64 = token.split(".")[1];
                const base64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
                const payload = JSON.parse(atob(base64));
                const { id, email, role, name } = payload;

                console.log("✅ OAuth Logic: Token processed. Redirecting...");

                if (!role) throw new Error("Token payload missing role");

                // 4. Update Auth State
                setAuth(token, { id, email, role, name });

                // 5. Secure Redirect
                const redirectPath = role === "admin" ? "/admin" : (role === "recruiter" ? "/recruiter" : "/candidate");
                navigate(redirectPath, { replace: true });

            } catch (err) {
                console.error("❌ OAuth Cleanup Error:", err.message);
                navigate("/login?error=invalid_token", { replace: true });
            }
        } else {
            console.warn("⚠️ AuthSuccess: Missing token in redirect.");
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
