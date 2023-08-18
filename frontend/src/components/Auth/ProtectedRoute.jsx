import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import _ from "underscore";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);
  return _.isEmpty(token) ? (
    children
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ path: location.pathname }}
    ></Navigate>
  );
}
