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
  const authInfo = localStorage.getItem("persist:auth");
  const parsedAuthInfo = JSON.parse(authInfo);
  return parsedAuthInfo && parsedAuthInfo.user && parsedAuthInfo.token
    ? true
    : false;
};
