import axios from 'axios';
import { getToken } from '../utils/authUtils';

axios.interceptors.request.use((config) => {
  const token = getToken();
  const requestConfig = config;
  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }
  return requestConfig;
}, (error) => Promise.reject(error));

export default axios;
