import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import LoginDialog from "../components/LoginDialog";

interface AuthState {
  token?: string | null;
}

interface StoreState {
  auth: AuthState;
}

const ProtectedRoute = () => {
  const token = useSelector((state: StoreState) => state.auth?.token);

  return token ? <Outlet /> : <LoginDialog />;
};

export default ProtectedRoute;