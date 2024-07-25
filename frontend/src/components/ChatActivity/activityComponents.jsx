import { Typography } from "@material-tailwind/react";
import { MENU_ITEMS } from "../../constants/sideMenu";
import { TYPOGRAPHY_VARIANT } from "../../constants/variants";
import MessageView from "../MessageView";
import classes from "./index.module.css";

export const UnderDevelopment = () => (
  <Typography variant={TYPOGRAPHY_VARIANT.H4}>Under Development</Typography>
);

export const DefaultFallback = () => (
  <Typography variant={TYPOGRAPHY_VARIANT.SMALL} className={classes.errDiv}>
    Select something to see the activity!
  </Typography>
);

export const activityComponents = {
  [MENU_ITEMS.CHATS.label]: (props) => <MessageView {...props} />,
  [MENU_ITEMS.STATUS.label]: UnderDevelopment,
  default: DefaultFallback,
};

