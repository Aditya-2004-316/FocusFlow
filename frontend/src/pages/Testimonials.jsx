import React from "react";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import "../styles/CardHover.css";

const testimonials = [
    {
        quote: "FocusFlow has increased my productivity by 40%.",
        author: "Sarah Johnson",
        role: "Project Manager",
    },
    {
        quote: "The intuitive interface and powerful features make it the perfect tool for both individuals and teams. Highly recommended",
        author: "Michael Chen",
        role: "Software Developer",
    },
    {
        quote: "As a freelancer, FocusFlow helps me stay organized and bill clients accurately. It's become an essential part of my workflow.",
        author: "Emily Rodriguez",
        role: "Freelance Designer",
    },
    {
        quote: "FocusFlow helped me ace my finals! The Pomodoro timer kept me focused during long study sessions.",
        author: "Alex Martinez",
        role: "Computer Science Student",
    },
    {
        quote: "Best productivity app I've ever used. Simple, effective, and completely free. What more could you ask for?",
        author: "David Kim",
        role: "Marketing Manager",
    },
    {
        quote: "The analytics feature is incredible. I can see exactly where my time goes and optimize my workflow accordingly.",
        author: "Jessica Lee",
        role: "Data Analyst",
    },
    {
        quote: "As a remote worker, FocusFlow helps me maintain structure and discipline. It's like having a productivity coach.",
        author: "Ryan Thompson",
        role: "Content Writer",
    },
    {
        quote: "I've tried dozens of productivity apps, but FocusFlow is the only one I've stuck with. It just works!",
        author: "Priya Patel",
        role: "UX Designer",
    },
    {
        quote: "The distraction logging feature helped me identify my biggest time-wasters. Game changer!",
        author: "James Wilson",
        role: "Entrepreneur",
    },
];

const Testimonials = () => {
    const styles = {
        landingPage: {
            minHeight: '100vh',
            background: 'linear-gradient(to bottom, #0f172a, #1e293b, #0f172a)',
            color: '#ffffff',
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
    };

    return (
        <div style={styles.landingPage}>
            <LandingNavbar />
            <section style={styles.testimonialsSection}>
                <div style={styles.testimonialsContainer}>
                    <h2 style={styles.testimonialsTitle}>
                        What Our Users Say
                    </h2>
                    <p
                        style={{
                            color: "#94a3b8",
                            fontSize: "1.15rem",
                            textAlign: "center",
                            margin: "0 auto 2.5rem auto",
                            maxWidth: 600,
                            fontWeight: 500,
                        }}
                    >
                        Real stories from real users — see how FocusFlow is helping
                        people boost their productivity, stay organized, and achieve
                        their goals every day.
                    </p>

                    {/* Rating Statistics */}
                    <div style={{
                        background: "rgba(30, 41, 59, 0.5)",
                        backdropFilter: "blur(8px)",
                        borderRadius: "1rem",
                        border: "1px solid #334155",
                        padding: "2rem",
                        marginBottom: "3rem",
                        textAlign: "center",
                    }}>
                        <h3 style={{ color: "#38bdf8", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>
                            ⭐ User Ratings
                        </h3>
                        <div style={{ fontSize: "3rem", fontWeight: 800, color: "#38bdf8", marginBottom: "0.5rem" }}>
                            4.8/5
                        </div>
                        <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>Based on 1,234 reviews</p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", maxWidth: "800px", margin: "0 auto" }}>
                            {[
                                { label: "Ease of Use", rating: 4.9 },
                                { label: "Features", rating: 4.8 },
                                { label: "Design", rating: 4.9 },
                                { label: "Support", rating: 4.7 },
                            ].map((item, idx) => (
                                <div key={idx}>
                                    <div style={{ color: "#ffffff", fontSize: "1rem", marginBottom: "0.5rem" }}>{item.label}</div>
                                    <div style={{ color: "#38bdf8", fontSize: "1.5rem", fontWeight: 700 }}>
                                        {"⭐".repeat(Math.floor(item.rating))} {item.rating}/5
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={styles.testimonialsGrid}>
                        {testimonials.map((testimonial, index) => (
                            <div 
                                key={index} 
                                className="hover-card"
                                style={styles.testimonialCard}
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
                    <div
                        style={{
                            marginTop: "3rem",
                            background: "rgba(30, 41, 59, 0.5)",
                            backdropFilter: "blur(8px)",
                            borderRadius: "0.75rem",
                            border: "1px solid #334155",
                            padding: "1.5rem 1.5rem",
                            textAlign: "center",
                            color: "#94a3b8",
                            fontSize: "1.08rem",
                        }}
                    >
                        Want to share your own FocusFlow story? <br />
                        <a
                            href="mailto:focusflow@studentproject.com"
                            style={{
                                color: "#38bdf8",
                                fontWeight: 600,
                                textDecoration: "underline",
                            }}
                        >
                            Send us your feedback
                        </a>{" "}
                        and you could be featured here!
                    </div>
                </div>
            </section>
            <LandingFooter />
        </div>
    );
};

export default Testimonials;
