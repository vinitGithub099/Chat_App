import { Button, Typography } from "@material-tailwind/react";
import { useMemo } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { buildChatName } from "../../../helpers/helpers";
import useTypingStatus from "../../../hooks/useTypingStatus";
import { updateCurrentChat } from "../../../store/Features/Chat/chatSlice";
import { setActitvityLabel } from "../../../store/Features/UI/uiSlice";
import ChatAvatar from "../../ChatAvatar";
import UserAvatar from "../../UserAvatar";
import classes from "./index.module.css";

const ChatHeader = ({ handleChatInfo }) => {
  const currentChat = useSelector((state) => state.chat.currentChat);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const chatName = useMemo(
    () => buildChatName(currentChat, user),
    [currentChat, user]
  );

  // Continuously listen to the typing events of currently selected chat
  const [typingStatus] = useTypingStatus(currentChat?._id);

  const closeActivity = () => {
    dispatch(updateCurrentChat(null));
    dispatch(setActitvityLabel(null));
  };

  return (
    <div className={classes.chatHeader}>
      <Button
        variant="text"
        onClick={closeActivity}
        className={classes.closeBtn}
        value={"back-btn"}
      >
        <IoIosArrowBack size={20} />
      </Button>
      {currentChat.isGroupChat ? (
        <ChatAvatar id={currentChat._id} src={""} />
      ) : (
        <UserAvatar id={currentChat._id} userName={chatName} size="md" />
      )}
      <div className={classes.chatHeaderDetails}>
        <Typography
          variant="h6"
          className={classes.chatName}
          onClick={handleChatInfo}
        >
          {chatName}
        </Typography>
        {typingStatus.isTyping ? (
          <Typography
            variant="small"
            className={classes.typingStatus}
          >{`${typingStatus.name} is typing`}</Typography>
        ) : (
          <Typography variant="small" className={classes.onlineStatus}>
            Unvavailable
          </Typography>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
