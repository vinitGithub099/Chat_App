import { apiSlice } from "../API/apiSlice";
import { setCredentials } from "../Features/Auth/authSlice";

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

    fetchUsers: builder.query({
      query: (query) => ({
        url: `/user/fetchUsers`,
        method: `GET`,
        headers: { "Content-Type": "application/json" },
        params: {
          search: query,
        },
      }),
      extraOptions: { shouldAbort: true },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLazyFetchUsersQuery } =
  authApiSlice;
