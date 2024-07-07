import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import "./index.css";
import { chatSocket } from "./main";

export default function App() {
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) return;

    chatSocket.emit("setup", user);

    chatSocket.on("connected", () => {
      console.log("init chat socket id: ", chatSocket.id);
    });

    return () => chatSocket.disconnect();
  }, [user]);

  return (
    <main className="app">
      <Outlet></Outlet>
    </main>
  );
}
