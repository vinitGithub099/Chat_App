import { Avatar, Typography } from "@material-tailwind/react";
import cx from "classnames";
import userLogo from "../../assets/profile-user_64572.png";
import { TYPOGRAPHY_VARIANT } from "../../constants/variants";
import classes from "./index.module.css";

const UserCard = ({ className, avatarSize, user, onClick }) => {
  return (
    <div className={cx(classes.userCardContainer, className)} onClick={onClick}>
      <Avatar
        src={user.pic || userLogo}
        size={avatarSize}
        className={classes.avatar}
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
