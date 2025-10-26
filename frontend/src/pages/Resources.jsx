import React, { useState, useEffect } from "react";
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

const Resources = () => {
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedResource, setSelectedResource] = useState(null);

    const resources = [
        {
            id: "1",
            title: "Getting Started with FocusFlow",
            description:
                "A comprehensive guide to help you make the most of FocusFlow's features and boost your productivity.",
            type: "guide",
            icon: "BookOpenIcon",
            duration: "15 min read",
            level: "beginner",
            tags: ["Basics", "Getting Started", "Features"],
            content:
                "Welcome to FocusFlow! This guide walks you through setting up your profile, configuring timer preferences, and understanding the core features like Pomodoro sessions, distractions logging, and statistics.\n\n1) Configure your timer: Choose pomodoro, short break, and long break durations that suit your workflow.\n\n2) Start your first session: Use the Start Focus Session button to begin.\n\n3) Log distractions: Use the Log Distraction button anytime to capture context on interruptions.\n\n4) Review insights: Check the Statistics page for daily/weekly trends and productivity score.",
            bullets: [
                "Customize timer durations and auto-start behavior",
                "Use quick-select options to log distractions fast",
                "Track productivity with daily and weekly insights",
            ],
        },
        {
            id: "2",
            title: "Mastering the Pomodoro Technique",
            description:
                "Learn how to effectively use the Pomodoro Technique to maximize your focus and productivity.",
            type: "video",
            icon: "VideoCameraIcon",
            duration: "12:30",
            level: "intermediate",
            tags: ["Pomodoro", "Time Management", "Focus"],
            videoUrl: "https://www.youtube.com/embed/mNBmG24djoY",
        },
        {
            id: "3",
            title: "Productivity Templates",
            description:
                "Download our collection of customizable templates for task management and project planning.",
            type: "template",
            icon: "DocumentTextIcon",
            level: "beginner",
            tags: ["Templates", "Planning", "Organization"],
        },
        {
            id: "4",
            title: "Advanced Focus Techniques",
            description:
                "Explore advanced strategies for maintaining focus and achieving deep work states.",
            type: "article",
            icon: "LightBulbIcon",
            duration: "20 min read",
            level: "advanced",
            tags: ["Deep Work", "Focus", "Advanced"],
            content:
                "Deep work requires intentional design of environment, schedule, and attention. This article covers time-blocking, batching, environment priming, and building recovery into your day.\n\nYou will learn practical exercises for reducing context switching, protecting your calendar for high-impact work, and creating end-of-day routines that sustain energy over time.",
            bullets: [
                "Time-blocking and batching for fewer context switches",
                "Environment design: remove friction, add cues",
                "Recovery loops: breaks, movement, and sleep",
            ],
        },
        {
            id: "5",
            title: "Time Management Fundamentals",
            description:
                "Essential principles and practices for effective time management in any context.",
            type: "guide",
            icon: "AcademicCapIcon",
            duration: "25 min read",
            level: "beginner",
            tags: ["Time Management", "Basics", "Planning"],
            content:
                "Master the core pillars: clarity, prioritization, and review.\n\nStart with a weekly review to clarify outcomes, then translate them into time-blocked commitments. Use a simple capture system to offload mental clutter and a daily shutdown ritual to maintain work-life boundaries.",
            bullets: [
                "Outcome-first planning (from goals to blocks)",
                "Simple capture and triage process",
                "Weekly and daily reviews that actually stick",
            ],
        },
        {
            id: "6",
            title: "Productivity Workshop",
            description:
                "Join our expert-led workshop on building sustainable productivity habits.",
            type: "video",
            icon: "PresentationChartLineIcon",
            duration: "45:00",
            level: "intermediate",
            tags: ["Workshop", "Habits", "Learning"],
            videoUrl: "https://www.youtube.com/embed/3E7hkPZ-HTk",
        },
        {
            id: "7",
            title: "Mindfulness for Focus",
            description:
                "Learn mindfulness techniques to enhance concentration and reduce mental clutter during work sessions.",
            type: "article",
            icon: "LightBulbIcon",
            duration: "12 min read",
            level: "beginner",
            tags: ["Mindfulness", "Focus", "Mental Health"],
            content:
                "Mindfulness practices can significantly improve your ability to focus. This guide covers breathing exercises, meditation techniques, and practical tips for staying present during work. Learn how to recognize distractions before they derail your focus and develop a sustainable mindfulness practice.",
            bullets: [
                "5-minute breathing exercises for instant focus",
                "Meditation techniques for busy professionals",
                "Building awareness of distraction patterns",
            ],
        },
        {
            id: "8",
            title: "Digital Minimalism Guide",
            description:
                "Reduce digital distractions and create a focused digital environment for maximum productivity.",
            type: "guide",
            icon: "BookOpenIcon",
            duration: "18 min read",
            level: "intermediate",
            tags: ["Digital Wellness", "Distractions", "Productivity"],
            content:
                "Digital minimalism is about intentionally choosing which digital tools add value to your life. This guide helps you audit your digital habits, eliminate unnecessary apps and notifications, and create a distraction-free workspace. Includes practical steps for phone setup, browser extensions, and workspace organization.",
            bullets: [
                "App audit and notification management",
                "Browser extensions for focus",
                "Creating distraction-free zones",
            ],
        },
        {
            id: "9",
            title: "Energy Management Strategies",
            description:
                "Optimize your energy levels throughout the day to maintain peak performance and avoid burnout.",
            type: "article",
            icon: "AcademicCapIcon",
            duration: "16 min read",
            level: "advanced",
            tags: ["Energy", "Performance", "Health"],
            content:
                "Managing energy is more important than managing time. Learn to identify your peak performance hours, structure your day around energy cycles, and use strategic breaks to maintain high performance. Covers sleep optimization, nutrition for focus, and movement practices.",
            bullets: [
                "Identifying your chronotype and peak hours",
                "Strategic break timing and activities",
                "Nutrition and hydration for sustained energy",
            ],
        },
        {
            id: "10",
            title: "Goal Setting Framework",
            description:
                "Set and achieve meaningful goals using proven frameworks and tracking systems.",
            type: "template",
            icon: "DocumentTextIcon",
            level: "beginner",
            tags: ["Goals", "Planning", "Templates"],
        },
        {
            id: "11",
            title: "Overcoming Procrastination",
            description:
                "Understand the psychology of procrastination and learn practical strategies to overcome it.",
            type: "video",
            icon: "VideoCameraIcon",
            duration: "22:15",
            level: "intermediate",
            tags: ["Procrastination", "Psychology", "Motivation"],
            videoUrl: "https://www.youtube.com/embed/arj7oStGLkU",
        },
        {
            id: "12",
            title: "Weekly Review Template",
            description:
                "Downloadable template for conducting effective weekly reviews to stay on track with your goals.",
            type: "template",
            icon: "DocumentTextIcon",
            level: "beginner",
            tags: ["Templates", "Review", "Planning"],
        },
    ];

    const containerStyle = {
        maxWidth: "76rem",
        margin: "0 auto",
        padding: "2rem",
    };

    const headerStyle = {
        background:
            "linear-gradient(to right, var(--color-primary-500), var(--color-cyan-400))",
        borderRadius: "1rem",
        padding: "2rem",
        marginBottom: "2rem",
        color: "var(--color-white)",
        boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    };

    const titleStyle = {
        fontSize: "2rem",
        fontWeight: 700,
        marginBottom: "0.5rem",
    };

    const descriptionStyle = {
        fontSize: "1.125rem",
        opacity: 0.9,
        marginBottom: "1.5rem",
    };

    const searchContainerStyle = {
        marginBottom: "2rem",
    };

    const searchInputStyle = {
        width: "100%",
        padding: "0.75rem 1rem",
        borderRadius: "0.5rem",
        border: "1px solid var(--input-border)",
        fontSize: "1rem",
        color: "var(--color-gray-900)",
        backgroundColor: "var(--input-bg)",
    };

    const categoriesContainerStyle = {
        display: "flex",
        gap: "1rem",
        marginBottom: "2rem",
        flexWrap: "wrap",
        borderBottom: "2px solid var(--color-gray-200)",
        paddingBottom: "0.5rem",
    };

    const categoryButtonStyle = {
        padding: "0.75rem 1.5rem",
        fontSize: "1rem",
        fontWeight: 500,
        color: "var(--color-primary-700)",
        cursor: "pointer",
        borderRadius: "0.5rem",
        transition: "all 0.2s ease-in-out",
        border: "none",
        background: "var(--color-primary-50)",
    };

    const activeCategoryStyle = {
        ...categoryButtonStyle,
        background: "var(--color-primary-600)",
        color: "#ffffff",
    };

    const resourcesGridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1.5rem",
        marginBottom: "2rem",
    };

    const resourceCardStyle = {
        background: "var(--panel-bg)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        border: "1px solid var(--color-gray-200)",
        transition: "all 0.2s ease-in-out",
        marginBottom: "1.5rem",
        border: "1px solid var(--color-gray-100)",
    };

    const resourceCardHoverStyle = {
        transform: "translateY(-2px)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    };

    const resourceHeaderStyle = {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "1rem",
    };

    const resourceIconStyle = {
        width: "2.5rem",
        height: "2.5rem",
        borderRadius: "0.5rem",
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const resourceTitleStyle = {
        fontSize: "1.125rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const resourceDescriptionStyle = {
        fontSize: "0.875rem",
        color: "var(--color-gray-600)",
        marginBottom: "1rem",
        lineHeight: "1.5",
    };

    const resourceMetaStyle = {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "1rem",
    };

    const resourceMetaItemStyle = {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        fontSize: "0.75rem",
        color: "var(--color-gray-500)",
    };

    const tagsContainerStyle = {
        display: "flex",
        gap: "0.5rem",
        flexWrap: "wrap",
    };

    const tagStyle = {
        padding: "0.25rem 0.75rem",
        borderRadius: "9999px",
        fontSize: "0.75rem",
        fontWeight: 500,
        backgroundColor: "var(--color-gray-100)",
        color: "var(--color-gray-700)",
    };

    const actionButtonStyle = {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem 1rem",
        borderRadius: "0.375rem",
        fontSize: "0.875rem",
        fontWeight: 500,
        color: "var(--color-primary-700)",
        background: "var(--color-primary-50)",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        marginTop: "1rem",
        border: "none",
    };

    const actionButtonHoverStyle = {
        background: "var(--color-primary-100)",
    };

    const sectionHeadingStyle = {
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const sectionSubtitleStyle = {
        color: "var(--color-gray-600)",
        fontSize: "0.95rem",
        marginBottom: "1.5rem",
        lineHeight: 1.6,
    };

    const tracksGridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1.5rem",
        marginBottom: "2.5rem",
    };

    const trackCardStyle = {
        background: "var(--panel-bg)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        border: "1px solid var(--color-gray-200)",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
    };

    const trackHeaderStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "0.75rem",
        flexWrap: "wrap",
    };

    const trackMetaStyle = {
        display: "flex",
        gap: "0.5rem",
        flexWrap: "wrap",
        fontSize: "0.85rem",
        fontWeight: 600,
        color: "var(--color-primary-700)",
    };

    const trackBadgeStyle = {
        padding: "0.25rem 0.75rem",
        borderRadius: "9999px",
        background: "var(--color-primary-50)",
    };

    const trackDescriptionStyle = {
        fontSize: "0.9rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.6,
    };

    const trackOutlineListStyle = {
        paddingLeft: "1.25rem",
        color: "var(--color-gray-600)",
        fontSize: "0.85rem",
        lineHeight: 1.6,
        margin: 0,
    };

    const toolkitSectionStyle = {
        background: "var(--panel-bg)",
        borderRadius: "0.75rem",
        padding: "1.75rem",
        border: "1px solid var(--color-gray-200)",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        marginBottom: "2.5rem",
    };

    const toolkitGridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1.5rem",
    };

    const toolkitCardStyle = {
        background: "var(--color-gray-50)",
        borderRadius: "0.75rem",
        padding: "1.25rem",
        border: "1px solid var(--color-gray-200)",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
    };

    const toolkitTitleStyle = {
        fontSize: "1.05rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
    };

    const toolkitDescriptionStyle = {
        fontSize: "0.9rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.6,
    };

    const toolkitListStyle = {
        paddingLeft: "1.25rem",
        color: "var(--color-gray-600)",
        fontSize: "0.85rem",
        lineHeight: 1.6,
        margin: 0,
    };

    const highlightGridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "1.5rem",
        marginBottom: "2.5rem",
    };

    const highlightCardStyle = {
        background: "var(--panel-bg)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        border: "1px solid var(--color-gray-200)",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
    };

    const highlightHeaderStyle = {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
    };

    const highlightIconStyle = {
        width: "2.5rem",
        height: "2.5rem",
        borderRadius: "0.75rem",
        background: "var(--color-primary-50)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.35rem",
        color: "var(--color-primary-600)",
    };

    const highlightMetricStyle = {
        fontSize: "1.75rem",
        fontWeight: 700,
        color: "var(--color-primary-700)",
    };

    const highlightDescriptionStyle = {
        fontSize: "0.9rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.6,
    };

    const learningTracks = [
        {
            title: "Kickstart FocusFlow",
            duration: "7-day plan",
            focusAreas: ["Habits", "Timers"],
            description:
                "Build a reliable daily rhythm by pairing focus sessions with concise reflections and distraction logs.",
            outline: [
                "Day 1-2: Set up presets and baseline metrics",
                "Day 3-4: Layer in distraction logging and quick reviews",
                "Day 5-7: Add weekly retrospective and next-week planning",
            ],
        },
        {
            title: "Deep Work Accelerator",
            duration: "14-day sprint",
            focusAreas: ["Deep work", "Planning"],
            description:
                "Move a critical project forward with extended focus blocks, energy audits, and end-of-day shutdowns.",
            outline: [
                "Week 1: Map milestones and schedule protected blocks",
                "Week 2: Optimize breaks, automate context switches",
                "Final check-in: Share wins and iterate on the system",
            ],
        },
        {
            title: "Creative Recharge",
            duration: "Weekend reset",
            focusAreas: ["Creativity", "Wellness"],
            description:
                "Blend intentional rest with low-stakes creative sessions to reset attention and spark new ideas.",
            outline: [
                "Saturday AM: Light planning + inspiration sprint",
                "Saturday PM: Guided focus block with playlist",
                "Sunday: Reflection walk and journaling prompts",
            ],
        },
    ];

    const resourceBundles = [
        {
            title: "Deep work toolkit",
            description:
                "Everything you need to double down on immersive creation, from templates to pre-session rituals.",
            items: [
                "Focus block agenda template",
                "Context-switch minimizer checklist",
                "Ambient playlist recommendations",
            ],
        },
        {
            title: "Study sprint pack",
            description:
                "Designed for exam prep and coursework bursts with accountability prompts and reflection sheets.",
            items: [
                "30-day accountability tracker",
                "Active recall flashcard guide",
                "Weekly review and improvement retro",
            ],
        },
        {
            title: "Team focus library",
            description:
                "Help your squad sync on priorities with shared meeting notes, async updates, and retrospectives.",
            items: [
                "Stand-up notes template",
                "Async handoff checklist",
                "Retrospective mural starter",
            ],
        },
    ];

    const communityHighlights = [
        {
            icon: "🚀",
            title: "Creators using templates",
            metric: "2.4k downloads",
            description:
                "Members rely on the template hub to spin up project plans and personal dashboards in minutes.",
        },
        {
            icon: "🎧",
            title: "Focus playlists curated",
            metric: "48 mixes",
            description:
                "From lo-fi beats to binaural mixes, explore playlists shared by the community to match any session.",
        },
        {
            icon: "📝",
            title: "Guides bookmarked",
            metric: "6.3k saves",
            description:
                "Most-loved guides cover distraction-proof routines, energy management, and weekly planning rituals.",
        },
    ];

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

    const getIconComponent = (iconName) => {
        switch (iconName) {
            case "BookOpenIcon":
                return (
                    <BookOpenIcon
                        style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                );
            case "VideoCameraIcon":
                return (
                    <VideoCameraIcon
                        style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                );
            case "DocumentTextIcon":
                return (
                    <DocumentTextIcon
                        style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                );
            case "LightBulbIcon":
                return (
                    <LightBulbIcon
                        style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                );
            case "AcademicCapIcon":
                return (
                    <AcademicCapIcon
                        style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                );
            case "PresentationChartLineIcon":
                return (
                    <PresentationChartLineIcon
                        style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                );
            default:
                return (
                    <BookOpenIcon
                        style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                );
        }
    };

    const onOpenResource = (resource) => {
        setSelectedResource(resource);
    };

    const onCloseResource = () => {
        setSelectedResource(null);
    };

    useEffect(() => {
        const onEsc = (e) => {
            if (e.key === "Escape") onCloseResource();
        };
        window.addEventListener("keydown", onEsc);
        return () => window.removeEventListener("keydown", onEsc);
    }, []);

    const modalOverlayStyle = {
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        zIndex: 1000,
    };

    const modalStyle = {
        width: "100%",
        maxWidth: "42rem",
        background: "var(--panel-bg)",
        borderRadius: "1rem",
        padding: "1.5rem",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        border: "1px solid var(--color-gray-200)",
        maxHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
    };

    const modalHeaderStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem",
        flex: "0 0 auto",
    };

    const modalCloseButtonStyle = {
        background: "transparent",
        border: "none",
        cursor: "pointer",
        fontSize: "1.25rem",
        color: "var(--color-gray-500)",
    };

    const chip = (label) => (
        <span
            style={{
                display: "inline-block",
                padding: "0.15rem 0.5rem",
                fontSize: "0.7rem",
                borderRadius: "9999px",
                background: "var(--color-gray-100)",
                color: "var(--color-gray-700)",
            }}
        >
            {label}
        </span>
    );

    const downloadTemplate = (res) => {
        const content = `# ${res.title}\n\n${
            res.description
        }\n\nTags: ${res.tags.join(", ")}`;
        const blob = new Blob([content], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${res.title.replace(/\s+/g, "_")}.md`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };

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
                    className={
                        activeCategory === "all" ? "btn-primary" : "btn-secondary"
                    }
                    onClick={() => setActiveCategory("all")}
                >
                    All Resources
                </button>
                <button
                    className={
                        activeCategory === "guide" ? "btn-primary" : "btn-secondary"
                    }
                    onClick={() => setActiveCategory("guide")}
                >
                    Guides
                </button>
                <button
                    className={
                        activeCategory === "video" ? "btn-primary" : "btn-secondary"
                    }
                    onClick={() => setActiveCategory("video")}
                >
                    Videos
                </button>
                <button
                    className={
                        activeCategory === "article" ? "btn-primary" : "btn-secondary"
                    }
                    onClick={() => setActiveCategory("article")}
                >
                    Articles
                </button>
                <button
                    className={
                        activeCategory === "template" ? "btn-primary" : "btn-secondary"
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
                            <div style={resourceIconStyle}>
                                {getIconComponent(resource.icon)}
                            </div>
                            <div>
                                <h3 style={resourceTitleStyle}>
                                    {resource.title}
                                </h3>
                                <div style={resourceMetaStyle}>
                                    <span style={resourceMetaItemStyle}>
                                        {resource.level}
                                    </span>
                                    {resource.duration && (
                                        <span style={resourceMetaItemStyle}>
                                            {resource.duration}
                                        </span>
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
                            onClick={() => onOpenResource(resource)}
                        >
                            {resource.type === "video" ? (
                                <>
                                    <PlayCircleIcon
                                        style={{
                                            width: "1rem",
                                            height: "1rem",
                                        }}
                                    />
                                    Watch Now
                                </>
                            ) : resource.type === "template" ? (
                                <>
                                    <ArrowDownTrayIcon
                                        style={{
                                            width: "1rem",
                                            height: "1rem",
                                        }}
                                    />
                                    Download
                                </>
                            ) : (
                                <>
                                    <BookOpenIcon
                                        style={{
                                            width: "1rem",
                                            height: "1rem",
                                        }}
                                    />
                                    Learn More
                                </>
                            )}
                        </button>
                    </div>
                ))}
            </div>

            <section>
                <h2 style={sectionHeadingStyle}>Guided learning tracks</h2>
                <p style={sectionSubtitleStyle}>
                    Follow a curated sequence of guides, videos, and templates tailored to the type of progress
                    you're chasing—from your first FocusFlow setup to deep work sprints.
                </p>
                <div style={tracksGridStyle}>
                    {learningTracks.map((track, idx) => (
                        <div key={idx} style={trackCardStyle}>
                            <div style={trackHeaderStyle}>
                                <span style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--color-gray-900)" }}>
                                    {track.title}
                                </span>
                                <span style={trackBadgeStyle}>{track.duration}</span>
                            </div>
                            <div style={trackMetaStyle}>
                                {track.focusAreas.map((area) => (
                                    <span key={area} style={trackBadgeStyle}>
                                        {area}
                                    </span>
                                ))}
                            </div>
                            <p style={trackDescriptionStyle}>{track.description}</p>
                            <ul style={trackOutlineListStyle}>
                                {track.outline.map((item, outlineIdx) => (
                                    <li key={outlineIdx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section style={toolkitSectionStyle}>
                <h2 style={sectionHeadingStyle}>Downloadable toolkits</h2>
                <p style={sectionSubtitleStyle}>
                    Grab ready-made bundles that pair worksheets, checklists, and playlists so you can apply the
                    concepts instantly.
                </p>
                <div style={toolkitGridStyle}>
                    {resourceBundles.map((bundle, idx) => (
                        <div key={idx} style={toolkitCardStyle}>
                            <div style={toolkitTitleStyle}>{bundle.title}</div>
                            <p style={toolkitDescriptionStyle}>{bundle.description}</p>
                            <ul style={toolkitListStyle}>
                                {bundle.items.map((item, itemIdx) => (
                                    <li key={itemIdx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 style={sectionHeadingStyle}>Community highlights</h2>
                <p style={sectionSubtitleStyle}>
                    See how other makers are building momentum with resources shared across the FocusFlow community.
                </p>
                <div style={highlightGridStyle}>
                    {communityHighlights.map((highlight, idx) => (
                        <div key={idx} style={highlightCardStyle}>
                            <div style={highlightHeaderStyle}>
                                <div style={highlightIconStyle}>{highlight.icon}</div>
                                <div
                                    style={{
                                        fontSize: "1rem",
                                        fontWeight: 600,
                                        color: "var(--color-gray-900)",
                                    }}
                                >
                                    {highlight.title}
                                </div>
                            </div>
                            <div style={highlightMetricStyle}>{highlight.metric}</div>
                            <p style={highlightDescriptionStyle}>{highlight.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {selectedResource && (
                <div
                    style={modalOverlayStyle}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) onCloseResource();
                    }}
                >
                    <div style={modalStyle}>
                        <div style={modalHeaderStyle}>
                            <h3
                                style={{ fontSize: "1.25rem", fontWeight: 700 }}
                            >
                                {selectedResource.title}
                            </h3>
                            <button
                                onClick={onCloseResource}
                                aria-label="Close"
                                style={modalCloseButtonStyle}
                            >
                                ×
                            </button>
                        </div>
                        <div
                            style={{
                                flex: "1 1 auto",
                                overflowY: "auto",
                                paddingRight: "0.25rem",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    gap: "0.75rem",
                                    marginBottom: "0.75rem",
                                    flexWrap: "wrap",
                                }}
                            >
                                {chip(selectedResource.type)}
                                {selectedResource.level &&
                                    chip(selectedResource.level)}
                                {selectedResource.duration &&
                                    chip(selectedResource.duration)}
                            </div>
                            <p
                                style={{
                                    color: "var(--color-gray-700)",
                                    marginBottom: "1rem",
                                }}
                            >
                                {selectedResource.description}
                            </p>

                            {selectedResource.type === "video" && (
                                <div
                                    style={{
                                        width: "100%",
                                        aspectRatio: "16 / 9",
                                        background: "#111827",
                                        borderRadius: "0.75rem",
                                        overflow: "hidden",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    {selectedResource.videoUrl ? (
                                        <iframe
                                            src={selectedResource.videoUrl}
                                            title={selectedResource.title}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                border: 0,
                                            }}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "#e5e7eb",
                                            }}
                                        >
                                            Video player placeholder
                                        </div>
                                    )}
                                </div>
                            )}

                            {selectedResource.type !== "video" &&
                                selectedResource.content && (
                                    <div
                                        style={{
                                            background: "var(--color-gray-50)",
                                            border: "1px solid var(--color-gray-100)",
                                            borderRadius: "0.75rem",
                                            padding: "1rem",
                                            marginBottom: "1rem",
                                        }}
                                    >
                                        {selectedResource.content
                                            .split("\n\n")
                                            .map((p, idx) => (
                                                <p
                                                    key={idx}
                                                    style={{
                                                        marginBottom: "0.75rem",
                                                        color: "var(--color-gray-800)",
                                                    }}
                                                >
                                                    {p}
                                                </p>
                                            ))}
                                    </div>
                                )}

                            {Array.isArray(selectedResource.bullets) &&
                                selectedResource.bullets.length > 0 && (
                                    <div style={{ marginTop: "0.5rem" }}>
                                        <h4
                                            style={{
                                                fontWeight: 600,
                                                marginBottom: "0.5rem",
                                            }}
                                        >
                                            Key takeaways
                                        </h4>
                                        <ul
                                            style={{
                                                paddingLeft: "1.25rem",
                                                color: "var(--color-gray-700)",
                                            }}
                                        >
                                            {selectedResource.bullets.map(
                                                (b, i) => (
                                                    <li
                                                        key={i}
                                                        style={{
                                                            marginBottom:
                                                                "0.35rem",
                                                        }}
                                                    >
                                                        {b}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Resources;
