import api from "./axiosConfigs";

export const messageAPI = {
  sendMessage: async (data) => {
    const result = await api.request({
      url: `/message/sendMessage`,
      method: `POST`,
      data: data,
      headers: { "Content-Type": "application/json" },
    });
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error(result);
    }
  },
  fetchChatMessages: async (id) => {
    const result = await api.request({
      url: `/message/messages/${id}`,
      method: `GET`,
      headers: { "Content-Type": "application/json" },
    });
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error(result);
    }
  },
};
