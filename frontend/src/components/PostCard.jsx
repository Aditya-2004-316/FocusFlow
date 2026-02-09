import React, { useState } from "react";
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import ReactionPanel from "./ReactionPanel";
import { postAPI, commentAPI } from "../utils/communityAPI";

const PostCard = ({
    post,
    communityId,
    onCommentAdded,
    onPostUpdated,
    currentUserId,
}) => {
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [submittingComment, setSubmittingComment] = useState(false);
    const [userReaction, setUserReaction] = useState(post.userReaction || null);

    const cardStyle = {
        background: "var(--panel-bg)",
        borderRadius: "1rem",
        padding: "1.5rem",
        border: "1px solid var(--input-border)",
        boxShadow: "var(--shadow-md)",
        marginBottom: "1rem",
    };

    const headerStyle = {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "1rem",
    };

    const avatarStyle = {
        width: "2.5rem",
        height: "2.5rem",
        borderRadius: "50%",
        background:
            "linear-gradient(130deg, rgba(59,130,246,0.2), rgba(14,165,233,0.2))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--color-primary-700)",
        fontWeight: 700,
        fontSize: "0.9rem",
        flexShrink: 0,
    };

    const authorInfoStyle = {
        flex: 1,
    };

    const authorNameStyle = {
        fontWeight: 600,
        color: "var(--color-gray-900)",
        margin: 0,
    };

    const metaStyle = {
        fontSize: "0.8rem",
        color: "var(--color-gray-600)",
        margin: 0,
        marginTop: "0.2rem",
    };

    const typeBadgeStyle = {
        padding: "0.25rem 0.75rem",
        borderRadius: "999px",
        background: "rgba(59, 130, 246, 0.15)",
        border: "1px solid rgba(56, 189, 248, 0.3)",
        fontSize: "0.75rem",
        fontWeight: 600,
        color: "var(--color-primary-700)",
        whiteSpace: "nowrap",
    };

    const titleStyle = {
        fontSize: "1.05rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
        margin: 0,
    };

    const contentStyle = {
        fontSize: "0.95rem",
        color: "var(--color-gray-700)",
        lineHeight: 1.6,
        marginBottom: "1rem",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
    };

    const footerStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        paddingTop: "1rem",
    };

    const commentSectionStyle = {
        marginTop: "1.5rem",
        paddingTop: "1.5rem",
    };

    const commentsListStyle = {
        marginBottom: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
    };

    const commentItemStyle = {
        padding: "0.75rem",
        background: "rgba(59, 130, 246, 0.05)",
        borderRadius: "0.75rem",
        border: "1px solid var(--input-border)",
    };

    const commentAuthorStyle = {
        fontWeight: 600,
        fontSize: "0.85rem",
        color: "var(--color-gray-900)",
        marginBottom: "0.25rem",
    };

    const commentTextStyle = {
        fontSize: "0.9rem",
        color: "var(--color-gray-700)",
        lineHeight: 1.5,
    };

    const inputContainerStyle = {
        display: "flex",
        gap: "0.5rem",
    };

    const inputStyle = {
        flex: 1,
        padding: "0.6rem 0.85rem",
        borderRadius: "0.5rem",
        border: "1px solid var(--input-border)",
        background: "var(--input-bg)",
        color: "var(--color-gray-900)",
        fontSize: "0.9rem",
        fontFamily: "inherit",
    };

    const sendButtonStyle = {
        padding: "0.6rem 1.2rem",
        borderRadius: "0.5rem",
        border: "none",
        background: "rgba(59, 130, 246, 0.2)",
        color: "var(--color-primary-700)",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontSize: "0.9rem",
    };

    const loadCommentsBtn = {
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        border: "1px solid var(--input-border)",
        background: "transparent",
        color: "var(--color-primary-700)",
        fontWeight: 600,
        cursor: "pointer",
        fontSize: "0.85rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
    };

    const getInitials = (author) => {
        if (!author) return "??";
        return author.username
            ? author.username.substring(0, 2).toUpperCase()
            : "U";
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return "just now";
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    const loadComments = async () => {
        if (loadingComments || showComments) return;

        setLoadingComments(true);
        try {
            const data = await commentAPI.getComments(
                communityId,
                post._id,
                1,
                50
            );
            setComments(data.data || []);
            setShowComments(true);
        } catch (err) {
            console.error("Failed to load comments:", err);
        } finally {
            setLoadingComments(false);
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        setSubmittingComment(true);
        try {
            await commentAPI.createComment(communityId, post._id, {
                content: newComment.trim(),
            });
            setNewComment("");
            await loadComments();
            onCommentAdded?.();
        } catch (err) {
            console.error("Failed to add comment:", err);
        } finally {
            setSubmittingComment(false);
        }
    };

    const handleReact = async (reactionType) => {
        try {
            await postAPI.reactToPost(communityId, post._id, reactionType);
            setUserReaction(reactionType);
            onPostUpdated?.();
        } catch (err) {
            console.error("Failed to react:", err);
        }
    };

    const handleRemoveReaction = async (reactionType) => {
        try {
            await postAPI.removeReactionFromPost(
                communityId,
                post._id,
                reactionType
            );
            setUserReaction(null);
            onPostUpdated?.();
        } catch (err) {
            console.error("Failed to remove reaction:", err);
        }
    };

    return (
        <div style={cardStyle}>
            <div style={headerStyle}>
                <div style={avatarStyle}>{getInitials(post.author)}</div>
                <div style={authorInfoStyle}>
                    <p style={authorNameStyle}>
                        {post.author?.username || "Anonymous"}
                    </p>
                    <p style={metaStyle}>
                        {formatDate(post.createdAt)}
                        {post.isEdited && " (edited)"}
                    </p>
                </div>
                <div style={typeBadgeStyle}>{post.type}</div>
            </div>

            <h4 style={titleStyle}>{post.title}</h4>
            <div style={contentStyle}>{post.content}</div>

            <div style={footerStyle}>
                <ReactionPanel
                    post={post}
                    userReaction={userReaction}
                    onReact={handleReact}
                    onRemoveReaction={handleRemoveReaction}
                />
                <button
                    style={loadCommentsBtn}
                    onClick={loadComments}
                    disabled={loadingComments}
                    type="button"
                >
                    <ChevronDownIcon
                        style={{ width: "1rem", height: "1rem" }}
                    />
                    {post.commentCount || 0} Comments
                </button>
            </div>

            {showComments && (
                <div style={commentSectionStyle}>
                    {comments.length > 0 && (
                        <div style={commentsListStyle}>
                            {comments.map((comment) => (
                                <div key={comment._id} style={commentItemStyle}>
                                    <div style={commentAuthorStyle}>
                                        {comment.author?.username ||
                                            "Anonymous"}
                                    </div>
                                    <div style={commentTextStyle}>
                                        {comment.content}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "0.75rem",
                                            color: "var(--color-gray-600)",
                                            marginTop: "0.25rem",
                                        }}
                                    >
                                        {formatDate(comment.createdAt)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div style={inputContainerStyle}>
                        <input
                            style={inputStyle}
                            type="text"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleAddComment();
                                }
                            }}
                        />
                        <button
                            style={sendButtonStyle}
                            onClick={handleAddComment}
                            disabled={submittingComment || !newComment.trim()}
                            type="button"
                        >
                            {submittingComment ? "..." : "Send"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostCard;
