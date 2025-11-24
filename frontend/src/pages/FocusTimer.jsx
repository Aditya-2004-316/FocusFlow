import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    PlayIcon,
    PauseIcon,
    ArrowPathIcon,
    StopIcon,
    MusicalNoteIcon,
    BellIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    ClockIcon,
    BoltIcon,
    AdjustmentsHorizontalIcon,
    SparklesIcon,
    CheckCircleIcon,
    PencilSquareIcon,
    FireIcon,
    ArrowTrendingUpIcon,
    RocketLaunchIcon,
    SignalIcon,
    PlusIcon,
    MinusIcon,
    LightBulbIcon,
} from "@heroicons/react/24/outline";

const heroBadges = ["Adaptive presets", "Break reminders", "Session analytics"];

const defaultTimerSettings = {
    focusDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    sessionsUntilLongBreak: 4,
};

const companionTools = [
    {
        title: "Focus music",
        description: "Launch curated ambient mixes that keep deep work immersive without hijacking attention.",
        Icon: MusicalNoteIcon,
    },
    {
        title: "Smart nudges",
        description: "Gentle prompts surface only when a block is ending or a break is overdue.",
        Icon: BellIcon,
    },
    {
        title: "Session analytics",
        description: "Watch streaks, averages, and focus/break balance update in real time.",
        Icon: ChartBarIcon,
    },
    {
        title: "Quick adjustments",
        description: "Tweak durations or auto-start behaviour mid-cycle without losing momentum.",
        Icon: Cog6ToothIcon,
    },
];

const presetLibrary = [
    {
        emoji: "🎧",
        title: "Deep focus 50/10",
        focus: "50 min",
        break: "10 min",
        description: "Great for design, research, or writing when you need a generous runway and mindful reset.",
    },
    {
        emoji: "⚡",
        title: "Momentum 30/5",
        focus: "30 min",
        break: "5 min",
        description: "Short, energetic sprints for packed meeting days or when you’re juggling quick wins.",
    },
    {
        emoji: "🌿",
        title: "Recharge 25/10",
        focus: "25 min",
        break: "10 min",
        description: "Perfect post-meetings to re-centre, stretch, and plan the next micro-goal.",
    },
];

const alignmentHighlights = [
    { icon: CheckCircleIcon, label: "Priority pinned" },
    { icon: SparklesIcon, label: "Energy check complete" },
    { icon: BoltIcon, label: "Recovery break queued" },
];

const alignmentCards = [
    {
        icon: PencilSquareIcon,
        title: "Session objective",
        status: "Ready",
        detail: "Draft the sprint recap before lunch.",
    },
    {
        icon: ClockIcon,
        title: "Focus window",
        status: "Protected",
        detail: "60-minute block reserved for deep work.",
    },
    {
        icon: BellIcon,
        title: "Back-on-track cue",
        status: "In place",
        detail: "Gentle nudge scheduled at the midway mark.",
    },
];

const recoveryNotes = [
    {
        title: "Protect energy peaks",
        description: "Schedule the toughest work when your energy naturally spikes and keep admin for troughs.",
    },
    {
        title: "Batch similar work",
        description: "Pair tasks that share context so you spend less time spinning up focus each block.",
    },
    {
        title: "Movement anchors",
        description: "Every second break, add light mobility or a short walk to refresh circulation and focus.",
    },
    {
        title: "Evening shutdown",
        description: "Five minutes of journaling clears lingering tasks and primes the next day’s plan.",
    },
];

