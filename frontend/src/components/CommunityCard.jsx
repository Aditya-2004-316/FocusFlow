import React from "react";
import { UserGroupIcon, TagIcon, EyeIcon, ArrowRightOnRectangleIcon, PencilIcon } from "@heroicons/react/24/outline";
import useResponsive from "../hooks/useResponsive";

const CommunityCard = ({ community, onViewClick, onJoinClick, onLeaveClick, onEditClick, isMember, isCreator, creatorControlsHeight = 0, roleBadge, children }) => {
    const { isMobile } = useResponsive();
    const cardStyle = {
        background: "color-mix(in srgb, var(--panel-bg) 85%, var(--color-white) 15%)",
        borderRadius: "1rem",
        padding: isMobile ? "1.25rem" : "1.5rem",
        border: "1px solid color-mix(in srgb, var(--panel-bg) 60%, rgba(56, 189, 248, 0.4))",
        boxShadow: "var(--shadow-md)",
        display: "flex",
        flexDirection: "column",
        gap: "1.15rem",
        transition: "all 0.2s ease",
        cursor: "pointer",
        flex: 1,
        height: "100%",
        hover: {
            transform: "translateY(-2px)",
            boxShadow: "0 12px 24px -8px rgba(56, 189, 248, 0.3)",
        },
    };

    const titleStyle = {
        fontSize: "1.1rem",
        fontWeight: 700,
        color: "#f8fafc",
        margin: 0,
        lineHeight: 1.3,
    };

    const descriptionStyle = {
        fontSize: "0.9rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.6,
        margin: 0,
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
    };

    const metaStyle = {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        fontSize: "0.85rem",
        color: "var(--color-gray-600)",
        flexWrap: "wrap",
    };

    const metaItemStyle = {
        display: "flex",
        alignItems: "center",
        gap: "0.35rem",
    };

    const iconStyle = {
        width: "1rem",
        height: "1rem",
        color: "var(--color-primary-500)",
        flexShrink: 0,
    };

    const tagContainerStyle = {
        display: "flex",
        gap: "0.5rem",
        flexWrap: "wrap",
    };

    const tagStyle = {
        padding: "0.3rem 0.7rem",
        borderRadius: "999px",
        background: "rgba(59, 130, 246, 0.15)",
        border: "1px solid rgba(56, 189, 248, 0.3)",
        fontSize: "0.75rem",
        fontWeight: 600,
        color: "#38bdf8",
    };

    const buttonContainerStyle = {
        display: "flex",
        justifyContent: "space-between",
        gap: "0.75rem",
        marginTop: "auto",
        flexWrap: "wrap",
        paddingTop: "0.5rem",
    };

    const buttonStyle = {
        padding: "0.6rem 1.2rem",
        borderRadius: "0.75rem",
        border: "none",
        fontSize: "0.9rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s ease",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        minWidth: "fit-content",
    };

    const viewButtonStyle = {
        ...buttonStyle,
        background: "rgba(59, 130, 246, 0.2)",
        color: "#38bdf8",
        border: "1px solid rgba(56, 189, 248, 0.4)",
    };

    const joinButtonStyle = {
        ...buttonStyle,
        background: "linear-gradient(to right, #38bdf8, #60a5fa)",
        color: "#0f172a",
        fontWeight: 700,
        boxShadow: "0 8px 16px -4px rgba(56, 189, 248, 0.4)",
    };

    const leaveButtonStyle = {
        ...buttonStyle,
        background: "rgba(239, 68, 68, 0.1)",
        color: "#dc2626",
        border: "1px solid rgba(239, 68, 68, 0.3)",
        fontWeight: 700,
    };

    const editButtonStyle = {
        ...buttonStyle,
        background: "rgba(59, 130, 246, 0.2)",
        color: "#38bdf8",
        border: "1px solid rgba(56, 189, 248, 0.4)",
    };

    const goalBadgeStyle = {
        padding: "0.35rem 0.85rem",
        borderRadius: "0.5rem",
        background: "rgba(34, 197, 94, 0.15)",
        border: "1px solid rgba(34, 197, 94, 0.3)",
        color: "#22c55e",
        fontSize: "0.8rem",
        fontWeight: 600,
        display: "inline-block",
    };

    const commitmentBadgeStyle = {
        padding: "0.35rem 0.85rem",
        borderRadius: "0.5rem",
        background: "rgba(245, 158, 11, 0.15)",
        border: "1px solid rgba(245, 158, 11, 0.3)",
        color: "#f59e0b",
        fontSize: "0.8rem",
        fontWeight: 600,
        display: "inline-block",
    };

    return (
        <div style={cardStyle}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.15rem" }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "1rem",
                    marginBottom: "0.25rem"
                }}>
                    <h3 style={titleStyle}>{community.name}</h3>
                    {roleBadge && (
                        <div style={{ flexShrink: 0 }}>
                            {roleBadge}
                        </div>
                    )}
                </div>

                <div style={{ minHeight: isMobile ? "auto" : "3.5rem" }}>
                    <p style={descriptionStyle}>{community.description}</p>
                </div>

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.85rem",
                    minHeight: isMobile ? "auto" : "5.5rem"
                }}>
                    <div style={metaStyle}>
                        <div style={metaItemStyle}>
                            <UserGroupIcon style={iconStyle} />
                            <span>{community.memberCount || 0} members</span>
                        </div>
                        {community.tags && community.tags.length > 0 && (
                            <div style={metaItemStyle}>
                                <TagIcon style={iconStyle} />
                                <span>{community.tags.length} tags</span>
                            </div>
                        )}
                    </div>

                    {community.tags && community.tags.length > 0 && (
                        <div style={tagContainerStyle}>
                            {community.tags.slice(0, 3).map((tag, index) => (
                                <span key={index} style={tagStyle}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                        <span style={goalBadgeStyle}>{community.goal}</span>
                        <span style={commitmentBadgeStyle}>
                            {community.commitment}
                        </span>
                    </div>
                </div>
            </div>

            <div style={buttonContainerStyle}>
                <button
                    style={viewButtonStyle}
                    onClick={() => onViewClick(community)}
                >
                    <EyeIcon style={{ width: "1rem", height: "1rem", flexShrink: 0 }} />
                    View
                </button>
                {isCreator && onEditClick && (
                    <button
                        style={editButtonStyle}
                        onClick={() => onEditClick(community)}
                    >
                        <PencilIcon style={{ width: "1rem", height: "1rem", flexShrink: 0 }} />
                        Edit
                    </button>
                )}
                {!isMember && !isCreator && (
                    <button
                        style={joinButtonStyle}
                        onClick={() => onJoinClick(community._id)}
                    >
                        {community.visibility === "Request-to-Join"
                            ? "Request"
                            : "Join"}
                    </button>
                )}
                {isMember && !isCreator && (
                    <button
                        style={leaveButtonStyle}
                        onClick={() => onLeaveClick(community._id)}
                    >
                        <ArrowRightOnRectangleIcon style={{ width: "1rem", height: "1rem", flexShrink: 0 }} />
                        Leave
                    </button>
                )}
            </div>

            {/* Injected Content (Roles, Controls, etc.) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem" }}>
                {children}
            </div>
        </div>
    );
};

export default CommunityCard;
