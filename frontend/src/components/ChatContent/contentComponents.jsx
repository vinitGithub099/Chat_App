import { Typography } from "@material-tailwind/react";
import { MENU_ITEMS } from "../../constants/sideMenu";
import { TYPOGRAPHY_VARIANT } from "../../constants/variants";
import ChatList from "../ChatList";

export const UnderDevelopment = () => (
  <Typography variant={TYPOGRAPHY_VARIANT.H4}>Under Development</Typography>
);

export const contentComponents = {
  [MENU_ITEMS.CHATS.label]: (props) => <ChatList {...props} />,
  [MENU_ITEMS.STATUS.label]: UnderDevelopment,
  default: () => null,
};