export const sharedFocusShell = {
    page: {
        minHeight: "100vh",
        background: "var(--color-white)",
        color: "var(--color-gray-900)",
        transition: "background 0.3s ease, color 0.3s ease",
        padding: "4.5rem 1.75rem 5rem",
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
    section: {
        borderRadius: "1.25rem",
        border: "1px solid var(--input-border)",
        background: "var(--panel-bg)",
        boxShadow: "var(--shadow-lg)",
        padding: "2.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        backdropFilter: "blur(18px)",
        position: "relative",
        overflow: "hidden",
    },
    sectionCard: {
        borderRadius: "1.1rem",
        border: "1px solid var(--input-border)",
        background: "var(--panel-bg)",
        boxShadow: "var(--shadow-md)",
        padding: "1.8rem 2rem",
        display: "grid",
        gap: "1.5rem",
    },
    hero: {
        borderRadius: "1.6rem",
        padding: "3.1rem",
        background: "var(--panel-bg)",
        border: "1px solid var(--input-border)",
        boxShadow: "var(--shadow-lg)",
        display: "grid",
        gap: "2.2rem",
        position: "relative",
        overflow: "hidden",
        color: "var(--color-gray-900)",
    },
    heroGlow: {
        display: "none",
    },
    heroLayout: {
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
        gap: "1.6rem",
        alignItems: "stretch",
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
        padding: "1.15rem 1.3rem",
        borderRadius: "1.25rem",
        background: "var(--panel-bg)",
        border: "1px solid var(--input-border)",
        boxShadow: "var(--shadow-md)",
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
        fontSize: "2.65rem",
        fontWeight: 700,
        lineHeight: 1.12,
        background: "linear-gradient(to right, #38bdf8, #818cf8)",
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
        gap: "0.45rem",
    },
    badge: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        padding: "0.45rem 0.85rem",
        borderRadius: "9999px",
        background: "rgba(148,163,184,0.2)",
        color: "var(--color-gray-600)",
        fontSize: "0.78rem",
        fontWeight: 600,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
    },
    heroStatsGrid: {
        display: "grid",
        gap: "0.75rem",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
    heroStat: {
        borderRadius: "1rem",
        background: "var(--color-white)",
        border: "1px solid var(--input-border)",
        padding: "1rem",
        display: "grid",
        gap: "0.45rem",
        boxShadow: "var(--shadow-soft)",
    },
    heroStatIconWrap: {
        width: "2.25rem",
        height: "2.25rem",
        borderRadius: "0.75rem",
        background: "rgba(56,189,248,0.12)",
        color: "var(--color-primary-600)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
        background: "var(--panel-bg)",
        border: "1px solid var(--input-border)",
        boxShadow: "var(--shadow-soft)",
        padding: "1.6rem",
        display: "grid",
        gap: "1rem",
        alignContent: "start",
        width: "100%",
    },
    highlightHeader: {
        display: "grid",
        gap: "0.6rem",
    },
    highlightBadge: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        fontSize: "0.8rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "var(--color-primary-700)",
        background: "rgba(56,189,248,0.14)",
        borderRadius: "999px",
        padding: "0.45rem 0.9rem",
        justifySelf: "start",
        width: "max-content",
    },
    highlightTitle: {
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
        background: "rgba(148,163,184,0.15)",
        border: "1px solid var(--input-border)",
        borderRadius: "999px",
        padding: "0.55rem 0.85rem",
        fontSize: "0.86rem",
        fontWeight: 600,
        color: "var(--color-gray-700)",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        boxShadow: "var(--shadow-soft)",
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
        borderTop: "1px solid rgba(148,163,184,0.25)",
        paddingTop: "0.8rem",
    },
    highlightFooterCopy: {
        fontSize: "0.84rem",
        color: "var(--color-gray-600)",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
    },
    timerShell: {
        display: "grid",
        gap: "2rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        alignItems: "stretch",
    },
    timerCard: {
        borderRadius: "1.25rem",
        background: "var(--panel-bg)",
        border: "1px solid var(--input-border)",
        boxShadow: "var(--shadow-lg)",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.75rem",
        alignItems: "center",
    },
    timerModePill: {
        alignSelf: "center",
        padding: "0.35rem 0.9rem",
        borderRadius: "999px",
        background: "linear-gradient(110deg, rgba(14,165,233,0.14), rgba(30,64,175,0.16))",
        color: "var(--color-primary-700)",
        fontSize: "0.78rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontWeight: 600,
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
    },
    timerModeIcon: {
        width: "1rem",
        height: "1rem",
    },
    timerDisplay: {
        fontSize: "4.2rem",
        fontWeight: 700,
        letterSpacing: "0.08em",
        color: "var(--color-gray-900)",
    },
    controls: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.85rem",
        justifyContent: "center",
    },
    controlBtn: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.55rem",
        borderRadius: "9999px",
        padding: "0.85rem 2.1rem",
        fontWeight: 600,
        fontSize: "1rem",
        cursor: "pointer",
        border: "1px solid var(--color-primary-200)",
        color: "var(--color-primary-700)",
        background: "var(--color-primary-100)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        boxShadow: "0 18px 32px -28px rgba(14,165,233,0.65)",
    },
    controlPrimary: {
        background: "linear-gradient(110deg, #38bdf8, #60a5fa)",
        border: "none",
        color: "#0f172a",
        boxShadow: "0 24px 48px -28px rgba(56,189,248,0.7)",
    },
    controlSecondary: {
        background: "linear-gradient(110deg, rgba(59,130,246,0.08), rgba(14,165,233,0.08))",
        border: "1px solid rgba(56,189,248,0.28)",
        color: "var(--color-primary-700)",
    },

    sectionHeading: {
        fontSize: "1.55rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
    },
    sectionLead: {
        fontSize: "1rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.65,
    },
};

