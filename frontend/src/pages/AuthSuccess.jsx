import { useEffect } from "react";

export default function AuthSuccess() {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const role = params.get("role"); // optional (candidate/recruiter)

        if (token) {
            localStorage.setItem("token", token);

            if (role === "recruiter") {
                window.location.href = "/recruiter";
            } else {
                window.location.href = "/candidate";
            }
        }
    }, []);

    return <p>Signing you in...</p>;
}
