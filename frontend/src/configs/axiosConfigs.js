/* 
useful links:

https://medium.com/@alokprakash9431810899/how-to-setup-axios-interceptor-independently-with-redux-in-react-a6fe3fd8f4c4

https://dev.to/mihaiandrei97/jwt-authentication-using-axios-interceptors-55be

*/

import axios from "axios";
import { authAPI } from "../api/authAPI";
import store from "../store/store";
import { BASE_URL } from "./baseURL";

const baseUrl = `${BASE_URL}/api`;

// custom url endpoint
const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default api;

// function to configure axios interceptors
export const configureAxios = () => {
  console.log("axios configured!");

  // request interceptor
  api.interceptors.request.use(
    (config) => {
      console.log(
        "req interceptor success! req interceptor success! req interceptor success!"
      );
      const state = store.getState();
      const accessToken = state.auth.token;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // response interceptor
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          console.log(
            "refresh token api hit! refresh token api hit! refresh token api hit! "
          );

          const refreshResponse = await authAPI.refreshToken();

          console.log(
            "refresh token api success! refresh token api success! refresh token api success! "
          );

          console.log(refreshResponse);
          const newAccessToken = refreshResponse.accessToken;

          // Update the Redux store with the new token
          store.dispatch({ type: "auth/setToken", payload: newAccessToken });

          // Update the authorization header in the original request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          console.log(
            "original req retry! original req retry! original req retry! "
          );

          return api(originalRequest);
        } catch (refreshError) {
          console.log(
            "refresh token expired! refresh token expired! refresh token expired! "
          );
          store.dispatch({ type: "auth/logout" });
          originalRequest._retry = false;
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
};
