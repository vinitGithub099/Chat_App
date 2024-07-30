import { Button, Typography } from "@material-tailwind/react";
import cx from "classnames";
import { useMemo } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  BUTTON_VARIANT,
  TYPOGRAPHY_VARIANT,
} from "../../../constants/variants";
import { buildChatName } from "../../../helpers/helpers";
import useTypingStatus from "../../../hooks/useTypingStatus";
import { updateCurrentChat } from "../../../store/Features/Chat/chatSlice";
import { setActitvityLabel } from "../../../store/Features/UI/uiSlice";
import AppAvatar from "../../AppAvatar";
import classes from "./index.module.css";
import { AVATAR_TYPE } from "../../../constants/avatarType";

const MessageHeader = ({ handleChatInfo }) => {
  const currentChat = useSelector((state) => state.chat.currentChat);
  const user = useSelector((state) => state.auth.user);
  const onlineUsers = useSelector((state) => state.onlineUsers);
  const dispatch = useDispatch();
  const isOnline = useMemo(
    () =>
      !currentChat?.isGroupChat &&
      currentChat?.users.some(
        (member) => member._id !== user?._id && onlineUsers[member._id]
      ),
    [currentChat?.isGroupChat, currentChat?.users, onlineUsers, user?._id]
  );

  // Continuously listen to the typing events of currently selected chat
  const [typingStatus] = useTypingStatus(currentChat?._id);

  const closeActivity = () => {
    dispatch(updateCurrentChat(null));
    dispatch(setActitvityLabel(null));
  };

  const renderOnlineStaus = () => {
    if (typingStatus.isTyping) {
      return `${typingStatus.name} is typing`;
    }
    if (!currentChat?.isGroupChat) {
      return isOnline ? `Online` : `Offline`;
    }
    return ``;
  };

  return (
    <div className={classes.messageHeader}>
      <Button
        variant={BUTTON_VARIANT.TEXT}
        onClick={closeActivity}
        className={classes.closeBtn}
      >
        <IoIosArrowBack size={20} />
      </Button>
      <AppAvatar
        entity={currentChat}
        size="lg"
        type={AVATAR_TYPE.CHAT}
      />
      <div className={classes.messageHeaderDetails}>
        <Typography
          variant={TYPOGRAPHY_VARIANT.H6}
          className={classes.chatName}
          onClick={handleChatInfo}
        >
          {buildChatName(currentChat, user)}
        </Typography>
        <Typography
          variant={TYPOGRAPHY_VARIANT.SMALL}
          className={cx(
            classes.chatStatus,
            { [classes.onlineStatus]: isOnline && !typingStatus.isTyping },
            { [classes.typingStatus]: typingStatus.isTyping }
          )}
        >
          {renderOnlineStaus()}
        </Typography>
      </div>
    </div>
  );
};

export default MessageHeader;
