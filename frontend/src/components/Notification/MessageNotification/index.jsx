import { Avatar, Button, Typography } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import userLogo from "../../../assets/profile-user_64572.png";
import {
  BUTTON_VARIANT,
  TYPOGRAPHY_VARIANT,
} from "../../../constants/variants";
import classes from "./index.module.css";

const MessageNotification = ({ sender, content, chat, id }) => {
  const removeToast = () => toast.remove(id);

  const builtMessageContent = () => `${sender?.name}: ${content}`;

  const buildChatName = () =>
    chat?.isGroupChat ? chat.chatName : sender?.name;

  return (
    <div className={classes.msgToastContainer}>
      <Avatar size="xs" src={userLogo} className={classes.msgToastAvatar} />
      <div className={classes.msgInfo}>
        <Typography
          variant={TYPOGRAPHY_VARIANT.H6}
          className={classes.msgSender}
        >
          {buildChatName()}
        </Typography>
        <Typography
          variant={TYPOGRAPHY_VARIANT.SMALL}
          className={classes.msgContent}
        >
          {builtMessageContent()}
        </Typography>
      </div>
      <Button
        variant={BUTTON_VARIANT.TEXT}
        onClick={removeToast}
        className={classes.msgToastDimissBtn}
      >
        <AiOutlineClose />
      </Button>
    </div>
  );
};

export default MessageNotification;
