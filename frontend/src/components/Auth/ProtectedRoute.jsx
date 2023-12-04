import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { WARNING } from "../../constants/constants";
import { useToast } from "../Hooks/useToast";

export default function ProtectedRoute() {
  const location = useLocation();
  const { notify } = useToast();
  const user = useSelector((state) => state.auth.user);
  const accessToken = localStorage.getItem("access_token");
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!accessToken || !user || !token)
      notify("You are not logged in!", WARNING);
  }, [accessToken, notify, token, user]);

  if (accessToken && user && token) {
    return <Outlet></Outlet>;
  } else {
    return (
      <Navigate
        to="/login"
        state={{
          from: location.pathname,
        }}
      ></Navigate>
    );
  }
}
