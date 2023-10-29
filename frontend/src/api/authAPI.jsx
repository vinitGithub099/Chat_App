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
      console.log(result);
      return result.data;
    } else {
      throw new Error(result.message);
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
      throw new Error(result.mewssage);
    }
  },
};
