import React, { useState } from "react";

import {
    UserCircleIcon,
    PencilIcon,
    BellIcon,
    ShieldCheckIcon,
    ClockIcon,
    ChartBarIcon,
    TrophyIcon,
    CalendarIcon,
    Cog6ToothIcon,
    KeyIcon,
    DevicePhoneMobileIcon,
    GlobeAltIcon,
} from "@heroicons/react/24/outline";

const Profile = () => {
    const [activeTab, setActiveTab] = useState("overview");

    // Mock user data - replace with actual user data from your auth system
    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Premium User",
        joinDate: "January 2024",
        avatar: "/avatars/default.jpg",
        focusTime: "156h 30m",
        sessions: 87,
        tasksCompleted: 234,
        streak: 7,
    };

    const containerStyle = {
        minWidth: "64rem",
        margin: "0 auto",
        padding: "2rem",
    };

    const headerStyle = {
        marginBottom: "2rem",
    };

    const titleStyle = {
        fontSize: "1.875rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const descriptionStyle = {
        fontSize: "1rem",
        color: "var(--color-gray-600)",
    };

    const tabsStyle = {
        display: "flex",
        gap: "1rem",
        marginBottom: "2rem",
        borderBottom: "2px solid var(--color-gray-200)",
        paddingBottom: "0.5rem",
    };

    const tabStyle = {
        padding: "0.75rem 1.5rem",
        fontSize: "1rem",
        fontWeight: 500,
        color: "var(--color-gray-600)",
        cursor: "pointer",
        borderRadius: "0.5rem",
        transition: "all 0.2s ease-in-out",
    };

    const activeTabStyle = {
        ...tabStyle,
        background: "var(--color-primary-50)",
        color: "var(--color-primary-700)",
    };

    const profileCardStyle = {
        background: "var(--color-white)",
        borderRadius: "1rem",
        padding: "2rem",
        marginBottom: "2rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    };

    const profileHeaderStyle = {
        display: "flex",
        alignItems: "center",
        gap: "2rem",
        marginBottom: "2rem",
    };

    const avatarStyle = {
        width: "8rem",
        height: "8rem",
        borderRadius: "50%",
        background: "var(--color-primary-100)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--color-primary-600)",
    };

    const avatarIconStyle = {
        width: "4rem",
        height: "4rem",
    };

    const profileInfoStyle = {
        flex: 1,
    };

    const userNameStyle = {
        fontSize: "1.5rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const userEmailStyle = {
        fontSize: "1rem",
        color: "var(--color-gray-600)",
        marginBottom: "0.5rem",
    };

    const userRoleStyle = {
        display: "inline-block",
        padding: "0.25rem 0.75rem",
        background: "var(--color-primary-50)",
        color: "var(--color-primary-700)",
        borderRadius: "9999px",
        fontSize: "0.875rem",
        fontWeight: 500,
    };

    const editButtonStyle = {
        padding: "0.5rem 1rem",
        background: "var(--color-primary-50)",
        color: "var(--color-primary-700)",
        borderRadius: "0.5rem",
        fontSize: "0.875rem",
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
    };

    const statsGridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1.5rem",
        marginBottom: "2rem",
    };

    const statCardStyle = {
        background: "var(--color-gray-50)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
    };

    const statIconStyle = {
        width: "2rem",
        height: "2rem",
        color: "var(--color-primary-600)",
        marginBottom: "1rem",
    };

    const statValueStyle = {
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "0.25rem",
    };

    const statLabelStyle = {
        fontSize: "0.875rem",
        color: "var(--color-gray-600)",
    };

    const settingsGridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1.5rem",
    };

    const settingCardStyle = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    };

    const settingHeaderStyle = {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "1rem",
    };

    const settingIconStyle = {
        width: "2rem",
        height: "2rem",
        color: "var(--color-primary-600)",
    };

    const settingTitleStyle = {
        fontSize: "1.125rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
    };

    const settingDescriptionStyle = {
        fontSize: "0.875rem",
        color: "var(--color-gray-600)",
        marginBottom: "1rem",
    };

    const settingButtonStyle = {
        padding: "0.5rem 1rem",
        background: "var(--color-primary-50)",
        color: "var(--color-primary-700)",
        borderRadius: "0.5rem",
        fontSize: "0.875rem",
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
    };

    return (
        <div style={containerStyle}>
            <header style={headerStyle}>
                <h1 style={titleStyle}>Profile</h1>
                <p style={descriptionStyle}>
                    Manage your account settings and preferences
                </p>
            </header>

            {/* Tabs */}
            <div style={tabsStyle}>
                <button
                    style={activeTab === "overview" ? activeTabStyle : tabStyle}
                    onClick={() => setActiveTab("overview")}
                >
                    Overview
                </button>
                <button
                    style={activeTab === "settings" ? activeTabStyle : tabStyle}
                    onClick={() => setActiveTab("settings")}
                >
                    Settings
                </button>
                <button
                    style={activeTab === "security" ? activeTabStyle : tabStyle}
                    onClick={() => setActiveTab("security")}
                >
                    Security
                </button>
            </div>

            {/* Profile Card */}
            <div style={profileCardStyle}>
                <div style={profileHeaderStyle}>
                    <div style={avatarStyle}>
                        <UserCircleIcon style={avatarIconStyle} />
                    </div>
                    <div style={profileInfoStyle}>
                        <h2 style={userNameStyle}>{user.name}</h2>
                        <p style={userEmailStyle}>{user.email}</p>
                        <p style={userRoleStyle}>{user.role}</p>
                    </div>
                    <button style={editButtonStyle}>
                        <PencilIcon style={avatarIconStyle} />
                        Edit Profile
                    </button>
                </div>

                {/* Stats Grid */}
                <div style={statsGridStyle}>
                    <div style={statCardStyle}>
                        <div style={statIconStyle}>
                            <ClockIcon />
                        </div>
                        <div style={statValueStyle}>{user.focusTime}</div>
                        <div style={statLabelStyle}>Total Focus Time</div>
                    </div>
                    <div style={statCardStyle}>
                        <div style={statIconStyle}>
                            <ChartBarIcon />
                        </div>
                        <div style={statValueStyle}>{user.sessions}</div>
                        <div style={statLabelStyle}>Focus Sessions</div>
                    </div>
                    <div style={statCardStyle}>
                        <div style={statIconStyle}>
                            <TrophyIcon />
                        </div>
                        <div style={statValueStyle}>{user.tasksCompleted}</div>
                        <div style={statLabelStyle}>Tasks Completed</div>
                    </div>
                    <div style={statCardStyle}>
                        <div style={statIconStyle}>
                            <ShieldCheckIcon />
                        </div>
                        <div style={statValueStyle}>{user.streak}</div>
                        <div style={statLabelStyle}>Day Streak</div>
                    </div>
                </div>

                {/* Settings Grid */}
                <div style={settingsGridStyle}>
                    <div style={settingCardStyle}>
                        <div style={settingHeaderStyle}>
                            <BellIcon style={settingIconStyle} />
                            <h3 style={settingTitleStyle}>Notifications</h3>
                        </div>
                        <p style={settingDescriptionStyle}>
                            Manage your notification preferences and email
                            settings
                        </p>
                        <button style={settingButtonStyle}>Configure</button>
                    </div>
                    <div style={settingCardStyle}>
                        <div style={settingHeaderStyle}>
                            <ShieldCheckIcon style={settingIconStyle} />
                            <h3 style={settingTitleStyle}>Privacy</h3>
                        </div>
                        <p style={settingDescriptionStyle}>
                            Control your privacy settings and data sharing
                            preferences
                        </p>
                        <button style={settingButtonStyle}>Manage</button>
                    </div>
                    <div style={settingCardStyle}>
                        <div style={settingHeaderStyle}>
                            <Cog6ToothIcon style={settingIconStyle} />
                            <h3 style={settingTitleStyle}>Preferences</h3>
                        </div>
                        <p style={settingDescriptionStyle}>
                            Customize your FocusFlow experience and display
                            settings
                        </p>
                        <button style={settingButtonStyle}>Customize</button>
                    </div>
                    <div style={settingCardStyle}>
                        <div style={settingHeaderStyle}>
                            <KeyIcon style={settingIconStyle} />
                            <h3 style={settingTitleStyle}>Security</h3>
                        </div>
                        <p style={settingDescriptionStyle}>
                            Update your password and manage account security
                        </p>
                        <button style={settingButtonStyle}>Secure</button>
                    </div>
                    <div style={settingCardStyle}>
                        <div style={settingHeaderStyle}>
                            <DevicePhoneMobileIcon style={settingIconStyle} />
                            <h3 style={settingTitleStyle}>Devices</h3>
                        </div>
                        <p style={settingDescriptionStyle}>
                            Manage your connected devices and sessions
                        </p>
                        <button style={settingButtonStyle}>Manage</button>
                    </div>
                    <div style={settingCardStyle}>
                        <div style={settingHeaderStyle}>
                            <GlobeAltIcon style={settingIconStyle} />
                            <h3 style={settingTitleStyle}>Language</h3>
                        </div>
                        <p style={settingDescriptionStyle}>
                            Change your language and regional settings
                        </p>
                        <button style={settingButtonStyle}>Change</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
