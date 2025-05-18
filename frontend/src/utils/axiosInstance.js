import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9876', // common base URL
  headers: {
    'Content-Type': 'application/json',
  },
});


export default axiosInstance;