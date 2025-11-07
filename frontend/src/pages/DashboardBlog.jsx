import React, { useState } from "react";
import { FaBookOpen, FaTag, FaStar, FaCheckCircle } from "react-icons/fa";

const posts = [
    {
        title: "The Science of Focus: How to Train Your Brain for Better Concentration",
        excerpt:
            "Discover the neuroscience behind focus and learn practical techniques to improve your concentration and productivity.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1470&q=80",
        author: "Dr. Sarah Johnson",
        date: "March 15, 2024",
        category: "Productivity",
        featured: true,
    },
    {
        title: "10 Time Management Techniques That Actually Work",
        excerpt:
            "Explore proven time management strategies that can help you make the most of your day and achieve your goals.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1470&q=80",
        author: "Michael Chen",
        date: "March 12, 2024",
        category: "Time Management",
        featured: false,
    },
    {
        title: "Designing Workflows that Flow Smoothly",
        excerpt:
            "Craft a workspace and routine that keeps you in the zone for longer stretches without burnout.",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1470&q=80",
        author: "FocusFlow Team",
        date: "February 28, 2024",
        category: "Workflow",
        featured: false,
    },
    {
        title: "The Power of Deep Work in a Distracted World",
        excerpt:
            "Understand the concept of deep work and how it can help you achieve more in less time while maintaining quality.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1470&q=80",
        author: "David Thompson",
        date: "March 8, 2024",
        category: "Productivity",
        featured: false,
    },
    {
        title: "How to Overcome Procrastination: A Practical Guide",
        excerpt:
            "Discover effective strategies to overcome procrastination and develop a more proactive approach to your tasks.",
        image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=1476&q=80",
        author: "Lisa Martinez",
        date: "March 5, 2024",
        category: "Psychology",
        featured: false,
    },
    {
        title: "The Role of Breaks in Maintaining Productivity",
        excerpt:
            "Learn why taking regular breaks is essential for maintaining high productivity and how to optimize your break times.",
        image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=1364&q=80",
        author: "James Wilson",
        date: "March 3, 2024",
        category: "Wellness",
        featured: false,
    },
    {
        title: "Building a Productive Morning Routine",
        excerpt:
            "Learn how to create a morning routine that sets you up for success and helps you maintain high energy throughout the day.",
        image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=1364&q=80",
        author: "Emma Wilson",
        date: "March 10, 2024",
        category: "Lifestyle",
        featured: false,
    },
];

const focusTopics = [
    "Deep Work",
    "Habit Building",
    "Time Blocking",
    "Mindfulness",
    "Remote Work",
    "Team Productivity",
];

const pageWrapperStyle = {
    minHeight: "100vh",
    padding: "4.5rem 1.75rem 5rem",
    background: "var(--color-white)",
    color: "var(--color-gray-900)",
};

const containerStyle = {
    maxWidth: "1120px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "3rem",
};

const heroSectionStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2.75rem",
    alignItems: "stretch",
    background: "var(--panel-bg)",
    border: "1px solid var(--input-border)",
    borderRadius: "1.5rem",
    padding: "2.75rem",
    boxShadow: "var(--shadow-lg)",
};

const heroLeftColumnStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.85rem",
};

const heroContentStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
};

const heroRightColumnStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
};

const heroBadgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.85rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "var(--color-primary-600)",
    background: "linear-gradient(135deg, rgba(56, 189, 248, 0.18), rgba(14, 165, 233, 0.06))",
    padding: "0.35rem 0.85rem",
    borderRadius: "999px",
    width: "fit-content",
};

const heroTitleStyle = {
    fontSize: "clamp(2rem, 4vw, 2.6rem)",
    fontWeight: 800,
    letterSpacing: "-0.04em",
    lineHeight: 1.15,
    color: "var(--color-gray-900)",
};

const heroSubtitleStyle = {
    fontSize: "1.05rem",
    color: "var(--color-gray-600)",
    lineHeight: 1.7,
    maxWidth: "34rem",
};

const heroActionsStyle = {
    display: "flex",
    gap: "0.75rem",
    flexWrap: "wrap",
};

const heroPrimaryButtonStyle = {
    background: "linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))",
    color: "#0f172a",
    padding: "0.85rem 1.9rem",
    borderRadius: "999px",
    fontWeight: 600,
    fontSize: "0.95rem",
    border: "none",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.6rem",
    boxShadow: "0 16px 32px rgba(8, 145, 178, 0.28)",
};

const heroSecondaryButtonStyle = {
    background: "transparent",
    color: "var(--color-primary-600)",
    padding: "0.85rem 1.75rem",
    borderRadius: "999px",
    fontWeight: 600,
    fontSize: "0.95rem",
    border: "1px solid var(--color-primary-300)",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
};


const sectionHeaderStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
};

const sectionTitleStyle = {
    fontSize: "1.65rem",
    fontWeight: 700,
    color: "var(--color-gray-900)",
};

const topicsPanelStyle = {
    background: "var(--panel-bg)",
    border: "1px solid var(--input-border)",
    borderRadius: "1.25rem",
    padding: "1.75rem",
    boxShadow: "var(--shadow-soft)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
};

const topicsBarStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "1rem",
};

const topicCardStyle = {
    background: "var(--color-white)",
    border: "1px solid var(--input-border)",
    borderRadius: "1rem",
    padding: "1rem 1.1rem",
    boxShadow: "var(--shadow-soft)",
    fontWeight: 600,
    fontSize: "0.95rem",
    color: "var(--color-gray-700)",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
};

const articlesSectionStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.75rem",
};

const articleGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "2rem",
};

const postContentStyle = {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    zIndex: 1,
    padding: "1.75rem",
    width: "100%",
    gap: "1rem",
};

const postTextGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
};

const postTitleStyle = {
    fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)",
    fontWeight: 700,
    color: "var(--color-primary-700)",
    margin: 0,
    letterSpacing: "-0.3px",
};

const postSummaryStyle = {
    fontSize: "1rem",
    color: "var(--color-gray-600)",
    lineHeight: 1.6,
    margin: 0,
};

const featuredPostStyle = {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 0.9fr)",
    gap: "0",
    background: "var(--panel-bg)",
    border: "1px solid var(--input-border)",
    borderRadius: "1.25rem",
    overflow: "hidden",
    boxShadow: "var(--shadow-lg)",
};

const featuredImageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
};

const featuredContentStyle = {
    padding: "2.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
};

const postCardStyle = {
    background: "var(--panel-bg)",
    border: "1px solid var(--input-border)",
    borderRadius: "1rem",
    overflow: "hidden",
    boxShadow: "var(--shadow-soft)",
    display: "flex",
    flexDirection: "column",
};

const postImageStyle = {
    width: "100%",
    height: "12rem",
    objectFit: "cover",
};

const postMetaHeaderStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    fontSize: "0.875rem",
    color: "var(--color-gray-500)",
    marginBottom: "1rem",
    flexWrap: "wrap",
};

const postFooterStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.75rem",
    paddingTop: "1rem",
    borderTop: "1px solid var(--input-border)",
    flexWrap: "wrap",
};

const tagStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.25rem",
    padding: "0.25rem 0.75rem",
    background: "rgba(56, 189, 248, 0.12)",
    color: "rgba(125, 211, 252, 0.95)",
    borderRadius: "1rem",
    fontSize: "0.875rem",
    fontWeight: 500,
};

const readMoreStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "var(--color-primary-600)",
    fontSize: "0.875rem",
    fontWeight: 500,
    textDecoration: "none",
};

const heroPrimaryButtonHoverStyle = {
    ...heroPrimaryButtonStyle,
    transform: "scale(1.05)",
    boxShadow: "0 20px 40px rgba(8, 145, 178, 0.4)",
    background: "linear-gradient(135deg, var(--color-primary-400), var(--color-primary-600))",
};

const heroSecondaryButtonHoverStyle = {
    ...heroSecondaryButtonStyle,
    background: "rgba(56, 189, 248, 0.1)",
    borderColor: "var(--color-primary-500)",
};

const readMoreHoverStyle = {
    ...readMoreStyle,
    textDecoration: "underline",
    color: "var(--color-primary-700)",
};

const topicCardHoverStyle = {
    ...topicCardStyle,
    transform: "scale(1.02)",
    boxShadow: "0 8px 25px rgba(14, 165, 233, 0.15)",
    background: "rgba(56, 189, 248, 0.05)",
};

