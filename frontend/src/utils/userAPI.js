import { apiCall } from "./api";

export const userAPI = {
    // Get recent activity
    getRecentActivity: () => apiCall("/users/activity"),
};
