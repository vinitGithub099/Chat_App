import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);

  if (token) {
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
