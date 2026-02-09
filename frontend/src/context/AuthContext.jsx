import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(undefined);
import { API_BASE_URL as API_BASE } from "../config/api";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check authentication status on mount
    useEffect(() => {
        checkAuth();

        // Listen for global session expiration from API utility
        const handleSessionExpired = () => {
            console.warn("Session expired event received. Clearing local state.");
            localStorage.removeItem("token");
            setUser(null);
            setIsAuthenticated(false);
        };

        window.addEventListener("auth-session-expired", handleSessionExpired);
        return () => window.removeEventListener("auth-session-expired", handleSessionExpired);
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
        } catch { }
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
                try {
                    const data = await response.json();
                    if (data.success && data.data.user) {
                        setUser(data.data.user);
                        setIsAuthenticated(true);
                    }
                } catch (e) {
                    console.error("checkAuth JSON parse error:", e);
                }
            } else if (response.status === 401) {
                // Token might be expired, try to refresh
                const refreshSuccess = await refreshToken();
                if (refreshSuccess) {
                    // Update user from the new token
                    const newToken = localStorage.getItem("token");
                    const retryResponse = await fetch(`${API_BASE}/auth/me`, {
                        headers: {
                            "Authorization": `Bearer ${newToken}`,
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    });

                    if (retryResponse.ok) {
                        try {
                            const data = await retryResponse.json();
                            if (data.success && data.data.user) {
                                setUser(data.data.user);
                                setIsAuthenticated(true);
                                setLoading(false);
                                return;
                            }
                        } catch (e) {
                            console.error("checkAuth retry JSON parse error:", e);
                        }
                    }
                }

                // If refresh failed or retry failed, clear everything
                localStorage.removeItem("token");
                setUser(null);
                setIsAuthenticated(false);
            } else {
                // Other error, clear token
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

    // Proactive token refresh every 12 minutes (since token expires in 15m)
    useEffect(() => {
        if (!isAuthenticated) return;

        const refreshInterval = setInterval(() => {
            console.log("Proactively refreshing token...");
            refreshToken();
        }, 12 * 60 * 1000); // 12 minutes

        return () => clearInterval(refreshInterval);
    }, [isAuthenticated]);

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

            if (!response.ok) {
                let errorMessage = "Login failed";
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorMessage;
                } catch (e) {
                    const text = await response.text().catch(() => "");
                    if (text) errorMessage = text;
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();

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

            if (!response.ok) {
                let errorMessage = "Registration failed";
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorMessage;
                } catch (e) {
                    const text = await response.text().catch(() => "");
                    if (text) errorMessage = text;
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();

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
