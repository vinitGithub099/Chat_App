import { Typography } from "@material-tailwind/react";
import cx from "classnames";
import { useSelector } from "react-redux";
import { MENU_ITEMS } from "../../constants/sideMenu";
import MessageView from "../MessageView";
import classes from "./index.module.css";

const ChatActivity = ({ className }) => {
  const activityLabel = useSelector((state) => state.ui.activityLabel);

  const errorFallback = (
    <Typography className={classes.errDiv}>
      Select something to see the activity!
    </Typography>
  );

  const renderView = (activityLabel) => {
    switch (activityLabel) {
      case MENU_ITEMS.CHATS.label:
        return <MessageView className="" />;
      case MENU_ITEMS.STATUS.label:
        return (
          <Typography variant="h4" className="text-center">
            Under Development
          </Typography>
        );
      default:
        return errorFallback;
    }
  };

  return (
    <div className={cx(classes.activityContainer, className)}>
      {renderView(activityLabel)}
    </div>
  );
};

export default ChatActivity;
