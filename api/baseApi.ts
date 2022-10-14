import axios from 'axios';

export const baseAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
});
