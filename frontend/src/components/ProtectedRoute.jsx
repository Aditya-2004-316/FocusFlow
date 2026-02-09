import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1.5rem",
                }}>
                    <div style={{
                        width: "3rem",
                        height: "3rem",
                        border: "4px solid rgba(255, 255, 255, 0.3)",
                        borderTopColor: "white",
                        borderRadius: "50%",
                        animation: "spin 0.8s linear infinite",
                    }} />
                    <p style={{
                        color: "white",
                        fontSize: "1.1rem",
                        fontWeight: 500,
                    }}>Loading...</p>
                    <style>
                        {`
                            @keyframes spin {
                                to { transform: rotate(360deg); }
                            }
                        `}
                    </style>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
