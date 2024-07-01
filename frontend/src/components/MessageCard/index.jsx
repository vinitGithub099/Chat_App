import { Avatar } from "@material-tailwind/react";
import cx from "classnames";
import logo from "../../assets/profile-user_64572.png";
import classes from "./index.module.css";

const MessageCard = ({ className, sender, content, timeStamp }) => {
  const extractTime = (timeStamp) =>
    new Date(timeStamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className={cx(classes.messageCard, className)}>
      <div className={classes.triangle}></div>
      {sender !== "You" ? (
        <Avatar src={logo} alt="user" size="xs" className={classes.avatar} />
      ) : null}
      <div className={classes.details}>
        <div className={classes.senderName}>{sender}</div>
        <div className={classes.messageGroup}>
          <p className={classes.content}>{content}</p>
          <p className={classes.timeStamp}>{extractTime(timeStamp)}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
