import { useState } from "react";
import {
    BellIcon,
    UserIcon,
    ShieldCheckIcon,
    PaintBrushIcon,
    ClockIcon,
    LanguageIcon,
    MoonIcon,
    SunIcon,
} from "@heroicons/react/24/outline";
import type { CSSProperties } from "react";

const Settings = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [focusDuration, setFocusDuration] = useState(25);
    const [breakDuration, setBreakDuration] = useState(5);
    const [language, setLanguage] = useState("en");

    const containerStyle: CSSProperties = {
        minWidth: "64rem",
        margin: "2rem auto",
        padding: "0 1rem",
    };

    const headerStyle: CSSProperties = {
        marginBottom: "2rem",
    };

    const titleStyle: CSSProperties = {
        fontSize: "1.875rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const descriptionStyle: CSSProperties = {
        fontSize: "1rem",
        color: "var(--color-gray-600)",
    };

    const sectionStyle: CSSProperties = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        marginBottom: "1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    };

    const sectionHeaderStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "1.5rem",
    };

    const sectionTitleStyle: CSSProperties = {
        fontSize: "1.25rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
    };

    const settingGroupStyle: CSSProperties = {
        marginBottom: "1.5rem",
    };

    const settingItemStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 0",
        borderBottom: "1px solid var(--color-gray-100)",
    };

    const settingLabelStyle: CSSProperties = {
        fontSize: "1rem",
        color: "var(--color-gray-700)",
    };

    const settingDescriptionStyle: CSSProperties = {
        fontSize: "0.875rem",
        color: "var(--color-gray-500)",
        marginTop: "0.25rem",
    };

    const toggleStyle: CSSProperties = {
        position: "relative",
        display: "inline-block",
        width: "3rem",
        height: "1.5rem",
    };

    const toggleInputStyle: CSSProperties = {
        opacity: 0,
        width: 0,
        height: 0,
    };

    const toggleSliderStyle: CSSProperties = {
        position: "absolute",
        cursor: "pointer",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "var(--color-gray-300)",
        transition: "0.4s",
        borderRadius: "1.5rem",
    };

    const toggleSliderBeforeStyle: CSSProperties = {
        position: "absolute",
        content: '""',
        height: "1.25rem",
        width: "1.25rem",
        left: "0.125rem",
        bottom: "0.125rem",
        backgroundColor: "white",
        transition: "0.4s",
        borderRadius: "50%",
        transform: notifications ? "translateX(1.5rem)" : "translateX(0)",
    };

    const selectStyle: CSSProperties = {
        padding: "0.5rem",
        borderRadius: "0.375rem",
        border: "1px solid var(--color-gray-300)",
        backgroundColor: "var(--color-white)",
        color: "var(--color-gray-700)",
        fontSize: "0.875rem",
        cursor: "pointer",
    };

    const numberInputStyle: CSSProperties = {
        padding: "0.5rem",
        borderRadius: "0.375rem",
        border: "1px solid var(--color-gray-300)",
        width: "5rem",
        textAlign: "center",
    };

    const saveButtonStyle: CSSProperties = {
        backgroundColor: "var(--color-primary-600)",
        color: "white",
        padding: "0.75rem 1.5rem",
        borderRadius: "0.5rem",
        border: "none",
        fontSize: "1rem",
        fontWeight: 500,
        cursor: "pointer",
        transition: "background-color 0.2s ease-in-out",
    };

    const saveButtonHoverStyle: CSSProperties = {
        backgroundColor: "var(--color-primary-700)",
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>Settings</h1>
                <p style={descriptionStyle}>
                    Customize your FocusFlow experience and preferences
                </p>
            </div>

            {/* Profile Settings */}
            <div style={sectionStyle}>
                <div style={sectionHeaderStyle}>
                    <UserIcon
                        style={{
                            width: "1.5rem",
                            height: "1.5rem",
                            color: "var(--color-primary-600)",
                        }}
                    />
                    <h2 style={sectionTitleStyle}>Profile Settings</h2>
                </div>
                <div style={settingGroupStyle}>
                    <div style={settingItemStyle}>
                        <div>
                            <div style={settingLabelStyle}>Display Name</div>
                            <div style={settingDescriptionStyle}>
                                Your name as it appears to other users
                            </div>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            style={{
                                padding: "0.5rem",
                                borderRadius: "0.375rem",
                                border: "1px solid var(--color-gray-300)",
                                width: "16rem",
                            }}
                        />
                    </div>
                    <div style={settingItemStyle}>
                        <div>
                            <div style={settingLabelStyle}>
                                Email Notifications
                            </div>
                            <div style={settingDescriptionStyle}>
                                Receive email updates about your progress
                            </div>
                        </div>
                        <label style={toggleStyle}>
                            <input
                                type="checkbox"
                                checked={notifications}
                                onChange={(e) =>
                                    setNotifications(e.target.checked)
                                }
                                style={toggleInputStyle}
                            />
                            <span style={toggleSliderStyle}>
                                <span style={toggleSliderBeforeStyle} />
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Timer Settings */}
            <div style={sectionStyle}>
                <div style={sectionHeaderStyle}>
                    <ClockIcon
                        style={{
                            width: "1.5rem",
                            height: "1.5rem",
                            color: "var(--color-primary-600)",
                        }}
                    />
                    <h2 style={sectionTitleStyle}>Timer Settings</h2>
                </div>
                <div style={settingGroupStyle}>
                    <div style={settingItemStyle}>
                        <div>
                            <div style={settingLabelStyle}>Focus Duration</div>
                            <div style={settingDescriptionStyle}>
                                Length of focus sessions in minutes
                            </div>
                        </div>
                        <input
                            type="number"
                            value={focusDuration}
                            onChange={(e) =>
                                setFocusDuration(Number(e.target.value))
                            }
                            min="1"
                            max="60"
                            style={numberInputStyle}
                        />
                    </div>
                    <div style={settingItemStyle}>
                        <div>
                            <div style={settingLabelStyle}>Break Duration</div>
                            <div style={settingDescriptionStyle}>
                                Length of break sessions in minutes
                            </div>
                        </div>
                        <input
                            type="number"
                            value={breakDuration}
                            onChange={(e) =>
                                setBreakDuration(Number(e.target.value))
                            }
                            min="1"
                            max="30"
                            style={numberInputStyle}
                        />
                    </div>
                </div>
            </div>

            {/* Appearance Settings */}
            <div style={sectionStyle}>
                <div style={sectionHeaderStyle}>
                    <PaintBrushIcon
                        style={{
                            width: "1.5rem",
                            height: "1.5rem",
                            color: "var(--color-primary-600)",
                        }}
                    />
                    <h2 style={sectionTitleStyle}>Appearance</h2>
                </div>
                <div style={settingGroupStyle}>
                    <div style={settingItemStyle}>
                        <div>
                            <div style={settingLabelStyle}>Dark Mode</div>
                            <div style={settingDescriptionStyle}>
                                Switch between light and dark themes
                            </div>
                        </div>
                        <label style={toggleStyle}>
                            <input
                                type="checkbox"
                                checked={isDarkMode}
                                onChange={(e) =>
                                    setIsDarkMode(e.target.checked)
                                }
                                style={toggleInputStyle}
                            />
                            <span style={toggleSliderStyle}>
                                <span style={toggleSliderBeforeStyle} />
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Language Settings */}
            <div style={sectionStyle}>
                <div style={sectionHeaderStyle}>
                    <LanguageIcon
                        style={{
                            width: "1.5rem",
                            height: "1.5rem",
                            color: "var(--color-primary-600)",
                        }}
                    />
                    <h2 style={sectionTitleStyle}>Language</h2>
                </div>
                <div style={settingGroupStyle}>
                    <div style={settingItemStyle}>
                        <div>
                            <div style={settingLabelStyle}>
                                Interface Language
                            </div>
                            <div style={settingDescriptionStyle}>
                                Choose your preferred language
                            </div>
                        </div>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            style={selectStyle}
                        >
                            <option value="en">English</option>
                            <option value="es">Español</option>
                            <option value="fr">Français</option>
                            <option value="de">Deutsch</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Privacy Settings */}
            <div style={sectionStyle}>
                <div style={sectionHeaderStyle}>
                    <ShieldCheckIcon
                        style={{
                            width: "1.5rem",
                            height: "1.5rem",
                            color: "var(--color-primary-600)",
                        }}
                    />
                    <h2 style={sectionTitleStyle}>Privacy</h2>
                </div>
                <div style={settingGroupStyle}>
                    <div style={settingItemStyle}>
                        <div>
                            <div style={settingLabelStyle}>Data Collection</div>
                            <div style={settingDescriptionStyle}>
                                Allow anonymous usage data collection
                            </div>
                        </div>
                        <label style={toggleStyle}>
                            <input
                                type="checkbox"
                                defaultChecked
                                style={toggleInputStyle}
                            />
                            <span style={toggleSliderStyle}>
                                <span style={toggleSliderBeforeStyle} />
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            <button
                style={saveButtonStyle}
                onMouseEnter={(e) => {
                    Object.assign(e.currentTarget.style, saveButtonHoverStyle);
                }}
                onMouseLeave={(e) => {
                    Object.assign(e.currentTarget.style, saveButtonStyle);
                }}
            >
                Save Changes
            </button>
        </div>
    );
};

export default Settings;
