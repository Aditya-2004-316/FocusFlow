import React, { useState, useMemo } from "react";
import useResponsive from "../hooks/useResponsive";
import { sharedFocusShell } from "./FocusTimer.jsx";
import {
    AcademicCapIcon,
    ArchiveBoxIcon,
    ArrowDownTrayIcon,
    BookOpenIcon,
    ChartBarIcon,
    DocumentTextIcon,
    LightBulbIcon,
    MagnifyingGlassIcon,
    PlayCircleIcon,
    PresentationChartLineIcon,
    RocketLaunchIcon,
    SignalIcon,
    VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext";

const heroTags = ["Quick filters", "Templates free", "Swap categories"];

const heroSpotlights = [
    {
        key: "start",
        icon: "✨",
        title: "Start here",
        caption: "FocusFlow 101 in minutes",
    },
    {
        key: "vault",
        icon: "🎥",
        title: "Watch party",
        caption: "Workshops on demand",
    },
    {
        key: "kit",
        icon: "🧰",
        title: "Grab the kit",
        caption: "Plug-and-play templates",
    },
];

const resourceLibrary = [
    {
        id: "resource-1",
        title: "Getting started with FocusFlow",
        description:
            "Spin up timers, capture distractions, and read stats in minutes.",
        type: "guide",
        icon: BookOpenIcon,
        level: "Beginner",
        duration: "15 min",
        tags: ["Onboarding", "Timers", "Basics"],
        content:
            "Welcome to FocusFlow! This playbook covers calibrating presets, capturing distractions in one tap, and reviewing stats without friction.\n\n1) Tune focus + break durations to match your rhythm.\n2) Keep the distraction capture panel pinned for instant logging.\n3) Close the day with a 3-minute retro so tomorrow stays light.",
        bullets: [
            "Preset sprint setup",
            "One-tap distraction log",
            "End-of-day retro",
        ],
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
        duration: "20 min",
        tags: ["Deep work", "Flow", "Rituals"],
        content:
            "Deep work demands deliberate environments. This playbook covers: time-blocking your week, batching context to halve ramp-up time, and pre-loading recovery rituals that keep burnout at bay.",
        bullets: [
            "Design a recovery-first calendar",
            "Batch similar tasks to reduce context switching",
            "Introduce hard shutdown rituals",
        ],
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
        duration: "25 min",
        tags: ["Management", "Planning", "Habits"],
        content:
            "Use outcome-first planning to link weekly goals to daily focus blocks. Blend quick capture with restful shutdown rituals so nothing slips.",
        bullets: [
            "Outcome-first planning",
            "Capture + triage loop",
            "Weekly reset ritual",
        ],
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
    {
        id: "resource-7",
        title: "Building focus rituals for success",
        description:
            "Establish daily rituals that boost concentration and mental clarity.",
        type: "guide",
        icon: AcademicCapIcon,
        level: "Beginner",
        duration: "18 min",
        tags: ["Rituals", "Habits", "Focus"],
        content:
            "Rituals create neural pathways that signal focus time to your brain. Learn how to design morning routines, transition rituals, and shutdown ceremonies that anchor your day.",
        bullets: [
            "Morning focus ritual design",
            "Context switching ceremonies",
            "Evening shutdown protocol",
        ],
    },
    {
        id: "resource-8",
        title: "Flow state mastery workshop",
        description: "Video guide to entering and sustaining deep flow states.",
        type: "video",
        icon: VideoCameraIcon,
        level: "Advanced",
        duration: "28:15",
        tags: ["Flow", "Deep work", "Psychology"],
        videoUrl: "https://www.youtube.com/embed/ZXsQAXx_ao0",
    },
    {
        id: "resource-9",
        title: "Mindfulness and focus enhancement",
        description:
            "How meditation practices enhance sustained attention and clarity.",
        type: "article",
        icon: LightBulbIcon,
        level: "Beginner",
        duration: "12 min",
        tags: ["Awareness", "Meditation", "Focus"],
        content:
            "Discover how simple meditation techniques can reset your focus, reduce mental clutter, and improve decision-making throughout your day.",
        bullets: [
            "5-minute focus resets",
            "Attention span training",
            "Stress reduction techniques",
        ],
    },
    {
        id: "resource-10",
        title: "Energy management templates",
        description:
            "Templates for tracking and optimizing your energy levels.",
        type: "template",
        icon: DocumentTextIcon,
        level: "All levels",
        tags: ["Templates", "Energy", "Tracking"],
    },
    {
        id: "resource-11",
        title: "Context switching and productivity",
        description:
            "Strategic approaches to minimize context switching overhead.",
        type: "article",
        icon: LightBulbIcon,
        level: "Advanced",
        duration: "15 min",
        tags: ["Switching", "Efficiency", "Deep work"],
        content:
            "Context switching costs are real. Learn proven strategies to batch similar tasks, create focus blocks, and design your calendar for minimal mental overhead.",
        bullets: [
            "Task batching strategies",
            "Calendar design principles",
            "Ramp-up time reduction",
        ],
    },
    {
        id: "resource-12",
        title: "Team collaboration toolkit",
        description:
            "Templates and guides for async collaboration without losing focus.",
        type: "template",
        icon: DocumentTextIcon,
        level: "All levels",
        tags: ["Templates", "Teamwork", "Async"],
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
        description:
            "Builders grab the template wall to launch faster with less friction.",
    },
    {
        icon: "🎧",
        title: "Focus playlists shared",
        metric: "48 mixes",
        description:
            "Community playlists span lo-fi, binaural beats, and rain room vibes.",
    },
    {
        icon: "📝",
        title: "Guides bookmarked",
        metric: "6.3k saves",
        description:
            "Most-loved guides dive into distraction-proof workflows and energy maps.",
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
        count: resourceLibrary.filter(
            (resource) => resource.type === category.key
        ).length,
    }));

const resourceTypeLabels = {
    guide: "Guide",
    video: "Video",
    article: "Article",
    template: "Template",
};

const getStyles = (isMobile, isTablet, isSmallMobile, width, isDarkMode) => {
    const sharedStyles = sharedFocusShell(isMobile);

    // Dynamic column counts
    let resourceCols = 3;
    if (width < 900) resourceCols = 1;
    else if (width < 1150) resourceCols = 2;

    let learningTrackCols = 3;
    if (width < 768) learningTrackCols = 1;
    else if (width < 1100) learningTrackCols = 2;

    const styles = {
        ...sharedStyles,
        page: {
            minHeight: "100vh",
            background: "var(--color-white)",
            color: "var(--color-gray-900)",
            transition: "background 0.3s ease, color 0.3s ease",
            padding: isSmallMobile ? "1.5rem 1rem 5.4rem" : isMobile ? "2.5rem 1.25rem 5.4rem" : "3.5rem 2rem 5.4rem",
        },
        container: {
            maxWidth: "1120px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "3rem",
            position: "relative",
            zIndex: 1,
        },
        hero: {
            borderRadius: isMobile ? "1.2rem" : "1.6rem",
            padding: isSmallMobile ? "1.5rem" : isMobile ? "2rem" : "3.1rem",
            background: "color-mix(in srgb, var(--panel-bg) 90%, var(--color-white) 10%)",
            border: "1px solid color-mix(in srgb, var(--input-border) 70%, transparent)",
            boxShadow: "var(--shadow-lg)",
            display: "grid",
            gap: "2.2rem",
            position: "relative",
            overflow: "hidden",
            color: "var(--color-gray-900)",
        },
        heroGlow: {
            position: "absolute",
            inset: "-20% -20% auto auto",
            width: "420px",
            height: "420px",
            background:
                "radial-gradient(circle, color-mix(in srgb, var(--color-primary-400) 20%, transparent), transparent 65%)",
            opacity: 0.9,
            filter: "blur(60px)",
            pointerEvents: "none",
        },
        heroLayout: {
            display: "grid",
            gridTemplateColumns: width < 1240 ? "1fr" : "1.1fr 0.9fr",
            gap: width < 1240 ? "2rem" : "1.6rem",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
        },
        heroLeft: {
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
            width: "100%",
            maxWidth: "520px",
        },
        heroActionCard: {
            display: "grid",
            gap: "0.9rem",
            padding: "1.2rem 1.4rem",
            borderRadius: "1.25rem",
            background:
                "color-mix(in srgb, var(--panel-bg) 92%, var(--color-white) 8%)",
            border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, var(--color-white) 8%)",
            alignSelf: "start",
        },
        heroRight: {
            display: "grid",
            gap: "1rem",
            width: "100%",
            justifySelf: "start",
            maxWidth: "430px",
        },
        heroTitle: {
            fontSize: isSmallMobile ? "1.75rem" : width < 600 ? "2rem" : "2.65rem",
            fontWeight: 700,
            lineHeight: 1.12,
            background:
                "linear-gradient(to right, var(--color-cyan-400), var(--color-primary-400))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: 0,
        },
        heroLead: {
            fontSize: "1.08rem",
            color: "var(--color-gray-600)",
            lineHeight: 1.75,
            maxWidth: "44rem",
            margin: "0.5rem 0 0",
        },
        badgeRow: {
            display: "flex",
            flexWrap: "wrap",
            gap: "0.6rem",
        },
        badge: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.6rem 1.2rem",
            borderRadius: "50px",
            fontSize: "0.78rem",
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            background: "rgba(59,130,246,0.12)",
            color: "var(--color-primary-700)",
            border: "1px solid rgba(56,189,248,0.28)",
            backdropFilter: "blur(12px)",
            flexShrink: 0,
            flexGrow: 0,
        },
        heroStatsGrid: {
            display: "grid",
            gap: "0.75rem",
            gridTemplateColumns: isSmallMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
        },
        heroStat: {
            borderRadius: "1rem",
            background:
                "color-mix(in srgb, var(--panel-bg) 85%, var(--color-white) 15%)",
            border: "1px solid color-mix(in srgb, var(--panel-bg) 60%, rgba(56, 189, 248, 0.4))",
            padding: "1.25rem",
            display: "grid",
            gap: "0.85rem",
        },
        heroStatTop: {
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
        },
        heroStatIconWrap: {
            color: "var(--color-primary-600)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
        },
        heroStatLabel: {
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--color-gray-500)",
            fontWeight: 600,
        },
        heroStatValue: {
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "var(--color-gray-900)",
        },
        highlightPanel: {
            borderRadius: "1.3rem",
            background:
                "color-mix(in srgb, var(--panel-bg) 94%, var(--color-white) 6%)",
            border: "1px solid color-mix(in srgb, var(--panel-bg) 94%, var(--color-white) 6%)",
            padding: "1.6rem",
            display: "grid",
            gap: "1rem",
            alignContent: "start",
            width: "100%",
        },
        highlightPanelHeader: {
            display: "grid",
            gap: "0.6rem",
        },
        highlightPanelBadge: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.8rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--color-primary-700)",
            background:
                "color-mix(in srgb, var(--color-cyan-400) 14%, transparent)",
            borderRadius: "999px",
            padding: "0.45rem 0.9rem",
            justifySelf: "start",
            width: "max-content",
        },
        highlightPanelTitle: {
            margin: 0,
            fontSize: "1.35rem",
            fontWeight: 700,
            color: "var(--color-gray-900)",
        },
        highlightList: {
            display: "flex",
            flexWrap: "wrap",
            gap: "0.55rem",
        },
        highlightChip: {
            background:
                "color-mix(in srgb, var(--color-gray-400) 15%, transparent)",
            border: "1px solid color-mix(in srgb, var(--color-gray-400) 15%, transparent)",
            borderRadius: "999px",
            padding: "0.55rem 0.85rem",
            fontSize: "0.86rem",
            fontWeight: 600,
            color: "var(--color-gray-700)",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
        },
        highlightChipIcon: {
            width: "1rem",
            height: "1rem",
            color: "var(--color-primary-300)",
            flexShrink: 0,
        },
        highlightFooter: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            flexWrap: "wrap",
            paddingTop: "0.8rem",
        },
        highlightFooterCopy: {
            fontSize: "0.84rem",
            color: "var(--color-gray-600)",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
        },
        section: {
            borderRadius: isMobile ? "1.1rem" : "1.4rem",
            border: "1px solid color-mix(in srgb, var(--input-border) 70%, transparent)",
            background:
                "color-mix(in srgb, var(--panel-bg) 92%, var(--color-white) 8%)",
            boxShadow: "var(--shadow-lg)",
            padding: isSmallMobile ? "1.5rem" : isMobile ? "2rem" : "2.75rem",
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
            background:
                "radial-gradient(circle, color-mix(in srgb, var(--color-cyan-400) 18%, transparent), transparent 70%)",
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
            width: "fit-content",
            padding: "0.4rem 0.8rem",
            borderRadius: "0.9rem",
            background: "rgba(56,189,248,0.16)",
            color: "var(--color-primary-700)",
            fontWeight: 600,
            fontSize: "0.88rem",
            border: "1px solid rgba(56,189,248,0.28)",
        },
        sectionTitle: {
            fontSize: "1.7rem",
            fontWeight: 700,
            color: "var(--color-gray-900)",
        },
        sectionLead: {
            fontSize: "0.98rem",
            color: "var(--color-gray-600)",
            lineHeight: 1.68,
            maxWidth: "40rem",
        },
        sectionCard: {
            display: "grid",
            gap: "1.25rem",
        },
        listLayout: {
            display: "grid",
            gridTemplateColumns: (width < 768) ? "1fr" : "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.6rem",
            position: "relative",
            zIndex: 2,
        },
        statGrid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "1rem",
        },
        statCard: {
            borderRadius: "1rem",
            border: "1px solid color-mix(in srgb, var(--panel-bg) 60%, rgba(56, 189, 248, 0.4))",
            background: "color-mix(in srgb, var(--panel-bg) 85%, var(--color-white) 15%)",
            padding: "0.95rem 1.1rem",
            display: "grid",
            gap: "0.35rem",
        },
        statLabelRow: {
            display: "flex",
            alignItems: "center",
            gap: "0.45rem",
            color: "var(--color-gray-600)",
            fontSize: "0.82rem",
            fontWeight: 600,
        },
        statValue: {
            fontSize: "1.35rem",
            fontWeight: 700,
            color: "var(--color-gray-900)",
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
            border: "1px dashed color-mix(in srgb, var(--color-white) 85%, var(--panel-bg) 15%)",
            background: "var(--color-white)",
            boxShadow: "var(--shadow-soft)",
        },
        emptyStateTitle: {
            fontSize: "1.05rem",
            fontWeight: 600,
            color: "var(--color-gray-900)",
        },
        emptyStateSubtitle: {
            color: "var(--color-gray-600)",
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
            border: "1px solid color-mix(in srgb, var(--input-bg) 92%, black 8%)",
            background: "var(--input-bg)",
            color: "var(--color-gray-900)",
            fontSize: "1rem",
            outline: "none",
            boxShadow: "var(--shadow-soft)",
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
            border: "1px solid color-mix(in srgb, var(--input-bg) 92%, black 8%)",
            background: "var(--input-bg)",
            color: "var(--color-gray-700)",
            cursor: "pointer",
            transition: "all 0.2s ease",
        },
        filterChipActive: {
            background: "linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(129, 140, 248, 0.15))",
            color: "var(--color-primary-600)",
            border: "1px solid rgba(56, 189, 248, 0.4)",
            boxShadow: "0 0 0 3px rgba(56, 189, 248, 0.1)",
        },
        resourceGrid: {
            display: "grid",
            gridTemplateColumns: `repeat(${resourceCols}, 1fr)`,
            gap: isMobile ? "1rem" : "1.6rem",
        },
        resourceCard: {
            borderRadius: "1.2rem",
            border: "1px solid color-mix(in srgb, var(--input-border) 70%, transparent)",
            background:
                "color-mix(in srgb, var(--panel-bg) 90%, var(--color-white) 10%)",
            boxShadow: "var(--shadow-md)",
            padding: isMobile ? "1.4rem" : "1.9rem",
            display: "grid",
            gap: "1.05rem",
            transition:
                "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease",
            transform: "translateY(0)",
            minHeight: isMobile ? "auto" : "320px",
        },
        resourceCardHover: {
            transform: "translateY(-6px)",
            boxShadow: "var(--shadow-xl)",
            borderColor: "var(--color-primary-300)",
        },
        resourceHeader: {
            display: "flex",
            alignItems: "flex-start",
            gap: "0.85rem",
        },
        resourceTypePill: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            padding: "0.35rem 0.75rem",
            borderRadius: "999px",
            background:
                "color-mix(in srgb, var(--color-cyan-400) 16%, transparent)",
            color: "var(--color-primary-600)",
            fontSize: "0.78rem",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
        },
        resourceIcon: {
            color: "var(--color-primary-600)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: "0.2rem",
        },
        resourceTitle: {
            fontSize: "1.18rem",
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
            lineHeight: 1.72,
        },
        tagPill: {
            padding: "0.35rem 0.95rem",
            borderRadius: "9999px",
            background:
                "color-mix(in srgb, var(--color-gray-900) 45%, transparent)",
            color: "var(--color-gray-600)",
            fontSize: "0.78rem",
            fontWeight: 600,
        },
        tagPillSoft: {
            padding: "0.32rem 0.8rem",
            borderRadius: "999px",
            background:
                "color-mix(in srgb, var(--color-primary-500) 16%, transparent)",
            color: isDarkMode
                ? "var(--color-primary-100)"
                : "var(--color-primary-700)",
            fontSize: "0.78rem",
            fontWeight: 600,
            minWidth: "70px",
            textAlign: "center",
        },
        cardAction: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            borderRadius: "9999px",
            padding: "0.45rem 0.9rem",
            fontWeight: 600,
            fontSize: "0.95rem",
            cursor: "pointer",
            border: "1px solid rgba(46, 166, 218, 0.82)",
            color: "var(--color-white)",
            background: "rgba(46, 166, 218, 0.82)",
            transition: "background 0.18s ease, box-shadow 0.18s ease",
            boxShadow: "var(--shadow-soft)",
            justifySelf: "center",
            width: "170px",
            whiteSpace: "nowrap",
        },
        cardActionHover: {
            background: "rgba(46, 166, 218, 0.78)",
            border: "1px solid rgba(46, 166, 218, 0.78)",
            color: "var(--color-white)",
            boxShadow: "var(--shadow-lg)",
        },
        exploreResourcesButton: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            borderRadius: "0.85rem",
            padding: "0.6rem 1.4rem",
            fontWeight: 700,
            fontSize: "1.05rem",
            cursor: "pointer",
            border: "1px solid rgba(46, 166, 218, 0.82)",
            color: "var(--color-white)",
            background: "rgba(46, 166, 218, 0.82)",
            transition: "background 0.18s ease, box-shadow 0.18s ease",
            boxShadow: "var(--shadow-soft)",
            width: "auto",
            whiteSpace: "nowrap",
            marginTop: "0.6rem",
        },
        coloredCardSection: {
            borderRadius: "1.2rem",
            border: "1px solid rgba(56, 191, 248, 0.66)",
            background: "rgba(56, 191, 248, 0.66)",
            boxShadow: "var(--shadow-md)",
            padding: "2rem",
            display: "grid",
            gap: "1.5rem",
        },
        highlightGrid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.6rem",
        },
        highlightCard: {
            borderRadius: "1.2rem",
            border: "1px solid rgba(56, 189, 248, 0.2)",
            background: isDarkMode
                ? "rgba(56, 189, 248, 0.08)"
                : "rgba(56, 189, 248, 0.15)",
            boxShadow: "var(--shadow-md)",
            padding: "1.85rem",
            display: "grid",
            gap: "0.95rem",
            transition:
                "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease",
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
            background:
                "linear-gradient(135deg, color-mix(in srgb, var(--color-cyan-400) 32%, transparent), color-mix(in srgb, var(--color-primary-400) 28%, transparent))",
            color: "var(--color-primary-600)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.2rem",
            flexShrink: 0,
        },
        highlightTitle: {
            fontSize: "1.18rem",
            fontWeight: 600,
            color: "var(--color-gray-900)",
        },
        highlightBadge: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.82rem",
            fontWeight: 600,
            color: "var(--color-primary-600)",
        },
        highlightMoments: {
            display: "flex",
            flexWrap: "wrap",
            gap: "0.45rem",
        },
        highlightMomentChip: {
            padding: "0.32rem 0.78rem",
            borderRadius: "999px",
            background:
                "color-mix(in srgb, var(--color-cyan-400) 18%, transparent)",
            color: isDarkMode
                ? "var(--color-primary-100)"
                : "var(--color-primary-800)",
            fontSize: "0.78rem",
            fontWeight: 600,
        },
        highlightMetric: {
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "var(--color-primary-600)",
        },
        highlightCardHover: {
            transform: "translateY(-6px)",
            boxShadow: "var(--shadow-xl)",
            borderColor: "var(--color-primary-300)",
        },
        highlightEmoji: {
            fontSize: "1.3rem",
        },
        highlightDescription: {
            fontSize: "0.94rem",
            color: "var(--color-gray-600)",
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
            background:
                "color-mix(in srgb, var(--color-cyan-400) 22%, transparent)",
            color: isDarkMode ? "var(--color-cyan-100)" : "var(--color-cyan-800)",
            fontSize: "0.78rem",
            fontWeight: 600,
        },
        list: {
            margin: 0,
            paddingLeft: "1.2rem",
            display: "grid",
            gap: "0.48rem",
            color: "var(--color-gray-600)",
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

    return { styles, modalStyles };
};

