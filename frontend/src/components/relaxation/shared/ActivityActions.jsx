import React from "react";

export const rowStyle = {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
    boxSizing: "border-box",
    padding: "0.25rem 0",
};

export const baseButtonStyle = {
    padding: "0.85rem 1.75rem",
    minHeight: "3rem",
    borderRadius: "0.9rem",
    border: "none",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    boxSizing: "border-box",
    transition: "all 0.2s ease",
};

export function ActionRow({ style, children }) {
    return <div style={{ ...rowStyle, ...(style || {}) }}>{children}</div>;
}

export function ActionButton({ style, children, ...rest }) {
    return (
        <button {...rest} style={{ ...baseButtonStyle, ...(style || {}) }}>
            {children}
        </button>
    );
}
