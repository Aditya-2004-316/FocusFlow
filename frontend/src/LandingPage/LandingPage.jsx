import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingNavbar from "./LandingNavbar";
import LandingFooter from "./LandingFooter";
import useResponsive from "../hooks/useResponsive";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const FeatureCard = ({ feature, index, width, styles }) => {
    const [isHovered, setIsHovered] = useState(false);
    const conditionalStyle = width >= 696 && width < 1028 && index === 2 ? {
        gridColumn: '1 / -1',
        maxWidth: '500px',
        margin: '0 auto',
        width: '100%',
    } : {};

    return (
        <div
            style={{
                ...styles.featureCard,
                ...(isHovered ? styles.featureCardHover : {}),
                ...conditionalStyle
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h3 style={styles.featureTitle}>
                {feature.title}
            </h3>
            <p style={styles.featureDescription}>
                {feature.description}
            </p>
        </div>
    );
};

const LandingPage = () => {
    const navigate = useNavigate();
    const { isMobile, isTablet, width } = useResponsive();
    const isCompact = width < 600;
    const isButtonsOutside = width < 700;
    const [stats, setStats] = React.useState({
        totalUsers: 0,
        totalSessions: 0,
        satisfactionScore: "95%"
    });

    React.useEffect(() => {
        const fetchLandingStats = async () => {
            try {
                const res = await fetch(`${API_BASE}/stats/global-landing`);
                const json = await res.json();
                if (json.success) {
                    setStats(json.data);
                }
            } catch (err) {
                console.error("Failed to fetch landing stats:", err);
            }
        };
        fetchLandingStats();
    }, []);

    const formatValue = (val) => {
        if (typeof val !== 'number') return val;
        if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M+';
        if (val >= 1000) return (val / 1000).toFixed(1) + 'K+';
        return val;
    };

    const handleRegisterClick = () => {
        navigate("/signup");
    };

    const handleLoginClick = () => {
        navigate("/login");
    };

    // Define all styles inline with dark theme from LandingPageOption1
    const styles = {
        landingPage: {
            minHeight: "100vh",
            background: "linear-gradient(180deg, #060b18 0%, #101b33 55%, #060b18 100%)",
            color: "#ffffff",
            overflowX: "hidden",
        },
        heroSection: {
            position: "relative",
            padding: isMobile ? "4rem 1rem 3rem" : "6rem 2rem 4.5rem",
            textAlign: "center",
            overflow: "hidden",
        },
        heroGlow: {
            position: "absolute",
            inset: "-220px auto auto 50%",
            transform: "translateX(-50%)",
            width: isMobile ? "300px" : "660px",
            height: isMobile ? "300px" : "660px",
            background: "radial-gradient(circle at center, rgba(56, 189, 248, 0.25), transparent 65%)",
            filter: "blur(12px)",
        },
        heroInner: {
            maxWidth: "880px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "1.2rem" : "1.7rem",
            alignItems: "center",
        },
        heroBadge: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1.1rem",
            borderRadius: "9999px",
            border: "1px solid rgba(56, 189, 248, 0.35)",
            background: "rgba(15, 23, 42, 0.65)",
            color: "#38bdf8",
            fontSize: "0.82rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 600,
        },
        heroTitle: {
            fontSize: isMobile ? "2.2rem" : isTablet ? "3rem" : "3.5rem",
            lineHeight: 1.1,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            margin: 0,
            color: "#ffffff",
        },
        heroTitleHighlight: {
            background: "linear-gradient(120deg, #38bdf8, #60a5fa, #94a3ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
        },
        heroSubtitle: {
            margin: "0 auto",
            maxWidth: "46rem",
            color: "#cbd5f5",
            fontSize: isMobile ? "1rem" : "1.18rem",
            lineHeight: 1.78,
            padding: isMobile ? "0 1rem" : "0",
        },
        heroButtons: {
            display: "flex",
            flexDirection: isCompact ? "column" : "row",
            gap: "0.95rem",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: "0.5rem",
            width: isMobile ? "100%" : "auto",
        },
        heroBtnPrimary: {
            background: "linear-gradient(110deg, #38bdf8, #818cf8)",
            color: "#0f172a",
            padding: isMobile ? "0.8rem 1.8rem" : "0.95rem 2.5rem",
            borderRadius: "9999px",
            fontWeight: 700,
            fontSize: isMobile ? "0.95rem" : "1.05rem",
            border: "none",
            cursor: "pointer",
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            boxShadow: "0 28px 60px -34px rgba(56, 189, 248, 0.75)",
            width: "fit-content",
            minWidth: isMobile ? "0" : "200px",
            justifyContent: "center",
        },
        heroBtnPrimaryHover: {
            transform: "translateY(-3px)",
            boxShadow: "0 36px 70px -36px rgba(56, 189, 248, 0.82)",
        },
        heroBtnSecondary: {
            background: "rgba(15, 23, 42, 0.82)",
            color: "#38bdf8",
            border: "1px solid rgba(56, 189, 248, 0.35)",
            padding: isMobile ? "0.8rem 1.8rem" : "0.95rem 2.3rem",
            borderRadius: "9999px",
            fontWeight: 600,
            fontSize: isMobile ? "0.95rem" : "1.02rem",
            cursor: "pointer",
            transition: "transform 0.25s ease, border-color 0.25s ease",
            width: "fit-content",
            minWidth: isMobile ? "0" : "200px",
            justifyContent: "center",
            display: "inline-flex",
            alignItems: "center",
        },
        heroBtnSecondaryHover: {
            transform: "translateY(-3px)",
            borderColor: "rgba(56, 189, 248, 0.55)",
        },
        heroMetrics: {
            display: "grid",
            gridTemplateColumns: width >= 656 ? "repeat(3, 1fr)" : width >= 480 ? "repeat(2, 1fr)" : "1fr",
            gap: isMobile ? "0.85rem" : "1.25rem",
            width: "100%",
            maxWidth: width >= 656 ? "900px" : width >= 480 ? "600px" : "400px",
            margin: "0 auto",
            padding: isMobile ? "0 1rem" : "0",
            justifyItems: "center",
        },
        heroMetric: {
            width: "100%",
            maxWidth: "320px",
            padding: isMobile ? "0.85rem 1rem" : "1.2rem 1.4rem",
            borderRadius: "1.1rem",
            background: "rgba(24, 36, 58, 0.65)",
            border: "1px solid rgba(148, 163, 184, 0.22)",
            boxShadow: "0 22px 50px -32px rgba(56, 189, 248, 0.6)",
            textAlign: "center",
        },
        heroMetricValue: {
            fontSize: isMobile ? "1.5rem" : "1.8rem",
            fontWeight: 700,
            color: "#38bdf8",
            marginBottom: "0.2rem",
        },
        heroMetricLabel: {
            color: "#8ea0c2",
            fontSize: isMobile ? "0.85rem" : "0.95rem",
        },
        section: {
            padding: isMobile ? "3rem 1rem" : "5rem 2rem",
        },
        container: {
            maxWidth: "1180px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
        },
        sectionHeading: {
            display: "flex",
            flexDirection: "column",
            gap: "0.85rem",
            alignItems: "center",
            marginBottom: isMobile ? "2rem" : "3rem",
            textAlign: "center",
        },
        sectionEyebrow: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.35rem 0.95rem",
            borderRadius: "999px",
            border: "1px solid rgba(56, 189, 248, 0.3)",
            background: "rgba(15, 23, 42, 0.65)",
            color: "#38bdf8",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
        },
        sectionTitle: {
            fontSize: isMobile ? "1.8rem" : "2.45rem",
            fontWeight: 700,
            color: "#f8fafc",
        },
        sectionDivider: {
            width: "64px",
            height: "2px",
            borderRadius: "999px",
            background: "linear-gradient(90deg, rgba(56, 189, 248, 0.8), rgba(129, 140, 248, 0.8))",
        },
        sectionLead: {
            maxWidth: "40rem",
            color: "#94a3b8",
            fontSize: isMobile ? "0.95rem" : "1.08rem",
            lineHeight: 1.7,
            textAlign: "center",
            margin: isMobile ? "0 auto 2rem" : "0 auto 3rem",
        },
        sectionLeadWide: {
            textAlign: 'center',
            maxWidth: '40rem',
            margin: '0 auto 3rem',
            color: '#94a3b8',
            fontSize: '1.1rem',
            lineHeight: '1.7',
        },
        featuresSection: {
            padding: "5rem 2rem",
            background: "rgba(15, 23, 42, 0.5)",
        },
        featuresContainer: {
            maxWidth: "1180px",
            margin: "0 auto",
        },
        featuresGrid: {
            display: 'grid',
            gridTemplateColumns: width >= 1028 ? 'repeat(3, 1fr)' : width >= 696 ? 'repeat(2, 1fr)' : '1fr',
            gap: '2rem',
            marginTop: '3rem',
        },
        featureCard: {
            background: 'rgba(30, 41, 59, 0.45)', // slightly more transparent for better contrast
            backdropFilter: 'blur(10px)',
            padding: '2rem',
            borderRadius: '1rem',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            border: '1px solid rgba(51, 65, 85, 0.5)',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            isolation: 'isolate',
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
            background: 'linear-gradient(130deg, #12335a 0%, #0f2743 55%, #0a1c32 100%)',
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
            gridTemplateColumns: width >= 1033 ? 'repeat(2, minmax(0, 1fr))' : '1fr',
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
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
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
            position: 'relative',
            padding: '5.2rem 2rem 5.6rem',
            background: 'linear-gradient(180deg, rgba(5, 11, 23, 0.94) 0%, rgba(9, 20, 36, 0.9) 100%)',
            overflow: 'hidden',
        },
        integrationContainer: {
            maxWidth: '1180px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
        },
        integrationBackdropLeft: {
            position: 'absolute',
            top: '-180px',
            left: '-160px',
            width: '440px',
            height: '440px',
            background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.26), transparent 68%)',
            filter: 'blur(20px)',
            opacity: 0.8,
            pointerEvents: 'none',
        },
        integrationBackdropRight: {
            position: 'absolute',
            bottom: '-220px',
            right: '-140px',
            width: '420px',
            height: '420px',
            background: 'radial-gradient(circle at center, rgba(129, 140, 248, 0.24), transparent 70%)',
            filter: 'blur(24px)',
            opacity: 0.75,
            pointerEvents: 'none',
        },
        integrationGrid: {
            display: 'grid',
            gridTemplateColumns: width >= 1181 ? 'repeat(4, 1fr)' : width >= 573 ? 'repeat(2, 1fr)' : '1fr',
            gap: '1.8rem',
            marginTop: '3.2rem',
            justifyContent: 'center',
            maxWidth: width >= 573 && width < 1181 ? '800px' : '100%',
            margin: width >= 573 && width < 1181 ? '3.2rem auto 0' : '3.2rem 0 0',
        },
        integrationCard: {
            position: 'relative',
            padding: '2.2rem 2rem',
            borderRadius: '1.2rem',
            background: 'rgba(15, 23, 42, 0.82)',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.05rem',
            boxShadow: '0 34px 85px -46px rgba(14, 165, 233, 0.58)',
            overflow: 'hidden',
            transition: 'transform 0.32s ease, box-shadow 0.32s ease, border-color 0.32s ease',
            transform: 'translateY(0)',
            borderColor: 'rgba(56, 189, 248, 0.2)',
        },
        integrationCardGlow: {
            position: 'absolute',
            inset: '-35% 15% auto -30%',
            width: '260px',
            height: '260px',
            background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.28), transparent 70%)',
            filter: 'blur(18px)',
            opacity: 0.75,
            pointerEvents: 'none',
        },
        integrationCardHover: {
            transform: 'translateY(-9px)',
            boxShadow: '0 52px 120px -52px rgba(56, 189, 248, 0.72)',
            borderColor: 'rgba(56, 189, 248, 0.36)',
        },
        integrationCardTop: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
        },
        integrationIcon: {
            width: '3rem',
            height: '3rem',
            borderRadius: '1rem',
            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.32), rgba(129, 140, 248, 0.3))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.7rem',
            color: '#0ea5e9',
        },
        integrationStatus: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.35rem 0.85rem',
            borderRadius: '9999px',
            background: 'rgba(56, 189, 248, 0.16)',
            color: '#bae6fd',
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
        },
        integrationTitle: {
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#f8fafc',
        },
        integrationDescription: {
            color: '#9fb2d6',
            lineHeight: '1.65',
            fontSize: '0.97rem',
        },
        statsGrid: {
            display: "grid",
            gridTemplateColumns: width >= 1016 ? "repeat(4, 1fr)" : width >= 772 ? "repeat(2, 1fr)" : "1fr",
            gap: "1.5rem",
            justifyContent: "center",
            maxWidth: width >= 772 && width < 1016 ? "800px" : "100%",
            margin: width >= 772 && width < 1016 ? "0 auto" : "0",
        },
        statCard: {
            background: "rgba(30, 41, 59, 0.55)",
            border: "1px solid rgba(148, 163, 184, 0.22)",
            borderRadius: "1.1rem",
            padding: "1.8rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.45rem",
            boxShadow: "0 24px 55px -32px rgba(14, 165, 233, 0.45)",
        },
        statValue: {
            fontSize: "2.4rem",
            fontWeight: 700,
            color: "#38bdf8",
        },
        statLabel: {
            color: "#94a3b8",
            fontSize: "0.98rem",
        },
        useCaseSection: {
            position: 'relative',
            padding: '5rem 2rem',
            background: 'rgba(6, 12, 24, 0.9)',
            overflow: 'hidden',
        },
        useCaseContainer: {
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
        },
        useCaseBackdropAura: {
            position: 'absolute',
            inset: '-220px auto auto -160px',
            width: '480px',
            height: '480px',
            background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.22), transparent 70%)',
            filter: 'blur(16px)',
            opacity: 0.85,
            pointerEvents: 'none',
        },
        useCaseBackdropHalo: {
            position: 'absolute',
            inset: 'auto -220px -260px auto',
            width: '420px',
            height: '420px',
            background: 'radial-gradient(circle at center, rgba(129, 140, 248, 0.2), transparent 72%)',
            filter: 'blur(22px)',
            opacity: 0.75,
            pointerEvents: 'none',
        },
        useCaseGrid: {
            display: 'grid',
            gridTemplateColumns: width >= 1195 ? 'repeat(4, 1fr)' : width >= 614 ? 'repeat(2, 1fr)' : '1fr',
            gap: '1.9rem',
            justifyContent: 'center',
            maxWidth: width >= 614 && width < 1195 ? '800px' : '100%',
            margin: width >= 614 && width < 1195 ? '0 auto' : '0',
        },
        useCaseCard: {
            position: 'relative',
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(12px)',
            padding: '2.4rem 2.1rem',
            borderRadius: '1.35rem',
            border: '1px solid rgba(56, 189, 248, 0.22)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.1rem',
            boxShadow: '0 40px 90px -42px rgba(14, 165, 233, 0.65)',
            overflow: 'hidden',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease, border-color 0.4s ease',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            isolation: 'isolate',
            borderColor: 'rgba(56, 189, 248, 0.22)',
        },
        useCaseCardGlow: {
            position: 'absolute',
            inset: '-40% 10% auto -30%',
            width: '320px',
            height: '320px',
            background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.25), transparent 70%)',
            filter: 'blur(18px)',
            opacity: 0.75,
            pointerEvents: 'none',
        },
        useCaseCardHover: {
            transform: 'translateY(-10px)',
            boxShadow: '0 55px 120px -48px rgba(56, 189, 248, 0.7)',
            borderColor: 'rgba(56, 189, 248, 0.38)',
        },
        useCaseHeader: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
        },
        useCaseIconWrap: {
            width: '3.25rem',
            height: '3.25rem',
            borderRadius: '1rem',
            background: 'linear-gradient(140deg, rgba(56, 189, 248, 0.32), rgba(129, 140, 248, 0.28))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.9rem',
            color: '#38bdf8',
        },
        useCaseTitle: {
            fontSize: '1.45rem',
            fontWeight: 600,
            color: '#f1f5f9',
        },
        useCaseDescription: {
            color: '#9fb2d6',
            lineHeight: 1.75,
            fontSize: '0.98rem',
        },
        useCaseTagRow: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.45rem',
        },
        useCaseTag: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.45rem 0.9rem',
            borderRadius: '9999px',
            background: 'rgba(56, 189, 248, 0.18)',
            color: '#38bdf8',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
        },
        useCaseSpark: {
            fontSize: '0.85rem',
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
            gridTemplateColumns: width >= 1033 ? 'repeat(2, minmax(0, 1fr))' : '1fr',
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

    const heroMetrics = [
        { value: formatValue(stats.totalUsers), label: "Creators in focus" },
        { value: formatValue(stats.totalSessions), label: "Ritual sessions logged" },
        { value: stats.satisfactionScore, label: "Satisfaction score" },
    ];

    const socialProofStats = [
        { value: formatValue(stats.totalUsers), label: "Active users" },
        { value: formatValue(stats.totalSessions), label: "Focus sessions completed" },
        { value: stats.satisfactionScore, label: "User satisfaction rate" },
        { value: "50+", label: "Countries worldwide" },
    ];

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
            status: 'Live now',
            highlights: 'Google & Outlook · Time audits',
            blurb:
                'Auto-block focus sessions on Google or Outlook, and reflect completed timers back to your calendar for time auditing.',
        },
        {
            icon: '💬',
            name: 'Slack & Teams',
            status: 'Live now',
            highlights: 'Focus mode pings · Notification snooze',
            blurb:
                'Signal when you enter focus mode, snooze notifications, and share quick wins without leaving your collaboration apps.',
        },
        {
            icon: '📝',
            name: 'Notion & Docs',
            status: 'In beta',
            highlights: 'Embed timers · Log reflections',
            blurb:
                'Embed live focus timers, log reflections as pages, and push session notes directly into your knowledge base and access them later.',
        },
        {
            icon: '⚙️',
            name: 'Automation hooks',
            status: 'Coming soon',
            highlights: 'Zapier recipes · Webhook triggers',
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
                    <div style={styles.heroGlow} />
                    <div style={styles.heroInner}>
                        <span style={styles.heroBadge}>Focus rituals reimagined</span>
                        <h1 style={styles.heroTitle}>
                            Unlock your productivity with <span style={styles.heroTitleHighlight}>FocusFlow</span>
                        </h1>
                        <p style={styles.heroSubtitle}>
                            Run distraction-proof sessions, sync rituals with your crew, and ship momentum without a single paywall. FocusFlow keeps your rhythm steady.
                        </p>
                        <div style={styles.heroButtons}>
                            <button
                                style={styles.heroBtnPrimary}
                                onClick={handleRegisterClick}
                                onMouseEnter={(e) => {
                                    Object.assign(e.currentTarget.style, { ...styles.heroBtnPrimary, ...styles.heroBtnPrimaryHover });
                                }}
                                onMouseLeave={(e) => {
                                    Object.assign(e.currentTarget.style, styles.heroBtnPrimary);
                                }}
                            >
                                Launch free workspace
                            </button>
                            <button
                                style={styles.heroBtnSecondary}
                                onClick={handleLoginClick}
                                onMouseEnter={(e) => {
                                    Object.assign(e.currentTarget.style, { ...styles.heroBtnSecondary, ...styles.heroBtnSecondaryHover });
                                }}
                                onMouseLeave={(e) => {
                                    Object.assign(e.currentTarget.style, styles.heroBtnSecondary);
                                }}
                            >
                                Preview guided demo
                            </button>
                        </div>
                        <div style={styles.heroMetrics}>
                            {heroMetrics.map((metric, index) => (
                                <div
                                    key={metric.label}
                                    style={{
                                        ...styles.heroMetric,
                                        ...(width >= 480 && width < 656 && index === 2 ? {
                                            gridColumn: '1 / -1',
                                            maxWidth: '320px',
                                        } : {})
                                    }}
                                >
                                    <div style={styles.heroMetricValue}>{metric.value}</div>
                                    <div style={styles.heroMetricLabel}>{metric.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Statistics/Social Proof Section */}
                <section style={{
                    padding: "4.5rem 2rem",
                    background: "rgba(15, 23, 42, 0.58)",
                    textAlign: "center",
                }}>
                    <div style={styles.container}>
                        <div style={styles.sectionHeading}>
                            <span style={styles.sectionEyebrow}>Momentum snapshot</span>
                            <h2 style={styles.sectionTitle}>Teams already protecting their focus</h2>
                            <span style={styles.sectionDivider} aria-hidden="true" />
                            <p style={styles.sectionLead}>
                                Join a community that logs every ritual with clarity—no hidden fees, no limits, just steady progress.
                            </p>
                        </div>
                        <div style={styles.statsGrid}>
                            {socialProofStats.map((stat) => (
                                <div key={stat.label} style={styles.statCard}>
                                    <span style={styles.statValue}>{stat.value}</span>
                                    <span style={styles.statLabel}>{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section style={styles.featuresSection}>
                    <div style={styles.featuresContainer}>
                        <div style={styles.sectionHeading}>
                            <span style={styles.sectionEyebrow}>Why FocusFlow</span>
                            <h2 style={styles.sectionTitle}>Choose rituals that respect your attention</h2>
                            <span style={styles.sectionDivider} aria-hidden="true" />
                            <p style={styles.sectionLead}>
                                Automate deep work loops, surface insights instantly, and keep every collaborator aligned without the busywork.
                            </p>
                        </div>
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
                            ].map((feature, index) => {
                                const conditionalStyle = width >= 696 && width < 1028 && index === 2 ? {
                                    gridColumn: '1 / -1',
                                    maxWidth: '500px',
                                    margin: '0 auto',
                                    width: '100%',
                                } : {};

                                return <FeatureCard key={index} feature={feature} index={index} width={width} styles={styles} />;
                            })}
                        </div>
                    </div>
                </section>

                {/* Use Cases Section */}
                <section style={styles.useCaseSection}>
                    <div style={styles.useCaseBackdropAura} />
                    <div style={styles.useCaseBackdropHalo} />
                    <div style={styles.useCaseContainer}>
                        <div style={styles.sectionHeading}>
                            <span style={styles.sectionEyebrow}>Perfect for everyone</span>
                            <h2 style={styles.sectionTitle}>Pick the lane that matches your focus ritual</h2>
                            <span style={styles.sectionDivider} aria-hidden="true" />
                            <p style={styles.sectionLead}>
                                Whether you’re studying for finals or steering a global team, FocusFlow flexes to your cadence.
                            </p>
                        </div>
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
                                    <span style={styles.useCaseCardGlow} aria-hidden="true" />
                                    <div style={styles.useCaseHeader}>
                                        <span style={styles.useCaseIconWrap}>{useCase.icon}</span>
                                        <h3 style={styles.useCaseTitle}>{useCase.title}</h3>
                                    </div>
                                    <p style={styles.useCaseDescription}>{useCase.description}</p>
                                    <div style={styles.useCaseTagRow}>
                                        {useCase.highlight.split('·').map((tag, idx) => (
                                            <span key={idx} style={styles.useCaseTag}>
                                                <span style={styles.useCaseSpark} role="img" aria-label="spark">✨</span>
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
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
                            Why teams switch to{' '}
                            <span style={{
                                background: 'linear-gradient(to right, #38bdf8, #60a5fa)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                FocusFlow
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
                            gridTemplateColumns: width >= 1056 ? 'repeat(3, 1fr)' : width >= 656 ? 'repeat(2, 1fr)' : '1fr',
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
                                    ...(width >= 656 && width < 1056 && index === 2 ? {
                                        gridColumn: '1 / -1',
                                        maxWidth: '500px',
                                        margin: '0 auto',
                                        width: '100%',
                                    } : {})
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
                                Object.assign(e.currentTarget.style, { ...styles.ctaBtn, ...styles.ctaBtnHover });
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
                    <div style={styles.integrationBackdropLeft} />
                    <div style={styles.integrationBackdropRight} />
                    <div style={styles.integrationContainer}>
                        <div style={styles.sectionHeading}>
                            <span style={styles.sectionEyebrow}>Workflow companions</span>
                            <h2 style={styles.sectionTitle}>Connect FocusFlow to your favourite tools</h2>
                            <span style={styles.sectionDivider} aria-hidden="true" />
                            <p style={styles.sectionLeadWide}>
                                Pair timers, rituals, and analytics with the platforms you already love. Ship automations, share status, and keep momentum synced everywhere.
                            </p>
                        </div>
                        <div style={styles.integrationGrid}>
                            {integrationPartners.map((partner, idx) => (
                                <div
                                    key={partner.name}
                                    style={styles.integrationCard}
                                    onMouseEnter={(e) => {
                                        Object.assign(e.currentTarget.style, { ...styles.integrationCard, ...styles.integrationCardHover });
                                    }}
                                    onMouseLeave={(e) => {
                                        Object.assign(e.currentTarget.style, styles.integrationCard);
                                    }}
                                >
                                    <span style={styles.integrationCardGlow} aria-hidden="true" />
                                    <div style={styles.integrationCardTop}>
                                        <span style={styles.integrationIcon}>{partner.icon}</span>
                                        <span style={styles.integrationStatus}>
                                            <span role="img" aria-label="spark">✨</span>
                                            {partner.status}
                                        </span>
                                    </div>
                                    <h3 style={styles.integrationTitle}>{partner.name}</h3>
                                    <p style={styles.integrationDescription}>{partner.blurb}</p>
                                    <div style={styles.useCaseTagRow}>
                                        {partner.highlights.split('·').map((tag, tagIdx) => (
                                            <span key={tagIdx} style={styles.useCaseTag}>
                                                <span style={styles.useCaseSpark} role="img" aria-label="spark">⚡</span>
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Product Roadmap Section
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
            </section> */}

                <LandingFooter />
                {/**
            <AuthModals
                isLoginOpen={isLoginOpen}
                isRegisterOpen={isRegisterOpen}
                onClose={handleCloseModal}
            />
            **/}
            </div>
        </>
    );
};

export default LandingPage;
