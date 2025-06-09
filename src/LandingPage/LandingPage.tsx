import React from "react";
import LandingNavbar from "./LandingNavbar";
import LandingFooter from "./LandingFooter";

const LandingPage: React.FC = () => {
    return (
        <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
            <LandingNavbar />

            {/* Hero Section */}
            <section
                style={{
                    padding: "8rem 5% 4rem",
                    backgroundColor: "#f8fafc",
                    textAlign: "center",
                }}
            >
                <h1
                    style={{
                        fontSize: "3.5rem",
                        fontWeight: "bold",
                        color: "#1e293b",
                        marginBottom: "1.5rem",
                        maxWidth: "800px",
                        margin: "0 auto 1.5rem",
                    }}
                >
                    Boost Your Productivity with FocusFlow
                </h1>
                <p
                    style={{
                        fontSize: "1.25rem",
                        color: "#64748b",
                        maxWidth: "600px",
                        margin: "0 auto 2rem",
                        lineHeight: "1.6",
                    }}
                >
                    The all-in-one task management and time tracking solution
                    designed to help you achieve more with less stress.
                </p>
                <div
                    style={{
                        display: "flex",
                        gap: "1rem",
                        justifyContent: "center",
                        marginBottom: "3rem",
                    }}
                >
                    <button
                        style={{
                            padding: "0.75rem 1.5rem",
                            backgroundColor: "#2563eb",
                            color: "white",
                            border: "none",
                            borderRadius: "0.375rem",
                            fontWeight: 500,
                            cursor: "pointer",
                            fontSize: "1rem",
                        }}
                    >
                        Get Started Free
                    </button>
                    <button
                        style={{
                            padding: "0.75rem 1.5rem",
                            backgroundColor: "transparent",
                            color: "#2563eb",
                            border: "1px solid #2563eb",
                            borderRadius: "0.375rem",
                            fontWeight: 500,
                            cursor: "pointer",
                            fontSize: "1rem",
                        }}
                    >
                        Watch Demo
                    </button>
                </div>
                <div
                    style={{
                        maxWidth: "1000px",
                        margin: "0 auto",
                        borderRadius: "0.5rem",
                        overflow: "hidden",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <img
                        src="https://placehold.co/1000x600/2563eb/ffffff?text=FocusFlow+Dashboard"
                        alt="FocusFlow Dashboard"
                        style={{ width: "100%", height: "auto" }}
                    />
                </div>
            </section>

            {/* Features Section */}
            <section
                id="features"
                style={{
                    padding: "6rem 5%",
                    backgroundColor: "white",
                }}
            >
                <h2
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        color: "#1e293b",
                        textAlign: "center",
                        marginBottom: "3rem",
                    }}
                >
                    Powerful Features
                </h2>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "2rem",
                        maxWidth: "1200px",
                        margin: "0 auto",
                    }}
                >
                    {[
                        {
                            title: "Task Management",
                            description:
                                "Organize tasks with intuitive drag-and-drop interface and customizable categories.",
                        },
                        {
                            title: "Time Tracking",
                            description:
                                "Track time spent on tasks and projects with detailed analytics and reports.",
                        },
                        {
                            title: "Team Collaboration",
                            description:
                                "Work seamlessly with your team through shared workspaces and real-time updates.",
                        },
                    ].map((feature, index) => (
                        <div
                            key={index}
                            style={{
                                padding: "2rem",
                                backgroundColor: "#f8fafc",
                                borderRadius: "0.5rem",
                                textAlign: "center",
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: "1.5rem",
                                    fontWeight: "bold",
                                    color: "#1e293b",
                                    marginBottom: "1rem",
                                }}
                            >
                                {feature.title}
                            </h3>
                            <p
                                style={{
                                    color: "#64748b",
                                    lineHeight: "1.6",
                                }}
                            >
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pricing Section */}
            <section
                id="pricing"
                style={{
                    padding: "6rem 5%",
                    backgroundColor: "#f8fafc",
                }}
            >
                <h2
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        color: "#1e293b",
                        textAlign: "center",
                        marginBottom: "3rem",
                    }}
                >
                    Simple, Transparent Pricing
                </h2>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "2rem",
                        maxWidth: "1200px",
                        margin: "0 auto",
                    }}
                >
                    {[
                        {
                            plan: "Free",
                            price: "$0",
                            features: [
                                "Up to 5 projects",
                                "Basic task management",
                                "1 team member",
                            ],
                        },
                        {
                            plan: "Pro",
                            price: "$12",
                            features: [
                                "Unlimited projects",
                                "Advanced analytics",
                                "Up to 10 team members",
                                "Priority support",
                            ],
                        },
                        {
                            plan: "Enterprise",
                            price: "Custom",
                            features: [
                                "Custom solutions",
                                "Unlimited team members",
                                "Dedicated support",
                                "Custom integrations",
                            ],
                        },
                    ].map((tier, index) => (
                        <div
                            key={index}
                            style={{
                                padding: "2rem",
                                backgroundColor: "white",
                                borderRadius: "0.5rem",
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                textAlign: "center",
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: "1.5rem",
                                    fontWeight: "bold",
                                    color: "#1e293b",
                                    marginBottom: "1rem",
                                }}
                            >
                                {tier.plan}
                            </h3>
                            <p
                                style={{
                                    fontSize: "2.5rem",
                                    fontWeight: "bold",
                                    color: "#2563eb",
                                    marginBottom: "1.5rem",
                                }}
                            >
                                {tier.price}
                                <span
                                    style={{
                                        fontSize: "1rem",
                                        color: "#64748b",
                                    }}
                                >
                                    /month
                                </span>
                            </p>
                            <ul
                                style={{
                                    listStyle: "none",
                                    padding: 0,
                                    margin: "0 0 1.5rem",
                                }}
                            >
                                {tier.features.map((feature, i) => (
                                    <li
                                        key={i}
                                        style={{
                                            marginBottom: "0.5rem",
                                            color: "#64748b",
                                        }}
                                    >
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button
                                style={{
                                    padding: "0.75rem 1.5rem",
                                    backgroundColor: "#2563eb",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "0.375rem",
                                    fontWeight: 500,
                                    cursor: "pointer",
                                    width: "100%",
                                }}
                            >
                                Get Started
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section
                id="testimonials"
                style={{
                    padding: "6rem 5%",
                    backgroundColor: "white",
                }}
            >
                <h2
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        color: "#1e293b",
                        textAlign: "center",
                        marginBottom: "3rem",
                    }}
                >
                    What Our Users Say
                </h2>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "2rem",
                        maxWidth: "1200px",
                        margin: "0 auto",
                    }}
                >
                    {[
                        {
                            quote: "FocusFlow has transformed how our team manages projects. The time tracking feature alone has increased our productivity by 40%.",
                            author: "Sarah Johnson",
                            role: "Project Manager",
                        },
                        {
                            quote: "The intuitive interface and powerful features make it the perfect tool for both individuals and teams. Highly recommended!",
                            author: "Michael Chen",
                            role: "Software Developer",
                        },
                        {
                            quote: "As a freelancer, FocusFlow helps me stay organized and bill clients accurately. It's become an essential part of my workflow.",
                            author: "Emily Rodriguez",
                            role: "Freelance Designer",
                        },
                    ].map((testimonial, index) => (
                        <div
                            key={index}
                            style={{
                                padding: "2rem",
                                backgroundColor: "#f8fafc",
                                borderRadius: "0.5rem",
                                textAlign: "center",
                            }}
                        >
                            <p
                                style={{
                                    fontSize: "1.125rem",
                                    color: "#1e293b",
                                    lineHeight: "1.6",
                                    marginBottom: "1.5rem",
                                    fontStyle: "italic",
                                }}
                            >
                                "{testimonial.quote}"
                            </p>
                            <p
                                style={{
                                    fontWeight: "bold",
                                    color: "#1e293b",
                                    marginBottom: "0.25rem",
                                }}
                            >
                                {testimonial.author}
                            </p>
                            <p
                                style={{
                                    color: "#64748b",
                                }}
                            >
                                {testimonial.role}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section
                style={{
                    padding: "6rem 5%",
                    backgroundColor: "#2563eb",
                    textAlign: "center",
                    color: "white",
                }}
            >
                <h2
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        marginBottom: "1.5rem",
                    }}
                >
                    Ready to Boost Your Productivity?
                </h2>
                <p
                    style={{
                        fontSize: "1.25rem",
                        marginBottom: "2rem",
                        maxWidth: "600px",
                        margin: "0 auto 2rem",
                        opacity: 0.9,
                    }}
                >
                    Join thousands of professionals who are already using
                    FocusFlow to achieve more.
                </p>
                <button
                    style={{
                        padding: "0.75rem 1.5rem",
                        backgroundColor: "white",
                        color: "#2563eb",
                        border: "none",
                        borderRadius: "0.375rem",
                        fontWeight: 500,
                        cursor: "pointer",
                        fontSize: "1rem",
                    }}
                >
                    Start Free Trial
                </button>
            </section>

            <LandingFooter />
        </div>
    );
};

export default LandingPage;
