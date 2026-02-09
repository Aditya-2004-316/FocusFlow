import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext(null);

const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const SocketProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [connectionError, setConnectionError] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) {
            // Disconnect if user logs out
            if (socket) {
                socket.disconnect();
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
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
        });

        newSocket.on("connect", () => {
            console.log("Socket connected:", newSocket.id);
            setIsConnected(true);
            setConnectionError(null);
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

        setSocket(newSocket);

        // Cleanup on unmount
        return () => {
            newSocket.disconnect();
        };
    }, [isAuthenticated]);

    // Join a session room
    const joinSession = useCallback((sessionId) => {
        if (socket && isConnected) {
            socket.emit("session:join", sessionId);
        }
    }, [socket, isConnected]);

    // Leave a session room
    const leaveSession = useCallback((sessionId) => {
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
