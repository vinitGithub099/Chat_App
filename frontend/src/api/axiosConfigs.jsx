import axios from "axios";

const baseUrl = "http://localhost:5000/api";

const api = axios.create({
  baseURL: baseUrl,
});

export default api;

/**
 * @description Register user
 * @purpose to append token to the header of every request made via the "api" axios instance
 */
api.interceptors.request.use(
  (config) => {
    console.log("request interceptor");
    const accessToken = localStorage.getItem("access_token");
    console.log("access_token: ", accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log("config: ", config);
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
    console.log("response interceptor");

    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // const refreshToken = localStorage.getItem('refreshToken');

        console.log("accessToken expired response interceptor");
        const response = await api.request({
          url: `/user/login`,
          method: `POST`,
          signal: new AbortController().signal,
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        console.log("response interceptor response: ", response);
        const { accessToken } = response.data;

        localStorage.setItem("access_token", accessToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
      }
    }

    return Promise.reject(error);
  }
);
