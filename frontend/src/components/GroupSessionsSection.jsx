import { useState, useEffect, useCallback } from "react";
import { PlusIcon, CalendarIcon } from "@heroicons/react/24/outline";
import { groupSessionAPI } from "../utils/groupSessionAPI";
import { useToast } from "../context/ToastContext";
import GroupSessionCard from "./GroupSessionCard";
import CreateGroupSessionModal from "./CreateGroupSessionModal";
import GroupSessionRoom from "./GroupSessionRoom";

const GroupSessionsSection = ({ communityId, communityName, currentUserId }) => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [activeSession, setActiveSession] = useState(null);
    const [filter, setFilter] = useState("active"); // active, completed, all
    const toast = useToast();

    const loadSessions = useCallback(async () => {
        if (!communityId) return;

        setLoading(true);
        try {
            const data = await groupSessionAPI.getCommunityGroupSessions(communityId, {
                status: filter === "all" ? undefined : filter,
                limit: 50,
            });
            setSessions(data.data || []);
        } catch (err) {
            toast.error(err.message || "Failed to load sessions");
        } finally {
            setLoading(false);
        }
    }, [communityId, filter, toast]);

    useEffect(() => {
        loadSessions();
    }, [loadSessions]);

    // Auto-refresh every 30 seconds for active sessions
    useEffect(() => {
        if (filter === "active") {
            const interval = setInterval(loadSessions, 30000);
            return () => clearInterval(interval);
        }
    }, [filter, loadSessions]);

    const handleCreateSession = async (data) => {
        const result = await groupSessionAPI.createGroupSession(data);
        await loadSessions();
        // Automatically open the newly created session
        setActiveSession(result.data);
    };

    const handleJoinSession = async (sessionId) => {
        try {
            const result = await groupSessionAPI.joinGroupSession(sessionId);
            setActiveSession(result.data);
            toast.success("Successfully joined the session!");
        } catch (err) {
            toast.error(err.message || "Failed to join session");
        }
    };

    const handleViewSession = (session) => {
        setActiveSession(session);
    };

    const handleCloseRoom = () => {
        setActiveSession(null);
        loadSessions();
    };

    // Styles
    const sectionStyle = {
        padding: "1.5rem",
        marginBottom: "2rem",
    };

    const headerStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.25rem",
        flexWrap: "wrap",
        gap: "1rem",
    };

    const titleStyle = {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
    };

    const filterStyle = {
        display: "flex",
        gap: "0.5rem",
    };

    const filterButtonStyle = (isActive) => ({
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        border: "1px solid rgba(255,255,255,0.15)",
        background: isActive ? "rgba(56, 189, 248, 0.2)" : "transparent",
        color: isActive ? "#38bdf8" : "#94a3b8",
        fontWeight: 500,
        fontSize: "0.85rem",
        cursor: "pointer",
        transition: "all 0.2s",
    });

    const createButtonStyle = {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.75rem 1.25rem",
        borderRadius: "0.75rem",
        border: "none",
        background: "linear-gradient(135deg, #38bdf8, #60a5fa)",
        color: "#0f172a",
        fontWeight: 700,
        fontSize: "0.9rem",
        cursor: "pointer",
        transition: "all 0.2s",
    };

    const scrollContainerStyle = {
        maxHeight: "600px",
        overflowY: "auto",
        paddingRight: "0.5rem",
        // Custom scrollbar styling
        scrollbarWidth: "thin", // Firefox
        scrollbarColor: "#38bdf8 rgba(255,255,255,0.05)", // Firefox
    };

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "1rem",
    };

    const emptyStyle = {
        textAlign: "center",
        padding: "3rem 2rem",
        background: "rgba(255,255,255,0.02)",
        borderRadius: "1rem",
        border: "1px dashed rgba(255,255,255,0.1)",
    };



    return (
        <section style={sectionStyle}>
            {/* Header */}
            <div style={headerStyle}>
                <div style={titleStyle}>
                    <CalendarIcon style={{ width: "1.5rem", height: "1.5rem", color: "#38bdf8" }} />
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#f8fafc", margin: 0 }}>
                        Group Focus Sessions
                    </h3>
                    <button
                        onClick={loadSessions}
                        disabled={loading}
                        style={{
                            background: "none",
                            border: "none",
                            color: "#94a3b8",
                            cursor: "pointer",
                            padding: "0.25rem",
                            opacity: loading ? 0.5 : 1,
                        }}
                        title="Refresh"
                    >
                        <svg
                            style={{
                                width: "1rem",
                                height: "1rem",
                                animation: loading ? "spin 1s linear infinite" : "none",
                            }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                </div>

                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <div style={filterStyle}>
                        <button
                            onClick={() => setFilter("active")}
                            style={filterButtonStyle(filter === "active")}
                        >
                            Active
                        </button>
                        <button
                            onClick={() => setFilter("completed")}
                            style={filterButtonStyle(filter === "completed")}
                        >
                            Completed
                        </button>
                        <button
                            onClick={() => setFilter("all")}
                            style={filterButtonStyle(filter === "all")}
                        >
                            All
                        </button>
                    </div>

                    <button onClick={() => setShowCreateModal(true)} style={createButtonStyle}>
                        <PlusIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                        New Session
                    </button>
                </div>
            </div>



            {/* Loading State */}
            {loading && sessions.length === 0 && (
                <div style={emptyStyle}>
                    <p style={{ color: "#94a3b8" }}>Loading sessions...</p>
                </div>
            )}

            {/* Empty State */}
            {!loading && sessions.length === 0 && (
                <div style={emptyStyle}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎯</div>
                    <h4 style={{ color: "#f8fafc", fontWeight: 600, marginBottom: "0.5rem" }}>
                        {filter === "active" ? "No Active Sessions" :
                            filter === "completed" ? "No Completed Sessions" : "No Sessions Yet"}
                    </h4>
                    <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
                        {filter === "active"
                            ? "Start a group focus session and invite your community members to focus together!"
                            : "Sessions you complete will appear here."}
                    </p>
                    {filter !== "completed" && (
                        <button onClick={() => setShowCreateModal(true)} style={createButtonStyle}>
                            <PlusIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                            Create First Session
                        </button>
                    )}
                </div>
            )}

            {/* Sessions Grid */}
            {sessions.length > 0 && (
                <div style={scrollContainerStyle}>
                    <div style={gridStyle}>
                        {sessions.map(session => (
                            <GroupSessionCard
                                key={session._id}
                                session={session}
                                currentUserId={currentUserId}
                                onJoin={handleJoinSession}
                                onView={handleViewSession}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Create Modal */}
            <CreateGroupSessionModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSubmit={handleCreateSession}
                communityId={communityId}
                communityName={communityName}
            />

            {/* Session Room */}
            {activeSession && (
                <GroupSessionRoom
                    sessionId={activeSession._id}
                    currentUserId={currentUserId}
                    onClose={handleCloseRoom}
                />
            )}

            {/* Add keyframes for spinner and custom scrollbar styles */}
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                /* Webkit scrollbar styling for Chrome/Edge/Safari */
                div::-webkit-scrollbar {
                    width: 8px;
                }
                
                div::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                
                div::-webkit-scrollbar-thumb {
                    background: #38bdf8;
                    border-radius: 10px;
                }
                
                div::-webkit-scrollbar-thumb:hover {
                    background: #60a5fa;
                }
            `}</style>
        </section>
    );
};

export default GroupSessionsSection;
