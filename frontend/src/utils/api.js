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
            const errorData = await response.clone().json().catch(() => ({}));

            // If it's an email verification error, don't logout, just let the UI handle it
            if (errorData.isEmailVerificationError) {
                throw new Error("unverified_email");
            }

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
                        const msg = errorData.error || errorData.message || `API Error: ${retryResponse.status}${retryResponse.statusText ? ` ${retryResponse.statusText}` : ''}`;
                        throw new Error(msg);
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
            // In HTTP/2 (used by most cloud hosts), statusText is always empty.
            // Fall back to the status code so the error is always meaningful.
            const errorMessage = error.error || error.message || `API Error: ${response.status}${response.statusText ? ` ${response.statusText}` : ''}`;
            throw new Error(errorMessage);
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
