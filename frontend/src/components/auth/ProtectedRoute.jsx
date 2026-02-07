import { Navigate } from "react-router-dom";

const decodeToken = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
};

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    const decoded = decodeToken(token);

    if (!decoded) {
        localStorage.removeItem("token");
        return <Navigate to="/login" replace />;
    }

    const userRole = decoded.role;

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        // Redirect to their respective correct dashboard if they try to cross-access
        return <Navigate to={userRole === "recruiter" ? "/recruiter" : "/candidate"} replace />;
    }

    return children;
};

export default ProtectedRoute;
