import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { EyeIcon, EyeSlashIcon, ArrowRightIcon, UserPlusIcon, CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Signup = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const toast = useToast();
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: "", color: "" });

    const calculatePasswordStrength = (password) => {
        let score = 0;
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;

        const strengths = [
            { score: 0, label: "", color: "" },
            { score: 1, label: "Weak", color: "#f56565" },
            { score: 2, label: "Fair", color: "#ed8936" },
            { score: 3, label: "Good", color: "#ecc94b" },
            { score: 4, label: "Strong", color: "#48bb78" },
            { score: 5, label: "Very Strong", color: "#38a169" },
        ];

        return strengths[Math.min(score, 5)];
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === "password") {
            setPasswordStrength(calculatePasswordStrength(value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (formData.password !== formData.confirmPassword) {
            toast.warning("Passwords do not match");
            return;
        }

        if (formData.password.length < 6) {
            toast.warning("Password must be at least 6 characters long");
            return;
        }

        setLoading(true);

        try {
            await register({
                email: formData.email,
                username: formData.username,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
            });
            navigate("/dashboard");
        } catch (err) {
            toast.error(err.message || "Failed to create account. Please try again.");
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
            maxWidth: "520px",
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
            gap: "1.25rem",
        },
        row: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
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
        strengthBar: {
            height: "0.25rem",
            borderRadius: "999px",
            background: "#1f2937",
            marginTop: "0.5rem",
            overflow: "hidden",
        },
        strengthFill: {
            height: "100%",
            transition: "all 0.3s ease",
            borderRadius: "999px",
        },
        strengthLabel: {
            fontSize: "0.8rem",
            fontWeight: 600,
            marginTop: "0.25rem",
            color: "#e5e7eb",
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
            marginTop: "0.5rem",
        },
        buttonDisabled: {
            opacity: 0.6,
            cursor: "not-allowed",
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
        features: {
            display: "grid",
            gap: "0.75rem",
            marginTop: "1.5rem",
            padding: "1.25rem",
            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 64, 175, 0.8))",
            borderRadius: "1rem",
            border: "1px solid rgba(56, 189, 248, 0.25)",
        },
        feature: {
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            fontSize: "0.9rem",
            color: "#e5e7eb",
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
                    @media (max-width: 550px) {
                        .signup-row {
                            grid-template-columns: 1fr !important;
                        }
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
                            <UserPlusIcon style={{ width: "2.5rem", height: "2.5rem" }} />
                        </div>
                        <h1 style={styles.title}>Create Account</h1>
                        <p style={styles.subtitle}>Start your focus journey with FocusFlow</p>
                    </div>

                    <form style={styles.form} onSubmit={handleSubmit}>
                        <div style={styles.row} className="signup-row">
                            <div style={styles.inputGroup}>
                                <label style={styles.label} htmlFor="firstName">
                                    First Name
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    style={styles.input}
                                    placeholder="John"
                                />
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label} htmlFor="lastName">
                                    Last Name
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    style={styles.input}
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label} htmlFor="email">
                                Email Address *
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
                            <label style={styles.label} htmlFor="username">
                                Username *
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                autoComplete="username"
                                value={formData.username}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="johndoe"
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label} htmlFor="password">
                                Password *
                            </label>
                            <div style={styles.inputWrapper}>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    autoComplete="new-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    style={{
                                        ...styles.input,
                                        paddingRight: "3rem",
                                    }}
                                    placeholder="Create a strong password"
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
                            {formData.password && (
                                <>
                                    <div style={styles.strengthBar}>
                                        <div
                                            style={{
                                                ...styles.strengthFill,
                                                width: `${(passwordStrength.score / 5) * 100}%`,
                                                background: passwordStrength.color,
                                            }}
                                        />
                                    </div>
                                    {passwordStrength.label && (
                                        <div style={{ ...styles.strengthLabel, color: passwordStrength.color }}>
                                            {passwordStrength.label}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label} htmlFor="confirmPassword">
                                Confirm Password *
                            </label>
                            <div style={styles.inputWrapper}>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    autoComplete="new-password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    style={{
                                        ...styles.input,
                                        paddingRight: "3rem",
                                    }}
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    style={styles.passwordToggle}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    tabIndex={-1}
                                >
                                    {showConfirmPassword ? (
                                        <EyeSlashIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                                    ) : (
                                        <EyeIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                                    )}
                                </button>
                            </div>
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
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRightIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                                </>
                            )}
                        </button>
                    </form>

                    <div style={styles.features}>
                        <div style={styles.feature}>
                            <CheckCircleIcon style={{ width: "1.25rem", height: "1.25rem", color: "#38bdf8" }} />
                            <span>Free forever with all features</span>
                        </div>
                        <div style={styles.feature}>
                            <CheckCircleIcon style={{ width: "1.25rem", height: "1.25rem", color: "#38bdf8" }} />
                            <span>Sync across all your devices</span>
                        </div>
                        <div style={styles.feature}>
                            <CheckCircleIcon style={{ width: "1.25rem", height: "1.25rem", color: "#38bdf8" }} />
                            <span>Secure & privacy-focused</span>
                        </div>
                    </div>

                    <div style={styles.footer}>
                        Already have an account?{" "}
                        <Link to="/login" style={styles.link}>
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
