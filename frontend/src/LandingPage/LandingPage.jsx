import React, { useState } from "react";
import LandingNavbar from "./LandingNavbar";
import LandingFooter from "./LandingFooter";
import AuthModals from "./AuthModals";

const LandingPage = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    // Listen for modal open events (for cross-component consistency)
    React.useEffect(() => {
        const handleOpenLoginModal = () => {
            setIsLoginOpen(true);
            setIsRegisterOpen(false);
        };
        const handleOpenRegisterModal = () => {
            setIsRegisterOpen(true);
            setIsLoginOpen(false);
        };
        window.addEventListener("openLoginModal", handleOpenLoginModal);
        window.addEventListener("openRegisterModal", handleOpenRegisterModal);
        return () => {
            window.removeEventListener("openLoginModal", handleOpenLoginModal);
            window.removeEventListener(
                "openRegisterModal",
                handleOpenRegisterModal
            );
        };
    }, []);

    const handleRegisterClick = () => {
        setIsRegisterOpen(true);
        setIsLoginOpen(false);
    };
    const handleCloseModal = () => {
        setIsLoginOpen(false);
        setIsRegisterOpen(false);
    };

    // Define all styles inline with dark theme from LandingPageOption1
    const styles = {
        landingPage: {
            minHeight: '100vh',
            background: 'linear-gradient(to bottom, #0f172a, #1e293b, #0f172a)',
            color: '#ffffff',
        },
        heroSection: {
            padding: '6rem 2rem 4rem',
            textAlign: 'center',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        heroTitle: {
            fontSize: '3.5rem',
            fontWeight: '800',
            color: '#ffffff',
            marginBottom: '1.5rem',
            lineHeight: '1.2',
        },
        heroSubtitle: {
            fontSize: '1.25rem',
            color: '#94a3b8',
            marginBottom: '3rem',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.6',
        },
        heroButtons: {
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
        },
        heroBtnPrimary: {
            background: 'linear-gradient(to right, #0ea5e9, #0ea5e9)',
            color: '#ffffff',
            padding: '1rem 2rem',
            borderRadius: '9999px',
            fontWeight: '600',
            fontSize: '1.125rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            textDecoration: 'none',
            display: 'inline-block',
            boxShadow: '0 10px 15px -3px rgba(14, 165, 233, 0.1), 0 4px 6px -2px rgba(14, 165, 233, 0.05)',
        },
        heroBtnPrimaryHover: {
            background: 'linear-gradient(to right, #0284c7, #0284c7)',
            transform: 'translateY(-2px)',
            boxShadow: '0 20px 25px -5px rgba(14, 165, 233, 0.3), 0 10px 10px -5px rgba(14, 165, 233, 0.1)',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
            borderColor: 'rgba(14, 165, 233, 0.5)',
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
        testimonialsSection: {
            padding: '5rem 2rem',
            background: 'rgba(15, 23, 42, 0.5)',
        },
        testimonialsContainer: {
            maxWidth: '1200px',
            margin: '0 auto',
        },
        testimonialsTitle: {
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '3rem',
        },
        testimonialsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '3rem',
        },
        testimonialCard: {
            background: 'rgba(30, 41, 59, 0.5)',
            backdropFilter: 'blur(8px)',
            padding: '2rem',
            borderRadius: '1rem',
            transition: 'all 0.3s ease',
            border: '1px solid #334155',
        },
        testimonialCardHover: {
            transform: 'translateY(-4px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        },
        testimonialQuote: {
            fontSize: '1.125rem',
            color: '#d1d5db',
            fontStyle: 'italic',
            marginBottom: '1.5rem',
            lineHeight: '1.6',
        },
        testimonialAuthor: {
            fontWeight: '600',
            color: '#38bdf8',
            marginBottom: '0.25rem',
        },
        testimonialRole: {
            color: '#6b7280',
            fontSize: '0.875rem',
        },
        ctaSection: {
            padding: '5rem 2rem',
            background: 'linear-gradient(to right, #0ea5e9, #0ea5e9)',
            textAlign: 'center',
        },
        ctaContainer: {
            maxWidth: '800px',
            margin: '0 auto',
        },
        ctaTitle: {
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '1.5rem',
        },
        ctaSubtitle: {
            fontSize: '1.25rem',
            color: '#e0e7ff',
            marginBottom: '3rem',
            lineHeight: '1.6',
        },
        ctaBtn: {
            background: '#ffffff',
            color: '#0ea5e9',
            padding: '1.25rem 3rem',
            borderRadius: '9999px',
            fontWeight: '600',
            fontSize: '1.125rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            textDecoration: 'none',
            display: 'inline-block',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
        ctaBtnHover: {
            background: '#f8fafc',
            transform: 'translateY(-2px)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
        howItWorksSection: {
            padding: '5rem 2rem',
            background: 'rgba(15, 23, 42, 0.5)',
        },
        howItWorksContainer: {
            maxWidth: '1100px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.12), rgba(14, 165, 233, 0.05))',
            borderRadius: '1.25rem',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            padding: '3.25rem 3rem',
            position: 'relative',
            overflow: 'hidden',
        },
        howBackdropOrb: {
            position: 'absolute',
            width: '320px',
            height: '320px',
            background: 'radial-gradient(circle at center, rgba(96, 165, 250, 0.35), transparent)',
            top: '-120px',
            right: '-80px',
            filter: 'blur(4px)',
            animation: 'floatPulse 14s ease-in-out infinite',
        },
        howBackdropGlow: {
            position: 'absolute',
            width: '260px',
            height: '260px',
            background: 'radial-gradient(circle at center, rgba(14, 165, 233, 0.25), transparent)',
            bottom: '-140px',
            left: '-90px',
            filter: 'blur(6px)',
            animation: 'glowDrift 18s ease-in-out infinite',
        },
        howItWorksTitle: {
            fontSize: '2.35rem',
            fontWeight: '700',
            color: '#0ea5e9',
            textAlign: 'center',
            marginBottom: '1rem',
        },
        howItWorksDescription: {
            color: '#d1d5db',
            fontSize: '1.15rem',
            margin: '0 auto 2.5rem',
            lineHeight: '1.65',
            maxWidth: '600px',
            textAlign: 'center',
        },
        howItWorksGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '1.75rem',
            position: 'relative',
            zIndex: 1,
        },
        howStepCard: {
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '1.15rem',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.1rem',
            boxShadow: '0 25px 45px -28px rgba(14, 165, 233, 0.6)',
            transition: 'transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
            animation: 'floatPulse 10s ease-in-out infinite',
        },
        howStepCardHover: {
            transform: 'translateY(-8px) scale(1.01)',
            borderColor: 'rgba(56, 189, 248, 0.55)',
            boxShadow: '0 35px 70px -40px rgba(14, 165, 233, 0.85)',
        },
        howStepTop: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
        },
        howStepIcon: {
            width: '3.25rem',
            height: '3.25rem',
            borderRadius: '0.9rem',
            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.25), rgba(14, 165, 233, 0.1))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.6rem',
            color: '#38bdf8',
        },
        howStepTitle: {
            fontSize: '1.35rem',
            fontWeight: '600',
            color: '#e2e8f0',
        },
        howStepDescription: {
            color: '#94a3b8',
            lineHeight: '1.65',
            fontSize: '0.98rem',
        },
        howStepAccent: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.5rem 0.9rem',
            borderRadius: '9999px',
            background: 'rgba(56, 189, 248, 0.18)',
            color: '#38bdf8',
            fontWeight: 600,
            fontSize: '0.78rem',
            letterSpacing: '0.05em',
        },
        howItWorksFooter: {
            marginTop: '2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
        },
        howItWorksBadge: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(14, 165, 233, 0.12)',
            color: '#38bdf8',
            borderRadius: '9999px',
            padding: '0.5rem 1rem',
            fontWeight: 600,
            fontSize: '0.85rem',
        },
        howItWorksFooterText: {
            color: '#cbd5f5',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            textAlign: 'center',
            maxWidth: '540px',
        },
        howItWorksFooterCta: {
            border: '1px solid rgba(56, 189, 248, 0.35)',
            borderRadius: '9999px',
            padding: '0.55rem 1.35rem',
            color: '#38bdf8',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
        },
        sectionHeader: {
            fontSize: '2.35rem',
            fontWeight: '700',
            color: '#ffffff',
            textAlign: 'center',
        },
        sectionLead: {
            textAlign: 'center',
            maxWidth: '40rem',
            margin: '0 auto 3rem',
            color: '#94a3b8',
            fontSize: '1.1rem',
            lineHeight: '1.7',
        },
        roadmapSection: {
            padding: '5rem 2rem',
            background: 'rgba(15, 23, 42, 0.55)',
        },
        roadmapContainer: {
            maxWidth: '1200px',
            margin: '0 auto',
        },
        roadmapGrid: {
            display: 'grid',
            gap: '1.75rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        },
        roadmapCard: {
            background: 'rgba(30, 41, 59, 0.55)',
            border: '1px solid #334155',
            borderRadius: '1rem',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: '0 20px 45px -18px rgba(0,0,0,0.45)',
        },
        roadmapBadge: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(56, 189, 248, 0.12)',
            color: '#38bdf8',
            borderRadius: '9999px',
            padding: '0.4rem 1rem',
            fontWeight: 600,
            fontSize: '0.85rem',
        },
        roadmapTitle: {
            fontSize: '1.35rem',
            fontWeight: '600',
            color: '#ffffff',
        },
        roadmapDescription: {
            color: '#cbd5f5',
            lineHeight: '1.7',
            fontSize: '0.98rem',
        },
        roadmapFooter: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#94a3b8',
            fontSize: '0.9rem',
            borderTop: '1px solid rgba(148, 163, 184, 0.2)',
            paddingTop: '1rem',
            marginTop: '0.5rem',
        },
        integrationSection: {
            padding: '5rem 2rem',
            background: 'rgba(10, 15, 26, 0.85)',
        },
        integrationContainer: {
            maxWidth: '1100px',
            margin: '0 auto',
        },
        integrationGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginTop: '3rem',
        },
        integrationCard: {
            background: 'rgba(30, 41, 59, 0.45)',
            borderRadius: '0.85rem',
            border: '1px solid #1f2937',
            padding: '1.75rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            alignItems: 'flex-start',
            boxShadow: '0 15px 35px -18px rgba(0,0,0,0.4)',
        },
        integrationIcon: {
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '0.75rem',
            background: 'rgba(56, 189, 248, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            color: '#38bdf8',
        },
        integrationTitle: {
            fontSize: '1.15rem',
            fontWeight: '600',
            color: '#e2e8f0',
        },
        integrationDescription: {
            color: '#94a3b8',
            lineHeight: '1.6',
            fontSize: '0.95rem',
        },
        useCaseGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '2rem',
        },
        useCaseCard: {
            background: 'rgba(30, 41, 59, 0.5)',
            backdropFilter: 'blur(8px)',
            padding: '2rem',
            borderRadius: '1rem',
            border: '1px solid #334155',
            textAlign: 'center',
            transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
        },
        useCaseCardHover: {
            transform: 'translateY(-6px)',
            boxShadow: '0 30px 50px -25px rgba(14, 165, 233, 0.4)',
            borderColor: 'rgba(56, 189, 248, 0.45)',
        },
        comparisonWrapper: {
            background: 'rgba(15, 23, 42, 0.75)',
            borderRadius: '1.2rem',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            padding: '2.75rem 2.5rem',
            position: 'relative',
            overflow: 'hidden',
        },
        comparisonBackdropOrb: {
            position: 'absolute',
            width: '320px',
            height: '320px',
            top: '-160px',
            left: '-120px',
            background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.2), transparent)',
            filter: 'blur(6px)',
            zIndex: 0,
        },
        comparisonBackdropAura: {
            position: 'absolute',
            width: '260px',
            height: '260px',
            bottom: '-140px',
            right: '-80px',
            background: 'radial-gradient(circle at center, rgba(14, 165, 233, 0.18), transparent)',
            filter: 'blur(8px)',
            zIndex: 0,
        },
        comparisonIntro: {
            textAlign: 'center',
            maxWidth: '640px',
            margin: '0 auto 2.5rem',
            color: '#cbd5f5',
            lineHeight: '1.7',
        },
        comparisonGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '1.75rem',
            position: 'relative',
            zIndex: 1,
        },
        comparisonCard: {
            background: 'linear-gradient(145deg, rgba(56, 189, 248, 0.18), rgba(14, 165, 233, 0.1))',
            borderRadius: '1rem',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            boxShadow: '0 25px 45px -30px rgba(14, 165, 233, 0.65)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        },
        comparisonCardHover: {
            transform: 'translateY(-6px)',
            boxShadow: '0 30px 60px -35px rgba(14, 165, 233, 0.8)',
        },
        comparisonHeader: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
        },
        comparisonIconWrap: {
            width: '2.75rem',
            height: '2.75rem',
            borderRadius: '0.9rem',
            background: 'rgba(15, 23, 42, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            color: '#38bdf8',
        },
        comparisonTitle: {
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#0ea5e9',
        },
        comparisonDescription: {
            color: '#dbeafe',
            lineHeight: '1.6',
            fontSize: '0.98rem',
        },
        comparisonHighlight: {
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#bae6fd',
            fontWeight: 600,
        },
        comparisonFooter: {
            marginTop: '2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'center',
            color: '#94a3b8',
            fontSize: '0.9rem',
        },
        comparisonTag: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '9999px',
            padding: '0.45rem 0.95rem',
            color: '#bae6fd',
            fontWeight: 600,
            fontSize: '0.82rem',
        },
    };

    const roadmapHighlights = [
        {
            phase: 'Q4 · 2025',
            badge: 'Coming soon',
            title: 'FocusFlow mobile beta',
            description:
                'Carry your rituals on the go with native mobile timers, offline streak tracking, and mindful break reminders.',
            owner: 'Mobile guild',
        },
        {
            phase: 'Q1 · 2026',
            badge: 'In research',
            title: 'AI progress coach',
            description:
                'Surface weekly wins, energy dips, and personalized nudges powered by on-device analytics—no data leaves your workspace.',
            owner: 'Intelligence crew',
        },
        {
            phase: 'Q2 · 2026',
            badge: 'Community-led',
            title: 'Shared focus spaces',
            description:
                'Host co-working rooms with ambient sound, shared agendas, and live accountability dashboards for teams and study groups.',
            owner: 'Community studio',
        },
    ];

    const integrationPartners = [
        {
            icon: '🔄',
            name: 'Calendar sync',
            blurb:
                'Auto-block focus sessions on Google or Outlook, and reflect completed timers back to your calendar for time auditing.',
        },
        {
            icon: '💬',
            name: 'Slack & Teams',
            blurb:
                'Signal when you enter focus mode, snooze notifications, and share quick wins without leaving your collaboration apps.',
        },
        {
            icon: '📝',
            name: 'Notion & Docs',
            blurb:
                'Embed live focus timers, log reflections as pages, and push session notes directly into your knowledge base.',
        },
        {
            icon: '⚙️',
            name: 'Automation hooks',
            blurb:
                'Use Zapier and webhooks to trigger rituals—spin up playlists, toggle smart lights, or log tasks in your favorite tool.',
        },
    ];

    const howItWorksSteps = [
        {
            icon: '🧭',
            title: 'Set your intention',
            description:
                'Drop in with a daily intention, pick your priority lane, and let FocusFlow tailor the rhythm of your day.',
            accent: 'Guided planning',
        },
        {
            icon: '⏱️',
            title: 'Launch deep-work loops',
            description:
                'Spin up immersive focus sessions with soundscapes, ritual reminders, and automatic status updates to your crew.',
            accent: 'Adaptive timers',
        },
        {
            icon: '📊',
            title: 'Track momentum in real time',
            description:
                'See streaks, context switches, and energy trends lighting up in a single command centre—no manual logging required.',
            accent: 'Live analytics',
        },
        {
            icon: '🤝',
            title: 'Close the loop with insights',
            description:
                'Share recaps, celebrate wins, and auto-sync learnings into the tools your team already lives in.',
            accent: 'Autonomous follow-ups',
        },
    ];

    return (
        <>
            <style>{`
                @keyframes floatPulse {
                    0%, 100% { transform: translateY(0px) scale(1); opacity: 0.85; }
                    50% { transform: translateY(-10px) scale(1.02); opacity: 1; }
                }

                @keyframes glowDrift {
                    0% { transform: translate(0, 0) scale(1); opacity: 0.6; }
                    50% { transform: translate(12px, -8px) scale(1.08); opacity: 0.9; }
                    100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
                }
            `}</style>
            <div style={styles.landingPage}>
                <LandingNavbar />
            {/* Hero Section */}
            <section style={styles.heroSection}>
                <h1 style={styles.heroTitle}>
                    Unlock Your Productivity with{" "}
                    <span style={{
                        background: 'linear-gradient(to right, #38bdf8, #60a5fa)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        FocusFlow
                    </span>
                </h1>
                <p style={styles.heroSubtitle}>
                    FocusFlow is your all-in-one platform for task management
                    and time tracking. Achieve more, stress less—always free,
                    with no hidden fees.
                </p>
                <div style={styles.heroButtons}>
                    <button
                        style={styles.heroBtnPrimary}
                        onClick={handleRegisterClick}
                        onMouseEnter={(e) => {
                            Object.assign(e.currentTarget.style, styles.heroBtnPrimaryHover);
                        }}
                        onMouseLeave={(e) => {
                            Object.assign(e.currentTarget.style, styles.heroBtnPrimary);
                        }}
                    >
                        Get Started
                    </button>
                </div>
            </section>

            {/* Statistics/Social Proof Section */}
            <section style={{
                padding: '4rem 2rem',
                background: 'rgba(15, 23, 42, 0.5)',
                textAlign: 'center',
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        color: '#ffffff',
                        marginBottom: '3rem',
                    }}>
                        Trusted by Productivity Enthusiasts
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '2rem',
                    }}>
                        {[
                            { number: '10,000+', label: 'Active Users' },
                            { number: '500,000+', label: 'Focus Sessions Completed' },
                            { number: '95%', label: 'User Satisfaction Rate' },
                            { number: '50+', label: 'Countries Worldwide' },
                        ].map((stat, index) => (
                            <div key={index} style={{
                                background: 'rgba(30, 41, 59, 0.5)',
                                backdropFilter: 'blur(8px)',
                                padding: '2rem',
                                borderRadius: '1rem',
                                border: '1px solid #334155',
                            }}>
                                <div style={{
                                    fontSize: '2.5rem',
                                    fontWeight: '800',
                                    color: '#38bdf8',
                                    marginBottom: '0.5rem',
                                }}>
                                    {stat.number}
                                </div>
                                <div style={{
                                    fontSize: '1rem',
                                    color: '#94a3b8',
                                }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section style={styles.featuresSection}>
                <div style={styles.featuresContainer}>
                    <h2 style={styles.featuresTitle}>
                        Why Choose{" "}
                        <span style={{
                            background: 'linear-gradient(to right, #38bdf8, #60a5fa)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            FocusFlow?
                        </span>
                    </h2>
                    <div style={styles.featuresGrid}>
                        {[
                            {
                                title: "Effortless Task Management",
                                description:
                                    "Organize your day with a simple drag-and-drop interface, custom categories, and smart reminders.",
                            },
                            {
                                title: "Built-in Time Tracking",
                                description:
                                    "Monitor your focus and track time spent on tasks and projects. Get detailed insights to help you work smarter, not harder.",
                            },
                            {
                                title: "Collaborate with Anyone",
                                description:
                                    "Share workspaces, assign tasks, and stay in sync with friends, family, or teammates.",
                            },
                        ].map((feature, index) => (
                            <div 
                                key={index} 
                                style={styles.featureCard}
                                onMouseEnter={(e) => {
                                    Object.assign(e.currentTarget.style, {...styles.featureCard, ...styles.featureCardHover});
                                }}
                                onMouseLeave={(e) => {
                                    Object.assign(e.currentTarget.style, styles.featureCard);
                                }}
                            >
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
            </section>

            {/* Use Cases Section */}
            <section style={{
                padding: '5rem 2rem',
                background: 'rgba(15, 23, 42, 0.8)',
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        color: '#ffffff',
                        textAlign: 'center',
                        marginBottom: '3rem',
                    }}>
                        Perfect For Everyone
                    </h2>
                    <div style={styles.useCaseGrid}>
                        {[
                            {
                                icon: '🎓',
                                title: 'Students',
                                description: 'Ace your exams with focused study sessions and track your learning progress.',
                                highlight: 'Study timers · Revision tags',
                            },
                            {
                                icon: '💼',
                                title: 'Freelancers',
                                description: 'Track billable hours accurately and stay productive across multiple projects.',
                                highlight: 'Client workspaces · Invoicing exports',
                            },
                            {
                                icon: '🏠',
                                title: 'Remote Workers',
                                description: 'Maintain work-life balance at home with structured focus sessions.',
                                highlight: 'Routine rituals · Work/life analytics',
                            },
                            {
                                icon: '👥',
                                title: 'Teams',
                                description: 'Collaborate and stay aligned on projects with shared workspaces.',
                                highlight: 'Shared dashboards · Accountability metrics',
                            },
                        ].map((useCase, index) => (
                            <div
                                key={index}
                                style={styles.useCaseCard}
                                onMouseEnter={(e) => {
                                    Object.assign(e.currentTarget.style, {
                                        ...styles.useCaseCard,
                                        ...styles.useCaseCardHover,
                                    });
                                }}
                                onMouseLeave={(e) => {
                                    Object.assign(e.currentTarget.style, styles.useCaseCard);
                                }}
                            >
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                                    {useCase.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '600',
                                    color: '#38bdf8',
                                    marginBottom: '0.75rem',
                                }}>
                                    {useCase.title}
                                </h3>
                                <p style={{
                                    color: '#94a3b8',
                                    lineHeight: '1.6',
                                }}>
                                    {useCase.description}
                                </p>
                                <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    marginTop: '1.25rem',
                                    padding: '0.45rem 0.85rem',
                                    borderRadius: '9999px',
                                    background: 'rgba(56, 189, 248, 0.18)',
                                    color: '#38bdf8',
                                    fontSize: '0.82rem',
                                    fontWeight: 600,
                                }}>
                                    <span role="img" aria-label="spark">✨</span>
                                    {useCase.highlight}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section style={{
                padding: '5rem 2rem',
                background: 'rgba(15, 23, 42, 0.55)',
            }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        color: '#ffffff',
                        textAlign: 'center',
                        marginBottom: '1rem',
                    }}>
                        Why Choose{' '}
                        <span style={{
                            background: 'linear-gradient(to right, #38bdf8, #60a5fa)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            FocusFlow?
                        </span>
                    </h2>
                    <p style={styles.comparisonIntro}>
                        FocusFlow gives you enterprise-grade focus rituals without the enterprise price tag. We obsess over clarity, privacy, and velocity so you can stay in flow.
                    </p>
                    <div style={styles.comparisonWrapper}>
                        <div style={styles.comparisonBackdropOrb} />
                        <div style={styles.comparisonBackdropAura} />
                        <div style={styles.comparisonGrid}>
                            {[
                                {
                                    icon: '💸',
                                    title: 'Free forever',
                                    description: 'No paywalls, trials, or credit card. Every productivity primitive unlocked from day one.',
                                    highlight: 'No hidden fees',
                                },
                                {
                                    icon: '🛡️',
                                    title: 'Privacy-first',
                                    description: 'Local-first architecture keeps your data on your device. Export anytime—your data, your rules.',
                                    highlight: 'Own your focus data',
                                },
                                {
                                    icon: '🧠',
                                    title: 'Designed with you',
                                    description: 'Our roadmap is community-led. Join weekly office hours, ship features, and steer the product.',
                                    highlight: 'Community roadmap',
                                },
                                {
                                    icon: '⚡',
                                    title: 'Effortless rituals',
                                    description: 'From streaks to deep-work presets, FocusFlow removes friction so your routines stick for good.',
                                    highlight: 'Habit automation',
                                },
                            ].map((card, index) => (
                                <div
                                    key={index}
                                    style={styles.comparisonCard}
                                    onMouseEnter={(e) => {
                                        Object.assign(e.currentTarget.style, {
                                            ...styles.comparisonCard,
                                            ...styles.comparisonCardHover,
                                        });
                                    }}
                                    onMouseLeave={(e) => {
                                        Object.assign(e.currentTarget.style, styles.comparisonCard);
                                    }}
                                >
                                    <div style={styles.comparisonHeader}>
                                        <div style={styles.comparisonIconWrap}>{card.icon}</div>
                                        <div>
                                            <span style={styles.comparisonHighlight}>{card.highlight}</span>
                                            <h3 style={styles.comparisonTitle}>{card.title}</h3>
                                        </div>
                                    </div>
                                    <p style={styles.comparisonDescription}>{card.description}</p>
                                </div>
                            ))}
                        </div>
                        <div style={styles.comparisonFooter}>
                            <span style={styles.comparisonTag}>
                                <span role="img" aria-label="folder">📁</span>
                                Open-source stack
                            </span>
                            <span style={styles.comparisonTag}>
                                <span role="img" aria-label="spark">✨</span>
                                Weekly product drops
                            </span>
                            <span style={styles.comparisonTag}>
                                <span role="img" aria-label="shield">🛡️</span>
                                Security-first foundation
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Start Guide */}
            <section style={{
                padding: '5rem 2rem',
                background: 'rgba(15, 23, 42, 0.8)',
                textAlign: 'center',
            }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        color: '#ffffff',
                        marginBottom: '1rem',
                    }}>
                        Get Started in 3 Simple Steps
                    </h2>
                    <p style={{
                        fontSize: '1.2rem',
                        color: '#94a3b8',
                        marginBottom: '3rem',
                    }}>
                        Start boosting your productivity in less than a minute
                    </p>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2rem',
                    }}>
                        {[
                            {
                                step: '1',
                                title: 'Sign Up',
                                description: 'Create your free account in 30 seconds. No credit card required.',
                            },
                            {
                                step: '2',
                                title: 'Set Your First Session',
                                description: 'Choose your focus duration and start your first productive session.',
                            },
                            {
                                step: '3',
                                title: 'Track Your Progress',
                                description: 'Watch your productivity grow with detailed analytics and insights.',
                            },
                        ].map((step, index) => (
                            <div key={index} style={{
                                background: 'rgba(30, 41, 59, 0.5)',
                                backdropFilter: 'blur(8px)',
                                padding: '2.5rem 2rem',
                                borderRadius: '1rem',
                                border: '1px solid #334155',
                                position: 'relative',
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '-1.5rem',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '3rem',
                                    height: '3rem',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(to right, #0ea5e9, #0ea5e9)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.5rem',
                                    fontWeight: '800',
                                    color: '#ffffff',
                                }}>
                                    {step.step}
                                </div>
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '600',
                                    color: '#38bdf8',
                                    marginTop: '1rem',
                                    marginBottom: '1rem',
                                }}>
                                    {step.title}
                                </h3>
                                <p style={{
                                    color: '#94a3b8',
                                    lineHeight: '1.6',
                                }}>
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section style={styles.testimonialsSection}>
                <div style={styles.testimonialsContainer}>
                    <h2 style={styles.testimonialsTitle}>
                        Loved by Our{" "}
                        <span style={{
                            background: 'linear-gradient(to right, #38bdf8, #60a5fa)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Community
                        </span>
                    </h2>
                    <div style={styles.testimonialsGrid}>
                        {[
                            {
                                quote: "FocusFlow is the best productivity tool I've ever used. No paywalls, just pure value!",
                                author: "Sarah Johnson",
                                role: "Project Manager",
                            },
                            {
                                quote: "Finally, a platform that gives me everything I need to stay organized—without asking for my credit card.",
                                author: "Michael Chen",
                                role: "Software Developer",
                            },
                            {
                                quote: "As a freelancer, FocusFlow helps me stay on top of my work and deadlines.",
                                author: "Emily Rodriguez",
                                role: "Freelance Designer",
                            },
                        ].map((testimonial, index) => (
                            <div 
                                key={index} 
                                style={styles.testimonialCard}
                                onMouseEnter={(e) => {
                                    Object.assign(e.currentTarget.style, {...styles.testimonialCard, ...styles.testimonialCardHover});
                                }}
                                onMouseLeave={(e) => {
                                    Object.assign(e.currentTarget.style, styles.testimonialCard);
                                }}
                            >
                                <blockquote style={styles.testimonialQuote}>
                                    "{testimonial.quote}"
                                </blockquote>
                                <div style={styles.testimonialAuthor}>
                                    {testimonial.author}
                                </div>
                                <div style={styles.testimonialRole}>
                                    {testimonial.role}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={styles.ctaSection}>
                <div style={styles.ctaContainer}>
                    <h2 style={styles.ctaTitle}>
                        Experience{" "}
                        <span style={{
                            background: 'linear-gradient(to right, #ffffff, #e0e7ff)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            FocusFlow
                        </span>{" "}
                        Today
                    </h2>
                    <p style={styles.ctaSubtitle}>
                        Join thousands of happy users who organize, track, and
                        achieve more every day.
                    </p>
                    <button 
                        style={styles.ctaBtn} 
                        onClick={handleRegisterClick}
                        onMouseEnter={(e) => {
                            Object.assign(e.currentTarget.style, {...styles.ctaBtn, ...styles.ctaBtnHover});
                        }}
                        onMouseLeave={(e) => {
                            Object.assign(e.currentTarget.style, styles.ctaBtn);
                        }}
                    >
                        Get Started
                    </button>
                </div>
            </section>

            {/* How It Works Section */}
            <section style={styles.howItWorksSection}>
                <div style={styles.howItWorksContainer}>
                    <div style={styles.howBackdropOrb} />
                    <div style={styles.howBackdropGlow} />
                    <h2 style={styles.howItWorksTitle}>
                        How{" "}
                        <span style={{
                            background: 'linear-gradient(to right, #38bdf8, #60a5fa)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            FocusFlow
                        </span>{" "}
                        Works
                    </h2>
                    <p style={styles.howItWorksDescription}>
                        Every flow state follows a rhythm. FocusFlow wraps every stage—from intent-setting to celebration—in delightful, automated loops.
                    </p>
                    <div style={styles.howItWorksGrid}>
                        {howItWorksSteps.map((step, index) => (
                            <div
                                key={step.title}
                                style={{
                                    ...styles.howStepCard,
                                    animationDelay: `${index * 0.6}s`,
                                }}
                                onMouseEnter={(e) => {
                                    Object.assign(e.currentTarget.style, {
                                        ...styles.howStepCard,
                                        ...styles.howStepCardHover,
                                        animationDelay: `${index * 0.6}s`,
                                    });
                                }}
                                onMouseLeave={(e) => {
                                    Object.assign(e.currentTarget.style, {
                                        ...styles.howStepCard,
                                        animationDelay: `${index * 0.6}s`,
                                    });
                                }}
                            >
                                <div style={styles.howStepTop}>
                                    <div style={styles.howStepIcon}>{step.icon}</div>
                                    <div>
                                        <span style={styles.howStepAccent}>{step.accent}</span>
                                        <h3 style={styles.howStepTitle}>{step.title}</h3>
                                    </div>
                                </div>
                                <p style={styles.howStepDescription}>{step.description}</p>
                            </div>
                        ))}
                    </div>
                    <div style={styles.howItWorksFooter}>
                        <p style={styles.howItWorksFooterText}>
                            FocusFlow choreographs the rituals that keep teams aligned and humans energized—so every session ends with momentum.
                        </p>
                        <span style={styles.howItWorksBadge}>
                            <span role="img" aria-label="clock">⏳</span>
                            Ritual builder beta is open
                        </span>
                        <span style={styles.howItWorksFooterCta}>
                            <span role="img" aria-label="rocket">🚀</span>
                            Join the pilot waitlist
                        </span>
                    </div>
                </div>
            </section>

            {/* Integrations Section */}
            <section style={styles.integrationSection}>
                <div style={styles.integrationContainer}>
                    <h2 style={styles.sectionHeader}>Connect FocusFlow to your workflow</h2>
                    <p style={styles.sectionLead}>
                        Pair timers, rituals, and analytics with the tools you already love. These integrations are
                        live or in beta—join the waitlist to test-drive the next wave.
                    </p>
                    <div style={styles.integrationGrid}>
                        {integrationPartners.map((partner, idx) => (
                            <div key={idx} style={styles.integrationCard}>
                                <div style={styles.integrationIcon}>{partner.icon}</div>
                                <div style={styles.integrationTitle}>{partner.name}</div>
                                <p style={styles.integrationDescription}>{partner.blurb}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Product Roadmap Section */}
            <section style={styles.roadmapSection}>
                <div style={styles.roadmapContainer}>
                    <h2 style={styles.sectionHeader}>What’s next for FocusFlow</h2>
                    <p style={styles.sectionLead}>
                        We build FocusFlow hand-in-hand with the community. Peek at the initiatives we’re
                        prototyping and the experiments you can co-create with us.
                    </p>
                    <div style={styles.roadmapGrid}>
                        {roadmapHighlights.map((item, idx) => (
                            <div key={idx} style={styles.roadmapCard}>
                                <span style={styles.roadmapBadge}>
                                    <span role="img" aria-label="calendar">📅</span>
                                    {item.phase}
                                </span>
                                <h3 style={styles.roadmapTitle}>{item.title}</h3>
                                <p style={styles.roadmapDescription}>{item.description}</p>
                                <div style={styles.roadmapFooter}>
                                    <span>{item.badge}</span>
                                    <span>{item.owner}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <LandingFooter />
            <AuthModals
                isLoginOpen={isLoginOpen}
                isRegisterOpen={isRegisterOpen}
                onClose={handleCloseModal}
            />
        </div>
        </>
    );
};

export default LandingPage;
