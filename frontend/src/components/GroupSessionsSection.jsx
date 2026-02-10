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
import { useToast } from "../context/ToastContext";

const GroupSessionsSection = ({ communityId, communityName, currentUserId }) => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [filter, setFilter] = useState("all"); // 'all', 'active', 'completed'
    const toast = useToast();

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
        boxSizing: "border-box"
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
            <div style={headerStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ padding: "0.5rem", borderRadius: "0.75rem", background: "rgba(56, 189, 248, 0.1)", color: "#38bdf8" }}>
                        <ClockIcon style={{ width: "1.5rem" }} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#f8fafc" }}>Group Focus Sessions</h2>
                        <p style={{ fontSize: "0.8rem", color: "#64748b" }}>Focus together in real-time</p>
                    </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem" }}>
                    <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", borderRadius: "0.5rem", padding: "0.25rem" }}>
                        {["all", "active", "completed"].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                style={{
                                    padding: "0.4rem 0.75rem",
                                    borderRadius: "0.4rem",
                                    border: "none",
                                    background: filter === f ? "rgba(56, 189, 248, 0.2)" : "transparent",
                                    color: filter === f ? "#38bdf8" : "#94a3b8",
                                    fontSize: "0.8rem",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    textTransform: "capitalize"
                                }}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1rem", borderRadius: "0.75rem", border: "none", background: "#38bdf8", color: "#0f172a", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer" }}
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
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.02)", borderRadius: "1rem", border: "1px dashed rgba(255,255,255,0.1)", textAlign: "center", padding: "3rem" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
                    <h3 style={{ color: "#f8fafc", marginBottom: "0.5rem" }}>No Sessions Found</h3>
                    <p style={{ color: "#64748b" }}>Be the first to create one!</p>
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
        </section>
    );
};

export default GroupSessionsSection;
