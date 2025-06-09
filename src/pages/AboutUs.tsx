import React from "react";
import {
    UserGroupIcon,
    LightBulbIcon,
    HeartIcon,
    ShieldCheckIcon,
    RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import type { CSSProperties } from "react";

const AboutUs = () => {
    const containerStyle: CSSProperties = {
        maxWidth: "64rem",
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
        fontSize: "1.25rem",
        color: "var(--color-gray-600)",
        maxWidth: "48rem",
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
    };

    const paragraphStyle: CSSProperties = {
        fontSize: "1.125rem",
        color: "var(--color-gray-600)",
        lineHeight: "1.75",
        marginBottom: "1.5rem",
    };

    const valuesGridStyle: CSSProperties = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "2rem",
        marginTop: "2rem",
    };

    const valueCardStyle: CSSProperties = {
        background: "var(--color-white)",
        borderRadius: "1rem",
        padding: "2rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    };

    const valueIconStyle: CSSProperties = {
        width: "3rem",
        height: "3rem",
        color: "var(--color-primary-600)",
        margin: "0 auto 1.5rem",
    };

    const valueTitleStyle: CSSProperties = {
        fontSize: "1.25rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "1rem",
    };

    const valueDescriptionStyle: CSSProperties = {
        fontSize: "1rem",
        color: "var(--color-gray-600)",
        lineHeight: "1.5",
    };

    const teamGridStyle: CSSProperties = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "2rem",
        marginTop: "2rem",
    };

    const teamMemberStyle: CSSProperties = {
        textAlign: "center",
    };

    const teamMemberImageStyle: CSSProperties = {
        width: "12rem",
        height: "12rem",
        borderRadius: "50%",
        margin: "0 auto 1.5rem",
        objectFit: "cover",
    };

    const teamMemberNameStyle: CSSProperties = {
        fontSize: "1.25rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const teamMemberRoleStyle: CSSProperties = {
        fontSize: "1rem",
        color: "var(--color-gray-600)",
        marginBottom: "1rem",
    };

    const teamMemberBioStyle: CSSProperties = {
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
                    become increasingly challenging. Our team of productivity
                    enthusiasts and software developers came together with a
                    shared vision: to create a tool that would help people stay
                    focused, track their progress, and achieve their goals.
                </p>
                <p style={paragraphStyle}>
                    Since our launch in 2023, we've helped thousands of users
                    improve their productivity and achieve their goals. Our
                    commitment to continuous improvement and user feedback has
                    made FocusFlow one of the most trusted productivity tools
                    available today.
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>Our Values</h2>
                <div style={valuesGridStyle}>
                    <div style={valueCardStyle}>
                        <UserGroupIcon style={valueIconStyle} />
                        <h3 style={valueTitleStyle}>User-Centric</h3>
                        <p style={valueDescriptionStyle}>
                            We put our users first, constantly seeking feedback
                            and improving our platform based on their needs.
                        </p>
                    </div>
                    <div style={valueCardStyle}>
                        <LightBulbIcon style={valueIconStyle} />
                        <h3 style={valueTitleStyle}>Innovation</h3>
                        <p style={valueDescriptionStyle}>
                            We continuously explore new ways to enhance
                            productivity and user experience.
                        </p>
                    </div>
                    <div style={valueCardStyle}>
                        <HeartIcon style={valueIconStyle} />
                        <h3 style={valueTitleStyle}>Passion</h3>
                        <p style={valueDescriptionStyle}>
                            We're passionate about helping people achieve their
                            goals and reach their full potential.
                        </p>
                    </div>
                    <div style={valueCardStyle}>
                        <ShieldCheckIcon style={valueIconStyle} />
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
                            src="/team/john-doe.jpg"
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
                            src="/team/jane-smith.jpg"
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
                            src="/team/mike-johnson.jpg"
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
                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                    <RocketLaunchIcon
                        style={{
                            width: "4rem",
                            height: "4rem",
                            color: "var(--color-primary-600)",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
