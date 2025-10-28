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

    const heroChips = [
        "Guides & templates",
        "Workshop replays",
        "Ritual toolkits",
        "Community picks",
    ];

    const resourcesContainerStyle = {
        background: "rgba(17, 24, 39, 0.7)",
        borderRadius: "1.1rem",
        padding: "1.85rem",
        border: "1px solid rgba(148, 163, 184, 0.22)",
        boxShadow: "0 28px 60px -36px rgba(8, 47, 73, 0.68)",
        display: "flex",
        flexDirection: "column",
        gap: "1.75rem",
    };

    const searchContainerStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    };

    const searchInputStyle = {
        width: "100%",
        padding: "0.85rem 1.15rem",
        borderRadius: "0.75rem",
        border: "1px solid rgba(148, 163, 184, 0.28)",
        fontSize: "1rem",
        color: "#f8fafc",
        backgroundColor: "rgba(15, 23, 42, 0.6)",
        outline: "none",
    };

    const categoriesContainerStyle = {
        display: "flex",
        gap: "0.75rem",
        flexWrap: "wrap",
    };

    const categoryButtonStyle = {
        padding: "0.55rem 1.3rem",
        fontSize: "0.95rem",
        fontWeight: 600,
        color: "#94a3b8",
        cursor: "pointer",
        borderRadius: "0.75rem",
        border: "1px solid rgba(148, 163, 184, 0.18)",
        background: "rgba(15, 23, 42, 0.35)",
        transition: "all 0.2s ease",
    };

    const activeCategoryStyle = {
        ...categoryButtonStyle,
        background: "rgba(56, 189, 248, 0.18)",
        color: "#f8fafc",
        border: "1px solid rgba(56, 189, 248, 0.4)",
        boxShadow: "0 12px 28px -20px rgba(56, 189, 248, 0.5)",
    };

    const resourcesGridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1.5rem",
    };

    const resourceCardStyle = {
        background: "rgba(15, 23, 42, 0.6)",
        borderRadius: "1rem",
        padding: "1.7rem",
        border: "1px solid rgba(148, 163, 184, 0.2)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    };

    const resourceCardHoverStyle = {
        transform: "translateY(-3px)",
        boxShadow: "0 20px 45px -30px rgba(56, 189, 248, 0.35)",
    };

    const resourceHeaderStyle = {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
    };

    const resourceIconStyle = {
        width: "2.6rem",
        height: "2.6rem",
        borderRadius: "0.75rem",
        background: "rgba(56, 189, 248, 0.16)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#38bdf8",
    };

    const resourceTitleStyle = {
        fontSize: "1.1rem",
        fontWeight: 600,
        color: "#f8fafc",
        marginBottom: "0.35rem",
    };

    const resourceDescriptionStyle = {
        fontSize: "0.95rem",
        color: "#cbd5f5",
        lineHeight: 1.7,
    };

    const resourceMetaStyle = {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "wrap",
        color: "#9fb6ff",
        fontSize: "0.85rem",
        fontWeight: 600,
    };

    const resourceMetaItemStyle = {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
    };

    const heroChipRowStyle = {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.65rem",
    };

    const heroChipStyle = {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        background: "rgba(56, 189, 248, 0.14)",
        color: "#38bdf8",
        padding: "0.45rem 0.85rem",
        borderRadius: "9999px",
        fontSize: "0.85rem",
        fontWeight: 600,
    };

    const containerStyle = {
        minHeight: "100vh",
        padding: "4.5rem 1.75rem 5rem",
        background: "var(--color-white)",
        color: "var(--color-gray-900)",
        overflowY: "auto",
        overflowX: "hidden",
    };

    const innerStyle = {
        maxWidth: "1120px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "2.75rem",
    };

    const heroStyle = {
        background: "var(--panel-bg)",
        borderRadius: "1.5rem",
        border: "1px solid var(--input-border)",
        padding: "2.75rem",
        boxShadow: "var(--shadow-lg)",
        display: "flex",
        flexDirection: "column",
        gap: "1.6rem",
    };

    const heroTitleStyle = {
        fontSize: "2.3rem",
        fontWeight: 700,
        lineHeight: 1.2,
        background: "linear-gradient(to right, #38bdf8, #818cf8)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        margin: 0,
    };

    const heroDescriptionStyle = {
        fontSize: "1.08rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.7,
        maxWidth: "44rem",
    };

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
        boxShadow: "var(--shadow-lg)",
        border: "1px solid var(--input-border)",
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
        color: "var(--color-gray-600)",
    };

    const highlightGridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "1.5rem",
    };

    const highlightCardStyle = {
        background: "var(--panel-bg)",
        borderRadius: "0.95rem",
        padding: "1.6rem",
        border: "1px solid var(--input-border)",
        boxShadow: "var(--shadow-md)",
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
        width: "2.4rem",
        height: "2.4rem",
        borderRadius: "0.75rem",
        background: "var(--color-primary-100)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.35rem",
        color: "var(--color-primary-600)",
    };

    const highlightMetricStyle = {
        fontSize: "1.65rem",
        fontWeight: 700,
        color: "var(--color-primary-600)",
    };

    const highlightDescriptionStyle = {
        fontSize: "0.92rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.65,
    };

    const toolkitListStyle = {
        paddingLeft: "1.25rem",
        color: "var(--color-gray-700)",
        fontSize: "0.85rem",
        lineHeight: 1.6,
        margin: 0,
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

    const getIconComponent = (iconName) => {
        switch (iconName) {
            case "BookOpenIcon":
                return (
                    <BookOpenIcon style={{ width: "1.5rem", height: "1.5rem" }} />
                );
            case "VideoCameraIcon":
                return (
                    <VideoCameraIcon style={{ width: "1.5rem", height: "1.5rem" }} />
                );
            case "DocumentTextIcon":
                return (
                    <DocumentTextIcon style={{ width: "1.5rem", height: "1.5rem" }} />
                );
            case "LightBulbIcon":
                return (
                    <LightBulbIcon style={{ width: "1.5rem", height: "1.5rem" }} />
                );
            case "AcademicCapIcon":
                return (
                    <AcademicCapIcon style={{ width: "1.5rem", height: "1.5rem" }} />
                );
            case "PresentationChartLineIcon":
                return (
                    <PresentationChartLineIcon style={{ width: "1.5rem", height: "1.5rem" }} />
                );
            default:
                return (
                    <BookOpenIcon style={{ width: "1.5rem", height: "1.5rem" }} />
                );
        }
    };

    const onCloseResource = () => {
        setSelectedResource(null);
    };

    return (
        <div style={containerStyle}>
            <div style={innerStyle}>
                <section style={heroStyle}>
                    <div>
                        <h1 style={heroTitleStyle}>Resources</h1>
                        <p style={heroDescriptionStyle}>
                            Explore curated guides, templates, and workshops that keep your focus practice evolving. Filter by format, search by topic, and dive in when you’re ready to level up.
                        </p>
                    </div>
                    <div style={heroChipRowStyle}>
                        {heroChips.map((chip) => (
                            <span key={chip} style={heroChipStyle}>
                                {chip}
                            </span>
                        ))}
                    </div>
                </section>
            <section style={resourcesContainerStyle}>
                <div style={searchContainerStyle}>
                    <input
                        type="text"
                        placeholder="Search resources..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={searchInputStyle}
                    />
                    <div style={categoriesContainerStyle}>
                        {[
                            { key: "all", label: "All" },
                            { key: "guide", label: "Guides" },
                            { key: "video", label: "Videos" },
                            { key: "article", label: "Articles" },
                            { key: "template", label: "Templates" },
                        ].map((category) => (
                            <button
                                key={category.key}
                                style={
                                    activeCategory === category.key
                                        ? activeCategoryStyle
                                        : categoryButtonStyle
                                }
                                onClick={() => setActiveCategory(category.key)}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={resourcesGridStyle}>
                    {filteredResources.map((resource) => (
                        <div
                            key={resource.id}
                            style={resourceCardStyle}
                            onMouseEnter={(e) =>
                                Object.assign(e.currentTarget.style, resourceCardHoverStyle)
                            }
                            onMouseLeave={(e) =>
                                Object.assign(e.currentTarget.style, resourceCardStyle)
                            }
                        >
                            <div style={resourceHeaderStyle}>
                                <div style={resourceIconStyle}>
                                    {getIconComponent(resource.icon)}
                                </div>
                                <div>
                                    <div style={resourceTitleStyle}>{resource.title}</div>
                                    <div style={resourceMetaStyle}>
                                        <span style={resourceMetaItemStyle}>{resource.level}</span>
                                        {resource.duration && (
                                            <span style={resourceMetaItemStyle}>
                                                {resource.duration}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <p style={resourceDescriptionStyle}>{resource.description}</p>

                            <div style={categoriesContainerStyle}>
                                {(resource.tags || []).map((tag) => (
                                    <span key={tag} style={categoryButtonStyle}>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <button
                                style={categoryButtonStyle}
                                onMouseEnter={(e) =>
                                    Object.assign(e.currentTarget.style, activeCategoryStyle)
                                }
                                onMouseLeave={(e) =>
                                    Object.assign(e.currentTarget.style, categoryButtonStyle)
                                }
                                onClick={() => setSelectedResource(resource)}
                            >
                                {resource.type === "video" ? (
                                    <>
                                        <PlayCircleIcon style={{ width: "1rem", height: "1rem" }} />
                                        Watch
                                    </>
                                ) : resource.type === "template" ? (
                                    <>
                                        <ArrowDownTrayIcon style={{ width: "1rem", height: "1rem" }} />
                                        Download
                                    </>
                                ) : (
                                    <>
                                        <BookOpenIcon style={{ width: "1rem", height: "1rem" }} />
                                        View
                                    </>
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            </section>
            <div style={{ display: "flex", flexDirection: "column", gap: "2.75rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
                    <h2 style={{ fontSize: "1.65rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                        Learning Tracks
                    </h2>
                    <div style={highlightGridStyle}>
                        {learningTracks.map((track, idx) => (
                            <div key={idx} style={highlightCardStyle}>
                                <div style={highlightHeaderStyle}>
                                    <div style={highlightIconStyle}>
                                        <BookOpenIcon style={{ width: "1.5rem", height: "1.5rem" }} />
                                    </div>
                                    <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.35rem" }}>
                                        {track.title}
                                    </h3>
                                </div>
                                <p style={highlightDescriptionStyle}>{track.description}</p>
                                <ul style={toolkitListStyle}>
                                    {track.outline.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
                    <h2 style={{ fontSize: "1.65rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                        Resource Bundles
                    </h2>
                    <div style={highlightGridStyle}>
                        {resourceBundles.map((bundle, idx) => (
                            <div key={idx} style={highlightCardStyle}>
                                <div style={highlightHeaderStyle}>
                                    <div style={highlightIconStyle}>
                                        <DocumentTextIcon style={{ width: "1.5rem", height: "1.5rem" }} />
                                    </div>
                                    <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.35rem" }}>
                                        {bundle.title}
                                    </h3>
                                </div>
                                <p style={highlightDescriptionStyle}>{bundle.description}</p>
                                <ul style={toolkitListStyle}>
                                    {bundle.items.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
                    <h2 style={{ fontSize: "1.65rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                        Community Highlights
                    </h2>
                    <div style={highlightGridStyle}>
                        {communityHighlights.map((highlight, idx) => (
                            <div key={idx} style={highlightCardStyle}>
                                <div style={highlightHeaderStyle}>
                                    <div style={highlightIconStyle}>{highlight.icon}</div>
                                    <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.35rem" }}>
                                        {highlight.title}
                                    </h3>
                                </div>
                                <p style={highlightMetricStyle}>{highlight.metric}</p>
                                <p style={highlightDescriptionStyle}>{highlight.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            </div>
            {selectedResource && (
                <div style={modalOverlayStyle}>
                    <div style={modalStyle}>
                        <div style={modalHeaderStyle}>
                            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.35rem" }}>
                                {selectedResource.title}
                            </h2>
                            <button style={modalCloseButtonStyle} onClick={onCloseResource}>
                                ✕
                            </button>
                        </div>
                        <div style={{ padding: "1rem" }}>
                            {selectedResource.type === "video" && selectedResource.videoUrl && (
                                <div style={{ width: "100%", height: "100%" }}>
                                    <iframe
                                        title={selectedResource.title}
                                        src={selectedResource.videoUrl}
                                        frameBorder="0"
                                        allowFullScreen
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </div>
                            )}
                            {selectedResource.type !== "video" && selectedResource.content && (
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
                                        .map((paragraph, idx) => (
                                            <p
                                                key={idx}
                                                style={{
                                                    marginBottom: "0.75rem",
                                                    color: "var(--color-gray-800)",
                                                }}
                                            >
                                                {paragraph}
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
                                            {selectedResource.bullets.map((bullet, idx) => (
                                                <li
                                                    key={idx}
                                                    style={{
                                                        marginBottom: "0.35rem",
                                                    }}
                                                >
                                                    {bullet}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                        </div>
                        {selectedResource.type === "template" && (
                            <button
                                style={{
                                    ...actionButtonStyle,
                                    marginTop: "1.5rem",
                                    alignSelf: "flex-start",
                                }}
                                onMouseEnter={(e) =>
                                    Object.assign(e.currentTarget.style, actionButtonHoverStyle)
                                }
                                onMouseLeave={(e) =>
                                    Object.assign(e.currentTarget.style, actionButtonStyle)
                                }
                                onClick={() => downloadTemplate(selectedResource)}
                            >
                                <ArrowDownTrayIcon style={{ width: "1rem", height: "1rem" }} />
                                Download template
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Resources;
