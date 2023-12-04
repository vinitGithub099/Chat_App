import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "./components/Loader";
import "./index.css";
import { socketClient } from "./main";
import { autoLogin } from "./store/Features/User/AuthActions";
const message = "Verifying Credentials";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  const tokenExpiration = useSelector((state) => state.auth.tokenExpired);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) return;
    dispatch(autoLogin());
  }, [dispatch]);

  useEffect(() => {
    const expirationTimeout = () => {
      const timeoutId = setTimeout(() => {
        navigate("/auth-token-expiration");
      }, 1000);

      return () => clearTimeout(timeoutId);
    };
    if (tokenExpiration) expirationTimeout();
  }, [navigate, tokenExpiration]);

  useEffect(() => {
    const connectChatSocket = async (user) =>
      socketClient && (await socketClient.connect(user));

    if (user) {
      connectChatSocket(user);
    }
  }, [user]);

  return (
    <main className="w-full min-h-screen">
      {loading ? <Loader message={message}></Loader> : <Outlet></Outlet>}
    </main>
  );
}
