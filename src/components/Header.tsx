import type { CSSProperties } from "react";

const Header = () => {
    const containerStyle: CSSProperties = {
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "1rem 2rem",
        background:
            "linear-gradient(to right, var(--color-primary-500), var(--color-cyan-400))",
        borderBottom: "4px solid var(--color-primary-600)",
        boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        position: "sticky",
        top: 0,
        zIndex: 30,
    };

    const logoStyle: CSSProperties = {
        height: "2.5rem",
        width: "2.5rem",
        marginRight: "1rem",
        filter: "drop-shadow(0 4px 3px rgba(0, 0, 0, 0.07)) drop-shadow(0 2px 2px rgba(0, 0, 0, 0.06))",
    };

    const titleStyle: CSSProperties = {
        fontSize: "1.5rem",
        fontWeight: 800,
        letterSpacing: "-0.025em",
        color: "var(--color-white)",
        filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.05))",
    };

    return (
        <header style={containerStyle}>
            <img src="/logo.svg" alt="FocusFlow" style={logoStyle} />
            <span style={titleStyle}>FocusFlow</span>
        </header>
    );
};

export default Header;
