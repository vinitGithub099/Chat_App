import { Typography } from "@material-tailwind/react";
import cx from "classnames";
import { useSelector } from "react-redux";
import { MENU_ITEMS } from "../../constants/sideMenu";
import MessageView from "../MessageView";
import classes from "./index.module.css";

const ChatActivity = ({ className }) => {
  const activityLabel = useSelector((state) => state.ui.activityLabel);

  const defaultFallback = (
    <Typography className={classes.errDiv}>
      Select something to see the activity!
    </Typography>
  );

  const renderView = (activityLabel) => {
    switch (activityLabel) {
      case MENU_ITEMS.CHATS.label:
        return <MessageView />;
      case MENU_ITEMS.STATUS.label:
        return <Typography variant="h4">Under Development</Typography>;
      default:
        return defaultFallback;
    }
  };

  return (
    <div className={cx(classes.activityContainer, className)}>
      {renderView(activityLabel)}
    </div>
  );
};

export default ChatActivity;
