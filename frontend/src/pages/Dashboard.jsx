import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
    const { user, isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (user?.role === "recruiter") {
        return <Navigate to="/recruiter" replace />;
    }

    return <Navigate to="/candidate" replace />;
}
