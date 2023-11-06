import { channelOptions } from "../../../constants/constants";
import ChannelInfo from "./ChannelInfo";
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
    component: <ChannelInfo {...props}></ChannelInfo>,
  },
  {
    name: channelOptions.EXIT_GROUP,
    component: <ExitChannel {...props}></ExitChannel>,
  },
];
