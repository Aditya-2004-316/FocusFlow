import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { EyeIcon, EyeSlashIcon, ArrowRightIcon, ShieldCheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const toast = useToast();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(formData.email, formData.password);
            navigate("/dashboard");
        } catch (err) {
            toast.error(err.message || "Failed to login. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        page: {
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(180deg, #060b18 0%, #101b33 55%, #060b18 100%)",
            padding: "2rem 1rem",
        },
        container: {
            width: "100%",
            maxWidth: "480px",
            background: "rgba(15, 23, 42, 0.96)",
            borderRadius: "1.5rem",
            boxShadow: "0 24px 70px rgba(15, 23, 42, 0.9)",
            padding: "3rem 2.5rem",
            animation: "slideUp 0.4s ease",
            border: "1px solid rgba(148, 163, 184, 0.35)",
            position: "relative",
        },
        closeButton: {
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            background: "transparent",
            border: "none",
            color: "#9ca3af",
            cursor: "pointer",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            zIndex: 10,
        },
        logo: {
            textAlign: "center",
            marginBottom: "2rem",
        },
        logoIcon: {
            width: "4rem",
            height: "4rem",
            margin: "0 auto 1rem",
            background: "linear-gradient(135deg, #38bdf8, #818cf8)",
            borderRadius: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
        },
        title: {
            fontSize: "2rem",
            fontWeight: 700,
            color: "#f9fafb",
            marginBottom: "0.5rem",
        },
        subtitle: {
            fontSize: "1rem",
            color: "#9ca3af",
        },
        form: {
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
        },
        inputGroup: {
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
        },
        label: {
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "#e5e7eb",
        },
        inputWrapper: {
            position: "relative",
        },
        input: {
            width: "100%",
            padding: "0.875rem 1rem",
            fontSize: "1rem",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#334155",
            borderRadius: "0.75rem",
            outline: "none",
            transition: "all 0.2s ease",
            fontFamily: "inherit",
            background: "#020617",
            color: "#e5e7eb",
        },
        inputError: {
            borderColor: "#f56565",
        },
        inputFocus: {
            borderColor: "#38bdf8",
            boxShadow: "0 0 0 3px rgba(56, 189, 248, 0.1)",
        },
        passwordToggle: {
            position: "absolute",
            right: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#9ca3af",
            padding: "0.25rem",
            display: "flex",
            alignItems: "center",
        },
        button: {
            width: "100%",
            padding: "1rem",
            background: "linear-gradient(135deg, #38bdf8, #818cf8)",
            color: "white",
            border: "none",
            borderRadius: "0.75rem",
            fontSize: "1.05rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            boxShadow: "0 10px 25px rgba(56, 189, 248, 0.3)",
        },
        buttonDisabled: {
            opacity: 0.6,
            cursor: "not-allowed",
        },
        divider: {
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            margin: "1.5rem 0",
        },
        dividerLine: {
            flex: 1,
            height: "1px",
            background: "#1f2937",
        },
        dividerText: {
            fontSize: "0.85rem",
            color: "#64748b",
        },
        link: {
            color: "#38bdf8",
            textDecoration: "none",
            fontWeight: 600,
            transition: "color 0.2s ease",
        },
        footer: {
            textAlign: "center",
            marginTop: "1.5rem",
            fontSize: "0.95rem",
            color: "#9ca3af",
        },
        spinner: {
            width: "1.25rem",
            height: "1.25rem",
            border: "2px solid white",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin 0.6s linear infinite",
        },
    };

    return (
        <>
            <style>
                {`
                    @keyframes slideUp {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                    input:focus {
                        border-color: #38bdf8 !important;
                        box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1) !important;
                    }
                    button:hover:not(:disabled) {
                        transform: translateY(-2px);
                        box-shadow: 0 15px 35px rgba(56, 189, 248, 0.4);
                    }
                    a:hover {
                        color: #0ea5e9 !important;
                    }
                    .close-button:hover {
                        background: rgba(255, 255, 255, 0.05) !important;
                        color: #f9fafb !important;
                        transform: scale(1.1);
                    }
                `}
            </style>
            <div style={styles.page}>
                <div style={styles.container}>
                    <button
                        onClick={() => navigate("/")}
                        style={styles.closeButton}
                        className="close-button"
                        aria-label="Close"
                    >
                        <XMarkIcon style={{ width: "1.5rem", height: "1.5rem" }} />
                    </button>
                    <div style={styles.logo}>
                        <div style={styles.logoIcon}>
                            <ShieldCheckIcon style={{ width: "2.5rem", height: "2.5rem" }} />
                        </div>
                        <h1 style={styles.title}>Welcome Back</h1>
                        <p style={styles.subtitle}>Sign in to continue to FocusFlow</p>
                    </div>

                    <form style={styles.form} onSubmit={handleSubmit}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label} htmlFor="email">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="you@example.com"
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label} htmlFor="password">
                                Password
                            </label>
                            <div style={styles.inputWrapper}>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    style={{
                                        ...styles.input,
                                        paddingRight: "3rem",
                                    }}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    style={styles.passwordToggle}
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                                    ) : (
                                        <EyeIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div style={{ textAlign: "right" }}>
                            <Link to="/forgot-password" style={styles.link}>
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            style={{
                                ...styles.button,
                                ...(loading ? styles.buttonDisabled : {}),
                            }}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div style={styles.spinner} />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRightIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                                </>
                            )}
                        </button>
                    </form>

                    <div style={styles.footer}>
                        Don't have an account?{" "}
                        <Link to="/signup" style={styles.link}>
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
