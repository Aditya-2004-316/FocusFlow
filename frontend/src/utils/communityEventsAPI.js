import { apiCall } from "./api";

/**
 * Community Events API
 * Handles fetching personalized community events
 */

export const communityEventsAPI = {
    /**
     * Get personalized community events for the current user
     * @returns {Promise} - Response with 3 events based on user's account age
     */
    getPersonalizedEvents: () => apiCall("/community-events"),
};

export default communityEventsAPI;
