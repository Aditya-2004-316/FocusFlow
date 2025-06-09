import React from "react";
import {
    BriefcaseIcon,
    BuildingOfficeIcon,
    UserGroupIcon,
    SparklesIcon,
    ArrowRightIcon,
} from "@heroicons/react/24/outline";
import type { CSSProperties } from "react";

const Careers = () => {
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

    const sectionStyle: CSSProperties = {
        marginBottom: "4rem",
    };

    const sectionTitleStyle: CSSProperties = {
        fontSize: "1.5rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
    };

    const sectionIconStyle: CSSProperties = {
        width: "1.75rem",
        height: "1.75rem",
        color: "var(--color-primary-600)",
    };

    const gridStyle: CSSProperties = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1.5rem",
    };

    const cardStyle: CSSProperties = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    };

    const cardTitleStyle: CSSProperties = {
        fontSize: "1.25rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "0.75rem",
    };

    const cardDescriptionStyle: CSSProperties = {
        fontSize: "1rem",
        color: "var(--color-gray-600)",
        lineHeight: "1.5",
        marginBottom: "1rem",
    };

    const jobCardStyle: CSSProperties = {
        ...cardStyle,
        display: "flex",
        flexDirection: "column",
    };

    const jobMetaStyle: CSSProperties = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "auto",
        paddingTop: "1rem",
        borderTop: "1px solid var(--color-gray-200)",
    };

    const jobLocationStyle: CSSProperties = {
        fontSize: "0.875rem",
        color: "var(--color-gray-500)",
    };

    const applyButtonStyle: CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        color: "var(--color-primary-600)",
        fontSize: "0.875rem",
        fontWeight: 500,
        textDecoration: "none",
    };

    const benefits = [
        {
            title: "Remote-First Culture",
            description:
                "Work from anywhere in the world with our flexible remote work policy and home office setup support.",
        },
        {
            title: "Health & Wellness",
            description:
                "Comprehensive health insurance, mental health support, and wellness programs to keep you at your best.",
        },
        {
            title: "Learning & Development",
            description:
                "Annual learning budget, conference attendance, and dedicated time for personal growth and skill development.",
        },
        {
            title: "Work-Life Balance",
            description:
                "Flexible hours, unlimited PTO, and a culture that respects your time outside of work.",
        },
    ];

    const openPositions = [
        {
            title: "Senior Frontend Developer",
            description:
                "Join our team to build beautiful, responsive user interfaces and help shape the future of FocusFlow.",
            location: "Remote",
        },
        {
            title: "Product Designer",
            description:
                "Create intuitive and engaging user experiences that help people achieve their productivity goals.",
            location: "Remote",
        },
        {
            title: "Backend Engineer",
            description:
                "Design and implement scalable backend services to support our growing user base.",
            location: "Remote",
        },
        {
            title: "Product Manager",
            description:
                "Lead product initiatives and work closely with our team to deliver value to our users.",
            location: "Remote",
        },
    ];

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>Join Our Team</h1>
                <p style={subtitleStyle}>
                    Help us build the future of productivity. We're looking for
                    passionate individuals who want to make a difference.
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                    <BuildingOfficeIcon style={sectionIconStyle} />
                    Our Culture
                </h2>
                <div style={gridStyle}>
                    {benefits.map((benefit, index) => (
                        <div key={index} style={cardStyle}>
                            <h3 style={cardTitleStyle}>{benefit.title}</h3>
                            <p style={cardDescriptionStyle}>
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                    <BriefcaseIcon style={sectionIconStyle} />
                    Open Positions
                </h2>
                <div style={gridStyle}>
                    {openPositions.map((job, index) => (
                        <div key={index} style={jobCardStyle}>
                            <h3 style={cardTitleStyle}>{job.title}</h3>
                            <p style={cardDescriptionStyle}>
                                {job.description}
                            </p>
                            <div style={jobMetaStyle}>
                                <span style={jobLocationStyle}>
                                    {job.location}
                                </span>
                                <a href="#" style={applyButtonStyle}>
                                    Apply Now
                                    <ArrowRightIcon
                                        style={{
                                            width: "1rem",
                                            height: "1rem",
                                        }}
                                    />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                    <SparklesIcon style={sectionIconStyle} />
                    Why Join Us?
                </h2>
                <div style={gridStyle}>
                    <div style={cardStyle}>
                        <h3 style={cardTitleStyle}>Make an Impact</h3>
                        <p style={cardDescriptionStyle}>
                            Help millions of people improve their productivity
                            and achieve their goals. Your work will directly
                            impact people's lives.
                        </p>
                    </div>
                    <div style={cardStyle}>
                        <h3 style={cardTitleStyle}>Grow with Us</h3>
                        <p style={cardDescriptionStyle}>
                            Join a fast-growing company with plenty of
                            opportunities for career advancement and personal
                            development.
                        </p>
                    </div>
                    <div style={cardStyle}>
                        <h3 style={cardTitleStyle}>Work with Great People</h3>
                        <p style={cardDescriptionStyle}>
                            Join a team of passionate, talented individuals who
                            are committed to building something great together.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Careers;
