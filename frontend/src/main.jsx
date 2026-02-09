import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Initialize theme before render to avoid flicker
(() => {
    try {
        // Only allow dark for authenticated users (persisted flag)
        const authed = localStorage.getItem("isAuthenticated") === "true";
        if (!authed) {
            document.documentElement.classList.remove("dark");
            document.body.classList.remove("dark");
            localStorage.setItem("theme", "light");
            return;
        }
        const saved = localStorage.getItem("theme");
        // Default to dark for authenticated users
        const isDark = saved ? saved === "dark" : true;
        // Save default if not set
        if (!saved) {
            localStorage.setItem("theme", "dark");
        }
        document.documentElement.classList.toggle("dark", isDark);
        document.body.classList.toggle("dark", isDark);
    } catch {}
})();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
