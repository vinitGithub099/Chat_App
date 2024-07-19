import { Avatar, Button, Typography } from "@material-tailwind/react";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import userIcon from "../../../assets/profile-user_64572.png";
import { buildChatName } from "../../../helpers/helpers";
import useTypingStatus from "../../../hooks/useTypingStatus";
import { updateCurrentChat } from "../../../store/Features/Chat/chatSlice";
import { setActitvityLabel } from "../../../store/Features/UI/uiSlice";
import classes from "./index.module.css";

const ChatHeader = ({ handleChatInfo }) => {
  const currentChat = useSelector((state) => state.chat.currentChat);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

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
      <Avatar src={userIcon} alt={""} size="sm" className={classes.avatar} />
      <div className={classes.chatHeaderDetails}>
        <Typography
          variant="h6"
          className={classes.chatName}
          onClick={handleChatInfo}
        >
          {buildChatName(currentChat, user)}
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
