import { AiFillCloseCircle } from "react-icons/ai";
import { IoArrowBack } from "react-icons/io5";
import { channelOptions } from "../../../constants/constants";
import Button from "../../Form/Button";
import ChatInfo from "./ChatInfo/ChatInfo";
import ExitChannel from "./ExitChannel";

export default function ChannelExtras({
  channelExtras,
  handleChannelExtras,
  className,
  ...rest
}) {
  const component = channelExtraList({ ...rest, handleChannelExtras }).find(
    (listItem) => listItem.name === channelExtras
  ).component;

  return component ? (
    <div
      className={`w-full sm:w-96 h-screen sm:h-3/4 bg-dark-3 fixed right-0 sm:right-2 sm:bottom-2 sm:top-2 flex flex-col sm:rounded-lg overflow-y-scroll scrollbar pb-10 z-20 border border-light-3 ${className}`}
    >
      {/* header */}
      <div className="sticky top-0 bg-dark-3 p-4 text-light-1 flex flex-row sm:flex-row-reverse items-center border-b border-light-3">
        <Button
          className="hidden sm:block rounded-full cursor-pointer text-error hover:bg-light-3 hover:bg-opacity-60"
          handleClick={() => handleChannelExtras(null)}
        >
          <AiFillCloseCircle size={20}></AiFillCloseCircle>
        </Button>
        <Button
          className="block sm:hidden rounded-full cursor-pointer hover:bg-light-3 hover:bg-opacity-60"
          handleClick={() => handleChannelExtras(null)}
        >
          <IoArrowBack size={20}></IoArrowBack>
        </Button>
      </div>
      <div className="flex-1 p-2">{component}</div>
    </div>
  ) : null;
}

const channelExtraList = (props) => [
  {
    name: channelOptions.INFO,
    component: <ChatInfo {...props}></ChatInfo>,
  },
  {
    name: channelOptions.EXIT_GROUP,
    component: <ExitChannel {...props}></ExitChannel>,
  },
];
