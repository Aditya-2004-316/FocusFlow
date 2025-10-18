import React, { useState } from "react";
import LandingNavbar from "./LandingNavbar";
import LandingFooter from "./LandingFooter";
import AuthModals from "./AuthModals";
import FocusFlowDashboard from "../assets/focusflowdashboard.png";

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
            background: 'linear-gradient(to right, #9333ea, #3b82f6)',
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
            boxShadow: '0 10px 15px -3px rgba(147, 51, 234, 0.1), 0 4px 6px -2px rgba(147, 51, 234, 0.05)',
        },
        heroBtnPrimaryHover: {
            background: 'linear-gradient(to right, #7c3aed, #2563eb)',
            transform: 'translateY(-2px)',
            boxShadow: '0 20px 25px -5px rgba(147, 51, 234, 0.3), 0 10px 10px -5px rgba(147, 51, 234, 0.1)',
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
            borderColor: 'rgba(147, 51, 234, 0.5)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        },
        featureTitle: {
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#a78bfa',
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
            color: '#a78bfa',
            marginBottom: '0.25rem',
        },
        testimonialRole: {
            color: '#6b7280',
            fontSize: '0.875rem',
        },
        ctaSection: {
            padding: '5rem 2rem',
            background: 'linear-gradient(to right, #9333ea, #3b82f6)',
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
            color: '#9333ea',
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
            padding: '4rem 2rem',
            background: 'rgba(15, 23, 42, 0.5)',
        },
        howItWorksContainer: {
            maxWidth: '900px',
            margin: '0 auto',
            background: 'rgba(30, 41, 59, 0.5)',
            backdropFilter: 'blur(8px)',
            borderRadius: '1rem',
            border: '1px solid #334155',
            padding: '3rem 2rem',
            textAlign: 'center',
        },
        howItWorksTitle: {
            fontSize: '2rem',
            fontWeight: '700',
            color: '#a78bfa',
            marginBottom: '1.5rem',
        },
        howItWorksDescription: {
            color: '#d1d5db',
            fontSize: '1.15rem',
            marginBottom: '2rem',
            lineHeight: '1.6',
        },
        howItWorksList: {
            listStyle: 'none',
            padding: '0',
            margin: '0 0 2rem 0',
            textAlign: 'left',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        howItWorksListItem: {
            marginBottom: '1rem',
            color: '#d1d5db',
            fontSize: '1.08rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem',
        },
        checkmark: {
            color: '#a78bfa',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            flexShrink: 0,
            marginTop: '0.1rem',
        },
        howItWorksFooter: {
            color: '#a78bfa',
            fontWeight: '500',
            fontSize: '1.1rem',
            marginTop: '1.5rem',
        },
    };

    return (
        <div style={styles.landingPage}>
            <LandingNavbar />
            {/* Hero Section */}
            <section style={styles.heroSection}>
                <h1 style={styles.heroTitle}>
                    Unlock Your Productivity with{" "}
                    <span style={{
                        background: 'linear-gradient(to right, #a78bfa, #60a5fa)',
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
                            Object.assign(e.target.style, styles.heroBtnPrimaryHover);
                        }}
                        onMouseLeave={(e) => {
                            Object.assign(e.target.style, styles.heroBtnPrimary);
                        }}
                    >
                        Get Started
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section style={styles.featuresSection}>
                <div style={styles.featuresContainer}>
                    <h2 style={styles.featuresTitle}>
                        Why Choose{" "}
                        <span style={{
                            background: 'linear-gradient(to right, #a78bfa, #60a5fa)',
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
                                    Object.assign(e.target.style, {...styles.featureCard, ...styles.featureCardHover});
                                }}
                                onMouseLeave={(e) => {
                                    Object.assign(e.target.style, styles.featureCard);
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

            {/* Testimonials Section */}
            <section style={styles.testimonialsSection}>
                <div style={styles.testimonialsContainer}>
                    <h2 style={styles.testimonialsTitle}>
                        Loved by Our{" "}
                        <span style={{
                            background: 'linear-gradient(to right, #a78bfa, #60a5fa)',
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
                                    Object.assign(e.target.style, {...styles.testimonialCard, ...styles.testimonialCardHover});
                                }}
                                onMouseLeave={(e) => {
                                    Object.assign(e.target.style, styles.testimonialCard);
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
                            Object.assign(e.target.style, {...styles.ctaBtn, ...styles.ctaBtnHover});
                        }}
                        onMouseLeave={(e) => {
                            Object.assign(e.target.style, styles.ctaBtn);
                        }}
                    >
                        Get Started
                    </button>
                </div>
            </section>

            {/* How It Works Section */}
            <section style={styles.howItWorksSection}>
                <div style={styles.howItWorksContainer}>
                    <h2 style={styles.howItWorksTitle}>
                        How{" "}
                        <span style={{
                            background: 'linear-gradient(to right, #a78bfa, #60a5fa)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            FocusFlow
                        </span>{" "}
                        Works
                    </h2>
                    <p style={styles.howItWorksDescription}>
                        Getting started is simple! Create your first task, set a
                        timer, and watch your productivity soar. Easily organize
                        your to-dos, track your progress, and collaborate with
                        others—all from a clean, intuitive dashboard. Whether
                        you're working solo or with a team, FocusFlow adapts to
                        your workflow and helps you stay on track every step of
                        the way.
                    </p>
                    <ul style={styles.howItWorksList}>
                        <li style={styles.howItWorksListItem}>
                            <span style={styles.checkmark}>✓</span>
                            Sign up and personalize your workspace
                        </li>
                        <li style={styles.howItWorksListItem}>
                            <span style={styles.checkmark}>✓</span>
                            Add tasks and set priorities
                        </li>
                        <li style={styles.howItWorksListItem}>
                            <span style={styles.checkmark}>✓</span>
                            Use the built-in timer to stay focused
                        </li>
                        <li style={styles.howItWorksListItem}>
                            <span style={styles.checkmark}>✓</span>
                            Track your achievements and review insights
                        </li>
                        <li style={styles.howItWorksListItem}>
                            <span style={styles.checkmark}>✓</span>
                            Invite others to collaborate, if you wish
                        </li>
                    </ul>
                    <p style={styles.howItWorksFooter}>
                        Start now and discover how easy it is to take control of
                        your time and tasks with FocusFlow!
                    </p>
                </div>
            </section>
            <LandingFooter />
            <AuthModals
                isLoginOpen={isLoginOpen}
                isRegisterOpen={isRegisterOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default LandingPage;