const DashboardBlog = () => {
    const [primaryButtonHovered, setPrimaryButtonHovered] = useState(false);
    const [secondaryButtonHovered, setSecondaryButtonHovered] = useState(false);
    const [readMoreHovered, setReadMoreHovered] = useState({});
    const [topicHovered, setTopicHovered] = useState(null);

    const featuredPost = posts.find((post) => post.featured);
    const regularPosts = posts.filter((post) => !post.featured);

    return (
        <section style={pageWrapperStyle}>
            <div style={containerStyle}>
                <section style={heroSectionStyle}>
                    <div style={heroLeftColumnStyle}>
                        <div style={heroContentStyle}>
                            <span style={heroBadgeStyle}>
                                <FaBookOpen style={{ width: "1rem", height: "1rem" }} />
                                Latest Insights
                            </span>
                            <h1 style={heroTitleStyle}>FocusFlow Blog</h1>
                            <p style={heroSubtitleStyle}>
                                Insights, case studies, and actionable routines to help individuals
                                and teams stay energized, focused, and consistently productive in any environment.
                                Explore proven techniques to overcome distractions and achieve peak performance.
                            </p>
                        </div>
                        <div style={heroActionsStyle}>
                            <a
                                href="#featured"
                                style={primaryButtonHovered ? heroPrimaryButtonHoverStyle : heroPrimaryButtonStyle}
                                onMouseEnter={() => setPrimaryButtonHovered(true)}
                                onMouseLeave={() => setPrimaryButtonHovered(false)}
                            >
                                Start Reading
                            </a>
                            <a
                                href="#topics"
                                style={secondaryButtonHovered ? heroSecondaryButtonHoverStyle : heroSecondaryButtonStyle}
                                onMouseEnter={() => setSecondaryButtonHovered(true)}
                                onMouseLeave={() => setSecondaryButtonHovered(false)}
                            >
                                Browse Topics
                            </a>
                        </div>
                    </div>

                    <div style={heroRightColumnStyle}>
                        <div style={topicsPanelStyle} id="topics">
                            <div style={sectionHeaderStyle}>
                                <span style={heroBadgeStyle}>
                                    <FaTag style={{ width: "1rem", height: "1rem" }} />
                                    Popular Topics
                                </span>
                                <h2 style={sectionTitleStyle}>What readers explore</h2>
                            </div>
                            <div style={topicsBarStyle}>
                                {focusTopics.map((topic, index) => (
                                    <div
                                        key={topic}
                                        style={topicHovered === index ? topicCardHoverStyle : topicCardStyle}
                                        onMouseEnter={() => setTopicHovered(index)}
                                        onMouseLeave={() => setTopicHovered(null)}
                                    >
                                        <FaCheckCircle style={{ width: "1rem", height: "1rem", color: "var(--color-primary-600)" }} />
                                        <span>{topic}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section style={articlesSectionStyle} id="featured">
                    <div style={sectionHeaderStyle}>
                        <span style={heroBadgeStyle}>
                            <FaStar style={{ width: "1rem", height: "1rem" }} />
                            Featured Articles
                        </span>
                        <h2 style={sectionTitleStyle}>
                            Deep dives from coaches and researchers
                        </h2>
                    </div>

                    {featuredPost && (
                        <div style={featuredPostStyle}>
                            <img
                                src={featuredPost.image}
                                alt={featuredPost.title}
                                style={featuredImageStyle}
                            />
                            <div style={featuredContentStyle}>
                                <div style={postMetaHeaderStyle}>
                                    <span>{featuredPost.author}</span>
                                    <span>•</span>
                                    <span>{featuredPost.date}</span>
                                </div>
                                <div style={postTextGroupStyle}>
                                    <h2 style={postTitleStyle}>{featuredPost.title}</h2>
                                    <p style={postSummaryStyle}>{featuredPost.excerpt}</p>
                                </div>
                                <div style={postFooterStyle}>
                                    <span style={tagStyle}>{featuredPost.category}</span>
                                    <a
                                        href="#"
                                        style={readMoreHovered[featuredPost.title] ? readMoreHoverStyle : readMoreStyle}
                                        onMouseEnter={() =>
                                            setReadMoreHovered({ ...readMoreHovered, [featuredPost.title]: true })
                                        }
                                        onMouseLeave={() =>
                                            setReadMoreHovered({ ...readMoreHovered, [featuredPost.title]: false })
                                        }
                                    >
                                        Read More
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M5 12h14" />
                                            <path d="m12 5 7 7-7 7" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                    <div style={articleGridStyle}>
                        {regularPosts.map((post) => (
                            <div key={post.title} style={postCardStyle}>
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    style={postImageStyle}
                                />
                                <div style={postContentStyle}>
                                    <div style={postMetaHeaderStyle}>
                                        <span>{post.author}</span>
                                        <span>•</span>
                                        <span>{post.date}</span>
                                    </div>
                                    <div style={postTextGroupStyle}>
                                        <h3 style={postTitleStyle}>{post.title}</h3>
                                        <p style={postSummaryStyle}>{post.excerpt}</p>
                                    </div>
                                    <div style={postFooterStyle}>
                                        <span style={tagStyle}>{post.category}</span>
                                        <a
                                            href="#"
                                            style={readMoreHovered[post.title] ? readMoreHoverStyle : readMoreStyle}
                                            onMouseEnter={() => setReadMoreHovered({ ...readMoreHovered, [post.title]: true })}
                                            onMouseLeave={() => setReadMoreHovered({ ...readMoreHovered, [post.title]: false })}
                                        >
                                            Read More
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M5 12h14" />
                                                <path d="m12 5 7 7-7 7" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </section>
    );
};

export default DashboardBlog;
