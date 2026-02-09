import { apiCall } from "./api";

/**
 * Create a new group session
 */
export const createGroupSession = async (data) => {
    return apiCall("/group-sessions", {
        method: "POST",
        body: JSON.stringify(data),
    });
};

/**
 * Get group sessions for a community
 */
export const getCommunityGroupSessions = async (communityId, options = {}) => {
    const { status, page = 1, limit = 20 } = options;
    const params = new URLSearchParams({ page, limit });
    if (status) params.append("status", status);

    return apiCall(`/group-sessions/community/${communityId}?${params}`);
};

/**
 * Get a single group session
 */
export const getGroupSession = async (sessionId) => {
    return apiCall(`/group-sessions/${sessionId}`);
};

/**
 * Join a group session
 */
export const joinGroupSession = async (sessionId) => {
    return apiCall(`/group-sessions/${sessionId}/join`, {
        method: "POST",
    });
};

/**
 * Leave a group session
 */
export const leaveGroupSession = async (sessionId) => {
    return apiCall(`/group-sessions/${sessionId}/leave`, {
        method: "POST",
    });
};

/**
 * Update participant status
 */
export const updateParticipantStatus = async (sessionId, status) => {
    return apiCall(`/group-sessions/${sessionId}/status`, {
        method: "PUT",
        body: JSON.stringify({ status }),
    });
};

/**
 * Start a group session (host only)
 */
export const startGroupSession = async (sessionId) => {
    return apiCall(`/group-sessions/${sessionId}/start`, {
        method: "POST",
    });
};

/**
 * Advance session to next phase (host only)
 */
export const advanceGroupSession = async (sessionId) => {
    return apiCall(`/group-sessions/${sessionId}/advance`, {
        method: "POST",
    });
};

/**
 * Cancel a group session (host only)
 */
export const cancelGroupSession = async (sessionId) => {
    return apiCall(`/group-sessions/${sessionId}`, {
        method: "DELETE",
    });
};

/**
 * Send heartbeat
 */
export const sendHeartbeat = async (sessionId) => {
    return apiCall(`/group-sessions/${sessionId}/heartbeat`, {
        method: "POST",
    });
};



export const groupSessionAPI = {
    createGroupSession,
    getCommunityGroupSessions,
    getGroupSession,
    joinGroupSession,
    leaveGroupSession,
    updateParticipantStatus,
    startGroupSession,
    advanceGroupSession,
    cancelGroupSession,
    sendHeartbeat,
};

export default groupSessionAPI;
