import api from "./axiosConfigs";

export const messageAPI = {
  sendMessage: async (data) => {
    try {
      const result = await api.request({
        url: `/message/sendMessage`,
        method: `POST`,
        data: data,
        headers: { "Content-Type": "application/json" },
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  fetchChatMessages: async (id) => {
    try {
      const result = await api.request({
        url: `/message/messages/${id}`,
        method: `GET`,
        headers: { "Content-Type": "application/json" },
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
