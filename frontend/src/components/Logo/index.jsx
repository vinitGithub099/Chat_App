import { Avatar, Typography } from "@material-tailwind/react";
import cx from "classnames";
import logo from "../../assets/chat.png";
import classes from "./index.module.css";

const Logo = ({ size = "md", className }) => {
  const logoNameClass = cx(classes.logoName, {
    [classes.logoNameExtraSmall]: size === "xs",
    [classes.logoNameSmall]: size === "sm",
    [classes.logoNameMedium]: size === "md",
    [classes.logoNameLarge]: size === "lg",
    [classes.logoNameExtraLarge]: size === "xl",
    [classes.logoNameDExtraLarge]: size === "xxl",
  });

  const containerClass = cx(classes.logoContainer, className);

  return (
    <div className={containerClass}>
      <Avatar src={logo} size={size} variant="square" />
      <Typography className={logoNameClass}>QuickTalk</Typography>
    </div>
  );
};
export default Logo;
