import { Spinner, Typography } from "@material-tailwind/react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLazyFetchChatMessagesQuery } from "../../../store/Services/messageAPI";
import MessageCard from "../../MessageCard";
import classes from "./index.module.css";
import { TYPOGRAPHY_VARIANT } from "../../../constants/variants";

const MessagesContainer = () => {
  const currentChat = useSelector((state) => state.chat.currentChat);
  const messages = useSelector((state) => state.message.messages);
  const [fetchCurrChatMessages, { isLoading }] =
  useLazyFetchChatMessagesQuery();
  const messagesEndRef = useRef(null);

  // fetch chat messages of the current chat when this compoenent mounts and  updates
  useEffect(() => {
    if (currentChat) {
      fetchCurrChatMessages(currentChat._id).catch(console.error);
    }
  }, [currentChat, fetchCurrChatMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={classes.messagesContainer}>
      {isLoading ? (
        <div className={classes.spinLoaderContainer}>
          <Spinner className={classes.spinner} />
          <span>Loading messages</span>
        </div>
      ) : messages?.length ? (
        messages.map((message) => (
          <MessageCard key={message._id} {...message} />
        ))
      ) : (
        <Typography variant={TYPOGRAPHY_VARIANT.H6} className={classes.noMessage}>
          No messages to show!
        </Typography>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesContainer;