const styles = {
    ...sharedFocusShell,
    progressTrack: {
        width: "100%",
        height: "0.7rem",
        borderRadius: "999px",
        background: "linear-gradient(110deg, rgba(15,23,42,0.6), rgba(30,41,59,0.75))",
        border: "1px solid rgba(148,163,184,0.24)",
        position: "relative",
        overflow: "hidden",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 46px -34px rgba(14,165,233,0.6)",
    },
    progressFill: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        borderRadius: "inherit",
        background: "linear-gradient(110deg, rgba(56,189,248,0.95), rgba(99,102,241,0.9))",
        boxShadow: "0 18px 42px -30px rgba(56,189,248,0.8)",
        transition: "width 0.35s ease",
    },
    progressIndicator: {
        position: "absolute",
        top: "50%",
        width: "1.1rem",
        height: "1.1rem",
        borderRadius: "50%",
        background: "linear-gradient(140deg, #38bdf8, #60a5fa)",
        boxShadow: "0 0 18px rgba(56,189,248,0.75)",
        transform: "translate(-50%, -50%)",
        transition: "opacity 0.3s ease",
    },
    progressMeta: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        fontSize: "0.9rem",
        color: "var(--color-gray-600)",
    },
    quickStats: {
        display: "grid",
        gap: "1.1rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        width: "100%",
    },
    statCard: {
        borderRadius: "1.1rem",
        padding: "1.25rem 1.35rem",
        background: "var(--panel-bg)",
        border: "1px solid var(--input-border)",
        boxShadow: "var(--shadow-md)",
        display: "grid",
        gap: "0.75rem",
    },
    statHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.75rem",
    },
    statIconWrap: {
        width: "2.6rem",
        height: "2.6rem",
        borderRadius: "0.85rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(56,189,248,0.18)",
        color: "var(--color-primary-400)",
        flexShrink: 0,
    },
    statMeta: {
        display: "grid",
        gap: "0.45rem",
    },
    statLabel: {
        fontSize: "0.75rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--color-gray-600)",
        fontWeight: 600,
    },
    statValue: {
        fontSize: "1.55rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
    },
    statCaption: {
        fontSize: "0.85rem",
        color: "var(--color-gray-600)",
    },
    timerConfigurator: {
        marginTop: "1.6rem",
        borderRadius: "1.2rem",
        padding: "1.4rem 1.6rem",
        border: "1px solid var(--input-border)",
        background: "var(--panel-bg)",
        display: "grid",
        gap: "1.2rem",
        boxShadow: "var(--shadow-md)",
    },
    configHeader: {
        display: "grid",
        gap: "0.45rem",
    },
    configTitle: {
        fontSize: "0.95rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "var(--color-gray-900)",
    },
    configLead: {
        fontSize: "0.85rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.6,
    },
    configGrid: {
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        alignItems: "stretch",
    },
    configCard: {
        borderRadius: "1rem",
        border: "1px solid var(--input-border)",
        background: "var(--color-white)",
        padding: "1rem 1.1rem",
        display: "grid",
        gap: "0.75rem",
    },
    configIconWrap: {
        width: "2rem",
        height: "2rem",
        borderRadius: "0.75rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(56,189,248,0.18)",
        color: "var(--color-primary-300)",
    },
    configLabel: {
        fontSize: "0.85rem",
        color: "var(--color-gray-700)",
        fontWeight: 600,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
    },
    configControls: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.75rem",
    },
    configButton: {
        width: "2.45rem",
        height: "2.45rem",
        borderRadius: "0.85rem",
        border: "1px solid var(--color-primary-300)",
        background: "var(--color-primary-100)",
        color: "var(--color-primary-700)",
        fontSize: "1.1rem",
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        boxShadow: "var(--shadow-soft)",
    },
    configValue: {
        flex: 1,
        display: "grid",
        gap: "0.25rem",
        justifyItems: "center",
        color: "var(--color-gray-900)",
    },
    configValueNumber: {
        fontSize: "1.4rem",
        fontWeight: 700,
    },
    configValueCaption: {
        fontSize: "0.8rem",
        color: "var(--color-gray-600)",
    },
    summaryCard: {
        borderRadius: "1.25rem",
        background: "var(--panel-bg)",
        border: "1px solid var(--input-border)",
        boxShadow: "var(--shadow-lg)",
        color: "var(--color-gray-900)",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
    },
    summaryLead: {
        fontSize: "0.95rem",
        lineHeight: 1.65,
        color: "var(--color-gray-600)",
    },
    summaryGrid: {
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    },
    summaryTile: {
        background: "var(--color-white)",
        borderRadius: "0.85rem",
        padding: "1rem 1.2rem",
        border: "1px solid var(--input-border)",
        display: "grid",
        gap: "0.35rem",
    },
    sectionHeading: {
        fontSize: "1.55rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
    },
    sectionLead: {
        fontSize: "1rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.65,
    },
    gridAuto: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1.5rem",
    },
    toolCard: {
        borderRadius: "1.1rem",
        border: "1px solid var(--input-border)",
        background: "var(--panel-bg)",
        boxShadow: "var(--shadow-md)",
        padding: "1.6rem",
        display: "grid",
        gap: "0.8rem",
        textAlign: "left",
    },
    toolIcon: {
        width: "3rem",
        height: "3rem",
        borderRadius: "0.9rem",
        background: "var(--color-primary-100)",
        color: "var(--color-primary-600)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    toolTitle: {
        fontSize: "1.05rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
    },
    toolCopy: {
        fontSize: "0.92rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.6,
    },
    presetGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "1.4rem",
    },
    presetCard: {
        borderRadius: "1.05rem",
        border: "1px solid var(--input-border)",
        background: "var(--panel-bg)",
        boxShadow: "var(--shadow-md)",
        padding: "1.6rem",
        display: "grid",
        gap: "0.7rem",
    },
    presetEmoji: {
        width: "2.4rem",
        height: "2.4rem",
        borderRadius: "0.75rem",
        background: "var(--color-primary-100)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.3rem",
    },
    presetMeta: {
        display: "inline-flex",
        gap: "0.6rem",
        fontSize: "0.85rem",
        fontWeight: 600,
        color: "var(--color-primary-600)",
    },
    alignmentSection: {
        display: "grid",
        gap: "1.4rem",
    },
    alignmentHighlightRow: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.75rem",
    },
    alignmentHighlightChip: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.6rem 0.95rem",
        borderRadius: "0.9rem",
        background: "rgba(56,189,248,0.16)",
        color: "var(--color-primary-700)",
        fontWeight: 600,
        fontSize: "0.88rem",
        border: "1px solid rgba(56,189,248,0.28)",
    },
    alignmentHighlightIcon: {
        width: "1.1rem",
        height: "1.1rem",
    },
    alignmentCardGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1.2rem",
    },
    alignmentCard: {
        borderRadius: "1.1rem",
        background: "var(--panel-bg)",
        border: "1px solid var(--input-border)",
        boxShadow: "var(--shadow-soft)",
        padding: "1.4rem",
        display: "grid",
        gap: "0.75rem",
    },
    alignmentCardHeader: {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
    },
    alignmentCardIcon: {
        width: "2.4rem",
        height: "2.4rem",
        borderRadius: "0.75rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(56,189,248,0.16)",
        color: "var(--color-primary-600)",
    },
    alignmentTitle: {
        margin: 0,
        fontSize: "1.05rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
    },
    alignmentStatus: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        padding: "0.3rem 0.75rem",
        borderRadius: "999px",
        background: "rgba(56,189,248,0.14)",
        color: "var(--color-primary-700)",
        fontSize: "0.78rem",
        fontWeight: 600,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
    },
    alignmentDetail: {
        fontSize: "0.9rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.55,
    },
    recoveryGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1.3rem",
    },
    recoveryCard: {
        borderRadius: "0.95rem",
        border: "1px solid rgba(56,189,248,0.22)",
        background: "rgba(56,189,248,0.1)",
        padding: "1.4rem",
        display: "grid",
        gap: "0.65rem",
    },
    recoveryTitle: {
        fontSize: "1rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
    },
    recoveryCopy: {
        fontSize: "0.9rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.6,
    },
};

