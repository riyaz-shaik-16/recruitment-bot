import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://recruitment-bot-vercel.onrender.com', // common base URL
  headers: {
    'Content-Type': 'application/json',
  },
});


export default axiosInstance;