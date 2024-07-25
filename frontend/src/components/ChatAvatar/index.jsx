import { Avatar } from "@material-tailwind/react";
import cx from "classnames";
import { useMemo } from "react";
import { FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";
import { buildChatName, stringToColor } from "../../helpers/helpers";
import classes from "./index.module.css";

const ChatAvatar = ({ chat, className, size = "md" }) => {
  const randomColor = useMemo(() => stringToColor(chat._id), [chat._id]);
  const user = useSelector((state) => state.auth.user);

  const userName = useMemo(() => buildChatName(chat, user), [chat, user]);

  const avatarClass = cx(classes.avatar, className, {
    [classes.avatarXs]: size === "xs",
    [classes.avatarSm]: size === "sm",
    [classes.avatarMd]: size === "md",
    [classes.avatarLg]: size === "lg",
    [classes.avatarXl]: size === "xl",
    [classes.avatarXxl]: size === "2xl",
  });

  if (chat?.imageSrc) {
    return <Avatar src={chat.imageSrc} className={avatarClass} />;
  } else if (chat?.isGroupChat) {
    return (
      <div className={avatarClass} style={{ backgroundColor: randomColor }}>
        <FaUsers />
      </div>
    );
  } else {
    const initials = userName.charAt(0).toUpperCase();

    return (
      <div className={avatarClass} style={{ backgroundColor: randomColor }}>
        <span>{initials}</span>
      </div>
    );
  }
};

export default ChatAvatar;
