import React from "react";
import useResponsive from "../hooks/useResponsive";

const AboutUs = () => {
    const { isMobile } = useResponsive();
    const containerStyle = {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: isMobile ? "1rem" : "2rem",
    };

    const headerStyle = {
        marginBottom: isMobile ? "2rem" : "4rem",
        textAlign: "center",
    };

    const titleStyle = {
        fontSize: isMobile ? "2rem" : "3rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "1rem",
    };

    const subtitleStyle = {
        fontSize: isMobile ? "1rem" : "1.25rem",
        color: "var(--color-gray-600)",
        maxWidth: "48rem",
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
    };

    const paragraphStyle = {
        fontSize: "1.125rem",
        color: "var(--color-gray-600)",
        lineHeight: "1.75",
        marginBottom: "1.5rem",
    };

    const valuesGridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "2rem",
        marginTop: "2rem",
    };

    const valueCardStyle = {
        background: "var(--color-white)",
        borderRadius: "1rem",
        padding: "2rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    };

    const valueIconStyle = {
        width: "3rem",
        height: "3rem",
        color: "var(--color-primary-600)",
        margin: "0 auto 1.5rem",
        fontSize: "3rem",
    };

    const valueTitleStyle = {
        fontSize: "1.25rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "1rem",
    };

    const valueDescriptionStyle = {
        fontSize: "1rem",
        color: "var(--color-gray-600)",
        lineHeight: "1.5",
    };

    const teamGridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "2rem",
        marginTop: "2rem",
    };

    const teamMemberStyle = {
        textAlign: "center",
    };

    const teamMemberImageStyle = {
        width: "12rem",
        height: "12rem",
        borderRadius: "50%",
        margin: "0 auto 1.5rem",
        objectFit: "cover",
    };

    const teamMemberNameStyle = {
        fontSize: "1.25rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const teamMemberRoleStyle = {
        fontSize: "1rem",
        color: "var(--color-gray-600)",
        marginBottom: "1rem",
    };

    const teamMemberBioStyle = {
        fontSize: "0.875rem",
        color: "var(--color-gray-500)",
        lineHeight: "1.5",
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>About FocusFlow</h1>
                <p style={subtitleStyle}>
                    Empowering individuals to achieve their full potential
                    through focused productivity
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>Our Story</h2>
                <p style={paragraphStyle}>
                    FocusFlow was born from a simple observation: in today's
                    fast-paced world, maintaining focus and productivity has
                    become increasingly challenging. Since our founding in 2023,
                    we've helped thousands of users improve their productivity
                    and achieve their goals. Our commitment to continuous
                    improvement and user feedback drives everything we do.
                </p>
                <div style={valuesGridStyle}>
                    <div style={valueCardStyle}>
                        <div style={valueIconStyle}>👥</div>
                        <h3 style={valueTitleStyle}>User-Centric</h3>
                        <p style={valueDescriptionStyle}>
                            We put our users first, constantly seeking feedback
                            and improving our platform based on their needs.
                        </p>
                    </div>
                    <div style={valueCardStyle}>
                        <div style={valueIconStyle}>💡</div>
                        <h3 style={valueTitleStyle}>Innovation</h3>
                        <p style={valueDescriptionStyle}>
                            We continuously explore new ways to enhance
                            productivity and user experience.
                        </p>
                    </div>
                    <div style={valueCardStyle}>
                        <div style={valueIconStyle}>🔥</div>
                        <h3 style={valueTitleStyle}>Passion</h3>
                        <p style={valueDescriptionStyle}>
                            We're passionate about helping people achieve their
                            goals and reach their full potential.
                        </p>
                    </div>
                    <div style={valueCardStyle}>
                        <div style={valueIconStyle}>🤝</div>
                        <h3 style={valueTitleStyle}>Integrity</h3>
                        <p style={valueDescriptionStyle}>
                            We maintain the highest standards of integrity in
                            everything we do, from product development to user
                            support.
                        </p>
                    </div>
                </div>
            </div>

            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>Our Team</h2>
                <div style={teamGridStyle}>
                    <div style={teamMemberStyle}>
                        <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                            alt="John Doe"
                            style={teamMemberImageStyle}
                        />
                        <h3 style={teamMemberNameStyle}>John Doe</h3>
                        <p style={teamMemberRoleStyle}>Founder & CEO</p>
                        <p style={teamMemberBioStyle}>
                            Productivity enthusiast with 10+ years of experience
                            in software development and team leadership.
                        </p>
                    </div>
                    <div style={teamMemberStyle}>
                        <img
                            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                            alt="Jane Smith"
                            style={teamMemberImageStyle}
                        />
                        <h3 style={teamMemberNameStyle}>Jane Smith</h3>
                        <p style={teamMemberRoleStyle}>Head of Product</p>
                        <p style={teamMemberBioStyle}>
                            UX/UI expert passionate about creating intuitive and
                            effective productivity tools.
                        </p>
                    </div>
                    <div style={teamMemberStyle}>
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                            alt="Mike Johnson"
                            style={teamMemberImageStyle}
                        />
                        <h3 style={teamMemberNameStyle}>Mike Johnson</h3>
                        <p style={teamMemberRoleStyle}>Lead Developer</p>
                        <p style={teamMemberBioStyle}>
                            Full-stack developer with expertise in building
                            scalable and user-friendly applications.
                        </p>
                    </div>
                </div>
            </div>

            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>Our Mission</h2>
                <p style={paragraphStyle}>
                    At FocusFlow, our mission is to empower individuals to
                    achieve their full potential by providing them with the
                    tools and insights they need to stay focused, track their
                    progress, and accomplish their goals. We believe that with
                    the right tools and mindset, anyone can improve their
                    productivity and achieve success.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
