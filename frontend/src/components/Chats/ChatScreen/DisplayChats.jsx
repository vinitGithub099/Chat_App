import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "underscore";
import { fetchChatMessages } from "../../../store/Features/Chat/ChatActions";
import MessageCard from "../SideBar/MessageCard";

export default function DisplayChats() {
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  const { messages: chatMessages, currentChat } = useSelector(
    (state) => state.chat
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    if (!_.isEmpty(currentChat)) dispatch(fetchChatMessages(currentChat._id));
  }, [currentChat, dispatch]);

  return (
    <div className="px-8 w-full overflow-y-scroll scrollbar-msg flex flex-1 flex-col">
      {chatMessages && chatMessages.length
        ? chatMessages.map(({ _id, sender, timeStamp, content }) => {
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
