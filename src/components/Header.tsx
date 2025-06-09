import type { CSSProperties } from "react";
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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FocusFlowLogo from "../assets/focusflowlogo.png";

const Header = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    // Mock user data - replace with actual user data from your auth system
    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "/avatars/default.jpg",
        role: "Premium User",
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const containerStyle: CSSProperties = {
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

    const logoContainerStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
    };

    const logoStyle: CSSProperties = {
        height: "3rem",
        width: "3.5rem",
        marginRight: "1rem",
        filter: "drop-shadow(0 4px 3px rgba(0, 0, 0, 0.07)) drop-shadow(0 2px 2px rgba(0, 0, 0, 0.06))",
    };

    const titleStyle: CSSProperties = {
        fontSize: "1.5rem",
        fontWeight: 800,
        letterSpacing: "-0.025em",
        color: "var(--color-white)",
        filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.05))",
    };

    const actionsStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
    };

    const buttonStyle: CSSProperties = {
        padding: "0.5rem",
        borderRadius: "0.5rem",
        background: "none",
        border: "none",
        color: "var(--color-white)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.2s",
    };

    const profileButtonStyle: CSSProperties = {
        ...buttonStyle,
        position: "relative",
    };

    const dropdownStyle: CSSProperties = {
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

    const dropdownHeaderStyle: CSSProperties = {
        padding: "0.75rem",
        borderBottom: "1px solid var(--color-gray-200)",
    };

    const dropdownItemStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.75rem",
        color: "var(--color-gray-700)",
        textDecoration: "none",
        borderRadius: "0.375rem",
        transition: "all 0.2s",
    };

    const dropdownItemHoverStyle: CSSProperties = {
        backgroundColor: "var(--color-gray-100)",
        color: "var(--color-primary-600)",
    };

    const dropdownItemIconStyle: CSSProperties = {
        width: "1.25rem",
        height: "1.25rem",
    };

    const dropdownDividerStyle: CSSProperties = {
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
                <button
                    style={buttonStyle}
                    onClick={() => setIsDarkMode(!isDarkMode)}
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
                <button style={buttonStyle}>
                    <BellIcon style={{ width: "1.5rem", height: "1.5rem" }} />
                </button>
                <div style={{ position: "relative" }}>
                    <button
                        style={profileButtonStyle}
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
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
                                    {user.name}
                                </p>
                                <p
                                    style={{
                                        fontSize: "0.875rem",
                                        color: "var(--color-gray-600)",
                                    }}
                                >
                                    {user.email}
                                </p>
                            </div>
                            <Link
                                to="/profile"
                                style={dropdownItemStyle}
                                onMouseEnter={(e) => {
                                    Object.assign(
                                        e.currentTarget.style,
                                        dropdownItemHoverStyle
                                    );
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "";
                                    e.currentTarget.style.color =
                                        "var(--color-gray-700)";
                                }}
                            >
                                <UserIcon style={dropdownItemIconStyle} />
                                Profile
                            </Link>
                            <Link
                                to="/settings"
                                style={dropdownItemStyle}
                                onMouseEnter={(e) => {
                                    Object.assign(
                                        e.currentTarget.style,
                                        dropdownItemHoverStyle
                                    );
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "";
                                    e.currentTarget.style.color =
                                        "var(--color-gray-700)";
                                }}
                            >
                                <Cog6ToothIcon style={dropdownItemIconStyle} />
                                Settings
                            </Link>
                            <div style={dropdownDividerStyle} />
                            <button
                                style={dropdownItemStyle}
                                onClick={handleLogout}
                                onMouseEnter={(e) => {
                                    Object.assign(
                                        e.currentTarget.style,
                                        dropdownItemHoverStyle
                                    );
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "";
                                    e.currentTarget.style.color =
                                        "var(--color-gray-700)";
                                }}
                            >
                                <ArrowRightOnRectangleIcon
                                    style={dropdownItemIconStyle}
                                />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
