import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, user, token } = useContext(AuthContext);

    if (!isAuthenticated || !token) {
        return <Navigate to="/login" replace />;
    }

    if (!user) {
        // If we have a token but no user yet, we might be loading or in an inconsistent state
        // For simplicity, if we don't have user role info, we can't verify roles
        return children;
    }

    const userRole = user.role;

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        // Redirect to their respective correct dashboard if they try to cross-access
        let redirectPath = "/candidate";
        if (userRole === "recruiter") redirectPath = "/recruiter";
        if (userRole === "admin") redirectPath = "/admin";

        return <Navigate to={redirectPath} replace />;
    }

    return children;
};

export default ProtectedRoute;
