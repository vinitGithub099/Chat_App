import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ChatScreen from "../components/Chats/ChatScreen/ChatScreen";
import SideBar from "../components/Chats/SideBar/SideBar";
import { fetchChats } from "../store/Features/Chat/ChatActions";

export default function ChatsPage({ className }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const toggleSideBar = () => setIsSideBarOpen((prev) => !prev);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChats());
  }, []);

  return (
    <div className={`w-full h-screen flex flex-row ${className}`}>
      <SideBar
        sidebarOpen={isSideBarOpen}
        toggleSideBar={toggleSideBar}
        className="w-1/4"
      ></SideBar>
      <ChatScreen
        sidebarOpen={isSideBarOpen}
        toggleSideBar={toggleSideBar}
        className="w-3/4"
      ></ChatScreen>
    </div>
  );
}
