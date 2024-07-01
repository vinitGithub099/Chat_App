import { Avatar } from "@material-tailwind/react";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import userIcon from "../../assets/profile-user_64572.png";
import { MENU_ITEMS } from "../../constants/sideMenu";
import { setCurrentChat } from "../../store/Features/Chat/ChatSlice";
import { setActitvityLabel } from "../../store/Features/UI/UISlice";
import classes from "./index.module.css";

const ChatCard = ({
  chatName,
  sender,
  latestMessage,
  timeStamp,
  unreadMsgCount,
}) => {
  const currentChat = useSelector((state) => state.chat.currentChat);
  const dispatch = useDispatch();

  const handelSelectChat = (e) => {
    dispatch(setCurrentChat(e?.currentTarget?.dataset?.key));
    dispatch(setActitvityLabel(MENU_ITEMS.CHATS.label));
  };

  return (
    <div
      className={cx(classes.chatCard, {
        [classes.active]: currentChat === chatName,
      })}
      data-key={chatName}
      onClick={handelSelectChat}
    >
      <Avatar src={userIcon} alt={chatName || ""} size="sm"  className={classes.avatar} />
      <div className={classes.chatInfo}>
        <div className={classes.chatInfoField}>
          <h4 className={classes.chatName}>{chatName}</h4>
          <p className={classes.updates}>{timeStamp}</p>
        </div>
        <div className={classes.chatInfoField}>
          <p
            className={classes.latestMessage}
          >{`${sender.user.name}: ${latestMessage}`}</p>
          <p className={classes.unreadMsgCount}>{unreadMsgCount}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
