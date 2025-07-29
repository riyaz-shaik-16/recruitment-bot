import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:9876",
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔒 Add token to request headers if it exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // adjust the key if stored under a different name
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// const navigate = useNavigate();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.log("Error Response: ", error.response);
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.warn('Bad Request:', data?.message || 'Invalid input.');
          // alert(data?.message || 'Bad Request: Check your input.');
          // navigate("/login")
          break;
        case 401:
          console.warn('Unauthorized');
          break;
        case 403:
          console.warn('Forbidden');
          break;
        case 500:
          console.error('Server Error');
          break;
        default:
          console.error('Unhandled error:', status);
      }
    } else {
      console.error('Network error or server not reachable');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
