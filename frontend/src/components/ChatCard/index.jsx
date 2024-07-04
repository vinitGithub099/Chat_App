import { Avatar } from "@material-tailwind/react";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import userIcon from "../../assets/profile-user_64572.png";
import { MENU_ITEMS } from "../../constants/sideMenu";
import { setCurrentChat } from "../../store/Features/Chat/ChatSlice";
import { setActitvityLabel } from "../../store/Features/UI/UISlice";
import classes from "./index.module.css";
import { buildChatName, formatTimestamp } from "../../helpers/helpers";

const ChatCard = (props) => {
  const { _id, chatName, latestMessage, unreadMsgCount, updatedAt } = props;
  const currentChat = useSelector((state) => state.chat.currentChat);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handelSelectChat = () => {
    dispatch(setCurrentChat(props));
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
          <p className={classes.latestMessage}>
            {latestMessage ? (
              `${latestMessage?.sender?.name}: ${latestMessage?.content}`
            ) : (
              <span>No messages yet!</span>
            )}
          </p>
          {/* replace this with correct/new feature */}
          <p className={classes.unreadMsgCount}>{unreadMsgCount || 10}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;