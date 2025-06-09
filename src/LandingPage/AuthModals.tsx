import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface AuthModalsProps {
    isLoginOpen: boolean;
    isRegisterOpen: boolean;
    onClose: () => void;
}

const AuthModals = ({
    isLoginOpen,
    isRegisterOpen,
    onClose,
}: AuthModalsProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
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

    const handleRegister = async (e: React.FormEvent) => {
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

    const modalOverlayStyle: React.CSSProperties = {
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
        opacity: 0,
        animation: "fadeIn 0.3s ease-out forwards",
    };

    const modalContentStyle: React.CSSProperties = {
        backgroundColor: "white",
        padding: "2.5rem",
        borderRadius: "1rem",
        width: "100%",
        maxWidth: "420px",
        position: "relative",
        boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transform: "scale(0.95)",
        animation: "scaleIn 0.3s ease-out forwards",
    };

    const closeButtonStyle: React.CSSProperties = {
        position: "absolute",
        top: "1rem",
        right: "1rem",
        background: "none",
        border: "none",
        fontSize: "1.5rem",
        cursor: "pointer",
        color: "var(--color-gray-500)",
        padding: "0.5rem",
        borderRadius: "0.375rem",
        transition: "all 0.2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "2rem",
        height: "2rem",
    };

    const closeButtonHoverStyle: React.CSSProperties = {
        backgroundColor: "var(--color-gray-100)",
        color: "var(--color-gray-700)",
    };

    const formStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
    };

    const inputGroupStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
    };

    const labelStyle: React.CSSProperties = {
        fontSize: "0.875rem",
        fontWeight: 500,
        color: "var(--color-gray-700)",
    };

    const inputStyle: React.CSSProperties = {
        padding: "0.75rem 1rem",
        borderRadius: "0.5rem",
        border: "1px solid var(--color-gray-300)",
        fontSize: "1rem",
        transition: "all 0.2s",
        backgroundColor: "white",
    };

    const inputFocusStyle: React.CSSProperties = {
        borderColor: "var(--color-primary-500)",
        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
        outline: "none",
    };

    const buttonStyle: React.CSSProperties = {
        padding: "0.875rem",
        borderRadius: "0.5rem",
        border: "none",
        backgroundColor: "var(--color-primary-600)",
        color: "white",
        fontSize: "1rem",
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.2s",
        marginTop: "0.5rem",
    };

    const buttonHoverStyle: React.CSSProperties = {
        backgroundColor: "var(--color-primary-700)",
        transform: "translateY(-1px)",
    };

    const errorStyle: React.CSSProperties = {
        color: "var(--color-red-600)",
        fontSize: "0.875rem",
        marginTop: "0.5rem",
        padding: "0.75rem",
        backgroundColor: "var(--color-red-50)",
        borderRadius: "0.375rem",
        border: "1px solid var(--color-red-100)",
    };

    const switchFormStyle: React.CSSProperties = {
        textAlign: "center",
        marginTop: "1.5rem",
        fontSize: "0.875rem",
        color: "var(--color-gray-600)",
        padding: "1rem",
        backgroundColor: "var(--color-gray-50)",
        borderRadius: "0.5rem",
    };

    const switchButtonStyle: React.CSSProperties = {
        background: "none",
        border: "none",
        color: "var(--color-primary-600)",
        cursor: "pointer",
        fontWeight: 600,
        padding: "0.25rem 0.5rem",
        marginLeft: "0.25rem",
        borderRadius: "0.25rem",
        transition: "all 0.2s",
    };

    const switchButtonHoverStyle: React.CSSProperties = {
        backgroundColor: "var(--color-primary-50)",
    };

    if (!isLoginOpen && !isRegisterOpen) return null;

    return (
        <div style={modalOverlayStyle} onClick={onClose}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                <button
                    style={closeButtonStyle}
                    onClick={onClose}
                    onMouseEnter={(e) => {
                        Object.assign(
                            e.currentTarget.style,
                            closeButtonHoverStyle
                        );
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "none";
                        e.currentTarget.style.color = "var(--color-gray-500)";
                    }}
                >
                    ×
                </button>
                {isLoginOpen ? (
                    <>
                        <h2
                            style={{
                                marginBottom: "1.5rem",
                                fontSize: "1.75rem",
                                fontWeight: 700,
                                color: "var(--color-gray-900)",
                            }}
                        >
                            Welcome Back
                        </h2>
                        <form style={formStyle} onSubmit={handleLogin}>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle} htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
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
                                <label style={labelStyle} htmlFor="password">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
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
                        </form>
                        <div style={switchFormStyle}>
                            Don't have an account?
                            <button
                                style={switchButtonStyle}
                                onClick={handleSwitchToRegister}
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
                    </>
                ) : (
                    <>
                        <h2
                            style={{
                                marginBottom: "1.5rem",
                                fontSize: "1.75rem",
                                fontWeight: 700,
                                color: "var(--color-gray-900)",
                            }}
                        >
                            Create Account
                        </h2>
                        <form style={formStyle} onSubmit={handleRegister}>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle} htmlFor="name">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
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
                                <label
                                    style={labelStyle}
                                    htmlFor="register-email"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="register-email"
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
                                <label
                                    style={labelStyle}
                                    htmlFor="register-password"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="register-password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
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
                        </form>
                        <div style={switchFormStyle}>
                            Already have an account?
                            <button
                                style={switchButtonStyle}
                                onClick={handleSwitchToLogin}
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
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthModals;
