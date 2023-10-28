import { useEffect, useRef } from "react";
import MessageCard from "../SideBar/MessageCard";

export default function DisplayChats({ messages }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className="px-8 w-full overflow-y-scroll scrollbar-msg flex flex-col">
      {messages.map(({ senderName, timeStamp, message }, index) => {
        return (
          <MessageCard
            key={index}
            senderName={senderName}
            timeStamp={timeStamp}
            message={message}
          ></MessageCard>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
