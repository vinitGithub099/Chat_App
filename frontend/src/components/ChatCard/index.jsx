import { Typography } from "@material-tailwind/react";
import cx from "classnames";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MENU_ITEMS } from "../../constants/sideMenu";
import { TYPOGRAPHY_VARIANT } from "../../constants/variants";
import { buildChatName, formatTimestamp } from "../../helpers/helpers";
import useTypingStatus from "../../hooks/useTypingStatus";
import { updateCurrentChat } from "../../store/Features/Chat/chatSlice";
import { setActitvityLabel } from "../../store/Features/UI/uiSlice";
import ChatAvatar from "../ChatAvatar";
import classes from "./index.module.css";

const ChatCard = (props) => {
  const { _id, latestMessage } = props;
  const currentChat = useSelector((state) => state.chat.currentChat);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const chatName = useMemo(() => buildChatName(props, user), [props, user]);

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
      <ChatAvatar src={""} chat={props} />
      <div className={classes.chatInfo}>
        <div className={classes.chatInfoField}>
          <h4 className={classes.chatName}>{chatName}</h4>
          <p className={classes.updates}>
            {formatTimestamp(latestMessage?.updatedAt) ?? ""}
          </p>
        </div>
        <div className={classes.chatInfoField}>
          {typingStatus.isTyping ? (
            <Typography
              variant={TYPOGRAPHY_VARIANT.SMALL}
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
