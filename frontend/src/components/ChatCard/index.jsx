import { Avatar, Typography } from "@material-tailwind/react";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import userIcon from "../../assets/profile-user_64572.png";
import { MENU_ITEMS } from "../../constants/sideMenu";
import { buildChatName, formatTimestamp } from "../../helpers/helpers";
import useTypingStatus from "../../hooks/useTypingStatus";
import { updateCurrentChat } from "../../store/Features/Chat/chatSlice";
import { setActitvityLabel } from "../../store/Features/UI/uiSlice";
import classes from "./index.module.css";

const ChatCard = (props) => {
  const { _id, chatName, latestMessage } = props;
  const currentChat = useSelector((state) => state.chat.currentChat);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  // Continuously listen typing events for each chat card
  const [typingStatus] = useTypingStatus(_id);

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
          <p className={classes.updates}>
            {formatTimestamp(latestMessage?.updatedAt) ?? ""}
          </p>
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
          {/* build a functionality to show unread messages here */}
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
