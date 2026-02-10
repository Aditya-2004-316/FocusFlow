import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { API_BASE_URL as API_BASE } from "../config/api";

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchSettings = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setIsLoading(false);
                return;
            }
            const res = await fetch(`${API_BASE}/settings`, {
                headers: { "Authorization": `Bearer ${token}` },
            });
            if (res.ok) {
                const json = await res.json();
                if (json?.success && json?.data?.settings) {
                    setSettings(json.data.settings);
                }
            }
        } catch (e) {
            console.error("Failed to fetch settings", e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    const updateSettings = (newSettings) => {
        setSettings(prev => ({
            ...prev,
            ...newSettings,
            // Deep merge logic if needed, but usually we pass partials
        }));
    };

    return (
        <SettingsContext.Provider value={{ settings, isLoading, fetchSettings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};
