import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "underscore";
import { fetchChatMessages } from "../../../store/Features/Chat/ChatActions";
import { setMessages } from "../../../store/Features/Chat/ChatSlice";
import MessageCard from "../SideBar/MessageCard";

export default function DisplayMessages() {
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  const chatSocket = useSelector((state) => state.chat.chatSocket);
  const { messages, currentChat } = useSelector((state) => state.chat);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    if (!_.isEmpty(currentChat)) {
      dispatch(fetchChatMessages(currentChat._id))
        .then(() => chatSocket.emit("join chat", currentChat._id))
        .catch((error) => console.log(error));
    }
  }, [chatSocket, currentChat, dispatch]);

  // useEffect(() => {
  //   console.log("infinite");
  //   // message received
  //   if (chatSocket) {
  //     console.log(chatSocket);
  //     const handleReceivedMessage = (newMessage) => {
  //       console.log("inside message received");
  //       console.log(newMessage);
  //       if (!currentChat || currentChat._id !== newMessage.chat._id) {
  //         /* give notification */
  //       } else {
  //         // updates the receiver messages
  //         dispatch(setMessages(newMessage));
  //       }
  //     };

  //     chatSocket.on("message received", handleReceivedMessage);
  //   }
  // });
  
  useEffect(() => {
    chatSocket.on("message received", (newMessageReceived) => {
      console.log(newMessageReceived);
      if (
        !currentChat || // if chat is not selected or doesn't match current chat
        currentChat._id !== newMessageReceived.chat._id
      ) {
        //
      } else {
        dispatch(setMessages(newMessageReceived));
      }
    });
  });

  return (
    <div className="px-4 sm:px-8 w-full overflow-y-scroll scrollbar flex flex-1 flex-col">
      {messages && messages.length
        ? messages.map(({ _id, sender, timeStamp, content }) => {
            return (
              <MessageCard
                key={_id}
                senderName={sender.name}
                timeStamp={timeStamp}
                message={content}
              ></MessageCard>
            );
          })
        : null}
      <div ref={messagesEndRef} />
    </div>
  );
}
