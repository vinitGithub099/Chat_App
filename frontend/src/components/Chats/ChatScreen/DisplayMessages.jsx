import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListComponent from "../../ListComponent";
import MessageCard from "../SideBar/MessageCard";
import { fetchChatMessages } from "../../../store/Features/Chat/ChatActions";

export default function DisplayMessages() {
  const messages = useSelector((state) => state.chat.messages);
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  console.log(messages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    dispatch(fetchChatMessages());
  }, [dispatch]);

  return (
    <div className="w-full flex flex-col flex-1 overflow-hidden">
      <ListComponent
        list={messages}
        className="w-full px-4 sm:px-8 flex flex-1 flex-col overflow-y-scroll scrollbar"
        subComponent={MessageCard}
      ></ListComponent>
      <div ref={messagesEndRef}></div>
    </div>
  );
}
