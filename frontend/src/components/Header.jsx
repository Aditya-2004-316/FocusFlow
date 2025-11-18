import {
    UserCircleIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
    UserIcon,
    BellIcon,
    QuestionMarkCircleIcon,
    ShieldCheckIcon,
    MoonIcon,
    SunIcon,
} from "@heroicons/react/24/outline";

import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import FocusFlowLogo from "../assets/focusflowlogo.png";

const Header = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Default to dark mode for authenticated users
        const saved = localStorage.getItem("theme");
        const shouldDark = saved ? saved === "dark" : true; // Default to dark if no preference saved
        setIsDarkMode(shouldDark);
        document.documentElement.classList.toggle("dark", shouldDark);
        document.body.classList.toggle("dark", shouldDark);
        // Save the default preference if not set
        if (!saved) {
            localStorage.setItem("theme", "dark");
        }
    }, []);

    const toggleTheme = () => {
        const next = !isDarkMode;
        setIsDarkMode(next);
        document.documentElement.classList.toggle("dark", next);
        document.body.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
    };

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
        navigate("/");
    };

    const containerStyle = {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        background:
            "linear-gradient(to right, var(--color-primary-500), var(--color-cyan-400))",
        borderBottom: "4px solid var(--color-primary-600)",
        boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        position: "sticky",
        top: 0,
        zIndex: 30,
    };

    const logoContainerStyle = {
        display: "flex",
        alignItems: "center",
    };

    const logoStyle = {
        height: "3rem",
        width: "3.5rem",
        marginRight: "1rem",
        filter: "drop-shadow(0 4px 3px rgba(0, 0, 0, 0.07)) drop-shadow(0 2px 2px rgba(0, 0, 0, 0.06))",
    };

    const titleStyle = {
        fontSize: "1.5rem",
        fontWeight: 800,
        letterSpacing: "-0.025em",
        color: "#ffffff",
        filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.05))",
    };

    const actionsStyle = {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
    };

    const buttonStyle = {
        padding: "0.5rem",
        borderRadius: "0.5rem",
        background: "none",
        border: "none",
        color: "#ffffff",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.2s",
    };

    const profileButtonStyle = {
        ...buttonStyle,
        position: "relative",
    };

    const dropdownStyle = {
        position: "absolute",
        top: "100%",
        right: 0,
        marginTop: "0.5rem",
        backgroundColor: "white",
        borderRadius: "0.5rem",
        boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        padding: "0.5rem",
        minWidth: "12rem",
        zIndex: 50,
    };

    const dropdownHeaderStyle = {
        padding: "0.75rem",
        borderBottom: "1px solid var(--color-gray-200)",
    };

    const dropdownItemStyle = {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.75rem",
        color: "var(--color-gray-700)",
        textDecoration: "none",
        borderRadius: "0.375rem",
        transition: "all 0.2s",
    };

    const dropdownItemHoverStyle = {
        backgroundColor: "var(--color-gray-100)",
        color: "var(--color-primary-600)",
    };

    const dropdownItemIconStyle = {
        width: "1.25rem",
        height: "1.25rem",
    };

    const dropdownDividerStyle = {
        height: "1px",
        backgroundColor: "var(--color-gray-200)",
        margin: "0.5rem 0",
    };

    return (
        <header style={containerStyle}>
            <div style={logoContainerStyle}>
                <img
                    src={FocusFlowLogo}
                    alt="FocusFlow Logo"
                    style={logoStyle}
                />
                <h1 style={titleStyle}>FocusFlow</h1>
            </div>
            <div style={actionsStyle}>
                {isAuthenticated && (
                    <button
                        style={buttonStyle}
                        onClick={toggleTheme}
                        title={
                            isDarkMode ? "Switch to light" : "Switch to dark"
                        }
                    >
                        {isDarkMode ? (
                            <SunIcon
                                style={{ width: "1.5rem", height: "1.5rem" }}
                            />
                        ) : (
                            <MoonIcon
                                style={{ width: "1.5rem", height: "1.5rem" }}
                            />
                        )}
                    </button>
                )}
                <button style={buttonStyle}>
                    <BellIcon style={{ width: "1.5rem", height: "1.5rem" }} />
                </button>
                {isAuthenticated && user && (
                    <div style={{ position: "relative" }}>
                        <button
                            style={profileButtonStyle}
                            onClick={() => setIsProfileOpen((prev) => !prev)}
                        >
                            <UserCircleIcon
                                style={{ width: "2rem", height: "2rem" }}
                            />
                        </button>
                        {isProfileOpen && (
                            <div style={dropdownStyle}>
                                <div style={dropdownHeaderStyle}>
                                    <p
                                        style={{
                                            fontWeight: 600,
                                            color: "var(--color-gray-900)",
                                        }}
                                    >
                                        {user.firstName || user.username || user.email}
                                    </p>
                                    {user.email && (
                                        <p
                                            style={{
                                                fontSize: "0.875rem",
                                                color: "var(--color-gray-600)",
                                            }}
                                        >
                                            {user.email}
                                        </p>
                                    )}
                                </div>
                                <Link
                                    to="/profile"
                                    style={dropdownItemStyle}
                                    onMouseEnter={(e) =>
                                        Object.assign(e.currentTarget.style, dropdownItemHoverStyle)
                                    }
                                    onMouseLeave={(e) => {
                                        Object.assign(e.currentTarget.style, dropdownItemStyle);
                                    }}
                                    onClick={() => setIsProfileOpen(false)}
                                >
                                    <UserIcon style={dropdownItemIconStyle} />
                                    <span>Profile</span>
                                </Link>
                                <div style={dropdownDividerStyle} />
                                <button
                                    type="button"
                                    style={{
                                        ...dropdownItemStyle,
                                        width: "100%",
                                        border: "none",
                                        background: "transparent",
                                    }}
                                    onMouseEnter={(e) =>
                                        Object.assign(e.currentTarget.style, dropdownItemHoverStyle)
                                    }
                                    onMouseLeave={(e) => {
                                        Object.assign(e.currentTarget.style, dropdownItemStyle);
                                    }}
                                    onClick={handleLogout}
                                >
                                    <ArrowRightOnRectangleIcon style={dropdownItemIconStyle} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
