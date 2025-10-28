import { useEffect, useState } from "react";

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

const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:5000/api";

const Settings = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [focusDuration, setFocusDuration] = useState(25);
    const [breakDuration, setBreakDuration] = useState(5);
    const [language, setLanguage] = useState("en");
    const [displayName, setDisplayName] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch(`${API_BASE}/settings`, {
                    credentials: "include",
                });
                const json = await res.json();
                if (json?.success && json?.data?.settings) {
                    const s = json.data.settings;
                    setDisplayName(s?.profileSettings?.displayName || "");
                    setFocusDuration(s?.timerSettings?.pomodoroDuration ?? 25);
                    setBreakDuration(s?.timerSettings?.shortBreakDuration ?? 5);
                    setIsDarkMode(
                        (s?.themeSettings?.theme || "light") === "dark"
                    );
                    setNotifications(!!s?.notificationSettings?.notifications);
                    setLanguage(s?.language || "en");
                }
            } catch (e) {
                // stay with defaults
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const payload = {
                profileSettings: { displayName },
                timerSettings: {
                    pomodoroDuration: Number(focusDuration),
                    shortBreakDuration: Number(breakDuration),
                },
                themeSettings: { theme: isDarkMode ? "dark" : "light" },
                notificationSettings: { notifications },
                language,
            };
            await fetch(`${API_BASE}/settings`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                credentials: "include",
            });
        } catch (e) {
            // ignore
        } finally {
            setIsSaving(false);
        }
    };

    const pageWrapperStyle = {
        minHeight: "100vh",
        padding: "4.5rem 1.75rem 5rem",
        background: "var(--color-white)",
        color: "var(--color-gray-900)",
    };

    const innerStyle = {
        maxWidth: "1120px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
    };

    const heroPanelStyle = {
        background: "var(--panel-bg)",
        borderRadius: "1.5rem",
        border: "1px solid var(--input-border)",
        padding: "2.75rem",
        boxShadow: "var(--shadow-lg)",
        display: "flex",
        flexDirection: "column",
        gap: "0.8rem",
    };

    const heroTitleStyle = {
        fontSize: "2.3rem",
        fontWeight: 700,
        lineHeight: 1.2,
        background: "linear-gradient(to right, #38bdf8, #818cf8)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        margin: 0,
    };

    const heroLeadStyle = {
        fontSize: "1.05rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.7,
        maxWidth: "44rem",
    };

    const sectionStyle = {
        background: "var(--panel-bg)",
        borderRadius: "1.05rem",
        padding: "1.75rem",
        marginBottom: "1.5rem",
        border: "1px solid var(--input-border)",
        boxShadow: "var(--shadow-md)",
    };

    const sectionHeaderStyle = {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "1.5rem",
    };

    const sectionTitleStyle = {
        fontSize: "1.25rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
    };

    const settingGroupStyle = {
        marginBottom: "1.5rem",
    };

    const settingItemStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 0",
        borderBottom: "1px solid var(--color-gray-100)",
        gap: "1rem",
    };

    const settingLabelStyle = {
        fontSize: "1rem",
        color: "var(--color-gray-700)",
    };

    const settingDescriptionStyle = {
        fontSize: "0.875rem",
        color: "var(--color-gray-600)",
        marginTop: "0.25rem",
};

    const toggleStyle = {
        position: "relative",
        display: "inline-block",
        width: "3rem",
        height: "1.5rem",
    };

    const toggleInputStyle = {
        opacity: 0,
        width: 0,
        height: 0,
    };

    const toggleSliderStyle = {
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

    const toggleSliderBeforeStyle = {
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

    const selectStyle = {
        padding: "0.75rem 1rem",
        borderRadius: "0.5rem",
        border: "1px solid var(--input-border)",
        backgroundColor: "var(--input-bg)",
        color: "var(--color-gray-900)",
        fontSize: "0.95rem",
        cursor: "pointer",
        minWidth: "14rem",
    };

    const textInputStyle = {
        padding: "0.75rem 1rem",
        borderRadius: "0.5rem",
        border: "1px solid var(--input-border)",
        backgroundColor: "var(--input-bg)",
        color: "var(--color-gray-900)",
        fontSize: "0.95rem",
        minWidth: "20rem",
    };

    const numberInputStyle = {
        padding: "0.75rem 1rem",
        borderRadius: "0.5rem",
        border: "1px solid var(--input-border)",
        background: "var(--input-bg)",
        color: "var(--color-gray-900)",
        width: "6.5rem",
        textAlign: "center",
        fontSize: "0.95rem",
    };

    const saveButtonStyle = {
        background: "linear-gradient(to right, #38bdf8, #60a5fa)",
        color: "#0f172a",
        padding: "0.9rem 2rem",
        borderRadius: "9999px",
        border: "none",
        fontSize: "1rem",
        fontWeight: 700,
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        minWidth: "12rem",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 16px 30px -20px rgba(56, 189, 248, 0.6)",
    };

    const saveButtonHoverStyle = {
        transform: "translateY(-2px)",
        boxShadow: "0 20px 40px -22px rgba(56, 189, 248, 0.65)",
    };

    return (
        <div style={pageWrapperStyle}>
            <div style={innerStyle}>
                <section style={heroPanelStyle}>
                    <h1 style={heroTitleStyle}>Settings</h1>
                    <p style={heroLeadStyle}>
                        Customize your FocusFlow experience and preferences
                    </p>
                </section>

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
                        <div style={{ flex: 1 }}>
                            <div style={settingLabelStyle}>Display Name</div>
                            <div style={settingDescriptionStyle}>
                                Your name as it appears to others
                            </div>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            style={textInputStyle}
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
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
                        <div style={{ flex: 1 }}>
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
                        <div style={{ flex: 1 }}>
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
                        <div style={{ flex: 1 }}>
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
                            <span
                                style={{
                                    ...toggleSliderStyle,
                                    backgroundColor: isDarkMode
                                        ? "var(--color-primary-500)"
                                        : "var(--color-gray-300)",
                                }}
                            >
                                <span
                                    style={{
                                        display: "block",
                                        height: "1.25rem",
                                        width: "1.25rem",
                                        backgroundColor: "white",
                                        borderRadius: "50%",
                                        transition: "0.4s",
                                        transform: isDarkMode
                                            ? "translateX(1.5rem)"
                                            : "translateX(0)",
                                        margin: "0.125rem",
                                    }}
                                ></span>
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
                        <div style={{ flex: 1 }}>
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
                        <div style={{ flex: 1 }}>
                            <div style={settingLabelStyle}>Data Collection</div>
                            <div style={settingDescriptionStyle}>
                                Allow anonymous usage data collection
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
                            <span
                                style={{
                                    ...toggleSliderStyle,
                                    backgroundColor: notifications
                                        ? "var(--color-primary-500)"
                                        : "var(--color-gray-300)",
                                }}
                            >
                                <span
                                    style={{
                                        display: "block",
                                        height: "1.25rem",
                                        width: "1.25rem",
                                        backgroundColor: "white",
                                        borderRadius: "50%",
                                        transition: "0.4s",
                                        transform: notifications
                                            ? "translateX(1.5rem)"
                                            : "translateX(0)",
                                        margin: "0.125rem",
                                    }}
                                ></span>
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
                onClick={handleSave}
                disabled={isSaving}
            >
                {isSaving ? "Saving..." : "Save Changes"}
            </button>
        </div>
        </div>
    );
};

export default Settings;
