import cx from "classnames";
import logo from "../../assets/logo1.jpg";
import { AVATAR_SIZE } from "../../constants/avatar";
import Avatar from "../Avatar";
import classes from ".//index.module.css";

const Logo = ({ size = AVATAR_SIZE.MEDIUM, className }) => {
  const logoNameClass = cx({
    [classes.logoNameSmall]: size === AVATAR_SIZE.SMALL,
    [classes.logoNameMedium]: size === AVATAR_SIZE.MEDIUM,
    [classes.logoNameLarge]: size === AVATAR_SIZE.LARGE,
  });

  const containerClass = cx(classes.logoContainer, className);

  return (
    <div className={containerClass}>
      <Avatar src={logo} size={size} />
      <p className={logoNameClass}>chathub</p>
    </div>
  );
};
export default Logo;
