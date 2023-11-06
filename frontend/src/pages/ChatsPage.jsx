import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import _ from "underscore";
import ChatScreen from "../components/Chats/ChatScreen/ChatScreen";
import SideBar from "../components/Chats/SideBar/SideBar";
import { ENDPOINT } from "../constants/constants";
import { fetchChats } from "../store/Features/Chat/ChatActions";
import { connectChatSocket } from "../store/Features/Chat/ChatSlice";

export default function ChatsPage({ className }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const toggleSideBar = () => setIsSideBarOpen((prev) => !prev);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const currentChat = useSelector((state) => state.chat.currentChat);
  // const chatSocket = useSelector((state) => state.chat.chatSocket);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!_.isEmpty(user)) {
      const socket = io(ENDPOINT);
      socket.emit("setup", user._id);
      socket.on("connect", () => {
        console.log("You connected to socket id: ", socket.id);
      });
      dispatch(connectChatSocket(socket));
    }
  }, [dispatch, navigate, user]);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <div className={`w-full h-screen flex flex-row ${className}`}>
      <SideBar
        sidebarOpen={isSideBarOpen}
        toggleSideBar={toggleSideBar}
        className=""
      ></SideBar>
      <ChatScreen
        sidebarOpen={isSideBarOpen}
        toggleSideBar={toggleSideBar}
        className=""
      ></ChatScreen>
    </div>
  );
}
