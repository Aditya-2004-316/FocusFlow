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

    const toast = useToast();
    const confirmDialog = useConfirm();
    const { socket, isConnected } = useSocket();
    const messagesEndRef = useRef(null);

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
        e.preventDefault();
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
        if (loading) return <div style={{ textAlign: "center", padding: "3rem", color: "#94a3b8" }}>Loading...</div>;
        if (!isMember) return (
            <div style={{ textAlign: "center", padding: "3rem" }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔒</div>
                <h3 style={{ color: "#f8fafc", marginBottom: "0.5rem" }}>Members Only</h3>
                <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>Join this community to access channels.</p>
                <button onClick={handleJoinCommunity} style={{ padding: "0.875rem 2rem", background: "linear-gradient(135deg, #38bdf8, #60a5fa)", border: "none", borderRadius: "0.75rem", color: "#0f172a", fontWeight: 700, cursor: "pointer" }}>Join Community</button>
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
                                    <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", background: "rgba(56, 189, 248, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#38bdf8", fontWeight: 700, flexShrink: 0 }}>
                                        {(msg.sender?.username || "?")[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                                            <span style={{ fontWeight: 600, color: "#f8fafc" }}>{msg.sender?.username}</span>
                                            <span style={{ fontSize: "0.7rem", color: "#64748b" }}>{new Date(msg.createdAt).toLocaleTimeString()}</span>
                                        </div>
                                        <div style={{ color: "#cbd5e1", marginTop: "0.1rem", wordBreak: "break-word" }}>{msg.content}</div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <form onSubmit={handleSendMessage} style={{ padding: "1rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                            <input type="text" placeholder={`Message #${community?.name}`} value={newMessage} onChange={(e) => setNewMessage(e.target.value)} style={{ width: "100%", padding: "0.75rem 1rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.5rem", color: "#f1f5f9", outline: "none" }} />
                        </form>
                    </div>
                );
            case "relaxation":
                return (
                    <div style={{ padding: "2rem", overflowY: "auto", height: "100%", minHeight: 0 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                            {[{ title: "🎧 Soundscapes", icon: "🎧", modal: "music" }, { title: "🧘 Meditation", icon: "🧘", modal: "meditation" }, { title: "📝 Thought Dump", icon: "📝", modal: "thoughtDump" }, { title: "🎮 Game", icon: "🎮", modal: "calmingGame" }, { title: "🎨 Doodle", icon: "🎨", modal: "doodlePad" }, { title: "💬 Affirm", icon: "💬", modal: "affirmations" }].map(item => (
                                <div key={item.title} onClick={() => setActiveRelaxationModal(item.modal)} style={{ background: "rgba(255,255,255,0.03)", padding: "1.5rem", borderRadius: "1rem", border: "1px solid rgba(168, 85, 247, 0.2)", cursor: "pointer", textAlign: "center" }}>
                                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{item.icon}</div>
                                    <h4 style={{ color: "#f8fafc" }}>{item.title}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case "members":
                return (
                    <div style={{ padding: "1.5rem", height: "100%", display: "flex", flexDirection: "column", minHeight: 0 }}>
                        <h3 style={{ color: "#f8fafc", marginBottom: "1rem" }}>Members ({members.length})</h3>
                        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.75rem", minHeight: 0 }}>
                            {members.map(member => (
                                <div key={member._id} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem", background: "rgba(255, 255, 255, 0.03)", borderRadius: "0.5rem" }}>
                                    <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>
                                        {(member.userId?.username || "?")[0].toUpperCase()}
                                    </div>
                                    <span style={{ color: "#f8fafc", fontWeight: 600 }}>{member.userId?.username}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case "settings":
                return (
                    <div style={{ padding: "1.5rem", overflowY: "auto", height: "100%", minHeight: 0 }}>
                        <h3 style={{ color: "#38bdf8", marginBottom: "1rem" }}>Settings</h3>
                        <div style={{ background: "rgba(239, 68, 68, 0.05)", padding: "1.5rem", borderRadius: "1rem", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
                            <h4 style={{ color: "#ef4444" }}>Cleanup</h4>
                            <button onClick={async () => {
                                const ok = await confirmDialog({ title: "Delete All Sessions?", message: "Are you sure?", variant: "danger" });
                                if (ok) {
                                    await fetch(`${API_BASE}/group-sessions/debug/cleanup`, { method: "DELETE", headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } });
                                    toast.success("Sessions cleaned");
                                }
                            }} style={{ marginTop: "1rem", padding: "0.6rem 1rem", background: "#ef4444", color: "#fff", border: "none", borderRadius: "0.5rem", cursor: "pointer" }}>Reset Sessions</button>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0, 0, 0, 0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }} onClick={onClose}>
            <div style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", borderRadius: "1rem", width: "100%", maxWidth: "1100px", height: "85vh", maxHeight: "800px", display: "flex", border: "1px solid rgba(56, 189, 248, 0.2)", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)", overflow: "hidden" }} onClick={(e) => e.stopPropagation()}>
                {/* Sidebar */}
                <div style={{ width: "240px", background: "rgba(0, 0, 0, 0.3)", borderRight: "1px solid rgba(255, 255, 255, 0.1)", display: "flex", flexDirection: "column" }}>
                    <div style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f8fafc" }}>{community?.name}</h2>
                    </div>
                    <div style={{ flex: 1, padding: "0.75rem", overflowY: "auto" }}>
                        {channels.map(ch => (
                            <div key={ch.id} onClick={() => setActiveChannel(ch.id)} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem", borderRadius: "0.5rem", cursor: "pointer", background: activeChannel === ch.id ? "rgba(56, 189, 248, 0.15)" : "transparent", color: activeChannel === ch.id ? "#38bdf8" : "#94a3b8", transition: "all 0.2s", marginBottom: "0.25rem" }}>
                                <ch.icon style={{ width: "1.2rem" }} />
                                <span style={{ fontWeight: 500 }}>{ch.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Area */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", width: "100%", minHeight: 0, minWidth: 0 }}>
                    <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#f8fafc", fontWeight: 700 }}>
                            <HashtagIcon style={{ width: "1.2rem", color: "#64748b" }} />
                            <span>{channels.find(c => c.id === activeChannel)?.name}</span>
                        </div>
                        <button onClick={onClose} style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer" }}>
                            <XMarkIcon style={{ width: "1.5rem" }} />
                        </button>
                    </div>
                    <div id="community-main-scroll" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0, width: "100%" }}>
                        {renderChannelContent()}
                    </div>
                </div>
            </div>

            <MusicRelaxation isOpen={activeRelaxationModal === "music"} onClose={() => setActiveRelaxationModal(null)} />
            <MeditationRelaxation isOpen={activeRelaxationModal === "meditation"} onClose={() => setActiveRelaxationModal(null)} />
            <ThoughtDumpRelaxation isOpen={activeRelaxationModal === "thoughtDump"} onClose={() => setActiveRelaxationModal(null)} />
            <CalmingGameRelaxation isOpen={activeRelaxationModal === "calmingGame"} onClose={() => setActiveRelaxationModal(null)} />
            <DoodlePadRelaxation isOpen={activeRelaxationModal === "doodlePad"} onClose={() => setActiveRelaxationModal(null)} />
            <AffirmationsRelaxation isOpen={activeRelaxationModal === "affirmations"} onClose={() => setActiveRelaxationModal(null)} />

            <style>{`
                #community-main-scroll ::-webkit-scrollbar { width: 8px; height: 8px; }
                #community-main-scroll ::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); }
                #community-main-scroll ::-webkit-scrollbar-thumb { background: #38bdf8; border-radius: 10px; }
                #community-main-scroll .scroll-container::-webkit-scrollbar { width: 8px; }
                #community-main-scroll .scroll-container::-webkit-scrollbar-thumb { background: #38bdf8; border-radius: 10px; }
            `}</style>
        </div>
    );
};

export default CommunityDetail;
