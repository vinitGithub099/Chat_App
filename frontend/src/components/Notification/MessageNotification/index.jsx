import { Avatar, Button, Typography } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import userLogo from "../../../assets/profile-user_64572.png";
import classes from "./index.module.css";

const MessageNotification = ({ sender, content, id }) => {
  const removeToast = () => toast.remove(id);
  return (
    <div className={classes.msgToastContainer}>
      <Avatar size="xs" src={userLogo} className={classes.msgToastAvatar} />
      <div className={classes.msgInfo}>
        <Typography variant="h6" className={classes.msgSender}>
          {sender?.name ?? "Unknown"}
        </Typography>
        <Typography variant="small" className={classes.msgContent}>
          {content}
        </Typography>
      </div>
      <Button
        variant="text"
        onClick={removeToast}
        className={classes.msgToastDimissBtn}
      >
        <AiOutlineClose />
      </Button>
    </div>
  );
};

export default MessageNotification;
