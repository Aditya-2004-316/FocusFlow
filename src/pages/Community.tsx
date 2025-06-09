import { useState } from "react";
import {
    UserCircleIcon,
    ChatBubbleLeftIcon,
    HeartIcon,
    ShareIcon,
    BookmarkIcon,
    UserGroupIcon,
    ChartBarIcon,
    TrophyIcon,
} from "@heroicons/react/24/outline";
import type { CSSProperties } from "react";

interface Post {
    id: string;
    author: {
        name: string;
        avatar: string;
        role: string;
    };
    content: string;
    likes: number;
    comments: number;
    timestamp: string;
    tags: string[];
}

const Community = () => {
    const [activeTab, setActiveTab] = useState("discussions");

    const posts: Post[] = [
        {
            id: "1",
            author: {
                name: "Sarah Johnson",
                avatar: "/avatars/sarah.jpg",
                role: "Productivity Coach",
            },
            content:
                "Just completed a 4-hour deep work session using the Pomodoro technique. The FocusFlow app made it so much easier to stay on track! What's your longest focus session?",
            likes: 24,
            comments: 8,
            timestamp: "2 hours ago",
            tags: ["Deep Work", "Pomodoro", "Achievement"],
        },
        {
            id: "2",
            author: {
                name: "Michael Chen",
                avatar: "/avatars/michael.jpg",
                role: "Software Developer",
            },
            content:
                "Looking for tips on managing distractions while working from home. Any specific strategies that have worked well for you?",
            likes: 15,
            comments: 12,
            timestamp: "5 hours ago",
            tags: ["WFH", "Distractions", "Tips"],
        },
        {
            id: "3",
            author: {
                name: "Emma Rodriguez",
                avatar: "/avatars/emma.jpg",
                role: "Student",
            },
            content:
                "Started using FocusFlow for my study sessions. The statistics feature is amazing for tracking progress!",
            likes: 32,
            comments: 5,
            timestamp: "1 day ago",
            tags: ["Study", "Progress", "Statistics"],
        },
    ];

    const containerStyle: CSSProperties = {
        maxWidth: "64rem",
        margin: "2rem auto",
        padding: "0 1rem",
    };

    const headerStyle: CSSProperties = {
        marginBottom: "2rem",
    };

    const titleStyle: CSSProperties = {
        fontSize: "1.875rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const descriptionStyle: CSSProperties = {
        fontSize: "1rem",
        color: "var(--color-gray-600)",
    };

    const tabsContainerStyle: CSSProperties = {
        display: "flex",
        gap: "1rem",
        marginBottom: "2rem",
        borderBottom: "2px solid var(--color-gray-200)",
        paddingBottom: "0.5rem",
    };

    const tabStyle: CSSProperties = {
        padding: "0.75rem 1.5rem",
        borderRadius: "0.5rem",
        cursor: "pointer",
        fontSize: "0.875rem",
        fontWeight: 500,
        color: "var(--color-gray-600)",
        transition: "all 0.2s ease-in-out",
    };

    const activeTabStyle: CSSProperties = {
        ...tabStyle,
        backgroundColor: "var(--color-primary-50)",
        color: "var(--color-primary-700)",
    };

    const statsGridStyle: CSSProperties = {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1.5rem",
        marginBottom: "2rem",
    };

    const statCardStyle: CSSProperties = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    };

    const statHeaderStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "1rem",
    };

    const statIconStyle: CSSProperties = {
        width: "1.5rem",
        height: "1.5rem",
        color: "var(--color-primary-600)",
    };

    const statTitleStyle: CSSProperties = {
        fontSize: "0.875rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
    };

    const statValueStyle: CSSProperties = {
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "0.25rem",
    };

    const statDescriptionStyle: CSSProperties = {
        fontSize: "0.875rem",
        color: "var(--color-gray-500)",
    };

    const postCardStyle: CSSProperties = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        marginBottom: "1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    };

    const postHeaderStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "1rem",
    };

    const avatarStyle: CSSProperties = {
        width: "2.5rem",
        height: "2.5rem",
        borderRadius: "50%",
        backgroundColor: "var(--color-gray-200)",
    };

    const authorInfoStyle: CSSProperties = {
        flex: 1,
    };

    const authorNameStyle: CSSProperties = {
        fontSize: "1rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
    };

    const authorRoleStyle: CSSProperties = {
        fontSize: "0.875rem",
        color: "var(--color-gray-500)",
    };

    const postContentStyle: CSSProperties = {
        fontSize: "1rem",
        color: "var(--color-gray-700)",
        marginBottom: "1rem",
        lineHeight: "1.5",
    };

    const tagsContainerStyle: CSSProperties = {
        display: "flex",
        gap: "0.5rem",
        marginBottom: "1rem",
    };

    const tagStyle: CSSProperties = {
        padding: "0.25rem 0.75rem",
        borderRadius: "9999px",
        fontSize: "0.75rem",
        fontWeight: 500,
        backgroundColor: "var(--color-primary-50)",
        color: "var(--color-primary-700)",
    };

    const postFooterStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
    };

    const actionButtonStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem",
        borderRadius: "0.375rem",
        color: "var(--color-gray-600)",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
    };

    const actionButtonHoverStyle: CSSProperties = {
        backgroundColor: "var(--color-gray-100)",
        color: "var(--color-primary-600)",
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>Community</h1>
                <p style={descriptionStyle}>
                    Connect with fellow productivity enthusiasts, share your
                    journey, and learn from others
                </p>
            </div>

            {/* Community Stats */}
            <div style={statsGridStyle}>
                <div style={statCardStyle}>
                    <div style={statHeaderStyle}>
                        <UserGroupIcon style={statIconStyle} />
                        <span style={statTitleStyle}>Active Members</span>
                    </div>
                    <div style={statValueStyle}>2,847</div>
                    <div style={statDescriptionStyle}>+12% from last month</div>
                </div>
                <div style={statCardStyle}>
                    <div style={statHeaderStyle}>
                        <ChartBarIcon style={statIconStyle} />
                        <span style={statTitleStyle}>Focus Hours</span>
                    </div>
                    <div style={statValueStyle}>15,234</div>
                    <div style={statDescriptionStyle}>
                        Community total this month
                    </div>
                </div>
                <div style={statCardStyle}>
                    <div style={statHeaderStyle}>
                        <TrophyIcon style={statIconStyle} />
                        <span style={statTitleStyle}>Achievements</span>
                    </div>
                    <div style={statValueStyle}>8,921</div>
                    <div style={statDescriptionStyle}>Unlocked by members</div>
                </div>
            </div>

            {/* Tabs */}
            <div style={tabsContainerStyle}>
                <div
                    style={
                        activeTab === "discussions" ? activeTabStyle : tabStyle
                    }
                    onClick={() => setActiveTab("discussions")}
                >
                    Discussions
                </div>
                <div
                    style={activeTab === "members" ? activeTabStyle : tabStyle}
                    onClick={() => setActiveTab("members")}
                >
                    Members
                </div>
                <div
                    style={
                        activeTab === "resources" ? activeTabStyle : tabStyle
                    }
                    onClick={() => setActiveTab("resources")}
                >
                    Resources
                </div>
            </div>

            {/* Posts */}
            {posts.map((post) => (
                <div key={post.id} style={postCardStyle}>
                    <div style={postHeaderStyle}>
                        <div style={avatarStyle}>
                            <UserCircleIcon
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    color: "var(--color-gray-400)",
                                }}
                            />
                        </div>
                        <div style={authorInfoStyle}>
                            <div style={authorNameStyle}>
                                {post.author.name}
                            </div>
                            <div style={authorRoleStyle}>
                                {post.author.role}
                            </div>
                        </div>
                        <div
                            style={{
                                color: "var(--color-gray-500)",
                                fontSize: "0.875rem",
                            }}
                        >
                            {post.timestamp}
                        </div>
                    </div>
                    <div style={postContentStyle}>{post.content}</div>
                    <div style={tagsContainerStyle}>
                        {post.tags.map((tag) => (
                            <span key={tag} style={tagStyle}>
                                #{tag}
                            </span>
                        ))}
                    </div>
                    <div style={postFooterStyle}>
                        <button
                            style={actionButtonStyle}
                            onMouseEnter={(e) => {
                                Object.assign(
                                    e.currentTarget.style,
                                    actionButtonHoverStyle
                                );
                            }}
                            onMouseLeave={(e) => {
                                Object.assign(
                                    e.currentTarget.style,
                                    actionButtonStyle
                                );
                            }}
                        >
                            <HeartIcon
                                style={{ width: "1.25rem", height: "1.25rem" }}
                            />
                            <span>{post.likes}</span>
                        </button>
                        <button
                            style={actionButtonStyle}
                            onMouseEnter={(e) => {
                                Object.assign(
                                    e.currentTarget.style,
                                    actionButtonHoverStyle
                                );
                            }}
                            onMouseLeave={(e) => {
                                Object.assign(
                                    e.currentTarget.style,
                                    actionButtonStyle
                                );
                            }}
                        >
                            <ChatBubbleLeftIcon
                                style={{ width: "1.25rem", height: "1.25rem" }}
                            />
                            <span>{post.comments}</span>
                        </button>
                        <button
                            style={actionButtonStyle}
                            onMouseEnter={(e) => {
                                Object.assign(
                                    e.currentTarget.style,
                                    actionButtonHoverStyle
                                );
                            }}
                            onMouseLeave={(e) => {
                                Object.assign(
                                    e.currentTarget.style,
                                    actionButtonStyle
                                );
                            }}
                        >
                            <ShareIcon
                                style={{ width: "1.25rem", height: "1.25rem" }}
                            />
                            <span>Share</span>
                        </button>
                        <button
                            style={actionButtonStyle}
                            onMouseEnter={(e) => {
                                Object.assign(
                                    e.currentTarget.style,
                                    actionButtonHoverStyle
                                );
                            }}
                            onMouseLeave={(e) => {
                                Object.assign(
                                    e.currentTarget.style,
                                    actionButtonStyle
                                );
                            }}
                        >
                            <BookmarkIcon
                                style={{ width: "1.25rem", height: "1.25rem" }}
                            />
                            <span>Save</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Community;
