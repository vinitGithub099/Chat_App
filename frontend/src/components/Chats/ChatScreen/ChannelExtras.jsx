import { channelOptions } from "../../../constants/constants";
import ChatInfo from "./ChatInfo/ChatInfo";
import ExitChannel from "./ExitChannel";

export default function ChannelExtras({ channelExtras, ...rest }) {
  const component = channelExtraList(rest).find(
    (listItem) => listItem.name === channelExtras
  ).component;
  return component ? component : null;
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
