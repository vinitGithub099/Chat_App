import { useSelector } from "react-redux";
import ChannelHeader from "./ChannelHeader";
import DisplayMessages from "./DisplayMessages.1";
import SendMsgBtn from "./SendMsgBtn";

export default function ChatScreen({ className, toggleSideBar }) {
  const currentChat = useSelector((state) => state.chat.currentChat);

  return (
    <div className={`max-h-screen flex flex-col flex-1 bg-dark-1 ${className}`}>
      <ChannelHeader toggleSideBar={toggleSideBar}></ChannelHeader>
      {currentChat ? (
        <>
          <DisplayMessages></DisplayMessages>
          <SendMsgBtn></SendMsgBtn>
        </>
      ) : (
        <div className="flex-1 font-semibold text-light-1 flex justify-center items-center">
          Please select a chat to see Messages!
        </div>
      )}
    </div>
  );
}
