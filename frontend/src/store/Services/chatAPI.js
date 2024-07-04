import { apiSlice } from "../API/apiSlice";
import { populateChats } from "../Features/Chat/ChatSlice";

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    accessChat: builder.mutation({
      query: (data) => ({
        url: `/chat/accessChat`,
        method: `POST`,
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
    }),

    fetchChats: builder.query({
      query: (data) => ({
        url: `/chat/fetchChats`,
        method: `GET`,
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(populateChats(data));
        } catch (err) {
          // Handle error
          console.error("Couldn't fetch chats", err);
        }
      },
    }),

    createGroupChat: builder.mutation({
      query: (data) => ({
        url: `/chat/groupChat`,
        method: `POST`,
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
    }),

    renameGroup: builder.mutation({
      query: (data) => ({
        url: `/chat/groupChat`,
        method: `POST`,
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
    }),

    addToGroup: builder.mutation({
      query: (data) => ({
        url: `/chat/addToGroup`,
        method: `PUT`,
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
    }),

    removeFromGroup: builder.mutation({
      query: (data) => ({
        url: `/chat/removeFromGroup`,
        method: `PUT`,
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
    }),
  }),
});

export const {
  useAccessChatMutation,
  useLazyFetchChatsQuery,
  useCreateGroupChatMutation,
  useRenameGroupMutation,
  useAddToGroupMutation,
  useRemoveFromGroupMutation,
} = chatApiSlice;
