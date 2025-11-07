import React from "react";

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
    width: "4.5rem",
    height: "4.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 0 auto",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    transition: "transform 0.18s, filter 0.18s",
};

const heroStyle = {
    background:
        "linear-gradient(100deg, var(--color-primary-700) 0%, var(--color-cyan-100) 60%, var(--color-primary-200) 100%)",
    color: "var(--color-primary-800)",
    borderRadius: "1.5rem",
    padding: "2.5rem 2rem 2rem 2rem",
    marginBottom: "2.5rem",
    boxShadow: "0 4px 32px 0 rgba(0,0,0,0.10)",
    position: "relative",
    textAlign: "center",
};

const titleStyle = {
    fontSize: "2.3rem",
    fontWeight: 900,
    color: "var(--color-primary-900)",
    margin: 0,
    letterSpacing: "-1px",
    textShadow: "0 2px 8px rgba(0,0,0,0.10)",
    textAlign: "center",
    fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
};

const subtitleStyle = {
    color: "var(--color-cyan-900)",
    fontSize: "1.18rem",
    maxWidth: 600,
    margin: "1.2rem auto 0 auto",
    fontWeight: 500,
    lineHeight: 1.6,
    textAlign: "center",
};

export default function HeroSection({ title, subtitle, icon }) {
    return (
        <section style={heroStyle}>
            <div style={heroAccentBarStyle} />
            {icon && <div style={heroIconCircleStyle}>{icon}</div>}
            <h1 style={titleStyle}>{title}</h1>
            {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
        </section>
    );
}
