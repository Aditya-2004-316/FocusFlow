import React, { useMemo, useState } from "react";
import {
    AcademicCapIcon,
    ArrowDownTrayIcon,
    BookOpenIcon,
    DocumentTextIcon,
    LightBulbIcon,
    PlayCircleIcon,
    PresentationChartLineIcon,
    VideoCameraIcon,
} from "@heroicons/react/24/outline";

const heroTags = ["Guides", "Templates", "Workshops", "Community picks"];

const resourceLibrary = [
    {
        id: "resource-1",
        title: "Getting started with FocusFlow",
        description: "Set up timers, distraction logging, and dashboards in under 15 minutes.",
        type: "guide",
        icon: BookOpenIcon,
        level: "Beginner",
        duration: "15 min read",
        tags: ["Onboarding", "Timers", "Basics"],
        content:
            "Welcome to FocusFlow! This guide walks you through configuring your timer presets, logging distractions in a single click, and reading trends in the Statistics view.\n\n1) Calibrate focus, short break, and long break durations.\n2) Pin the distraction capture panel so it is one shortcut away.\n3) End the day with a lightweight retrospective to keep tomorrow frictionless.",
        bullets: ["Customize presets with auto-start options", "Capture distractions without losing flow", "Review streaks and highs/lows each evening"],
    },
    {
        id: "resource-2",
        title: "Mastering the Pomodoro technique",
        description: "Video walkthrough of high-output teams using Pomodoro the modern way.",
        type: "video",
        icon: VideoCameraIcon,
        level: "Intermediate",
        duration: "12:30",
        tags: ["Pomodoro", "Focus", "Habits"],
        videoUrl: "https://www.youtube.com/embed/mNBmG24djoY",
    },
    {
        id: "resource-3",
        title: "Advanced focus techniques",
        description: "Deep work tactics for engineers, writers, and product teams.",
        type: "article",
        icon: LightBulbIcon,
        level: "Advanced",
        duration: "20 min read",
        tags: ["Deep work", "Flow", "Rituals"],
        content:
            "Deep work demands deliberate environments. This playbook covers: time-blocking your week, batching context to halve ramp-up time, and pre-loading recovery rituals that keep burnout at bay.",
        bullets: ["Design a recovery-first calendar", "Batch similar tasks to reduce context switching", "Introduce hard shutdown rituals"],
    },
    {
        id: "resource-4",
        title: "Productivity templates pack",
        description: "Download pre-built agendas, review docs, and async update sheets.",
        type: "template",
        icon: DocumentTextIcon,
        level: "All levels",
        tags: ["Templates", "Planning", "Async"],
    },
    {
        id: "resource-5",
        title: "Time management fundamentals",
        description: "Foundation series on prioritising, sequencing tasks, and staying accountable.",
        type: "guide",
        icon: AcademicCapIcon,
        level: "Beginner",
        duration: "25 min read",
        tags: ["Time management", "Planning", "Habits"],
        content:
            "Use outcome-first planning to connect weekly goals to daily focus blocks. Blend weekly reviews with daily shutdown rituals so nothing slips through the cracks.",
        bullets: ["Outcome-first planning", "Simple capture + triage", "Weekly + daily reviews that stick"],
    },
    {
        id: "resource-6",
        title: "Productivity workshop replay",
        description: "Watch the live session on sustainable focus habits and energy audits.",
        type: "video",
        icon: PresentationChartLineIcon,
        level: "Intermediate",
        duration: "45:00",
        tags: ["Workshop", "Habits", "Energy"],
        videoUrl: "https://www.youtube.com/embed/3E7hkPZ-HTk",
    },
];

const learningTracks = [
    {
        title: "Kickstart FocusFlow",
        duration: "7-day plan",
        description: "Pair structured focus blocks with effortless reflection rituals to build momentum fast.",
        outline: ["Day 1-2 · Configure presets and baseline metrics", "Day 3-4 · Capture distractions + run micro retros", "Day 5-7 · Ship a weekly review and reset"],
    },
    {
        title: "Deep work accelerator",
        duration: "14-day sprint",
        description: "Protect big project energy with long-form focus windows and energy audits.",
        outline: ["Week 1 · Map milestones + guard calendar", "Week 2 · Automate prep + reduce context switching", "Final retro · Celebrate wins + adjust rituals"],
    },
    {
        title: "Creative recharge",
        duration: "Weekend reset",
        description: "Blend light structure with creative play so Monday starts charged, not drained.",
        outline: ["Sat AM · Inspiration sweep + intention setting", "Sat PM · Guided creative block with playlist", "Sun · Reflection walk + journal prompts"],
    },
];

