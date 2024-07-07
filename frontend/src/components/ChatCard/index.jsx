import { Avatar, Typography } from "@material-tailwind/react";
import cx from "classnames";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userIcon from "../../assets/profile-user_64572.png";
import { MENU_ITEMS } from "../../constants/sideMenu";
import { buildChatName, formatTimestamp } from "../../helpers/helpers";
import { chatSocket } from "../../main";
import { updateCurrentChat } from "../../store/Features/Chat/ChatSlice";
import { setActitvityLabel } from "../../store/Features/UI/UISlice";
import classes from "./index.module.css";

const ChatCard = (props) => {
  const { _id, chatName, latestMessage, unreadMsgCount, updatedAt } = props;
  const currentChat = useSelector((state) => state.chat.currentChat);
  const user = useSelector((state) => state.auth.user);
  const [typingStatus, updateTypingStatus] = useState({
    isTyping: false,
    name: null,
  });
  const dispatch = useDispatch();

  // Continuously listen typing events for each chat card separately
  // Can't be gloablised
  useEffect(() => {
    const listenStartTyping = () => {
      chatSocket.on("typing", ({ room, user }) => {
        if (room?._id === _id)
          updateTypingStatus({ isTyping: true, name: user?.name });
      });
    };

    const listenStopTyping = () => {
      chatSocket.on("stop typing", ({ room }) => {
        if (room?._id === _id)
          updateTypingStatus({ isTyping: false, name: null });
      });
    };

    listenStartTyping();
    listenStopTyping();
  });

  const handelSelectChat = () => {
    dispatch(updateCurrentChat(props));
    dispatch(setActitvityLabel(MENU_ITEMS.CHATS.label));
  };

  return (
    <div
      className={cx(classes.chatCard, {
        [classes.active]: currentChat?._id === _id,
      })}
      onClick={handelSelectChat}
    >
      <Avatar
        src={userIcon}
        alt={chatName || ""}
        size="sm"
        className={classes.avatar}
      />
      <div className={classes.chatInfo}>
        <div className={classes.chatInfoField}>
          <h4 className={classes.chatName}>{buildChatName(props, user)}</h4>
          <p className={classes.updates}>{formatTimestamp(updatedAt) ?? ""}</p>
        </div>
        <div className={classes.chatInfoField}>
          {typingStatus.isTyping ? (
            <Typography
              variant="small"
              className={classes.typingStatus}
            >{`${typingStatus.name} is typing`}</Typography>
          ) : (
            <p className={classes.latestMessage}>
              {latestMessage ? (
                `${latestMessage?.sender?.name}: ${latestMessage?.content}`
              ) : (
                <span>No messages yet!</span>
              )}
            </p>
          )}
          {/* replace this with correct/new feature */}
          <p className={classes.unreadMsgCount}>{unreadMsgCount || 10}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
