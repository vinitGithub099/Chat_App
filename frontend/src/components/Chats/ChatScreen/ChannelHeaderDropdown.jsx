import { FiInfo } from "react-icons/fi";
import { RxExit } from "react-icons/rx";
import { channelOptions } from "../../../constants/constants";

export default function ChannelHeaderDropdown({ handleChannelExtras }) {
  return (
    <div className="hidden w-40 border bg-dark-3 border-light-2 p-4 rounded-md fixed right-2 top-2 group-hover:block z-10">
      {list && list.length ? (
        list.map((chat) => (
          <DropdownItem
            key={chat._id}
            {...{ ...chat, handleClick: handleChannelExtras }}
          ></DropdownItem>
        ))
      ) : (
        <div className="text-light-2 font-semibold text-center">No results</div>
      )}
    </div>
  );
}

function DropdownItem({ icon, name, handleClick, className }) {
  return (
    <div
      className={`w-full mb-2 p-2 flex flex-row items-center gap-2 rounded-md hover:bg-light-3 ${className}`}
      onClick={() => handleClick(name)}
    >
      <div>{icon}</div>
      <p className="text-md text-left font-semibold">{name}</p>
    </div>
  );
}

const list = [
  {
    name: channelOptions.INFO,
    icon: <FiInfo></FiInfo>,
    className: "text-light-1",
  },
  {
    name: channelOptions.EXIT_GROUP,
    icon: <RxExit></RxExit>,
    className: "text-error",
  },
];
