import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import "./index.css";
import { chatSocket } from "./main";
import NotificationProvider from "./providers/NotificationProvider";
import { setOnlineUsers } from "./store/Features/OnlineUsers/onlineUsersSlice";

export default function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;

    chatSocket.emit("setup", user);

    chatSocket.on("connected", () => {
      if (!import.meta.env.PROD) {
        console.log("init chat socket id: ", chatSocket.id);
      }
    });

    chatSocket.on("online users", (joinedUsers) => {
      if (!import.meta.env.PROD) {
        console.log("online users ", joinedUsers);
      }
      dispatch(setOnlineUsers(joinedUsers));
    });

    return () => chatSocket.disconnect();
  }, [dispatch, user]);

  return (
    <main className="app">
      <NotificationProvider>
        <Outlet></Outlet>
      </NotificationProvider>
    </main>
  );
}
