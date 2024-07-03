import { apiSlice } from "../API/apiSlice";
import { setCredentials } from "../Features/Auth/AuthSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `/user/login`,
        method: `POST`,
        body: { ...credentials },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Assuming the response contains accessToken and user data
          dispatch(
            setCredentials({ user: data.user, accessToken: data.accessToken })
          );
        } catch (err) {
          // Handle error
          console.error("Login failed", err);
        }
      },
    }),

    register: builder.mutation({
      query: (credentials) => ({
        url: `/user/register`,
        method: `POST`,
        body: { ...credentials },
      }),
    }),

    searchUser: builder.query({
      query: (query) => ({
        url: `/user/allUsers`,
        method: `GET`,
        headers: { "Content-Type": "application/json" },
        params: {
          search: query,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLazySearchUserQuery } =
  authApiSlice;
