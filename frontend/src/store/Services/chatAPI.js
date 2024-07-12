import { apiSlice } from "../API/apiSlice";
import { populateChats } from "../Features/Chat/chatSlice";

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    accessChat: builder.mutation({
      query: (userId) => ({
        url: `/chat/accessChat`,
        method: `POST`,
        body: {
          userId: userId,
        },
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
        url: `/chat/createGroup`,
        method: `POST`,
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
    }),

    renameGroup: builder.mutation({
      query: (data) => ({
        url: `/chat/renameGroup`,
        method: `POST`,
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
    }),

    addGroupMember: builder.mutation({
      query: (data) => ({
        url: `/chat/addGroupMember`,
        method: `PUT`,
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
    }),

    removeGroupMember: builder.mutation({
      query: (data) => ({
        url: `/chat/removeGroupMember`,
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
  useAddGroupMemberMutation,
  useRemoveGroupMemberMutation,
} = chatApiSlice;
