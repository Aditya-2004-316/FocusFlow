import { useEffect, useState, useRef } from "react";
import {
    UserIcon,
    ShieldCheckIcon,
    PaintBrushIcon,
    CheckCircleIcon,
    CloudArrowUpIcon,
    BellIcon,
    RocketLaunchIcon,
    UsersIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import useResponsive from "../hooks/useResponsive";

import { API_BASE_URL as API_BASE } from "../config/api";

const Settings = () => {
    const { isMobile, isTablet, width } = useResponsive();
    const [activeSection, setActiveSection] = useState("profile");
    const [isWrapped, setIsWrapped] = useState(false);
    const tabBarRef = useRef(null);
    const isThemeDark = document.documentElement.classList.contains('dark');

    useEffect(() => {
        if (!tabBarRef.current) return;
        const observer = new ResizeObserver(() => {
            const container = tabBarRef.current;
            if (!container) return;
            const children = Array.from(container.children);
            if (children.length > 1) {
                const firstRowTop = children[0].offsetTop;
                const lastRowTop = children[children.length - 1].offsetTop;
                const wrapped = lastRowTop > firstRowTop;
                setIsWrapped(prev => prev !== wrapped ? wrapped : prev);
            }
        });
        observer.observe(tabBarRef.current);
        return () => observer.disconnect();
    }, []);

    // Profile
    const [displayName, setDisplayName] = useState("");
    const [bio, setBio] = useState("");

    // Appearance
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [glassIntensity, setGlassIntensity] = useState("medium");

    // Notifications
    const [notifications, setNotifications] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [desktopNotifications, setDesktopNotifications] = useState(true);

    // Productivity
    const [autoStartBreaks, setAutoStartBreaks] = useState(false);
    const [autoStartWork, setAutoStartWork] = useState(false);

    // Community
    const [statusVisibility, setStatusVisibility] = useState(true);
    const [leaderboardOptIn, setLeaderboardOptIn] = useState(true);

    // Privacy
    const [dataSharing, setDataSharing] = useState(true);

    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const token = localStorage.getItem("token");
                const headers = {};
                if (token) {
                    headers["Authorization"] = `Bearer ${token}`;
                }
                const res = await fetch(`${API_BASE}/settings`, {
                    headers,
                });
                if (res.ok) {
                    const json = await res.json();
                    if (json?.success && json?.data?.settings) {
                        const s = json.data.settings;
                        setDisplayName(s?.profileSettings?.displayName || "");
                        setBio(s?.profileSettings?.bio || "");
                        setIsDarkMode((s?.themeSettings?.theme || "light") === "dark");
                        setGlassIntensity(s?.themeSettings?.glassIntensity || "medium");
                        setNotifications(!!s?.notificationSettings?.notifications);
                        setSoundEnabled(s?.notificationSettings?.soundEnabled ?? true);
                        setDesktopNotifications(s?.notificationSettings?.desktopNotifications ?? true);
                        setAutoStartBreaks(s?.productivitySettings?.autoStartBreaks ?? false);
                        setAutoStartWork(s?.productivitySettings?.autoStartWork ?? false);
                        setStatusVisibility(s?.communitySettings?.statusVisibility ?? true);
                        setLeaderboardOptIn(s?.communitySettings?.leaderboardOptIn ?? true);
                        setDataSharing(!!s?.privacySettings?.dataSharing);
                    }
                }
            } catch (e) {
                console.error("Failed to fetch settings", e);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const payload = {
                profileSettings: { displayName, bio },
                themeSettings: {
                    theme: isDarkMode ? "dark" : "light",
                    glassIntensity
                },
                notificationSettings: {
                    notifications,
                    soundEnabled,
                    desktopNotifications
                },
                productivitySettings: {
                    autoStartBreaks,
                    autoStartWork
                },
                communitySettings: {
                    statusVisibility,
                    leaderboardOptIn
                },
                privacySettings: { dataSharing }
            };
            const token = localStorage.getItem("token");
            const headers = { "Content-Type": "application/json" };
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }
            await fetch(`${API_BASE}/settings`, {
                method: "PUT",
                headers,
                body: JSON.stringify(payload),
                credentials: "include",
            });
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (e) {
            console.error("Save failed", e);
        } finally {
            setIsSaving(false);
        }
    };

    const styles = {
        pageWrapper: {
            minHeight: "100vh",
            padding: isMobile ? "1.5rem 1rem 5rem" : "6rem 2rem 5rem",
            background: "var(--color-white)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        container: {
            width: "100%",
            maxWidth: "1100px",
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "1.5rem" : "2.5rem",
            background: "var(--panel-bg)",
            padding: isMobile ? "1.5rem" : "4rem",
            borderRadius: isMobile ? "1.5rem" : "3rem",
            border: "1px solid var(--input-border)",
            boxShadow: "var(--shadow-lg)",
            position: "relative",
            overflow: "hidden",
        },
        pageHeader: {
            textAlign: "left",
            width: "100%",
            position: "relative",
            padding: "2rem 0",
        },
        title: {
            fontSize: "2.5rem",
            fontWeight: 800,
            color: "var(--color-gray-900)",
            marginBottom: "0.5rem",
            letterSpacing: "-1px",
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
        },
        subtitle: {
            fontSize: "1.1rem",
            color: "var(--color-gray-600)",
            lineHeight: 1.6,
        },
        tabBar: {
            display: "flex",
            background: isWrapped ? "transparent" : "var(--color-gray-100)",
            padding: "0.5rem",
            borderRadius: "1.25rem",
            gap: "0.5rem",
            alignSelf: "center",
            border: isWrapped ? "1px solid transparent" : "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
            marginBottom: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
        },
        tab: (isActive) => ({
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.6rem 1.25rem",
            borderRadius: "0.85rem",
            cursor: "pointer",
            fontSize: "0.95rem",
            fontWeight: 600,
            transition: "all 0.2s ease",
            background: isActive
                ? (isWrapped ? (isThemeDark ? "rgba(14, 165, 233, 0.2)" : "var(--color-primary-50)") : "var(--color-white)")
                : (isWrapped ? (isThemeDark ? "rgba(255, 255, 255, 0.05)" : "var(--color-gray-50)") : "transparent"),
            color: isActive ? (isThemeDark ? "#38bdf8" : "#0ea5e9") : "var(--color-gray-500)",
            boxShadow: isActive ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" : "none",
            border: isWrapped ? (isActive ? "1.5px solid #0ea5e9" : "1px solid var(--input-border)") : (isActive ? "1px solid var(--input-border)" : "1px solid transparent"),
        }),
        contentCard: {
            background: "var(--input-bg)",
            borderRadius: "1.5rem",
            border: "1px solid var(--input-border)",
            padding: isMobile ? "1.5rem" : "2.5rem",
            boxShadow: "var(--shadow-md)",
            position: "relative",
            overflow: "hidden",
            minHeight: "500px",
        },
        glassAccent: {
            position: "absolute",
            top: "-150px",
            right: "-150px",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, transparent 70%)",
            pointerEvents: "none",
        },
        settingSection: {
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
        },
        row: {
            display: width < 975 ? "flex" : "grid",
            flexDirection: "column",
            gridTemplateColumns: "1fr auto",
            alignItems: width < 975 ? "stretch" : "center",
            padding: width < 975 ? "1.5rem 0" : "2rem 0",
            gap: width < 975 ? "1rem" : "3rem",
        },
        lastRow: {
            borderBottom: "none",
        },
        label: {
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "var(--color-gray-900)",
            marginBottom: "0.4rem",
        },
        desc: {
            fontSize: "1rem",
            color: "var(--color-gray-600)",
            lineHeight: 1.7,
        },
        input: {
            padding: "0.85rem 1.25rem",
            borderRadius: "0.85rem",
            border: "1px solid var(--input-border)",
            background: "var(--input-bg)",
            color: "var(--color-gray-900)",
            fontSize: "1.05rem",
            width: width < 975 ? "100%" : "320px",
            outline: "none",
            transition: "border-color 0.2s, box-shadow 0.2s",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        },
        select: {
            padding: "0.85rem 1.25rem",
            borderRadius: "0.85rem",
            border: "1px solid var(--input-border)",
            background: "var(--input-bg)",
            color: "var(--color-gray-900)",
            fontSize: "1.05rem",
            width: "320px",
            cursor: "pointer",
            outline: "none",
        },
        textarea: {
            padding: "0.85rem 1.25rem",
            borderRadius: "0.85rem",
            border: "1px solid var(--input-border)",
            background: "var(--input-bg)",
            color: "var(--color-gray-900)",
            fontSize: "1.05rem",
            width: "320px",
            minHeight: "100px",
            outline: "none",
            resize: "none",
            transition: "border-color 0.2s, box-shadow 0.2s",
        },
        toggleEx: (enabled) => ({
            width: "3rem",
            height: "1.65rem",
            borderRadius: "99px",
            background: enabled ? "#0ea5e9" : "var(--color-gray-300)",
            position: "relative",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }),
        knob: (enabled) => ({
            width: "1.25rem",
            height: "1.25rem",
            background: "#fff",
            borderRadius: "50%",
            position: "absolute",
            top: "0.2rem",
            left: enabled ? "1.55rem" : "0.2rem",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }),
        footer: {
            marginTop: "3rem",
            paddingTop: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        saveBtn: {
            background: isSaving
                ? "var(--color-gray-400)"
                : "linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)",
            color: "#fff",
            padding: "0.9rem 2.5rem",
            borderRadius: "1rem",
            border: "none",
            fontWeight: 700,
            fontSize: "1rem",
            cursor: isSaving ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: isSaving ? "none" : "0 8px 30px -10px rgba(14, 165, 233, 0.5)",
            flexShrink: 0,
            whiteSpace: "nowrap",
            minWidth: "fit-content",
        },
        successMsg: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "#10b981",
            fontWeight: 700,
            animation: "slideUp 0.4s ease",
        }
    };

    const sections = [
        { id: "profile", label: "Profile", icon: UserIcon },
        { id: "notifications", label: "Notifications", icon: BellIcon },
        { id: "productivity", label: "Productivity", icon: RocketLaunchIcon },
        { id: "appearance", label: "Appearance", icon: PaintBrushIcon },
        { id: "community", label: "Community", icon: UsersIcon },
        { id: "privacy", label: "Privacy", icon: ShieldCheckIcon },
    ];

    const renderContent = () => {
        switch (activeSection) {
            case "profile":
                return (
                    <div style={styles.settingSection}>
                        <div style={styles.row}>
                            <div>
                                <h3 style={styles.label}>Display Name</h3>
                                <p style={styles.desc}>How you'll be identified across FocusFlow.</p>
                            </div>
                            <input
                                style={styles.input}
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                placeholder="E.g. FocusMaster_99"
                            />
                        </div>
                        <div style={{ ...styles.row, ...styles.lastRow }}>
                            <div>
                                <h3 style={styles.label}>Bio</h3>
                                <p style={styles.desc}>A short description for your profile (max 150 chars).</p>
                            </div>
                            <textarea
                                style={styles.textarea}
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Describe your focus journey..."
                            />
                        </div>
                    </div>
                );
            case "notifications":
                return (
                    <div style={styles.settingSection}>
                        <div style={styles.row}>
                            <div>
                                <h3 style={styles.label}>Global Alerts</h3>
                                <p style={styles.desc}>Master switch for all FocusFlow notifications and alerts.</p>
                            </div>
                            <div style={styles.toggleEx(notifications)} onClick={() => setNotifications(!notifications)}>
                                <div style={styles.knob(notifications)} />
                            </div>
                        </div>
                        <div style={styles.row}>
                            <div>
                                <h3 style={styles.label}>Push Notifications</h3>
                                <p style={styles.desc}>Allow desktop notifications for session starts and reminders.</p>
                            </div>
                            <div style={styles.toggleEx(desktopNotifications)} onClick={() => setDesktopNotifications(!desktopNotifications)}>
                                <div style={styles.knob(desktopNotifications)} />
                            </div>
                        </div>
                        <div style={{ ...styles.row, ...styles.lastRow }}>
                            <div>
                                <h3 style={styles.label}>Sound Effects</h3>
                                <p style={styles.desc}>Play sounds for timer completion and breaks.</p>
                            </div>
                            <div style={styles.toggleEx(soundEnabled)} onClick={() => setSoundEnabled(!soundEnabled)}>
                                <div style={styles.knob(soundEnabled)} />
                            </div>
                        </div>
                    </div>
                );
            case "productivity":
                return (
                    <div style={styles.settingSection}>
                        <div style={styles.row}>
                            <div>
                                <h3 style={styles.label}>Auto-start Breaks</h3>
                                <p style={styles.desc}>Automatically transition to a break when focus time ends.</p>
                            </div>
                            <div style={styles.toggleEx(autoStartBreaks)} onClick={() => setAutoStartBreaks(!autoStartBreaks)}>
                                <div style={styles.knob(autoStartBreaks)} />
                            </div>
                        </div>
                        <div style={{ ...styles.row, ...styles.lastRow }}>
                            <div>
                                <h3 style={styles.label}>Auto-start Focus</h3>
                                <p style={styles.desc}>Immediately start the next work block after a break.</p>
                            </div>
                            <div style={styles.toggleEx(autoStartWork)} onClick={() => setAutoStartWork(!autoStartWork)}>
                                <div style={styles.knob(autoStartWork)} />
                            </div>
                        </div>
                    </div>
                );
            case "appearance":
                return (
                    <div style={styles.settingSection}>
                        <div style={styles.row}>
                            <div>
                                <h3 style={styles.label}>Dark Mode</h3>
                                <p style={styles.desc}>Switch between light and dark interface themes.</p>
                            </div>
                            <div style={styles.toggleEx(isDarkMode)} onClick={() => setIsDarkMode(!isDarkMode)}>
                                <div style={styles.knob(isDarkMode)} />
                            </div>
                        </div>
                        <div style={{ ...styles.row, ...styles.lastRow }}>
                            <div>
                                <h3 style={styles.label}>Glassmorphism Intensity</h3>
                                <p style={styles.desc}>Adjust the transparency and blur effects of the interface.</p>
                            </div>
                            <select
                                style={styles.select}
                                value={glassIntensity}
                                onChange={(e) => setGlassIntensity(e.target.value)}
                            >
                                <option value="low">Low (Solid)</option>
                                <option value="medium">Medium (Balanced)</option>
                                <option value="high">High (Maximum Glass)</option>
                            </select>
                        </div>
                    </div>
                );
            case "community":
                return (
                    <div style={styles.settingSection}>
                        <div style={styles.row}>
                            <div>
                                <h3 style={styles.label}>Focus Status Visibility</h3>
                                <p style={styles.desc}>Allow others to see when you are currently in a focus session.</p>
                            </div>
                            <div style={styles.toggleEx(statusVisibility)} onClick={() => setStatusVisibility(!statusVisibility)}>
                                <div style={styles.knob(statusVisibility)} />
                            </div>
                        </div>
                        <div style={{ ...styles.row, ...styles.lastRow }}>
                            <div>
                                <h3 style={styles.label}>Community Leaderboards</h3>
                                <p style={styles.desc}>Agree to participate in global rankings and focus challenges.</p>
                            </div>
                            <div style={styles.toggleEx(leaderboardOptIn)} onClick={() => setLeaderboardOptIn(!leaderboardOptIn)}>
                                <div style={styles.knob(leaderboardOptIn)} />
                            </div>
                        </div>
                    </div>
                );
            case "privacy":
                return (
                    <div style={styles.settingSection}>
                        <div style={{ ...styles.row, ...styles.lastRow }}>
                            <div>
                                <h3 style={styles.label}>Anonymous Data Sharing</h3>
                                <p style={styles.desc}>Help us optimize focus flows by sharing usage analytics.</p>
                            </div>
                            <div style={styles.toggleEx(dataSharing)} onClick={() => setDataSharing(!dataSharing)}>
                                <div style={styles.knob(dataSharing)} />
                            </div>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.container}>
                <header style={styles.pageHeader}>
                    <div style={{ position: "absolute", top: "-30px", right: "-40px", opacity: 0.08, pointerEvents: "none", transform: "rotate(-15deg)" }}>
                        <Cog6ToothIcon style={{ width: "280px" }} />
                    </div>
                    <h1 style={styles.title}>
                        <Cog6ToothIcon style={{ width: "2.5rem", color: "#0ea5e9" }} />
                        Settings
                    </h1>
                    <p style={styles.subtitle}>Customize your FocusFlow workspace and behaviors.</p>
                </header>

                <nav ref={tabBarRef} style={styles.tabBar}>
                    {sections.map((sec) => (
                        <div
                            key={sec.id}
                            style={styles.tab(activeSection === sec.id)}
                            onClick={() => setActiveSection(sec.id)}
                        >
                            <sec.icon style={{ width: "1.1rem" }} />
                            {sec.label}
                        </div>
                    ))}
                </nav>

                <main style={styles.contentCard}>
                    <div style={styles.glassAccent} />

                    {renderContent()}

                    <footer style={styles.footer}>
                        <div style={{ color: "var(--color-gray-500)", fontSize: "0.85rem", fontWeight: 500 }}>
                            {isSaving ? "Synchronizing changes..." : `Last updated: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                            {showSuccess && (
                                <div style={styles.successMsg}>
                                    <CheckCircleIcon style={{ width: "1.25rem" }} />
                                    Preferences Synced
                                </div>
                            )}
                            <button
                                style={styles.saveBtn}
                                onClick={handleSave}
                                disabled={isSaving}
                                onMouseEnter={(e) => !isSaving && (e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)')}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0) scale(1)')}
                            >
                                <CloudArrowUpIcon style={{ width: "1.25rem", flexShrink: 0 }} />
                                {isSaving ? "Saving..." : "Apply Changes"}
                            </button>
                        </div>
                    </footer>
                </main>
            </div>
            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default Settings;
