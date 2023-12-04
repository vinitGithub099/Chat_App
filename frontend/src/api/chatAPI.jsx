import api from "./axiosConfigs";

export const chatAPI = {
  accessChat: async (data) => {
    const result = await api.request({
      url: `/chat/accessChat`,
      method: `POST`,
      data: data,
      headers: { "Content-Type": "application/json" },
    });
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  },
  fetchChats: async (data) => {
    const result = await api.request({
      url: `/chat/fetchChats`,
      method: `GET`,
      data: data,
      headers: { "Content-Type": "application/json" },
    });
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  },
  createGroupChat: async (data) => {
    const result = await api.request({
      url: `/chat/groupChat`,
      method: `POST`,
      data: data,
      headers: { "Content-Type": "application/json" },
    });
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  },
  renameGroup: async (data) => {
    const result = await api.request({
      url: `/chat/groupChat`,
      method: `POST`,
      data: data,
      headers: { "Content-Type": "application/json" },
    });
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  },
  addToGroup: async (data) => {
    const result = await api.request({
      url: `/chat/addToGroup`,
      method: `PUT`,
      data: data,
      headers: { "Content-Type": "application/json" },
    });
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  },
  removeFromGroup: async (data) => {
    const result = await api.request({
      url: `/chat/removeFromGroup`,
      method: `PUT`,
      data: data,
      headers: { "Content-Type": "application/json" },
    });
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  },
};
