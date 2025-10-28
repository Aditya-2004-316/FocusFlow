import React, { useEffect, useMemo, useState } from "react";
import {
    PlayIcon,
    PauseIcon,
    ArrowPathIcon,
    StopIcon,
    MusicalNoteIcon,
    BellIcon,
    ChartBarIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const heroBadges = ["Adaptive presets", "Break reminders", "Session analytics"];

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

const rituals = [
    {
        title: "Before you press start",
        description: "Align intention with the block so your brain already knows the win condition.",
        steps: [
            "Define the one outcome you want from this session",
            "Silence notifications and close unrelated tabs",
            "Set your soundtrack or ambient noise cue",
        ],
    },
    {
        title: "During the break",
        description: "Breaks are short rituals to reset posture, energy, and attention.",
        steps: [
            "Stand, stretch, and hydrate",
            "Log any distractions in the quick capture pane",
            "Take three deep breaths before diving back in",
        ],
    },
    {
        title: "Closing the session",
        description: "Wrap with clarity so your next block starts friction-free.",
        steps: [
            "Note what moved forward and what’s blocked",
            "Queue the very next action in your task list",
            "Celebrate the momentum with a small acknowledgement",
        ],
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
    section: {
        borderRadius: "1.25rem",
        border: "1px solid var(--input-border)",
        background: "var(--panel-bg)",
        boxShadow: "var(--shadow-lg)",
        padding: "2.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
    },
    hero: {
        borderRadius: "1.5rem",
        padding: "2.85rem",
        background: "linear-gradient(135deg, rgba(56,189,248,0.16), rgba(129,140,248,0.18))",
        border: "1px solid rgba(56,189,248,0.28)",
        boxShadow: "0 32px 80px -48px rgba(56,189,248,0.55)",
        display: "grid",
        gap: "1.6rem",
    },
    heroTitle: {
        fontSize: "2.45rem",
        fontWeight: 700,
        lineHeight: 1.15,
        background: "linear-gradient(110deg, #38bdf8, #818cf8)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        margin: 0,
    },
    heroLead: {
        fontSize: "1.08rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.75,
        maxWidth: "46rem",
    },
    badgeRow: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.6rem",
    },
    badge: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        padding: "0.45rem 0.85rem",
        borderRadius: "9999px",
        background: "rgba(15,23,42,0.16)",
        color: "var(--color-primary-700)",
        fontSize: "0.82rem",
        fontWeight: 600,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
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
    },
    controlPrimary: {
        background: "linear-gradient(110deg, #38bdf8, #60a5fa)",
        border: "none",
        color: "#0f172a",
        boxShadow: "0 24px 48px -28px rgba(56,189,248,0.7)",
    },
    quickStats: {
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        width: "100%",
    },
    statCard: {
        borderRadius: "1rem",
        padding: "1.1rem 1.3rem",
        background: "var(--color-gray-50)",
        border: "1px solid var(--color-gray-200)",
        display: "grid",
        gap: "0.4rem",
    },
    statLabel: {
        fontSize: "0.78rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--color-gray-600)",
        fontWeight: 600,
    },
    statValue: {
        fontSize: "1.4rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
    },
    summaryCard: {
        borderRadius: "1.25rem",
        background: "linear-gradient(135deg, rgba(15,23,42,0.78), rgba(30,41,59,0.9))",
        border: "1px solid rgba(148,163,184,0.22)",
        boxShadow: "0 32px 80px -50px rgba(8,47,73,0.65)",
        color: "#e2e8f0",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
    },
    summaryLead: {
        fontSize: "0.95rem",
        lineHeight: 1.65,
        color: "#cbd5f5",
    },
    summaryGrid: {
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    },
    summaryTile: {
        background: "rgba(15,23,42,0.6)",
        borderRadius: "0.85rem",
        padding: "1rem 1.2rem",
        border: "1px solid rgba(148,163,184,0.22)",
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
    ritualGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "1.4rem",
    },
    ritualCard: {
        borderRadius: "1rem",
        border: "1px solid rgba(148,163,184,0.18)",
        background: "rgba(17,24,39,0.72)",
        boxShadow: "0 28px 60px -45px rgba(15,23,42,0.75)",
        color: "#f1f5f9",
        padding: "1.6rem",
        display: "grid",
        gap: "0.75rem",
    },
    ritualTitle: {
        fontSize: "1.08rem",
        fontWeight: 600,
        color: "#e2e8f0",
    },
    ritualDesc: {
        fontSize: "0.92rem",
        color: "#cbd5f5",
        lineHeight: 1.6,
    },
    ritualList: {
        paddingLeft: "1.2rem",
        fontSize: "0.86rem",
        lineHeight: 1.55,
        color: "#9fb6ff",
        margin: 0,
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
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [completedSessions, setCompletedSessions] = useState(0);
    const [currentSession, setCurrentSession] = useState(1);
    const [settings] = useState({
        focusDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 15,
        sessionsUntilLongBreak: 4,
    });

    useEffect(() => {
        if (!isRunning || timeLeft <= 0) return;
        const ticker = window.setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => window.clearInterval(ticker);
    }, [isRunning, timeLeft]);

    const handleTimerComplete = () => {
        if (isBreak) {
            setCompletedSessions((prev) => prev + 1);
            if (currentSession % settings.sessionsUntilLongBreak === 0) {
                setTimeLeft(settings.longBreakDuration * 60);
            } else {
                setTimeLeft(settings.shortBreakDuration * 60);
            }
        } else {
            setTimeLeft(settings.focusDuration * 60);
            setCurrentSession((prev) => prev + 1);
        }
        setIsBreak((prev) => !prev);
        setIsRunning(false);
    };

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
            { label: "Cycle", value: `${settings.sessionsUntilLongBreak} focus blocks` },
            { label: "Focus length", value: `${settings.focusDuration} min` },
            { label: "Short break", value: `${settings.shortBreakDuration} min` },
            { label: "Long break", value: `${settings.longBreakDuration} min` },
        ],
        [settings]
    );

    const progressValue = useMemo(() => {
        const max = isBreak ? (isBreak && currentSession % settings.sessionsUntilLongBreak === 0 ? settings.longBreakDuration : settings.shortBreakDuration) * 60 : settings.focusDuration * 60;
        return Math.max(0, Math.min(100, Math.round(((max - timeLeft) / max) * 100)));
    }, [isBreak, timeLeft, settings, currentSession]);

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <section style={styles.hero}>
                    <h1 style={styles.heroTitle}>Focus Timer</h1>
                    <p style={styles.heroLead}>
                        Build reliable focus streaks with balanced sessions, intentional breaks, and lightweight rituals that keep your momentum steady.
                    </p>
                    <div style={styles.badgeRow}>
                        {heroBadges.map((badge) => (
                            <span key={badge} style={styles.badge}>
                                {badge}
                            </span>
                        ))}
                    </div>
                </section>

                <section style={{ ...styles.section, gap: "2rem" }}>
                    <div style={styles.timerShell}>
                        <div style={styles.timerCard}>
                            <div style={styles.timerDisplay}>{formatTime(timeLeft)}</div>
                            <div style={styles.controls}>
                                {isRunning ? (
                                    <button
                                        style={{ ...styles.controlBtn, ...styles.controlPrimary }}
                                        onClick={() => setIsRunning(false)}
                                    >
                                        <PauseIcon style={{ width: "1.15rem", height: "1.15rem" }} /> Pause
                                    </button>
                                ) : (
                                    <button
                                        style={{ ...styles.controlBtn, ...styles.controlPrimary }}
                                        onClick={() => setIsRunning(true)}
                                    >
                                        <PlayIcon style={{ width: "1.15rem", height: "1.15rem" }} /> Start
                                    </button>
                                )}
                                <button style={styles.controlBtn} onClick={() => setIsRunning(false)}>
                                    <StopIcon style={{ width: "1.15rem", height: "1.15rem" }} /> Stop
                                </button>
                                <button
                                    style={styles.controlBtn}
                                    onClick={() => {
                                        setIsRunning(false);
                                        setIsBreak(false);
                                        setTimeLeft(settings.focusDuration * 60);
                                    }}
                                >
                                    <ArrowPathIcon style={{ width: "1.15rem", height: "1.15rem" }} /> Reset
                                </button>
                            </div>
                            <div style={styles.quickStats}>
                                <div style={styles.statCard}>
                                    <span style={styles.statLabel}>Session</span>
                                    <span style={styles.statValue}>{currentSession}</span>
                                </div>
                                <div style={styles.statCard}>
                                    <span style={styles.statLabel}>Completed</span>
                                    <span style={styles.statValue}>{completedSessions}</span>
                                </div>
                                <div style={styles.statCard}>
                                    <span style={styles.statLabel}>Mode</span>
                                    <span style={styles.statValue}>{isBreak ? "Break" : "Focus"}</span>
                                </div>
                                <div style={styles.statCard}>
                                    <span style={styles.statLabel}>Progress</span>
                                    <span style={styles.statValue}>{progressValue}%</span>
                                </div>
                            </div>
                        </div>

                        <div style={styles.summaryCard}>
                            <div>
                                <h3 style={{ fontSize: "1.2rem", fontWeight: 600, margin: 0 }}>Your session blueprint</h3>
                                <p style={styles.summaryLead}>
                                    Focus and break presets stay in sync with your rhythm. Adjust them anytime in settings—changes auto-save to upcoming cycles.
                                </p>
                            </div>
                            <div style={styles.summaryGrid}>
                                {sessionSnapshot.map((item) => (
                                    <div key={item.label} style={styles.summaryTile}>
                                        <span style={{ fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#94a3b8" }}>
                                            {item.label}
                                        </span>
                                        <span style={{ fontSize: "1.15rem", fontWeight: 600 }}>{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <div>
                        <h2 style={styles.sectionHeading}>Focus companion tools</h2>
                        <p style={styles.sectionLead}>
                            Drop in the support you need without leaving the timer. Everything stays light and responsive in both light and dark modes.
                        </p>
                    </div>
                    <div style={styles.gridAuto}>
                        {companionTools.map(({ title, description, Icon }) => (
                            <div key={title} style={styles.toolCard}>
                                <div style={styles.toolIcon}>
                                    <Icon style={{ width: "1.45rem", height: "1.45rem" }} />
                                </div>
                                <div style={styles.toolTitle}>{title}</div>
                                <p style={styles.toolCopy}>{description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={styles.section}>
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
                </section>

                <section style={styles.section}>
                    <div>
                        <h2 style={styles.sectionHeading}>Rituals that reinforce flow</h2>
                        <p style={styles.sectionLead}>
                            Light-touch habits before, during, and after each session help you stay grounded and avoid context-switch fatigue.
                        </p>
                    </div>
                    <div style={styles.ritualGrid}>
                        {rituals.map((item) => (
                            <div key={item.title} style={styles.ritualCard}>
                                <div style={styles.ritualTitle}>{item.title}</div>
                                <p style={styles.ritualDesc}>{item.description}</p>
                                <ul style={styles.ritualList}>
                                    {item.steps.map((step) => (
                                        <li key={step}>{step}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={styles.section}>
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
                </section>
            </div>
        </div>
    );
};

export default FocusTimer;
