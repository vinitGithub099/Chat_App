import { Typography } from "@material-tailwind/react";
import cx from "classnames";
import { AVATAR_TYPE } from "../../constants/avatarType";
import { TYPOGRAPHY_VARIANT } from "../../constants/variants";
import AppAvatar from "../AppAvatar";
import classes from "./index.module.css";

const UserCard = ({ className, avatarSize, user, onClick }) => {
  return (
    <div className={cx(classes.userCardContainer, className)} onClick={onClick}>
      <AppAvatar
          entity={user}
          size={avatarSize}
          type={AVATAR_TYPE.USER}
        />
      <div className={classes.userInfo}>
        <Typography variant={TYPOGRAPHY_VARIANT.SMALL} className={classes.userName}>
          {user.name ?? ""}
        </Typography>
        <Typography variant={TYPOGRAPHY_VARIANT.SMALL} className={classes.userEmail}>
          {user.email ?? ""}
        </Typography>
      </div>
    </div>
  );
};

export default UserCard;
