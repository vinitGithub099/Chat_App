import axios from "axios";
import { authAPI } from "./authAPI";

const baseUrl = import.meta.env.PROD
  ? "https://chat-app-backend-f9vy.onrender.com/api"
  : "http://localhost:5000/api";

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default api;

/**
 * @description Regisater user
 * @purpose to append token to the header of every request made via the "api" axios instance
 */
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * @description Register user
 * @purpose handle JWT token expiration
 * * If a request receives a 401 error (Unauthorized) and there is a JWT refreshToken available, use it to fetch a new JWT authToken and update it in localStorage. Then retry the original request with the new authToken.
 */

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      let accessToken;

      try {
        const res = await authAPI.refreshToken();
        accessToken = res.accessToken;
        localStorage.setItem("access_token", accessToken);
      } catch (error) {
        throw new Error(error);
      }

      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);
