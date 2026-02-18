import React, { useState, useEffect, useRef } from "react";
import {
    XMarkIcon,
    UserGroupIcon,
    CalendarIcon,
    ChatBubbleLeftRightIcon,
    ClockIcon,
    Cog6ToothIcon,
    HashtagIcon,
    PlusIcon,
    PaperAirplaneIcon,
    SparklesIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext";
import { API_BASE_URL as API_BASE } from "../config/api";
import PostCard from "./PostCard";
import GroupSessionsSection from "./GroupSessionsSection";
import { communityAPI, postAPI, chatAPI } from "../utils/communityAPI";
import { useToast } from "../context/ToastContext";
import { useConfirm } from "./ConfirmModal";
import { useSocket } from "../context/SocketContext";
import MusicRelaxation from "./relaxation/MusicRelaxation.jsx";
import MeditationRelaxation from "./relaxation/MeditationRelaxation.jsx";
import ThoughtDumpRelaxation from "./relaxation/ThoughtDumpRelaxation.jsx";
import CalmingGameRelaxation from "./relaxation/CalmingGameRelaxation.jsx";
import DoodlePadRelaxation from "./relaxation/DoodlePadRelaxation.jsx";
import AffirmationsRelaxation from "./relaxation/AffirmationsRelaxation.jsx";

const CommunityDetail = ({ isOpen, onClose, communityId, currentUserId }) => {
    const [community, setCommunity] = useState(null);
    const [posts, setPosts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [submittingMessage, setSubmittingMessage] = useState(false);
    const [isMember, setIsMember] = useState(false);
    const [memberRole, setMemberRole] = useState(null);
    const [activeChannel, setActiveChannel] = useState("focus-sessions");
    const [members, setMembers] = useState([]);
    const [loadingMembers, setLoadingMembers] = useState(false);
    const [activeRelaxationModal, setActiveRelaxationModal] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 690);
    const [isSmall, setIsSmall] = useState(window.innerWidth < 880);
    const [isTiny, setIsTiny] = useState(window.innerWidth < 380);
    const { isDarkMode } = useTheme();

    const toast = useToast();
    const confirmDialog = useConfirm();
    const { socket, isConnected } = useSocket();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 690);
            setIsSmall(window.innerWidth < 880);
            setIsTiny(window.innerWidth < 380);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (isOpen && communityId) {
            loadCommunity();
        }
    }, [isOpen, communityId]);

    useEffect(() => {
        if (isOpen && communityId && isMember) {
            if (activeChannel === "chat" || activeChannel === "discussion") {
                loadMessages();
            } else if (activeChannel === "members") {
                loadMembers();
            }
        }
    }, [isOpen, communityId, activeChannel, isMember]);

    useEffect(() => {
        if (socket && isConnected && communityId) {
            socket.emit("join_community", communityId);
            const handleChatMessage = (message) => {
                if (message.communityId === communityId) {
                    setMessages((prev) => [...prev, message]);
                }
            };
            socket.on("chat_message", handleChatMessage);
            return () => {
                socket.emit("leave_community", communityId);
                socket.off("chat_message", handleChatMessage);
            };
        }
    }, [socket, isConnected, communityId]);

    useEffect(() => { scrollToBottom(); }, [messages]);

    const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); };

    const loadCommunity = async () => {
        setLoading(true);
        try {
            const data = await communityAPI.getCommunity(communityId);
            setCommunity(data.data);
            setIsMember(data.data.isMember);
            setMemberRole(data.data.memberRole);
            if (data.data.isMember) {
                const postsData = await postAPI.getPosts(communityId, 1, 50);
                setPosts(postsData.data || []);
            }
        } catch (err) {
            toast.error(err.message || "Failed to load community");
        } finally {
            setLoading(false);
        }
    };

    const loadMessages = async () => {
        try {
            const data = await chatAPI.getMessages(communityId);
            setMessages(data.data || []);
        } catch (err) {
            console.error("Failed to load messages:", err);
        }
    };

    const loadMembers = async () => {
        setLoadingMembers(true);
        try {
            const data = await communityAPI.getMembers(communityId);
            setMembers(data.data || []);
        } catch (err) {
            toast.error("Failed to load members");
        } finally {
            setLoadingMembers(false);
        }
    };

    const handleSendMessage = async (e) => {
        if (e) e.preventDefault();
        if (!newMessage.trim() || submittingMessage) return;
        setSubmittingMessage(true);
        try {
            await chatAPI.sendMessage(communityId, newMessage.trim());
            setNewMessage("");
        } catch (err) {
            toast.error("Failed to send message");
        } finally {
            setSubmittingMessage(false);
        }
    };

    const handleAssignRole = async (userId, role) => {
        try {
            await communityAPI.assignMemberRole(communityId, userId, role);
            toast.success(`Role updated to ${role}`);
            loadMembers();
        } catch (err) {
            toast.error(err.message || "Failed to update role");
        }
    };

    const handleRemoveMember = async (userId) => {
        const confirmed = await confirmDialog({ title: "Remove Member?", message: "Sure?", confirmText: "Remove", variant: "danger" });
        if (!confirmed) return;
        try {
            await communityAPI.removeMember(communityId, userId);
            toast.success("Member removed");
            loadMembers();
        } catch (err) { toast.error(err.message || "Failed to remove member"); }
    };

    const handleJoinCommunity = async () => {
        try {
            await communityAPI.joinCommunity(communityId);
            toast.success("Successfully joined the community!");
            loadCommunity();
        } catch (err) { toast.error(err.message); }
    };

    const handleDeleteCommunity = async () => {
        const confirmed = await confirmDialog({
            title: "Delete Community?",
            message: `Are you sure you want to delete "${community?.name}"? This action is permanent and cannot be undone.`,
            confirmText: "Delete Forever",
            variant: "danger"
        });

        if (!confirmed) return;

        try {
            await communityAPI.deleteCommunity(communityId);
            toast.success("Community deleted successfully");
            onClose();
            // Refresh dashboard
            window.location.reload();
        } catch (err) {
            toast.error(err.message || "Failed to delete community");
        }
    };

    if (!isOpen || !communityId) return null;

    const isOwner = memberRole === "Owner";
    const channels = [
        { id: "focus-sessions", name: "Focus Sessions", icon: ClockIcon },
        { id: "chat", name: "Discussion", icon: HashtagIcon },
        { id: "relaxation", name: "Relaxation", icon: SparklesIcon },
        { id: "members", name: "Members", icon: UserGroupIcon },
    ];
    if (isOwner) channels.push({ id: "settings", name: "Settings", icon: Cog6ToothIcon });

    const renderChannelContent = () => {
        if (loading) return <div style={{ textAlign: "center", padding: "3rem", color: isDarkMode ? "#94a3b8" : "#64748b" }}>Loading...</div>;
        if (!isMember) return (
            <div style={{ textAlign: "center", padding: "3rem" }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔒</div>
                <h3 style={{ color: isDarkMode ? "#f8fafc" : "#0f172a", marginBottom: "0.5rem" }}>Members Only</h3>
                <p style={{ color: isDarkMode ? "#94a3b8" : "#64748b", marginBottom: "1.5rem" }}>Join this community to access channels.</p>
                <button onClick={handleJoinCommunity} style={{ padding: "0.875rem 2rem", background: isDarkMode ? "linear-gradient(135deg, #38bdf8, #60a5fa)" : "#38bdf8", border: "none", borderRadius: "0.75rem", color: isDarkMode ? "#0f172a" : "#ffffff", fontWeight: 700, cursor: "pointer" }}>Join Community</button>
            </div>
        );

        switch (activeChannel) {
            case "focus-sessions":
                return <GroupSessionsSection communityId={communityId} communityName={community?.name} currentUserId={currentUserId} />;
            case "chat":
                return (
                    <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%", minHeight: 0 }}>
                        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", minHeight: 0 }}>
                            {messages.map((msg, i) => (
                                <div key={msg._id || i} style={{ display: "flex", gap: "0.75rem" }}>
                                    <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", background: isDarkMode ? "rgba(56, 189, 248, 0.2)" : "#e0f2fe", display: "flex", alignItems: "center", justifyContent: "center", color: "#38bdf8", fontWeight: 700, flexShrink: 0 }}>
                                        {(msg.sender?.username || "?")[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                                            <span style={{ fontWeight: 600, color: isDarkMode ? "#f8fafc" : "#0f172a" }}>{msg.sender?.username}</span>
                                            <span style={{ fontSize: "0.7rem", color: isDarkMode ? "#64748b" : "#94a3b8" }}>{msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString() : "Just now"}</span>
                                        </div>
                                        <div style={{ color: isDarkMode ? "#cbd5e1" : "#334155", marginTop: "0.1rem", wordBreak: "break-word" }}>{msg.content}</div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <form onSubmit={handleSendMessage} style={{ padding: "1rem", borderTop: `1px solid ${isDarkMode ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`, display: "flex", gap: "0.75rem" }}>
                            <input type="text" placeholder={`Message #${community?.name}`} value={newMessage} onChange={(e) => setNewMessage(e.target.value)} style={{ flex: 1, padding: "0.75rem 1rem", background: isDarkMode ? "rgba(255,255,255,0.05)" : "#f8fafc", border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`, borderRadius: "0.5rem", color: isDarkMode ? "#f1f5f9" : "#0f172a", outline: "none" }} />
                            <button type="submit" style={{ background: isDarkMode ? "linear-gradient(135deg, #38bdf8, #60a5fa)" : "#38bdf8", border: "none", borderRadius: "0.5rem", width: "3rem", display: "flex", alignItems: "center", justifyContent: "center", color: isDarkMode ? "#0f172a" : "#fff", cursor: "pointer" }}>
                                <PaperAirplaneIcon style={{ width: "1.25rem", transform: "rotate(-45deg)" }} />
                            </button>
                        </form>
                    </div>
                );
            case "relaxation":
                return (
                    <div style={{ padding: "2rem", overflowY: "auto", height: "100%", minHeight: 0 }}>
                        <div style={{ display: "grid", gridTemplateColumns: isTiny ? "1fr" : (isSmall ? "repeat(2, 1fr)" : "repeat(3, 1fr)"), gap: "1.25rem" }}>
                            {[
                                { title: "Soundscapes", icon: "🎧", modal: "music", subtitle: "Ambient audio", color: "#38bdf8" },
                                { title: "Meditation", icon: "🧘", modal: "meditation", subtitle: "Breath work", color: "#a855f7" },
                                { title: "Thought Dump", icon: "📝", modal: "thoughtDump", subtitle: "Clear mind", color: "#f59e0b" },
                                { title: "Relaxing Games", icon: "🎮", modal: "calmingGame", subtitle: "Gentle play", color: "#10b981" },
                                { title: "Doodle Pad", icon: "🎨", modal: "doodlePad", subtitle: "Creative flow", color: "#ec4899" },
                                { title: "Affirmations", icon: "💬", modal: "affirmations", subtitle: "Daily positive", color: "#6366f1" }
                            ].map(item => (
                                <div
                                    key={item.title}
                                    onClick={() => setActiveRelaxationModal(item.modal)}
                                    style={{
                                        background: isDarkMode ? "rgba(255,255,255,0.03)" : "#ffffff",
                                        padding: "1.75rem 1.25rem",
                                        borderRadius: "1.25rem",
                                        border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                                        cursor: "pointer",
                                        textAlign: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: "0.75rem",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        boxShadow: isDarkMode ? "none" : "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                                        position: "relative",
                                        overflow: "hidden"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-4px)";
                                        e.currentTarget.style.borderColor = item.color;
                                        e.currentTarget.style.boxShadow = isDarkMode
                                            ? `0 10px 20px -10px ${item.color}44`
                                            : `0 10px 15px -3px ${item.color}22`;
                                        if (isDarkMode) e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.borderColor = isDarkMode ? "rgba(255,255,255,0.08)" : "#e2e8f0";
                                        e.currentTarget.style.boxShadow = isDarkMode ? "none" : "0 4px 6px -1px rgba(0, 0, 0, 0.05)";
                                        if (isDarkMode) e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                                    }}
                                >
                                    <div style={{
                                        fontSize: "2.5rem",
                                        padding: "1rem",
                                        borderRadius: "1rem",
                                        background: isDarkMode ? `rgba(${hexToRgb(item.color)}, 0.1)` : `${item.color}11`,
                                        color: item.color,
                                        width: "60px",
                                        height: "60px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginBottom: "0.5rem"
                                    }}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 style={{ color: isDarkMode ? "#f8fafc" : "#0f172a", margin: 0, fontSize: "1.1rem", fontWeight: 700 }}>{item.title}</h4>
                                        <p style={{ color: isDarkMode ? "#94a3b8" : "#64748b", margin: "0.25rem 0 0 0", fontSize: "0.85rem" }}>{item.subtitle}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case "members":
                return (
                    <div style={{ padding: "1.5rem", height: "100%", display: "flex", flexDirection: "column", minHeight: 0 }}>
                        <h3 style={{ color: isDarkMode ? "#f8fafc" : "#0f172a", marginBottom: "1rem" }}>Members ({members.length})</h3>
                        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.75rem", minHeight: 0 }}>
                            {members.map(member => (
                                <div key={member._id} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem", background: isDarkMode ? "rgba(255, 255, 255, 0.03)" : "#f8fafc", borderRadius: "0.5rem", border: isDarkMode ? "none" : "1px solid #e2e8f0" }}>
                                    <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>
                                        {(member.userId?.username || "?")[0].toUpperCase()}
                                    </div>
                                    <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{ color: isDarkMode ? "#f8fafc" : "#0f172a", fontWeight: 600 }}>{member.userId?.username}</span>
                                            <span style={{ fontSize: "0.75rem", color: isDarkMode ? "#64748b" : "#94a3b8" }}>{member.role || "Member"}</span>
                                        </div>

                                        {isOwner && member.userId?._id !== currentUserId && (
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                                <select
                                                    value={member.role}
                                                    onChange={(e) => handleAssignRole(member.userId._id, e.target.value)}
                                                    style={{
                                                        background: isDarkMode ? "#1e293b" : "#fff",
                                                        color: isDarkMode ? "#f8fafc" : "#0f172a",
                                                        border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`,
                                                        borderRadius: "0.375rem",
                                                        padding: "0.25rem 0.5rem",
                                                        fontSize: "0.85rem",
                                                        outline: "none",
                                                        cursor: "pointer"
                                                    }}
                                                >
                                                    <option value="Member">Member</option>
                                                    <option value="Moderator">Moderator</option>
                                                    <option value="Admin">Admin</option>
                                                </select>
                                                <button
                                                    onClick={() => handleRemoveMember(member.userId._id)}
                                                    style={{
                                                        background: "rgba(239, 68, 68, 0.1)",
                                                        color: "#ef4444",
                                                        border: "none",
                                                        borderRadius: "0.375rem",
                                                        padding: "0.4rem",
                                                        cursor: "pointer",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        transition: "all 0.2s"
                                                    }}
                                                    title="Remove Member"
                                                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)"}
                                                    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"}
                                                >
                                                    <TrashIcon style={{ width: "1.1rem" }} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case "settings":
                return (
                    <div style={{ padding: "1.5rem", overflowY: "auto", height: "100%", minHeight: 0 }}>
                        <h3 style={{ color: "#38bdf8", marginBottom: "1rem" }}>Settings</h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                            {/* Cleanup Section */}
                            <div style={{ background: isDarkMode ? "rgba(255, 255, 255, 0.03)" : "#f8fafc", padding: "1.5rem", borderRadius: "1rem", border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.05)" : "#e2e8f0"}` }}>
                                <h4 style={{ color: isDarkMode ? "#f8fafc" : "#0f172a", marginBottom: "0.5rem" }}>Session Management</h4>
                                <p style={{ color: isDarkMode ? "#94a3b8" : "#64748b", fontSize: "0.85rem", marginBottom: "1rem" }}>Clear all focus session history for this community.</p>
                                <button onClick={async () => {
                                    const ok = await confirmDialog({ title: "Delete Community Sessions?", message: "Are you sure? This will remove all of the sessions for this community.", variant: "danger" });
                                    if (ok) {
                                        await fetch(`${API_BASE}/group-sessions/debug/cleanup?communityId=${communityId}`, { method: "DELETE", headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } });
                                        toast.success("Sessions cleaned");
                                    }
                                }} style={{ padding: "0.6rem 1rem", background: isDarkMode ? "rgba(239, 68, 68, 0.1)" : "#fee2e2", color: "#ef4444", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "0.5rem", cursor: "pointer", fontWeight: 600 }}>Reset Sessions</button>
                            </div>

                            {/* Danger Zone */}
                            <div style={{ background: isDarkMode ? "rgba(239, 68, 68, 0.05)" : "#fff1f2", padding: "1.5rem", borderRadius: "1rem", border: `1px solid ${isDarkMode ? "rgba(239, 68, 68, 0.2)" : "#fecdd3"}` }}>
                                <h4 style={{ color: "#ef4444", marginBottom: "0.5rem" }}>Danger Zone</h4>
                                <p style={{ color: isDarkMode ? "#94a3b8" : "#64748b", fontSize: "0.85rem", marginBottom: "1rem" }}>Permanently delete this community and all its data. This cannot be undone.</p>
                                <button
                                    onClick={handleDeleteCommunity}
                                    style={{ padding: "0.6rem 1rem", background: "#ef4444", color: "#fff", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontWeight: 700 }}
                                >
                                    Delete Community
                                </button>
                            </div>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    // Helper to convert hex to rgb for rgba usage
    const hexToRgb = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r}, ${g}, ${b}`;
    };

    const handleSkipToFocus = () => {
        setActiveRelaxationModal(null);
        setActiveChannel("focus-sessions");
    };

    return (
        <div style={{ position: "fixed", inset: 0, background: isDarkMode ? "rgba(0, 0, 0, 0.85)" : "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: isMobile ? 0 : "1rem" }} onClick={onClose}>
            <div style={{ background: isDarkMode ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" : "linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)", borderRadius: isMobile ? 0 : "1rem", width: "100%", maxWidth: isMobile ? "100%" : "1100px", height: isMobile ? "100%" : "85vh", maxHeight: isMobile ? "100%" : "800px", display: "flex", flexDirection: isMobile ? "column" : "row", border: isDarkMode ? "1px solid rgba(56, 189, 248, 0.2)" : "1px solid #e2e8f0", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)", overflow: "hidden" }} onClick={(e) => e.stopPropagation()}>
                {/* Sidebar - Hidden on mobile */}
                {!isMobile && (
                    <div style={{ width: "240px", background: isDarkMode ? "rgba(0, 0, 0, 0.3)" : "#f8fafc", borderRight: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#e2e8f0"}`, display: "flex", flexDirection: "column" }}>
                        <div style={{ padding: "1.5rem", borderBottom: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#e2e8f0"}` }}>
                            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: isDarkMode ? "#f8fafc" : "#0f172a" }}>{community?.name}</h2>
                        </div>
                        <div style={{ flex: 1, padding: "0.75rem", overflowY: "auto" }}>
                            {channels.map(ch => (
                                <div key={ch.id} onClick={() => setActiveChannel(ch.id)} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem", borderRadius: "0.5rem", cursor: "pointer", background: activeChannel === ch.id ? (isDarkMode ? "rgba(56, 189, 248, 0.15)" : "#e0f2fe") : "transparent", color: activeChannel === ch.id ? "#38bdf8" : (isDarkMode ? "#94a3b8" : "#64748b"), transition: "all 0.2s", marginBottom: "0.25rem" }}>
                                    <ch.icon style={{ width: "1.2rem" }} />
                                    <span style={{ fontWeight: 500 }}>{ch.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Main Area */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", width: "100%", minHeight: 0, minWidth: 0 }}>
                    <div style={{ padding: isMobile ? "0.75rem 1rem" : "1rem 1.5rem", borderBottom: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#e2e8f0"}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: isDarkMode ? "#f8fafc" : "#0f172a", fontWeight: 700 }}>
                            {isMobile ? (
                                <span style={{ fontSize: "1rem", color: "#38bdf8" }}>{community?.name}</span>
                            ) : (
                                <>
                                    <HashtagIcon style={{ width: "1.2rem", color: "#64748b" }} />
                                    <span>{channels.find(c => c.id === activeChannel)?.name}</span>
                                </>
                            )}
                        </div>
                        <button onClick={onClose} style={{ background: "transparent", border: "none", color: isDarkMode ? "#64748b" : "#94a3b8", cursor: "pointer" }}>
                            <XMarkIcon style={{ width: "1.5rem" }} />
                        </button>
                    </div>
                    <div id="community-main-scroll" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0, width: "100%", paddingBottom: isMobile ? "70px" : 0 }}>
                        {renderChannelContent()}
                    </div>
                </div>

                {/* Mobile Bottom Navbar */}
                {isMobile && (
                    <div style={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "65px",
                        background: isDarkMode ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(12px)",
                        borderTop: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#e2e8f0"}`,
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        padding: "0 10px",
                        zIndex: 1001
                    }}>
                        {channels.map(ch => (
                            <div
                                key={ch.id}
                                onClick={() => setActiveChannel(ch.id)}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "4px",
                                    color: activeChannel === ch.id ? "#38bdf8" : (isDarkMode ? "#94a3b8" : "#64748b"),
                                    padding: "8px",
                                    flex: 1,
                                    transition: "all 0.2s"
                                }}
                            >
                                <ch.icon style={{ width: "1.4rem" }} />
                                <span style={{ fontSize: "0.65rem", fontWeight: 600 }}>{ch.name.split(' ')[0]}</span>
                                {activeChannel === ch.id && (
                                    <div style={{
                                        position: "absolute",
                                        top: 0,
                                        width: "20px",
                                        height: "3px",
                                        background: "#38bdf8",
                                        borderRadius: "0 0 4px 4px"
                                    }} />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <MusicRelaxation isOpen={activeRelaxationModal === "music"} onClose={() => setActiveRelaxationModal(null)} onSkipToFocus={handleSkipToFocus} />
            <MeditationRelaxation isOpen={activeRelaxationModal === "meditation"} onClose={() => setActiveRelaxationModal(null)} onSkipToFocus={handleSkipToFocus} />
            <ThoughtDumpRelaxation isOpen={activeRelaxationModal === "thoughtDump"} onClose={() => setActiveRelaxationModal(null)} onSkipToFocus={handleSkipToFocus} />
            <CalmingGameRelaxation isOpen={activeRelaxationModal === "calmingGame"} onClose={() => setActiveRelaxationModal(null)} onSkipToFocus={handleSkipToFocus} />
            <DoodlePadRelaxation isOpen={activeRelaxationModal === "doodlePad"} onClose={() => setActiveRelaxationModal(null)} onSkipToFocus={handleSkipToFocus} />
            <AffirmationsRelaxation isOpen={activeRelaxationModal === "affirmations"} onClose={() => setActiveRelaxationModal(null)} onSkipToFocus={handleSkipToFocus} />

            <style>{`
                #community-main-scroll ::-webkit-scrollbar { width: 8px; height: 8px; }
                #community-main-scroll ::-webkit-scrollbar-track { background: ${isDarkMode ? "rgba(255, 255, 255, 0.05)" : "#f1f5f9"}; }
                #community-main-scroll ::-webkit-scrollbar-thumb { background: #38bdf8; border-radius: 10px; }
                #community-main-scroll .scroll-container::-webkit-scrollbar { width: 8px; }
                #community-main-scroll .scroll-container::-webkit-scrollbar-thumb { background: #38bdf8; border-radius: 10px; }
            `}</style>
        </div>
    );
};

export default CommunityDetail;
