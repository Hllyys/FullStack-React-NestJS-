import axios from 'axios';

export const api = axios.create({
  baseURL:'https://jsonplaceholder.typicode.com',
  //baseURL: 'http://localhost:3001',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

//Request interceptor (opsiyonel: auth token ekleme vs.)
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (hataları yakala)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Backend’ten gelen hata
      const message =
        error.response.data?.message || 'An error occurred (Server error)';
      console.error('API Error:', message);
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Sunucuya ulaşılamadı
      console.error('API Error: The server cannot be reached');
      return Promise.reject(new Error('The server cannot be reached'));
    } else {
      // Axios dışında hata
      console.error('API Error:', error.message);
      return Promise.reject(new Error(error.message));
    }
  }
);
