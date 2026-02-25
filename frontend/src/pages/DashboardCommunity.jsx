import React, { useState, useEffect } from "react";
import {
    UserGroupIcon,
    PlusIcon,
    MagnifyingGlassIcon,
    TrophyIcon,
    FireIcon,
    StarIcon,
    UserPlusIcon,
    AdjustmentsHorizontalIcon,
    SparklesIcon,
    ShareIcon,
    EyeIcon,
    ClipboardDocumentIcon,
    XMarkIcon,
    TrashIcon,
    ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import CommunityCard from "../components/CommunityCard";
import CommunityModal from "../components/CommunityModal";
import CommunityDetail from "../components/CommunityDetail";
import MemberManagementModal from "../components/MemberManagementModal";
import { communityAPI } from "../utils/communityAPI";
import { userAPI } from "../utils/userAPI";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useConfirm } from "../components/ConfirmModal";
import useResponsive from "../hooks/useResponsive";
import { useTheme } from "../context/ThemeContext";
import { API_BASE_URL as API_BASE } from "../config/api";
import { useNavigate } from "react-router-dom";

const DashboardCommunity = () => {
    const { isMobile, isTablet, isSmallMobile, width } = useResponsive();
    const { isDarkMode } = useTheme();
    const { user: authUser } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();
    const confirm = useConfirm();
    const [communities, setCommunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCommunity, setSelectedCommunity] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [myCommunities, setMyCommunities] = useState([]);

    const [activities, setActivities] = useState([]);
    const [loadingActivities, setLoadingActivities] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingCommunity, setEditingCommunity] = useState(null);

    // Quick Action Modal States
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [showFocusingModal, setShowFocusingModal] = useState(false);
    const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
    const [showChallengeModal, setShowChallengeModal] = useState(false);

    const [focusingUsers, setFocusingUsers] = useState([]);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loadingFocusing, setLoadingFocusing] = useState(false);
    const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);

    // Member Management States
    const [showMemberModal, setShowMemberModal] = useState(false);
    const [memberModalCommunity, setMemberModalCommunity] = useState(null);
    const [visibleBrowseCount, setVisibleBrowseCount] = useState(6);
    const [visibleMyCount, setVisibleMyCount] = useState(6);


    const [communityStats, setCommunityStats] = useState({
        joinedCommunitiesCount: 0,
        totalSessions: 0,
        sessionsToday: 0,
        achievementsCount: 0,
        activeChallengesCount: 0
    });
    const [loadingStats, setLoadingStats] = useState(true);
    const [leaderboardPeriod, setLeaderboardPeriod] = useState("week");
    const [challengeData, setChallengeData] = useState(null);
    const [loadingChallenge, setLoadingChallenge] = useState(false);

    // Helper to convert hex to rgb for rgba usage
    const hexToRgb = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r}, ${g}, ${b}`;
    };



    // Use authUser from context as the source of truth
    useEffect(() => {
        if (authUser) {
            setCurrentUser(authUser);
        }
    }, [authUser]);

    useEffect(() => {
        loadCommunities();
        loadActivities();
        loadCommunityStats();
    }, []);

    const loadCommunityStats = async () => {
        try {
            setLoadingStats(true);
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_BASE}/stats/community`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const json = await res.json();
            if (json.success) {
                setCommunityStats(json.data);
            }
        } catch (err) {
            console.error("Failed to load community stats:", err);
        } finally {
            setLoadingStats(false);
        }
    };

    const loadFocusingUsers = async () => {
        try {
            setLoadingFocusing(true);
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_BASE}/stats/focusing`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const json = await res.json();
            if (json.success) setFocusingUsers(json.data);
        } catch (err) {
            console.error("Failed to load focusing users:", err);
        } finally {
            setLoadingFocusing(false);
        }
    };

    const loadChallengeData = async () => {
        try {
            setLoadingChallenge(true);
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_BASE}/stats/challenge`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const json = await res.json();
            if (json.success) setChallengeData(json.data);
        } catch (err) {
            console.error("Failed to load challenge data:", err);
        } finally {
            setLoadingChallenge(false);
        }
    };

    const loadLeaderboard = async (period = leaderboardPeriod) => {
        try {
            setLoadingLeaderboard(true);
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_BASE}/stats/leaderboard?period=${period}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const json = await res.json();
            if (json.success) setLeaderboardData(json.data);
        } catch (err) {
            console.error("Failed to load leaderboard:", err);
        } finally {
            setLoadingLeaderboard(false);
        }
    };

    useEffect(() => {
        if (showFocusingModal) loadFocusingUsers();
    }, [showFocusingModal]);

    useEffect(() => {
        if (showLeaderboardModal) loadLeaderboard(leaderboardPeriod);
    }, [showLeaderboardModal, leaderboardPeriod]);

    useEffect(() => {
        if (showChallengeModal) loadChallengeData();
    }, [showChallengeModal]);

    const handleChallengeAction = async () => {
        if (!challengeData) return;

        if (challengeData.hasStarted) {
            setShowChallengeModal(false);
            toast.success("Resuming your focus session! 🔥");
            navigate("/focus-timer");
        } else {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${API_BASE}/stats/challenge/start`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ challengeId: challengeData.challengeId })
                });
                const json = await res.json();
                if (json.success) {
                    toast.success("Challenge started! Good luck! 🎯");
                    loadChallengeData(); // Refresh state
                    navigate("/focus-timer");
                }
            } catch (err) {
                console.error("Failed to start challenge:", err);
                toast.error("Failed to start challenge. Please try again.");
            }
        }
    };

    const handleLeaveChallenge = async () => {
        if (!challengeData) return;
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_BASE}/stats/challenge/leave`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ challengeId: challengeData.challengeId })
            });
            const json = await res.json();
            if (json.success) {
                toast.success("Successfully left the challenge.");
                loadChallengeData(); // Refresh state
            }
        } catch (err) {
            console.error("Failed to leave challenge:", err);
            toast.error("Failed to opt out. Please try again.");
        }
    };

    // Re-filter communities when authUser changes
    useEffect(() => {
        if (authUser && communities.length > 0) {
            filterMyCommunities(communities, authUser);
        }
    }, [authUser, communities]);

    const filterMyCommunities = (communityList, userData) => {
        if (!userData) return;

        const userId = userData._id || userData.id;

        const filtered = communityList.filter((c) => {
            // Use the server-supplied isMember flag first (most accurate)
            if (c.isMember || c.memberRole === "Owner") return true;

            const creatorId = c.creator?._id || c.creator?.id || c.creator;
            const isCreator = creatorId === userId;

            const isMember = c.members && c.members.some(m => {
                const mId = typeof m === 'string' ? m : (m._id || m.id);
                return mId === userId;
            });

            // Pending-request users are NOT members yet — exclude from My Communities
            return isCreator || isMember;
        });

        // Sort by joinedAt descending (most recent first)
        const sorted = filtered.sort((a, b) => {
            const dateA = a.joinedAt ? new Date(a.joinedAt) : new Date(0);
            const dateB = b.joinedAt ? new Date(b.joinedAt) : new Date(0);
            return dateB - dateA;
        });

        setMyCommunities(sorted);
    };

    const loadActivities = async () => {
        setLoadingActivities(true);
        try {
            const data = await userAPI.getRecentActivity();
            setActivities(data.data || []);
        } catch (err) {
            console.error("Failed to load activities:", err);
        } finally {
            setLoadingActivities(false);
        }
    };

    const loadCommunities = async () => {
        setLoading(true);
        try {
            const data = await communityAPI.getCommunities(1, 500);
            setCommunities(data.data || []);
        } catch (err) {
            toast.error(err.message || "Failed to load communities");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };



    const handleCreateCommunity = async (formData) => {
        try {
            await communityAPI.createCommunity(formData);
            toast.success("Community created successfully!");
            await loadCommunities();
        } catch (err) {
            throw err;
        }
    };

    const handleJoinCommunity = async (communityId) => {
        try {
            await communityAPI.joinCommunity(communityId);
            toast.success("Joined community successfully!");
            await loadCommunities();
        } catch (err) {
            toast.error(err.message || "Failed to join community");
        }
    };



    const handleLeaveCommunity = async (communityId) => {
        const confirmed = await confirm({
            title: "Leave Community?",
            message: "Are you sure you want to leave this community? You'll need to request to join again if you change your mind.",
            confirmText: "Leave",
            cancelText: "Cancel",
            variant: "danger",
        });

        if (!confirmed) return;

        try {
            await communityAPI.leaveCommunity(communityId);
            toast.success("Left community successfully!");
            await loadCommunities();
        } catch (err) {
            toast.error(err.message || "Failed to leave community");
        }
    };

    const handleEditCommunity = (community) => {
        // Prepare initial data for edit modal
        const editData = {
            name: community.name,
            description: community.description,
            goal: community.goal,
            commitment: community.commitment,
            tags: community.tags?.join(", ") || "",
            visibility: community.visibility,
            rules: community.rules || "",
        };
        setEditingCommunity(community);
        setShowEditModal(true);
    };

    const handleUpdateCommunity = async (formData) => {
        if (!editingCommunity) return;

        try {
            await communityAPI.updateCommunity(editingCommunity._id, formData);
            toast.success("Community updated successfully!");
            setShowEditModal(false);
            setEditingCommunity(null);
            await loadCommunities();
        } catch (err) {
            throw err;
        }
    };

    const handleOpenMemberModal = (community) => {
        setMemberModalCommunity(community);
        setShowMemberModal(true);
    };

    const handleDeleteCommunity = async (community) => {
        const confirmed = await confirm({
            title: "Delete Community?",
            message: `Are you sure you want to delete "${community.name}"? This action is permanent and will remove all members, posts, and chat history.`,
            confirmText: "Delete Permanent",
            cancelText: "Cancel",
            variant: "danger",
        });

        if (!confirmed) return;

        try {
            await communityAPI.deleteCommunity(community._id);
            toast.success("Community deleted successfully");
            await loadCommunities();
        } catch (err) {
            toast.error(err.message || "Failed to delete community");
        }
    };

    const handleViewCommunity = (community) => {
        setSelectedCommunity(community);
        setShowDetailModal(true);
    };



    const filteredCommunities = communities.filter(
        (community) => {
            const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                community.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            // Exclude communities the user is already part of from Browse section
            const isMemberOrCreator = community.isMember || community.memberRole === "Owner";

            return matchesSearch && !isMemberOrCreator;
        }
    ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Styles
    const getStyles = (isMobile, isTablet, isSmallMobile, width, isDarkMode) => {
        let gridCols = 3;
        if (width < 922) gridCols = 1;
        else if (width < 1280) gridCols = 2;

        return {
            container: {
                minHeight: "100vh",
                padding: isSmallMobile ? "1rem 0.75rem 5rem" : isMobile ? "1.5rem 1rem 5rem" : "3.5rem 2rem 5rem",
                background: "var(--color-white)",
                color: "var(--color-gray-900)",
            },
            inner: {
                maxWidth: "1120px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? "1.5rem" : "2.75rem",
            },
            header: {
                background: "var(--panel-bg)",
                borderRadius: isMobile ? "1.2rem" : "1.5rem",
                border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
                padding: isSmallMobile ? "1.25rem" : isMobile ? "1.5rem" : "2.75rem",
                color: "var(--color-gray-900)",
                boxShadow: "var(--shadow-lg)",
            },
            title: {
                fontSize: isSmallMobile ? "1.6rem" : isMobile ? "1.8rem" : "2.3rem",
                fontWeight: 700,
                lineHeight: 1.2,
                background: "linear-gradient(to right, #38bdf8, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                margin: 0,
                marginBottom: "0.75rem",
            },
            subtitle: {
                fontSize: isMobile ? "0.95rem" : "1.05rem",
                color: "var(--color-gray-600)",
                lineHeight: 1.68,
                margin: 0,
                marginBottom: "1.5rem",
            },
            controls: {
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                flexDirection: width < 640 ? "column" : "row",
                width: "100%",
            },
            searchBox: {
                flex: 1,
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.8rem 1.2rem",
                borderRadius: "0.75rem",
                background: "var(--input-bg)",
                border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
            },
            createButton: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: width < 640 ? "fit-content" : "auto",
                margin: width < 640 ? "0 auto" : "0",
                gap: "0.6rem",
                padding: "0.8rem 1.4rem",
                borderRadius: "0.75rem",
                background: "linear-gradient(to right, #38bdf8, #60a5fa)",
                color: "#0f172a",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
                transition: "all 0.2s ease",
                boxShadow: "0 8px 16px -4px rgba(56, 189, 248, 0.4)",
            },
            grid: {
                display: "grid",
                gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                gridAutoRows: isMobile ? "auto" : "1fr",
                gap: isMobile ? "1rem" : "1.5rem",
                alignItems: "stretch",
            },
            statsGrid: {
                display: "grid",
                gridTemplateColumns: isSmallMobile ? "1fr" : width < 1030 ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
                gap: isMobile ? "0.75rem" : "1.5rem",
            },
            statCard: {
                background: "var(--panel-bg)",
                borderRadius: "1.05rem",
                padding: isMobile ? "1.2rem" : "1.6rem",
                border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
                boxShadow: "var(--shadow-md)",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
            },
            quickGrid: {
                display: "grid",
                gridTemplateColumns: width < 1160 ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
                gap: isMobile ? "0.6rem" : "1rem",
            },
            quickActionButton: {
                background: "linear-gradient(to right, #38bdf8, #60a5fa)",
                color: "#0f172a",
                padding: isMobile ? "0.7rem 1rem" : "0.9rem 1.2rem",
                borderRadius: "9999px",
                fontSize: isMobile ? "0.85rem" : "1rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                border: "none",
                boxShadow: "0 16px 30px -20px rgba(56, 189, 248, 0.6)",
                cursor: "pointer",
                width: "100%",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
            },
            sectionHeading: {
                fontSize: isMobile ? "1.35rem" : "1.5rem",
                fontWeight: 700,
                color: isDarkMode ? "var(--color-gray-900)" : "#0f172a",
                marginBottom: "0.5rem",
            },
            modalWrapper: {
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
                padding: isMobile ? "0.75rem" : "1.5rem",
            },
            modalContent: {
                background: "var(--panel-bg)",
                borderRadius: "1.5rem",
                padding: isMobile ? "1.5rem" : "2rem",
                maxWidth: "520px",
                width: "100%",
                border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
                maxHeight: "90vh",
                overflowY: "auto",
            },
            activityCard: {
                background: "var(--panel-bg)",
                borderRadius: "1.05rem",
                padding: isMobile ? "1.25rem" : "1.75rem",
                border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
                boxShadow: "var(--shadow-md)",
            },
            activityUserCard: {
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem",
                background: "rgba(255, 255, 255, 0.03)",
                borderRadius: "0.75rem",
                marginBottom: "0.75rem",
                border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
            },
            activityAvatar: {
                width: "2.75rem",
                height: "2.75rem",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #38bdf8, #818cf8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1rem",
                flexShrink: 0,
            }
        };
    };

    const styles = getStyles(isMobile, isTablet, isSmallMobile, width, isDarkMode);





    // const [activeTab, setActiveTab] = useState("overview");

    return (
        <div style={styles.container}>
            <div style={styles.inner}>
                {/* Main Header */}
                <div style={styles.header}>
                    <h1 style={styles.title}>Community Hub</h1>
                    <p style={styles.subtitle}>
                        Connect with fellow productivity enthusiasts, align with
                        the right cohorts, and track your shared milestones.
                    </p>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: width < 600 ? "1fr" : "repeat(2, minmax(0, 1fr))",
                        gap: "1.15rem 1.5rem",
                        marginTop: "1.35rem",
                    }}>
                        {[
                            { icon: UserGroupIcon, title: "Study Circles", text: "Discover accountability pods and interest-aligned groups." },
                            { icon: SparklesIcon, title: "Momentum Highlights", text: "See weekly wins, upcoming events, and trending discussions." },
                            { icon: AdjustmentsHorizontalIcon, title: "Mentor Access", text: "Drop into office hours and learn from specialists." },
                            { icon: FireIcon, title: "Challenge Cadence", text: "Join focus jams and streak challenges to stay sharp." }
                        ].map((item, idx) => (
                            <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "0.75rem", paddingRight: "1rem" }}>
                                <span style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    fontSize: "0.85rem",
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.08em",
                                    color: "var(--color-primary-600)",
                                    background: "linear-gradient(135deg, rgba(56, 189, 248, 0.18), rgba(14, 165, 233, 0.06))",
                                    padding: "0.35rem 0.85rem",
                                    borderRadius: "999px",
                                    width: "fit-content",
                                }}>
                                    <item.icon style={{ width: "1rem", height: "1rem" }} />
                                    {item.title}
                                </span>
                                <span style={{ fontSize: "0.96rem", color: "var(--color-gray-600)", lineHeight: 1.65 }}>
                                    {item.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <div style={{
                            width: "2.5rem",
                            height: "2.5rem",
                            borderRadius: "50%",
                            background: "rgba(56, 189, 248, 0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#38bdf8",
                            flexShrink: 0,
                        }}>
                            <UserGroupIcon style={{ width: "1.5rem", height: "1.5rem", flexShrink: 0 }} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: "1.4rem", fontWeight: 700, margin: 0, color: "var(--color-gray-900)" }}>
                                {communityStats.joinedCommunitiesCount}
                            </h3>
                            <p style={{ fontSize: "0.8rem", color: "var(--color-gray-500)", margin: 0, fontWeight: 600 }}>JOINED</p>
                        </div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={{
                            width: "2.5rem",
                            height: "2.5rem",
                            borderRadius: "50%",
                            background: "rgba(245, 158, 11, 0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#f59e0b",
                            flexShrink: 0,
                        }}>
                            <TrophyIcon style={{ width: "1.5rem", height: "1.5rem", flexShrink: 0 }} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: "1.4rem", fontWeight: 700, margin: 0, color: "var(--color-gray-900)" }}>
                                {communityStats.achievementsCount}
                            </h3>
                            <p style={{ fontSize: "0.8rem", color: "var(--color-gray-500)", margin: 0, fontWeight: 600 }}>AWARDS</p>
                        </div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={{
                            width: "2.5rem",
                            height: "2.5rem",
                            borderRadius: "50%",
                            background: "rgba(34, 197, 94, 0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#22c55e",
                            flexShrink: 0,
                        }}>
                            <FireIcon style={{ width: "1.5rem", height: "1.5rem", flexShrink: 0 }} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: "1.4rem", fontWeight: 700, margin: 0, color: "var(--color-gray-900)" }}>
                                {communityStats.sessionsToday}
                            </h3>
                            <p style={{ fontSize: "0.8rem", color: "var(--color-gray-500)", margin: 0, fontWeight: 600 }}>SESSIONS</p>
                        </div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={{
                            width: "2.5rem",
                            height: "2.5rem",
                            borderRadius: "50%",
                            background: "rgba(129, 140, 248, 0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#818cf8",
                            flexShrink: 0,
                        }}>
                            <StarIcon style={{ width: "1.5rem", height: "1.5rem", flexShrink: 0 }} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: "1.4rem", fontWeight: 700, margin: 0, color: "var(--color-gray-900)" }}>
                                {communityStats.activeChallengesCount}
                            </h3>
                            <p style={{ fontSize: "0.8rem", color: "var(--color-gray-500)", margin: 0, fontWeight: 600 }}>ACTIVE</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
                    <div style={styles.quickGrid}>
                        {[
                            { icon: UserPlusIcon, label: "Invite Friends", action: () => setShowInviteModal(true), color: "#38bdf8", shadow: "rgba(56, 189, 248, 0.4)" },
                            { icon: EyeIcon, label: "Who's Focusing", action: () => setShowFocusingModal(true), color: "#22c55e", shadow: "rgba(34, 197, 94, 0.4)" },
                            { icon: TrophyIcon, label: "Leaderboard", action: () => setShowLeaderboardModal(true), color: "#f59e0b", shadow: "rgba(245, 158, 11, 0.4)" },
                            { icon: FireIcon, label: "Weekly Challenge", action: () => setShowChallengeModal(true), color: "#ef4444", shadow: "rgba(239, 68, 68, 0.4)" }
                        ].map((item, idx) => (
                            <button
                                key={idx}
                                type="button"
                                style={{
                                    ...styles.quickActionButton,
                                    background: isDarkMode ? `rgba(${hexToRgb(item.color)}, 0.12)` : "var(--panel-bg)",
                                    border: `1px solid ${isDarkMode ? `rgba(${hexToRgb(item.color)}, 0.2)` : "#e2e8f0"}`,
                                    color: item.color,
                                    boxShadow: isDarkMode ? "none" : "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                                }}
                                onClick={item.action}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-4px)";
                                    e.currentTarget.style.background = isDarkMode ? `rgba(${hexToRgb(item.color)}, 0.2)` : item.color;
                                    e.currentTarget.style.color = isDarkMode ? item.color : "#fff";
                                    e.currentTarget.style.boxShadow = `0 10px 20px -10px ${item.shadow}`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.background = isDarkMode ? `rgba(${hexToRgb(item.color)}, 0.12)` : "var(--panel-bg)";
                                    e.currentTarget.style.color = item.color;
                                    e.currentTarget.style.boxShadow = isDarkMode ? "none" : "0 4px 6px -1px rgba(0, 0, 0, 0.05)";
                                }}
                            >
                                <item.icon style={{ width: "1.2rem", height: "1.2rem", flexShrink: 0 }} />
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Browse Communities Section */}
                <div style={{
                    background: "var(--panel-bg)",
                    borderRadius: "1.05rem",
                    padding: isMobile ? "1.25rem" : "1.75rem",
                    border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
                    boxShadow: "var(--shadow-md)",
                    marginBottom: "1.5rem",
                }}>
                    <div style={{ marginBottom: "1.5rem" }}>
                        <h2 style={styles.sectionHeading}> Browse Communities </h2>
                        <p style={{ color: "var(--color-gray-600)", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                            Explore active communities and join ones that match your focus goals.
                        </p>

                        {/* Search & Create Controls */}
                        <div style={styles.controls}>
                            <div style={styles.searchBox}>
                                <MagnifyingGlassIcon style={{ width: "1.25rem", height: "1.25rem", color: "var(--color-gray-600)", flexShrink: 0 }} />
                                <input
                                    style={{
                                        flex: 1,
                                        border: "none",
                                        background: "transparent",
                                        color: "var(--color-gray-900)",
                                        fontSize: "0.95rem",
                                        outline: "none",
                                        fontFamily: "inherit",
                                    }}
                                    type="text"
                                    placeholder="Search communities by name or tags..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button
                                style={styles.createButton}
                                onClick={() => setShowCreateModal(true)}
                                type="button"
                            >
                                <PlusIcon style={{ width: "1.25rem", height: "1.25rem", flexShrink: 0 }} />
                                Create
                            </button>
                        </div>
                    </div>

                    {/* Communities Grid */}
                    {loading ? (
                        <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--color-gray-600)" }}>
                            <p>Loading communities...</p>
                        </div>
                    ) : filteredCommunities.length === 0 ? (
                        <div style={{
                            textAlign: "center",
                            padding: "3rem 1rem",
                            background: "var(--panel-bg)",
                            borderRadius: "1rem",
                            border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
                        }}>
                            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem", color: "var(--color-gray-900)" }}>
                                {searchQuery ? "No communities found" : "No new communities yet"}
                            </h3>
                            <p
                                style={{
                                    color: "#94a3b8",
                                    marginBottom: "1rem",
                                }}
                            >
                                {searchQuery
                                    ? `No results for "${searchQuery}". Try a different search.`
                                    : "You've joined all available communities!"}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div style={styles.grid}>
                                {filteredCommunities.slice(0, visibleBrowseCount).map((community) => {
                                    const userId = currentUser?._id || currentUser?.id;
                                    const creatorId = community.creator?._id || community.creator?.id || community.creator;
                                    const isCreator = creatorId === userId;
                                    const isMember = community.isMember || (community.members && community.members.some(m => {
                                        const mId = typeof m === 'string' ? m : (m._id || m.id);
                                        return mId === userId;
                                    }));

                                    return (
                                        <div
                                            key={community._id}
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                height: "100%",
                                            }}
                                        >
                                            <CommunityCard
                                                community={community}
                                                onViewClick={handleViewCommunity}
                                                onJoinClick={handleJoinCommunity}
                                                onLeaveClick={handleLeaveCommunity}
                                                onEditClick={handleEditCommunity}
                                                isMember={isMember}
                                                isCreator={isCreator}
                                                creatorControlsHeight={0}
                                            />
                                        </div>
                                    );
                                })}
                            </div>

                            {filteredCommunities.length > visibleBrowseCount && (
                                <div style={{ display: "flex", justifyContent: "center", marginTop: "2.5rem" }}>
                                    <button
                                        onClick={() => setVisibleBrowseCount(prev => prev + 6)}
                                        style={{
                                            padding: "0.85rem 2.5rem",
                                            borderRadius: "999px",
                                            background: "rgba(56, 189, 248, 0.1)",
                                            color: "#38bdf8",
                                            border: "1px solid rgba(56, 189, 248, 0.3)",
                                            fontSize: "0.95rem",
                                            fontWeight: 700,
                                            cursor: "pointer",
                                            transition: "all 0.2s ease",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.75rem",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = "rgba(56, 189, 248, 0.15)";
                                            e.currentTarget.style.transform = "translateY(-2px)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "rgba(56, 189, 248, 0.1)";
                                            e.currentTarget.style.transform = "translateY(0)";
                                        }}
                                    >
                                        <SparklesIcon style={{ width: "1.25rem", height: "1.25rem", flexShrink: 0 }} />
                                        View More Communities
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
                {/* Recent Activity */}
                <div style={styles.activityCard}>
                    <h2
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: 600,
                            marginBottom: "1rem",
                        }}
                    >
                        Recent Community Activity
                    </h2>
                    {loadingActivities ? (
                        <p style={{ color: "var(--color-gray-600)", textAlign: "center", padding: "1rem" }}>Loading activity...</p>
                    ) : activities.length === 0 ? (
                        <p style={{ color: "var(--color-gray-600)", textAlign: "center", padding: "1rem" }}>No recent activity to show.</p>
                    ) : (
                        activities
                            .filter(activity => activity.user)
                            .map((activity) => (
                                <div key={activity.id} style={styles.activityUserCard}>
                                    <div style={styles.activityAvatar}>{activity.user.initials || "?"}</div>
                                    <div style={{ flex: 1 }}>
                                        <h4
                                            style={{
                                                fontWeight: 600,
                                                marginBottom: "0.25rem",
                                                color: "var(--color-gray-900)",
                                            }}
                                        >
                                            {activity.user.username || "Unknown User"}
                                        </h4>
                                        <p
                                            style={{
                                                color: "var(--color-gray-600)",
                                                fontSize: "0.875rem",
                                            }}
                                        >
                                            {activity.content}
                                        </p>
                                    </div>
                                    <span
                                        style={{
                                            color: "var(--color-gray-600)",
                                            fontSize: "0.875rem",
                                        }}
                                    >
                                        {(() => {
                                            const diff = new Date() - new Date(activity.timestamp);
                                            const mins = Math.floor(diff / 60000);
                                            const hours = Math.floor(mins / 60);
                                            const days = Math.floor(hours / 24);

                                            if (days > 0) return `${days}d ago`;
                                            if (hours > 0) return `${hours}h ago`;
                                            if (mins > 0) return `${mins}m ago`;
                                            return "just now";
                                        })()}
                                    </span>
                                </div>
                            ))
                    )}
                </div>

                {/* My Communities Section */}
                <div style={{
                    background: "var(--panel-bg)",
                    borderRadius: "1.05rem",
                    padding: isMobile ? "1.25rem" : "1.75rem",
                    border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
                    boxShadow: "var(--shadow-md)",
                    marginBottom: "1.5rem",
                }}>
                    <h2 style={{ ...styles.sectionHeading, marginBottom: "1rem" }}>My Communities</h2>
                    <p style={{ color: "var(--color-gray-600)", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                        Quickly access the communities you're a part of or those you've created.
                    </p>

                    {loading ? (
                        <div style={{ textAlign: "center", padding: "2rem", color: "var(--color-gray-600)" }}>
                            <p>Loading your communities...</p>
                        </div>
                    ) : myCommunities.length === 0 ? (
                        <div style={{
                            textAlign: "center",
                            padding: "2.5rem 1rem",
                            background: "rgba(255, 255, 255, 0.02)",
                            borderRadius: "1rem",
                            border: "1px dashed color-mix(in srgb, var(--panel-bg) 85%, black 15%)",
                        }}>
                            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--color-gray-900)", marginBottom: "0.5rem" }}>
                                No communities yet
                            </h3>
                            <p style={{ color: "var(--color-gray-500)", fontSize: "0.9rem" }}>
                                Join a community above or create your own to get started!
                            </p>
                        </div>
                    ) : (
                        <>
                            <div style={styles.grid}>
                                {myCommunities.slice(0, visibleMyCount).map((community) => {
                                    const userId = currentUser?._id || currentUser?.id;
                                    const creatorId = community.creator?._id || community.creator?.id || community.creator;
                                    const isCreator = creatorId === userId;
                                    const isMember = community.members && community.members.some(m => {
                                        const mId = typeof m === 'string' ? m : (m._id || m.id);
                                        return mId === userId;
                                    });

                                    // Map server-supplied memberRole to display label + style
                                    const myRole = community.memberRole; // "Owner" | "Admin" | "Moderator" | "Member" | null
                                    const roleBadgeConfig = isCreator || myRole === "Owner" ? {
                                        icon: "👑", label: "Creator",
                                        bg: "rgba(245,158,11,0.12)", color: "#f59e0b", border: "rgba(245,158,11,0.2)"
                                    } : myRole === "Admin" ? {
                                        icon: "🎯", label: "Administrator",
                                        bg: "rgba(139,92,246,0.12)", color: "#8b5cf6", border: "rgba(139,92,246,0.2)"
                                    } : myRole === "Moderator" ? {
                                        icon: "🛡️", label: "Moderator",
                                        bg: "rgba(56,189,248,0.12)", color: "#38bdf8", border: "rgba(56,189,248,0.2)"
                                    } : isMember ? {
                                        icon: "👥", label: "Member",
                                        bg: "rgba(16,185,129,0.12)", color: "#10b981", border: "rgba(16,185,129,0.2)"
                                    } : null;

                                    const roleBadge = roleBadgeConfig ? (
                                        <span style={{
                                            fontSize: "0.72rem", fontWeight: 700,
                                            padding: "0.25rem 0.75rem", borderRadius: "2rem",
                                            background: roleBadgeConfig.bg, color: roleBadgeConfig.color,
                                            border: `1px solid ${roleBadgeConfig.border}`,
                                            display: "flex", alignItems: "center",
                                            gap: "0.4rem", letterSpacing: "0.01em",
                                        }}>
                                            {roleBadgeConfig.icon} {roleBadgeConfig.label}
                                        </span>
                                    ) : null;

                                    return (
                                        <div
                                            key={`my-${community._id}`}
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                height: "100%",
                                                minWidth: 0, // Prevent flex item from overflowing
                                            }}
                                        >
                                            <CommunityCard
                                                community={community}
                                                onViewClick={handleViewCommunity}
                                                onJoinClick={handleJoinCommunity}
                                                onLeaveClick={handleLeaveCommunity}
                                                onEditClick={handleEditCommunity}
                                                isMember={isMember}
                                                isCreator={isCreator}
                                                roleBadge={roleBadge}
                                            >
                                                {/* Community Roles Section */}
                                                <div style={{
                                                    background: "color-mix(in srgb, var(--panel-bg) 40%, rgba(56, 189, 248, 0.05))",
                                                    border: "1px solid rgba(56, 189, 248, 0.2)",
                                                    borderRadius: "0.85rem",
                                                    padding: isMobile ? "0.85rem" : "1rem",
                                                    minHeight: isMobile ? "auto" : "9.5rem", // Responsive height
                                                    display: "flex",
                                                    flexDirection: "column",
                                                }}>
                                                    <h4 style={{
                                                        fontSize: "0.7rem",
                                                        fontWeight: 800,
                                                        color: "var(--color-gray-400)",
                                                        textTransform: "uppercase",
                                                        letterSpacing: "0.08em",
                                                        marginBottom: "1rem",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "0.4rem",
                                                    }}>
                                                        Community Roles
                                                    </h4>

                                                    <div style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "0.65rem",
                                                        marginBottom: "auto",
                                                    }}>
                                                        {/* Always show the standard 3 roles as badges */}
                                                        <span style={{
                                                            fontSize: "0.75rem",
                                                            fontWeight: 700,
                                                            padding: "0.35rem 0.85rem",
                                                            borderRadius: "0.6rem",
                                                            background: "rgba(245, 158, 11, 0.1)",
                                                            color: "#f59e0b",
                                                            border: "1px solid rgba(245, 158, 11, 0.15)",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "0.5rem",
                                                            width: "fit-content",
                                                        }}>
                                                            👑 Creator
                                                        </span>

                                                        <span style={{
                                                            fontSize: "0.75rem",
                                                            fontWeight: 700,
                                                            padding: "0.35rem 0.85rem",
                                                            borderRadius: "0.6rem",
                                                            background: "rgba(139, 92, 246, 0.1)",
                                                            color: "#8b5cf6",
                                                            border: "1px solid rgba(139, 92, 246, 0.15)",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "0.5rem",
                                                            width: "fit-content",
                                                        }}>
                                                            🎯 Administrator
                                                        </span>

                                                        <span style={{
                                                            fontSize: "0.75rem",
                                                            fontWeight: 700,
                                                            padding: "0.35rem 0.85rem",
                                                            borderRadius: "0.6rem",
                                                            background: "rgba(16, 185, 129, 0.1)",
                                                            color: "#10b981",
                                                            border: "1px solid rgba(16, 185, 129, 0.15)",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "0.5rem",
                                                            width: "fit-content",
                                                        }}>
                                                            👥 Member
                                                        </span>
                                                    </div>

                                                    <p style={{
                                                        fontSize: "0.72rem",
                                                        color: "var(--color-gray-500)",
                                                        lineHeight: 1.6,
                                                        margin: 0,
                                                    }}>
                                                        {isCreator
                                                            ? "Manage member roles and permissions to organize your community effectively."
                                                            : myRole === "Admin"
                                                                ? "You have staff-level access to help manage and grow this community."
                                                                : isMember
                                                                    ? "Your current participation level and recognized contribution within this group."
                                                                    : ""}
                                                    </p>
                                                </div>
                                                {/* Role-specific bottom section */}
                                                <div style={{
                                                    minHeight: isMobile ? "auto" : "7rem",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    marginTop: isMobile ? "0.5rem" : "0",
                                                }}>
                                                    {isCreator ? (
                                                        /* ── Creator Controls ── */
                                                        <div style={{
                                                            background: "color-mix(in srgb, var(--panel-bg) 40%, rgba(239,68,68,0.02))",
                                                            border: "1px solid color-mix(in srgb, var(--panel-bg) 80%, black 20%)",
                                                            borderRadius: "0.85rem",
                                                            padding: isMobile ? "0.85rem" : "1rem",
                                                            flex: 1,
                                                        }}>
                                                            <h4 style={{
                                                                fontSize: "0.7rem", fontWeight: 800,
                                                                color: "var(--color-gray-400)", textTransform: "uppercase",
                                                                letterSpacing: "0.08em", marginBottom: "1rem",
                                                            }}>
                                                                Creator Controls
                                                            </h4>
                                                            <div style={{
                                                                display: "flex", gap: "0.75rem", alignItems: "stretch",
                                                                flexDirection: (width >= 800 && width <= 1100) || isSmallMobile ? "column" : "row",
                                                            }}>
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); handleOpenMemberModal(community); }}
                                                                    style={{
                                                                        display: "flex", alignItems: "center", justifyContent: "center",
                                                                        gap: "0.6rem", flex: 1, padding: "0.7rem 1.15rem",
                                                                        borderRadius: "0.6rem",
                                                                        background: "color-mix(in srgb, var(--panel-bg) 85%, var(--color-gray-100) 15%)",
                                                                        color: "var(--color-gray-900)", border: "1px solid var(--color-gray-300)",
                                                                        fontSize: "0.85rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s ease",
                                                                    }}
                                                                >
                                                                    <UserGroupIcon style={{ width: "1.15rem", height: "1.15rem", color: "#38bdf8", flexShrink: 0 }} />
                                                                    Members
                                                                </button>
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); handleDeleteCommunity(community); }}
                                                                    style={{
                                                                        display: "flex", alignItems: "center", justifyContent: "center",
                                                                        gap: "0.6rem", flex: 1, padding: "0.7rem 1.15rem",
                                                                        borderRadius: "0.6rem", background: "rgba(239,68,68,0.05)",
                                                                        color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)",
                                                                        fontSize: "0.85rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s ease",
                                                                    }}
                                                                >
                                                                    <TrashIcon style={{ width: "1.15rem", height: "1.15rem", flexShrink: 0 }} />
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : myRole === "Admin" ? (
                                                        /* ── Administrator: Staff Permissions ── */
                                                        <div style={{
                                                            background: "color-mix(in srgb, var(--panel-bg) 40%, rgba(139,92,246,0.03))",
                                                            border: "1px solid color-mix(in srgb, var(--panel-bg) 80%, black 20%)",
                                                            borderRadius: "0.85rem",
                                                            padding: isMobile ? "0.85rem" : "1rem",
                                                            flex: 1, display: "flex", flexDirection: "column",
                                                        }}>
                                                            <h4 style={{
                                                                fontSize: "0.7rem", fontWeight: 800,
                                                                color: "var(--color-gray-400)", textTransform: "uppercase",
                                                                letterSpacing: "0.08em", marginBottom: "0.75rem",
                                                            }}>
                                                                Staff Permissions
                                                            </h4>
                                                            <div style={{
                                                                display: "grid",
                                                                gridTemplateColumns: "1fr 1fr",
                                                                gap: "0.45rem",
                                                            }}>
                                                                {[
                                                                    { icon: "🛡️", label: "Manage Members" },
                                                                    { icon: "📌", label: "Pin Discussions" },
                                                                    { icon: "✅", label: "Approve Requests" },
                                                                    { icon: "🚫", label: "Mute Members" },
                                                                ].map(({ icon, label }) => (
                                                                    <div key={label} style={{
                                                                        display: "flex", alignItems: "center", gap: "0.4rem",
                                                                        padding: "0.35rem 0.6rem", borderRadius: "0.5rem",
                                                                        background: "rgba(139,92,246,0.07)",
                                                                        border: "1px solid rgba(139,92,246,0.12)",
                                                                        fontSize: "0.68rem", fontWeight: 600,
                                                                        color: "var(--color-gray-700)",
                                                                        whiteSpace: "nowrap", overflow: "hidden",
                                                                    }}>
                                                                        <span style={{ fontSize: "0.8rem", flexShrink: 0 }}>{icon}</span>
                                                                        <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ) : isMember ? (
                                                        /* ── Custom Role / Member: Participation Score ── */
                                                        <div style={{
                                                            background: "color-mix(in srgb, var(--panel-bg) 40%, rgba(16,185,129,0.03))",
                                                            border: "1px solid color-mix(in srgb, var(--panel-bg) 80%, black 20%)",
                                                            borderRadius: "0.85rem",
                                                            padding: isMobile ? "0.85rem" : "1rem",
                                                            flex: 1, display: "flex", flexDirection: "column",
                                                        }}>
                                                            <h4 style={{
                                                                fontSize: "0.7rem", fontWeight: 800,
                                                                color: "var(--color-gray-400)", textTransform: "uppercase",
                                                                letterSpacing: "0.08em", marginBottom: "0.85rem",
                                                            }}>
                                                                Your Contribution
                                                            </h4>
                                                            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginTop: "auto", marginBottom: "auto" }}>
                                                                <div style={{
                                                                    flex: 1, height: "0.6rem",
                                                                    background: "color-mix(in srgb, var(--panel-bg) 70%, black 30%)",
                                                                    borderRadius: "1rem", overflow: "hidden",
                                                                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
                                                                }}>
                                                                    <div style={{
                                                                        width: `${community.contributionScore ?? 0}%`,
                                                                        height: "100%",
                                                                        background: "linear-gradient(90deg, #38bdf8, #10b981)",
                                                                        borderRadius: "1rem",
                                                                        boxShadow: "0 0 12px rgba(16,185,129,0.4)",
                                                                        transition: "width 1s ease-in-out",
                                                                    }} />
                                                                </div>
                                                                <span style={{
                                                                    fontSize: "0.95rem", fontWeight: 800, color: "#10b981",
                                                                    minWidth: "2.75rem", textAlign: "right",
                                                                }}>
                                                                    {community.contributionScore ?? 0}%
                                                                </span>
                                                            </div>
                                                            <div style={{
                                                                display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem",
                                                            }}>
                                                                <span style={{ fontSize: "0.72rem", color: "var(--color-gray-500)", fontWeight: 600 }}>
                                                                    Participation Score
                                                                </span>
                                                                <span style={{
                                                                    fontSize: "0.65rem", padding: "0.15rem 0.45rem",
                                                                    borderRadius: "0.35rem", fontWeight: 700,
                                                                    background: (community.contributionScore ?? 0) > 0 ? "rgba(16,185,129,0.1)" : "rgba(100,116,139,0.1)",
                                                                    color: (community.contributionScore ?? 0) > 0 ? "#10b981" : "var(--color-gray-500)",
                                                                }}>
                                                                    {(community.contributionScore ?? 0) > 0 ? "Active" : "New"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div style={{ flex: 1 }} /> // Fallback spacer
                                                    )}
                                                </div>
                                            </CommunityCard>
                                        </div>
                                    );
                                })}
                            </div>
                            {
                                myCommunities.length > visibleMyCount && (
                                    <div style={{ display: "flex", justifyContent: "center", marginTop: "2.5rem" }}>
                                        <button
                                            onClick={() => setVisibleMyCount(prev => prev + 6)}
                                            style={{
                                                padding: "0.85rem 2.5rem",
                                                borderRadius: "999px",
                                                background: "rgba(56, 189, 248, 0.1)",
                                                color: "#38bdf8",
                                                border: "1px solid rgba(56, 189, 248, 0.3)",
                                                fontSize: "0.95rem",
                                                fontWeight: 700,
                                                cursor: "pointer",
                                                transition: "all 0.2s ease",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.75rem",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = "rgba(56, 189, 248, 0.15)";
                                                e.currentTarget.style.transform = "translateY(-2px)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = "rgba(56, 189, 248, 0.1)";
                                                e.currentTarget.style.transform = "translateY(0)";
                                            }}
                                        >
                                            <SparklesIcon style={{ width: "1.25rem", height: "1.25rem", flexShrink: 0 }} />
                                            View More My Communities
                                        </button>
                                    </div>
                                )}
                        </>
                    )}
                </div>

                <CommunityModal
                    isOpen={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    onSubmit={handleCreateCommunity}
                />

                {
                    editingCommunity && (
                        <CommunityModal
                            isOpen={showEditModal}
                            onClose={() => {
                                setShowEditModal(false);
                                setEditingCommunity(null);
                            }}
                            onSubmit={handleUpdateCommunity}
                            initialData={{
                                name: editingCommunity.name,
                                description: editingCommunity.description,
                                goal: editingCommunity.goal,
                                commitment: editingCommunity.commitment,
                                tags: editingCommunity.tags?.join(", ") || "",
                                visibility: editingCommunity.visibility,
                                rules: editingCommunity.rules || "",
                            }}
                        />
                    )
                }

                {
                    selectedCommunity && (
                        <CommunityDetail
                            isOpen={showDetailModal}
                            onClose={() => {
                                setShowDetailModal(false);
                                setSelectedCommunity(null);
                                loadCommunities();
                            }}
                            communityId={selectedCommunity._id}
                            currentUserId={currentUser?._id || currentUser?.id}
                        />
                    )
                }

                {
                    showMemberModal && memberModalCommunity && (
                        <MemberManagementModal
                            isOpen={showMemberModal}
                            onClose={() => {
                                setShowMemberModal(false);
                                setMemberModalCommunity(null);
                                loadCommunities();
                            }}
                            communityId={memberModalCommunity._id}
                            creatorId={memberModalCommunity.creator?._id || memberModalCommunity.creator}
                            currentUserId={currentUser?._id || currentUser?.id}
                        />
                    )
                }


                {/* Invite Friends Modal */}
                {
                    showInviteModal && (
                        <div style={styles.modalWrapper} onClick={() => setShowInviteModal(false)}>
                            <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                                    <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-gray-900)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                        <div style={{ background: "rgba(56, 189, 248, 0.15)", padding: "0.5rem", borderRadius: "0.75rem" }}>
                                            <ShareIcon style={{ width: "1.75rem", height: "1.75rem", color: "#38bdf8" }} />
                                        </div>
                                        Invite Friends
                                    </h2>
                                    <button onClick={() => setShowInviteModal(false)} style={{ background: "none", border: "none", color: "var(--color-gray-600)", cursor: "pointer", padding: "0.5rem", borderRadius: "50%", transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.05)"} onMouseLeave={e => e.currentTarget.style.background = "none"}>
                                        <XMarkIcon style={{ width: "1.5rem", height: "1.5rem" }} />
                                    </button>
                                </div>
                                <p style={{ color: "var(--color-gray-600)", marginBottom: "1.5rem", lineHeight: 1.6, fontSize: "1rem" }}>
                                    Share FocusFlow with your friends and build an accountability network together!
                                </p>
                                <div style={{
                                    background: isDarkMode ? "rgba(56, 189, 248, 0.05)" : "#f8fafc",
                                    border: `1px solid ${isDarkMode ? "rgba(56, 189, 248, 0.2)" : "#e2e8f0"}`,
                                    borderRadius: "1rem",
                                    padding: "0.75rem",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.75rem",
                                    marginBottom: "2rem",
                                    boxShadow: isDarkMode ? "inset 0 2px 4px rgba(0,0,0,0.2)" : "inset 0 2px 4px rgba(0,0,0,0.02)"
                                }}>
                                    <input
                                        type="text"
                                        readOnly
                                        value={`${window.location.origin}/signup?ref=${currentUser?.username || currentUser?._id || 'focusflow'}`}
                                        style={{
                                            flex: 1,
                                            background: "transparent",
                                            border: "none",
                                            color: "var(--color-gray-900)",
                                            fontSize: "0.9rem",
                                            outline: "none",
                                            padding: "0.5rem",
                                            fontFamily: "monospace"
                                        }}
                                    />
                                    <button
                                        onClick={() => {
                                            const link = `${window.location.origin}/signup?ref=${currentUser?.username || currentUser?._id || 'focusflow'}`;
                                            window.open(link, '_blank');
                                        }}
                                        title="Open Link"
                                        style={{
                                            background: "none",
                                            border: "none",
                                            color: "#38bdf8",
                                            cursor: "pointer",
                                            padding: "0.5rem",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            transition: "color 0.2s"
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.color = "#818cf8"}
                                        onMouseLeave={e => e.currentTarget.style.color = "#38bdf8"}
                                    >
                                        <ArrowTopRightOnSquareIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            const link = `${window.location.origin}/signup?ref=${currentUser?.username || currentUser?._id || 'focusflow'}`;
                                            navigator.clipboard.writeText(link);
                                            toast.success("Invite link copied to clipboard!");
                                        }}
                                        style={{
                                            background: "linear-gradient(135deg, #38bdf8, #818cf8)",
                                            border: "none",
                                            borderRadius: "0.75rem",
                                            padding: "0.75rem 1.25rem",
                                            color: "#fff",
                                            fontWeight: 700,
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.6rem",
                                            boxShadow: "0 4px 12px rgba(56, 189, 248, 0.3)",
                                            transition: "all 0.2s"
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(56, 189, 248, 0.4)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(56, 189, 248, 0.3)"; }}
                                    >
                                        <ClipboardDocumentIcon style={{ width: "1.1rem", height: "1.1rem" }} />
                                        Copy
                                    </button>
                                </div>

                                <div style={{ marginBottom: "1rem" }}>
                                    <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-gray-500)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>Direct Share</h4>
                                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                                        {[
                                            { name: "Twitter/X", color: "#1DA1F2", bg: "rgba(29, 161, 242, 0.1)", action: () => { const link = `${window.location.origin}/signup?ref=${currentUser?.username || currentUser?._id || 'focusflow'}`; window.open(`https://twitter.com/intent/tweet?text=Join%20me%20on%20FocusFlow%20-%20the%20ultimate%20productivity%20app!&url=${encodeURIComponent(link)}`, '_blank') } },
                                            { name: "LinkedIn", color: "#0A66C2", bg: "rgba(10, 102, 194, 0.1)", action: () => { const link = `${window.location.origin}/signup?ref=${currentUser?.username || currentUser?._id || 'focusflow'}`; window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`, '_blank') } },
                                            { name: "Email", color: "#ea580c", bg: "rgba(234, 88, 12, 0.1)", action: () => { const link = `${window.location.origin}/signup?ref=${currentUser?.username || currentUser?._id || 'focusflow'}`; window.open(`mailto:?subject=Join%20FocusFlow&body=Hey!%20Check%20out%20FocusFlow%20for%20better%20productivity:%20${encodeURIComponent(link)}`, '_blank') } }
                                        ].map(platform => (
                                            <button
                                                key={platform.name}
                                                onClick={platform.action}
                                                style={{
                                                    flex: 1,
                                                    minWidth: "120px",
                                                    padding: "0.85rem",
                                                    borderRadius: "0.85rem",
                                                    border: `1px solid ${platform.color}44`,
                                                    background: platform.bg,
                                                    color: platform.color,
                                                    fontWeight: 700,
                                                    fontSize: "0.9rem",
                                                    cursor: "pointer",
                                                    transition: "all 0.2s"
                                                }}
                                                onMouseEnter={e => { e.currentTarget.style.background = platform.color; e.currentTarget.style.color = "#fff"; }}
                                                onMouseLeave={e => { e.currentTarget.style.background = platform.bg; e.currentTarget.style.color = platform.color; }}
                                            >
                                                {platform.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* Who's Focusing Modal */}
                {
                    showFocusingModal && (
                        <div style={styles.modalWrapper} onClick={() => setShowFocusingModal(false)}>
                            <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                                    <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-gray-900)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                        <EyeIcon style={{ width: "1.75rem", height: "1.75rem", color: "#22c55e" }} />
                                        Who's Focusing
                                    </h2>
                                    <button onClick={() => setShowFocusingModal(false)} style={{ background: "none", border: "none", color: "var(--color-gray-600)", cursor: "pointer", padding: "0.5rem" }}>
                                        <XMarkIcon style={{ width: "1.5rem", height: "1.5rem" }} />
                                    </button>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem", padding: "0.75rem 1rem", background: "rgba(34, 197, 94, 0.1)", borderRadius: "0.75rem", border: "1px solid rgba(34, 197, 94, 0.3)" }}>
                                    <div style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", background: "#22c55e", animation: "pulse 2s infinite" }} />
                                    <span style={{ color: "#22c55e", fontWeight: 600 }}>{focusingUsers.length} member{focusingUsers.length !== 1 ? 's' : ''} currently focusing</span>
                                </div>
                                {loadingFocusing ? (
                                    <div style={{ textAlign: "center", padding: "2rem", color: "var(--color-gray-600)" }}>Loading...</div>
                                ) : focusingUsers.length === 0 ? (
                                    <div style={{ textAlign: "center", padding: "2rem", color: "var(--color-gray-600)" }}>No one is focusing right now. Start a session to be the first!</div>
                                ) : focusingUsers.map((user, idx) => {
                                    const elapsedMins = Math.floor(user.timeElapsed / 60);
                                    const elapsedSecs = user.timeElapsed % 60;
                                    const timeStr = `${elapsedMins}:${elapsedSecs.toString().padStart(2, '0')}`;
                                    return (
                                        <div key={idx} style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "1rem",
                                            padding: "1rem",
                                            background: "var(--input-bg)",
                                            borderRadius: "0.75rem",
                                            marginBottom: "0.75rem",
                                            border: "1px solid color-mix(in srgb, var(--panel-bg) 80%, black 20%)",
                                        }}>
                                            <div style={{
                                                width: "3rem",
                                                height: "3rem",
                                                borderRadius: "50%",
                                                background: `linear-gradient(135deg, ${['#38bdf8', '#818cf8', '#22c55e', '#f59e0b', '#ec4899'][idx % 5]}, ${['#818cf8', '#22c55e', '#f59e0b', '#ec4899', '#38bdf8'][idx % 5]})`,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "#fff",
                                                fontWeight: 700,
                                                fontSize: "1.1rem",
                                                flexShrink: 0,
                                            }}>
                                                {user.name.charAt(0)}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 600, color: "var(--color-gray-900)", marginBottom: "0.25rem" }}>{user.name}</div>
                                                <div style={{ fontSize: "0.85rem", color: "var(--color-gray-600)" }}>Ready to work</div>
                                            </div>
                                            <div style={{ textAlign: "right" }}>
                                                <div style={{ fontWeight: 700, color: "#22c55e", fontFamily: "monospace", fontSize: "1.1rem" }}>{timeStr}</div>
                                                <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{user.status}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                }

                {/* Leaderboard Modal */}
                {
                    showLeaderboardModal && (
                        <div style={styles.modalWrapper} onClick={() => setShowLeaderboardModal(false)}>
                            <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                                    <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-gray-900)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                        <TrophyIcon style={{ width: "1.75rem", height: "1.75rem", color: "#f59e0b", flexShrink: 0 }} />
                                        Weekly Leaderboard
                                    </h2>
                                    <button onClick={() => setShowLeaderboardModal(false)} style={{ background: "none", border: "none", color: "var(--color-gray-600)", cursor: "pointer", padding: "0.5rem" }}>
                                        <XMarkIcon style={{ width: "1.5rem", height: "1.5rem", flexShrink: 0 }} />
                                    </button>
                                </div>
                                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
                                    {["week", "month", "all"].map((period) => (
                                        <button
                                            key={period}
                                            onClick={() => setLeaderboardPeriod(period)}
                                            style={{
                                                flex: 1,
                                                padding: "0.5rem",
                                                borderRadius: "0.5rem",
                                                border: leaderboardPeriod === period ? "1px solid rgba(245, 158, 11, 0.5)" : "1px solid #334155",
                                                background: leaderboardPeriod === period ? "rgba(245, 158, 11, 0.15)" : "transparent",
                                                color: leaderboardPeriod === period ? "#f59e0b" : "#94a3b8",
                                                fontWeight: 600,
                                                fontSize: "0.85rem",
                                                cursor: "pointer",
                                                textTransform: "capitalize"
                                            }}>
                                            This {period === 'all' ? 'Time' : period}
                                        </button>
                                    ))}
                                </div>
                                {loadingLeaderboard ? (
                                    <div style={{ textAlign: "center", padding: "2rem", color: "var(--color-gray-600)" }}>Loading...</div>
                                ) : leaderboardData.length > 0 ? (
                                    leaderboardData.map((user, idx) => (
                                        <div key={idx} style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "1rem",
                                            padding: "1rem",
                                            background: (user.username === currentUser?.username) ? (isDarkMode ? "rgba(245, 158, 11, 0.1)" : "#fffcf0") : (isDarkMode ? "rgba(255, 255, 255, 0.03)" : "#ffffff"),
                                            borderRadius: "1rem",
                                            marginBottom: "0.75rem",
                                            border: (user.username === currentUser?.username) ? "1px solid rgba(245, 158, 11, 0.4)" : `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.06)" : "#e2e8f0"}`,
                                            boxShadow: (user.username === currentUser?.username) ? "0 4px 12px rgba(245, 158, 11, 0.1)" : "none",
                                            transition: "transform 0.2s"
                                        }} onMouseEnter={e => e.currentTarget.style.transform = "translateX(4px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}>
                                            <div style={{
                                                width: "2.75rem",
                                                height: "2.75rem",
                                                borderRadius: "0.75rem",
                                                background: idx === 0 ? "linear-gradient(135deg, #fbbf24, #f59e0b)" : (idx === 1 ? "linear-gradient(135deg, #94a3b8, #64748b)" : (idx === 2 ? "linear-gradient(135deg, #d97706, #92400e)" : (isDarkMode ? "rgba(255, 255, 255, 0.05)" : "#f1f5f9"))),
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontWeight: 800,
                                                color: idx < 3 ? "#fff" : (isDarkMode ? "#94a3b8" : "#64748b"),
                                                fontSize: idx < 3 ? "1.25rem" : "1.1rem",
                                                boxShadow: idx < 3 ? "0 4px 10px rgba(0,0,0,0.15)" : "none",
                                                flexShrink: 0
                                            }}>
                                                {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : idx + 1}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 700, color: "var(--color-gray-900)", fontSize: "1rem" }}>{user.name}</div>
                                                <div style={{ fontSize: "0.8rem", color: "var(--color-gray-600)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                                    <FireIcon style={{ width: "0.9rem", color: "#f59e0b" }} />
                                                    {user.sessions} sessions • {Math.round(user.points)} pts
                                                </div>
                                            </div>
                                            <div style={{ textAlign: "right" }}>
                                                <div style={{ fontWeight: 800, color: "var(--color-gray-900)", fontSize: "1.1rem" }}>{user.hours}h</div>
                                                <div style={{ fontSize: "0.7rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.02em" }}>Focus</div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ textAlign: "center", padding: "3rem", color: "var(--color-gray-600)" }}>
                                        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏙️</div>
                                        <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>No users on the leaderboard yet.</div>
                                        <div style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>Be the first to claim the top spot!</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                }

                {/* Weekly Challenge Modal */}
                {
                    showChallengeModal && (
                        <div style={styles.modalWrapper} onClick={() => setShowChallengeModal(false)}>
                            <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                                    <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-gray-900)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                        <FireIcon style={{ width: "1.75rem", height: "1.75rem", color: "#ef4444", flexShrink: 0 }} />
                                        Weekly Challenge
                                    </h2>
                                    <button onClick={() => setShowChallengeModal(false)} style={{ background: "none", border: "none", color: "var(--color-gray-600)", cursor: "pointer", padding: "0.25rem" }}>
                                        <XMarkIcon style={{ width: "1.25rem", height: "1.25rem", flexShrink: 0 }} />
                                    </button>
                                </div>

                                {loadingChallenge ? (
                                    <div style={{ textAlign: "center", padding: "1.5rem", color: "var(--color-gray-600)" }}>Loading...</div>
                                ) : challengeData ? (
                                    <div style={{
                                        background: "linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(245, 158, 11, 0.1))",
                                        border: "1px solid rgba(239, 68, 68, 0.3)",
                                        borderRadius: "0.75rem",
                                        padding: "1rem",
                                        marginBottom: "0.75rem",
                                    }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                                            <span style={{ fontSize: "1.1rem" }}>🎯</span>
                                            <span style={{ color: "#fbbf24", fontWeight: 700, fontSize: "0.85rem" }}>CHALLENGE OF THE WEEK</span>
                                        </div>
                                        <h3 style={{ color: "var(--color-gray-900)", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                                            "{challengeData.title}"
                                        </h3>
                                        <p style={{ color: "var(--color-gray-600)", lineHeight: 1.4, marginBottom: "0.75rem", fontSize: "0.9rem" }}>
                                            {challengeData.description}
                                        </p>
                                        <div style={{ marginBottom: "0.75rem" }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                                                <span style={{ color: "var(--color-gray-600)", fontSize: "0.8rem" }}>Your Progress</span>
                                                <span style={{ color: "var(--color-gray-900)", fontWeight: 600, fontSize: "0.9rem" }}>{challengeData.progress} / {challengeData.target} {challengeData.unit || "Sessions"}</span>
                                            </div>
                                            <div style={{ height: "0.6rem", background: isDarkMode ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.05)", borderRadius: "999px", overflow: "hidden", border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)"}`, padding: "1px" }}>
                                                <div style={{ width: `${Math.min(100, (challengeData.progress / challengeData.target) * 100)}%`, height: "100%", background: "linear-gradient(90deg, #ef4444, #f59e0b, #fbbf24)", borderRadius: "999px", boxShadow: "0 0 10px rgba(239, 68, 68, 0.4)", transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)" }} />
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b", fontSize: "0.8rem" }}>
                                            <span>⏰ {challengeData.daysRemaining} days remaining</span>
                                            <span>👥 {challengeData.participants} participants</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ textAlign: "center", padding: "1.5rem", color: "var(--color-gray-600)" }}>Failed to load challenge data.</div>
                                )}

                                {/* Rewards */}
                                {challengeData && (
                                    <div style={{ marginBottom: "1rem" }}>
                                        <h4 style={{ color: "var(--color-gray-900)", fontWeight: 600, marginBottom: "0.5rem", fontSize: "0.9rem" }}>🏆 Rewards</h4>
                                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "0.5rem" }}>
                                            {challengeData.rewards.map((reward, ridx) => (
                                                <div key={ridx} style={{
                                                    padding: "0.75rem",
                                                    background: "rgba(255, 255, 255, 0.03)",
                                                    borderRadius: "0.5rem",
                                                    border: "1px solid rgba(255, 255, 255, 0.06)",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    gap: "0.25rem"
                                                }}>
                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                                                        <span style={{ fontSize: "1.2rem" }}>{reward.icon}</span>
                                                        <div style={{ color: "var(--color-gray-900)", fontWeight: 700, fontSize: "0.9rem" }}>{reward.title}</div>
                                                    </div>
                                                    <div style={{ color: "#64748b", fontSize: "0.75rem", textAlign: "center" }}>{reward.subtitle}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                                    <button
                                        onClick={handleChallengeAction}
                                        style={{
                                            flex: 2,
                                            minWidth: "200px",
                                            padding: "0.75rem 1rem",
                                            background: challengeData?.hasStarted ? "linear-gradient(135deg, #ef4444, #f59e0b)" : "linear-gradient(135deg, #38bdf8, #818cf8)",
                                            border: "none",
                                            borderRadius: "0.75rem",
                                            color: "#fff",
                                            fontWeight: 700,
                                            fontSize: "1rem",
                                            cursor: "pointer",
                                            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                                            boxShadow: challengeData?.hasStarted ? "0 4px 15px rgba(239, 68, 68, 0.2)" : "0 4px 15px rgba(56, 189, 248, 0.2)"
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.opacity = "0.95";
                                            e.currentTarget.style.transform = "translateY(-1px)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.opacity = "1";
                                            e.currentTarget.style.transform = "translateY(0)";
                                        }}
                                    >
                                        {challengeData?.hasStarted ? "Continue Challenge 🚀" : "Start Challenge 🎯"}
                                    </button>

                                    {challengeData?.hasStarted && (
                                        <button
                                            onClick={handleLeaveChallenge}
                                            style={{
                                                flex: 1,
                                                minWidth: "140px",
                                                padding: "0.75rem 1rem",
                                                background: "transparent",
                                                border: "2px solid rgba(239, 68, 68, 0.5)",
                                                borderRadius: "0.75rem",
                                                color: "#ef4444",
                                                fontWeight: 700,
                                                fontSize: "0.95rem",
                                                cursor: "pointer",
                                                transition: "all 0.2s ease",
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(239, 68, 68, 0.05)"}
                                            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                                        >
                                            Leave Challenge
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};
export default DashboardCommunity;
