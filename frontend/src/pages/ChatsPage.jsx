import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import userLogo from "../assets/profile-user_64572.png";
import ChatScreen from "../components/Chats/ChatScreen/ChatScreen";
import SideBar from "../components/Chats/SideBar/SideBar";
import UserAvatar from "../components/Chats/UserAvatar";
import { useToast } from "../components/Hooks/useToast";
import { getShortenedString } from "../components/Utils/utils";
import { INFO } from "../constants/constants";
import { receiveMessage } from "../store/Features/Chat/ChatActions";

export default function ChatsPage({ className }) {
  const { notify } = useToast();
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const toggleSideBar = () => setIsSideBarOpen((prev) => !prev);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(receiveMessage())
      .then((res) => {
        if (res.payload && res.payload.notification) {
          const notification = res.payload.notification;
          notify(notificationComponent(notification), INFO, true);
        }
      })
      .catch();
  });

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

function notificationComponent(notification) {
  const senderName = notification.sender.name;
  const message = notification.content;
  return (
    <div className="w-full flex flex-row items-center">
      <UserAvatar
        altText={"hello world"}
        className=""
        imgSrc={userLogo}
        config={"s"}
      ></UserAvatar>
      <div className="pl-2 flex flex-col items-baseline ">
        <div className="text-light-1 font-semibold pb-1 text-sm">
          {senderName}
        </div>
        <div className="text-light-2 text-xs">
          {getShortenedString(message)}
        </div>
      </div>
    </div>
  );
}
