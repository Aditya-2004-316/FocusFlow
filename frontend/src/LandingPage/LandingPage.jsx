import React, { useState } from "react";
import LandingNavbar from "./LandingNavbar";
import LandingFooter from "./LandingFooter";
import AuthModals from "./AuthModals";
import FocusFlowDashboard from "../assets/focusflowdashboard.png";
import "./LandingPage.css";

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

    return (
        <div className="landing-page">
            <LandingNavbar />
            {/* Hero Section */}
            <section className="hero-section">
                <h1 className="hero-title">
                    Unlock Your Productivity with FocusFlow
                </h1>
                <p className="hero-subtitle">
                    FocusFlow is your all-in-one platform for task management
                    and time tracking. Achieve more, stress less—always free,
                    with no hidden fees.
                </p>
                <div className="hero-buttons">
                    <button
                        className="hero-btn-primary"
                        onClick={handleRegisterClick}
                    >
                        Get Started
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="features-container">
                    <h2 className="features-title">Why Choose FocusFlow?</h2>
                    <div className="features-grid">
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
                            <div key={index} className="feature-card">
                                <h3 className="feature-title">
                                    {feature.title}
                                </h3>
                                <p className="feature-description">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <div className="testimonials-container">
                    <h2 className="testimonials-title">
                        Loved by Our Community
                    </h2>
                    <div className="testimonials-grid">
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
                            <div key={index} className="testimonial-card">
                                <blockquote className="testimonial-quote">
                                    "{testimonial.quote}"
                                </blockquote>
                                <div className="testimonial-author">
                                    {testimonial.author}
                                </div>
                                <div className="testimonial-role">
                                    {testimonial.role}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-container">
                    <h2 className="cta-title">Experience FocusFlow Today</h2>
                    <p className="cta-subtitle">
                        Join thousands of happy users who organize, track, and
                        achieve more every day.
                    </p>
                    <button className="cta-btn" onClick={handleRegisterClick}>
                        Get Started
                    </button>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works-section">
                <div className="how-it-works-container">
                    <h2 className="how-it-works-title">How FocusFlow Works</h2>
                    <p className="how-it-works-description">
                        Getting started is simple! Create your first task, set a
                        timer, and watch your productivity soar. Easily organize
                        your to-dos, track your progress, and collaborate with
                        others—all from a clean, intuitive dashboard. Whether
                        you're working solo or with a team, FocusFlow adapts to
                        your workflow and helps you stay on track every step of
                        the way.
                    </p>
                    <ul className="how-it-works-list">
                        <li>Sign up and personalize your workspace</li>
                        <li>Add tasks and set priorities</li>
                        <li>Use the built-in timer to stay focused</li>
                        <li>Track your achievements and review insights</li>
                        <li>Invite others to collaborate, if you wish</li>
                    </ul>
                    <p className="how-it-works-footer">
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
