import { UserGroupIcon, ClockIcon, PlayIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const GroupSessionCard = ({ session, currentUserId, onJoin, onView }) => {
    const isHost = session.hostId?._id === currentUserId || session.hostId === currentUserId;
    const isParticipant = session.participants?.some(
        p => (p.userId?._id || p.userId) === currentUserId && !["left", "disconnected"].includes(p.status)
    );
    const activeParticipants = session.participants?.filter(
        p => !["left", "disconnected"].includes(p.status)
    ) || [];

    const getStatusBadge = () => {
        const statusStyles = {
            lobby: { bg: "rgba(34, 197, 94, 0.15)", color: "#22c55e", text: "🟢 Waiting to Start" },
            relaxation: { bg: "rgba(168, 85, 247, 0.15)", color: "#a855f7", text: "🧘 Relaxation" },
            focus: { bg: "rgba(245, 158, 11, 0.15)", color: "#f59e0b", text: "🎯 Focus in Progress" },
            break: { bg: "rgba(59, 130, 246, 0.15)", color: "#3b82f6", text: "☕ Break Time" },
            paused: { bg: "rgba(156, 163, 175, 0.15)", color: "#9ca3af", text: "⏸️ Paused" },
            completed: { bg: "rgba(34, 197, 94, 0.15)", color: "#22c55e", text: "✅ Completed" },
            cancelled: { bg: "rgba(239, 68, 68, 0.15)", color: "#ef4444", text: "❌ Cancelled" },
        };

        const style = statusStyles[session.status] || statusStyles.lobby;

        return (
            <span style={{
                padding: "0.35rem 0.75rem",
                borderRadius: "999px",
                fontSize: "0.75rem",
                fontWeight: 600,
                background: style.bg,
                color: style.color,
            }}>
                {style.text}
            </span>
        );
    };

    const getTimeRemaining = () => {
        if (session.status === "focus" && session.timeline?.focusEndsAt) {
            const remaining = new Date(session.timeline.focusEndsAt) - new Date();
            if (remaining <= 0) return "Ending soon...";
            const mins = Math.floor(remaining / 60000);
            const secs = Math.floor((remaining % 60000) / 1000);
            return `${mins}:${secs.toString().padStart(2, "0")} remaining`;
        }
        return null;
    };

    const cardStyle = {
        background: "linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)",
        borderRadius: "1rem",
        padding: "1.25rem",
        border: `1px solid ${isParticipant ? "rgba(56, 189, 248, 0.4)" : "rgba(255,255,255,0.1)"}`,
        transition: "all 0.2s",
        cursor: "pointer",
    };

    const hostAvatarStyle = {
        width: "2rem",
        height: "2rem",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #38bdf8, #60a5fa)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "0.75rem",
        fontWeight: 700,
        color: "#0f172a",
    };

    const participantAvatarsStyle = {
        display: "flex",
        alignItems: "center",
    };

    const avatarStackStyle = (index) => ({
        width: "1.75rem",
        height: "1.75rem",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "0.65rem",
        fontWeight: 600,
        color: "#fff",
        border: "2px solid #1e293b",
        marginLeft: index > 0 ? "-0.5rem" : 0,
    });

    const buttonStyle = {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.6rem 1rem",
        borderRadius: "0.5rem",
        border: "none",
        fontWeight: 600,
        fontSize: "0.85rem",
        cursor: "pointer",
        transition: "all 0.2s",
    };

    const timeRemaining = getTimeRemaining();

    return (
        <div style={cardStyle} onClick={() => onView(session)}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f8fafc", margin: 0, marginBottom: "0.25rem" }}>
                        {session.title}
                    </h4>
                    {session.description && (
                        <p style={{ color: "#94a3b8", fontSize: "0.85rem", margin: 0 }}>
                            {session.description.length > 60
                                ? session.description.slice(0, 60) + "..."
                                : session.description}
                        </p>
                    )}
                </div>
                {getStatusBadge()}
            </div>

            {/* Host Info */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <div style={hostAvatarStyle}>
                    {session.hostId?.username?.slice(0, 2).toUpperCase() || "H"}
                </div>
                <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                    Hosted by <span style={{ color: "#f8fafc", fontWeight: 500 }}>
                        {session.hostId?.username || "Unknown"}
                    </span>
                    {isHost && <span style={{ color: "#38bdf8" }}> (You)</span>}
                </span>
            </div>

            {/* Session Info */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#94a3b8", fontSize: "0.85rem" }}>
                    <ClockIcon style={{ width: "1rem", height: "1rem" }} />
                    {session.settings?.focusDuration || 25} min focus
                </div>
                {session.settings?.relaxationActivity && (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#a855f7", fontSize: "0.85rem" }}>
                        🧘 {session.settings.relaxationDuration} min relaxation
                    </div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#94a3b8", fontSize: "0.85rem" }}>
                    <UserGroupIcon style={{ width: "1rem", height: "1rem" }} />
                    {activeParticipants.length}/{session.settings?.maxParticipants || 10}
                </div>
            </div>

            {/* Time Remaining */}
            {timeRemaining && (
                <div style={{
                    padding: "0.5rem 0.75rem",
                    borderRadius: "0.5rem",
                    background: "rgba(245, 158, 11, 0.1)",
                    color: "#f59e0b",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    marginBottom: "1rem",
                    display: "inline-block",
                }}>
                    ⏱️ {timeRemaining}
                </div>
            )}

            {/* Participants & Actions */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/* Participant Avatars */}
                <div style={participantAvatarsStyle}>
                    {activeParticipants.slice(0, 5).map((p, i) => (
                        <div key={p.userId?._id || p.userId} style={avatarStackStyle(i)}>
                            {(p.userId?.username || "?").slice(0, 2).toUpperCase()}
                        </div>
                    ))}
                    {activeParticipants.length > 5 && (
                        <span style={{ marginLeft: "0.5rem", color: "#94a3b8", fontSize: "0.8rem" }}>
                            +{activeParticipants.length - 5} more
                        </span>
                    )}
                </div>

                {/* Action Button */}
                {session.status === "lobby" && !isParticipant && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onJoin(session._id); }}
                        style={{
                            ...buttonStyle,
                            background: "linear-gradient(135deg, #22c55e, #16a34a)",
                            color: "#fff",
                        }}
                    >
                        <PlayIcon style={{ width: "1rem", height: "1rem" }} />
                        Join
                    </button>
                )}
                {isParticipant && session.status !== "completed" && session.status !== "cancelled" && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onView(session); }}
                        style={{
                            ...buttonStyle,
                            background: "linear-gradient(135deg, #38bdf8, #60a5fa)",
                            color: "#0f172a",
                        }}
                    >
                        Enter
                        <ArrowRightIcon style={{ width: "1rem", height: "1rem" }} />
                    </button>
                )}
                {session.status === "completed" && (
                    <span style={{ color: "#22c55e", fontSize: "0.85rem", fontWeight: 500 }}>
                        ✓ Completed
                    </span>
                )}
            </div>
        </div>
    );
};

export default GroupSessionCard;
