import { AiOutlineMenu } from "react-icons/ai";
import { useSelector } from "react-redux";

export default function ChannelHeader({ toggleSideBar }) {
  const currChatName = useSelector(
    (state) => state.chat?.currentChat?.chatName
  );
  return (
    <div className="py-4 px-2 mb-8 text-extra-light flex flex-row items-center gap-4 shadow-sm shadow-dark-3">
      <div
        className="sm:hidden text-light-2 hover:bg-light-3 hover:bg-opacity-50"
        onClick={toggleSideBar}
      >
        <AiOutlineMenu size={30}></AiOutlineMenu>
      </div>

      <div className="ml-4 text-xl font-semibold text-light-1">
        {currChatName ? currChatName : "Channel Name"}
      </div>
    </div>
  );
}
