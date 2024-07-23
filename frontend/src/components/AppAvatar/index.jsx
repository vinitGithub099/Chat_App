import cx from "classnames";
import { AVATAR_TYPE } from "../../constants/avatarType";
import ChatAvatar from "./ChatAvatar";
import classes from "./index.module.css";
import UserAvatar from "./UserAvatar";

const AppAvatar = ({ entity, className, size = "md", type }) => {
  const avatarClass = cx(classes.avatar, className, getAvatarSizeClass(size));

  const renderAvatar = () => {
    console.log("renderAvatar");
    switch (type) {
      case AVATAR_TYPE.CHAT:
        return <ChatAvatar chat={entity} className={avatarClass} size={size} />;
      case AVATAR_TYPE.USER:
        return <UserAvatar user={entity} className={avatarClass} size={size} />;
      default:
        return null;
    }
  };

  return renderAvatar();
}

const getAvatarSizeClass = (size) => {
  switch (size) {
    case "xs":
      return classes.avatarXs;
    case "sm":
      return classes.avatarSm;
    case "md":
      return classes.avatarMd;
    case "lg":
      return classes.avatarLg;
    case "xl":
      return classes.avatarXl;
    case "2xl":
      return classes.avatarXxl;
    default:
      return classes.avatarMd;
  }
};

export { AVATAR_TYPE };
export default AppAvatar;
