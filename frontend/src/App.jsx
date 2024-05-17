import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import "./index.css";
import { chatSocket } from "./main";
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
    if (user) {
      chatSocket.emit("setup", user);
      chatSocket.on("connected", () => {
        console.log("soceket connected id: ", chatSocket.id);
      });
    }
    return () => {
      if (user) {
        chatSocket.disconnect();
        console.log("socket disconnected");
      }
    };
  }, [user]);

  return (
    <main className="w-full min-h-screen">
      {loading.autLogin ? <div>{message}</div> : <Outlet></Outlet>}
    </main>
  );
}
