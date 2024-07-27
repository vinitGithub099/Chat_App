import { Typography } from "@material-tailwind/react";
import cx from "classnames";
import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AVATAR_TYPE } from "../../constants/avatarType";
import { TYPOGRAPHY_VARIANT } from "../../constants/variants";
import AppAvatar from "../AppAvatar";
import classes from "./index.module.css";

const MessageCard = ({ sender, content, updatedAt }) => {
  const user = useSelector((state) => state.auth.user);
  const [isSender] = useState(sender._id === user._id);
  const [isExpanded, setIsExpanded] = useState(false);

  const buildSenderName = () => (!isSender ? sender.name : "");

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const truncateContent = (text, limit) => {
    if (text.length <= limit) {
      return text;
    }
    return isExpanded ? text : text.substring(0, limit) + "...";
  };

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
        <AppAvatar
          entity={sender}
          className={classes.avatar}
          size="xs"
          type={AVATAR_TYPE.USER}
        />
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
          <Typography
            variant={TYPOGRAPHY_VARIANT.SMALL}
            className={classes.content}
          >
            {truncateContent(content, 500)}
            {content.length > 100 && (
              <span onClick={toggleReadMore} className={classes.toggleText}>
                {isExpanded ? "Read Less" : "Read More"}
              </span>
            )}
          </Typography>
          <Typography
            variant={TYPOGRAPHY_VARIANT.SMALL}
            className={classes.timeStamp}
          >
            {moment(updatedAt).format("HH:mm")}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
