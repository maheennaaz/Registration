import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/api',
    withCredentials: true, // Required for HTTP-only cookies
    headers: {
        'Content-Type': 'application/json'
    }
});

export const authAPI = {
    register: async (userData) => {
        const response = await api.post('/register', userData);
        return response.data;
    },
    login: async (credentials) => {
        const response = await api.post('/login', credentials);
        return response.data;
    },
    logout: async () => {
        const response = await api.post('/logout'); // If you have a logout endpoint
        return response.data;
    }
};

export default api;
