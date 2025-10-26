import React, { useState } from "react";
import { FaBookOpen, FaRegNewspaper, FaLightbulb } from "react-icons/fa";

const posts = [
    {
        title: "10 Productivity Hacks for Remote Work",
        summary:
            "Discover actionable tips to boost your productivity while working from home.",
        date: "2024-06-01",
        author: "FocusFlow Team",
        icon: (
            <FaLightbulb
                style={{
                    color: "var(--color-primary-600)",
                    fontSize: "1.7rem",
                    marginRight: "0.7rem",
                }}
            />
        ),
    },
    {
        title: "How to Build Lasting Focus Habits",
        summary:
            "Learn the science behind focus and how to create habits that stick.",
        date: "2024-05-20",
        author: "FocusFlow Team",
        icon: (
            <FaBookOpen
                style={{
                    color: "var(--color-cyan-700)",
                    fontSize: "1.7rem",
                    marginRight: "0.7rem",
                }}
            />
        ),
    },
    {
        title: "The Power of the Pomodoro Technique",
        summary: "Break your work into intervals and see your efficiency soar.",
        date: "2024-05-10",
        author: "FocusFlow Team",
        icon: (
            <FaRegNewspaper
                style={{
                    color: "var(--color-primary-400)",
                    fontSize: "1.7rem",
                    marginRight: "0.7rem",
                }}
            />
        ),
    },
];

const pageBackgroundStyle = {
    minHeight: "100vh",
    background: "var(--color-gray-50)",
};

const containerStyle = {
    maxWidth: "76rem",
    margin: "0 auto",
    padding: "2rem",
};

const headerStyle = {
    background:
        "linear-gradient(to right, var(--color-primary-500), var(--color-cyan-400))",
    borderRadius: "1rem",
    padding: "2rem",
    marginBottom: "2rem",
    color: "var(--color-white)",
    boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
};

const heroAccentBarStyle = {
    height: "6px",
    width: "100px",
    background:
        "linear-gradient(90deg, var(--color-primary-400), var(--color-cyan-400))",
    borderRadius: "3px",
    margin: "0 auto 0.8rem auto",
    boxShadow: "0 2px 12px 0 rgba(0,0,0,0.10)",
};

const heroIconCircleStyle = {
    background:
        "linear-gradient(135deg, var(--color-cyan-100) 0%, var(--color-primary-100) 100%)",
    borderRadius: "50%",
    width: "clamp(3.5rem, 6vw, 4.5rem)", // Responsive size
    height: "clamp(3.5rem, 6vw, 4.5rem)", // Responsive size
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 0.1rem auto",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    transition: "transform 0.18s, filter 0.18s",
};

const heroIconHoverStyle = {
    transform: "scale(1.08)",
    filter: "brightness(1.12)",
};

const heroStyle = {
    background:
        "linear-gradient(100deg, var(--color-primary-700) 0%, var(--color-cyan-100) 60%, var(--color-primary-200) 100%)",
    color: "var(--color-primary-800)",
    borderRadius: "1.5rem",
    padding: "clamp(1.5rem, 4vw, 2.5rem)", // Responsive padding
    width: "100%",
    boxSizing: "border-box",
    marginBottom: "2.5rem",
    boxShadow: "0 4px 32px 0 rgba(0,0,0,0.10)",
    position: "relative",
    textAlign: "center",
};

const titleStyle = {
    fontSize: "clamp(1.8rem, 4vw, 2.3rem)", // Responsive font size
    fontWeight: 900,
    color: "var(--color-primary-900)",
    margin: 0,
    letterSpacing: "-1px",
    textShadow: "0 2px 8px rgba(0,0,0,0.10)",
    textAlign: "center",
    fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
    padding: "0 clamp(0.5rem, 2vw, 1rem)", // Added responsive padding
};

const subtitleStyle = {
    color: "var(--color-cyan-900)",
    fontSize: "clamp(1rem, 2vw, 1.18rem)", // Responsive font size
    width: "100%", // Changed from maxWidth
    margin: "1.2rem auto 0 auto",
    fontWeight: 500,
    lineHeight: 1.6,
    textAlign: "center",
    padding: "0 clamp(0.5rem, 2vw, 1rem)", // Added responsive padding
    boxSizing: "border-box",
};

const mainStyle = {
    width: "100%",
    maxWidth: "900px", // Set a maximum width for better centering
    margin: "-2.5rem auto 2.5rem auto", // Center the main container
    padding: "clamp(1rem, 3vw, 1.5rem)",
    background: "rgba(255,255,255,0.92)",
    borderRadius: "1.5rem",
    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically if needed
    gap: "1.5rem",
    boxSizing: "border-box",
};