const resourceBundles = [
    {
        title: "Deep work toolkit",
        description: "Templates and prompts to double down on immersive creation without overwhelm.",
        items: ["Focus block agenda", "Context switch minimiser checklist", "Ambient playlists to cue entry"],
    },
    {
        title: "Study sprint pack",
        description: "Keep exam prep on rails with accountability trackers and reflection loops.",
        items: ["30-day accountability tracker", "Active recall flashcard guide", "Weekly improvement retro"],
    },
    {
        title: "Team focus library",
        description: "Help squads sync asynchronously with minimal meetings and maximum clarity.",
        items: ["Stand-up notes canvas", "Async handoff checklist", "Retro board starter"],
    },
];

const communitySignals = [
    {
        icon: "🚀",
        title: "Creators using templates",
        metric: "2.4k downloads",
        description: "Side-project builders rely on the template wall to launch faster with less friction.",
    },
    {
        icon: "🎧",
        title: "Focus playlists shared",
        metric: "48 mixes",
        description: "Community-sourced playlists cover mellow lo-fi, binaural beats, and rain room vibes.",
    },
    {
        icon: "📝",
        title: "Guides bookmarked",
        metric: "6.3k saves",
        description: "Most-loved guides dive into distraction-proof workflows and energy mapping.",
    },
];

const categories = [
    { key: "all", label: "All" },
    { key: "guide", label: "Guides" },
    { key: "video", label: "Videos" },
    { key: "article", label: "Articles" },
    { key: "template", label: "Templates" },
];

