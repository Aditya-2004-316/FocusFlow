import React from "react";
import useResponsive from "../hooks/useResponsive";

const Guides = () => {
    const { isMobile } = useResponsive();
    const containerStyle = {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: isMobile ? "1rem" : "2rem",
        overflowX: "hidden",
    };

    const headerStyle = {
        marginBottom: "3rem",
        textAlign: "center",
    };

    const titleStyle = {
        fontSize: isMobile ? "1.75rem" : "2.25rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "1rem",
    };

    const subtitleStyle = {
        fontSize: "1.125rem",
        color: "var(--color-gray-600)",
        maxWidth: "36rem",
        margin: "0 auto",
    };

    const sectionStyle = {
        marginBottom: "4rem",
    };

    const sectionTitleStyle = {
        fontSize: "1.5rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
    };

    const categoryIconStyle = {
        width: "1.75rem",
        height: "1.75rem",
        color: "var(--color-primary-600)",
        fontSize: "1.75rem",
    };

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1.5rem",
        marginBottom: "2rem",
    };

    const guideCardStyle = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    };

    const guideTitleStyle = {
        fontSize: "1.25rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "0.75rem",
    };

    const guideDescriptionStyle = {
        fontSize: "1rem",
        color: "var(--color-gray-600)",
        lineHeight: "1.5",
        marginBottom: "1rem",
    };

    const guideMetaStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "0.875rem",
        color: "var(--color-gray-500)",
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

    const categories = [
        {
            icon: "🚀",
            title: "Getting Started",
            guides: [
                {
                    title: "Understanding the Pomodoro Technique",
                    description:
                        "Learn the fundamentals of the Pomodoro Technique and how to implement it effectively in your workflow.",
                    readTime: "5 min read",
                },
                {
                    title: "Setting Up Your First Focus Session",
                    description:
                        "A step-by-step guide to configuring and starting your first focus session with FocusFlow.",
                    readTime: "3 min read",
                },
                {
                    title: "Customizing Your Timer Settings",
                    description:
                        "Learn how to personalize your timer settings to match your work style and preferences.",
                    readTime: "4 min read",
                },
            ],
        },
        {
            icon: "📊",
            title: "Productivity Analytics",
            guides: [
                {
                    title: "Understanding Your Productivity Metrics",
                    description:
                        "A comprehensive guide to interpreting your productivity statistics and making data-driven improvements.",
                    readTime: "6 min read",
                },
                {
                    title: "Setting and Tracking Goals",
                    description:
                        "Learn how to set meaningful productivity goals and track your progress over time.",
                    readTime: "5 min read",
                },
                {
                    title: "Analyzing Your Work Patterns",
                    description:
                        "Discover how to identify your most productive hours and optimize your schedule accordingly.",
                    readTime: "4 min read",
                },
            ],
        },
        {
            icon: "👥",
            title: "Community Features",
            guides: [
                {
                    title: "Joining Productivity Challenges",
                    description:
                        "Learn how to participate in community challenges and boost your productivity with others.",
                    readTime: "3 min read",
                },
                {
                    title: "Sharing Your Progress",
                    description:
                        "A guide to sharing your achievements and connecting with the FocusFlow community.",
                    readTime: "4 min read",
                },
                {
                    title: "Collaborating with Teams",
                    description:
                        "Learn how to use FocusFlow's team features to improve group productivity.",
                    readTime: "5 min read",
                },
            ],
        },
        {
            icon: "⚡",
            title: "Advanced Features",
            guides: [
                {
                    title: "Integrating with Other Tools",
                    description:
                        "Learn how to connect FocusFlow with your favorite productivity tools and services.",
                    readTime: "6 min read",
                },
                {
                    title: "Using the API",
                    description:
                        "A technical guide to using the FocusFlow API for custom integrations.",
                    readTime: "8 min read",
                },
                {
                    title: "Automating Your Workflow",
                    description:
                        "Discover how to automate repetitive tasks and streamline your productivity process.",
                    readTime: "5 min read",
                },
            ],
        },
    ];

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>Guides & Tutorials</h1>
                <p style={subtitleStyle}>
                    Comprehensive guides and tutorials to help you make the most
                    of FocusFlow's features and improve your productivity.
                </p>
            </div>

            {categories.map((category, index) => (
                <div key={index} style={sectionStyle}>
                    <h2 style={sectionTitleStyle}>
                        <span style={categoryIconStyle}>{category.icon}</span>
                        {category.title}
                    </h2>
                    <div style={gridStyle}>
                        {category.guides.map((guide, guideIndex) => (
                            <div key={guideIndex} style={guideCardStyle}>
                                <h3 style={guideTitleStyle}>{guide.title}</h3>
                                <p style={guideDescriptionStyle}>
                                    {guide.description}
                                </p>
                                <div style={guideMetaStyle}>
                                    <span>{guide.readTime}</span>
                                    <a href="#" style={readMoreStyle}>
                                        Read Guide
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
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Guides;
