import { Typography } from "@material-tailwind/react";
import cx from "classnames";
// import logo from "../../assets/chat.png";
import { RiChatSmile2Fill } from "react-icons/ri";
import { APP_NAME } from "../../../appName";
import classes from "./index.module.css";

const Logo = ({ size = "md", className }) => {
  const logoNameClass = cx(classes.logoName, {
    [classes.logoNameExtraSmall]: size === "xs",
    [classes.logoNameSmall]: size === "sm",
    [classes.logoNameMedium]: size === "md",
    [classes.logoNameLarge]: size === "lg",
    [classes.logoNameExtraLarge]: size === "xl",
    [classes.logoNameDExtraLarge]: size === "2xl",
  });

  const containerClass = cx(classes.logoContainer, className);

  return (
    <div className={containerClass}>
      <RiChatSmile2Fill className={cx(classes.avatar, getSizeClass(size))} />
      <Typography className={logoNameClass}>{APP_NAME}</Typography>
    </div>
  );
};

export default Logo;

const getSizeClass = (size) => {
  switch (size) {
    case "xs":
      return classes.logoXs;
    case "sm":
      return classes.logoSm;
    case "md":
      return classes.logoMd;
    case "lg":
      return classes.logoLg;
    case "xl":
      return classes.logoXl;
    case "2xl":
      return classes.logoXxl;
    case "3xl":
      return classes.logoXxxl;
    case "4xl":
      return classes.logoXxxl;
    default:
      return classes.logoMd;
  }
};