const styles = {
    page: {
        minHeight: "100vh",
        background: "var(--color-white)",
        color: "var(--color-gray-900)",
        transition: "background 0.3s ease, color 0.3s ease",
        padding: "4.5rem 1.75rem 5rem",
    },
    container: {
        maxWidth: "1100px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "2.75rem",
    },
    hero: {
        borderRadius: "1.5rem",
        padding: "2.85rem",
        background: "linear-gradient(136deg, rgba(56,189,248,0.16), rgba(129,140,248,0.22))",
        border: "1px solid rgba(56,189,248,0.26)",
        boxShadow: "0 30px 82px -50px rgba(56,189,248,0.55)",
        display: "grid",
        gap: "1.55rem",
    },
    heroTitle: {
        fontSize: "2.35rem",
        fontWeight: 700,
        lineHeight: 1.2,
        margin: 0,
        background: "linear-gradient(110deg, #38bdf8, #818cf8)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
    },
    heroLead: {
        fontSize: "1.08rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.75,
        maxWidth: "48rem",
    },
    heroTags: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.55rem",
    },
    heroTag: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        padding: "0.42rem 0.9rem",
        borderRadius: "9999px",
        background: "rgba(15,23,42,0.14)",
        color: "var(--color-primary-700)",
        fontSize: "0.82rem",
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
    },
    section: {
        borderRadius: "1.25rem",
        border: "1px solid var(--input-border)",
        background: "var(--panel-bg)",
        boxShadow: "var(--shadow-lg)",
        padding: "2.35rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.6rem",
    },
    sectionHeader: {
        display: "grid",
        gap: "0.45rem",
    },
    sectionTitle: {
        fontSize: "1.6rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
    },
    sectionLead: {
        fontSize: "1rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.68,
        maxWidth: "46rem",
    },
    searchPanel: {
        display: "grid",
        gap: "1.25rem",
    },
    searchInput: {
        width: "100%",
        padding: "0.85rem 1.15rem",
        borderRadius: "0.85rem",
        border: "1px solid var(--input-border)",
        background: "var(--input-bg)",
        color: "var(--color-gray-900)",
        fontSize: "1rem",
        outline: "none",
    },
    filterBar: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.65rem",
    },
    filterChip: {
        padding: "0.55rem 1.2rem",
        borderRadius: "0.9rem",
        fontWeight: 600,
        fontSize: "0.95rem",
        border: "1px solid var(--color-gray-200)",
        background: "var(--color-gray-100)",
        color: "var(--color-gray-600)",
        cursor: "pointer",
        transition: "all 0.18s ease",
    },
    filterChipActive: {
        background: "var(--color-primary-100)",
        color: "var(--color-primary-700)",
        border: "1px solid var(--color-primary-300)",
        boxShadow: "var(--shadow-md)",
    },
    resourceGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1.5rem",
    },
    resourceCard: {
        borderRadius: "1.15rem",
        border: "1px solid var(--input-border)",
        background: "var(--panel-bg)",
        boxShadow: "var(--shadow-md)",
        padding: "1.75rem",
        display: "grid",
        gap: "0.95rem",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
    },
    resourceCardHover: {
        transform: "translateY(-4px)",
        boxShadow: "0 24px 55px -32px rgba(56,189,248,0.45)",
    },
    resourceHeader: {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
    },
    resourceIcon: {
        width: "2.75rem",
        height: "2.75rem",
        borderRadius: "0.85rem",
        background: "rgba(56,189,248,0.16)",
        color: "#38bdf8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    resourceTitle: {
        fontSize: "1.1rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
    },
    resourceMeta: {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "0.75rem",
        fontSize: "0.85rem",
        fontWeight: 600,
        color: "var(--color-primary-600)",
    },
    resourceDescription: {
        fontSize: "0.95rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.7,
    },
    tagPill: {
        padding: "0.32rem 0.9rem",
        borderRadius: "9999px",
        background: "rgba(15,23,42,0.12)",
        color: "var(--color-gray-600)",
        fontSize: "0.8rem",
        fontWeight: 600,
    },
    cardAction: {
        alignSelf: "flex-start",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.65rem 1.4rem",
        borderRadius: "0.9rem",
        border: "1px solid var(--color-primary-200)",
        background: "var(--color-primary-50)",
        color: "var(--color-primary-700)",
        fontWeight: 600,
        fontSize: "0.92rem",
        cursor: "pointer",
        transition: "all 0.18s ease",
    },
    cardActionHover: {
        background: "var(--color-primary-100)",
        borderColor: "var(--color-primary-300)",
        transform: "translateY(-2px)",
        boxShadow: "0 16px 40px -26px rgba(56,189,248,0.6)",
    },
    highlightGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1.5rem",
    },
    highlightCard: {
        borderRadius: "1.05rem",
        border: "1px solid var(--input-border)",
        background: "var(--panel-bg)",
        boxShadow: "var(--shadow-md)",
        padding: "1.7rem",
        display: "grid",
        gap: "0.85rem",
    },
    highlightHeader: {
        display: "flex",
        alignItems: "center",
        gap: "0.8rem",
    },
    highlightIcon: {
        width: "2.5rem",
        height: "2.5rem",
        borderRadius: "0.85rem",
        background: "var(--color-primary-100)",
        color: "var(--color-primary-600)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.25rem",
    },
    highlightDescription: {
        fontSize: "0.92rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.65,
    },
    list: {
        margin: 0,
        paddingLeft: "1.2rem",
        display: "grid",
        gap: "0.45rem",
        color: "var(--color-gray-600)",
        fontSize: "0.9rem",
        lineHeight: 1.6,
    },
};

const modalStyles = {
    overlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(8,15,26,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        zIndex: 1000,
    },
    dialog: {
        width: "100%",
        maxWidth: "42rem",
        borderRadius: "1.15rem",
        border: "1px solid var(--input-border)",
        background: "var(--panel-bg)",
        boxShadow: "0 28px 80px -40px rgba(15,23,42,0.68)",
        display: "flex",
        flexDirection: "column",
        maxHeight: "82vh",
        overflow: "hidden",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.3rem 1.6rem",
        borderBottom: "1px solid var(--input-border)",
    },
    body: {
        padding: "1.6rem",
        overflowY: "auto",
        display: "grid",
        gap: "1.1rem",
    },
    close: {
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "1.2rem",
        color: "var(--color-gray-500)",
    },
    modalAction: {
        alignSelf: "flex-start",
        margin: "0 1.6rem 1.6rem",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.7rem 1.6rem",
        borderRadius: "0.95rem",
        background: "linear-gradient(110deg, #38bdf8, #60a5fa)",
        color: "#0f172a",
        border: "none",
        fontWeight: 600,
        cursor: "pointer",
        boxShadow: "0 22px 42px -28px rgba(56,189,248,0.65)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
    },
};

