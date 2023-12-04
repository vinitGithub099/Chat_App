import api from "./axiosConfigs";

export const chatAPI = {
  accessChat: async (data) => {
    try {
      const result = await api.request({
        url: `/chat/accessChat`,
        method: `POST`,
        data: data,
        headers: { "Content-Type": "application/json" },
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  fetchChats: async (data) => {
    try {
      const result = await api.request({
        url: `/chat/fetchChats`,
        method: `GET`,
        data: data,
        headers: { "Content-Type": "application/json" },
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  createGroupChat: async (data) => {
    try {
      const result = await api.request({
        url: `/chat/groupChat`,
        method: `POST`,
        data: data,
        headers: { "Content-Type": "application/json" },
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  renameGroup: async (data) => {
    try {
      const result = await api.request({
        url: `/chat/groupChat`,
        method: `POST`,
        data: data,
        headers: { "Content-Type": "application/json" },
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  addToGroup: async (data) => {
    try {
      const result = await api.request({
        url: `/chat/addToGroup`,
        method: `PUT`,
        data: data,
        headers: { "Content-Type": "application/json" },
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  removeFromGroup: async (data) => {
    try {
      const result = await api.request({
        url: `/chat/removeFromGroup`,
        method: `PUT`,
        data: data,
        headers: { "Content-Type": "application/json" },
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
