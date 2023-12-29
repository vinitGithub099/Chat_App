import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userLogo from "../assets/profile-user_64572.png";
import ChatScreen from "../components/Chats/ChatScreen/ChatScreen";
import SideBar from "../components/Chats/SideBar/SideBar";
import { useToast } from "../components/Hooks/useToast";
import UserAvatar from "../components/UserAvatar";
import { getChatName, getShortenedString } from "../components/Utils/utils";
import { INFO } from "../constants/constants";
import { chatSocket } from "../main";
import { populateMessages } from "../store/Features/Chat/ChatSlice";
import { store } from "../store/store";

export default function ChatsPage({ className }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const toggleSideBar = () => setIsSideBarOpen((prev) => !prev);
  const dispatch = useDispatch();
  const { notify } = useToast();
  const currUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    chatSocket.on("message received", (res) => {
      const { room, newMessage } = res;
      const currentChat = store.getState().chat.currentChat;
      if (!currentChat || currentChat._id !== room._id) {
        notify(notificationComponent(newMessage, currUser), INFO, true);
      } else {
        dispatch(populateMessages(newMessage));
      }
    });
  }, []);

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

function notificationComponent(notification, currUser) {
  const senderName = notification.sender.name;
  const users = notification.chat.users;
  const chatName = notification.chat.chatName;
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
          {getShortenedString(getChatName(chatName, users, currUser))}
        </div>
      </div>
    </div>
  );
}
