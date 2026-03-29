import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  withCredentials: true,
});

// 🔐 Attach token automatically to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🛡️ Centralized response error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // Auto-logout on 401 Unauthorized or 403 Forbidden
      if (status === 401 || status === 403) {
        console.warn("⚠️ Unauthorized/Forbidden – redirecting to login.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }

      // Log server errors
      if (status >= 500) {
        console.error("🔥 Server error:", data?.message || "Internal server error");
      }

      // Construct a user-friendly error message safely
      let message = "An unexpected error occurred";
      if (data?.message) {
        message = typeof data.message === "string" ? data.message : (data.message.error || data.message.message || JSON.stringify(data.message));
      } else if (data?.error) {
        message = typeof data.error === "string" ? data.error : JSON.stringify(data.error);
      } else {
        message = `Request failed with status ${status}`;
      }

      error.userMessage = message;
      console.error(`❌ API Error [${status}]:`, message);
    } else if (error.request) {
      // Network error – no response received
      console.error("🌐 Network error: No response from server. Is the backend running?");
      error.userMessage = "Network error – unable to reach the server. Please try again later.";
    } else {
      // Something else went wrong setting up the request
      console.error("❌ Request setup error:", error.message);
      error.userMessage = error.message;
    }

    return Promise.reject(error);
  }
);

export default api;
