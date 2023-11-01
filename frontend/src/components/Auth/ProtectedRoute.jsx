import { Navigate, Outlet, useLocation } from "react-router-dom";
import _ from "underscore";

export default function ProtectedRoute() {
  const location = useLocation();
  console.log(location);
  const token = localStorage.getItem("access_token");
  return !_.isEmpty(token) ? (
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
