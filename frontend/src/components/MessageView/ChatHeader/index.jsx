import { Button, Typography } from "@material-tailwind/react";
import { useMemo } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { AVATAR_TYPE } from "../../../constants/avatarType";
import { BUTTON_VARIANT, TYPOGRAPHY_VARIANT } from "../../../constants/variants";
import { buildChatName } from "../../../helpers/helpers";
import useTypingStatus from "../../../hooks/useTypingStatus";
import { updateCurrentChat } from "../../../store/Features/Chat/chatSlice";
import { setActitvityLabel } from "../../../store/Features/UI/uiSlice";
import AppAvatar from "../../AppAvatar";
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
        variant={BUTTON_VARIANT.TEXT}
        onClick={closeActivity}
        className={classes.closeBtn}
      >
        <IoIosArrowBack size={20} />
      </Button>
      <AppAvatar entity={currentChat} src={""} type={AVATAR_TYPE.CHAT} />
      <div className={classes.chatHeaderDetails}>
        <Typography
          variant={TYPOGRAPHY_VARIANT.H6}
          className={classes.chatName}
          onClick={handleChatInfo}
        >
          {chatName}
        </Typography>
        {typingStatus.isTyping ? (
          <Typography
            variant={TYPOGRAPHY_VARIANT.SMALL}
            className={classes.typingStatus}
          >{`${typingStatus.name} is typing`}</Typography>
        ) : (
          <Typography variant={TYPOGRAPHY_VARIANT.SMALL} className={classes.onlineStatus}>
            Unvavailable
          </Typography>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
