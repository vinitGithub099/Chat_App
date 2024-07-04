import cx from "classnames";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatActivity from "../../components/ChatActivity";
import ChatContent from "../../components/ChatContent";
import { chatSocket } from "../../main";
import { appendMessage } from "../../store/Features/Message/MessageSlice";
import classes from "./index.module.css";

const Chats = () => {
  const currentChat = useSelector((state) => state.chat.currentChat);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateMessages = (newMessage) => {
      dispatch(appendMessage(newMessage));
    };

    chatSocket.on("message received", ({ room, newMessage }) => {
      if (currentChat?._id === room?._id) updateMessages(newMessage);
    });
  }, [currentChat?._id, dispatch]);

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
