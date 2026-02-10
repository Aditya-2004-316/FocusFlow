import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem("theme");
        return saved ? saved === "dark" : true; // Default to dark
    });
    const [glassIntensity, setGlassIntensity] = useState(() => {
        const saved = localStorage.getItem("glassIntensity");
        return saved || "medium";
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDarkMode);
        document.body.classList.toggle("dark", isDarkMode);
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);

    useEffect(() => {
        document.documentElement.setAttribute("data-glass", glassIntensity);
        localStorage.setItem("glassIntensity", glassIntensity);
    }, [glassIntensity]);

    const toggleTheme = () => setIsDarkMode(prev => !prev);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, setIsDarkMode, glassIntensity, setGlassIntensity }}>
            {children}
        </ThemeContext.Provider>
    );
};
