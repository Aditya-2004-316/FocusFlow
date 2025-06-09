import React, { useState } from "react";
import {
    BookOpenIcon,
    VideoCameraIcon,
    DocumentTextIcon,
    PresentationChartLineIcon,
    ArrowDownTrayIcon,
    PlayCircleIcon,
    AcademicCapIcon,
    LightBulbIcon,
} from "@heroicons/react/24/outline";
import type { CSSProperties } from "react";

interface Resource {
    id: string;
    title: string;
    description: string;
    type: "guide" | "video" | "article" | "template";
    icon: React.ReactElement;
    duration?: string;
    level: "beginner" | "intermediate" | "advanced";
    tags: string[];
}

const Resources = () => {
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const resources: Resource[] = [
        {
            id: "1",
            title: "Getting Started with FocusFlow",
            description:
                "A comprehensive guide to help you make the most of FocusFlow's features and boost your productivity.",
            type: "guide",
            icon: (
                <BookOpenIcon style={{ width: "1.5rem", height: "1.5rem" }} />
            ),
            duration: "15 min read",
            level: "beginner",
            tags: ["Basics", "Getting Started", "Features"],
        },
        {
            id: "2",
            title: "Mastering the Pomodoro Technique",
            description:
                "Learn how to effectively use the Pomodoro Technique to maximize your focus and productivity.",
            type: "video",
            icon: (
                <VideoCameraIcon
                    style={{ width: "1.5rem", height: "1.5rem" }}
                />
            ),
            duration: "12:30",
            level: "intermediate",
            tags: ["Pomodoro", "Time Management", "Focus"],
        },
        {
            id: "3",
            title: "Productivity Templates",
            description:
                "Download our collection of customizable templates for task management and project planning.",
            type: "template",
            icon: (
                <DocumentTextIcon
                    style={{ width: "1.5rem", height: "1.5rem" }}
                />
            ),
            level: "beginner",
            tags: ["Templates", "Planning", "Organization"],
        },
        {
            id: "4",
            title: "Advanced Focus Techniques",
            description:
                "Explore advanced strategies for maintaining focus and achieving deep work states.",
            type: "article",
            icon: (
                <PresentationChartLineIcon
                    style={{ width: "1.5rem", height: "1.5rem" }}
                />
            ),
            duration: "20 min read",
            level: "advanced",
            tags: ["Deep Work", "Focus", "Advanced"],
        },
        {
            id: "5",
            title: "Time Management Fundamentals",
            description:
                "Essential principles and practices for effective time management in any context.",
            type: "guide",
            icon: (
                <BookOpenIcon style={{ width: "1.5rem", height: "1.5rem" }} />
            ),
            duration: "25 min read",
            level: "beginner",
            tags: ["Time Management", "Basics", "Planning"],
        },
        {
            id: "6",
            title: "Productivity Workshop",
            description:
                "Join our expert-led workshop on building sustainable productivity habits.",
            type: "video",
            icon: (
                <VideoCameraIcon
                    style={{ width: "1.5rem", height: "1.5rem" }}
                />
            ),
            duration: "45:00",
            level: "intermediate",
            tags: ["Workshop", "Habits", "Learning"],
        },
    ];

    const containerStyle: CSSProperties = {
        minWidth: "64rem",
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

    const searchContainerStyle: CSSProperties = {
        marginBottom: "2rem",
    };

    const searchInputStyle: CSSProperties = {
        width: "100%",
        padding: "0.75rem 1rem",
        borderRadius: "0.5rem",
        border: "1px solid var(--color-gray-300)",
        fontSize: "1rem",
        color: "var(--color-gray-900)",
        backgroundColor: "var(--color-white)",
    };

    const categoriesContainerStyle: CSSProperties = {
        display: "flex",
        gap: "1rem",
        marginBottom: "2rem",
        flexWrap: "wrap",
    };

    const categoryButtonStyle: CSSProperties = {
        padding: "0.5rem 1rem",
        borderRadius: "0.375rem",
        fontSize: "0.875rem",
        fontWeight: 500,
        color: "var(--color-gray-600)",
        backgroundColor: "var(--color-gray-100)",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
    };

    const activeCategoryStyle: CSSProperties = {
        ...categoryButtonStyle,
        backgroundColor: "var(--color-primary-50)",
        color: "var(--color-primary-700)",
    };

    const resourcesGridStyle: CSSProperties = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1.5rem",
    };

    const resourceCardStyle: CSSProperties = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        transition: "all 0.2s ease-in-out",
    };

    const resourceCardHoverStyle: CSSProperties = {
        transform: "translateY(-2px)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    };

    const resourceHeaderStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "1rem",
    };

    const resourceIconStyle: CSSProperties = {
        width: "2.5rem",
        height: "2.5rem",
        borderRadius: "0.5rem",
        backgroundColor: "var(--color-primary-50)",
        color: "var(--color-primary-600)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const resourceTitleStyle: CSSProperties = {
        fontSize: "1.125rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const resourceDescriptionStyle: CSSProperties = {
        fontSize: "0.875rem",
        color: "var(--color-gray-600)",
        marginBottom: "1rem",
        lineHeight: "1.5",
    };

    const resourceMetaStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "1rem",
    };

    const resourceMetaItemStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        fontSize: "0.75rem",
        color: "var(--color-gray-500)",
    };

    const tagsContainerStyle: CSSProperties = {
        display: "flex",
        gap: "0.5rem",
        flexWrap: "wrap",
    };

    const tagStyle: CSSProperties = {
        padding: "0.25rem 0.75rem",
        borderRadius: "9999px",
        fontSize: "0.75rem",
        fontWeight: 500,
        backgroundColor: "var(--color-gray-100)",
        color: "var(--color-gray-700)",
    };

    const actionButtonStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem 1rem",
        borderRadius: "0.375rem",
        fontSize: "0.875rem",
        fontWeight: 500,
        color: "var(--color-primary-700)",
        backgroundColor: "var(--color-primary-50)",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        marginTop: "1rem",
    };

    const actionButtonHoverStyle: CSSProperties = {
        backgroundColor: "var(--color-primary-100)",
    };

    const filteredResources = resources.filter((resource) => {
        const matchesCategory =
            activeCategory === "all" || resource.type === activeCategory;
        const matchesSearch =
            resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            resource.tags.some((tag) =>
                tag.toLowerCase().includes(searchQuery.toLowerCase())
            );
        return matchesCategory && matchesSearch;
    });

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>Resources</h1>
                <p style={descriptionStyle}>
                    Explore our collection of guides, videos, and tools to help
                    you maximize your productivity
                </p>
            </div>

            <div style={searchContainerStyle}>
                <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={searchInputStyle}
                />
            </div>

            <div style={categoriesContainerStyle}>
                <button
                    style={
                        activeCategory === "all"
                            ? activeCategoryStyle
                            : categoryButtonStyle
                    }
                    onClick={() => setActiveCategory("all")}
                >
                    All Resources
                </button>
                <button
                    style={
                        activeCategory === "guide"
                            ? activeCategoryStyle
                            : categoryButtonStyle
                    }
                    onClick={() => setActiveCategory("guide")}
                >
                    Guides
                </button>
                <button
                    style={
                        activeCategory === "video"
                            ? activeCategoryStyle
                            : categoryButtonStyle
                    }
                    onClick={() => setActiveCategory("video")}
                >
                    Videos
                </button>
                <button
                    style={
                        activeCategory === "article"
                            ? activeCategoryStyle
                            : categoryButtonStyle
                    }
                    onClick={() => setActiveCategory("article")}
                >
                    Articles
                </button>
                <button
                    style={
                        activeCategory === "template"
                            ? activeCategoryStyle
                            : categoryButtonStyle
                    }
                    onClick={() => setActiveCategory("template")}
                >
                    Templates
                </button>
            </div>

            <div style={resourcesGridStyle}>
                {filteredResources.map((resource) => (
                    <div
                        key={resource.id}
                        style={resourceCardStyle}
                        onMouseEnter={(e) => {
                            Object.assign(
                                e.currentTarget.style,
                                resourceCardHoverStyle
                            );
                        }}
                        onMouseLeave={(e) => {
                            Object.assign(
                                e.currentTarget.style,
                                resourceCardStyle
                            );
                        }}
                    >
                        <div style={resourceHeaderStyle}>
                            <div style={resourceIconStyle}>{resource.icon}</div>
                            <div>
                                <h3 style={resourceTitleStyle}>
                                    {resource.title}
                                </h3>
                                <div style={resourceMetaStyle}>
                                    <div style={resourceMetaItemStyle}>
                                        <AcademicCapIcon
                                            style={{
                                                width: "1rem",
                                                height: "1rem",
                                            }}
                                        />
                                        <span>{resource.level}</span>
                                    </div>
                                    {resource.duration && (
                                        <div style={resourceMetaItemStyle}>
                                            <PlayCircleIcon
                                                style={{
                                                    width: "1rem",
                                                    height: "1rem",
                                                }}
                                            />
                                            <span>{resource.duration}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <p style={resourceDescriptionStyle}>
                            {resource.description}
                        </p>
                        <div style={tagsContainerStyle}>
                            {resource.tags.map((tag) => (
                                <span key={tag} style={tagStyle}>
                                    {tag}
                                </span>
                            ))}
                        </div>
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
                            {resource.type === "video" ? (
                                <>
                                    <PlayCircleIcon
                                        style={{
                                            width: "1.25rem",
                                            height: "1.25rem",
                                        }}
                                    />
                                    <span>Watch Now</span>
                                </>
                            ) : resource.type === "template" ? (
                                <>
                                    <ArrowDownTrayIcon
                                        style={{
                                            width: "1.25rem",
                                            height: "1.25rem",
                                        }}
                                    />
                                    <span>Download</span>
                                </>
                            ) : (
                                <>
                                    <LightBulbIcon
                                        style={{
                                            width: "1.25rem",
                                            height: "1.25rem",
                                        }}
                                    />
                                    <span>Learn More</span>
                                </>
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Resources;
