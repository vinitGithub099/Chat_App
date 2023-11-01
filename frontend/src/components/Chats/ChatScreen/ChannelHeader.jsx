import { GiHamburgerMenu } from "react-icons/gi";

export default function ChannelHeader({ channelName, toggleSideBar }) {
  return (
    <div className="py-4 px-2 mb-8 text-extra-light flex flex-row items-center shadow-sm shadow-dark-3">
      <div className="mobile:hidden py-1 pr-4" onClick={toggleSideBar}>
        <GiHamburgerMenu size={20}></GiHamburgerMenu>
      </div>
      <div className="mobile:ml-12 text-xl font-semibold text-light-1">
        {channelName ? channelName : "Channel Name"}
      </div>
    </div>
  );
}
