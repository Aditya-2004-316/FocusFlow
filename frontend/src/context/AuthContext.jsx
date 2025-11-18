import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(undefined);

const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:5000/api";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check authentication status on mount
    useEffect(() => {
        checkAuth();
    }, []);

    // Maintain backward compatibility with localStorage
    useEffect(() => {
        try {
            localStorage.setItem(
                "isAuthenticated",
                isAuthenticated ? "true" : "false"
            );
            if (isAuthenticated) {
                // Default to dark theme for authenticated users
                document.documentElement.classList.add("dark");
                document.body.classList.add("dark");
                localStorage.setItem("theme", "dark");
            } else {
                // Enforce light theme for public users
                document.documentElement.classList.remove("dark");
                document.body.classList.remove("dark");
                localStorage.setItem("theme", "light");
            }
        } catch {}
    }, [isAuthenticated]);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            const response = await fetch(`${API_BASE}/auth/me`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success && data.data.user) {
                    setUser(data.data.user);
                    setIsAuthenticated(true);
                }
            } else {
                // Token is invalid, clear it
                localStorage.removeItem("token");
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error("Auth check error:", error);
            localStorage.removeItem("token");
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_BASE}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Login failed");
            }

            if (data.success && data.data) {
                // Store token in localStorage for API requests
                if (data.data.token) {
                    localStorage.setItem("token", data.data.token);
                }
                
                setUser(data.data.user);
                setIsAuthenticated(true);
                return data;
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const response = await fetch(`${API_BASE}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Registration failed");
            }

            if (data.success && data.data) {
                // Store token
                if (data.data.token) {
                    localStorage.setItem("token", data.data.token);
                }
                
                setUser(data.data.user);
                setIsAuthenticated(true);
                return data;
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                // Call logout endpoint
                await fetch(`${API_BASE}/auth/logout`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                    credentials: "include",
                }).catch(err => console.error("Logout API error:", err));
            }
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            // Clear local state regardless of API call result
            localStorage.removeItem("token");
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    const refreshToken = async () => {
        try {
            const response = await fetch(`${API_BASE}/auth/refresh-token`, {
                method: "POST",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success && data.data.token) {
                    localStorage.setItem("token", data.data.token);
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error("Token refresh error:", error);
            return false;
        }
    };

    const updateUser = useCallback((updatedData) => {
        setUser(prev => ({ ...prev, ...updatedData }));
    }, []);

    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        checkAuth,
        refreshToken,
        updateUser,
    };

    return (
        <AuthContext.Provider value={value}>
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
