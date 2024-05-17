import { PERSIST_AUTH_KEY } from "../configs/keys";

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

export const verifyAuthInfo = () => {
  const authInfo = localStorage.getItem(PERSIST_AUTH_KEY);
  const parsedAuthInfo = JSON.parse(authInfo);
  return parsedAuthInfo && parsedAuthInfo.user && parsedAuthInfo.token
    ? true
    : false;
};

export const getShortenedString = (str, limit = 20) => {
  let modifiedStr = str;
  if (modifiedStr?.length > limit) {
    modifiedStr = str.substring(0, limit) + "...";
  }
  return modifiedStr;
};

export const getChatName = (chatName, users, currUser) => {
  let newChatName = chatName;
  if (chatName === "sender") {
    const sender = users.find((user) => user._id !== currUser._id);
    newChatName = sender.name;
  }

  return newChatName;
};
