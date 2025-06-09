import React from "react";
import {
    ClockIcon,
    ChartBarIcon,
    UserGroupIcon,
    BookOpenIcon,
    BellIcon,
    Cog6ToothIcon,
    ChartPieIcon,
    ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import type { CSSProperties } from "react";

const Features = () => {
    const containerStyle: CSSProperties = {
        minWidth: "64rem",
        margin: "2rem auto",
        padding: "0 1rem",
    };

    const headerStyle: CSSProperties = {
        marginBottom: "3rem",
        textAlign: "center",
    };

    const titleStyle: CSSProperties = {
        fontSize: "2.25rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "1rem",
    };

    const subtitleStyle: CSSProperties = {
        fontSize: "1.125rem",
        color: "var(--color-gray-600)",
        maxWidth: "36rem",
        margin: "0 auto",
    };

    const gridStyle: CSSProperties = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "2rem",
        marginBottom: "3rem",
    };

    const featureCardStyle: CSSProperties = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "2rem",
        boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    };

    const iconStyle: CSSProperties = {
        width: "2.5rem",
        height: "2.5rem",
        color: "var(--color-primary-600)",
        marginBottom: "1rem",
    };

    const cardTitleStyle: CSSProperties = {
        fontSize: "1.25rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "0.75rem",
    };

    const cardTextStyle: CSSProperties = {
        fontSize: "1rem",
        color: "var(--color-gray-600)",
        lineHeight: "1.5",
    };

    const features = [
        {
            icon: <ClockIcon style={iconStyle} />,
            title: "Focus Timer",
            description:
                "Customizable Pomodoro timer with focus and break sessions. Track your productivity and maintain a healthy work-life balance.",
        },
        {
            icon: <ChartBarIcon style={iconStyle} />,
            title: "Productivity Analytics",
            description:
                "Detailed insights into your work patterns, focus sessions, and productivity trends. Make data-driven decisions to improve your workflow.",
        },
        {
            icon: <UserGroupIcon style={iconStyle} />,
            title: "Community Features",
            description:
                "Connect with like-minded individuals, share your progress, and participate in productivity challenges with our growing community.",
        },
        {
            icon: <BookOpenIcon style={iconStyle} />,
            title: "Resource Library",
            description:
                "Access a curated collection of productivity tips, articles, and guides to help you optimize your workflow and achieve your goals.",
        },
        {
            icon: <BellIcon style={iconStyle} />,
            title: "Smart Notifications",
            description:
                "Customizable reminders and notifications to keep you on track and maintain your focus throughout the day.",
        },
        {
            icon: <Cog6ToothIcon style={iconStyle} />,
            title: "Customizable Settings",
            description:
                "Personalize your experience with adjustable timer settings, themes, and preferences to match your workflow.",
        },
        {
            icon: <ChartPieIcon style={iconStyle} />,
            title: "Progress Tracking",
            description:
                "Monitor your daily, weekly, and monthly progress with detailed statistics and visual representations of your achievements.",
        },
        {
            icon: <ArrowTrendingUpIcon style={iconStyle} />,
            title: "Goal Setting",
            description:
                "Set and track your productivity goals, celebrate milestones, and continuously improve your focus and efficiency.",
        },
    ];

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>Features</h1>
                <p style={subtitleStyle}>
                    Discover the powerful tools and features designed to help
                    you stay focused, track your progress, and achieve your
                    productivity goals.
                </p>
            </div>

            <div style={gridStyle}>
                {features.map((feature, index) => (
                    <div key={index} style={featureCardStyle}>
                        {feature.icon}
                        <h3 style={cardTitleStyle}>{feature.title}</h3>
                        <p style={cardTextStyle}>{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;
