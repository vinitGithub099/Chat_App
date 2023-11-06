import ChannelHeader from "./ChannelHeader";
import DisplayChats from "./DisplayChats";
import SendMsgBtn from "./SendMsgBtn";

export default function ChatScreen({ className, toggleSideBar }) {
  return (
    <div className={`max-h-screen flex flex-col flex-1 bg-dark-1 ${className}`}>
      <ChannelHeader toggleSideBar={toggleSideBar}></ChannelHeader>
      <DisplayChats></DisplayChats>
      <SendMsgBtn></SendMsgBtn>
    </div>
  );
}
