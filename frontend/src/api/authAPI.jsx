import api from "../configs/axiosConfigs";

export const authAPI = {
  loginUser: async (data) => {
    try {
      const result = await api.request({
        url: `/user/login`,
        method: `POST`,
        data: data,
        headers: { "Content-Type": "application/json" },
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  registerUser: async (data) => {
    try {
      const result = await api.request({
        url: `/user/register`,
        method: `POST`,
        data: data,
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  searchUser: async (query) => {
    try {
      const result = await api.request({
        url: `/user/allUsers`,
        method: `GET`,
        headers: { "Content-Type": "application/json" },
        params: {
          search: query,
        },
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  refreshToken: async () => {
    try {
      const result = await api.request({
        url: `/user/refresh-token`,
        method: `POST`,
        headers: { "Content-Type": "application/json" },
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  logout: async () => {
    try {
      const result = await api.request({
        url: `/user/logout`,
        method: `POST`,
        headers: { "Content-Type": "application/json" },
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
