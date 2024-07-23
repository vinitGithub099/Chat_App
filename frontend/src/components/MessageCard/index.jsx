import cx from "classnames";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AVATAR_TYPE } from "../../constants/avatarType";
import { formatTimestamp } from "../../helpers/helpers";
import AppAvatar from "../AppAvatar";
import classes from "./index.module.css";

const MessageCard = ({ sender, content, updatedAt }) => {
  const user = useSelector((state) => state.auth.user);
  const [isSender] = useState(sender._id === user._id);

  const buildSenderName = () => (!isSender ? sender.name : "");

  return (
    <div
      className={cx(
        classes.messageCard,
        {
          [classes.floatLeft]: !isSender,
        },
        { [classes.floatRight]: isSender }
      )}
    >
      <div className={classes.triangle}></div>
      {sender._id !== user._id ? (
        <AppAvatar entity={sender} className={classes.avatar} size="xs" type={AVATAR_TYPE.USER} />
      ) : null}
      <div
        className={cx(
          classes.details,
          { [classes.nonSenderBg]: !isSender },
          { [classes.senderBg]: isSender }
        )}
      >
        <div className={classes.senderName}>{buildSenderName()}</div>
        <div className={classes.messageGroup}>
          <p className={classes.content}>{content}</p>
          <p className={classes.timeStamp}>{formatTimestamp(updatedAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
