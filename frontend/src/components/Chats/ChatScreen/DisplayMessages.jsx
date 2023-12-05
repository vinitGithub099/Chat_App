import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import MessageCard from "../SideBar/MessageCard";

export default function DisplayMessages() {
  const messages = useSelector((state) => state.chat.messages);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="w-full flex flex-col flex-1 overflow-hidden">
      <div className="w-full px-4 sm:px-8 flex flex-1 flex-col overflow-y-scroll scrollbar">
        {messages && messages.length ? (
          messages.map((message) => (
            <MessageCard key={message._id} {...message}></MessageCard>
          ))
        ) : (
          <div className="text-light-2 font-semibold text-center">
            No Messages to show!
          </div>
        )}
        <div ref={messagesEndRef}></div>
      </div>
    </div>
  );
}
