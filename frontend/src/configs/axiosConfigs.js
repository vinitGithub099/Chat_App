import axios from "axios";
import { authAPI } from "../api/authAPI";
import { BASE_URL } from "./baseURL";
import { PERSIST_AUTH_KEY } from "./keys";

const baseUrl = `${BASE_URL}/api`;

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default api;

/**
 * @description Register user
 * @purpose to append token to the header of every request made via the "api" axios instance
 */
api.interceptors.request.use(
  (config) => {
    const key = PERSIST_AUTH_KEY;
    const authInfo = localStorage.getItem(key);
    const parsedAuthInfo = JSON.parse(authInfo);
    let accessToken;
    if (parsedAuthInfo && parsedAuthInfo.token) {
      accessToken = JSON.parse(parsedAuthInfo.token);
    }
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
        const key = PERSIST_AUTH_KEY;
        const authInfo = localStorage.getItem(key);
        const parsedAuthInfo = JSON.parse(authInfo);
        if (parsedAuthInfo) {
          parsedAuthInfo.token = accessToken;
        }
        localStorage.setItem(key, JSON.stringify(parsedAuthInfo));
      } catch (error) {
        throw new Error(error);
      }

      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);
