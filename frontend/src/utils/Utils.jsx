import { PERSIST_AUTH_KEY } from "../constants/constants";

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
