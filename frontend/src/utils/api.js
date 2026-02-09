/**
 * Shared API Client
 * Handles token injection, refresh logic, and global session management
 */

import { API_BASE_URL as API_BASE } from "../config/api";

// Helper to notify the app when session expires
const notifySessionExpired = () => {
    window.dispatchEvent(new CustomEvent("auth-session-expired"));
};

export const apiCall = async (endpoint, options = {}) => {
    const url = `${API_BASE}${endpoint}`;

    // Get token from localStorage
    const token = localStorage.getItem("token");

    // Build headers
    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    // Add Authorization header if token exists
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, {
            credentials: "include",
            ...options,
            headers,
        });

        // If we get a 401, try to refresh the token once and retry
        if (response.status === 401) {
            console.warn("Access token expired, attempting refresh...");
            const refreshResult = await fetch(`${API_BASE}/auth/refresh-token`, {
                method: "POST",
                credentials: "include",
            }).catch(() => null);

            if (refreshResult && refreshResult.ok) {
                const refreshData = await refreshResult.json();
                if (refreshData.success && refreshData.data.token) {
                    console.log("Token refreshed successfully.");
                    localStorage.setItem("token", refreshData.data.token);
                    const newHeaders = {
                        ...headers,
                        "Authorization": `Bearer ${refreshData.data.token}`,
                    };
                    const retryResponse = await fetch(url, {
                        credentials: "include",
                        ...options,
                        headers: newHeaders,
                    });

                    if (!retryResponse.ok) {
                        const errorData = await retryResponse.json().catch(() => ({}));
                        throw new Error(errorData.error || `API Error: ${retryResponse.statusText}`);
                    }
                    return await retryResponse.json();
                }
            }

            // If refresh fails or no token in refresh response
            console.error("Session expired permanently.");
            localStorage.removeItem("token");
            notifySessionExpired();
            throw new Error("Session expired. Please log in again.");
        }

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.error || `API Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        if (error.message === "Session expired. Please log in again.") {
            throw error;
        }
        console.error(`API Call failed [${endpoint}]:`, error);
        throw error;
    }
};