const FocusTimer = () => {
    const [timeLeft, setTimeLeft] = useState(defaultTimerSettings.focusDuration * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [completedSessions, setCompletedSessions] = useState(0);
    const [currentSession, setCurrentSession] = useState(1);
    const [timerSettings, setTimerSettings] = useState(defaultTimerSettings);

    useEffect(() => {
        if (!isRunning || timeLeft <= 0) return;
        const ticker = window.setInterval(() => {
            setTimeLeft((prev) => (prev <= 0 ? 0 : prev - 1));
        }, 1000);
        return () => window.clearInterval(ticker);
    }, [isRunning, timeLeft]);

    const handleTimerComplete = () => {
        if (isBreak) {
            setCompletedSessions((prev) => prev + 1);
            if (currentSession % timerSettings.sessionsUntilLongBreak === 0) {
                setTimeLeft(timerSettings.longBreakDuration * 60);
            } else {
                setTimeLeft(timerSettings.shortBreakDuration * 60);
            }
        } else {
            setTimeLeft(timerSettings.focusDuration * 60);
            setCurrentSession((prev) => prev + 1);
        }
        setIsBreak((prev) => !prev);
        setIsRunning(false);
    };

    const applyTimerSettings = useCallback((nextSettings) => {
        setTimerSettings(nextSettings);
        const nextDuration = isBreak
            ? currentSession % nextSettings.sessionsUntilLongBreak === 0
                ? nextSettings.longBreakDuration
                : nextSettings.shortBreakDuration
            : nextSettings.focusDuration;
        setTimeLeft(nextDuration * 60);
        setIsRunning(false);
    }, [isBreak, currentSession]);

    const adjustSetting = useCallback(
        (key, delta, { min = 1, max = 120 } = {}) => {
            setTimerSettings((prev) => {
                const rawValue = prev[key] + delta;
                const clamped = Math.min(max, Math.max(min, rawValue));
                if (clamped === prev[key]) {
                    return prev;
                }
                const next = { ...prev, [key]: clamped };
                const nextDuration = isBreak
                    ? currentSession % next.sessionsUntilLongBreak === 0
                        ? next.longBreakDuration
                        : next.shortBreakDuration
                    : next.focusDuration;
                setTimeLeft(nextDuration * 60);
                setIsRunning(false);
                return next;
            });
        },
        [currentSession, isBreak]
    );

    const resetToDefaults = useCallback(() => {
        setCompletedSessions(0);
        setCurrentSession(1);
        setIsBreak(false);
        applyTimerSettings(defaultTimerSettings);
    }, [applyTimerSettings]);

    useEffect(() => {
        if (timeLeft === 0) {
            handleTimerComplete();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainder = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainder.toString().padStart(2, "0")}`;
    };

    const sessionSnapshot = useMemo(
        () => [
            {
                label: "Cycle",
                value: `${timerSettings.sessionsUntilLongBreak} focus blocks`,
                Icon: SparklesIcon,
            },
            {
                label: "Focus length",
                value: `${timerSettings.focusDuration} min`,
                Icon: ClockIcon,
            },
            {
                label: "Short break",
                value: `${timerSettings.shortBreakDuration} min`,
                Icon: AdjustmentsHorizontalIcon,
            },
            {
                label: "Long break",
                value: `${timerSettings.longBreakDuration} min`,
                Icon: BoltIcon,
            },
        ],
        [timerSettings]
    );

    const progressValue = useMemo(() => {
        const max = isBreak
            ? (isBreak && currentSession % timerSettings.sessionsUntilLongBreak === 0
                  ? timerSettings.longBreakDuration
                  : timerSettings.shortBreakDuration) * 60
            : timerSettings.focusDuration * 60;
        return Math.max(0, Math.min(100, Math.round(((max - timeLeft) / max) * 100)));
    }, [isBreak, timeLeft, timerSettings, currentSession]);

    const quickStatCards = useMemo(
        () => [
            {
                label: "Session",
                value: currentSession,
                caption: "Current focus sprint",
                Icon: FireIcon,
            },
            {
                label: "Completed",
                value: completedSessions,
                caption: "Blocks wrapped today",
                Icon: ArrowTrendingUpIcon,
            },
            {
                label: "Mode",
                value: isBreak ? "Break" : "Focus",
                caption: "Active phase right now",
                Icon: RocketLaunchIcon,
            },
            {
                label: "Progress",
                value: `${progressValue}%`,
                caption: "Current block complete",
                Icon: SignalIcon,
            },
        ],
        [currentSession, completedSessions, isBreak, progressValue]
    );

    const handleButtonHover = (event, entering) => {
        const { currentTarget } = event;
        const originalShadow = currentTarget.dataset.shadow || styles.controlBtn.boxShadow;
        if (!currentTarget.dataset.shadow) {
            currentTarget.dataset.shadow = window.getComputedStyle(currentTarget).boxShadow || styles.controlBtn.boxShadow;
        }
        currentTarget.style.transform = entering ? "translateY(-2px)" : "none";
        currentTarget.style.boxShadow = entering ? "0 22px 36px -20px rgba(56,189,248,0.55)" : originalShadow;
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <section style={styles.hero}>
                    <div style={styles.heroGlow} aria-hidden />
                    <div style={styles.heroLayout}>
                        <div style={styles.heroLeft}>
                            <div>
                                <h1 style={styles.heroTitle}>Focus Timer</h1>
                                <p style={styles.heroLead}>
                                    Build reliable focus streaks with balanced sessions, intentional breaks, and lightweight rituals that keep your momentum steady.
                                </p>
                            </div>
                            <div style={styles.badgeRow}>
                                {heroBadges.map((badge) => (
                                    <span key={badge} style={styles.badge}>
                                        {badge}
                                    </span>
                                ))}
                            </div>
                            <div style={styles.heroActionCard}>
                                <div style={styles.highlightList}>
                                    {[
                                        "Sessions auto-rotate breaks",
                                        "Keep streaks synced across devices",
                                        "Preset tweaks save instantly",
                                    ].map((tip) => (
                                        <div key={tip} style={styles.highlightChip}>
                                            <ChartBarIcon style={styles.highlightChipIcon} />
                                            <span>{tip}</span>
                                        </div>
                                    ))}
                                </div>
                                <div style={styles.highlightFooter}>
                                    <span style={styles.highlightFooterCopy}>
                                        <ClockIcon style={{ width: "1rem", height: "1rem" }} /> Next break in {timerSettings.shortBreakDuration} minutes
                                    </span>
                                    <button
                                        onClick={() => setIsRunning(true)}
                                        style={{
                                            ...styles.controlBtn,
                                            ...styles.controlPrimary,
                                            padding: "0.6rem 1.6rem",
                                            fontSize: "0.95rem",
                                        }}
                                        onMouseEnter={(event) => handleButtonHover(event, true)}
                                        onMouseLeave={(event) => handleButtonHover(event, false)}
                                    >
                                        <PlayIcon style={{ width: "1.1rem", height: "1.1rem" }} /> Start session
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div style={styles.heroRight}>
                            <div style={styles.highlightPanel}>
                                <div style={styles.highlightHeader}>
                                    <span style={styles.highlightBadge}>
                                        <ChartBarIcon style={{ width: "1rem", height: "1rem" }} /> Current cadence
                                    </span>
                                    <h2 style={styles.highlightTitle}>Your preset blueprint</h2>
                                </div>
                                <div style={styles.heroStatsGrid}>
                                    {sessionSnapshot.map((item) => (
                                        <div key={item.label} style={styles.heroStat}>
                                            <div style={styles.heroStatIconWrap}>
                                                <item.Icon style={{ width: "1.1rem", height: "1.1rem" }} />
                                            </div>
                                            <span style={styles.heroStatLabel}>{item.label}</span>
                                            <span style={styles.heroStatValue}>{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div style={{
                    background: "linear-gradient(110deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))",
                    borderRadius: "1.25rem",
                    padding: "1.5rem 1.75rem",
                    border: "1px solid rgba(139, 92, 246, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    gap: "1.25rem",
                    boxShadow: "0 10px 30px -10px rgba(139, 92, 246, 0.2)",
                    maxWidth: "1120px",
                    margin: "0 auto",
                }}>
                    <LightBulbIcon style={{ width: "2.5rem", height: "2.5rem", color: "#8b5cf6", flexShrink: 0 }} />
                    <div>
                        <p style={{
                            margin: 0,
                            fontSize: "1.1rem",
                            fontWeight: 600,
                            color: "var(--color-gray-900)",
                            lineHeight: 1.5,
                        }}>
                            💡 Tip: For best results, start with a relaxation activity before your focus session.
                        </p>
                        <p style={{
                            margin: "0.35rem 0 0",
                            fontSize: "0.95rem",
                            color: "var(--color-gray-600)",
                            lineHeight: 1.5,
                        }}>
                            Visit the Dashboard's "Relax Before You Focus" section to try meditation, music, affirmations, and more.
                        </p>
                    </div>
                </div>

                <section style={{ ...styles.section, gap: "2rem" }}>
                    <div style={styles.timerShell}>
                        <div style={styles.timerCard}>
                            <span style={styles.timerModePill}>
                                <SparklesIcon style={styles.timerModeIcon} />
                                {isBreak ? "Break" : "Focus"} mode
                            </span>
                            <div style={styles.timerDisplay}>{formatTime(timeLeft)}</div>
                            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                                <div style={styles.progressTrack}>
                                    <div style={{ ...styles.progressFill, width: `${progressValue}%` }} />
                                    <span
                                        style={{
                                            ...styles.progressIndicator,
                                            opacity: progressValue > 0 ? 1 : 0,
                                            left: `${progressValue}%`,
                                        }}
                                    />
                                </div>
                                <div style={styles.progressMeta}>
                                    <span>{isBreak ? "Break" : "Focus"} phase</span>
                                    <span>{progressValue}% complete</span>
                                </div>
                            </div>
                            <div style={styles.controls}>
                                {isRunning ? (
                                    <button
                                        style={{ ...styles.controlBtn, ...styles.controlPrimary }}
                                        onClick={() => setIsRunning(false)}
                                        onMouseEnter={(event) => handleButtonHover(event, true)}
                                        onMouseLeave={(event) => handleButtonHover(event, false)}
                                    >
                                        <PauseIcon style={{ width: "1.15rem", height: "1.15rem" }} /> Pause
                                    </button>
                                ) : (
                                    <button
                                        style={{ ...styles.controlBtn, ...styles.controlPrimary }}
                                        onClick={() => setIsRunning(true)}
                                        onMouseEnter={(event) => handleButtonHover(event, true)}
                                        onMouseLeave={(event) => handleButtonHover(event, false)}
                                    >
                                        <PlayIcon style={{ width: "1.15rem", height: "1.15rem" }} /> Start
                                    </button>
                                )}
                                <button
                                    style={{ ...styles.controlBtn, ...styles.controlSecondary }}
                                    onClick={() => setIsRunning(false)}
                                    onMouseEnter={(event) => handleButtonHover(event, true)}
                                    onMouseLeave={(event) => handleButtonHover(event, false)}
                                >
                                    <StopIcon style={{ width: "1.15rem", height: "1.15rem" }} /> Stop
                                </button>
                                <button
                                    style={{ ...styles.controlBtn, ...styles.controlSecondary }}
                                    onClick={() => {
                                        setIsRunning(false);
                                        setIsBreak(false);
                                        setTimeLeft(timerSettings.focusDuration * 60);
                                    }}
                                    onMouseEnter={(event) => handleButtonHover(event, true)}
                                    onMouseLeave={(event) => handleButtonHover(event, false)}
                                >
                                    <ArrowPathIcon style={{ width: "1.15rem", height: "1.15rem" }} /> Reset
                                </button>
                            </div>
                            <div style={styles.quickStats}>
                                {quickStatCards.map(({ label, value, caption, Icon }) => (
                                    <div key={label} style={styles.statCard}>
                                        <div style={styles.statHeader}>
                                            <div style={styles.statMeta}>
                                                <span style={styles.statLabel}>{label}</span>
                                                <span style={styles.statValue}>{value}</span>
                                            </div>
                                            <span style={styles.statIconWrap}>
                                                <Icon style={{ width: "1.35rem", height: "1.35rem" }} />
                                            </span>
                                        </div>
                                        <span style={styles.statCaption}>{caption}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={styles.timerConfigurator}>
                                <div style={styles.configHeader}>
                                    <span style={styles.configTitle}>Tune your block</span>
                                    <span style={styles.configLead}>
                                        Adjust focus, break, and cadence presets. Changes apply instantly without losing progress context.
                                    </span>
                                </div>
                                <div style={styles.configGrid}>
                                    {[
                                        {
                                            key: "focusDuration",
                                            label: "Focus duration",
                                            caption: "minutes per deep work block",
                                            min: 5,
                                            max: 90,
                                        },
                                        {
                                            key: "shortBreakDuration",
                                            label: "Short break",
                                            caption: "quick cooldown",
                                            min: 3,
                                            max: 30,
                                        },
                                        {
                                            key: "longBreakDuration",
                                            label: "Long break",
                                            caption: "recovery reset",
                                            min: 10,
                                            max: 60,
                                        },
                                    ].map(({ key, label, caption, min, max }) => (
                                        <div key={key} style={styles.configCard}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                                                <span style={styles.configIconWrap}>
                                                    <Cog6ToothIcon style={{ width: "1rem", height: "1rem" }} />
                                                </span>
                                                <span style={styles.configLabel}>{label}</span>
                                            </div>
                                            <div style={styles.configControls}>
                                                <button
                                                    type="button"
                                                    style={styles.configButton}
                                                    onClick={() => adjustSetting(key, -1, { min, max })}
                                                >
                                                    <MinusIcon style={{ width: "1rem", height: "1rem" }} />
                                                </button>
                                                <div style={styles.configValue}>
                                                    <span style={styles.configValueNumber}>{timerSettings[key]}</span>
                                                    <span style={styles.configValueCaption}>{caption}</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    style={styles.configButton}
                                                    onClick={() => adjustSetting(key, 1, { min, max })}
                                                >
                                                    <PlusIcon style={{ width: "1rem", height: "1rem" }} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    style={{ ...styles.controlBtn, ...styles.controlSecondary, justifySelf: "start", padding: "0.55rem 1.2rem" }}
                                    onClick={resetToDefaults}
                                    onMouseEnter={(event) => handleButtonHover(event, true)}
                                    onMouseLeave={(event) => handleButtonHover(event, false)}
                                >
                                    <ArrowPathIcon style={{ width: "1.1rem", height: "1.1rem" }} /> Restore defaults
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.sectionCard}>
                        <div>
                            <h2 style={styles.sectionHeading}>Preset library</h2>
                            <p style={styles.sectionLead}>
                                Start with a preset that matches your energy. Save favourites to reuse and tweak as your routine evolves.
                            </p>
                        </div>
                        <div style={styles.presetGrid}>
                            {presetLibrary.map((preset) => (
                                <div key={preset.title} style={styles.presetCard}>
                                    <div style={styles.presetEmoji}>{preset.emoji}</div>
                                    <div style={{ fontSize: "1.15rem", fontWeight: 600 }}>{preset.title}</div>
                                    <div style={styles.presetMeta}>
                                        <span>{preset.focus}</span>
                                        <span>{preset.break}</span>
                                    </div>
                                    <p style={styles.toolCopy}>{preset.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.sectionCard}>
                        <div>
                            <h2 style={styles.sectionHeading}>Session alignment at a glance</h2>
                            <p style={styles.sectionLead}>
                                Confirm the essentials before you hit start so every block stays intentional and interruption-proof.
                            </p>
                        </div>
                        <div style={styles.alignmentSection}>
                            <div style={styles.alignmentHighlightRow}>
                                {alignmentHighlights.map(({ icon: Icon, label }) => (
                                    <span key={label} style={styles.alignmentHighlightChip}>
                                        <Icon style={styles.alignmentHighlightIcon} />
                                        {label}
                                    </span>
                                ))}
                            </div>
                            <div style={styles.alignmentCardGrid}>
                                {alignmentCards.map(({ icon: Icon, title, status, detail }) => (
                                    <div key={title} style={styles.alignmentCard}>
                                        <div style={styles.alignmentCardHeader}>
                                            <span style={styles.alignmentCardIcon}>
                                                <Icon style={{ width: "1.2rem", height: "1.2rem" }} />
                                            </span>
                                            <div style={{ display: "grid", gap: "0.35rem" }}>
                                                <h3 style={styles.alignmentTitle}>{title}</h3>
                                                <span style={styles.alignmentStatus}>{status}</span>
                                            </div>
                                        </div>
                                        <p style={styles.alignmentDetail}>{detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* <section style={styles.section}>
                    <div>
                        <h2 style={styles.sectionHeading}>Recovery keeps momentum sustainable</h2>
                        <p style={styles.sectionLead}>
                            Rotate a few of these ideas into your week. They guard against burnout while keeping your focus streak intact.
                        </p>
                    </div>
                    <div style={styles.recoveryGrid}>
                        {recoveryNotes.map((item) => (
                            <div key={item.title} style={styles.recoveryCard}>
                                <div style={styles.recoveryTitle}>{item.title}</div>
                                <p style={styles.recoveryCopy}>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section> */}
            </div>
        </div>
    );
};

export default FocusTimer;
