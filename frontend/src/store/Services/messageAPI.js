import { apiSlice } from "../API/apiSlice";

export const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: `/message/sendMessage`,
        method: `POST`,
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
    }),

    fetchChatMessages: builder.query({
      query: (chatId) => ({
        url: `/message/messages/${chatId}`,
        method: `GET`,
        headers: { "Content-Type": "application/json" },
      }),
    }),
  }),
});

export const { useSendMessageMutation, useLazyFetchChatMessagesQuery } =
  messageApiSlice;
