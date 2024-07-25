import cx from "classnames";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatActivity from "../../components/ChatActivity";
import ChatContent from "../../components/ChatContent";
import { TOAST_TYPE } from "../../constants/toastTypes";
import useNotification from "../../hooks/useNotification";
import { chatSocket } from "../../main";
import { appendMessage } from "../../store/Features/Message/messageSlice";
import classes from "./index.module.css";

const Chats = () => {
  const currentChat = useSelector((state) => state.chat.currentChat);
  const dispatch = useDispatch();
  const { notify } = useNotification();
  const { activityLabel } = useSelector((state) => state.ui);

  const displayMsgToast = (notification) => {
    notify(
      {
        toastType: TOAST_TYPE.MESSAGE,
        ...notification,
      },
      { position: "top-right" }
    );
  };

  useEffect(() => {
    // used for updating messages ui of sender receiver
    const updateMessages = (newMessage) => {
      dispatch(appendMessage(newMessage));
    };

    const handleMessageReceived = ({ room, newMessage }) => {
      if (!currentChat || currentChat._id !== room._id) {
        displayMsgToast(newMessage);
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
          [classes.hide]: activityLabel, // for mobile screens hide ChatContent when activityLabel is selected
        })}
      />
      <ChatActivity
        className={cx(classes.chatActivity, {
          [classes.hide]: !activityLabel, // for mobile screens hide ChatActivity when no activityLabel is selected
        })}
      />
    </div>
  );
};

export default Chats;
