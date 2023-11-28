import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";
import { socketClient } from "../../../main";
import { getChatName, getShortenedString } from "../../Utils/utils";
import ChannelExtras from "./ChannelExtras";
import ChannelHeaderDropdown from "./ChannelHeaderDropdown";

export default function ChannelHeader({ toggleSideBar }) {
  const [channelExtras, setChannelExtras] = useState(null);
  const currentChat = useSelector((state) => state.chat?.currentChat);
  const currUser = useSelector((state) => state.auth.user);
  const handleChannelExtras = (name) => setChannelExtras(name);
  const [typing, setTyping] = useState(false);
  const [typerName, setTyperName] = useState(null);

  const listenStartTyping = async () => {
    try {
      const res = await socketClient.on("typing", (data, resolve, reject) => {
        if (data) resolve(data);
        else reject();
      });
      if (res && currentChat && currentChat._id === res.room._id) {
        setTyping(true);
        setTyperName(res.user.name);
      } else {
        setTyping(false);
        setTyperName(null);
      }
    } catch (error) {
      setTyping(false);
      setTyperName(null);
    }
  };

  const listenStopTyping = async () => {
    try {
      const res = await socketClient.on(
        "stop typing",
        (data, resolve, reject) => {
          if (data) resolve(data);
          else reject();
        }
      );
      if (res && currentChat && currentChat._id === res.room._id) {
        setTyping(false);
        setTyperName(null);
      }
    } catch (error) {
      setTyping(false);
      setTyperName(null);
    }
  };

  useEffect(() => {
    listenStartTyping();
    listenStopTyping();
  });

  return (
    <>
      <div className="py-4 px-2 text-extra-light flex flex-row items-center justify-between gap-4 shadow-sm shadow-dark-3 mb-8">
        <div
          className="sm:hidden text-light-2 hover:bg-light-3 hover:bg-opacity-50 hover:cursor-pointer"
          onClick={toggleSideBar}
        >
          <AiOutlineMenu size={30}></AiOutlineMenu>
        </div>

        <div className="ml-4 flex flex-col text-light-1 ">
          <div className="text-lg font-semibold">
            {currentChat &&
              currentChat.chatName &&
              getShortenedString(
                getChatName(currentChat.chatName, currentChat.users, currUser)
              )}
          </div>
        </div>
        <div className="w-full text-center fixed top-16">
          <span className="font-semibold text-info text-xs">
            {typing ? `${typerName} is typing` : null}
          </span>
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

      {channelExtras && (
        <ChannelExtras
          channelExtras={channelExtras}
          handleChannelExtras={handleChannelExtras}
          className="z-30"
        ></ChannelExtras>
      )}
    </>
  );
}