const Resources = () => {
    const { isMobile, isTablet, isSmallMobile, width } = useResponsive();
    const { isDarkMode } = useTheme();
    const { styles, modalStyles } = getStyles(
        isMobile,
        isTablet,
        isSmallMobile,
        width,
        isDarkMode
    );
    const [activeCategory, setActiveCategory] = useState("all");
    const [query, setQuery] = useState("");
    const [selectedResource, setSelectedResource] = useState(null);

    const filteredResources = useMemo(() => {
        const normalisedQuery = query.trim().toLowerCase();
        return resourceLibrary.filter((resource) => {
            const matchesCategory =
                activeCategory === "all" || resource.type === activeCategory;
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
            // Simulate download for templates
            const templateContent = `
# ${resource.title}

${resource.description}

## Key Features
${resource.tags ? resource.tags.map((tag) => `- ${tag}`).join("\n") : ""}

## How to Use
1. Download this template
2. Customize it for your needs
3. Implement in your workflow

Generated by FocusFlow Resources
            `;

            const blob = new Blob([templateContent], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${resource.title
                .replace(/\s+/g, "_")
                .toLowerCase()}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else {
            setSelectedResource(resource);
        }
    };

    const renderResourceIcon = (resource) => {
        const Icon = resource.icon || BookOpenIcon;
        return <Icon style={{ width: "1.75rem", height: "1.75rem" }} />;
    };

    const renderModalContent = (resource) => {
        if (!resource) return null;
        if (resource.type === "video" && resource.videoUrl) {
            return (
                <div style={{ display: "grid", gap: "1.25rem" }}>
                    <div
                        style={{
                            position: "relative",
                            paddingBottom: "56.25%",
                            borderRadius: "1rem",
                            overflow: "hidden",
                        }}
                    >
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
                    <p
                        style={{
                            color: "var(--color-gray-700)",
                            lineHeight: 1.7,
                        }}
                    >
                        {resource.description}
                    </p>
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
                <p style={{ color: "var(--color-gray-700)", lineHeight: 1.7 }}>
                    {resource.description}
                </p>
                {contentParagraphs.length > 0 && (
                    <div
                        style={{
                            display: "grid",
                            gap: "0.85rem",
                            color: "var(--color-gray-600)",
                            lineHeight: 1.68,
                        }}
                    >
                        {contentParagraphs.map((paragraph, index) => (
                            <p
                                key={`${resource.id}-paragraph-${index}`}
                                style={{ margin: 0 }}
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>
                )}
                {contentParagraphs.length === 0 &&
                    resource.type !== "template" && (
                        <p
                            style={{
                                margin: 0,
                                color: "var(--color-gray-600)",
                            }}
                        >
                            Full details are coming soon. For now, explore the
                            quick takeaways below.
                        </p>
                    )}
            </div>
        );
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <section style={styles.hero}>
                    <div style={styles.heroGlow} aria-hidden />
                    <div style={styles.heroLayout}>
                        <div style={styles.heroLeft}>
                            <div>
                                <h1 style={styles.heroTitle}>
                                    Find your next focus boost
                                </h1>
                                <p style={styles.heroLead}>
                                    Bite-sized playbooks, remixable templates,
                                    and on-demand jams. Dip in, grab what’s fun,
                                    and get back to creating.
                                </p>
                            </div>
                            <div style={styles.badgeRow}>
                                {heroTags.map((tag) => (
                                    <span key={tag} style={styles.badge}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div style={styles.heroActionCard}>
                                <div style={styles.highlightList}>
                                    {[
                                        "Quick filters keep the library light",
                                        "Grab templates without the signup",
                                        "Swap categories in one click",
                                    ].map((tip) => (
                                        <div
                                            key={tip}
                                            style={styles.highlightChip}
                                        >
                                            <ChartBarIcon
                                                style={styles.highlightChipIcon}
                                            />
                                            <span>{tip}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* <div style={styles.heroActionCard}>
                                <div style={styles.highlightFooter}>
                                    <span style={styles.highlightFooterCopy}>
                                        <LightBulbIcon
                                            style={{
                                                width: "1rem",
                                                height: "1rem",
                                            }}
                                        />{" "}
                                        Start with a focus sprint
                                    </span>
                                </div>
                            </div> */}
                        </div>
                        <div style={styles.heroRight}>
                            <div style={styles.highlightPanel}>
                                <div style={styles.highlightPanelHeader}>
                                    <span style={styles.highlightPanelBadge}>
                                        <BookOpenIcon
                                            style={{
                                                width: "1rem",
                                                height: "1rem",
                                            }}
                                        />{" "}
                                        Resource types
                                    </span>
                                    <h2 style={styles.highlightPanelTitle}>
                                        What's in the vault
                                    </h2>
                                </div>
                                <div style={styles.heroStatsGrid}>
                                    {resourceStats.map((stat) => (
                                        <div
                                            key={stat.key}
                                            style={styles.heroStat}
                                        >
                                            <div style={styles.heroStatTop}>
                                                <div
                                                    style={styles.heroStatIconWrap}
                                                >
                                                    <span
                                                        style={{
                                                            fontSize: "1.1rem",
                                                        }}
                                                    >
                                                        {stat.icon}
                                                    </span>
                                                </div>
                                                <span style={styles.heroStatLabel}>
                                                    {stat.label}
                                                </span>
                                            </div>
                                            <span style={styles.heroStatValue}>
                                                {stat.count}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* <button
                                style={styles.exploreResourcesButton}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                        "rgba(46, 166, 218, 0.18)";
                                    e.currentTarget.style.border =
                                        "1px solid rgba(46, 166, 218, 0.28)";
                                    e.currentTarget.style.boxShadow =
                                        "var(--shadow-lg)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                        "rgba(46, 166, 218, 0.82)";
                                    e.currentTarget.style.border =
                                        "1px solid rgba(46, 166, 218, 0.82)";
                                    e.currentTarget.style.boxShadow =
                                        "var(--shadow-soft)";
                                }}
                                onClick={() => setActiveCategory("all")}
                            >
                                <PlayCircleIcon
                                    style={{
                                        width: "1.2rem",
                                        height: "1.2rem",
                                    }}
                                />
                                <span>Explore resources</span>
                            </button> */}
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.sectionAccent} />
                    <div style={styles.sectionHeader}>
                        <span style={styles.sectionEyebrow}>
                            <MagnifyingGlassIcon
                                style={{
                                    width: "1rem",
                                    height: "1rem",
                                    marginRight: "0.5rem",
                                }}
                            />
                            Search the stash
                        </span>
                        <h2 style={styles.sectionTitle}>Explore resources</h2>
                        <p style={styles.sectionLead}>
                            Quick filters + playful tags keep the library
                            feeling light. Swap categories or search by vibe.
                        </p>
                    </div>
                    <div style={styles.statGrid}>
                        {resourceStats.map((stat) => (
                            <div key={stat.key} style={styles.statCard}>
                                <div style={styles.statLabelRow}>
                                    <span>{stat.icon}</span>
                                    <span>{stat.label}</span>
                                </div>
                                <span style={styles.statValue}>
                                    {stat.count}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div style={styles.sectionCard}>
                        <div style={styles.searchPanel}>
                            <input
                                type="text"
                                placeholder="Search guides, videos, templates..."
                                value={query}
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                                style={styles.searchInput}
                            />
                            <div style={styles.filterBar}>
                                {categories.map((category) => (
                                    <button
                                        key={category.key}
                                        type="button"
                                        style={
                                            activeCategory === category.key
                                                ? {
                                                    ...styles.filterChip,
                                                    ...styles.filterChipActive,
                                                }
                                                : styles.filterChip
                                        }
                                        onClick={() =>
                                            setActiveCategory(category.key)
                                        }
                                    >
                                        {categoryIcons[category.key] &&
                                            category.key !== "all" && (
                                                <span>
                                                    {
                                                        categoryIcons[
                                                        category.key
                                                        ]
                                                    }
                                                </span>
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
                                            Object.assign(
                                                event.currentTarget.style,
                                                styles.resourceCardHover
                                            )
                                        }
                                        onMouseLeave={(event) =>
                                            Object.assign(
                                                event.currentTarget.style,
                                                styles.resourceCard
                                            )
                                        }
                                    >
                                        <div style={styles.resourceHeader}>
                                            <div style={styles.resourceIcon}>
                                                {renderResourceIcon(resource)}
                                            </div>
                                            <div
                                                style={{
                                                    display: "grid",
                                                    gap: "0.45rem",
                                                }}
                                            >
                                                <div
                                                    style={styles.resourceTitle}
                                                >
                                                    {resource.title}
                                                </div>
                                                <div
                                                    style={styles.resourceMeta}
                                                >
                                                    {resourceTypeLabels[
                                                        resource.type
                                                    ] && (
                                                            <span
                                                                style={
                                                                    styles.resourceTypePill
                                                                }
                                                            >
                                                                {
                                                                    resourceTypeLabels[
                                                                    resource
                                                                        .type
                                                                    ]
                                                                }
                                                            </span>
                                                        )}
                                                    {resource.level && (
                                                        <span>
                                                            {resource.level}
                                                        </span>
                                                    )}
                                                    {resource.duration && (
                                                        <span>
                                                            {resource.duration}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <p style={styles.resourceDescription}>
                                            {resource.description}
                                        </p>
                                        {Array.isArray(resource.tags) &&
                                            resource.tags.length > 0 && (
                                                <div style={styles.tagRow}>
                                                    {resource.tags
                                                        .slice(0, 3)
                                                        .map((tag) => (
                                                            <span
                                                                key={`${resource.id}-${tag}`}
                                                                style={
                                                                    styles.tagPillSoft
                                                                }
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    {resource.tags.length >
                                                        3 && (
                                                            <span
                                                                style={
                                                                    styles.tagPillSoft
                                                                }
                                                            >
                                                                +
                                                                {resource.tags
                                                                    .length - 3}
                                                            </span>
                                                        )}
                                                </div>
                                            )}
                                        <button
                                            type="button"
                                            style={styles.cardAction}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background =
                                                    "rgba(46, 166, 218, 0.18)";
                                                e.currentTarget.style.border =
                                                    "1px solid rgba(46, 166, 218, 0.28)";
                                                e.currentTarget.style.boxShadow =
                                                    "var(--shadow-lg)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background =
                                                    "rgba(46, 166, 218, 0.82)";
                                                e.currentTarget.style.border =
                                                    "1px solid rgba(46, 166, 218, 0.82)";
                                                e.currentTarget.style.boxShadow =
                                                    "var(--shadow-soft)";
                                            }}
                                            onClick={() =>
                                                handleResourceAction(resource)
                                            }
                                        >
                                            {resource.type === "template" ? (
                                                <>
                                                    <ArrowDownTrayIcon
                                                        style={{
                                                            width: "1rem",
                                                            height: "1rem",
                                                        }}
                                                    />
                                                    Download kit
                                                </>
                                            ) : (
                                                <>
                                                    <BookOpenIcon
                                                        style={{
                                                            width: "1rem",
                                                            height: "1rem",
                                                        }}
                                                    />
                                                    View resource
                                                </>
                                            )}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={styles.emptyState}>
                                <div style={{ fontSize: "1.8rem" }}>🔍</div>
                                <div style={styles.emptyStateTitle}>
                                    No matches yet
                                </div>
                                <div style={styles.emptyStateSubtitle}>
                                    Try another keyword or browse a different
                                    category.
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.sectionAccent} />
                    <div style={styles.sectionHeader}>
                        <span style={styles.sectionEyebrow}>
                            <RocketLaunchIcon
                                style={{
                                    width: "1rem",
                                    height: "1rem",
                                    marginRight: "0.5rem",
                                }}
                            />
                            Mini adventures
                        </span>
                        <h2 style={styles.sectionTitle}>Learning tracks</h2>
                        <p style={styles.sectionLead}>
                            Pick a track, follow the tiny prompts, and stack
                            wins without the overwhelm.
                        </p>
                    </div>
                    <div style={styles.highlightGrid}>
                        {learningTracks.map((track) => (
                            <div
                                key={track.title}
                                style={styles.highlightCard}
                                onMouseEnter={(event) =>
                                    Object.assign(
                                        event.currentTarget.style,
                                        styles.highlightCardHover
                                    )
                                }
                                onMouseLeave={(event) =>
                                    Object.assign(
                                        event.currentTarget.style,
                                        styles.highlightCard
                                    )
                                }
                            >
                                <div style={styles.highlightHeader}>
                                    <div style={styles.highlightIcon}>
                                        <BookOpenIcon
                                            style={{
                                                width: "1.25rem",
                                                height: "1.25rem",
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <div style={styles.highlightTitle}>
                                            {track.title}
                                        </div>
                                        <span style={styles.highlightBadge}>
                                            {track.duration}
                                        </span>
                                    </div>
                                </div>
                                <p style={styles.highlightDescription}>
                                    {track.vibe}
                                </p>
                                <div style={styles.highlightMoments}>
                                    {track.moments.map((moment) => (
                                        <span
                                            key={`${track.title}-${moment}`}
                                            style={styles.highlightMomentChip}
                                        >
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
                        <span style={styles.sectionEyebrow}>
                            <ArchiveBoxIcon
                                style={{
                                    width: "1rem",
                                    height: "1rem",
                                    marginRight: "0.5rem",
                                }}
                            />
                            Bundle + go
                        </span>
                        <h2 style={styles.sectionTitle}>Resource bundles</h2>
                        <p style={styles.sectionLead}>
                            Grab a bundle, drop it into your flow, and keep
                            things feeling fresh.
                        </p>
                    </div>
                    <div style={styles.highlightGrid}>
                        {resourceBundles.map((bundle) => (
                            <div
                                key={bundle.title}
                                style={styles.highlightCard}
                                onMouseEnter={(event) =>
                                    Object.assign(
                                        event.currentTarget.style,
                                        styles.highlightCardHover
                                    )
                                }
                                onMouseLeave={(event) =>
                                    Object.assign(
                                        event.currentTarget.style,
                                        styles.highlightCard
                                    )
                                }
                            >
                                <div style={styles.highlightHeader}>
                                    <div style={styles.highlightIcon}>
                                        <DocumentTextIcon
                                            style={{
                                                width: "1.25rem",
                                                height: "1.25rem",
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <div style={styles.highlightTitle}>
                                            {bundle.title}
                                        </div>
                                        <span style={styles.highlightBadge}>
                                            Ready-made kit
                                        </span>
                                    </div>
                                </div>
                                <p style={styles.highlightDescription}>
                                    {bundle.punchline}
                                </p>
                                <div style={styles.goodiesRow}>
                                    {bundle.goodies.map((goodie) => (
                                        <span
                                            key={`${bundle.title}-${goodie}`}
                                            style={styles.goodiesChip}
                                        >
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
                        <span style={styles.sectionEyebrow}>
                            <SignalIcon
                                style={{
                                    width: "1rem",
                                    height: "1rem",
                                    marginRight: "0.5rem",
                                }}
                            />
                            Signals from the crew
                        </span>
                        <h2 style={styles.sectionTitle}>Community signals</h2>
                        <p style={styles.sectionLead}>
                            Real moments from the community—proof that playful
                            productivity actually sticks.
                        </p>
                    </div>
                    <div style={styles.highlightGrid}>
                        {communitySignals.map((signal) => (
                            <div
                                key={signal.title}
                                style={styles.highlightCard}
                                onMouseEnter={(event) =>
                                    Object.assign(
                                        event.currentTarget.style,
                                        styles.highlightCardHover
                                    )
                                }
                                onMouseLeave={(event) =>
                                    Object.assign(
                                        event.currentTarget.style,
                                        styles.highlightCard
                                    )
                                }
                            >
                                <div style={styles.highlightHeader}>
                                    <div style={styles.highlightIcon}>
                                        <span style={styles.highlightEmoji}>
                                            {signal.icon}
                                        </span>
                                    </div>
                                    <div>
                                        <div style={styles.highlightTitle}>
                                            {signal.title}
                                        </div>
                                        <span style={styles.highlightMetric}>
                                            {signal.metric}
                                        </span>
                                    </div>
                                </div>
                                <p style={styles.highlightDescription}>
                                    {signal.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {selectedResource && (
                <div style={modalStyles.overlay}>
                    <div style={modalStyles.dialog}>
                        <div style={modalStyles.header}>
                            <h3
                                style={{
                                    fontSize: "1.25rem",
                                    fontWeight: 600,
                                    margin: 0,
                                }}
                            >
                                {selectedResource.title}
                            </h3>
                            <button
                                style={modalStyles.close}
                                onClick={() => setSelectedResource(null)}
                            >
                                ✕
                            </button>
                        </div>
                        <div style={modalStyles.body}>
                            {renderModalContent(selectedResource)}
                            {Array.isArray(selectedResource.bullets) &&
                                selectedResource.bullets.length > 0 && (
                                    <div>
                                        <h4
                                            style={{
                                                fontWeight: 600,
                                                marginBottom: "0.45rem",
                                            }}
                                        >
                                            Key takeaways
                                        </h4>
                                        <ul style={styles.list}>
                                            {selectedResource.bullets.map(
                                                (bullet) => (
                                                    <li
                                                        key={`${selectedResource.id}-${bullet}`}
                                                    >
                                                        {bullet}
                                                    </li>
                                                )
                                            )}
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
                                        boxShadow:
                                            "0 26px 50px -30px rgba(56,189,248,0.75)",
                                    })
                                }
                                onMouseLeave={(event) =>
                                    Object.assign(
                                        event.currentTarget.style,
                                        modalStyles.modalAction
                                    )
                                }
                                onClick={() =>
                                    handleResourceAction(selectedResource)
                                }
                            >
                                <ArrowDownTrayIcon
                                    style={{ width: "1rem", height: "1rem" }}
                                />{" "}
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
