import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import LoginDialog from "../components/LoginDialog";

const ProtectedRoute = () => {
  const { token } = useSelector((state) => state.auth);

  return token ? <Outlet></Outlet> : <LoginDialog />;
};

export default ProtectedRoute;
