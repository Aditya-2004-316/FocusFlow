import { useState, useEffect } from "react";
import AuthModals from "./AuthModals";

const LandingNavbar = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    useEffect(() => {
        const handleOpenLoginModal = () => {
            setIsLoginOpen(true);
            setIsRegisterOpen(false);
        };

        const handleOpenRegisterModal = () => {
            setIsRegisterOpen(true);
            setIsLoginOpen(false);
        };

        window.addEventListener("openLoginModal", handleOpenLoginModal);
        window.addEventListener("openRegisterModal", handleOpenRegisterModal);

        return () => {
            window.removeEventListener("openLoginModal", handleOpenLoginModal);
            window.removeEventListener(
                "openRegisterModal",
                handleOpenRegisterModal
            );
        };
    }, []);

    const navStyle: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        backgroundColor: "white",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 50,
    };

    const logoStyle: React.CSSProperties = {
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "var(--color-primary-600)",
        textDecoration: "none",
    };

    const linksStyle: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "2rem",
    };

    const linkStyle: React.CSSProperties = {
        color: "var(--color-gray-600)",
        textDecoration: "none",
        fontSize: "0.875rem",
        fontWeight: 500,
        transition: "color 0.2s",
    };

    const linkHoverStyle: React.CSSProperties = {
        color: "var(--color-primary-600)",
    };

    const buttonsStyle: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
    };

    const buttonStyle: React.CSSProperties = {
        padding: "0.5rem 1rem",
        borderRadius: "0.375rem",
        fontSize: "0.875rem",
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.2s",
    };

    const loginButtonStyle: React.CSSProperties = {
        ...buttonStyle,
        backgroundColor: "transparent",
        border: "1px solid var(--color-gray-300)",
        color: "var(--color-gray-700)",
    };

    const registerButtonStyle: React.CSSProperties = {
        ...buttonStyle,
        backgroundColor: "var(--color-primary-600)",
        border: "none",
        color: "white",
    };

    const handleLoginClick = () => {
        setIsLoginOpen(true);
        setIsRegisterOpen(false);
    };

    const handleRegisterClick = () => {
        setIsRegisterOpen(true);
        setIsLoginOpen(false);
    };

    const handleCloseModal = () => {
        setIsLoginOpen(false);
        setIsRegisterOpen(false);
    };

    return (
        <>
            <nav style={navStyle}>
                <a href="/" style={logoStyle}>
                    FocusFlow
                </a>
                <div style={linksStyle}>
                    <a
                        href="#features"
                        style={linkStyle}
                        onMouseEnter={(e) => {
                            Object.assign(
                                e.currentTarget.style,
                                linkHoverStyle
                            );
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color =
                                "var(--color-gray-600)";
                        }}
                    >
                        Features
                    </a>
                    <a
                        href="#pricing"
                        style={linkStyle}
                        onMouseEnter={(e) => {
                            Object.assign(
                                e.currentTarget.style,
                                linkHoverStyle
                            );
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color =
                                "var(--color-gray-600)";
                        }}
                    >
                        Pricing
                    </a>
                    <a
                        href="#testimonials"
                        style={linkStyle}
                        onMouseEnter={(e) => {
                            Object.assign(
                                e.currentTarget.style,
                                linkHoverStyle
                            );
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color =
                                "var(--color-gray-600)";
                        }}
                    >
                        Testimonials
                    </a>
                </div>
                <div style={buttonsStyle}>
                    <button
                        style={loginButtonStyle}
                        onClick={handleLoginClick}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                                "var(--color-gray-50)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                                "transparent";
                        }}
                    >
                        Log in
                    </button>
                    <button
                        style={registerButtonStyle}
                        onClick={handleRegisterClick}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                                "var(--color-primary-700)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                                "var(--color-primary-600)";
                        }}
                    >
                        Get Started
                    </button>
                </div>
            </nav>
            <AuthModals
                isLoginOpen={isLoginOpen}
                isRegisterOpen={isRegisterOpen}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default LandingNavbar;
