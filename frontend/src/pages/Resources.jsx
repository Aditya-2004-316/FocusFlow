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

const heroTags = ["🎯 Focus sprints", "🎬 Replay vault", "🧱 Template wall", "🌈 Community picks"];

const heroSpotlights = [
    { key: "start", icon: "✨", title: "Start here", caption: "FocusFlow 101 in minutes" },
    { key: "vault", icon: "🎥", title: "Watch party", caption: "Workshops on demand" },
    { key: "kit", icon: "🧰", title: "Grab the kit", caption: "Plug-and-play templates" },
];

const resourceLibrary = [
    {
        id: "resource-1",
        title: "Getting started with FocusFlow",
        description: "Spin up timers, capture distractions, and read stats in minutes.",
        type: "guide",
        icon: BookOpenIcon,
        level: "Beginner",
        duration: "15 min read",
        tags: ["Onboarding", "Timers", "Basics"],
        content:
            "Welcome to FocusFlow! This playbook covers calibrating presets, capturing distractions in one tap, and reviewing stats without friction.\n\n1) Tune focus + break durations to match your rhythm.\n2) Keep the distraction capture panel pinned for instant logging.\n3) Close the day with a 3-minute retro so tomorrow stays light.",
        bullets: ["Preset sprint setup", "One-tap distraction log", "End-of-day retro"],
    },
    {
        id: "resource-2",
        title: "Mastering the Pomodoro technique",
        description: "Video peek into modern Pomodoro teams.",
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
        description: "Deep work moves for builders and makers.",
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
        description: "Plug-and-play agendas, review docs, and async updates.",
        type: "template",
        icon: DocumentTextIcon,
        level: "All levels",
        tags: ["Templates", "Planning", "Async"],
    },
    {
        id: "resource-5",
        title: "Time management fundamentals",
        description: "Prioritise, plan, and stay accountable without burnout.",
        type: "guide",
        icon: AcademicCapIcon,
        level: "Beginner",
        duration: "25 min read",
        tags: ["Time management", "Planning", "Habits"],
        content:
            "Use outcome-first planning to link weekly goals to daily focus blocks. Blend quick capture with restful shutdown rituals so nothing slips.",
        bullets: ["Outcome-first planning", "Capture + triage loop", "Weekly reset ritual"],
    },
    {
        id: "resource-6",
        title: "Productivity workshop replay",
        description: "Replay on sustainable focus habits and energy resets.",
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
        duration: "7-day burst",
        vibe: "Launch your focus streak with playful daily cues.",
        moments: ["Tune presets", "Capture sparks", "Weekly reset party"],
    },
    {
        title: "Deep work accelerator",
        duration: "14-day sprint",
        vibe: "Protect big project energy with long-form focus rituals.",
        moments: ["Map milestones", "Guard calendar", "Celebrate ship"],
    },
    {
        title: "Creative recharge",
        duration: "Weekend reset",
        vibe: "Blend structure with playful prompts to return fired up.",
        moments: ["Inspiration sweep", "Guided jam", "Reflection walk"],
    },
];

const resourceBundles = [
    {
        title: "Deep work toolkit",
        punchline: "Go heads-down without the burnout.",
        goodies: ["Focus agenda", "Context shield", "Ambient cues"],
    },
    {
        title: "Study sprint pack",
        punchline: "Keep exam prep on rails with playful accountability.",
        goodies: ["Sprint tracker", "Flashcard guide", "Weekly retro"],
    },
    {
        title: "Team focus library",
        punchline: "Sync async teams with crystal-clear handoffs.",
        goodies: ["Stand-up canvas", "Handoff checklist", "Retro board"],
    },
];

const communitySignals = [
    {
        icon: "🚀",
        title: "Creators using templates",
        metric: "2.4k downloads",
        description: "Builders grab the template wall to launch faster with less friction.",
    },
    {
        icon: "🎧",
        title: "Focus playlists shared",
        metric: "48 mixes",
        description: "Community playlists span lo-fi, binaural beats, and rain room vibes.",
    },
    {
        icon: "📝",
        title: "Guides bookmarked",
        metric: "6.3k saves",
        description: "Most-loved guides dive into distraction-proof workflows and energy maps.",
    },
];

