import api from "./axiosConfigs";

export const authAPI = {
  loginUser: async (data) => {
    const result = await api.request({
      url: `/user/login`,
      method: `POST`,
      data: data,
      signal: new AbortController().signal,
      headers: { "Content-Type": "application/json" },
    });
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error(result);
    }
  },
  registerUser: async (data) => {
    const result = await api.request({
      url: `/user/register`,
      method: `POST`,
      data: data,
      signal: new AbortController().signal,
      headers: { "Content-Type": "application/json" },
    });
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error(result);
    }
  },
  searchUser: async (query) => {
    const result = await api.request({
      url: `/user/allUsers`,
      method: `GET`,
      signal: new AbortController().signal,
      headers: { "Content-Type": "application/json" },
      params: {
        search: query,
      },
    });
    if (result.status === 200) {
      console.log(result);
      return result.data;
    } else {
      throw new Error(result);
    }
  },
  refreshToken: async () => {
    const result = await api.request({
      url: `/user/refresh-token`,
      method: `POST`,
      signal: new AbortController().signal,
      headers: { "Content-Type": "application/json" },
    });
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error(result);
    }
  },
  autoLogin: async () => {
    const result = await api.request({
      url: `/user/auto-login`,
      method: `POST`,
      signal: new AbortController().signal,
      headers: { "Content-Type": "application/json" },
    });
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error(result);
    }
  },
  logout: async () => {
    const result = await api.request({
      url: `/user/logout`,
      method: `POST`,
      signal: new AbortController().signal,
      headers: { "Content-Type": "application/json" },
    });
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error(result);
    }
  },
};
