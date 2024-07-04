import { Avatar } from "@material-tailwind/react";
import cx from "classnames";
import { useSelector } from "react-redux";
import logo from "../../assets/profile-user_64572.png";
import { formatTimestamp } from "../../helpers/helpers";
import classes from "./index.module.css";

const MessageCard = ({ className, sender, content, updatedAt }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className={cx(classes.messageCard, className)}>
      <div className={classes.triangle}></div>
      {sender._id !== user._id ? (
        <Avatar src={logo} alt="user" size="xs" className={classes.avatar} />
      ) : null}
      <div className={classes.details}>
        <div className={classes.senderName}>{sender.name}</div>
        <div className={classes.messageGroup}>
          <p className={classes.content}>{content}</p>
          <p className={classes.timeStamp}>{formatTimestamp(updatedAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
