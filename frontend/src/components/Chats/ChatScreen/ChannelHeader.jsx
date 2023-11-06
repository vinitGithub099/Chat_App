import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";
import ChannelExtras from "./ChannelExtras";
import ChannelHeaderDropdown from "./ChannelHeaderDropdown";

export default function ChannelHeader({ toggleSideBar }) {
  const [dropDown, setDropDown] = useState(false);
  const [channelExtras, setChannelExtras] = useState(null);
  const currChatName = useSelector(
    (state) => state.chat?.currentChat?.chatName
  );
  const toggleDropdown = () => setDropDown((prev) => !prev);
  const handleChannelExtras = (name) => setChannelExtras(name);
  const getShortenedString = (str) => {
    let modifiedStr = str;
    if (str.length > 20) {
      modifiedStr = str.substring(0, 20) + "...";
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
          {currChatName ? getShortenedString(currChatName) : "Channel Name"}
        </div>
        <div
          className="text-light-2 hover:cursor-pointer"
          onClick={toggleDropdown}
        >
          <HiOutlineDotsVertical size={30}></HiOutlineDotsVertical>
          {dropDown && (
            <ChannelHeaderDropdown
              handleChannelExtras={handleChannelExtras}
            ></ChannelHeaderDropdown>
          )}
        </div>
      </div>
      {channelExtras && (
        <ChannelExtras
          channelExtras={channelExtras}
          handleChannelExtras={handleChannelExtras}
        ></ChannelExtras>
      )}
    </>
  );
}
