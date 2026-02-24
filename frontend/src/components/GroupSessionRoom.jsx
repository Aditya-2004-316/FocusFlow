import { useState, useEffect, useCallback, useRef } from "react";
import { useSocket } from "../context/SocketContext";
import { useToast } from "../context/ToastContext";
import { useTheme } from "../context/ThemeContext";
import { groupSessionAPI } from "../utils/groupSessionAPI";
import {
    XMarkIcon,
    PlayIcon,
    PauseIcon,
    ArrowRightIcon,
    CheckCircleIcon,
    UserGroupIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/outline";
import MeditationRelaxation from "./relaxation/MeditationRelaxation";
import MusicRelaxation from "./relaxation/MusicRelaxation";
import ThoughtDumpRelaxation from "./relaxation/ThoughtDumpRelaxation";
import CalmingGameRelaxation from "./relaxation/CalmingGameRelaxation";
import DoodlePadRelaxation from "./relaxation/DoodlePadRelaxation";
import AffirmationsRelaxation from "./relaxation/AffirmationsRelaxation";

const GroupSessionRoom = ({ sessionId, currentUserId, onClose }) => {
    const { socket, isConnected, subscribe, joinSession, leaveSession, updateStatus, startSession, advanceSession, sendHeartbeat } = useSocket();
    const toast = useToast();
    const { isDarkMode } = useTheme();

    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeRemaining, setTimeRemaining] = useState(null);
    const [breakTimeRemaining, setBreakTimeRemaining] = useState(null);
    const [relaxationModalOpen, setRelaxationModalOpen] = useState(false);
    // Track number of times the relaxation activity modal has been opened this session (max 2)
    const [relaxationUseCount, setRelaxationUseCount] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [showSidebar, setShowSidebar] = useState(false);

    const heartbeatRef = useRef(null);
    const timerRef = useRef(null);
    const loadingRef = useRef(false);
    const hasJoinedRef = useRef(false);
    const clockOffsetRef = useRef(0);
    // Keep a ref to the latest session for the timer + poll to access without stale closures
    const sessionRef = useRef(null);

    // Handle window resize for responsive layout
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Tracks whether an error has already been shown for this session load
    // so the background poll never spams the user with repeated toasts.
    const loadErrorShownRef = useRef(false);

    // Load session data
    const loadSession = useCallback(async (silent = false) => {
        // Prevent concurrent loads
        if (loadingRef.current) return;

        loadingRef.current = true;
        try {
            const data = await groupSessionAPI.getGroupSession(sessionId);
            setSession(data.data);
            loadErrorShownRef.current = false; // Reset on success
        } catch (err) {
            // Silent background polls should NEVER show a toast —
            // the socket keeps state in sync; a transient HTTP failure
            // doesn't need to spam the user.
            if (!silent && !loadErrorShownRef.current) {
                loadErrorShownRef.current = true;
                toast.error(err.message || "Failed to load session");
            }
        } finally {
            setLoading(false);
            loadingRef.current = false;
        }
    }, [sessionId, toast]);

    // Initial load and socket join
    useEffect(() => {
        loadSession(false); // Show error toast only on initial load

        if (isConnected && !hasJoinedRef.current) {
            joinSession(sessionId);
            hasJoinedRef.current = true;
        }

        return () => {
            if (heartbeatRef.current) clearInterval(heartbeatRef.current);
            if (timerRef.current) clearInterval(timerRef.current);
            loadingRef.current = false;
        };
    }, [sessionId, isConnected, joinSession, loadSession]);

    // Heartbeat — sent via SOCKET only (the HTTP heartbeat endpoint was a duplicate
    // that caused extra DB writes and added to the race-condition load).
    // sendHeartbeat() emits a socket event; the server handles lastSeen atomically.
    useEffect(() => {
        if (isConnected && sessionId) {
            // Send at 10s intervals — tighter than 15s so browser throttling
            // (which can stretch intervals to ~60s in background tabs) still
            // fits within the 2-minute server disconnect threshold.
            heartbeatRef.current = setInterval(() => {
                sendHeartbeat(sessionId);
            }, 10000);
        }
        return () => {
            if (heartbeatRef.current) clearInterval(heartbeatRef.current);
        };
    }, [isConnected, sessionId, sendHeartbeat]);

    // Page Visibility API — secondary safety net inside GroupSessionRoom.
    // When the user returns to this tab after doing their actual work in another
    // app/window, immediately punch a heartbeat to the server so it knows the
    // participant is still alive. This complements the SocketContext-level
    // handler which re-joins the socket room on reconnect.
    useEffect(() => {
        if (!sessionId) return;

        const handleVisibilityRestore = () => {
            if (document.visibilityState === "visible" && isConnected) {
                // Burst heartbeat — update lastSeen right now instead of waiting
                // for the next timer tick (which may have been suppressed).
                sendHeartbeat(sessionId);
                // Also re-join the socket room in case the socket silently lost
                // membership while backgrounded (common on mobile browsers).
                joinSession(sessionId);
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityRestore);
        return () => document.removeEventListener("visibilitychange", handleVisibilityRestore);
    }, [sessionId, isConnected, sendHeartbeat, joinSession]);

    // Safety-net poll: re-fetches session every 8s in case a socket event was missed.
    // Stops automatically once session reaches a terminal state so it never
    // keeps hammering the API after the session ends (which was causing the
    // "unlimited repeated API errors" your friends saw).
    useEffect(() => {
        if (!sessionId) return;

        const syncInterval = setInterval(() => {
            // Don't poll anymore once session is done — socket already closed the room
            const currentStatus = sessionRef.current?.status;
            if (currentStatus === "completed" || currentStatus === "cancelled") {
                clearInterval(syncInterval);
                return;
            }
            loadSession(true); // silent=true so errors are swallowed
        }, 8000);

        return () => clearInterval(syncInterval);
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

    // Keep sessionRef current whenever session state changes
    useEffect(() => {
        sessionRef.current = session;
    }, [session]);

    // Robust Timer - Runs independently of session updates to prevent "stuck" timer
    // Uses clock offset to sync with server time for consistent countdown across all clients
    useEffect(() => {
        const timerId = setInterval(() => {
            const currentSession = sessionRef.current;
            const now = Date.now() - clockOffsetRef.current;

            if (currentSession?.status === "focus" && currentSession?.timeline?.focusEndsAt) {
                const endTime = new Date(currentSession.timeline.focusEndsAt).getTime();
                setTimeRemaining(Math.max(0, endTime - now));
            } else if (currentSession?.status === "break" && currentSession?.timeline?.breakEndsAt) {
                const endTime = new Date(currentSession.timeline.breakEndsAt).getTime();
                setBreakTimeRemaining(Math.max(0, endTime - now));
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
            // Signal SocketContext to clear its session-tracking ref so it
            // won't automatically rejoin this room later.
            leaveSession(sessionId);
            await groupSessionAPI.leaveGroupSession(sessionId);
            onClose();
        } catch (err) {
            toast.error(err.message || "Failed to leave session");
        }
    };



    // ---- Compute all style variables BEFORE any early returns ----
    // (Avoids "Cannot access before initialization" TDZ errors in loading/error states)
    const currentOverlayStyle = overlayStyle(isDarkMode);
    const currentHeaderStyle = headerStyleFn(isDarkMode);
    const currentCloseButtonStyle = closeButtonStyleFn(isDarkMode);
    const currentStatsBoxStyle = statsBoxStyleFn(isDarkMode);

    if (loading) {
        return (
            <div style={currentOverlayStyle}>
                <div style={loadingStyle(isDarkMode)}>
                    <div style={spinnerStyle(isDarkMode)} />
                    <p>Loading session...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return (
            <div style={currentOverlayStyle}>
                <div style={errorContainerStyle(isDarkMode)}>
                    <p>Session not found</p>
                    <button onClick={onClose} style={{ padding: "0.75rem 1.5rem", borderRadius: "0.5rem", border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.2)" : "#e2e8f0"}`, background: isDarkMode ? "transparent" : "#ffffff", color: isDarkMode ? "#f8fafc" : "#0f172a", cursor: "pointer" }}>Close</button>
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
        ...roomStyle(isDarkMode),
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

    const sidebarStyleVal = sidebarStyleFn(isDarkMode);
    const responsiveSidebarStyle = {
        ...sidebarStyleVal,
        display: isMobile && !showSidebar ? "none" : "block",
        position: isMobile ? "fixed" : "relative",
        inset: isMobile ? "0" : "auto",
        zIndex: isMobile ? 1200 : "auto",
        background: isMobile ? (isDarkMode ? "rgba(15, 23, 42, 0.98)" : "rgba(255, 255, 255, 0.98)") : sidebarStyleVal.background,
        borderRadius: isMobile ? "0" : "0",
    };

    return (
        <div style={currentOverlayStyle}>
            <div style={responsiveRoomStyle}>
                {/* Header */}
                <div style={currentHeaderStyle}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <h2 style={{ fontSize: isMobile ? "1.2rem" : "1.5rem", fontWeight: 700, color: isDarkMode ? "#f8fafc" : "#0f172a", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {session.title}
                        </h2>
                        <p style={{ color: isDarkMode ? "#94a3b8" : "#64748b", fontSize: "0.85rem", marginTop: "0.25rem" }}>
                            {session.communityId?.name || "Community Session"}
                        </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        {!isMobile && getPhaseIndicator(session.status)}
                        {isMobile && (
                            <button
                                onClick={() => setShowSidebar(!showSidebar)}
                                style={{
                                    ...currentCloseButtonStyle,
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
                        <button onClick={handleLeave} style={currentCloseButtonStyle}>
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
                            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: isDarkMode ? "#f8fafc" : "#0f172a", margin: 0 }}>
                                Waiting for everyone to get ready
                            </h3>
                            <p style={{ color: isDarkMode ? "#94a3b8" : "#64748b", marginTop: "0.5rem" }}>
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

                            {/* Lobby connectivity tip */}
                            <div style={{ ...connectivityTipStyle(isDarkMode), marginTop: "2rem" }}>
                                <InformationCircleIcon style={{ width: "1.1rem", height: "1.1rem", flexShrink: 0, color: "#38bdf8" }} />
                                <span style={{ textAlign: "left" }}>
                                    <strong>Heads-up:</strong> Once the session starts, you can switch to your work app — this page will stay active in the background.
                                    Just peek back here <strong>at least once every 9 minutes</strong> so the app knows you're still focusing.
                                </span>
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
                            <p style={{ color: isDarkMode ? "#94a3b8" : "#64748b", marginTop: "0.5rem" }}>
                                {session.settings?.relaxationActivity === "music" && "Relaxing soundscapes to set the mood."}
                                {session.settings?.relaxationActivity === "meditation" && "Mini meditation before your focus session."}
                                {session.settings?.relaxationActivity === "thoughtDump" && "Clear your mind with a thought dump."}
                                {session.settings?.relaxationActivity === "calmingGame" && "Enjoy a short calming game."}
                                {session.settings?.relaxationActivity === "doodlePad" && "Free-draw on the doodle pad."}
                                {session.settings?.relaxationActivity === "affirmations" && "Positive affirmations to start strong."}
                            </p>

                            {/* Max 2 uses per session */}
                            {relaxationUseCount < 2 ? (
                                <button
                                    onClick={() => {
                                        setRelaxationUseCount(c => c + 1);
                                        setRelaxationModalOpen(true);
                                    }}
                                    style={{
                                        ...advanceButtonStyle,
                                        background: "linear-gradient(135deg, #a855f7, #7c3aed)",
                                        marginTop: "1.5rem",
                                    }}
                                >
                                    <PlayIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                                    Open Relaxation Activity
                                    {relaxationUseCount === 1 && " (Last use)"}
                                </button>
                            ) : (
                                <div style={{
                                    marginTop: "1.5rem",
                                    padding: "0.75rem 1.25rem",
                                    borderRadius: "0.85rem",
                                    background: isDarkMode ? "rgba(168,85,247,0.1)" : "rgba(168,85,247,0.08)",
                                    border: "1px solid rgba(168,85,247,0.3)",
                                    color: "#a855f7",
                                    fontSize: "0.9rem",
                                    fontWeight: 600,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                }}>
                                    ✅ You've completed this activity (max 2 uses per session)
                                </div>
                            )}

                            {/* Relaxation connectivity tip */}
                            <div style={{ ...connectivityTipStyle(isDarkMode), marginTop: "1.5rem" }}>
                                <InformationCircleIcon style={{ width: "1.1rem", height: "1.1rem", flexShrink: 0, color: "#a855f7" }} />
                                <span>
                                    Feel free to step away briefly — the session runs in the background.
                                    Return <strong>within 9 minutes</strong> to stay counted as active.
                                </span>
                            </div>

                            {isHost && (
                                <button onClick={handleAdvance} style={advanceButtonStyle}>
                                    <ArrowRightIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                                    Skip to Focus
                                </button>
                            )}
                        </div>
                    )}

                    {/* Relaxation Activity Modals */}
                    {session.status === "relaxation" && (() => {
                        const activity = session.settings?.relaxationActivity;
                        const commonProps = {
                            isOpen: relaxationModalOpen,
                            onClose: () => setRelaxationModalOpen(false),
                            onSkipToFocus: isHost ? () => { setRelaxationModalOpen(false); handleAdvance(); } : () => setRelaxationModalOpen(false),
                        };
                        if (activity === "meditation") return <MeditationRelaxation {...commonProps} />;
                        if (activity === "music") return <MusicRelaxation {...commonProps} />;
                        if (activity === "thoughtDump") return <ThoughtDumpRelaxation {...commonProps} />;
                        if (activity === "calmingGame") return <CalmingGameRelaxation {...commonProps} />;
                        if (activity === "doodlePad") return <DoodlePadRelaxation {...commonProps} />;
                        if (activity === "affirmations") return <AffirmationsRelaxation {...commonProps} />;
                        return null;
                    })()}

                    {/* FOCUS STATE */}
                    {session.status === "focus" && (
                        <div style={phaseStyle}>
                            <div style={timerDisplayStyle}>
                                {formatTime(timeRemaining)}
                            </div>
                            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f59e0b", margin: 0 }}>
                                Focus Mode Active
                            </h3>
                            <p style={{ color: isDarkMode ? "#94a3b8" : "#64748b", marginTop: "0.5rem" }}>
                                Stay focused with your group!
                            </p>

                            {/* Focus connectivity tip */}
                            <div style={{ ...connectivityTipStyle(isDarkMode), marginTop: "1.5rem" }}>
                                <InformationCircleIcon style={{ width: "1.1rem", height: "1.1rem", flexShrink: 0, color: "#f59e0b" }} />
                                <span>
                                    You can switch to your work app now — the session keeps running here.
                                    Come back <strong>at least once every 9 minutes</strong> to stay counted as active.
                                </span>
                            </div>

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
                            <p style={{ color: isDarkMode ? "#94a3b8" : "#64748b", marginTop: "0.5rem" }}>
                                Great work! Take a well-deserved break.
                            </p>

                            {/* Break countdown */}
                            {session.timeline?.breakEndsAt && (
                                <div style={{ ...timerDisplayStyle, fontSize: "2.5rem", color: "#3b82f6", marginTop: "1rem" }}>
                                    {formatTime(breakTimeRemaining)}
                                </div>
                            )}

                            {/* Break connectivity tip */}
                            <div style={{ ...connectivityTipStyle(isDarkMode), marginTop: "1.5rem" }}>
                                <InformationCircleIcon style={{ width: "1.1rem", height: "1.1rem", flexShrink: 0, color: "#3b82f6" }} />
                                <span>
                                    Enjoy your break! Just pop back here <strong>within 9 minutes</strong> so you're not marked as disconnected.
                                    The session will complete automatically when the break ends.
                                </span>
                            </div>

                            {isHost && (
                                <button onClick={handleAdvance} style={advanceButtonStyle}>
                                    <CheckCircleIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                                    End Break Early
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
                            <p style={{ color: isDarkMode ? "#94a3b8" : "#64748b", marginTop: "0.5rem" }}>
                                You focused for {session.settings?.focusDuration} minutes together!
                            </p>
                            <div style={currentStatsBoxStyle}>
                                <div>
                                    <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#38bdf8" }}>
                                        {session.stats?.participantCount || activeParticipants.length}
                                    </span>
                                    <span style={{ color: isDarkMode ? "#94a3b8" : "#64748b", fontSize: "0.85rem", display: "block" }}>Participants</span>
                                </div>
                                <div>
                                    <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#22c55e" }}>
                                        {session.settings?.focusDuration}
                                    </span>
                                    <span style={{ color: isDarkMode ? "#94a3b8" : "#64748b", fontSize: "0.85rem", display: "block" }}>Minutes Focused</span>
                                </div>
                            </div>
                            <button onClick={onClose} style={{
                                ...closeSessionButtonStyle,
                                background: isDarkMode ? "rgba(255,255,255,0.1)" : "#f1f5f9",
                                color: isDarkMode ? "#f8fafc" : "#0f172a",
                                border: isDarkMode ? "none" : "1px solid #e2e8f0"
                            }}>
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
                            <span style={{ fontWeight: 600, color: isDarkMode ? "#f8fafc" : "#0f172a" }}>
                                Participants ({activeParticipants.length})
                            </span>
                        </div>
                        {isMobile && (
                            <button
                                onClick={() => setShowSidebar(false)}
                                style={currentCloseButtonStyle}
                            >
                                <XMarkIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                            </button>
                        )}
                    </div>

                    <div style={participantListStyle}>
                        {activeParticipants.map(p => (
                            <div key={p.userId?._id || p.userId} style={participantItemStyleFn(isDarkMode)}>
                                <div style={participantAvatarStyle}>
                                    {(p.userId?.username || "?").slice(0, 2).toUpperCase()}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ color: isDarkMode ? "#f8fafc" : "#0f172a", fontWeight: 500, fontSize: "0.9rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
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
const overlayStyle = (isDarkMode) => ({
    position: "fixed",
    inset: 0,
    backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0.85)" : "rgba(15, 23, 42, 0.3)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1100,
    padding: "1rem",
});

const roomStyle = (isDarkMode) => ({
    background: isDarkMode ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" : "#ffffff",
    borderRadius: "1.5rem",
    width: "100%",
    maxWidth: "900px",
    maxHeight: "90vh",
    display: "grid",
    gridTemplateColumns: "1fr 280px",
    gridTemplateRows: "auto 1fr",
    border: `1px solid ${isDarkMode ? "rgba(56, 189, 248, 0.2)" : "#e2e8f0"}`,
    boxShadow: isDarkMode ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)" : "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
});

const headerStyleFn = (isDarkMode) => ({
    gridColumn: "1 / -1",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.25rem 1.5rem",
    borderBottom: `1px solid ${isDarkMode ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`,
});

const contentStyle = {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "400px",
};

const sidebarStyleFn = (isDarkMode) => ({
    background: isDarkMode ? "rgba(0,0,0,0.2)" : "#f8fafc",
    padding: "1.25rem",
    borderLeft: `1px solid ${isDarkMode ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`,
    overflowY: "auto",
});

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

const statsBoxStyleFn = (isDarkMode) => ({
    display: "flex",
    gap: "3rem",
    justifyContent: "center",
    marginTop: "1.5rem",
    padding: "1.5rem",
    background: isDarkMode ? "rgba(255,255,255,0.05)" : "#f1f5f9",
    borderRadius: "1rem",
});

const participantListStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
};

const participantItemStyleFn = (isDarkMode) => ({
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem",
    borderRadius: "0.75rem",
    background: isDarkMode ? "rgba(255,255,255,0.05)" : "#ffffff",
    border: isDarkMode ? "none" : "1px solid #e2e8f0",
});

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

const closeButtonStyleFn = (isDarkMode) => ({
    background: isDarkMode ? "rgba(255,255,255,0.1)" : "#f1f5f9",
    border: "none",
    borderRadius: "0.5rem",
    padding: "0.5rem",
    cursor: "pointer",
    color: isDarkMode ? "#94a3b8" : "#64748b",
});

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

const loadingStyle = (isDarkMode) => ({
    textAlign: "center",
    color: isDarkMode ? "#f8fafc" : "var(--color-gray-900)",
});

const spinnerStyle = (isDarkMode) => ({
    width: "3rem",
    height: "3rem",
    border: `3px solid ${isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(15, 23, 42, 0.1)"}`,
    borderTopColor: "#38bdf8",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto 1rem",
});

const errorContainerStyle = (isDarkMode) => ({
    textAlign: "center",
    color: isDarkMode ? "#fca5a5" : "#b91c1c",
    padding: "2rem",
    background: isDarkMode ? "rgba(239, 68, 68, 0.1)" : "#fef2f2",
    borderRadius: "1rem",
});

const errorBannerStyle = (isDarkMode) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.75rem 1.5rem",
    background: isDarkMode ? "rgba(239, 68, 68, 0.1)" : "#fef2f2",
    borderBottom: isDarkMode ? "1px solid rgba(239, 68, 68, 0.3)" : "1px solid #fca5a5",
    color: isDarkMode ? "#fca5a5" : "#b91c1c",
    gridColumn: "1 / -1",
});

const connectivityTipStyle = (isDarkMode) => ({
    display: "flex",
    alignItems: "flex-start",
    gap: "0.75rem",
    padding: "0.875rem 1rem",
    borderRadius: "0.75rem",
    background: isDarkMode ? "rgba(56, 189, 248, 0.1)" : "#f0f9ff",
    border: `1px solid ${isDarkMode ? "rgba(56, 189, 248, 0.2)" : "#bae6fd"}`,
    color: isDarkMode ? "#94a3b8" : "#475569",
    fontSize: "0.85rem",
    lineHeight: "1.4",
});

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
