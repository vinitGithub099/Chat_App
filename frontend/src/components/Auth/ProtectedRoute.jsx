import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import _ from "underscore";
import { WARNING } from "../../constants/constants";
import { useToast } from "../Hooks/useToast";

export default function ProtectedRoute() {
  const location = useLocation();
  const accessToken = useSelector((state) => state.auth.token);
  const { notify } = useToast();

  useEffect(() => {
    if (_.isEmpty(accessToken)) {
      notify("You are not logged in!", WARNING);
    }
  }, [accessToken, notify]);

  if (!_.isEmpty(accessToken)) {
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