const Resources = () => {
    const [activeCategory, setActiveCategory] = useState("all");
    const [query, setQuery] = useState("");
    const [selectedResource, setSelectedResource] = useState(null);

    const filteredResources = useMemo(() => {
        const normalisedQuery = query.trim().toLowerCase();
        return resourceLibrary.filter((resource) => {
            const matchesCategory = activeCategory === "all" || resource.type === activeCategory;
            if (!matchesCategory) return false;
            if (!normalisedQuery) return true;
            const haystack = [
                resource.title,
                resource.description,
                resource.level,
                ...(resource.tags || []),
            ]
                .join(" ")
                .toLowerCase();
            return haystack.includes(normalisedQuery);
        });
    }, [activeCategory, query]);

    const handleResourceAction = (resource) => {
        if (resource.type === "template") {
            // TODO: replace with real download once asset URLs are wired up.
            console.info(`Download requested for ${resource.title}`);
        } else {
            setSelectedResource(resource);
        }
    };

    const renderResourceIcon = (resource) => {
        const Icon = resource.icon || BookOpenIcon;
        return <Icon style={{ width: "1.45rem", height: "1.45rem" }} />;
    };

    const renderModalContent = (resource) => {
        if (!resource) return null;
        if (resource.type === "video" && resource.videoUrl) {
            return (
                <iframe
                    title={resource.title}
                    src={resource.videoUrl}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ width: "100%", height: "320px", borderRadius: "1rem" }}
                />
            );
        }

        if (resource.content) {
            return resource.content.split("\n\n").map((paragraph, index) => (
                <p key={paragraph.slice(0, 12) + index} style={{ color: "var(--color-gray-700)", lineHeight: 1.7 }}>
                    {paragraph}
                </p>
            ));
        }

        return <p style={{ color: "var(--color-gray-600)" }}>More details coming soon.</p>;
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <section style={styles.hero}>
                    <h1 style={styles.heroTitle}>Resource library</h1>
                    <p style={styles.heroLead}>
                        Curated playbooks, replays, and toolkits that keep your focus practice evolving. Explore by format, search by topic, and save what keeps momentum high.
                    </p>
                    <div style={styles.heroTags}>
                        {heroTags.map((tag) => (
                            <span key={tag} style={styles.heroTag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Explore resources</h2>
                        <p style={styles.sectionLead}>
                            Filter by format or use quick search to surface the guides and workshops that match your current focus goal.
                        </p>
                    </div>
                    <div style={styles.searchPanel}>
                        <input
                            type="text"
                            placeholder="Search guides, videos, templates..."
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            style={styles.searchInput}
                        />
                        <div style={styles.filterBar}>
                            {categories.map((category) => (
                                <button
                                    key={category.key}
                                    type="button"
                                    style={
                                        activeCategory === category.key
                                            ? { ...styles.filterChip, ...styles.filterChipActive }
                                            : styles.filterChip
                                    }
                                    onClick={() => setActiveCategory(category.key)}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={styles.resourceGrid}>
                        {filteredResources.map((resource) => (
                            <div
                                key={resource.id}
                                style={styles.resourceCard}
                                onMouseEnter={(event) => Object.assign(event.currentTarget.style, styles.resourceCardHover)}
                                onMouseLeave={(event) => Object.assign(event.currentTarget.style, styles.resourceCard)}
                            >
                                <div style={styles.resourceHeader}>
                                    <div style={styles.resourceIcon}>{renderResourceIcon(resource)}</div>
                                    <div>
                                        <div style={styles.resourceTitle}>{resource.title}</div>
                                        <div style={styles.resourceMeta}>
                                            <span>{resource.level}</span>
                                            {resource.duration && <span>{resource.duration}</span>}
                                        </div>
                                    </div>
                                </div>
                                <p style={styles.resourceDescription}>{resource.description}</p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                                    {(resource.tags || []).map((tag) => (
                                        <span key={`${resource.id}-${tag}`} style={styles.tagPill}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    style={styles.cardAction}
                                    onMouseEnter={(event) => Object.assign(event.currentTarget.style, styles.cardActionHover)}
                                    onMouseLeave={(event) => Object.assign(event.currentTarget.style, styles.cardAction)}
                                    onClick={() => handleResourceAction(resource)}
                                >
                                    {resource.type === "video" && <PlayCircleIcon style={{ width: "1rem", height: "1rem" }} />}
                                    {resource.type === "template" && <ArrowDownTrayIcon style={{ width: "1rem", height: "1rem" }} />}
                                    {resource.type !== "video" && resource.type !== "template" && (
                                        <BookOpenIcon style={{ width: "1rem", height: "1rem" }} />
                                    )}
                                    {resource.type === "template"
                                        ? "Download"
                                        : resource.type === "video"
                                        ? "Watch"
                                        : "Read"}
                                </button>
                            </div>
                        ))}
                        {filteredResources.length === 0 && (
                            <div
                                style={{
                                    display: "grid",
                                    gap: "0.5rem",
                                    justifyItems: "center",
                                    padding: "3rem 2rem",
                                    borderRadius: "1.1rem",
                                    border: "1px dashed var(--color-gray-200)",
                                    background: "var(--panel-bg)",
                                }}
                            >
                                <span style={{ fontSize: "1.05rem", fontWeight: 600 }}>No matches yet</span>
                                <span style={{ color: "var(--color-gray-600)", fontSize: "0.95rem" }}>
                                    Try a different keyword or reset the filters.
                                </span>
                            </div>
                        )}
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Learning tracks</h2>
                        <p style={styles.sectionLead}>
                            Structured sequences that mix focus blocks, reviews, and accountability prompts.
                        </p>
                    </div>
                    <div style={styles.highlightGrid}>
                        {learningTracks.map((track) => (
                            <div key={track.title} style={styles.highlightCard}>
                                <div style={styles.highlightHeader}>
                                    <div style={styles.highlightIcon}>
                                        <BookOpenIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "1.18rem", fontWeight: 600 }}>{track.title}</div>
                                        <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--color-primary-600)" }}>
                                            {track.duration}
                                        </span>
                                    </div>
                                </div>
                                <p style={styles.highlightDescription}>{track.description}</p>
                                <ul style={styles.list}>
                                    {track.outline.map((item) => (
                                        <li key={`${track.title}-${item}`}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Resource bundles</h2>
                        <p style={styles.sectionLead}>
                            Downloadable kits that bundle templates, checklists, and prompts ready for immediate use.
                        </p>
                    </div>
                    <div style={styles.highlightGrid}>
                        {resourceBundles.map((bundle) => (
                            <div key={bundle.title} style={styles.highlightCard}>
                                <div style={styles.highlightHeader}>
                                    <div style={styles.highlightIcon}>
                                        <DocumentTextIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                                    </div>
                                    <div style={{ fontSize: "1.18rem", fontWeight: 600 }}>{bundle.title}</div>
                                </div>
                                <p style={styles.highlightDescription}>{bundle.description}</p>
                                <ul style={styles.list}>
                                    {bundle.items.map((item) => (
                                        <li key={`${bundle.title}-${item}`}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Community signals</h2>
                        <p style={styles.sectionLead}>
                            Real-time proof of how builders and study crews apply these tools week over week.
                        </p>
                    </div>
                    <div style={styles.highlightGrid}>
                        {communitySignals.map((signal) => (
                            <div key={signal.title} style={styles.highlightCard}>
                                <div style={styles.highlightHeader}>
                                    <div style={styles.highlightIcon}>{signal.icon}</div>
                                    <div>
                                        <div style={{ fontSize: "1.18rem", fontWeight: 600 }}>{signal.title}</div>
                                        <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--color-primary-600)" }}>
                                            {signal.metric}
                                        </span>
                                    </div>
                                </div>
                                <p style={styles.highlightDescription}>{signal.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {selectedResource && (
                <div style={modalStyles.overlay}>
                    <div style={modalStyles.dialog}>
                        <div style={modalStyles.header}>
                            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, margin: 0 }}>{selectedResource.title}</h3>
                            <button style={modalStyles.close} onClick={() => setSelectedResource(null)}>
                                ✕
                            </button>
                        </div>
                        <div style={modalStyles.body}>
                            {renderModalContent(selectedResource)}
                            {Array.isArray(selectedResource.bullets) && selectedResource.bullets.length > 0 && (
                                <div>
                                    <h4 style={{ fontWeight: 600, marginBottom: "0.45rem" }}>Key takeaways</h4>
                                    <ul style={styles.list}>
                                        {selectedResource.bullets.map((bullet) => (
                                            <li key={`${selectedResource.id}-${bullet}`}>{bullet}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        {selectedResource.type === "template" && (
                            <button
                                type="button"
                                style={modalStyles.modalAction}
                                onMouseEnter={(event) =>
                                    Object.assign(event.currentTarget.style, {
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 26px 50px -30px rgba(56,189,248,0.75)",
                                    })
                                }
                                onMouseLeave={(event) => Object.assign(event.currentTarget.style, modalStyles.modalAction)}
                                onClick={() => handleResourceAction(selectedResource)}
                            >
                                <ArrowDownTrayIcon style={{ width: "1rem", height: "1rem" }} /> Download template
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Resources;
