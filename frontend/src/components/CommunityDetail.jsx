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

    // Load community basic info when modal opens or community changes
    useEffect(() => {
        if (isOpen && communityId) {
            loadCommunity();
        }
    }, [isOpen, communityId]);

    // Load channel-specific data when active channel changes
    useEffect(() => {
        if (isOpen && communityId && isMember) {
            if (activeChannel === "chat" || activeChannel === "discussion") {
                loadMessages();
            } else if (activeChannel === "members") {
                loadMembers();
            }
        }
    }, [isOpen, communityId, activeChannel, isMember]);

    // Socket listener for real-time chat
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

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

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
            const data = await chatAPI.sendMessage(communityId, newMessage.trim());
            // Message will be added via socket listener or local state if socket fails
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
        const confirmed = await confirmDialog({
            title: "Remove Member?",
            message: "Are you sure you want to remove this member from the community?",
            confirmText: "Remove",
            variant: "danger",
        });
        if (!confirmed) return;

        try {
            await communityAPI.removeMember(communityId, userId);
            toast.success("Member removed");
            loadMembers();
        } catch (err) {
            toast.error(err.message || "Failed to remove member");
        }
    };

    const handleJoinCommunity = async () => {
        try {
            await communityAPI.joinCommunity(communityId);
            toast.success("Successfully joined the community!");
            loadCommunity();
        } catch (err) {
            toast.error(err.message);
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

    if (isOwner) {
        channels.push({ id: "settings", name: "Settings", icon: Cog6ToothIcon });
    }

    // Styles (inherited and refined)
    const overlayStyle = {
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem",
    };

    const containerStyle = {
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        borderRadius: "1rem",
        width: "100%",
        maxWidth: "1100px",
        height: "85vh",
        maxHeight: "800px",
        display: "grid",
        gridTemplateColumns: "240px 1fr",
        border: "1px solid rgba(56, 189, 248, 0.2)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        overflow: "hidden",
    };

    const renderChannelContent = () => {
        if (loading) {
            return <div style={{ textAlign: "center", padding: "3rem", color: "#94a3b8" }}>Loading...</div>;
        }

        if (!isMember) {
            return (
                <div style={{ textAlign: "center", padding: "3rem" }}>
                    <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔒</div>
                    <h3 style={{ color: "#f8fafc", marginBottom: "0.5rem" }}>Members Only</h3>
                    <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
                        Join this community to access channels and participate in focus sessions.
                    </p>
                    <button
                        onClick={handleJoinCommunity}
                        style={{
                            padding: "0.875rem 2rem",
                            background: "linear-gradient(135deg, #38bdf8, #60a5fa)",
                            border: "none",
                            borderRadius: "0.75rem",
                            color: "#0f172a",
                            fontWeight: 700,
                            cursor: "pointer",
                        }}
                    >
                        Join Community
                    </button>
                </div>
            );
        }

        switch (activeChannel) {
            case "focus-sessions":
                return (
                    <GroupSessionsSection
                        communityId={communityId}
                        communityName={community?.name}
                        currentUserId={currentUserId}
                    />
                );

            case "chat":
                return (
                    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                        <div style={{
                            flex: 1,
                            overflowY: "auto",
                            padding: "1rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            scrollbarWidth: "thin",
                            scrollbarColor: "#38bdf8 rgba(255,255,255,0.05)"
                        }}>
                            {messages.length === 0 ? (
                                <div style={{ textAlign: "center", color: "#64748b", marginTop: "2rem" }}>
                                    <p>No messages yet. Start the conversation!</p>
                                </div>
                            ) : (
                                messages.map((msg, i) => (
                                    <div key={msg._id || i} style={{ display: "flex", gap: "0.75rem" }}>
                                        <div style={{
                                            width: "2.5rem",
                                            height: "2.5rem",
                                            borderRadius: "50%",
                                            background: "rgba(56, 189, 248, 0.2)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "#38bdf8",
                                            fontWeight: 700,
                                            flexShrink: 0
                                        }}>
                                            {(msg.sender?.username || "?")[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                                                <span style={{ fontWeight: 600, color: "#f8fafc" }}>{msg.sender?.username || "Unknown"}</span>
                                                <span style={{ fontSize: "0.7rem", color: "#64748b" }}>
                                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                            <div style={{ color: "#cbd5e1", marginTop: "0.1rem", wordBreak: "break-word" }}>
                                                {msg.content}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        <form onSubmit={handleSendMessage} style={{ padding: "1rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                            <div style={{ position: "relative" }}>
                                <input
                                    type="text"
                                    placeholder={`Message #${community?.name || 'community'}`}
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "0.75rem 3rem 0.75rem 1rem",
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: "0.5rem",
                                        color: "#f1f5f9",
                                        outline: "none"
                                    }}
                                />
                                <button
                                    type="submit"
                                    disabled={!newMessage.trim() || submittingMessage}
                                    style={{
                                        position: "absolute",
                                        right: "0.5rem",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        background: "transparent",
                                        border: "none",
                                        cursor: "pointer",
                                        color: newMessage.trim() ? "#38bdf8" : "#475569"
                                    }}
                                >
                                    <PaperAirplaneIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                                </button>
                            </div>
                        </form>
                    </div>
                );

            case "relaxation":
                return (
                    <div style={{ textAlign: "center", padding: "2rem" }}>
                        <SparklesIcon style={{ width: "3rem", height: "3rem", color: "#a855f7", margin: "0 auto 1rem" }} />
                        <h3 style={{ color: "#f8fafc", marginBottom: "1rem" }}>Relaxation Zone</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                            {[
                                { title: "🎧 Soundscapes", icon: "�", desc: "Curated ambient mixes for deep work", modal: "music" },
                                { title: "🧘 Mini Meditation", icon: "🧘", desc: "Gentle prompts to center yourself", modal: "meditation" },
                                { title: "📝 Thought Dump", icon: "📝", desc: "Clear mental clutter by writing", modal: "thoughtDump" },
                                { title: "🎮 Calming Game", icon: "�", desc: "Soothing interactive experiences", modal: "calmingGame" },
                                { title: "🎨 Doodle Pad", icon: "🎨", desc: "Express yourself on a drawing canvas", modal: "doodlePad" },
                                { title: "💬 Affirmations", icon: "💬", desc: "Positive intentions to boost focus", modal: "affirmations" }
                            ].map(item => (
                                <div
                                    key={item.title}
                                    onClick={() => setActiveRelaxationModal(item.modal)}
                                    style={{
                                        background: "rgba(255,255,255,0.03)",
                                        padding: "1.5rem",
                                        borderRadius: "1rem",
                                        border: "1px solid rgba(168, 85, 247, 0.2)",
                                        cursor: "pointer",
                                        transition: "all 0.2s"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                                        e.currentTarget.style.transform = "translateY(-4px)";
                                        e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.4)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.2)";
                                    }}
                                >
                                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{item.icon}</div>
                                    <h4 style={{ color: "#f8fafc", marginBottom: "0.25rem" }}>{item.title}</h4>
                                    <p style={{ color: "#94a3b8", fontSize: "0.8rem" }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case "members":
                return (
                    <div style={{ padding: "1.5rem" }}>
                        <h3 style={{ color: "#f8fafc", marginBottom: "1rem", fontSize: "1.1rem" }}>
                            Members ({members.length || community?.members?.length})
                        </h3>
                        {loadingMembers ? (
                            <div style={{ color: "#94a3b8" }}>Loading...</div>
                        ) : (
                            <div style={{
                                maxHeight: "600px",
                                overflowY: "auto",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.75rem",
                                paddingRight: "0.5rem",
                                scrollbarWidth: "thin",
                                scrollbarColor: "#38bdf8 rgba(255,255,255,0.05)"
                            }}>
                                {members.map((member) => {
                                    const mUser = member.userId;
                                    const isMIdCreator = member.isCreator || mUser?._id === community?.creator?._id;

                                    return (
                                        <div key={member._id} style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.75rem",
                                            padding: "0.75rem 1rem",
                                            background: isMIdCreator ? "rgba(245, 158, 11, 0.05)" : "rgba(255, 255, 255, 0.03)",
                                            borderRadius: "0.5rem",
                                            border: isMIdCreator ? "1px solid rgba(245, 158, 11, 0.2)" : "1px solid transparent",
                                        }}>
                                            <div style={{
                                                width: "2.5rem",
                                                height: "2.5rem",
                                                borderRadius: "50%",
                                                background: isMIdCreator ? "linear-gradient(135deg, #f59e0b, #d97706)" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "#fff",
                                                fontWeight: 700,
                                            }}>
                                                {(mUser?.username || "?")[0].toUpperCase()}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ color: "#f8fafc", fontWeight: 600 }}>
                                                    {mUser?.username} {mUser?._id === currentUserId && "(You)"}
                                                </div>
                                                <div style={{ fontSize: "0.8rem", color: isMIdCreator ? "#f59e0b" : "#94a3b8" }}>
                                                    {isMIdCreator ? "👑 Owner" : member.role}
                                                </div>
                                            </div>

                                            {isOwner && !isMIdCreator && (
                                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                                    <select
                                                        value={member.role}
                                                        onChange={(e) => handleAssignRole(mUser?._id, e.target.value)}
                                                        style={{
                                                            background: "rgba(0,0,0,0.2)",
                                                            color: "#94a3b8",
                                                            border: "1px solid rgba(255,255,255,0.1)",
                                                            borderRadius: "0.4rem",
                                                            fontSize: "0.8rem",
                                                            padding: "0.2rem"
                                                        }}
                                                    >
                                                        <option value="Member">Member</option>
                                                        <option value="Moderator">Moderator</option>
                                                        <option value="Admin">Admin</option>
                                                    </select>
                                                    <button
                                                        onClick={() => handleRemoveMember(mUser?._id)}
                                                        style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer" }}
                                                    >
                                                        <TrashIcon style={{ width: "1.1rem", height: "1.1rem" }} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );

            case "settings":
                return (
                    <div style={{ padding: "1.5rem" }}>
                        <h3 style={{ color: "#f8fafc", marginBottom: "1.5rem" }}>Settings</h3>
                        {/* Summary of settings logic */}
                        <div style={{ background: "rgba(239, 68, 68, 0.05)", padding: "1.5rem", borderRadius: "1rem", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
                            <h4 style={{ color: "#ef4444", marginBottom: "0.5rem" }}>Danger Zone</h4>
                            <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "1rem" }}>Delete this community permanently.</p>
                            <button
                                onClick={async () => {
                                    const confirm = await confirmDialog({ title: "Delete Community?", message: "Permanent action!", variant: "danger" });
                                    if (confirm) {
                                        await communityAPI.deleteCommunity(communityId);
                                        onClose();
                                    }
                                }}
                                style={{ padding: "0.6rem 1.25rem", background: "#ef4444", color: "#fff", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontWeight: 600 }}
                            >
                                Delete Community
                            </button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={containerStyle} onClick={(e) => e.stopPropagation()}>
                {/* Sidebar */}
                <div style={{ background: "rgba(0, 0, 0, 0.3)", borderRight: "1px solid rgba(255, 255, 255, 0.1)", display: "flex", flexDirection: "column" }}>
                    <div style={{ padding: "1rem", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#f8fafc" }}>{community?.name}</h2>
                        <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{community?.members?.length} members</span>
                    </div>
                    <div style={{ flex: 1, padding: "0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        {channels.map((ch) => (
                            <div
                                key={ch.id}
                                onClick={() => setActiveChannel(ch.id)}
                                style={{
                                    display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0.75rem", borderRadius: "0.5rem",
                                    cursor: "pointer", background: activeChannel === ch.id ? "rgba(56, 189, 248, 0.15)" : "transparent",
                                    color: activeChannel === ch.id ? "#38bdf8" : "#94a3b8", transition: "all 0.2s"
                                }}
                            >
                                <ch.icon style={{ width: "1.1rem" }} />
                                <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>{ch.name}</span>
                            </div>
                        ))}
                    </div>
                    {isMember && !isOwner && (
                        <div style={{ padding: "1rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                            <button
                                onClick={async () => {
                                    const ok = await confirmDialog({ title: "Leave Community?", message: "Sure?" });
                                    if (ok) { await communityAPI.leaveCommunity(communityId); onClose(); }
                                }}
                                style={{ width: "100%", padding: "0.5rem", border: "none", borderRadius: "0.5rem", background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", fontSize: "0.8rem", fontWeight: 600 }}
                            >
                                Leave Community
                            </button>
                        </div>
                    )}
                </div>

                {/* Main */}
                <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
                    <div style={{ padding: "1rem", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#f8fafc", fontWeight: 700 }}>
                            <HashtagIcon style={{ width: "1.2rem", color: "#64748b" }} />
                            <span>{channels.find(c => c.id === activeChannel)?.name}</span>
                        </div>
                        <button onClick={onClose} style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer" }}>
                            <XMarkIcon style={{ width: "1.5rem" }} />
                        </button>
                    </div>
                    <div style={{ flex: 1, overflow: "hidden" }}>
                        {renderChannelContent()}
                    </div>
                </div>
            </div>

            {/* Relaxation Modals */}
            <MusicRelaxation
                isOpen={activeRelaxationModal === "music"}
                onClose={() => setActiveRelaxationModal(null)}
            />
            <MeditationRelaxation
                isOpen={activeRelaxationModal === "meditation"}
                onClose={() => setActiveRelaxationModal(null)}
            />
            <ThoughtDumpRelaxation
                isOpen={activeRelaxationModal === "thoughtDump"}
                onClose={() => setActiveRelaxationModal(null)}
            />
            <CalmingGameRelaxation
                isOpen={activeRelaxationModal === "calmingGame"}
                onClose={() => setActiveRelaxationModal(null)}
            />
            <DoodlePadRelaxation
                isOpen={activeRelaxationModal === "doodlePad"}
                onClose={() => setActiveRelaxationModal(null)}
            />
            <AffirmationsRelaxation
                isOpen={activeRelaxationModal === "affirmations"}
                onClose={() => setActiveRelaxationModal(null)}
            />

            {/* Custom Scrollbar Styling */}
            <style>{`
                /* Webkit scrollbar styling for Chrome/Edge/Safari */
                div::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
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
        </div>
    );
};

export default CommunityDetail;
