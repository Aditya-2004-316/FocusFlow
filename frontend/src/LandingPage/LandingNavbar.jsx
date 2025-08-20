import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthModals from "./AuthModals";
import FocusFlowLogo from "../assets/focusflowlogo.png";

const LandingNavbar = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const location = useLocation();

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

    const navStyle = {
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

    const logoContainerStyle = {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        textDecoration: "none",
        outline: "none",
        border: "none",
    };

    const logoStyle = {
        height: "2.5rem",
        width: "auto",
    };

    const logoTextStyle = {
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "var(--color-primary-600)",
        margin: 0,
    };

    const linksStyle = {
        display: "flex",
        alignItems: "center",
        gap: "2rem",
    };

    const linkStyle = {
        color: "var(--color-gray-600)",
        textDecoration: "none",
        fontSize: "0.875rem",
        fontWeight: 500,
        transition: "color 0.2s, border-bottom 0.2s",
        borderBottom: "2px solid transparent",
        paddingBottom: "2px",
        outline: "none",
        border: "none",
    };

    const linkHoverStyle = {
        color: "var(--color-primary-600)",
    };

    const activeLinkStyle = {
        color: "var(--color-primary-700)",
        borderBottom: "2px solid var(--color-primary-600)",
        fontWeight: 700,
    };

    const buttonsStyle = {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
    };

    const buttonStyle = {
        padding: "0.5rem 1rem",
        borderRadius: "0.375rem",
        fontSize: "0.875rem",
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.2s",
    };

    const loginButtonStyle = {
        ...buttonStyle,
        backgroundColor: "transparent",
        border: "1px solid var(--color-gray-300)",
        color: "var(--color-gray-700)",
        outline: "none",
    };

    const registerButtonStyle = {
        ...buttonStyle,
        backgroundColor: "var(--color-primary-600)",
        border: "none",
        color: "white",
        outline: "none",
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
        <nav style={navStyle}>
            <a href="/" style={logoContainerStyle} tabIndex={-1}>
                <img
                    src={FocusFlowLogo}
                    alt="FocusFlow Logo"
                    style={logoStyle}
                />
                <h1 style={logoTextStyle}>FocusFlow</h1>
            </a>

            <div style={linksStyle}>
                <Link
                    to="/"
                    style={{
                        ...linkStyle,
                        ...(location.pathname === "/" ? activeLinkStyle : {}),
                    }}
                    tabIndex={-1}
                    onMouseEnter={(e) =>
                        Object.assign(e.currentTarget.style, linkHoverStyle)
                    }
                    onMouseLeave={(e) => {
                        if (location.pathname !== "/") {
                            e.currentTarget.style.color =
                                "var(--color-gray-600)";
                            e.currentTarget.style.borderBottom =
                                "2px solid transparent";
                            e.currentTarget.style.fontWeight = 500;
                        }
                    }}
                >
                    Home
                </Link>
                <Link
                    to="/features"
                    style={{
                        ...linkStyle,
                        ...(location.pathname === "/features"
                            ? activeLinkStyle
                            : {}),
                    }}
                    tabIndex={-1}
                    onMouseEnter={(e) =>
                        Object.assign(e.currentTarget.style, linkHoverStyle)
                    }
                    onMouseLeave={(e) => {
                        if (location.pathname !== "/features") {
                            e.currentTarget.style.color =
                                "var(--color-gray-600)";
                            e.currentTarget.style.borderBottom =
                                "2px solid transparent";
                            e.currentTarget.style.fontWeight = 500;
                        }
                    }}
                >
                    Features
                </Link>
                <Link
                    to="/faq"
                    style={{
                        ...linkStyle,
                        ...(location.pathname === "/faq"
                            ? activeLinkStyle
                            : {}),
                    }}
                    tabIndex={-1}
                    onMouseEnter={(e) =>
                        Object.assign(e.currentTarget.style, linkHoverStyle)
                    }
                    onMouseLeave={(e) => {
                        if (location.pathname !== "/faq") {
                            e.currentTarget.style.color =
                                "var(--color-gray-600)";
                            e.currentTarget.style.borderBottom =
                                "2px solid transparent";
                            e.currentTarget.style.fontWeight = 500;
                        }
                    }}
                >
                    FAQ
                </Link>
                <Link
                    to="/focusflow-community"
                    style={{
                        ...linkStyle,
                        ...(location.pathname === "/focusflow-community"
                            ? activeLinkStyle
                            : {}),
                    }}
                    tabIndex={-1}
                    onMouseEnter={(e) =>
                        Object.assign(e.currentTarget.style, linkHoverStyle)
                    }
                    onMouseLeave={(e) => {
                        if (location.pathname !== "/focusflow-community") {
                            e.currentTarget.style.color =
                                "var(--color-gray-600)";
                            e.currentTarget.style.borderBottom =
                                "2px solid transparent";
                            e.currentTarget.style.fontWeight = 500;
                        }
                    }}
                >
                    Community
                </Link>
                <Link
                    to="/testimonials"
                    style={{
                        ...linkStyle,
                        ...(location.pathname === "/testimonials"
                            ? activeLinkStyle
                            : {}),
                    }}
                    tabIndex={-1}
                    onMouseEnter={(e) =>
                        Object.assign(e.currentTarget.style, linkHoverStyle)
                    }
                    onMouseLeave={(e) => {
                        if (location.pathname !== "/testimonials") {
                            e.currentTarget.style.color =
                                "var(--color-gray-600)";
                            e.currentTarget.style.borderBottom =
                                "2px solid transparent";
                            e.currentTarget.style.fontWeight = 500;
                        }
                    }}
                >
                    Testimonials
                </Link>
            </div>

            <div style={buttonsStyle}>
                <button
                    onClick={handleLoginClick}
                    style={loginButtonStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                            "var(--color-gray-50)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                    }}
                    tabIndex={-1}
                >
                    Log in
                </button>
                <button
                    onClick={handleRegisterClick}
                    style={registerButtonStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                            "var(--color-primary-700)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                            "var(--color-primary-600)";
                    }}
                    tabIndex={-1}
                >
                    Get Started
                </button>
            </div>

            <AuthModals
                isLoginOpen={isLoginOpen}
                isRegisterOpen={isRegisterOpen}
                onClose={handleCloseModal}
            />
        </nav>
    );
};

export default LandingNavbar;
