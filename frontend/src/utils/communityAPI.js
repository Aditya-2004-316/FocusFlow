import { apiCall } from "./api";

// Communities
export const communityAPI = {
    getCommunities: (page = 1, limit = 20) =>
        apiCall(`/communities?page=${page}&limit=${limit}`),
    getCommunity: (id) => apiCall(`/communities/${id}`),
    createCommunity: (data) =>
        apiCall("/communities", { method: "POST", body: JSON.stringify(data) }),
    updateCommunity: (id, data) =>
        apiCall(`/communities/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    deleteCommunity: (id) =>
        apiCall(`/communities/${id}`, { method: "DELETE" }),
    joinCommunity: (id) =>
        apiCall(`/communities/${id}/join`, { method: "POST" }),
    leaveCommunity: (id) =>
        apiCall(`/communities/${id}/leave`, { method: "POST" }),
    approveJoinRequest: (id, userId) =>
        apiCall(`/communities/${id}/join-request/approve`, { method: "POST", body: JSON.stringify({ userId }) }),
    rejectJoinRequest: (id, userId) =>
        apiCall(`/communities/${id}/join-request/reject`, { method: "POST", body: JSON.stringify({ userId }) }),
    getMembers: (id) => apiCall(`/communities/${id}/members`),
    assignMemberRole: (id, userId, role) =>
        apiCall(`/communities/${id}/members/${userId}/role`, { method: "PUT", body: JSON.stringify({ role }) }),
    removeMember: (id, userId) =>
        apiCall(`/communities/${id}/members/${userId}`, { method: "DELETE" }),
    createCustomRole: (id, data) =>
        apiCall(`/communities/${id}/custom-roles`, { method: "POST", body: JSON.stringify(data) }),
    deleteCustomRole: (id, roleName) =>
        apiCall(`/communities/${id}/custom-roles/${encodeURIComponent(roleName)}`, { method: "DELETE" }),
};

// Posts
export const postAPI = {
    getPosts: (communityId, page = 1, limit = 20) =>
        apiCall(`/communities/${communityId}/posts?page=${page}&limit=${limit}`),
    getPost: (communityId, postId) =>
        apiCall(`/communities/${communityId}/posts/${postId}`),
    createPost: (communityId, data) =>
        apiCall(`/communities/${communityId}/posts`, { method: "POST", body: JSON.stringify(data) }),
    updatePost: (communityId, postId, data) =>
        apiCall(`/communities/${communityId}/posts/${postId}`, { method: "PUT", body: JSON.stringify(data) }),
    deletePost: (communityId, postId) =>
        apiCall(`/communities/${communityId}/posts/${postId}`, { method: "DELETE" }),
    reactToPost: (communityId, postId, reactionType) =>
        apiCall(`/communities/${communityId}/posts/${postId}/react`, { method: "POST", body: JSON.stringify({ reactionType }) }),
    removeReactionFromPost: (communityId, postId, reactionType) =>
        apiCall(`/communities/${communityId}/posts/${postId}/react/${reactionType}`, { method: "DELETE" }),
};

// Comments
export const commentAPI = {
    getComments: (communityId, postId, page = 1, limit = 20) =>
        apiCall(`/communities/${communityId}/posts/${postId}/comments?page=${page}&limit=${limit}`),
    createComment: (communityId, postId, data) =>
        apiCall(`/communities/${communityId}/posts/${postId}/comments`, { method: "POST", body: JSON.stringify(data) }),
    updateComment: (communityId, postId, commentId, data) =>
        apiCall(`/communities/${communityId}/posts/${postId}/comments/${commentId}`, { method: "PUT", body: JSON.stringify(data) }),
    deleteComment: (communityId, postId, commentId) =>
        apiCall(`/communities/${communityId}/posts/${postId}/comments/${commentId}`, { method: "DELETE" }),
    reactToComment: (communityId, postId, commentId, reactionType) =>
        apiCall(`/communities/${communityId}/posts/${postId}/comments/${commentId}/react`, { method: "POST", body: JSON.stringify({ reactionType }) }),
};

// Chat
export const chatAPI = {
    getMessages: (communityId) => apiCall(`/chat/${communityId}`),
    sendMessage: (communityId, content) =>
        apiCall(`/chat/${communityId}`, {
            method: "POST",
            body: JSON.stringify({ content }),
        }),
};