import { useSelector } from "react-redux";
import ChannelHeader from "./ChannelHeader";
import DisplayMessages from "./DisplayMessages";
import SendMsgBtn from "./SendMsgBtn";

export default function ChatScreen({ className, toggleSideBar }) {
  const currentChat = useSelector((state) => state.chat.currentChat);

  // useEffect(() => {
  //   chatSocket.on("message received", (newMessageReceived) => {
  //     console.log(
  //       newMessageReceived.sender.name,
  //       " sent a message: ",
  //       newMessageReceived.content
  //     );
  //     if (
  //       !currentChat || // if chat is not selected or doesn't match current chat
  //       currentChat._id !== newMessageReceived.chat._id
  //     ) {
  //       //
  //     } else {
  //       console.log("inside receiver messages");
  //       dispatch(setMessages(newMessageReceived));
  //     }
  //   });
  // }, [chatSocket, currentChat, dispatch]);

  // useEffect(() => {
  //   dispatch(receiveMessage());
  // });

  return (
    <div className={`max-h-screen flex flex-col flex-1 bg-dark-1 ${className}`}>
      <ChannelHeader toggleSideBar={toggleSideBar}></ChannelHeader>
      {currentChat ? (
        <>
          {/* <ChannelHeader toggleSideBar={toggleSideBar}></ChannelHeader> */}
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
