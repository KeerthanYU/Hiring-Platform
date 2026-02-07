import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:5002/api") + "/auth";

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  // Sync isAuthenticated when token changes
  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  const fetchWithJSON = async (url, options) => {
    const res = await fetch(url, options);
    const contentType = res.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error("❌ Non-JSON response received:", text.slice(0, 100));
      throw new Error(`Server returned an invalid response (HTML instead of JSON). Check if the backend is running on ${API_BASE}.`);
    }

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Request failed");
    }
    return data;
  };

  // Register function
  const register = async ({ name, email, password, role }) => {
    return await fetchWithJSON(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });
  };

  // Login function
  const login = async (email, password) => {
    const data = await fetchWithJSON(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (data.token) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
    }

    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    setIsAuthenticated(true);

    return data.user;
  };

  // Helper to set auth state from external sources (like Google OAuth)
  const setAuth = (newToken, newUser) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    if (newUser) {
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    }
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, register, login, logout, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
