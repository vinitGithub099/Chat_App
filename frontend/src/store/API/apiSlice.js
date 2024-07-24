import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../configs/baseURL";
import { logout, setCredentials } from "../Features/Auth/authSlice";

const baseUrl = `${BASE_URL}/api`;

const abortControllersMap = new Map();

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions = {}) => {
  const shouldAbort = extraOptions.shouldAbort;
  let signal = api.signal;

  if (shouldAbort) {
    // Unique key for the request based on its URL and method
    const requestKey = `${args.url}_${args.method}`;

    // Abort any previous requests with the same key
    if (abortControllersMap.has(requestKey)) {
      abortControllersMap.get(requestKey).abort();
    }

    // Create a new AbortController for the current request
    const abortController = new AbortController();
    abortControllersMap.set(requestKey, abortController);
    signal = abortController.signal;

    // Attach the signal to the args
    args.signal = signal;
  }

  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 401 || result?.error?.status === 401) {
    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      { url: "/user/refreshToken", method: "GET" },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  if (shouldAbort) {
    // Cleanup the abort controller for the completed request
    const requestKey = `${args.url}_${args.method}`;
    abortControllersMap.delete(requestKey);
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
