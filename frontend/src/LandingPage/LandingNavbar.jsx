import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FocusFlowLogo from "../assets/focusflowlogo.png";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const LandingNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };
    //
    // useEffect(() => {
    //     const handleOpenLoginModal = () => {
    //         setIsLoginOpen(true);
    //         setIsRegisterOpen(false);
    //     };
    //
    //     const handleOpenRegisterModal = () => {
    //         setIsRegisterOpen(true);
    //         setIsLoginOpen(false);
    //     };
    //
    //     window.addEventListener("openLoginModal", handleOpenLoginModal);
    //     window.addEventListener("openRegisterModal", handleOpenRegisterModal);
    //
    //     return () => {
    //         window.removeEventListener("openLoginModal", handleOpenLoginModal);
    //         window.removeEventListener(
    //             "openRegisterModal",
    //             handleOpenRegisterModal
    //         );
    //     };
    // }, []);

    const navStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        backgroundColor: "rgb(10, 15, 26)",
        backdropFilter: "blur(12px)",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.4)" : "none",
        position: "sticky",
        top: 0,
        zIndex: 99999,
        transition: "all 0.3s ease",
    };

    const hamburgerStyle = {
        display: "none",
        background: "none",
        border: "none",
        color: "#f8fafc",
        cursor: "pointer",
        padding: "0.5rem",
        zIndex: 100001,
        position: "relative",
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
        background: 'linear-gradient(to right, #38bdf8, #60a5fa)',
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        margin: 0,
    };

    const linksStyle = {
        display: "flex",
        alignItems: "center",
        gap: "2rem",
        flex: 1,
        justifyContent: "center",
    };

    const linkStyle = {
        color: "#94a3b8",
        textDecoration: "none",
        fontSize: "0.875rem",
        fontWeight: 500,
        transition: "color 0.2s, border-bottom 0.2s",
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        borderBottom: "2px solid transparent",
        paddingBottom: "2px",
        outline: "none",
        backgroundColor: "transparent",
    };

    const linkHoverStyle = {
        color: '#38bdf8',
    };

    const activeLinkStyle = {
        color: '#38bdf8',
        borderBottom: '2px solid #38bdf8',
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
        border: "1px solid #475569",
        color: "#94a3b8",
        outline: "none",
    };

    const registerButtonStyle = {
        ...buttonStyle,
        background: 'linear-gradient(to right, #0ea5e9, #0ea5e9)',
        border: "none",
        color: "white",
        outline: "none",
        boxShadow: '0 4px 6px -1px rgba(14, 165, 233, 0.1), 0 2px 4px -1px rgba(14, 165, 233, 0.06)',
    };

    const handleLoginClick = () => {
        navigate("/login");
        // setIsLoginOpen(true);
        // setIsRegisterOpen(false);
    };

    const handleRegisterClick = () => {
        navigate("/signup");
        // setIsRegisterOpen(true);
        // setIsLoginOpen(false);
    };

    // const handleCloseModal = () => {
    //     setIsLoginOpen(false);
    //     setIsRegisterOpen(false);
    // };

    return (
        <>
            <nav style={navStyle}>
                <style>
                    {`
                        .mobile-menu, .overlay, .hamburger-btn {
                            display: none;
                        }
                        
                        @media (max-width: 910px) {
                            .nav-links-container {
                                display: none !important;
                            }
                            .hamburger-btn {
                                display: block !important;
                            }
                            .mobile-menu {
                                display: flex !important;
                                flex-direction: column;
                                position: fixed;
                                top: 0;
                                right: 0;
                                bottom: 0;
                                width: 300px;
                                background: rgba(10, 15, 26, 0.98);
                                padding: 1.5rem;
                                padding-top: 1rem;
                                gap: 0.25rem;
                                box-shadow: -20px 0 50px rgba(0,0,0,0.9);
                                z-index: 100001;
                                transform: translateX(100%);
                                transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
                                border-left: 1px solid rgba(56, 189, 248, 0.15);
                            }
                            .mobile-menu.open {
                                transform: translateX(0);
                            }
                            .mobile-menu-close {
                                display: flex !important;
                                align-items: center;
                                justify-content: flex-end;
                                background: none;
                                border: none;
                                color: #94a3b8;
                                cursor: pointer;
                                padding: 0.5rem;
                                margin-bottom: 1rem;
                                transition: color 0.2s ease;
                            }
                            .mobile-menu-close:hover {
                                color: #38bdf8;
                            }
                            .mobile-menu a {
                                padding: 1rem 1.25rem;
                                border-radius: 0.5rem;
                                transition: background 0.2s ease, color 0.2s ease;
                            }
                            .mobile-menu a:hover {
                                background: rgba(56, 189, 248, 0.1);
                                color: #38bdf8;
                            }
                            .overlay {
                                display: block !important;
                                position: fixed;
                                top: 0;
                                left: 0;
                                right: 0;
                                bottom: 0;
                                background: rgba(6, 11, 24, 0.7);
                                z-index: 100000;
                                opacity: 0;
                                pointer-events: none;
                                transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
                            }
                            .overlay.open {
                                opacity: 1;
                                pointer-events: auto;
                            }
                        }

                        @media (min-width: 701px) and (max-width: 910px) {
                            .nav-buttons-container {
                                display: flex !important;
                                margin-left: auto;
                                margin-right: 1rem;
                            }
                            #mobile-menu-buttons-wrapper {
                                display: none !important;
                            }
                        }

                        @media (max-width: 700px) {
                            .nav-buttons-container {
                                display: none !important;
                            }
                            #mobile-menu-buttons-wrapper {
                                display: flex !important;
                                flex-direction: column;
                                align-items: flex-start;
                                gap: 0.75rem;
                                margin-top: 1rem;
                                padding-top: 1rem;
                                border-top: 1px solid rgba(148, 163, 184, 0.2);
                            }
                            #mobile-menu-buttons-wrapper button {
                                width: fit-content;
                                min-width: 140px;
                                padding: 0.75rem 1.5rem !important;
                                font-size: 0.95rem !important;
                                border-radius: 0.5rem !important;
                                text-align: center;
                            }
                        }
                    `}
                </style>

                <a href="/" style={logoContainerStyle} tabIndex={-1}>
                    <img
                        src={FocusFlowLogo}
                        alt="FocusFlow Logo"
                        style={logoStyle}
                    />
                    <h1 style={logoTextStyle}>FocusFlow</h1>
                </a>

                <div style={linksStyle} className="nav-links-container">
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
                                e.currentTarget.style.color = "#94a3b8";
                                e.currentTarget.style.borderBottom = "2px solid transparent";
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
                                e.currentTarget.style.color = "#94a3b8";
                                e.currentTarget.style.borderBottom = "2px solid transparent";
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
                                e.currentTarget.style.color = "#94a3b8";
                                e.currentTarget.style.borderBottom = "2px solid transparent";
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
                                e.currentTarget.style.color = "#94a3b8";
                                e.currentTarget.style.borderBottom = "2px solid transparent";
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
                                e.currentTarget.style.color = "#94a3b8";
                                e.currentTarget.style.borderBottom = "2px solid transparent";
                                e.currentTarget.style.fontWeight = 500;
                            }
                        }}
                    >
                        Testimonials
                    </Link>
                </div>

                <div style={buttonsStyle} className="nav-buttons-container">
                    <button
                        onClick={handleLoginClick}
                        style={loginButtonStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#1e293b";
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
                            e.currentTarget.style.background = "linear-gradient(to right, #0284c7, #0284c7)";
                            e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "linear-gradient(to right, #0ea5e9, #0ea5e9)";
                            e.currentTarget.style.transform = "none";
                        }}
                        tabIndex={-1}
                    >
                        Get Started
                    </button>
                </div>

                <button className="hamburger-btn" style={hamburgerStyle} onClick={toggleMenu}>
                    <Bars3Icon style={{ width: "2rem", height: "2rem" }} />
                </button>
            </nav>

            {/* Overlay - Outside nav for proper z-index stacking */}
            <div className={`overlay ${isMenuOpen ? "open" : ""}`} onClick={closeMenu} />

            {/* Mobile Menu - Outside nav for proper z-index stacking */}
            <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
                <button className="mobile-menu-close" onClick={closeMenu}>
                    <XMarkIcon style={{ width: "1.75rem", height: "1.75rem" }} />
                </button>
                <Link to="/" style={linkStyle} onClick={closeMenu}>Home</Link>
                <Link to="/features" style={linkStyle} onClick={closeMenu}>Features</Link>
                <Link to="/faq" style={linkStyle} onClick={closeMenu}>FAQ</Link>
                <Link to="/focusflow-community" style={linkStyle} onClick={closeMenu}>Community</Link>
                <Link to="/testimonials" style={linkStyle} onClick={closeMenu}>Testimonials</Link>
                <div id="mobile-menu-buttons-wrapper">
                    <button onClick={() => { handleLoginClick(); closeMenu(); }} style={loginButtonStyle}>Log in</button>
                    <button onClick={() => { handleRegisterClick(); closeMenu(); }} style={registerButtonStyle}>Get Started</button>
                </div>
            </div>
        </>
    );
};

export default LandingNavbar;
