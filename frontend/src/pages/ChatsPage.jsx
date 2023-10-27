import { useState } from "react";
import ChatScreen from "../components/Chats/ChatScreen";
import SideBar from "../components/Chats/SideBar";

export default function ChatsPage({ className }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const toggleSideBar = () => setIsSideBarOpen((prev) => !prev);
  return (
    <div className={`w-full max-h-screen flex flex-row ${className}`}>
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
