import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: 'https://recruitment-bot-vercel.onrender.com', // common base URL
  // baseURL:"http://localhost:9876",
  headers: {
    'Content-Type': 'application/json',
  },
});

// const navigate = useNavigate();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {

      console.log("Error Response: ",error.response);
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