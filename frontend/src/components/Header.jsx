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
    CheckCircleIcon,
    FireIcon,
} from "@heroicons/react/24/outline";

import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import FocusFlowLogo from "../assets/focusflowlogo.png";
import useResponsive from "../hooks/useResponsive";

const Header = () => {
    const { isMobile, width } = useResponsive();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [hoveredNotification, setHoveredNotification] = useState(null);
    const [hoveredProfileItem, setHoveredProfileItem] = useState(null);
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
        padding: isMobile ? "0.75rem 1rem" : "1rem 2rem",
        background:
            "linear-gradient(to right, var(--color-primary-500), var(--color-cyan-400))",
        borderBottom: "1px solid var(--color-primary-500)",
        boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        position: "sticky",
        top: 0,
        zIndex: 100,
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
        fontSize: isMobile ? "1.2rem" : "1.5rem",
        fontWeight: 800,
        letterSpacing: "-0.025em",
        color: "#ffffff",
        filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.05))",
        display: isMobile && window.innerWidth < 380 ? "none" : "block",
    };

    const actionsStyle = {
        display: "flex",
        alignItems: "center",
        gap: width < 400 ? "0.5rem" : "1rem",
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
        backgroundColor: "var(--panel-bg)",
        borderRadius: "0.5rem",
        boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        border: "1px solid var(--input-border)",
        padding: "0.5rem",
        minWidth: "12rem",
        zIndex: 50,
    };

    const notificationDropdownStyle = {
        ...dropdownStyle,
        minWidth: isMobile ? "90vw" : "20rem",
        maxWidth: isMobile ? "95vw" : "22rem",
        right: isMobile ? "-4rem" : "0",
    };

    const dropdownHeaderStyle = {
        padding: "0.75rem",
    };

    const dropdownItemStyle = {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.75rem",
        color: "var(--color-gray-900)",
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
        backgroundColor: "var(--input-border)",
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
                {isAuthenticated && (
                    <div style={{ position: "relative" }}>
                        <button
                            style={buttonStyle}
                            onClick={() =>
                                setIsNotificationsOpen((prev) => !prev)
                            }
                            title="Notifications"
                        >
                            <BellIcon
                                style={{ width: "1.5rem", height: "1.5rem" }}
                            />
                        </button>
                        {isNotificationsOpen && (
                            <div style={notificationDropdownStyle}>
                                <div style={dropdownHeaderStyle}>
                                    <p
                                        style={{
                                            fontWeight: 600,
                                            color: "var(--color-gray-900)",
                                            margin: 0,
                                        }}
                                    >
                                        Notifications
                                    </p>
                                </div>
                                <div
                                    style={{
                                        ...dropdownItemStyle,
                                        cursor: "pointer",
                                        display: "grid",
                                        gap: "0.5rem",
                                        paddingTop: "1rem",
                                        paddingBottom: "1rem",
                                        backgroundColor: hoveredNotification === 0 ? "var(--color-gray-100)" : "transparent",
                                    }}
                                    onMouseEnter={() => setHoveredNotification(0)}
                                    onMouseLeave={() => setHoveredNotification(null)}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: "0.75rem",
                                        }}
                                    >
                                        <CheckCircleIcon
                                            style={{
                                                ...dropdownItemIconStyle,
                                                color: "var(--color-green-600)",
                                                flexShrink: 0,
                                            }}
                                        />
                                        <div>
                                            <p
                                                style={{
                                                    margin: 0,
                                                    fontWeight: 600,
                                                    fontSize: "0.9rem",
                                                    color: hoveredNotification === 0 ? "var(--color-primary-600)" : "var(--color-gray-900)",
                                                }}
                                            >
                                                Session Complete!
                                            </p>
                                            <p
                                                style={{
                                                    margin: "0.25rem 0 0",
                                                    fontSize: "0.85rem",
                                                    color: "var(--color-gray-600)",
                                                }}
                                            >
                                                Great job! You completed a
                                                25-minute focus session.
                                            </p>
                                            <p
                                                style={{
                                                    margin: "0.25rem 0 0",
                                                    fontSize: "0.75rem",
                                                    color: "var(--color-gray-500)",
                                                }}
                                            >
                                                2 hours ago
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div style={dropdownDividerStyle} />
                                <div
                                    style={{
                                        ...dropdownItemStyle,
                                        cursor: "pointer",
                                        display: "grid",
                                        gap: "0.5rem",
                                        paddingTop: "1rem",
                                        paddingBottom: "1rem",
                                        backgroundColor: hoveredNotification === 1 ? "var(--color-gray-100)" : "transparent",
                                    }}
                                    onMouseEnter={() => setHoveredNotification(1)}
                                    onMouseLeave={() => setHoveredNotification(null)}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: "0.75rem",
                                        }}
                                    >
                                        <FireIcon
                                            style={{
                                                ...dropdownItemIconStyle,
                                                color: "var(--color-orange-500)",
                                                flexShrink: 0,
                                            }}
                                        />
                                        <div>
                                            <p
                                                style={{
                                                    margin: 0,
                                                    fontWeight: 600,
                                                    fontSize: "0.9rem",
                                                    color: hoveredNotification === 1 ? "var(--color-primary-600)" : "var(--color-gray-900)",
                                                }}
                                            >
                                                5-Day Streak!
                                            </p>
                                            <p
                                                style={{
                                                    margin: "0.25rem 0 0",
                                                    fontSize: "0.85rem",
                                                    color: "var(--color-gray-600)",
                                                }}
                                            >
                                                You're on fire! Keep up the
                                                momentum.
                                            </p>
                                            <p
                                                style={{
                                                    margin: "0.25rem 0 0",
                                                    fontSize: "0.75rem",
                                                    color: "var(--color-gray-500)",
                                                }}
                                            >
                                                Yesterday
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div style={dropdownDividerStyle} />
                                <div
                                    style={{
                                        ...dropdownItemStyle,
                                        cursor: "pointer",
                                        display: "grid",
                                        gap: "0.5rem",
                                        paddingTop: "1rem",
                                        paddingBottom: "1rem",
                                        backgroundColor: hoveredNotification === 2 ? "var(--color-gray-100)" : "transparent",
                                    }}
                                    onMouseEnter={() => setHoveredNotification(2)}
                                    onMouseLeave={() => setHoveredNotification(null)}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: "0.75rem",
                                        }}
                                    >
                                        <BellIcon
                                            style={{
                                                ...dropdownItemIconStyle,
                                                color: "var(--color-primary-600)",
                                                flexShrink: 0,
                                            }}
                                        />
                                        <div>
                                            <p
                                                style={{
                                                    margin: 0,
                                                    fontWeight: 600,
                                                    fontSize: "0.9rem",
                                                    color: hoveredNotification === 2 ? "var(--color-primary-600)" : "var(--color-gray-900)",
                                                }}
                                            >
                                                Break Reminder
                                            </p>
                                            <p
                                                style={{
                                                    margin: "0.25rem 0 0",
                                                    fontSize: "0.85rem",
                                                    color: "var(--color-gray-600)",
                                                }}
                                            >
                                                Time for a 5-minute break.
                                                Stretch and recharge!
                                            </p>
                                            <p
                                                style={{
                                                    margin: "0.25rem 0 0",
                                                    fontSize: "0.75rem",
                                                    color: "var(--color-gray-500)",
                                                }}
                                            >
                                                3 days ago
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div style={dropdownDividerStyle} />
                                <button
                                    type="button"
                                    style={{
                                        ...dropdownItemStyle,
                                        width: "100%",
                                        border: "none",
                                        background: "transparent",
                                        justifyContent: "center",
                                        fontWeight: 600,
                                        fontSize: "0.9rem",
                                        backgroundColor: hoveredNotification === 'viewAll' ? "var(--color-gray-100)" : "transparent",
                                        color: hoveredNotification === 'viewAll' ? "var(--color-primary-600)" : "var(--color-gray-900)",
                                    }}
                                    onMouseEnter={() => setHoveredNotification('viewAll')}
                                    onMouseLeave={() => setHoveredNotification(null)}
                                    onClick={() =>
                                        setIsNotificationsOpen(false)
                                    }
                                >
                                    View All Notifications
                                </button>
                            </div>
                        )}
                    </div>
                )}
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
                                        {user.firstName ||
                                            user.username ||
                                            user.email}
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
                                    style={{
                                        ...dropdownItemStyle,
                                        backgroundColor: hoveredProfileItem === 'profile' ? "var(--color-gray-100)" : "transparent",
                                        color: hoveredProfileItem === 'profile' ? "var(--color-primary-600)" : "var(--color-gray-900)",
                                    }}
                                    onMouseEnter={() => setHoveredProfileItem('profile')}
                                    onMouseLeave={() => setHoveredProfileItem(null)}
                                    onClick={() => setIsProfileOpen(false)}
                                >
                                    <UserIcon style={dropdownItemIconStyle} />
                                    <span>Profile</span>
                                </Link>
                                {isMobile && (
                                    <>
                                        <Link
                                            to="/settings"
                                            style={{
                                                ...dropdownItemStyle,
                                                backgroundColor: hoveredProfileItem === 'settings' ? "var(--color-gray-100)" : "transparent",
                                                color: hoveredProfileItem === 'settings' ? "var(--color-primary-600)" : "var(--color-gray-900)",
                                            }}
                                            onMouseEnter={() => setHoveredProfileItem('settings')}
                                            onMouseLeave={() => setHoveredProfileItem(null)}
                                            onClick={() => setIsProfileOpen(false)}
                                        >
                                            <Cog6ToothIcon style={dropdownItemIconStyle} />
                                            <span>Settings</span>
                                        </Link>
                                        <Link
                                            to="/help-support"
                                            style={{
                                                ...dropdownItemStyle,
                                                backgroundColor: hoveredProfileItem === 'help' ? "var(--color-gray-100)" : "transparent",
                                                color: hoveredProfileItem === 'help' ? "var(--color-primary-600)" : "var(--color-gray-900)",
                                            }}
                                            onMouseEnter={() => setHoveredProfileItem('help')}
                                            onMouseLeave={() => setHoveredProfileItem(null)}
                                            onClick={() => setIsProfileOpen(false)}
                                        >
                                            <QuestionMarkCircleIcon style={dropdownItemIconStyle} />
                                            <span>Help & Support</span>
                                        </Link>
                                    </>
                                )}
                                <div style={dropdownDividerStyle} />
                                <button
                                    type="button"
                                    style={{
                                        ...dropdownItemStyle,
                                        width: "100%",
                                        border: "none",
                                        background: "transparent",
                                        backgroundColor: hoveredProfileItem === 'logout' ? "var(--color-gray-100)" : "transparent",
                                        color: hoveredProfileItem === 'logout' ? "var(--color-primary-600)" : "var(--color-gray-900)",
                                    }}
                                    onMouseEnter={() => setHoveredProfileItem('logout')}
                                    onMouseLeave={() => setHoveredProfileItem(null)}
                                    onClick={handleLogout}
                                >
                                    <ArrowRightOnRectangleIcon
                                        style={dropdownItemIconStyle}
                                    />
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
