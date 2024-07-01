import { Button, Drawer, Typography } from "@material-tailwind/react";
import cx from "classnames";
import { AiOutlineMenu } from "react-icons/ai";
import { TbReload } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { MENU_ITEMS } from "../../constants/sideMenu";
import { toggleSidebar } from "../../store/Features/UI/UISlice";
import ChatList from "../ChatList";
import ChatSidebar from "../ChatSidebar";
import classes from "./index.module.css";

const ChatContent = ({ className }) => {
  const { isSidebarOpen, contentLabel } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const handleSidebar = (e) => {
    dispatch(toggleSidebar(e?.currentTarget?.value === "true" || e));
  };

  const errorFallback = (
    <Button variant="outlined" className={classes.errBtn} ripple={false}>
      Refresh
      <TbReload size={20} />
    </Button>
  );

  const renderContent = (contentLabel) => {
    switch (contentLabel) {
      case MENU_ITEMS.CHATS.label:
        return <ChatList />;
      case MENU_ITEMS.STATUS.label:
        return (
          <Typography variant="h6" className="text-center">
            Under Development
          </Typography>
        );
      default:
        return errorFallback;
    }
  };

  return (
    <div className={cx(classes.chatContentContainer, className)}>
      <div className={classes.chatContentHeader}>
        <Button
          variant="text"
          className={classes.menuIcon}
          onClick={handleSidebar}
          value={true}
          ripple={false}
        >
          <AiOutlineMenu size={20} />
        </Button>
        <Typography variant="h5">{contentLabel}</Typography>
      </div>
      <div className={classes.content}>{renderContent(contentLabel)}</div>
      <Drawer placement="left" open={!!isSidebarOpen} onClose={handleSidebar}>
        <ChatSidebar />
      </Drawer>
    </div>
  );
};

export default ChatContent;