const categories = [
    { key: "all", label: "All" },
    { key: "guide", label: "Guides" },
    { key: "video", label: "Videos" },
    { key: "article", label: "Articles" },
    { key: "template", label: "Templates" },
];

const categoryIcons = {
    guide: "📘",
    video: "🎬",
    article: "🧠",
    template: "🧩",
};

const resourceStats = categories
    .filter((category) => category.key !== "all")
    .map((category) => ({
        key: category.key,
        label: category.label,
        icon: categoryIcons[category.key] || "✨",
        count: resourceLibrary.filter((resource) => resource.type === category.key).length,
    }));

const resourceTypeLabels = {
    guide: "Guide",
    video: "Video",
    article: "Article",
    template: "Template",
};

const styles = {
    page: {
        minHeight: "100vh",
        background: "linear-gradient(180deg, #030b18 0%, #0b1529 55%, #030b18 100%)",
        color: "#e2e8f0",
        transition: "background 0.3s ease, color 0.3s ease",
        padding: "4.8rem 1.85rem 5.4rem",
    },
    container: {
        maxWidth: "1180px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
        position: "relative",
        zIndex: 1,
    },
    hero: {
        position: "relative",
        borderRadius: "1.6rem",
        padding: "3.4rem",
        background: "linear-gradient(136deg, rgba(56,189,248,0.18), rgba(129,140,248,0.26))",
        border: "1px solid rgba(56,189,248,0.32)",
        boxShadow: "0 52px 140px -80px rgba(56,189,248,0.72)",
        display: "grid",
        gap: "2rem",
        overflow: "hidden",
    },
    heroGlow: {
        position: "absolute",
        inset: "-25% -35%",
        background: "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.4), transparent 60%)",
        filter: "blur(42px)",
        opacity: 0.9,
    },
    heroContent: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "2.4rem",
        position: "relative",
        zIndex: 1,
    },
    heroHeadline: {
        display: "grid",
        gap: "1.4rem",
    },
    heroPillRow: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        flexWrap: "wrap",
    },
    heroEyebrow: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        padding: "0.3rem 0.68rem",
        borderRadius: "999px",
        background: "rgba(59,130,246,0.2)",
        color: "#f0f9ff",
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
    },
    heroPill: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.3rem",
        padding: "0.3rem 0.75rem",
        borderRadius: "999px",
        background: "rgba(94,234,212,0.2)",
        color: "#99f6e4",
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
    },
    heroTitle: {
        fontSize: "2.5rem",
        fontWeight: 700,
        lineHeight: 1.18,
        margin: 0,
        background: "linear-gradient(110deg, #f8fafc, #bae6fd)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
    },
    heroLead: {
        fontSize: "1.05rem",
        color: "#b6caf1",
        lineHeight: 1.72,
        maxWidth: "32rem",
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
        padding: "0.42rem 0.95rem",
        borderRadius: "9999px",
        background: "rgba(15,23,42,0.32)",
        color: "#dbeafe",
        fontSize: "0.82rem",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        boxShadow: "inset 0 0 0 1px rgba(148,163,184,0.28)",
    },
    heroSpotlights: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "1.1rem",
    },
    heroSpotlightCard: {
        borderRadius: "1.05rem",
        border: "1px solid rgba(148,163,184,0.26)",
        background: "rgba(8, 17, 34, 0.72)",
        boxShadow: "0 24px 60px -44px rgba(56,189,248,0.55)",
        padding: "1.1rem 1.2rem",
        display: "grid",
        gap: "0.55rem",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
    },
    heroSpotlightCardHover: {
        transform: "translateY(-4px)",
        boxShadow: "0 36px 90px -60px rgba(56,189,248,0.65)",
        borderColor: "rgba(56,189,248,0.35)",
    },
    heroSpotlightIcon: {
        fontSize: "1.2rem",
    },
    heroSpotlightTitle: {
        fontSize: "1rem",
        fontWeight: 600,
        color: "#f8fafc",
    },
    heroSpotlightCaption: {
        fontSize: "0.88rem",
        color: "#9fb2d6",
        lineHeight: 1.5,
    },
    section: {
        borderRadius: "1.4rem",
        border: "1px solid rgba(56,189,248,0.16)",
        background: "rgba(7, 14, 28, 0.85)",
        boxShadow: "0 45px 110px -70px rgba(14,165,233,0.55)",
        padding: "2.75rem",
        display: "grid",
        gap: "1.9rem",
        position: "relative",
        overflow: "hidden",
    },
    sectionAccent: {
        position: "absolute",
        inset: "-20% 50%",
        width: "320px",
        height: "320px",
        background: "radial-gradient(circle, rgba(56,189,248,0.18), transparent 70%)",
        transform: "translateX(-50%)",
        filter: "blur(40px)",
        opacity: 0.9,
        pointerEvents: "none",
    },
    sectionHeader: {
        display: "grid",
        gap: "0.45rem",
        position: "relative",
        zIndex: 1,
    },
    sectionEyebrow: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        padding: "0.32rem 0.75rem",
        borderRadius: "999px",
        background: "rgba(59,130,246,0.16)",
        color: "#38bdf8",
        fontSize: "0.78rem",
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
    },
    sectionTitle: {
        fontSize: "1.7rem",
        fontWeight: 700,
        color: "#f8fafc",
    },
    sectionLead: {
        fontSize: "0.98rem",
        color: "#9fb2d6",
        lineHeight: 1.68,
        maxWidth: "40rem",
    },
    sectionCard: {
        borderRadius: "1.15rem",
        border: "1px solid rgba(56,189,248,0.16)",
        background: "rgba(8, 16, 31, 0.78)",
        boxShadow: "0 34px 82px -60px rgba(14,165,233,0.45)",
        padding: "1.95rem",
        display: "grid",
        gap: "1.25rem",
    },
    statGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: "1rem",
    },
    statCard: {
        borderRadius: "1rem",
        border: "1px solid rgba(56,189,248,0.2)",
        background: "rgba(9, 18, 34, 0.75)",
        padding: "0.95rem 1.1rem",
        display: "grid",
        gap: "0.35rem",
        boxShadow: "0 24px 64px -48px rgba(56,189,248,0.55)",
    },
    statLabelRow: {
        display: "flex",
        alignItems: "center",
        gap: "0.45rem",
        color: "#cbd5f5",
        fontSize: "0.82rem",
        fontWeight: 600,
    },
    statValue: {
        fontSize: "1.35rem",
        fontWeight: 700,
        color: "#f8fafc",
    },
    tagRow: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.45rem",
    },
    emptyState: {
        display: "grid",
        gap: "0.6rem",
        justifyItems: "center",
        padding: "3.2rem 2.4rem",
        borderRadius: "1.15rem",
        border: "1px dashed rgba(148,163,184,0.35)",
        background: "rgba(9, 18, 34, 0.82)",
        boxShadow: "0 28px 70px -50px rgba(56,189,248,0.4)",
    },
    emptyStateTitle: {
        fontSize: "1.05rem",
        fontWeight: 600,
        color: "#f8fafc",
    },
    emptyStateSubtitle: {
        color: "#8ea0c2",
        fontSize: "0.95rem",
    },
    searchPanel: {
        display: "grid",
        gap: "1.25rem",
    },
    searchInput: {
        width: "100%",
        padding: "0.95rem 1.2rem",
        borderRadius: "0.95rem",
        border: "1px solid rgba(56,189,248,0.22)",
        background: "rgba(9, 18, 34, 0.85)",
        color: "#e2e8f0",
        fontSize: "1rem",
        outline: "none",
        boxShadow: "0 18px 42px -30px rgba(56,189,248,0.45)",
    },
    filterBar: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.65rem",
    },
    filterChip: {
        padding: "0.6rem 1.25rem",
        borderRadius: "0.95rem",
        fontWeight: 600,
        fontSize: "0.95rem",
        border: "1px solid rgba(148,163,184,0.28)",
        background: "rgba(15,23,42,0.35)",
        color: "#cbd5f5",
        cursor: "pointer",
        transition: "all 0.2s ease",
    },
    filterChipActive: {
        background: "rgba(56,189,248,0.22)",
        color: "#38bdf8",
        border: "1px solid rgba(56,189,248,0.45)",
        boxShadow: "0 22px 48px -32px rgba(56,189,248,0.6)",
    },
    resourceGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1.6rem",
    },
    resourceCard: {
        borderRadius: "1.2rem",
        border: "1px solid rgba(56,189,248,0.2)",
        background: "rgba(12, 22, 40, 0.9)",
        boxShadow: "0 36px 95px -62px rgba(56,189,248,0.55)",
        padding: "1.9rem",
        display: "grid",
        gap: "1.05rem",
        transition: "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease",
        transform: "translateY(0)",
    },
    resourceCardHover: {
        transform: "translateY(-6px)",
        boxShadow: "0 48px 125px -70px rgba(56,189,248,0.65)",
        borderColor: "rgba(56,189,248,0.38)",
    },
    resourceHeader: {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
    },
    resourceTypePill: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.45rem",
        padding: "0.35rem 0.75rem",
        borderRadius: "999px",
        background: "rgba(56,189,248,0.16)",
        color: "#38bdf8",
        fontSize: "0.78rem",
        fontWeight: 600,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
    },
    resourceIcon: {
        width: "2.85rem",
        height: "2.85rem",
        borderRadius: "0.95rem",
        background: "linear-gradient(135deg, rgba(56,189,248,0.32), rgba(129,140,248,0.28))",
        color: "#0ea5e9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    resourceTitle: {
        fontSize: "1.18rem",
        fontWeight: 600,
        color: "#f8fafc",
    },
    resourceMeta: {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "0.75rem",
        fontSize: "0.85rem",
        fontWeight: 600,
        color: "#38bdf8",
    },
    resourceDescription: {
        fontSize: "0.95rem",
        color: "#9fb2d6",
        lineHeight: 1.72,
    },
    tagPill: {
        padding: "0.35rem 0.95rem",
        borderRadius: "9999px",
        background: "rgba(15,23,42,0.45)",
        color: "#cbd5f5",
        fontSize: "0.78rem",
        fontWeight: 600,
    },
    tagPillSoft: {
        padding: "0.32rem 0.8rem",
        borderRadius: "999px",
        background: "rgba(59,130,246,0.16)",
        color: "#cfe1ff",
        fontSize: "0.78rem",
        fontWeight: 600,
    },
    cardAction: {
        alignSelf: "flex-start",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.55rem",
        padding: "0.7rem 1.5rem",
        borderRadius: "0.95rem",
        border: "1px solid rgba(56,189,248,0.32)",
        background: "linear-gradient(130deg, rgba(56,189,248,0.2), rgba(14,165,233,0.18))",
        color: "#38bdf8",
        fontWeight: 600,
        fontSize: "0.94rem",
        cursor: "pointer",
        transition: "all 0.2s ease",
    },
    cardActionHover: {
        background: "linear-gradient(130deg, rgba(56,189,248,0.28), rgba(14,165,233,0.26))",
        borderColor: "rgba(56,189,248,0.48)",
        transform: "translateY(-3px)",
        boxShadow: "0 26px 64px -40px rgba(56,189,248,0.6)",
    },
    highlightGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1.6rem",
    },
    highlightCard: {
        borderRadius: "1.2rem",
        border: "1px solid rgba(56,189,248,0.18)",
        background: "rgba(12, 22, 40, 0.88)",
        boxShadow: "0 32px 90px -58px rgba(56,189,248,0.55)",
        padding: "1.85rem",
        display: "grid",
        gap: "0.95rem",
        transition: "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease",
        transform: "translateY(0)",
    },
    highlightHeader: {
        display: "flex",
        alignItems: "center",
        gap: "0.9rem",
    },
    highlightIcon: {
        width: "2.6rem",
        height: "2.6rem",
        borderRadius: "0.95rem",
        background: "linear-gradient(135deg, rgba(56,189,248,0.32), rgba(129,140,248,0.28))",
        color: "#38bdf8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.2rem",
    },
    highlightTitle: {
        fontSize: "1.18rem",
        fontWeight: 600,
        color: "#f8fafc",
    },
    highlightBadge: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        fontSize: "0.82rem",
        fontWeight: 600,
        color: "#38bdf8",
    },
    highlightMoments: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.45rem",
    },
    highlightMomentChip: {
        padding: "0.32rem 0.78rem",
        borderRadius: "999px",
        background: "rgba(56,189,248,0.18)",
        color: "#e0f2fe",
        fontSize: "0.78rem",
        fontWeight: 600,
    },
    highlightMetric: {
        fontSize: "0.85rem",
        fontWeight: 600,
        color: "#38bdf8",
    },
    highlightCardHover: {
        transform: "translateY(-6px)",
        boxShadow: "0 48px 120px -70px rgba(56,189,248,0.62)",
        borderColor: "rgba(56,189,248,0.32)",
    },
    highlightEmoji: {
        fontSize: "1.3rem",
    },
    highlightDescription: {
        fontSize: "0.94rem",
        color: "#9fb2d6",
        lineHeight: 1.68,
    },
    goodiesRow: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
    },
    goodiesChip: {
        padding: "0.35rem 0.85rem",
        borderRadius: "0.85rem",
        background: "rgba(14,165,233,0.22)",
        color: "#cffafe",
        fontSize: "0.78rem",
        fontWeight: 600,
    },
    list: {
        margin: 0,
        paddingLeft: "1.2rem",
        display: "grid",
        gap: "0.48rem",
        color: "#9fb2d6",
        fontSize: "0.9rem",
        lineHeight: 1.62,
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
                <div style={{ display: "grid", gap: "1.25rem" }}>
                    <div style={{ position: "relative", paddingBottom: "56.25%", borderRadius: "1rem", overflow: "hidden" }}>
                        <iframe
                            title={resource.title}
                            src={resource.videoUrl}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                border: "none",
                            }}
                        />
                    </div>
                    <p style={{ color: "var(--color-gray-700)", lineHeight: 1.7 }}>{resource.description}</p>
                </div>
            );
        }

        const contentParagraphs = Array.isArray(resource.content)
            ? resource.content
            : typeof resource.content === "string"
            ? resource.content
                  .split("\n")
                  .map((paragraph) => paragraph.trim())
                  .filter(Boolean)
            : [];

        return (
            <div style={{ display: "grid", gap: "1rem" }}>
                <p style={{ color: "var(--color-gray-700)", lineHeight: 1.7 }}>{resource.description}</p>
                {contentParagraphs.length > 0 && (
                    <div style={{ display: "grid", gap: "0.85rem", color: "var(--color-gray-600)", lineHeight: 1.68 }}>
                        {contentParagraphs.map((paragraph, index) => (
                            <p key={`${resource.id}-paragraph-${index}`} style={{ margin: 0 }}>
                                {paragraph}
                            </p>
                        ))}
                    </div>
                )}
                {contentParagraphs.length === 0 && resource.type !== "template" && (
                    <p style={{ margin: 0, color: "var(--color-gray-600)" }}>
                        Full details are coming soon. For now, explore the quick takeaways below.
                    </p>
                )}
            </div>
        );
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <section style={styles.hero}>
                    <div style={styles.heroGlow} />
                    <div style={styles.heroContent}>
                        <div style={styles.heroHeadline}>
                            <div style={styles.heroPillRow}>
                                <span style={styles.heroEyebrow}>FocusFlow vault</span>
                                <span style={styles.heroPill}>Always fresh</span>
                            </div>
                            <h1 style={styles.heroTitle}>Find your next focus boost</h1>
                            <p style={styles.heroLead}>
                                Bite-sized playbooks, remixable templates, and on-demand jams. Dip in, grab what’s fun, and get back to creating.
                            </p>
                            <div style={styles.heroTags}>
                                {heroTags.map((tag) => (
                                    <span key={tag} style={styles.heroTag}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div style={styles.heroSpotlights}>
                            {heroSpotlights.map((spotlight) => (
                                <div
                                    key={spotlight.key}
                                    style={styles.heroSpotlightCard}
                                    onMouseEnter={(event) =>
                                        Object.assign(event.currentTarget.style, styles.heroSpotlightCardHover)
                                    }
                                    onMouseLeave={(event) =>
                                        Object.assign(event.currentTarget.style, styles.heroSpotlightCard)
                                    }
                                >
                                    <span style={styles.heroSpotlightIcon}>{spotlight.icon}</span>
                                    <span style={styles.heroSpotlightTitle}>{spotlight.title}</span>
                                    <span style={styles.heroSpotlightCaption}>{spotlight.caption}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.sectionAccent} />
                    <div style={styles.sectionHeader}>
                        <span style={styles.sectionEyebrow}>Search the stash</span>
                        <h2 style={styles.sectionTitle}>Explore resources</h2>
                        <p style={styles.sectionLead}>
                            Quick filters + playful tags keep the library feeling light. Swap categories or search by vibe.
                        </p>
                    </div>
                    <div style={styles.statGrid}>
                        {resourceStats.map((stat) => (
                            <div key={stat.key} style={styles.statCard}>
                                <div style={styles.statLabelRow}>
                                    <span>{stat.icon}</span>
                                    <span>{stat.label}</span>
                                </div>
                                <span style={styles.statValue}>{stat.count}</span>
                            </div>
                        ))}
                    </div>
                    <div style={styles.sectionCard}>
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
                                        {categoryIcons[category.key] && category.key !== "all" && (
                                            <span>{categoryIcons[category.key]}</span>
                                        )}
                                        {category.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {filteredResources.length > 0 ? (
                            <div style={styles.resourceGrid}>
                                {filteredResources.map((resource) => (
                                    <div
                                        key={resource.id}
                                        style={styles.resourceCard}
                                        onMouseEnter={(event) =>
                                            Object.assign(event.currentTarget.style, styles.resourceCardHover)
                                        }
                                        onMouseLeave={(event) =>
                                            Object.assign(event.currentTarget.style, styles.resourceCard)
                                        }
                                    >
                                        <div style={styles.resourceHeader}>
                                            <div style={styles.resourceIcon}>{renderResourceIcon(resource)}</div>
                                            <div style={{ display: "grid", gap: "0.45rem" }}>
                                                <div style={styles.resourceTitle}>{resource.title}</div>
                                                <div style={styles.resourceMeta}>
                                                    {resourceTypeLabels[resource.type] && (
                                                        <span style={styles.resourceTypePill}>
                                                            {resourceTypeLabels[resource.type]}
                                                        </span>
                                                    )}
                                                    {resource.level && <span>{resource.level}</span>}
                                                    {resource.duration && <span>{resource.duration}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <p style={styles.resourceDescription}>{resource.description}</p>
                                        {Array.isArray(resource.tags) && resource.tags.length > 0 && (
                                            <div style={styles.tagRow}>
                                                {resource.tags.slice(0, 3).map((tag) => (
                                                    <span key={`${resource.id}-${tag}`} style={styles.tagPillSoft}>
                                                        {tag}
                                                    </span>
                                                ))}
                                                {resource.tags.length > 3 && (
                                                    <span style={styles.tagPillSoft}>+{resource.tags.length - 3}</span>
                                                )}
                                            </div>
                                        )}
                                        <button
                                            type="button"
                                            style={styles.cardAction}
                                            onMouseEnter={(event) =>
                                                Object.assign(event.currentTarget.style, styles.cardActionHover)
                                            }
                                            onMouseLeave={(event) =>
                                                Object.assign(event.currentTarget.style, styles.cardAction)
                                            }
                                            onClick={() => handleResourceAction(resource)}
                                        >
                                            {resource.type === "template" ? (
                                                <>
                                                    <ArrowDownTrayIcon style={{ width: "1rem", height: "1rem" }} />
                                                    Download kit
                                                </>
                                            ) : (
                                                <>View resource</>
                                            )}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={styles.emptyState}>
                                <div style={{ fontSize: "1.8rem" }}>🔍</div>
                                <div style={styles.emptyStateTitle}>No matches yet</div>
                                <div style={styles.emptyStateSubtitle}>
                                    Try another keyword or browse a different category.
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.sectionAccent} />
                    <div style={styles.sectionHeader}>
                        <span style={styles.sectionEyebrow}>Mini adventures</span>
                        <h2 style={styles.sectionTitle}>Learning tracks</h2>
                        <p style={styles.sectionLead}>
                            Pick a track, follow the tiny prompts, and stack wins without the overwhelm.
                        </p>
                    </div>
                    <div style={styles.highlightGrid}>
                        {learningTracks.map((track) => (
                            <div
                                key={track.title}
                                style={styles.highlightCard}
                                onMouseEnter={(event) =>
                                    Object.assign(event.currentTarget.style, styles.highlightCardHover)
                                }
                                onMouseLeave={(event) =>
                                    Object.assign(event.currentTarget.style, styles.highlightCard)
                                }
                            >
                                <div style={styles.highlightHeader}>
                                    <div style={styles.highlightIcon}>
                                        <BookOpenIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                                    </div>
                                    <div>
                                        <div style={styles.highlightTitle}>{track.title}</div>
                                        <span style={styles.highlightBadge}>{track.duration}</span>
                                    </div>
                                </div>
                                <p style={styles.highlightDescription}>{track.vibe}</p>
                                <div style={styles.highlightMoments}>
                                    {track.moments.map((moment) => (
                                        <span key={`${track.title}-${moment}`} style={styles.highlightMomentChip}>
                                            {moment}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.sectionAccent} />
                    <div style={styles.sectionHeader}>
                        <span style={styles.sectionEyebrow}>Bundle + go</span>
                        <h2 style={styles.sectionTitle}>Resource bundles</h2>
                        <p style={styles.sectionLead}>
                            Grab a bundle, drop it into your flow, and keep things feeling fresh.
                        </p>
                    </div>
                    <div style={styles.highlightGrid}>
                        {resourceBundles.map((bundle) => (
                            <div
                                key={bundle.title}
                                style={styles.highlightCard}
                                onMouseEnter={(event) =>
                                    Object.assign(event.currentTarget.style, styles.highlightCardHover)
                                }
                                onMouseLeave={(event) =>
                                    Object.assign(event.currentTarget.style, styles.highlightCard)
                                }
                            >
                                <div style={styles.highlightHeader}>
                                    <div style={styles.highlightIcon}>
                                        <DocumentTextIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                                    </div>
                                    <div>
                                        <div style={styles.highlightTitle}>{bundle.title}</div>
                                        <span style={styles.highlightBadge}>Ready-made kit</span>
                                    </div>
                                </div>
                                <p style={styles.highlightDescription}>{bundle.punchline}</p>
                                <div style={styles.goodiesRow}>
                                    {bundle.goodies.map((goodie) => (
                                        <span key={`${bundle.title}-${goodie}`} style={styles.goodiesChip}>
                                            {goodie}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.sectionAccent} />
                    <div style={styles.sectionHeader}>
                        <span style={styles.sectionEyebrow}>Signals from the crew</span>
                        <h2 style={styles.sectionTitle}>Community signals</h2>
                        <p style={styles.sectionLead}>
                            Real moments from the community—proof that playful productivity actually sticks.
                        </p>
                    </div>
                    <div style={styles.highlightGrid}>
                        {communitySignals.map((signal) => (
                            <div
                                key={signal.title}
                                style={styles.highlightCard}
                                onMouseEnter={(event) =>
                                    Object.assign(event.currentTarget.style, styles.highlightCardHover)
                                }
                                onMouseLeave={(event) =>
                                    Object.assign(event.currentTarget.style, styles.highlightCard)
                                }
                            >
                                <div style={styles.highlightHeader}>
                                    <div style={styles.highlightIcon}>
                                        <span style={styles.highlightEmoji}>{signal.icon}</span>
                                    </div>
                                    <div>
                                        <div style={styles.highlightTitle}>{signal.title}</div>
                                        <span style={styles.highlightMetric}>{signal.metric}</span>
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
