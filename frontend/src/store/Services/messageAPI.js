import { apiSlice } from "../API/apiSlice";
import { populateMessages } from "../Features/Message/messageSlice";

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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(populateMessages(data));
        } catch (err) {
          console.error("couldn't fech chat messages");
        }
      },
    }),
  }),
});

export const { useSendMessageMutation, useLazyFetchChatMessagesQuery } =
  messageApiSlice;
