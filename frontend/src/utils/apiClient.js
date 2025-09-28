import axios from 'axios';
const API_URL = 'http://localhost:8000/api'; 
// Create a single axios instance for your entire app
const apiClient = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Request interceptor - automatically adds token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('Request headers:', config.headers); // Debug log
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handles token expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('access_token');
      console.log('Session expired. Please log in again.');
      
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;