const cardStyle = {
    background:
        "linear-gradient(135deg, rgba(255,255,255,0.96) 60%, var(--color-cyan-50) 100%)",
    borderRadius: "1.5rem",
    boxShadow: "0 8px 32px rgba(0,0,0,0.16), 0 1.5px 8px rgba(0,0,0,0.08)",
    padding: "clamp(1rem, 3vw, 1.5rem)",
    maxWidth: "750px",
    width: "100%",
    margin: "0 auto", // Center horizontally
    display: "flex",
    gap: "1rem",
    alignItems: "flex-start",
    transition: "all 0.2s ease-in-out",
    marginBottom: "0",
    boxSizing: "border-box",
};

const cardHoverStyle = {
    transform: "translateY(-6px) scale(1.03)",
    boxShadow: "0 16px 48px rgba(0,0,0,0.22), 0 2px 12px rgba(0,0,0,0.10)",
    border: "2.5px solid var(--color-primary-400)",
};

const iconWrapperStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "0.2rem",
    flexShrink: 0,
    zIndex: 1,
    padding: "0.5rem",
    width: "3rem", // Fixed width for consistent layout
};

const postContentStyle = {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    zIndex: 1,
    padding: "0 0.5rem", // Add some padding
    width: "100%",
};

const postTitleStyle = {
    fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)", // Responsive font size
    fontWeight: 700,
    color: "var(--color-primary-700)",
    marginBottom: "0.5rem",
    letterSpacing: "-0.3px",
};

const postMetaStyle = {
    fontSize: "clamp(0.85rem, 1.8vw, 0.95rem)", // Responsive font size
    color: "var(--color-gray-500)",
    marginBottom: "0.75rem",
    fontWeight: 500,
};

const postSummaryStyle = {
    fontSize: "clamp(0.95rem, 2vw, 1.05rem)", // Responsive font size
    color: "var(--color-gray-700)",
    marginBottom: "0.5rem",
    lineHeight: 1.6,
    fontWeight: 500,
};

// Add new responsive styles for icon
const iconStyle = {
    fontSize: "clamp(1.5rem, 3vw, 1.7rem)", // Responsive icon size
};

const DashboardBlog = () => {
    const [iconHovered, setIconHovered] = useState(false);
    const [cardHovered, setCardHovered] = useState(null);

    return (
        <>
            <div style={pageBackgroundStyle} />
            <div style={containerStyle}>
                <section style={heroStyle}>
                    <div style={heroAccentBarStyle}></div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginBottom: "1.2rem",
                        }}
                    >
                        <div
                            style={
                                iconHovered
                                    ? {
                                          ...heroIconCircleStyle,
                                          ...heroIconHoverStyle,
                                      }
                                    : heroIconCircleStyle
                            }
                            onMouseEnter={() => setIconHovered(true)}
                            onMouseLeave={() => setIconHovered(false)}
                        >
                            <FaBookOpen
                                style={{
                                    fontSize: "2.5rem",
                                    color: "var(--color-white)",
                                }}
                            />
                        </div>
                        <h1
                            style={{
                                ...titleStyle,
                                margin: 0,
                                textAlign: "center",
                                lineHeight: 1.1,
                                display: "block",
                                marginTop: 0,
                            }}
                        >
                            Blog
                        </h1>
                    </div>
                    <p style={subtitleStyle}>
                        Insights, tips, and stories to help you get the most out
                        of FocusFlow and your productivity journey.
                    </p>
                </section>
                <main style={mainStyle}>
                    {posts.map((post, idx) => (
                        <div
                            key={idx}
                            style={
                                cardHovered === idx
                                    ? { ...cardStyle, ...cardHoverStyle }
                                    : cardStyle
                            }
                            onMouseEnter={() => setCardHovered(idx)}
                            onMouseLeave={() => setCardHovered(null)}
                        >
                            <div style={iconWrapperStyle}>{post.icon}</div>
                            <div style={postContentStyle}>
                                <div style={postTitleStyle}>{post.title}</div>
                                <div style={postMetaStyle}>
                                    {post.date} &middot; {post.author}
                                </div>
                                <div style={postSummaryStyle}>
                                    {post.summary}
                                </div>
                            </div>
                        </div>
                    ))}
                </main>
            </div>
        </>
    );
};

export default DashboardBlog;
