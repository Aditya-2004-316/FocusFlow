import React from "react";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import "../LandingPage/LandingPage.css";

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

const Testimonials = () => (
    <div className="landing-page">
        <LandingNavbar />
        <section className="testimonials-section">
            <div className="testimonials-container">
                <h2
                    className="testimonials-title"
                    style={{ color: "var(--color-primary-900)" }}
                >
                    What Our Users Say
                </h2>
                <p
                    style={{
                        color: "var(--color-primary-900)",
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
                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
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
                <div
                    style={{
                        marginTop: "3rem",
                        background: "var(--color-white)",
                        borderRadius: "0.75rem",
                        boxShadow: "var(--shadow-soft)",
                        padding: "1.5rem 1.5rem",
                        textAlign: "center",
                        color: "var(--color-primary-900)",
                        fontSize: "1.08rem",
                    }}
                >
                    Want to share your own FocusFlow story? <br />
                    <a
                        href="mailto:focusflow@studentproject.com"
                        style={{
                            color: "var(--color-primary-600)",
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

export default Testimonials;
