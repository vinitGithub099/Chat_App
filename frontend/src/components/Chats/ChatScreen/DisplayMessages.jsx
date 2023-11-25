import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ListComponent from "../../ListComponent";
import MessageCard from "../SideBar/MessageCard";

export default function DisplayMessages() {
  const messages = useSelector((state) => state.chat.messages);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  });

  return (
    <div className="w-full flex flex-col flex-1 overflow-hidden">
      <ListComponent
        list={messages}
        className="w-full px-4 sm:px-8 flex flex-1 flex-col overflow-y-scroll scrollbar"
        subComponent={MessageCard}
      >
        <div ref={messagesEndRef}></div>
      </ListComponent>
    </div>
  );
}
