import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import _ from "underscore";

export default function ProtectedRoute() {
  const location = useLocation();
  const accessToken = useSelector((state) => state.auth.token);

  return !_.isEmpty(accessToken) ? (
    <Outlet></Outlet>
  ) : (
    <Navigate
      to="/intermediate-loader"
      replace
      state={{
        from: location.pathname,
        to: "/login",
        message: "You are not logged in! \n Redirecting you to login page.",
      }}
    ></Navigate>
  );
}
