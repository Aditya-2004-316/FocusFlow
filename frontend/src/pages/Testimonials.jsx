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
            color: '#a78bfa',
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
                                color: "#a78bfa",
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
