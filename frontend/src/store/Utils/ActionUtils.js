export function handelTokenExpiration(error, dispatch) {
  if (error && error.response && error.response.status === 403) {
    dispatch({ type: "auth/setTokenExpiration", payload: true });
  } else {
    dispatch({ type: "auth/setTokenExpiration", payload: false });
  }
}
