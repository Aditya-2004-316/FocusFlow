import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext(null);

const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const SocketProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [connectionError, setConnectionError] = useState(null);

    // Track the active session so we can re-join after a reconnect
    const activeSessionIdRef = useRef(null);
    // Keep a stable ref to the socket so visibility handlers can access it
    const socketRef = useRef(null);

    useEffect(() => {
        if (!isAuthenticated) {
            // Disconnect if user logs out
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
                setSocket(null);
                setIsConnected(false);
            }
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) return;

        // Create socket connection
        const newSocket = io(SOCKET_URL, {
            auth: { token },
            transports: ["websocket", "polling"],
            reconnection: true,
            reconnectionAttempts: Infinity,   // Never stop trying
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
        });

        newSocket.on("connect", () => {
            console.log("Socket connected:", newSocket.id);
            setIsConnected(true);
            setConnectionError(null);

            // If we were in a session when we lost connection, re-join it now
            if (activeSessionIdRef.current) {
                console.log("Re-joining session after reconnect:", activeSessionIdRef.current);
                newSocket.emit("session:join", activeSessionIdRef.current);
            }
        });

        newSocket.on("disconnect", (reason) => {
            console.log("Socket disconnected:", reason);
            setIsConnected(false);
        });

        newSocket.on("connect_error", (error) => {
            console.error("Socket connection error:", error.message);
            setConnectionError(error.message);
            setIsConnected(false);
        });

        newSocket.on("error", (error) => {
            console.error("Socket error:", error);
            setConnectionError(error.message);
        });

        socketRef.current = newSocket;
        setSocket(newSocket);

        // ── Page Visibility API ──────────────────────────────────────────────
        // When the user switches back to the tab after doing their actual work,
        // immediately fire a heartbeat and re-join the session room if needed.
        // This prevents the server from marking them as disconnected.
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                const sock = socketRef.current;
                if (!sock) return;

                if (!sock.connected) {
                    // Socket dropped while in background – reconnect immediately
                    console.log("Tab became visible — reconnecting socket");
                    sock.connect();
                } else {
                    // Socket still alive — just fire an immediate heartbeat and
                    // re-join the session room to refresh lastSeen on the server
                    if (activeSessionIdRef.current) {
                        console.log("Tab became visible — re-joining session and sending heartbeat");
                        sock.emit("session:join", activeSessionIdRef.current);
                        sock.emit("heartbeat", activeSessionIdRef.current);
                    }
                }
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Cleanup on unmount
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            newSocket.disconnect();
            socketRef.current = null;
        };
    }, [isAuthenticated]);

    // Join a session room
    const joinSession = useCallback((sessionId) => {
        // Track session so we can auto-rejoin on reconnect / visibility restore
        activeSessionIdRef.current = sessionId;
        if (socket && isConnected) {
            socket.emit("session:join", sessionId);
        }
    }, [socket, isConnected]);

    // Leave a session room
    const leaveSession = useCallback((sessionId) => {
        // Clear tracked session so we don't rejoin after they intentionally left
        activeSessionIdRef.current = null;
        if (socket && isConnected) {
            socket.emit("session:leave", sessionId);
        }
    }, [socket, isConnected]);

    // Update participant status
    const updateStatus = useCallback((sessionId, status) => {
        if (socket && isConnected) {
            socket.emit("participant:status", { sessionId, status });
        }
    }, [socket, isConnected]);

    // Start a session (host only)
    const startSession = useCallback((sessionId) => {
        if (socket && isConnected) {
            socket.emit("session:start", sessionId);
        }
    }, [socket, isConnected]);

    // Advance session to next phase (host only)
    const advanceSession = useCallback((sessionId) => {
        if (socket && isConnected) {
            socket.emit("session:advance", sessionId);
        }
    }, [socket, isConnected]);

    // Send heartbeat
    const sendHeartbeat = useCallback((sessionId) => {
        if (socket && isConnected) {
            socket.emit("heartbeat", sessionId);
        }
    }, [socket, isConnected]);

    // Subscribe to an event
    const subscribe = useCallback((event, callback) => {
        if (socket) {
            socket.on(event, callback);
            return () => socket.off(event, callback);
        }
        return () => { };
    }, [socket]);

    const value = {
        socket,
        isConnected,
        connectionError,
        joinSession,
        leaveSession,
        updateStatus,
        startSession,
        advanceSession,
        sendHeartbeat,
        subscribe,
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};

export default SocketContext;
