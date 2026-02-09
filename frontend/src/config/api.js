// API Configuration for FocusFlow Frontend
// This file centralizes all API endpoint configurations

// Get API URL from environment variable, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_BASE_URL = `${API_URL}/api`;

// Centralized API endpoints
export const API_ENDPOINTS = {
  auth: {
    register: `${API_BASE_URL}/auth/register`,
    login: `${API_BASE_URL}/auth/login`,
    logout: `${API_BASE_URL}/auth/logout`,
    me: `${API_BASE_URL}/auth/me`,
    refresh: `${API_BASE_URL}/auth/refresh`,
    forgotPassword: `${API_BASE_URL}/auth/forgot-password`,
    resetPassword: `${API_BASE_URL}/auth/reset-password`,
  },
  users: {
    profile: `${API_BASE_URL}/users/profile`,
    update: `${API_BASE_URL}/users/profile`,
    delete: `${API_BASE_URL}/users/profile`,
    avatar: `${API_BASE_URL}/users/avatar`,
  },
  timers: {
    list: `${API_BASE_URL}/timers`,
    create: `${API_BASE_URL}/timers`,
    getById: (id) => `${API_BASE_URL}/timers/${id}`,
    update: (id) => `${API_BASE_URL}/timers/${id}`,
    delete: (id) => `${API_BASE_URL}/timers/${id}`,
    start: (id) => `${API_BASE_URL}/timers/${id}/start`,
    pause: (id) => `${API_BASE_URL}/timers/${id}/pause`,
    complete: (id) => `${API_BASE_URL}/timers/${id}/complete`,
  },
  distractions: {
    list: `${API_BASE_URL}/distractions`,
    create: `${API_BASE_URL}/distractions`,
    getById: (id) => `${API_BASE_URL}/distractions/${id}`,
    update: (id) => `${API_BASE_URL}/distractions/${id}`,
    delete: (id) => `${API_BASE_URL}/distractions/${id}`,
  },
  stats: {
    overview: `${API_BASE_URL}/stats/overview`,
    detailed: `${API_BASE_URL}/stats/detailed`,
    daily: `${API_BASE_URL}/stats/daily`,
    weekly: `${API_BASE_URL}/stats/weekly`,
    monthly: `${API_BASE_URL}/stats/monthly`,
  },
  settings: {
    get: `${API_BASE_URL}/settings`,
    update: `${API_BASE_URL}/settings`,
    reset: `${API_BASE_URL}/settings/reset`,
  },
};

// Default fetch options with credentials enabled
export const defaultFetchOptions = {
  credentials: 'include', // Important: enables cookies to be sent
  headers: {
    'Content-Type': 'application/json',
  },
};

// Helper function for making API calls
export const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...defaultFetchOptions,
      ...options,
      headers: {
        ...defaultFetchOptions.headers,
        ...options.headers,
      },
    });

    // Handle different response types
    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      // Extract error message from response
      const errorMessage = data?.message || data?.error || 'An error occurred';
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Export the base URL for cases where full control is needed
export default API_URL;
