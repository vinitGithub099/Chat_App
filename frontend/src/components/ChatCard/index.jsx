import { Typography } from "@material-tailwind/react";
import cx from "classnames";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AVATAR_TYPE } from "../../constants/avatarType";
import { MENU_ITEMS } from "../../constants/sideMenu";
import { TYPOGRAPHY_VARIANT } from "../../constants/variants";
import { buildChatName } from "../../helpers/helpers";
import useTypingStatus from "../../hooks/useTypingStatus";
import { updateCurrentChat } from "../../store/Features/Chat/chatSlice";
import { setActitvityLabel } from "../../store/Features/UI/uiSlice";
import AppAvatar from "../AppAvatar";
import classes from "./index.module.css";

const ChatCard = (props) => {
  const { _id, isGroupChat, latestMessage } = props;
  const currentChat = useSelector((state) => state.chat.currentChat);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  // Continuously listen typing events for each chat card
  const [typingStatus] = useTypingStatus(_id);

  const handelSelectChat = () => {
    dispatch(updateCurrentChat(props));
    dispatch(setActitvityLabel(MENU_ITEMS.CHATS.label));
  };

  const buildTextContent = () => {
    if (typingStatus.isTyping) {
      return isGroupChat ? `${typingStatus.name} is typing` : `typing...`;
    }

    if (latestMessage) {
      return `${latestMessage.sender.name}: ${latestMessage.content}`;
    }

    return `No messages yet!`;
  };

  return (
    <div
      className={cx(classes.chatCard, {
        [classes.active]: currentChat?._id === _id,
      })}
      onClick={handelSelectChat}
    >
      <AppAvatar src={""} entity={props} type={AVATAR_TYPE.CHAT} />
      <div className={classes.chatInfo}>
        <div className={classes.chatInfoField}>
          <Typography
            variant={TYPOGRAPHY_VARIANT.H4}
            className={classes.chatName}
          >
            {buildChatName(props, user)}
          </Typography>
          <Typography
            variant={TYPOGRAPHY_VARIANT.SMALL}
            className={classes.updates}
          >
            {moment(latestMessage?.updatedAt).format("HH:mm") ?? ""}
          </Typography>
        </div>
        <Typography
          variant={TYPOGRAPHY_VARIANT.SMALL}
          className={cx(
            { [classes.typingStatus]: typingStatus.isTyping },
            { [classes.latestMessage]: !typingStatus.isTyping }
          )}
        >
          {buildTextContent()}
        </Typography>
      </div>
    </div>
  );
};

export default ChatCard;
