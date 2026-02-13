import React, { useState, useEffect } from "react";
import {
    ClockIcon,
    PlusIcon,
    ArrowPathIcon,
    MagnifyingGlassIcon,
    FunnelIcon
} from "@heroicons/react/24/outline";
import { groupSessionAPI } from "../utils/groupSessionAPI";
import GroupSessionCard from "./GroupSessionCard";
import CreateSessionModal from "./CreateGroupSessionModal";
import GroupSessionRoom from "./GroupSessionRoom";
import { useToast } from "../context/ToastContext";
import { useTheme } from "../context/ThemeContext";

const GroupSessionsSection = ({ communityId, communityName, currentUserId }) => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [activeSession, setActiveSession] = useState(null);
    const [filter, setFilter] = useState("all"); // 'all', 'active', 'completed'
    const [isCompact, setIsCompact] = useState(window.innerWidth < 960);
    const [isStacking, setIsStacking] = useState(window.innerWidth < 790);
    const [isTiny, setIsTiny] = useState(window.innerWidth < 440);
    const { isDarkMode } = useTheme();
    const toast = useToast();

    useEffect(() => {
        const handleResize = () => {
            setIsCompact(window.innerWidth < 960);
            setIsStacking(window.innerWidth < 790);
            setIsTiny(window.innerWidth < 440);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        loadSessions();
    }, [communityId, filter]);

    const loadSessions = async () => {
        setLoading(true);
        try {
            const res = await groupSessionAPI.getCommunityGroupSessions(communityId, {
                status: filter === "all" ? null : filter
            });
            setSessions(res.data || []);
        } catch (err) {
            toast.error("Failed to load sessions");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateSession = async (sessionData) => {
        try {
            await groupSessionAPI.createGroupSession(sessionData);
            loadSessions();
        } catch (err) {
            throw err;
        }
    };

    const handleJoin = async (sessionId) => {
        try {
            await groupSessionAPI.joinGroupSession(sessionId);
            toast.success("Joined session!");
            loadSessions();
        } catch (err) {
            toast.error(err.message || "Failed to join session");
        }
    };

    // Styles
    const sectionStyle = {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        minHeight: 0,
        overflow: "hidden",
        padding: "1.5rem",
        boxSizing: "border-box",
        background: isDarkMode ? "transparent" : "#f1f5f9"
    };

    const headerStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.5rem",
        flexShrink: 0
    };

    const scrollContainerStyle = {
        flex: 1,
        overflowY: "auto",
        minHeight: 0,
        height: "100%",
        paddingRight: "0.5rem",
        paddingBottom: "6rem" // MASSIVE padding to ensure cards aren't cut
    };

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "1.5rem",
        alignContent: "start"
    };

    return (
        <section style={sectionStyle}>
            {/* Header */}
            <div style={{
                ...headerStyle,
                flexDirection: isStacking ? "column" : "row",
                alignItems: isStacking ? "flex-start" : (isCompact ? "flex-start" : "center"),
                gap: isStacking ? "1.25rem" : "0.75rem"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ padding: "0.5rem", borderRadius: "0.75rem", background: isDarkMode ? "rgba(56, 189, 248, 0.1)" : "#e0f2fe", color: "#38bdf8" }}>
                        <ClockIcon style={{ width: "1.5rem" }} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: isDarkMode ? "#f8fafc" : "#0f172a" }}>Group Focus Sessions</h2>
                        <p style={{ fontSize: "0.8rem", color: isDarkMode ? "#64748b" : "#94a3b8" }}>Focus together in real-time</p>
                    </div>
                </div>

                <div style={{
                    display: "flex",
                    flexDirection: isTiny ? "column" : (isStacking ? "row" : (isCompact ? "column" : "row")),
                    alignItems: isTiny ? "flex-end" : (isStacking ? "center" : (isCompact ? "flex-end" : "center")),
                    justifyContent: isTiny ? "flex-start" : (isStacking ? "space-between" : "flex-end"),
                    gap: "0.75rem",
                    width: (isStacking || isTiny) ? "100%" : "auto",
                    flexWrap: "wrap"
                }}>
                    <div style={{
                        display: "flex",
                        background: isDarkMode ? "rgba(255,255,255,0.05)" : "#f1f5f9",
                        borderRadius: "0.5rem",
                        padding: "0.25rem",
                        flex: (isStacking || isTiny) ? "1 1 auto" : "initial",
                        minWidth: (isStacking || isTiny) ? "200px" : "auto",
                        width: isTiny ? "100%" : "auto",
                        justifyContent: "space-between",
                        border: isDarkMode ? "none" : "1px solid #e2e8f0"
                    }}>
                        {["all", "active", "completed"].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                style={{
                                    flex: 1,
                                    padding: "0.4rem 0.75rem",
                                    borderRadius: "0.4rem",
                                    border: "none",
                                    background: filter === f ? (isDarkMode ? "rgba(56, 189, 248, 0.2)" : "#38bdf8") : "transparent",
                                    color: filter === f ? (isDarkMode ? "#38bdf8" : "#ffffff") : (isDarkMode ? "#94a3b8" : "#64748b"),
                                    fontSize: "0.8rem",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    textTransform: "capitalize",
                                    transition: "all 0.2s"
                                }}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                            padding: "0.6rem 1rem",
                            borderRadius: "0.75rem",
                            border: "none",
                            background: "#38bdf8",
                            color: "#0f172a",
                            fontWeight: 700,
                            fontSize: "0.9rem",
                            cursor: "pointer",
                            flex: (isStacking && !isTiny) ? "0 0 auto" : "initial",
                            width: isTiny ? "auto" : (isStacking ? "auto" : "auto"),
                            marginLeft: isTiny ? "auto" : "0",
                            whiteSpace: "nowrap"
                        }}
                    >
                        <PlusIcon style={{ width: "1.1rem" }} />
                        New Session
                    </button>
                </div>
            </div>

            {/* Content Area */}
            {loading ? (
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>Loading sessions...</div>
            ) : sessions.length === 0 ? (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: isDarkMode ? "rgba(255,255,255,0.02)" : "#ffffff", borderRadius: "1rem", border: `1px dashed ${isDarkMode ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`, textAlign: "center", padding: "3rem" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
                    <h3 style={{ color: isDarkMode ? "#f8fafc" : "#0f172a", marginBottom: "0.5rem" }}>No Sessions Found</h3>
                    <p style={{ color: isDarkMode ? "#64748b" : "#94a3b8" }}>Be the first to create one!</p>
                </div>
            ) : (
                <div className="scroll-container" style={scrollContainerStyle}>
                    <div style={gridStyle}>
                        {sessions.map((session) => (
                            <GroupSessionCard
                                key={session._id}
                                session={session}
                                currentUserId={currentUserId}
                                onJoin={() => handleJoin(session._id)}
                                onView={(s) => setActiveSession(s)}
                            />
                        ))}
                    </div>
                </div>
            )}

            <CreateSessionModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                communityId={communityId}
                communityName={communityName}
                onSubmit={handleCreateSession}
            />

            {activeSession && (
                <GroupSessionRoom
                    sessionId={activeSession._id}
                    currentUserId={currentUserId}
                    onClose={() => {
                        setActiveSession(null);
                        loadSessions();
                    }}
                />
            )}
        </section>
    );
};

export default GroupSessionsSection;
