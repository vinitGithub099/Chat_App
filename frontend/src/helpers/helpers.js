import { searchTabs } from "../constants/searchTabs";

export function handelTokenExpiration(error, dispatch) {
  if (
    error &&
    error.response &&
    (error.response.status === 403 || error.response.status === 401)
  ) {
    dispatch({ type: "auth/setTokenExpiration", payload: true });
  } else {
    dispatch({ type: "auth/setTokenExpiration", payload: false });
  }
}

export const getShortenedString = (str, limit = 20) => {
  let modifiedStr = str;
  if (modifiedStr?.length > limit) {
    modifiedStr = str.substring(0, limit) + "...";
  }
  return modifiedStr;
};

export const buildChatName = (chat, user) =>
  chat?.isGroupChat
    ? chat?.chatName
    : chat?.users?.find((member) => member._id !== user?._id)?.name ??
      "Unknown";

export const formatTimestamp = (timestamp) =>
  new Date(timestamp).toTimeString().slice(0, 5);

export const initSearchState = () =>
  Object.values(searchTabs).reduce((acc, curr) => ({ ...acc, [curr]: {} }), {});
