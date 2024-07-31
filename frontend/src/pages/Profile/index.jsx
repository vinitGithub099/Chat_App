import { Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import AppAvatar from "../../components/AppAvatar";
import { AVATAR_TYPE } from "../../constants/avatarType";
import { TYPOGRAPHY_VARIANT } from "../../constants/variants";
import classes from "./index.module.css";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className={classes.profileContainer}>
      <section className={classes.profileSection}>
        <div className={classes.profileHeader}>
          <AppAvatar entity={user} type={AVATAR_TYPE.USER} size="4xl" />
          <div>
            <Typography
              variant={TYPOGRAPHY_VARIANT.H1}
              className={classes.userName}
            >
              {user?.name}
            </Typography>
            <Typography
              variant={TYPOGRAPHY_VARIANT.LEAD}
              className={classes.userEmail}
            >
              {`~ ${user?.email}`}
            </Typography>
          </div>
        </div>
        <fieldset>
          <legend>BIO</legend>
          <Typography className={classes.userBio}>
            {user?.bio
              ? user.bio
              : "You have not updated your bio yet. Kindly update it!"}
          </Typography>
        </fieldset>
      </section>
    </div>
  );
};

export default Profile;
