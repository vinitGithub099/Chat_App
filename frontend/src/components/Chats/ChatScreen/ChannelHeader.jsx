import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";
import ChannelExtras from "./ChannelExtras";
import ChannelHeaderDropdown from "./ChannelHeaderDropdown";

export default function ChannelHeader({ toggleSideBar }) {
  const [channelExtras, setChannelExtras] = useState(null);
  const currChat = useSelector((state) => state.chat?.currentChat);
  const handleChannelExtras = (name) => setChannelExtras(name);
  const getShortenedString = (str) => {
    let modifiedStr = str;
    if (modifiedStr.length > 15) {
      modifiedStr = str.substring(0, 15) + "...";
    }
    return modifiedStr;
  };

  return (
    <>
      <div className="py-4 px-2 mb-8 text-extra-light flex flex-row items-center justify-between gap-4 shadow-sm shadow-dark-3">
        <div
          className="sm:hidden text-light-2 hover:bg-light-3 hover:bg-opacity-50 cursor-pointer"
          onClick={toggleSideBar}
        >
          <AiOutlineMenu size={30}></AiOutlineMenu>
        </div>

        <div className="ml-4 text-xl font-semibold text-light-1">
          {currChat &&
            currChat.chatName &&
            getShortenedString(currChat.chatName)}
        </div>
        {currChat && (
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
