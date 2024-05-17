import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useToast } from "../Hooks/useToast";
import { WARNING } from "../constants/constants";

export default function ProtectedRoute() {
  const location = useLocation();
  const { notify } = useToast();
  const { tokenExpired, user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (tokenExpired || !user || !token)
      notify("You are not logged in!", WARNING);
  }, [tokenExpired, notify, token, user]);

  if (!tokenExpired && user && token) {
    return <Outlet></Outlet>;
  } else {
    return (
      <Navigate
        to="/"
        state={{
          from: location.pathname,
        }}
      ></Navigate>
    );
  }
}
