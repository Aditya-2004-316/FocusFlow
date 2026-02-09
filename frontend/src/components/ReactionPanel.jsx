import React from "react";
import {
    HandThumbUpIcon,
    HeartIcon,
    LightBulbIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

const ReactionPanel = ({
    post,
    userReaction,
    onReact,
    onRemoveReaction,
    disabled = false,
}) => {
    const containerStyle = {
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
    };

    const reactionButtonStyle = (isActive) => ({
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        padding: "0.4rem 0.7rem",
        borderRadius: "0.5rem",
        border: "1px solid var(--input-border)",
        background: isActive
            ? "rgba(59, 130, 246, 0.15)"
            : "rgba(148, 163, 184, 0.08)",
        color: isActive ? "var(--color-primary-700)" : "var(--color-gray-600)",
        fontSize: "0.85rem",
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s ease",
        opacity: disabled ? 0.6 : 1,
    });

    const reactions = [
        { type: "thumbsUp", icon: HandThumbUpIcon, label: "👍" },
        { type: "heart", icon: HeartIcon, label: "❤️" },
        { type: "lightbulb", icon: LightBulbIcon, label: "💡" },
    ];

    const handleReactionClick = (type) => {
        if (disabled) return;

        if (userReaction === type) {
            onRemoveReaction(type);
        } else {
            onReact(type);
        }
    };

    return (
        <div style={containerStyle}>
            {reactions.map((reaction) => {
                const isActive = userReaction === reaction.type;
                const count = post.reactionsCount[reaction.type] || 0;

                return (
                    <button
                        key={reaction.type}
                        style={reactionButtonStyle(isActive)}
                        onClick={() => handleReactionClick(reaction.type)}
                        type="button"
                        title={reaction.label}
                        disabled={disabled}
                    >
                        <span>{reaction.label}</span>
                        {count > 0 && <span>{count}</span>}
                    </button>
                );
            })}
        </div>
    );
};

export default ReactionPanel;
