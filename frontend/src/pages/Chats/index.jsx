import cx from "classnames";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatActivity from "../../components/ChatActivity";
import ChatContent from "../../components/ChatContent";
import { chatSocket } from "../../main";
import { appendMessage } from "../../store/Features/Message/MessageSlice";
import classes from "./index.module.css";

/* 

Note: Keep cross checking the erraneous working of useEffect in this component

*/

const Chats = () => {
  const currentChat = useSelector((state) => state.chat.currentChat);
  const dispatch = useDispatch();

  // fix it to run only once
  useEffect(() => {
    // used for updating messages ui of sender receiver
    const updateMessages = (newMessage) => {
      dispatch(appendMessage(newMessage));
    };

    const handleMessageReceived = ({ room, newMessage }) => {
      if (!currentChat || currentChat._id !== room._id) {
        console.log("Notification");
      } else {
        updateMessages(newMessage);
      }
    };

    chatSocket.on("message received", handleMessageReceived);

    return () => {
      chatSocket.off("message received", handleMessageReceived);
    };
  });

  return (
    <div className={classes.chatContainer}>
      <ChatContent
        className={cx(classes.chatContentBar, {
          [classes.hide]: !!currentChat === true,
        })}
      />
      <ChatActivity
        className={cx(classes.chatActivity, {
          [classes.hide]: !!currentChat === false,
        })}
      />
    </div>
  );
};

export default Chats;
