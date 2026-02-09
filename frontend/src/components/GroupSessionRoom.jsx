import { useState, useEffect, useCallback, useRef } from "react";
import { useSocket } from "../context/SocketContext";
import { useToast } from "../context/ToastContext";
import { groupSessionAPI } from "../utils/groupSessionAPI";
import {
    XMarkIcon,
    PlayIcon,
    PauseIcon,
    ArrowRightIcon,
    CheckCircleIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";

const GroupSessionRoom = ({ sessionId, currentUserId, onClose }) => {
    const { socket, isConnected, subscribe, joinSession, leaveSession, updateStatus, startSession, advanceSession, sendHeartbeat } = useSocket();
    const toast = useToast();

    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeRemaining, setTimeRemaining] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [showSidebar, setShowSidebar] = useState(false);

    const heartbeatRef = useRef(null);
    const timerRef = useRef(null);
    const loadingRef = useRef(false);
    const hasJoinedRef = useRef(false);
    const clockOffsetRef = useRef(0); // Track difference between client and server time

    // Handle window resize for responsive layout
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Load session data
    const loadSession = useCallback(async (force = false) => {
        // Prevent concurrent loads unless forced
        if (loadingRef.current && !force) {
            return;
        }

        loadingRef.current = true;
        try {
            const data = await groupSessionAPI.getGroupSession(sessionId);
            setSession(data.data);

        } catch (err) {
            toast.error(err.message || "Failed to load session");
        } finally {
            setLoading(false);
            loadingRef.current = false;
        }
    }, [sessionId, currentUserId, toast]);

    // Initial load and socket join
    // Initial load and socket join
    useEffect(() => {
        console.log(`[GroupSessionRoom] Mounting/Updating session ${sessionId}, connected: ${isConnected}, joined: ${hasJoinedRef.current}`);
        loadSession(true); // Force initial load

        if (isConnected && !hasJoinedRef.current) {
            console.log(`[GroupSessionRoom] Joining session room (emit): ${sessionId}`);
            joinSession(sessionId);
            hasJoinedRef.current = true;
        }

        // Cleanup: only clear intervals. 
        // We do NOT call leaveSession() here because it runs on every dependency change (like isConnected flickering).
        // The server handles disconnects. Explicit leaving is done via handleLeave button.
        return () => {
            console.log(`[GroupSessionRoom] Effect cleanup (intervals only) for session ${sessionId}`);
            if (heartbeatRef.current) clearInterval(heartbeatRef.current);
            if (timerRef.current) clearInterval(timerRef.current);
            loadingRef.current = false;
        };
    }, [sessionId, isConnected, joinSession, loadSession]); // Removed leaveSession from deps

    // Heartbeat
    useEffect(() => {
        if (isConnected && sessionId) {
            heartbeatRef.current = setInterval(() => {
                sendHeartbeat(sessionId);
            }, 10000);
        }
        return () => {
            if (heartbeatRef.current) {
                clearInterval(heartbeatRef.current);
            }
        };
    }, [isConnected, sessionId, sendHeartbeat]);

    // Safety Net: Poll session state every 5 seconds to ensure sync
    useEffect(() => {
        if (sessionId) {
            const syncInterval = setInterval(() => {
                // Silent reload (don't show loading spinner)
                loadSession(true);
            }, 5000);
            return () => clearInterval(syncInterval);
        }
    }, [sessionId, loadSession]);

    // Subscribe to socket events
    useEffect(() => {
        if (!socket) return;

        const unsubState = subscribe("session:state", ({ session: newSession, serverTime }) => {
            setSession(newSession);
            // Update clock offset if serverTime is provided
            if (serverTime) {
                clockOffsetRef.current = Date.now() - serverTime;
            }
        });

        const unsubStarted = subscribe("session:started", ({ session: newSession, startedBy, serverTime }) => {
            setSession(newSession);
            // Update clock offset if serverTime is provided
            if (serverTime) {
                clockOffsetRef.current = Date.now() - serverTime;
            }
            if (newSession.status === "relaxation") {
                toast.info("🧘 Relaxation phase started!");
            } else {
                toast.success("🎯 Focus session started!");
            }
        });

        const unsubPhase = subscribe("session:phaseChanged", ({ session: newSession, newPhase, serverTime }) => {
            setSession(newSession);
            // Update clock offset if serverTime is provided
            if (serverTime) {
                clockOffsetRef.current = Date.now() - serverTime;
            }
            if (newPhase === "focus") {
                toast.success("🎯 Focus mode activated! Stay concentrated.");
            } else if (newPhase === "break") {
                toast.info("☕ Break time! Well done.");
            } else if (newPhase === "completed") {
                toast.success("🎉 Session completed! Great work, team!");
            }
        });

        const unsubStatus = subscribe("participant:statusUpdated", ({ userId, status, allReady: _allReady, session: newSession }) => {
            if (newSession) {
                setSession(newSession);
            }
        });

        const unsubJoined = subscribe("participant:joined", ({ user }) => {
            const userId = user?._id?.toString() || user?._id;
            const currentId = currentUserId?.toString();

            if (userId && userId !== currentId) {
                toast.info(`${user.username || "Someone"} joined the session`);
            }
            // Backend now broadcasts session:state, no need for manual reload
        });

        const unsubLeft = subscribe("participant:left", ({ user }) => {
            const userId = user?._id?.toString() || user?._id;
            const currentId = currentUserId?.toString();

            if (userId && userId !== currentId) {
                toast.warning(`${user.username || "Someone"} left the session`);
            }
            // Backend now broadcasts session:state for room, no need for manual reload
        });

        const unsubDisconnected = subscribe("participant:disconnected", ({ user }) => {
            const userId = user?._id?.toString() || user?._id;
            const currentId = currentUserId?.toString();

            if (userId && userId !== currentId) {
                toast.warning(`${user.username || "Someone"} disconnected`);
            }
        });

        const unsubReconnected = subscribe("participant:reconnected", ({ user }) => {
            const userId = user?._id?.toString() || user?._id;
            const currentId = currentUserId?.toString();

            if (userId && userId !== currentId) {
                toast.success(`${user.username || "Someone"} reconnected`);
            }
        });

        const unsubHostChanged = subscribe("session:hostChanged", ({ newHostId }) => {
            const hostId = newHostId?.toString();
            const currentId = currentUserId?.toString();

            if (hostId === currentId) {
                toast.success("You are now the session host!");
            } else {
                toast.info("Session host has changed");
            }
            // Force reload to get updated host status
            loadSession(true);
        });

        const unsubCancelled = subscribe("session:cancelled", ({ reason }) => {
            toast.error(`Session was cancelled: ${reason || "Unknown reason"}`);
            setTimeout(() => onClose(), 3000);
        });

        return () => {
            unsubState();
            unsubStarted();
            unsubPhase();
            unsubStatus();
            unsubJoined();
            unsubLeft();
            unsubDisconnected();
            unsubReconnected();
            unsubHostChanged();
            unsubCancelled();
        };
    }, [socket, subscribe, currentUserId, loadSession, onClose, toast]);

    // Keep a ref to the latest session for the timer to access without dependencies
    const sessionRef = useRef(session);
    useEffect(() => {
        sessionRef.current = session;
    }, [session]);

    // Robust Timer - Runs independently of session updates to prevent "stuck" timer
    // Uses clock offset to sync with server time for consistent countdown across all clients
    useEffect(() => {
        const timerId = setInterval(() => {
            const currentSession = sessionRef.current;
            if (currentSession?.status === "focus" && currentSession?.timeline?.focusEndsAt) {
                const endTime = new Date(currentSession.timeline.focusEndsAt).getTime();
                // Use server-synced time for more accurate countdown
                const now = Date.now() - clockOffsetRef.current;
                const remaining = Math.max(0, endTime - now);
                setTimeRemaining(remaining);
            }
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    const formatTime = (ms) => {
        if (ms === null || ms === undefined) return "00:00";
        const totalSeconds = Math.floor(ms / 1000);
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const handleReady = async () => {
        try {
            // Remove socket.emit, rely on API -> Backend Broadcast
            await groupSessionAPI.updateParticipantStatus(sessionId, "ready");
        } catch (err) {
            toast.error(err.message || "Failed to update status");
        }
    };

    const handleStart = async () => {
        try {
            // Remove socket.emit, rely on API -> Backend Broadcast
            await groupSessionAPI.startGroupSession(sessionId);
        } catch (err) {
            // Ignore "already started" errors which might happen due to race conditions or quick double clicks
            if (!err.message?.includes("already started")) {
                toast.error(err.message || "Failed to start session");
            }
        }
    };

    const handleAdvance = async () => {
        try {
            // Remove socket.emit, rely on API -> Backend Broadcast
            await groupSessionAPI.advanceGroupSession(sessionId);
        } catch (err) {
            toast.error(err.message || "Failed to advance session");
        }
    };

    const handleLeave = async () => {
        try {
            await groupSessionAPI.leaveGroupSession(sessionId);
            onClose();
        } catch (err) {
            toast.error(err.message || "Failed to leave session");
        }
    };

    if (loading) {
        return (
            <div style={overlayStyle}>
                <div style={loadingStyle}>
                    <div style={spinnerStyle} />
                    <p>Loading session...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return (
            <div style={overlayStyle}>
                <div style={errorContainerStyle}>
                    <p>Session not found</p>
                    <button onClick={onClose} style={buttonSecondaryStyle}>Close</button>
                </div>
            </div>
        );
    }

    const isHost = (session.hostId?._id || session.hostId)?.toString() === currentUserId?.toString();
    const activeParticipants = session.participants?.filter(
        p => !["left", "disconnected"].includes(p.status)
    ) || [];

    const meInSession = session.participants?.find(
        p => (p.userId?._id || p.userId)?.toString() === currentUserId?.toString()
    );
    const myStatus = meInSession?.status || "waiting";



    const lobbyParticipants = session.participants?.filter(
        p => ["waiting", "ready"].includes(p.status)
    ) || [];
    const allReady = lobbyParticipants.length > 0 && lobbyParticipants.every(p => p.status === "ready");

    // Responsive styles
    const responsiveRoomStyle = {
        ...roomStyle,
        gridTemplateColumns: isMobile ? "1fr" : "1fr 280px",
        maxWidth: isMobile ? "100%" : "900px",
        borderRadius: isMobile ? "0" : "1.5rem",
        maxHeight: isMobile ? "100vh" : "90vh",
    };

    const responsiveContentStyle = {
        ...contentStyle,
        padding: isMobile ? "1.5rem 1rem" : "2rem",
        minHeight: isMobile ? "300px" : "400px",
    };

    const responsiveSidebarStyle = {
        ...sidebarStyle,
        display: isMobile && !showSidebar ? "none" : "block",
        position: isMobile ? "fixed" : "relative",
        inset: isMobile ? "0" : "auto",
        zIndex: isMobile ? 1200 : "auto",
        background: isMobile ? "rgba(15, 23, 42, 0.98)" : sidebarStyle.background,
        borderRadius: isMobile ? "0" : "0",
    };

    return (
        <div style={overlayStyle}>
            <div style={responsiveRoomStyle}>
                {/* Header */}
                <div style={headerStyle}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <h2 style={{ fontSize: isMobile ? "1.2rem" : "1.5rem", fontWeight: 700, color: "#f8fafc", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {session.title}
                        </h2>
                        <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: "0.25rem" }}>
                            {session.communityId?.name || "Community Session"}
                        </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        {!isMobile && getPhaseIndicator(session.status)}
                        {isMobile && (
                            <button
                                onClick={() => setShowSidebar(!showSidebar)}
                                style={{
                                    ...closeButtonStyle,
                                    position: "relative",
                                }}
                            >
                                <UserGroupIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                                <span style={{
                                    position: "absolute",
                                    top: "-4px",
                                    right: "-4px",
                                    background: "#38bdf8",
                                    borderRadius: "50%",
                                    width: "18px",
                                    height: "18px",
                                    fontSize: "0.7rem",
                                    fontWeight: 700,
                                    color: "#0f172a",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                    {activeParticipants.length}
                                </span>
                            </button>
                        )}
                        <button onClick={handleLeave} style={closeButtonStyle}>
                            <XMarkIcon style={{ width: "1.5rem", height: "1.5rem" }} />
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div style={responsiveContentStyle}>
                    {/* LOBBY STATE */}
                    {session.status === "lobby" && (
                        <div style={lobbyStyle}>
                            <div style={lobbyIconStyle}>🎯</div>
                            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f8fafc", margin: 0 }}>
                                Waiting for everyone to get ready
                            </h3>
                            <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>
                                {session.settings?.focusDuration} min focus session
                                {session.settings?.relaxationActivity && ` with ${session.settings.relaxationDuration} min relaxation`}
                            </p>

                            <div style={lobbyButtonsStyle}>
                                {myStatus === "waiting" ? (
                                    <button onClick={handleReady} style={readyButtonStyle}>
                                        <CheckCircleIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                                        I'm Ready!
                                    </button>
                                ) : (
                                    <div style={readyBadgeStyle}>
                                        <CheckCircleIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                                        You're ready!
                                    </div>
                                )}

                                {isHost && (
                                    <button
                                        onClick={handleStart}
                                        disabled={!allReady && activeParticipants.length > 1}
                                        style={{
                                            ...startButtonStyle,
                                            opacity: (!allReady && activeParticipants.length > 1) ? 0.5 : 1,
                                        }}
                                    >
                                        <PlayIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                                        {allReady || activeParticipants.length === 1 ? "Start Session" : "Waiting for all..."}
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* RELAXATION STATE */}
                    {session.status === "relaxation" && (
                        <div style={phaseStyle}>
                            <div style={phaseIconStyle}>🧘</div>
                            <h3 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#a855f7", margin: 0 }}>
                                Relaxation Time
                            </h3>
                            <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>
                                {session.settings?.relaxationActivity === "meditation" && "Take a moment to clear your mind..."}
                                {session.settings?.relaxationActivity === "breathing" && "Follow the breathing pattern..."}
                                {session.settings?.relaxationActivity === "music" && "Enjoy the calming music..."}
                                {session.settings?.relaxationActivity === "stretching" && "Stretch and prepare your body..."}
                            </p>

                            {isHost && (
                                <button onClick={handleAdvance} style={advanceButtonStyle}>
                                    <ArrowRightIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                                    Skip to Focus
                                </button>
                            )}
                        </div>
                    )}

                    {/* FOCUS STATE */}
                    {session.status === "focus" && (
                        <div style={phaseStyle}>
                            <div style={timerDisplayStyle}>
                                {formatTime(timeRemaining)}
                            </div>
                            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f59e0b", margin: 0 }}>
                                Focus Mode Active
                            </h3>
                            <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>
                                Stay focused with your group!
                            </p>

                            {isHost && timeRemaining !== null && timeRemaining <= 0 && (
                                <button onClick={handleAdvance} style={advanceButtonStyle}>
                                    <ArrowRightIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                                    {session.settings?.breakDuration > 0 ? "Start Break" : "Complete Session"}
                                </button>
                            )}
                        </div>
                    )}

                    {/* BREAK STATE */}
                    {session.status === "break" && (
                        <div style={phaseStyle}>
                            <div style={phaseIconStyle}>☕</div>
                            <h3 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#3b82f6", margin: 0 }}>
                                Break Time
                            </h3>
                            <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>
                                Great work! Take a well-deserved break.
                            </p>

                            {isHost && (
                                <button onClick={handleAdvance} style={advanceButtonStyle}>
                                    <CheckCircleIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                                    Complete Session
                                </button>
                            )}
                        </div>
                    )}

                    {/* COMPLETED STATE */}
                    {session.status === "completed" && (
                        <div style={phaseStyle}>
                            <div style={celebrationStyle}>🎉</div>
                            <h3 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#22c55e", margin: 0 }}>
                                Session Complete!
                            </h3>
                            <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>
                                You focused for {session.settings?.focusDuration} minutes together!
                            </p>
                            <div style={statsBoxStyle}>
                                <div>
                                    <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#38bdf8" }}>
                                        {session.stats?.participantCount || activeParticipants.length}
                                    </span>
                                    <span style={{ color: "#94a3b8", fontSize: "0.85rem", display: "block" }}>Participants</span>
                                </div>
                                <div>
                                    <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#22c55e" }}>
                                        {session.settings?.focusDuration}
                                    </span>
                                    <span style={{ color: "#94a3b8", fontSize: "0.85rem", display: "block" }}>Minutes Focused</span>
                                </div>
                            </div>
                            <button onClick={onClose} style={closeSessionButtonStyle}>
                                Close
                            </button>
                        </div>
                    )}
                </div>

                {/* Participants Sidebar */}
                <div style={responsiveSidebarStyle}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <UserGroupIcon style={{ width: "1.25rem", height: "1.25rem", color: "#38bdf8" }} />
                            <span style={{ fontWeight: 600, color: "#f8fafc" }}>
                                Participants ({activeParticipants.length})
                            </span>
                        </div>
                        {isMobile && (
                            <button
                                onClick={() => setShowSidebar(false)}
                                style={closeButtonStyle}
                            >
                                <XMarkIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                            </button>
                        )}
                    </div>

                    <div style={participantListStyle}>
                        {activeParticipants.map(p => (
                            <div key={p.userId?._id || p.userId} style={participantItemStyle}>
                                <div style={participantAvatarStyle}>
                                    {(p.userId?.username || "?").slice(0, 2).toUpperCase()}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ color: "#f8fafc", fontWeight: 500, fontSize: "0.9rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                        {p.userId?.username || "Unknown"}
                                        {(p.userId?._id || p.userId || "").toString() === currentUserId?.toString() && (
                                            <span style={{ color: "#38bdf8", marginLeft: "0.25rem" }}>(You)</span>
                                        )}
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.2rem" }}>
                                        <span style={{ fontSize: "0.75rem", color: getStatusColor(p.status) }}>
                                            {getStatusText(p.status)}
                                        </span>
                                        {(p.userId?._id || p.userId || "").toString() === (session.hostId?._id || session.hostId || "").toString() && (
                                            <span style={hostBadgeStyle}>Host</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper functions
const getPhaseIndicator = (status) => {
    const phases = {
        lobby: { text: "Lobby", color: "#22c55e" },
        relaxation: { text: "Relaxation", color: "#a855f7" },
        focus: { text: "Focus", color: "#f59e0b" },
        break: { text: "Break", color: "#3b82f6" },
        completed: { text: "Completed", color: "#22c55e" },
        cancelled: { text: "Cancelled", color: "#ef4444" },
    };
    const phase = phases[status] || phases.lobby;

    return (
        <span style={{
            padding: "0.4rem 1rem",
            borderRadius: "999px",
            fontSize: "0.85rem",
            fontWeight: 600,
            background: `${phase.color}20`,
            color: phase.color,
            border: `1px solid ${phase.color}40`,
        }}>
            {phase.text}
        </span>
    );
};

const getStatusColor = (status) => {
    const colors = {
        waiting: "#94a3b8",
        ready: "#22c55e",
        active: "#38bdf8",
        paused: "#f59e0b",
        completed: "#22c55e",
        disconnected: "#ef4444",
    };
    return colors[status] || "#94a3b8";
};

const getStatusText = (status) => {
    const texts = {
        waiting: "Waiting...",
        ready: "Ready ✓",
        active: "Focusing",
        paused: "Paused",
        completed: "Completed",
        disconnected: "Disconnected",
    };
    return texts[status] || status;
};

// Styles
const overlayStyle = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1100,
    padding: "1rem",
};

const roomStyle = {
    background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    borderRadius: "1.5rem",
    width: "100%",
    maxWidth: "900px",
    maxHeight: "90vh",
    display: "grid",
    gridTemplateColumns: "1fr 280px",
    gridTemplateRows: "auto 1fr",
    border: "1px solid rgba(56, 189, 248, 0.2)",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    overflow: "hidden",
};

const headerStyle = {
    gridColumn: "1 / -1",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.25rem 1.5rem",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
};

const contentStyle = {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "400px",
};

const sidebarStyle = {
    background: "rgba(0,0,0,0.2)",
    padding: "1.25rem",
    borderLeft: "1px solid rgba(255,255,255,0.1)",
    overflowY: "auto",
};

const lobbyStyle = {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
};

const lobbyButtonsStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    marginTop: "2rem",
    flexWrap: "wrap",
};

const lobbyIconStyle = {
    fontSize: "4rem",
    marginBottom: "1rem",
};

const phaseStyle = {
    textAlign: "center",
};

const phaseIconStyle = {
    fontSize: "5rem",
    marginBottom: "1rem",
};

const timerDisplayStyle = {
    fontSize: "5rem",
    fontWeight: 800,
    color: "#f59e0b",
    fontFamily: "monospace",
    marginBottom: "1rem",
    textShadow: "0 0 30px rgba(245, 158, 11, 0.3)",
};

const celebrationStyle = {
    fontSize: "5rem",
    marginBottom: "1rem",
    animation: "bounce 1s ease infinite",
};

const statsBoxStyle = {
    display: "flex",
    gap: "3rem",
    justifyContent: "center",
    marginTop: "1.5rem",
    padding: "1.5rem",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "1rem",
};

const participantListStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
};

const participantItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem",
    borderRadius: "0.75rem",
    background: "rgba(255,255,255,0.05)",
};

const participantAvatarStyle = {
    width: "2.25rem",
    height: "2.25rem",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "#fff",
    flexShrink: 0, // Prevent distortion
};

const hostBadgeStyle = {
    padding: "0.2rem 0.5rem",
    borderRadius: "0.25rem",
    fontSize: "0.7rem",
    fontWeight: 600,
    background: "rgba(245, 158, 11, 0.2)",
    color: "#f59e0b",
};

const closeButtonStyle = {
    background: "rgba(255,255,255,0.1)",
    border: "none",
    borderRadius: "0.5rem",
    padding: "0.5rem",
    cursor: "pointer",
    color: "#94a3b8",
};

const readyButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "1rem 2rem",
    borderRadius: "0.75rem",
    border: "none",
    fontWeight: 700,
    fontSize: "1rem",
    cursor: "pointer",
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    color: "#fff",
    // marginTop removed, handled by container
};

const readyBadgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "1rem 2rem",
    borderRadius: "0.75rem",
    fontWeight: 600,
    fontSize: "1rem",
    background: "rgba(34, 197, 94, 0.15)",
    color: "#22c55e",
    // marginTop removed
};

const startButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "1rem 2rem",
    borderRadius: "0.75rem",
    border: "none",
    fontWeight: 700,
    fontSize: "1rem",
    cursor: "pointer",
    background: "linear-gradient(135deg, #38bdf8, #60a5fa)",
    color: "#0f172a",
    // marginTop removed
};

const advanceButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.875rem 1.5rem",
    borderRadius: "0.75rem",
    border: "none",
    fontWeight: 600,
    fontSize: "0.95rem",
    cursor: "pointer",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
    marginTop: "1.5rem",
};

const closeSessionButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.875rem 2rem",
    borderRadius: "0.75rem",
    border: "none",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    background: "rgba(255,255,255,0.1)",
    color: "#f8fafc",
    marginTop: "1.5rem",
};

const loadingStyle = {
    textAlign: "center",
    color: "#f8fafc",
};

const spinnerStyle = {
    width: "3rem",
    height: "3rem",
    border: "3px solid rgba(255,255,255,0.1)",
    borderTopColor: "#38bdf8",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto 1rem",
};

const errorContainerStyle = {
    textAlign: "center",
    color: "#fca5a5",
    padding: "2rem",
    background: "rgba(239, 68, 68, 0.1)",
    borderRadius: "1rem",
};

const errorBannerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.75rem 1.5rem",
    background: "rgba(239, 68, 68, 0.1)",
    borderBottom: "1px solid rgba(239, 68, 68, 0.3)",
    color: "#fca5a5",
    gridColumn: "1 / -1",
};

const buttonSecondaryStyle = {
    padding: "0.75rem 1.5rem",
    borderRadius: "0.5rem",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "transparent",
    color: "#f8fafc",
    cursor: "pointer",
    marginTop: "1rem",
};

export default GroupSessionRoom;
