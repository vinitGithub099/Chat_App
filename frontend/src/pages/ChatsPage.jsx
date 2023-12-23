import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import userLogo from "../assets/profile-user_64572.png";
import ChatScreen from "../components/Chats/ChatScreen/ChatScreen";
import SideBar from "../components/Chats/SideBar/SideBar";
import { useToast } from "../components/Hooks/useToast";
import UserAvatar from "../components/UserAvatar";
import { getShortenedString } from "../components/Utils/utils";
import { INFO } from "../constants/constants";
import { chatSocket } from "../main";
import { populateMessages } from "../store/Features/Chat/ChatSlice";
import { store } from "../store/store";

export default function ChatsPage({ className }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const toggleSideBar = () => setIsSideBarOpen((prev) => !prev);
  const dispatch = useDispatch();
  const { notify } = useToast();

  useEffect(() => {
    chatSocket.on("message received", (res) => {
      const { room, newMessage } = res;
      const currentChat = store.getState().chat.currentChat;
      if (!currentChat || currentChat._id !== room._id) {
        console.log("notification");
        notify(notificationComponent(newMessage), INFO, true);
      } else {
        console.log("message: ");
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
