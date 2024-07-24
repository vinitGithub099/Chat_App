import { Spinner, Typography } from "@material-tailwind/react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { TYPOGRAPHY_VARIANT } from "../../../constants/variants";
import { getFormattedDateLabel, groupMessagesByDate } from "../../../helpers/helpers";
import { useLazyFetchChatMessagesQuery } from "../../../store/Services/messageAPI";
import MessageCard from "../../MessageCard";
import classes from "./index.module.css";

const MessagesContainer = () => {
  const currentChat = useSelector((state) => state.chat.currentChat);
  const groupedMessages = groupMessagesByDate(
    useSelector((state) => state.message.messages)
  );
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
  }, [groupedMessages]);

  return (
    <div className={classes.messagesContainer}>
      {isLoading ? (
        <div className={classes.spinLoaderContainer}>
          <Spinner className={classes.spinner} />
          <span>Loading messages</span>
        </div>
      ) : groupedMessages?.length ? (
        groupedMessages.map(({ date, messages }, index) => {
          return (
            <div className={classes.messageListContainer} key={index}>
              <Typography
                variant={TYPOGRAPHY_VARIANT.SMALL}
                className={classes.messageGroupDate}
              >
                {getFormattedDateLabel(date)}
              </Typography>
              {messages?.length
                ? messages.map((message) => (
                    <MessageCard key={message._id} {...message} />
                  ))
                : null}
            </div>
          );
        })
      ) : (
        <Typography
          variant={TYPOGRAPHY_VARIANT.LEAD}
          className={classes.noMessage}
        >
          No messages to show!
        </Typography>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesContainer;
