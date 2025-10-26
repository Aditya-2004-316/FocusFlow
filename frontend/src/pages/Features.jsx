import React from "react";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import "../styles/CardHover.css";

const Features = () => {
    const features = [
        {
            icon: "⏰",
            title: "Focus Timer",
            description:
                "Customizable Pomodoro timer with focus and break sessions. Track your productivity and maintain a healthy work-life balance.",
        },
        {
            icon: "📊",
            title: "Productivity Analytics",
            description:
                "Detailed insights into your work patterns, focus sessions, and productivity trends. Make data-driven decisions to improve your workflow.",
        },
        {
            icon: "👥",
            title: "Community Features",
            description:
                "Connect with like-minded individuals, share your progress, and participate in productivity challenges with our growing community.",
        },
        {
            icon: "📚",
            title: "Resource Library",
            description:
                "Access a curated collection of productivity tips, articles, and guides to help you optimize your workflow and achieve your goals.",
        },
        {
            icon: "🔔",
            title: "Smart Notifications",
            description:
                "Customizable reminders and notifications to keep you on track and maintain your focus throughout the day.",
        },
        {
            icon: "⚙️",
            title: "Customizable Settings",
            description:
                "Personalize your experience with adjustable timer settings, themes, and preferences to match your workflow.",
        },
        {
            icon: "📈",
            title: "Progress Tracking",
            description:
                "Monitor your daily, weekly, and monthly progress with detailed statistics and visual representations of your achievements.",
        },
        {
            icon: "🎯",
            title: "Goal Setting",
            description:
                "Set and track your productivity goals, celebrate milestones, and continuously improve your focus and efficiency.",
        },
    ];

    const styles = {
        landingPage: {
            minHeight: '100vh',
            background: 'linear-gradient(to bottom, #0f172a, #1e293b, #0f172a)',
            color: '#ffffff',
        },
        featuresSection: {
            padding: '5rem 2rem',
            background: 'rgba(15, 23, 42, 0.5)',
        },
        featuresContainer: {
            maxWidth: '1200px',
            margin: '0 auto',
        },
        featuresTitle: {
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '3rem',
        },
        featuresGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            marginTop: '3rem',
        },
        featureCard: {
            background: 'rgba(30, 41, 59, 0.5)',
            backdropFilter: 'blur(8px)',
            padding: '2rem',
            borderRadius: '1rem',
            transition: 'all 0.3s ease',
            border: '1px solid #334155',
        },
        featureCardHover: {
            transform: 'translateY(-4px)',
            borderColor: 'rgba(167, 139, 250, 0.5)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        },
        featureTitle: {
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#38bdf8',
            marginBottom: '1rem',
        },
        featureDescription: {
            color: '#94a3b8',
            lineHeight: '1.6',
        },
        sectionHeader: {
            fontSize: '2.15rem',
            fontWeight: '700',
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '0.75rem',
        },
        sectionLead: {
            textAlign: 'center',
            maxWidth: '38rem',
            margin: '0 auto 3rem',
            color: '#94a3b8',
            fontSize: '1.05rem',
            lineHeight: '1.6',
        },
        blueprintSection: {
            padding: '4.5rem 2rem',
            background: 'rgba(15, 23, 42, 0.65)',
        },
        blueprintGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.75rem',
        },
        blueprintCard: {
            background: 'rgba(30, 41, 59, 0.4)',
            borderRadius: '0.9rem',
            border: '1px solid #334155',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            boxShadow: '0 15px 35px -20px rgba(0, 0, 0, 0.35)',
        },
        blueprintStep: {
            fontSize: '0.85rem',
            fontWeight: '700',
            letterSpacing: '0.08em',
            color: '#38bdf8',
        },
        blueprintTitle: {
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#ffffff',
        },
        blueprintDescription: {
            color: '#cbd5f5',
            fontSize: '0.9rem',
            lineHeight: '1.6',
        },
        workflowSection: {
            padding: '4.5rem 2rem',
            background: 'rgba(10, 16, 28, 0.9)',
        },
        workflowGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
            marginTop: '3rem',
        },
        workflowCard: {
            background: 'rgba(30, 41, 59, 0.45)',
            border: '1px solid #1f2937',
            borderRadius: '1rem',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
        },
        workflowIcon: {
            width: '2.75rem',
            height: '2.75rem',
            borderRadius: '0.75rem',
            background: 'rgba(56, 189, 248, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            color: '#38bdf8',
        },
        workflowTitle: {
            fontSize: '1.2rem',
            fontWeight: '600',
            color: '#e2e8f0',
        },
        workflowDescription: {
            color: '#94a3b8',
            fontSize: '0.95rem',
            lineHeight: '1.6',
        },
        workflowList: {
            listStyle: 'disc',
            paddingLeft: '1.5rem',
            color: '#94a3b8',
            fontSize: '0.85rem',
            lineHeight: '1.6',
            margin: 0,
        },
        comparisonSection: {
            padding: '4.5rem 2rem',
            background: 'rgba(15, 23, 42, 0.55)',
        },
        comparisonGrid: {
            display: 'grid',
            gap: '1.5rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        },
        comparisonCard: {
            background: 'rgba(30, 41, 59, 0.4)',
            borderRadius: '0.85rem',
            border: '1px solid #334155',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
        },
        comparisonMetric: {
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#38bdf8',
        },
        comparisonCaption: {
            color: '#94a3b8',
            fontSize: '0.9rem',
            lineHeight: '1.6',
        },
    };

    const featureBlueprints = [
        {
            label: 'RITUAL',
            title: 'Prime your deep-work block',
            description:
                'Lock in presets, mute notifications, and pull context notes into your workspace in under a minute.',
        },
        {
            label: 'FOCUS',
            title: 'Flow-ready timer controls',
            description:
                'Jump between saved presets, adjust on the fly, and capture quick break notes without stopping the clock.',
        },
        {
            label: 'REFLECT',
            title: 'Session review summaries',
            description:
                'Automatically logs win highlights, energy dips, and drastic focus changes so you can plan the next block smarter.',
        },
        {
            label: 'LEVEL UP',
            title: 'Goal ladders & streak boosts',
            description:
                'Stack micro-goals under big outcomes. Visual streaks keep momentum while adaptive prompts prevent burnout.',
        },
    ];

    const workflowBundles = [
        {
            icon: '🧠',
            title: 'Knowledge worker cockpit',
            description:
                'Designed for researchers and strategists juggling deep work and async collaboration.',
            bullets: [
                'Focus playlists and ambient noise controls',
                'Notebook sync to stash meeting notes instantly',
                'Context switch guardrails with smart reminders',
            ],
        },
        {
            icon: '🎨',
            title: 'Creator production lane',
            description:
                'Helps designers and makers cycle through ideation, execution, and reflection without losing spark.',
            bullets: [
                'Snapshot creative briefs and timelines per project',
                'Auto-save inspiration boards for later focus blocks',
                'Progress markers to share wins with collaborators',
            ],
        },
        {
            icon: '📚',
            title: 'Study sprint system',
            description:
                'Built for students chasing exam scores or certifications with consistent, high-impact reps.',
            bullets: [
                'Spaced repetition cues from each recap',
                'Accountability scoreboard for cohort syncing',
                'Reflection prompts tuned to subject mastery',
            ],
        },
    ];

    const proofPoints = [
        {
            metric: '92% shorter setup time',
            caption: 'Users launch focus sessions in under 30 seconds by saving preferred rituals.',
        },
        {
            metric: '8 hrs reclaimed monthly',
            caption: 'Automations remove status pings and manual logging across teams.',
        },
        {
            metric: '3x accountability lift',
            caption: 'Goal ladders and streak insights triple weekly check-in completion.',
        },
    ];

    return (
        <div style={styles.landingPage}>
            <LandingNavbar />
            <main style={styles.featuresSection}>
                <div style={styles.featuresContainer}>
                    <h1 style={styles.featuresTitle}>
                        Features
                    </h1>
                    <p
                        style={{
                            textAlign: "center",
                            maxWidth: "36rem",
                            margin: "0 auto 3rem",
                            color: "#94a3b8",
                            fontSize: "1.25rem",
                            lineHeight: "1.6",
                        }}
                    >
                        Discover the powerful tools and features designed to
                        help you stay focused, track your progress, and achieve
                        your productivity goals.
                    </p>
                    <div style={styles.featuresGrid}>
                        {features.map((feature, index) => (
                            <div
                                key={index} 
                                className="hover-card"
                                style={styles.featureCard}
                            >
                                <div
                                    style={{
                                        fontSize: "2.5rem",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    {feature.icon}
                                </div>
                                <h3 style={styles.featureTitle}>
                                    {feature.title}
                                </h3>
                                <p style={styles.featureDescription}>
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <section style={styles.blueprintSection}>
                <div style={styles.featuresContainer}>
                    <h2 style={styles.sectionHeader}>Feature blueprints</h2>
                    <p style={styles.sectionLead}>
                        Each flagship capability follows a repeatable loop—prime, focus, reflect, and level up. Mix and
                        match what you need to keep momentum steady.
                    </p>
                    <div style={styles.blueprintGrid}>
                        {featureBlueprints.map((item, idx) => (
                            <div key={idx} style={styles.blueprintCard}>
                                <span style={styles.blueprintStep}>{item.label}</span>
                                <div style={styles.blueprintTitle}>{item.title}</div>
                                <p style={styles.blueprintDescription}>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={styles.workflowSection}>
                <div style={styles.featuresContainer}>
                    <h2 style={styles.sectionHeader}>Workflow bundles</h2>
                    <p style={styles.sectionLead}>
                        FocusFlow adapts to different kinds of makers. Start with a preset bundle, then fine-tune rituals,
                        automations, and accountability nudges to match your day.
                    </p>
                    <div style={styles.workflowGrid}>
                        {workflowBundles.map((bundle, idx) => (
                            <div key={idx} style={styles.workflowCard}>
                                <div style={styles.workflowIcon}>{bundle.icon}</div>
                                <div style={styles.workflowTitle}>{bundle.title}</div>
                                <p style={styles.workflowDescription}>{bundle.description}</p>
                                <ul style={styles.workflowList}>
                                    {bundle.bullets.map((bullet, bulletIdx) => (
                                        <li key={bulletIdx}>{bullet}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={styles.comparisonSection}>
                <div style={styles.featuresContainer}>
                    <h2 style={styles.sectionHeader}>Why teams stick with FocusFlow</h2>
                    <p style={styles.sectionLead}>
                        Beyond the feature checklist, FocusFlow wins by removing friction and reinforcing habits. These
                        proof points come straight from customer reviews.
                    </p>
                    <div style={styles.comparisonGrid}>
                        {proofPoints.map((point, idx) => (
                            <div key={idx} style={styles.comparisonCard}>
                                <div style={styles.comparisonMetric}>{point.metric}</div>
                                <p style={styles.comparisonCaption}>{point.caption}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
};

export default Features;
