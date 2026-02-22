import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000/api';

// No need for a separate getAuthHeader if we use interceptors

// Add interceptor to inject token automatically
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token && !config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add response interceptor to handle token expiration
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Sessions
export const listSessions = () => axios.get(`${API_BASE}/session/list/`);
export const createSession = (title) => axios.post(`${API_BASE}/session/create/`, { title });
export const deleteSession = (id) => axios.delete(`${API_BASE}/session/delete/${id}/`);

// Paragraphs
export const listParagraphs = (sessionId) => axios.get(`${API_BASE}/paragraph/list/${sessionId}/`);
export const createParagraph = (sessionId, content) => axios.post(`${API_BASE}/paragraph/create/`, { session: sessionId, content });

// AI
export const generateScript = (data) => axios.post(`${API_BASE}/generate/`, data);
export const writerAPI = (data) => axios.post(`${API_BASE}/writer/`, data);
export const enhanceParagraph = (data) => axios.post(`${API_BASE}/enhance/`, data);
export const fetchStats = () => axios.get(`${API_BASE}/stats/`);
