import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "./components/Loader";
import "./index.css";
import { socketClient } from "./main";
const message = "Verifying Credentials";

export default function App() {
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  const tokenExpiration = useSelector((state) => state.auth.tokenExpired);

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
      {loading.autLogin ? (
        <Loader message={message}></Loader>
      ) : (
        <Outlet></Outlet>
      )}
    </main>
  );
}
