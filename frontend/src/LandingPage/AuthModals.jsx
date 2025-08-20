import { useState } from "react";

import { useAuth } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

const AuthModals = ({ isLoginOpen, isRegisterOpen, onClose }) => {
    console.log(
        "AuthModals render - isLoginOpen:",
        isLoginOpen,
        "isRegisterOpen:",
        isRegisterOpen,
        "onClose:",
        onClose
    );

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login(email, password);
            onClose();
            navigate("/dashboard");
        } catch (err) {
            setError("Invalid email or password");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        try {
            // Implement registration logic here
            // For now, we'll just simulate a successful registration
            await login(email, password);
            onClose();
            navigate("/dashboard");
        } catch (err) {
            setError("Registration failed. Please try again.");
        }
    };

    const handleSwitchToRegister = () => {
        setError("");
        onClose();
        // Trigger register modal open through parent component
        const event = new CustomEvent("openRegisterModal");
        window.dispatchEvent(event);
    };

    const handleSwitchToLogin = () => {
        setError("");
        onClose();
        // Trigger login modal open through parent component
        const event = new CustomEvent("openLoginModal");
        window.dispatchEvent(event);
    };

    const modalOverlayStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        opacity: 1,
        animation: "fadeIn 0.3s ease-out forwards",
    };

    const modalContentStyle = {
        backgroundColor: "white",
        padding: "2.5rem",
        borderRadius: "1rem",
        width: "100%",
        maxWidth: "420px",
        position: "relative",
        boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transform: "scale(1)",
        animation: "scaleIn 0.3s ease-out forwards",
    };

    const closeButtonStyle = {
        position: "absolute",
        top: "1rem",
        right: "1rem",
        background: "none",
        border: "none",
        fontSize: "1.5rem",
        cursor: "pointer",
        color: "#6b7280",
        padding: "0.5rem",
        borderRadius: "0.375rem",
        transition: "all 0.2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "2rem",
        height: "2rem",
        zIndex: 1001,
    };

    const closeButtonHoverStyle = {
        backgroundColor: "#f3f4f6",
        color: "#374151",
    };

    const formStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
    };

    const inputGroupStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
    };

    const labelStyle = {
        fontSize: "0.875rem",
        fontWeight: 500,
        color: "#4a5568",
    };

    const inputStyle = {
        padding: "0.75rem 1rem",
        borderRadius: "0.5rem",
        border: "1px solid #d1d5db",
        fontSize: "1rem",
        transition: "all 0.2s",
        backgroundColor: "var(--color-gray-200)", // Use theme-matching soft gray
        color: "var(--color-gray-900)",
    };

    const inputFocusStyle = {
        borderColor: "#0ea5e9",
        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
        outline: "none",
    };

    const buttonStyle = {
        padding: "0.875rem",
        borderRadius: "0.5rem",
        border: "none",
        backgroundColor: "#0284c7",
        color: "white",
        fontSize: "1rem",
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.2s",
        marginTop: "0.5rem",
    };

    const buttonHoverStyle = {
        backgroundColor: "#0369a1",
        transform: "translateY(-1px)",
    };

    const errorStyle = {
        color: "#dc2626",
        fontSize: "0.875rem",
        marginTop: "0.5rem",
        padding: "0.75rem",
        backgroundColor: "#fef2f2",
        borderRadius: "0.375rem",
        border: "1px solid #fecaca",
    };

    const switchFormStyle = {
        textAlign: "center",
        marginTop: "1.5rem",
        fontSize: "0.875rem",
        color: "#718096",
        padding: "1rem",
        backgroundColor: "#f9fafb",
        borderRadius: "0.5rem",
    };

    const switchButtonStyle = {
        background: "none",
        border: "none",
        color: "#0284c7",
        cursor: "pointer",
        fontWeight: 600,
        padding: "0.25rem 0.5rem",
        marginLeft: "0.25rem",
        borderRadius: "0.25rem",
        transition: "all 0.2s",
    };

    const switchButtonHoverStyle = {
        backgroundColor: "#f0f9ff",
    };

    const handleClose = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("handleClose called");
        console.log("onClose function:", onClose);
        if (typeof onClose === "function") {
            onClose();
        } else {
            console.error("onClose is not a function:", onClose);
        }
    };

    if (isLoginOpen && isRegisterOpen) return null;

    // Only render modal if one of them is open
    if (!isLoginOpen && !isRegisterOpen) {
        console.log("AuthModals: No modal should be open, returning null");
        return null;
    }

    console.log("AuthModals: Rendering modal");
    return (
        <>
            <style>{`
                input::placeholder {
                    color: var(--color-gray-400);
                    opacity: 1;
                }
            `}</style>
            <div style={modalOverlayStyle} onClick={handleClose}>
                <div
                    style={modalContentStyle}
                    onClick={(e) => {
                        console.log(
                            "Modal content clicked, stopping propagation"
                        );
                        e.stopPropagation();
                    }}
                >
                    <button
                        type="button"
                        onClick={handleClose}
                        style={closeButtonStyle}
                        onMouseEnter={(e) => {
                            Object.assign(
                                e.currentTarget.style,
                                closeButtonHoverStyle
                            );
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "none";
                            e.currentTarget.style.color = "#6b7280";
                        }}
                    >
                        ×
                    </button>

                    {isLoginOpen ? (
                        <form onSubmit={handleLogin} style={formStyle}>
                            <h2
                                style={{
                                    fontSize: "1.5rem",
                                    fontWeight: 600,
                                    marginBottom: "1.5rem",
                                    textAlign: "center",
                                }}
                            >
                                Welcome Back
                            </h2>

                            <div style={inputGroupStyle}>
                                <label style={labelStyle}>Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={inputStyle}
                                    onFocus={(e) => {
                                        Object.assign(
                                            e.currentTarget.style,
                                            inputFocusStyle
                                        );
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor =
                                            "var(--color-gray-300)";
                                        e.currentTarget.style.boxShadow =
                                            "none";
                                    }}
                                    required
                                />
                            </div>

                            <div style={inputGroupStyle}>
                                <label style={labelStyle}>Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    style={inputStyle}
                                    onFocus={(e) => {
                                        Object.assign(
                                            e.currentTarget.style,
                                            inputFocusStyle
                                        );
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor =
                                            "var(--color-gray-300)";
                                        e.currentTarget.style.boxShadow =
                                            "none";
                                    }}
                                    required
                                />
                            </div>

                            {error && <div style={errorStyle}>{error}</div>}

                            <button
                                type="submit"
                                style={buttonStyle}
                                onMouseEnter={(e) => {
                                    Object.assign(
                                        e.currentTarget.style,
                                        buttonHoverStyle
                                    );
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        "var(--color-primary-600)";
                                    e.currentTarget.style.transform = "none";
                                }}
                            >
                                Log In
                            </button>

                            <div style={switchFormStyle}>
                                Don't have an account?
                                <button
                                    type="button"
                                    onClick={handleSwitchToRegister}
                                    style={switchButtonStyle}
                                    onMouseEnter={(e) => {
                                        Object.assign(
                                            e.currentTarget.style,
                                            switchButtonHoverStyle
                                        );
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                            "transparent";
                                    }}
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleRegister} style={formStyle}>
                            <h2
                                style={{
                                    fontSize: "1.5rem",
                                    fontWeight: 600,
                                    marginBottom: "1.5rem",
                                    textAlign: "center",
                                }}
                            >
                                Create Account
                            </h2>

                            <div style={inputGroupStyle}>
                                <label style={labelStyle}>Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    style={inputStyle}
                                    onFocus={(e) => {
                                        Object.assign(
                                            e.currentTarget.style,
                                            inputFocusStyle
                                        );
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor =
                                            "var(--color-gray-300)";
                                        e.currentTarget.style.boxShadow =
                                            "none";
                                    }}
                                    required
                                />
                            </div>

                            <div style={inputGroupStyle}>
                                <label style={labelStyle}>Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={inputStyle}
                                    onFocus={(e) => {
                                        Object.assign(
                                            e.currentTarget.style,
                                            inputFocusStyle
                                        );
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor =
                                            "var(--color-gray-300)";
                                        e.currentTarget.style.boxShadow =
                                            "none";
                                    }}
                                    required
                                />
                            </div>

                            <div style={inputGroupStyle}>
                                <label style={labelStyle}>Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    style={inputStyle}
                                    onFocus={(e) => {
                                        Object.assign(
                                            e.currentTarget.style,
                                            inputFocusStyle
                                        );
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor =
                                            "var(--color-gray-300)";
                                        e.currentTarget.style.boxShadow =
                                            "none";
                                    }}
                                    required
                                />
                            </div>

                            {error && <div style={errorStyle}>{error}</div>}

                            <button
                                type="submit"
                                style={buttonStyle}
                                onMouseEnter={(e) => {
                                    Object.assign(
                                        e.currentTarget.style,
                                        buttonHoverStyle
                                    );
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        "var(--color-primary-600)";
                                    e.currentTarget.style.transform = "none";
                                }}
                            >
                                Create Account
                            </button>

                            <div style={switchFormStyle}>
                                Already have an account?
                                <button
                                    type="button"
                                    onClick={handleSwitchToLogin}
                                    style={switchButtonStyle}
                                    onMouseEnter={(e) => {
                                        Object.assign(
                                            e.currentTarget.style,
                                            switchButtonHoverStyle
                                        );
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                            "transparent";
                                    }}
                                >
                                    Log in
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default AuthModals;
