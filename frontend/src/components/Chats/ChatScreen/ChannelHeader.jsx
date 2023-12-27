import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";
import { chatSocket } from "../../../main";
import { getChatName, getShortenedString } from "../../Utils/utils";
import ChannelExtras from "./ChannelExtras";
import ChannelHeaderDropdown from "./ChannelHeaderDropdown";

export default function ChannelHeader({ toggleSideBar }) {
  const [channelExtras, setChannelExtras] = useState(null);
  const currentChat = useSelector((state) => state.chat.currentChat);
  const currUser = useSelector((state) => state.auth.user);
  const handleChannelExtras = (name) => {
    setChannelExtras(name);
  };
  const [typing, setTyping] = useState(false);
  const [typerName, setTyperName] = useState(null);

  useEffect(() => {
    const listenStartTyping = () => {
      chatSocket.on("typing", (res) => {
        if (res && currentChat && res.room._id === currentChat._id) {
          setTyping(true);
          setTyperName(
            res?.room?.users?.find((user) => user._id !== currUser._id)?.name
          );
        } else {
          setTyping(false);
          setTyperName(null);
        }
      });
    };

    const listenStopTyping = () => {
      chatSocket.on("stop typing", (res) => {
        if (res && currentChat && res.room._id === currentChat._id) {
          setTyping(false);
          setTyperName(null);
        }
      });
    };
    
    listenStartTyping();
    listenStopTyping();
  });

  return (
    <div>
      <div className="py-4 px-2 text-extra-light flex flex-row items-center justify-between gap-4 shadow-sm shadow-dark-3">
        <div
          className="sm:hidden text-light-2 hover:bg-light-3 hover:bg-opacity-50 hover:cursor-pointer"
          onClick={toggleSideBar}
        >
          <AiOutlineMenu size={30}></AiOutlineMenu>
        </div>

        <div className="ml-8 flex flex-col text-light-1 ">
          <div className="text-lg font-semibold">
            {currentChat &&
              currentChat.chatName &&
              getShortenedString(
                getChatName(currentChat.chatName, currentChat.users, currUser)
              )}
          </div>
        </div>

        {currentChat && (
          <div className="text-light-2 hover:cursor-pointer group">
            <HiOutlineDotsVertical size={30}></HiOutlineDotsVertical>
            <ChannelHeaderDropdown
              handleChannelExtras={handleChannelExtras}
            ></ChannelHeaderDropdown>
          </div>
        )}
      </div>
      <div className="pt-1 h-6 w-full text-center font-semibold text-info text-sm ">
        {typing ? `${typerName} is typing...` : null}
      </div>

      {channelExtras ? (
        <ChannelExtras
          channelExtras={channelExtras}
          handleChannelExtras={handleChannelExtras}
        ></ChannelExtras>
      ) : null}
    </div>
  );
}
