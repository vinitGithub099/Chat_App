import { AiFillCloseCircle } from "react-icons/ai";
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
      className={`w-full sm:w-1/2 h-screen sm:h-3/4 bg-dark-3 fixed right-0 sm:right-2 sm:bottom-2 sm:top-2 flex flex-col sm:rounded-lg overflow-y-scroll scrollbar pb-10 z-20 border border-light-3 ${className}`}
    >
      {/* header */}
      <div className="sticky top-0 bg-dark-3 p-4 text-light-1 flex flex-row-reverse items-center border-b border-light-3">
        <Button
          className="rounded-full cursor-pointer text-error hover:bg-light-3 hover:bg-opacity-60 float-right"
          handleClick={() => handleChannelExtras(null)}
        >
          <AiFillCloseCircle size={20}></AiFillCloseCircle>
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
