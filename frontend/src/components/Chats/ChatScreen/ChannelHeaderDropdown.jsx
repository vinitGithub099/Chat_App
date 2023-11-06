import { FiInfo } from "react-icons/fi";
import { RxExit } from "react-icons/rx";
import { channelOptions } from "../../../constants/constants";
import ListComponent from "../../ListComponent";

export default function ChannelHeaderDropdown({ handleChannelExtras }) {
  const modifiedList = list.map((listItem) => ({
    ...listItem,
    handleClick: handleChannelExtras,
  }));
  return (
    <ListComponent
      list={modifiedList}
      className="w-40 outline bg-dark-3 outline-light-3 p-4 rounded-md fixed right-2 top-16"
      subComponent={ListItem}
    ></ListComponent>
  );
}

function ListItem({ icon, name, handleClick }) {
  return (
    <div
      className={`w-full mb-2 p-2 flex flex-row items-center gap-2 rounded-md text-light-1 hover:bg-light-3`}
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
  },
  {
    name: channelOptions.EXIT_GROUP,
    icon: <RxExit></RxExit>,
  },
];
