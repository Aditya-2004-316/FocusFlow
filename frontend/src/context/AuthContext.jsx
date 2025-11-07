import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        try {
            return localStorage.getItem("isAuthenticated") === "true";
        } catch {
            return false;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(
                "isAuthenticated",
                isAuthenticated ? "true" : "false"
            );
            if (!isAuthenticated) {
                // Enforce light theme for public users
                document.documentElement.classList.remove("dark");
                document.body.classList.remove("dark");
                localStorage.setItem("theme", "light");
            }
        } catch {}
    }, [isAuthenticated]);

    const login = async (email, password) => {
        // TODO: Implement actual authentication logic
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
