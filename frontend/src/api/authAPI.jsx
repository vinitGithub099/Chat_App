import { api } from "./axiosConfigs";

export const authAPI = {
  loginUser: async (data) => {
    const result = await api.request({
      url: `/login`,
      method: `POST`,
      data: data,
      signal: new AbortController().signal,
      headers: { "Content-Type": "application/json" },
    });
    if (result.status === 200) {
      return result.data;
    } else {
      return result.message;
    }
  },
  registerUser: async (data) => {
    const result = await api.request({
      url: `/register`,
      method: `POST`,
      data: data,
      signal: new AbortController().signal,
      headers: { "Content-Type": "application/json" },
    });
    if (result.status === 200) {
      return result.data;
    } else {
      return result.message;
    }
  },
};
