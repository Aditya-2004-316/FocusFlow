import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { API_BASE_URL as API_BASE } from "../config/api";
import { useAuth } from "./AuthContext";

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    const { isAuthenticated, user } = useAuth();
    const [settings, setSettings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Track the user ID whose settings are currently loaded so we can
    // detect when the active user changes (e.g., logout then re-login in the
    // same browser session) and force a fresh fetch for the new user.
    const loadedForUserId = useRef(null);

    const fetchSettings = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setSettings(null);
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
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

    // Re-fetch (or clear) settings whenever the auth state changes.
    // This ensures that:
    //  - Settings are loaded when a user logs in.
    //  - Stale settings from a previous user are cleared on logout.
    //  - If a different user logs in during the same session, their own
    //    settings are fetched (not the previous user's cached data).
    useEffect(() => {
        if (!isAuthenticated) {
            // User logged out — clear settings immediately so no stale data leaks.
            setSettings(null);
            loadedForUserId.current = null;
            setIsLoading(false);
            return;
        }

        const currentUserId = user?._id || user?.id || null;

        // If we already have settings for this exact user, skip re-fetching.
        if (currentUserId && loadedForUserId.current === currentUserId) {
            return;
        }

        // New user detected — fetch their settings and record which user we loaded for.
        loadedForUserId.current = currentUserId;
        fetchSettings();
    }, [isAuthenticated, user?._id, user?.id, fetchSettings]);

    const updateSettings = (newSettings) => {
        setSettings(prev => ({
            ...prev,
            ...newSettings,
        }));
    };

    return (
        <SettingsContext.Provider value={{ settings, isLoading, fetchSettings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};
