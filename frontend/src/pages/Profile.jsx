import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useIsMobile, useIsSmallMobile, useIsNarrow } from "../hooks/useMediaQuery";
import { API_BASE_URL as API_BASE } from "../config/api";

import {
    UserCircleIcon,
    PencilIcon,
    BellIcon,
    ShieldCheckIcon,
    ClockIcon,
    ChartBarIcon,
    TrophyIcon,
    FireIcon,
    Cog6ToothIcon,
    KeyIcon,
    DevicePhoneMobileIcon,
    GlobeAltIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    CameraIcon,
} from "@heroicons/react/24/outline";

const Profile = () => {
    // Must destructure user first before using it in state
    const { user, logout, updateUser } = useAuth();
    const navigate = useNavigate();
    // Responsive breakpoints
    const isMobile = useIsMobile();
    const isSmallMobile = useIsSmallMobile();
    const isNarrow = useIsNarrow();


    const [activeTab, setActiveTab] = useState("overview");
    const [isEditing, setIsEditing] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const [notification, setNotification] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Form states - now user is available
    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        username: user?.username || "",
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const isDarkTheme =
        typeof document !== "undefined" &&
        document.documentElement.classList.contains("dark");

    const displayName = user
        ? user.firstName
            ? `${user.firstName}${user.lastName ? " " + user.lastName : ""}`
            : user.username || user.email || "Account"
        : "Account";
    const displayEmail = user?.email || "";
    const displayRole = user?.isEmailVerified ? "Verified member" : "Member";
    const joinDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
        })
        : "";

    // Update form data when user changes
    React.useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || "",
                username: user.username || "",
            });
        }
    }, [user]);

    const [stats, setStats] = useState({
        totalFocusTime: "0h 0m",
        focusSessions: 0,
        tasksCompleted: 0,
        currentStreak: 0,
    });

    React.useEffect(() => {
        const fetchProfileStats = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const res = await fetch(`${API_BASE}/stats/summary`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const json = await res.json();
                if (json?.success && json?.data?.summary) {
                    const s = json.data.summary;
                    setStats({
                        totalFocusTime: `${Math.floor(s.todayFocusMinutes / 60)}h ${s.todayFocusMinutes % 60}m`, // Today's focus
                        focusSessions: s.completedSessionsCount,
                        tasksCompleted: 0, // Placeholder as backend doesn't track specific tasks yet beyond sessions
                        currentStreak: s.currentStreak,
                    });
                }

                // If we want lifetime stats, we'd call /stats/full or /stats/community
                const fullRes = await fetch(`${API_BASE}/stats/full?range=year`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const fullJson = await fullRes.json();
                if (fullJson?.success && fullJson?.data?.metrics) {
                    const m = fullJson.data.metrics;
                    setStats(prev => ({
                        ...prev,
                        totalFocusTime: m.totalFocusTime,
                        focusSessions: parseInt(m.completedSessions) || prev.focusSessions,
                    }));
                }

            } catch (e) {
                console.error("Profile stats fetch failed:", e.message);
            }
        };
        fetchProfileStats();
    }, []);

    const styles = {
        page: {
            minHeight: "100vh",
            padding: isNarrow ? "3.5rem 0.75rem 2.5rem" : (isMobile ? "4rem 1rem 3rem" : "3.5rem 2rem 5rem"),
            background: isDarkTheme
                ? "var(--color-white)"
                : "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #f0fdf4 50%, #fdf4ff 75%, #fff7ed 100%)",
            color: "var(--color-gray-900)",
        },
        container: {
            maxWidth: "1120px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: isNarrow ? "1.25rem" : (isMobile ? "1.5rem" : "2rem"),
        },
        header: {
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            maxWidth: "42rem",
        },
        title: {
            fontSize: isNarrow ? "1.75rem" : (isMobile ? "2rem" : "2.5rem"),
            fontWeight: 700,
            letterSpacing: "-0.02em",
            background: isDarkTheme
                ? "linear-gradient(110deg, #38bdf8, #818cf8)"
                : "linear-gradient(110deg, #0ea5e9, #3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: 0,
        },
        description: {
            fontSize: isMobile ? "0.95rem" : "1.05rem",
            color: "var(--color-gray-600)",
            lineHeight: 1.6,
        },
        tabBar: {
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            paddingBottom: "0.5rem",
        },
        tab: {
            padding: isNarrow ? "0.65rem 1rem" : "0.75rem 1.5rem",
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "var(--color-gray-600)",
            cursor: "pointer",
            borderRadius: "0.75rem",
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            border: "1px solid transparent",
            background: "transparent",
        },
        tabActive: {
            background: "rgba(59,130,246,0.15)",
            color: "var(--color-primary-700)",
            border: "1px solid rgba(56,189,248,0.35)",
            boxShadow: isDarkTheme
                ? "0 4px 12px -4px rgba(14,165,233,0.3)"
                : "0 4px 12px -4px rgba(56,189,248,0.4)",
        },
        profileCard: {
            background: isDarkTheme
                ? "var(--panel-bg)"
                : "rgba(255,255,255,0.75)",
            borderRadius: isNarrow ? "1rem" : (isMobile ? "1.25rem" : "1.75rem"),
            padding: isNarrow ? "1.25rem" : (isMobile ? "1.5rem" : "2.5rem"),
            border: isDarkTheme
                ? "1px solid var(--input-border)"
                : "1px solid rgba(255,255,255,0.4)",
            boxShadow: isDarkTheme
                ? "var(--shadow-lg)"
                : "0 25px 50px -12px rgba(59,130,246,0.15)",
            backdropFilter: isDarkTheme ? "none" : "blur(20px)",
            WebkitBackdropFilter: isDarkTheme ? "none" : "blur(20px)",
            position: "relative",
            overflow: "hidden",
        },
        profileHeader: {
            display: "flex",
            alignItems: "flex-start",
            gap: isNarrow ? "0.75rem" : (isMobile ? "1rem" : "2rem"),
            marginBottom: isNarrow ? "1.25rem" : (isMobile ? "1.5rem" : "2.5rem"),
            flexWrap: "wrap",
        },
        avatarWrapper: {
            position: "relative",
        },
        avatar: {
            width: isNarrow ? "5.5rem" : (isMobile ? "7rem" : "9rem"),
            height: isNarrow ? "5.5rem" : (isMobile ? "7rem" : "9rem"),
            borderRadius: "50%",
            background: isDarkTheme
                ? "rgba(56,189,248,0.12)"
                : "linear-gradient(135deg, rgba(56,189,248,0.2), rgba(99,102,241,0.2))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color-primary-600)",
            border: isDarkTheme
                ? "3px solid rgba(56,189,248,0.3)"
                : "3px solid rgba(255,255,255,0.8)",
            boxShadow: isDarkTheme
                ? "0 8px 24px -8px rgba(14,165,233,0.3)"
                : "0 12px 32px -12px rgba(56,189,248,0.4)",
        },
        avatarIcon: {
            width: isNarrow ? "3rem" : (isMobile ? "4rem" : "5rem"),
            height: isNarrow ? "3rem" : (isMobile ? "4rem" : "5rem"),
        },
        avatarEditButton: {
            position: "absolute",
            bottom: "0.5rem",
            right: "0.5rem",
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "50%",
            background: "var(--color-primary-600)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            border: "2px solid var(--panel-bg)",
            boxShadow: "0 4px 12px -4px rgba(14,165,233,0.5)",
        },
        avatarEditIcon: {
            width: "1rem",
            height: "1rem",
        },
        profileInfo: {
            flex: 1,
            minWidth: "250px",
        },
        userName: {
            fontSize: isNarrow ? "1.35rem" : (isMobile ? "1.5rem" : "2rem"),
            fontWeight: 700,
            color: "var(--color-gray-900)",
            marginBottom: "0.5rem",
            letterSpacing: "-0.01em",
        },
        userEmail: {
            fontSize: isMobile ? "0.95rem" : "1.05rem",
            color: "var(--color-gray-600)",
            marginBottom: "0.75rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
        },
        userRole: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.4rem 1rem",
            background: isDarkTheme
                ? "rgba(34,197,94,0.12)"
                : "rgba(34,197,94,0.1)",
            color: isDarkTheme ? "#4ade80" : "#16a34a",
            borderRadius: "9999px",
            fontSize: "0.875rem",
            fontWeight: 600,
            border: isDarkTheme
                ? "1px solid rgba(34,197,94,0.25)"
                : "1px solid rgba(34,197,94,0.2)",
        },
        editButton: {
            padding: isNarrow ? "0.65rem 1rem" : "0.75rem 1.5rem",
            background: isDarkTheme
                ? "rgba(14,165,233,0.15)"
                : "rgba(59,130,246,0.12)",
            color: "var(--color-primary-700)",
            borderRadius: "0.9rem",
            fontSize: "0.95rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            border: isDarkTheme
                ? "1px solid rgba(14,165,233,0.35)"
                : "1px solid rgba(56,189,248,0.28)",
            boxShadow: isDarkTheme
                ? "0 4px 12px -4px rgba(14,165,233,0.3)"
                : "0 4px 12px -4px rgba(56,189,248,0.35)",
        },
        editIcon: {
            width: "1.1rem",
            height: "1.1rem",
        },
        statsGrid: {
            display: "grid",
            gridTemplateColumns: isNarrow ? "repeat(auto-fit, minmax(120px, 1fr))" : (isMobile ? "repeat(auto-fit, minmax(140px, 1fr))" : "repeat(auto-fit, minmax(220px, 1fr))"),
            gap: isNarrow ? "0.75rem" : (isMobile ? "1rem" : "1.25rem"),
            marginBottom: "2rem",
        },
        statCard: {
            background: isDarkTheme
                ? "rgba(56,189,248,0.06)"
                : "rgba(255,255,255,0.7)",
            borderRadius: "1.25rem",
            padding: "1.75rem",
            border: isDarkTheme
                ? "1px solid rgba(56,189,248,0.15)"
                : "1px solid rgba(255,255,255,0.5)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
        },
        statHeader: {
            display: "flex",
            alignItems: "center",
            gap: "0.85rem",
        },
        statIconWrap: {
            width: "3rem",
            height: "3rem",
            borderRadius: "0.85rem",
            background: isDarkTheme
                ? "rgba(56,189,248,0.12)"
                : "rgba(59,130,246,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
        },
        statIcon: {
            width: "1.5rem",
            height: "1.5rem",
            color: "var(--color-primary-600)",
        },
        statValue: {
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "var(--color-gray-900)",
        },
        statLabel: {
            fontSize: "0.875rem",
            color: "var(--color-gray-600)",
            fontWeight: 500,
            letterSpacing: "0.02em",
            margin: 0,
        },
        settingsGrid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
            gap: isMobile ? "1rem" : "1.5rem",
            width: "100%",
        },
        settingCard: {
            background: isDarkTheme
                ? "var(--panel-bg)"
                : "rgba(255,255,255,0.7)",
            borderRadius: isNarrow ? "0.85rem" : (isMobile ? "1rem" : "1.25rem"),
            padding: isNarrow ? "1rem" : (isMobile ? "1.25rem" : "1.75rem"),
            border: isDarkTheme
                ? "1px solid var(--input-border)"
                : "1px solid rgba(255,255,255,0.4)",
            boxShadow: isDarkTheme
                ? "var(--shadow-md)"
                : "0 10px 25px -5px rgba(59,130,246,0.1)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            minHeight: "220px",
        },
        settingHeader: {
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1rem",
        },
        settingIconWrap: {
            width: "2.75rem",
            height: "2.75rem",
            borderRadius: "0.85rem",
            background: isDarkTheme
                ? "rgba(56,189,248,0.12)"
                : "rgba(59,130,246,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
        },
        settingIcon: {
            width: "1.35rem",
            height: "1.35rem",
            color: "var(--color-primary-600)",
            flexShrink: 0,
        },
        settingTitle: {
            fontSize: "1.125rem",
            fontWeight: 600,
            color: "var(--color-gray-900)",
            margin: 0,
        },
        settingDescription: {
            fontSize: "0.9rem",
            color: "var(--color-gray-600)",
            lineHeight: 1.6,
            marginBottom: "1.5rem",
            flex: 1,
        },
        settingButton: {
            width: "fit-content",
            minWidth: "110px",
            height: "42px",
            padding: "0 1.25rem",
            background: isDarkTheme
                ? "rgba(14,165,233,0.15)"
                : "rgba(59,130,246,0.12)",
            color: "var(--color-primary-700)",
            borderRadius: "0.85rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            border: isDarkTheme
                ? "1px solid rgba(14,165,233,0.35)"
                : "1px solid rgba(56,189,248,0.28)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: "auto",
        },
        sectionCard: {
            background: isDarkTheme
                ? "var(--panel-bg)"
                : "rgba(255,255,255,0.75)",
            borderRadius: "1.5rem",
            padding: "2rem",
            border: isDarkTheme
                ? "1px solid var(--input-border)"
                : "1px solid rgba(255,255,255,0.4)",
            boxShadow: isDarkTheme
                ? "var(--shadow-lg)"
                : "0 25px 50px -12px rgba(59,130,246,0.12)",
            backdropFilter: isDarkTheme ? "none" : "blur(16px)",
            WebkitBackdropFilter: isDarkTheme ? "none" : "blur(16px)",
        },
        sectionTitle: {
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--color-gray-900)",
            marginBottom: "1.5rem",
        },
        formGrid: {
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
        },
        formGroup: {
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
        },
        label: {
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "var(--color-gray-700)",
            letterSpacing: "0.01em",
        },
        input: {
            padding: "0.85rem 1.05rem",
            borderRadius: "0.75rem",
            border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
            background: "var(--input-bg)",
            color: "var(--color-gray-900)",
            fontSize: "0.95rem",
            outline: "none",
            transition: "all 0.2s ease",
        },
        buttonGroup: {
            display: "flex",
            gap: "1rem",
            marginTop: "1.5rem",
        },
        primaryButton: {
            padding: "0.85rem 2rem",
            background: "linear-gradient(to right, #38bdf8, #60a5fa)",
            color: "#0f172a",
            borderRadius: "0.85rem",
            fontWeight: 600,
            fontSize: "0.95rem",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 8px 24px -8px rgba(56,189,248,0.5)",
        },
        secondaryButton: {
            padding: "0.85rem 2rem",
            background: isDarkTheme
                ? "rgba(148,163,184,0.12)"
                : "rgba(148,163,184,0.15)",
            color: "var(--color-gray-700)",
            borderRadius: "0.85rem",
            fontWeight: 600,
            fontSize: "0.95rem",
            border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
    };

    const showNotification = (message, type = "success") => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 5000);
    };

    const handleEditProfile = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            setActiveTab("settings");
        }
    };

    const handleFormChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handlePasswordChange = (field, value) => {
        setPasswordData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSaveProfile = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                showNotification("Please login to update profile", "error");
                navigate("/login");
                return;
            }

            const response = await fetch(
                `${API_BASE}/users/profile`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (response.ok && data.success) {
                // Update the user in auth context
                if (updateUser) {
                    updateUser(data.data.user);
                }
                showNotification("Profile updated successfully!", "success");
                setIsEditing(false);
            } else {
                showNotification(
                    data.message || "Failed to update profile",
                    "error"
                );
            }
        } catch (error) {
            console.error("Profile update error:", error);
            showNotification(
                "An error occurred while updating profile",
                "error"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdatePassword = async () => {
        // Validation
        if (!passwordData.currentPassword) {
            showNotification("Please enter your current password", "error");
            return;
        }
        if (!passwordData.newPassword) {
            showNotification("Please enter a new password", "error");
            return;
        }
        if (passwordData.newPassword.length < 6) {
            showNotification(
                "New password must be at least 6 characters",
                "error"
            );
            return;
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            showNotification("New passwords do not match", "error");
            return;
        }

        setIsLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                showNotification("Please login to update password", "error");
                navigate("/login");
                return;
            }

            const response = await fetch(
                `${API_BASE}/users/password`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        currentPassword: passwordData.currentPassword,
                        newPassword: passwordData.newPassword,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok && data.success) {
                showNotification(
                    "Password updated successfully! Please login with your new password.",
                    "success"
                );
                setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
            } else {
                showNotification(
                    data.message || "Failed to update password",
                    "error"
                );
            }
        } catch (error) {
            console.error("Password update error:", error);
            showNotification(
                "An error occurred while updating password",
                "error"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // TODO: Upload file to server and update user profile
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
            console.log("Profile picture selected:", file.name);
        }
    };

    const renderOverview = () => (
        <>
            <div style={styles.profileCard}>
                <div style={styles.profileHeader}>
                    <div style={styles.avatarWrapper}>
                        <div style={styles.avatar}>
                            <UserCircleIcon style={styles.avatarIcon} />
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            id="profile-picture-input"
                            onChange={handleProfilePictureChange}
                        />
                        <label
                            htmlFor="profile-picture-input"
                            style={styles.avatarEditButton}
                            title="Change profile picture"
                        >
                            <CameraIcon style={styles.avatarEditIcon} />
                        </label>
                    </div>
                    <div style={styles.profileInfo}>
                        <h2 style={styles.userName}>{displayName}</h2>
                        {displayEmail && (
                            <p style={styles.userEmail}>
                                <EnvelopeIcon
                                    style={{ width: "1rem", height: "1rem" }}
                                />
                                {displayEmail}
                            </p>
                        )}
                        <span style={styles.userRole}>
                            {displayRole}
                            {joinDate && ` · Joined ${joinDate}`}
                        </span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div style={styles.statsGrid}>
                    <div
                        style={styles.statCard}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-4px)";
                            e.currentTarget.style.boxShadow = isDarkTheme
                                ? "0 12px 24px -8px rgba(14,165,233,0.2)"
                                : "0 12px 28px -8px rgba(56,189,248,0.25)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    >
                        <div style={styles.statHeader}>
                            <div style={styles.statIconWrap}>
                                <ClockIcon style={styles.statIcon} />
                            </div>
                            <div style={styles.statLabel}>Total Focus Time</div>
                        </div>
                        <div style={styles.statValue}>{stats.totalFocusTime}</div>
                    </div>
                    <div
                        style={styles.statCard}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-4px)";
                            e.currentTarget.style.boxShadow = isDarkTheme
                                ? "0 12px 24px -8px rgba(14,165,233,0.2)"
                                : "0 12px 28px -8px rgba(56,189,248,0.25)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    >
                        <div style={styles.statHeader}>
                            <div style={styles.statIconWrap}>
                                <ChartBarIcon style={styles.statIcon} />
                            </div>
                            <div style={styles.statLabel}>Focus Sessions</div>
                        </div>
                        <div style={styles.statValue}>{stats.focusSessions}</div>
                    </div>
                    <div
                        style={styles.statCard}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-4px)";
                            e.currentTarget.style.boxShadow = isDarkTheme
                                ? "0 12px 24px -8px rgba(14,165,233,0.2)"
                                : "0 12px 28px -8px rgba(56,189,248,0.25)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    >
                        <div style={styles.statHeader}>
                            <div style={styles.statIconWrap}>
                                <TrophyIcon style={styles.statIcon} />
                            </div>
                            <div style={styles.statLabel}>Tasks Completed</div>
                        </div>
                        <div style={styles.statValue}>{stats.tasksCompleted}</div>
                    </div>
                    <div
                        style={styles.statCard}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-4px)";
                            e.currentTarget.style.boxShadow = isDarkTheme
                                ? "0 12px 24px -8px rgba(14,165,233,0.2)"
                                : "0 12px 28px -8px rgba(56,189,248,0.25)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    >
                        <div style={styles.statHeader}>
                            <div style={styles.statIconWrap}>
                                <FireIcon style={styles.statIcon} />
                            </div>
                            <div style={styles.statLabel}>Current Streak</div>
                        </div>
                        <div style={styles.statValue}>{stats.currentStreak} days</div>
                    </div>
                </div>
            </div>

            {/* Quick Settings */}
            <div style={styles.settingsGrid}>
                {[
                    {
                        icon: BellIcon,
                        title: "Notifications",
                        description:
                            "Manage your notification preferences and email settings",
                        action: "Configure",
                        onClick: () => navigate("/settings"),
                    },
                    {
                        icon: ShieldCheckIcon,
                        title: "Privacy",
                        description:
                            "Control your privacy settings and data sharing preferences",
                        action: "Manage",
                        onClick: () => navigate("/settings"),
                    },
                    {
                        icon: Cog6ToothIcon,
                        title: "Preferences",
                        description:
                            "Customize your FocusFlow experience and display settings",
                        action: "Customize",
                        onClick: () => navigate("/settings"),
                    },
                    {
                        icon: KeyIcon,
                        title: "Security",
                        description: "Update your password and manage account security",
                        action: "Secure",
                        onClick: () => setActiveTab("security"),
                    },
                ].map((setting, index) => {
                    const Icon = setting.icon;
                    return (
                        <div
                            key={index}
                            style={styles.settingCard}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-4px)";
                                e.currentTarget.style.boxShadow = isDarkTheme
                                    ? "0 16px 32px -12px rgba(14,165,233,0.2)"
                                    : "0 16px 32px -12px rgba(56,189,248,0.2)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = isDarkTheme
                                    ? "var(--shadow-md)"
                                    : "0 10px 25px -5px rgba(59,130,246,0.1)";
                            }}
                        >
                            <div style={styles.settingHeader}>
                                <div style={styles.settingIconWrap}>
                                    <Icon style={styles.settingIcon} />
                                </div>
                                <h3 style={styles.settingTitle}>{setting.title}</h3>
                            </div>
                            <p style={styles.settingDescription}>
                                {setting.description}
                            </p>
                            <button
                                style={styles.settingButton}
                                onClick={setting.onClick}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(-2px)";
                                    e.currentTarget.style.boxShadow = isDarkTheme
                                        ? "0 6px 16px -6px rgba(14,165,233,0.4)"
                                        : "0 6px 16px -6px rgba(56,189,248,0.35)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(0)";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >
                                {setting.action}
                            </button>
                        </div>
                    );
                })}
            </div>
        </>
    );

    const renderSettings = () => (
        <div style={styles.sectionCard}>
            <h2 style={styles.sectionTitle}>Account Settings</h2>
            <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>First Name</label>
                    <input
                        type="text"
                        style={styles.input}
                        value={formData.firstName}
                        onChange={(e) => handleFormChange("firstName", e.target.value)}
                        placeholder="Enter your first name"
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Last Name</label>
                    <input
                        type="text"
                        style={styles.input}
                        value={formData.lastName}
                        onChange={(e) => handleFormChange("lastName", e.target.value)}
                        placeholder="Enter your last name"
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Email Address</label>
                    <input
                        type="email"
                        style={styles.input}
                        value={formData.email}
                        onChange={(e) => handleFormChange("email", e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Username</label>
                    <input
                        type="text"
                        style={styles.input}
                        value={formData.username}
                        onChange={(e) => handleFormChange("username", e.target.value)}
                        placeholder="Enter your username"
                    />
                </div>
            </div>
            <div style={styles.buttonGroup}>
                <button
                    style={styles.primaryButton}
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    onMouseEnter={(e) => {
                        if (!isLoading) {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow =
                                "0 12px 32px -8px rgba(56,189,248,0.6)";
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                            "0 8px 24px -8px rgba(56,189,248,0.5)";
                    }}
                >
                    {isLoading ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    );

    const renderSecurity = () => (
        <div style={styles.sectionCard}>
            <h2 style={styles.sectionTitle}>Security Settings</h2>
            <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Current Password</label>
                    <input
                        type="password"
                        style={styles.input}
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                            handlePasswordChange("currentPassword", e.target.value)
                        }
                        placeholder="Enter current password"
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>New Password</label>
                    <input
                        type="password"
                        style={styles.input}
                        value={passwordData.newPassword}
                        onChange={(e) =>
                            handlePasswordChange("newPassword", e.target.value)
                        }
                        placeholder="Enter new password (min 6 characters)"
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Confirm New Password</label>
                    <input
                        type="password"
                        style={styles.input}
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                            handlePasswordChange("confirmPassword", e.target.value)
                        }
                        placeholder="Confirm new password"
                    />
                </div>
            </div>
            <div style={styles.buttonGroup}>
                <button
                    style={styles.primaryButton}
                    onClick={handleUpdatePassword}
                    disabled={isLoading}
                    onMouseEnter={(e) => {
                        if (!isLoading) {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow =
                                "0 12px 32px -8px rgba(56,189,248,0.6)";
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                            "0 8px 24px -8px rgba(56,189,248,0.5)";
                    }}
                >
                    {isLoading ? "Updating..." : "Update Password"}
                </button>
            </div>
        </div>
    );

    return (
        <div style={styles.page}>
            {/* Notification Toast */}
            {notification && (
                <div
                    style={{
                        position: "fixed",
                        top: "5rem",
                        right: "2rem",
                        zIndex: 9999,
                        background:
                            notification.type === "success"
                                ? isDarkTheme
                                    ? "rgba(34, 197, 94, 0.15)"
                                    : "rgba(34, 197, 94, 0.9)"
                                : isDarkTheme
                                    ? "rgba(239, 68, 68, 0.15)"
                                    : "rgba(239, 68, 68, 0.9)",
                        color:
                            notification.type === "success"
                                ? isDarkTheme
                                    ? "#4ade80"
                                    : "#fff"
                                : isDarkTheme
                                    ? "#f87171"
                                    : "#fff",
                        padding: "1rem 1.5rem",
                        borderRadius: "0.85rem",
                        border:
                            notification.type === "success"
                                ? isDarkTheme
                                    ? "1px solid rgba(34, 197, 94, 0.3)"
                                    : "1px solid rgba(255, 255, 255, 0.3)"
                                : isDarkTheme
                                    ? "1px solid rgba(239, 68, 68, 0.3)"
                                    : "1px solid rgba(255, 255, 255, 0.3)",
                        boxShadow: isDarkTheme
                            ? "0 8px 24px -8px rgba(0,0,0,0.3)"
                            : "0 12px 32px -8px rgba(0,0,0,0.25)",
                        animation: "slideInRight 0.3s ease",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        maxWidth: "400px",
                    }}
                >
                    {notification.message}
                </div>
            )}

            <div style={styles.container}>
                <header style={styles.header}>
                    <h1 style={styles.title}>Profile</h1>
                    <p style={styles.description}>
                        Manage your account settings and preferences
                    </p>
                </header>

                {/* Tabs */}
                <div style={styles.tabBar}>
                    {[
                        { key: "overview", label: "Overview" },
                        { key: "settings", label: "Settings" },
                        { key: "security", label: "Security" },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            style={
                                activeTab === tab.key
                                    ? { ...styles.tab, ...styles.tabActive }
                                    : styles.tab
                            }
                            onClick={() => setActiveTab(tab.key)}
                            onMouseEnter={(e) => {
                                if (activeTab !== tab.key) {
                                    e.currentTarget.style.background =
                                        "rgba(148,163,184,0.08)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (activeTab !== tab.key) {
                                    e.currentTarget.style.background =
                                        "transparent";
                                }
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {activeTab === "overview" && renderOverview()}
                {activeTab === "settings" && renderSettings()}
                {activeTab === "security" && renderSecurity()}
            </div>
        </div>
    );
};

export default Profile;
