import axios from "axios";
// import { cookies } from 'next/headers';

export const axiosInstance = axios.create({
  baseURL: `http://127.0.0.1:8000/api/`,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
