import { Button, Drawer, Typography } from "@material-tailwind/react";
import cx from "classnames";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
import { TbReload } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { MENU_ITEMS } from "../../constants/sideMenu";
import { BUTTON_VARIANT, TYPOGRAPHY_VARIANT } from "../../constants/variants";
import { toggleSidebar } from "../../store/Features/UI/uiSlice";
import ChatForm from "../ChatForm";
import ChatList from "../ChatList";
import ChatSidebar from "../ChatSidebar";
import classes from "./index.module.css";

const ChatContent = ({ className }) => {
  const { isSidebarOpen, contentLabel } = useSelector((state) => state.ui);
  const [isChatFormOpen, setisChatFormOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSidebar = (e) => {
    dispatch(toggleSidebar(e?.currentTarget?.value === "true" || e));
  };

  const toggleChatForm = () => setisChatFormOpen((prev) => !prev);

  const defaultFallback = (
    <Button
      variant={BUTTON_VARIANT.OUTLINED}
      className={classes.errBtn}
      ripple={false}
    >
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
          <Typography variant={TYPOGRAPHY_VARIANT.H6}>
            Under Development
          </Typography>
        );
      default:
        return defaultFallback;
    }
  };

  return (
    <div className={cx(classes.chatContentContainer, className)}>
      <div className={classes.chatContentHeader}>
        <Button
          variant={BUTTON_VARIANT.TEXT}
          className={classes.menuIcon}
          onClick={handleSidebar}
          value={true}
        >
          <AiOutlineMenu size={20} />
        </Button>
        <Typography variant={TYPOGRAPHY_VARIANT.H5}>{contentLabel}</Typography>
        <Button
          variant={BUTTON_VARIANT.TEXT}
          className={classes.channelBtn}
          onClick={toggleChatForm}
        >
          <IoCreateOutline size={25} />
        </Button>
      </div>
      <div className={classes.content}>{renderContent(contentLabel)}</div>
      <Drawer placement="left" open={!!isSidebarOpen} onClose={handleSidebar}>
        <ChatSidebar />
      </Drawer>
      <ChatForm {...{ isChatFormOpen, toggleChatForm }} />
    </div>
  );
};

export default ChatContent;
