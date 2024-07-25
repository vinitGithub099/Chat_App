import { Button, Drawer, Typography } from "@material-tailwind/react";
import cx from "classnames";
import { useMemo, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { BUTTON_VARIANT, TYPOGRAPHY_VARIANT } from "../../constants/variants";
import { toggleSidebar } from "../../store/Features/UI/uiSlice";
import ChatForm from "../ChatForm";
import ChatSidebar from "../ChatSidebar";
import { contentComponents } from "./contentComponents";
import classes from "./index.module.css";

const ChatContent = ({ className }) => {
  const { isSidebarOpen, contentLabel } = useSelector((state) => state.ui);
  const [isChatFormOpen, setisChatFormOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSidebar = (e) => {
    dispatch(toggleSidebar(e?.currentTarget?.value === "true" || e));
  };

  const toggleChatForm = () => setisChatFormOpen((prev) => !prev);

  const RenderComponent = useMemo(
    () => contentComponents[contentLabel] || contentComponents.default,
    [contentLabel]
  );

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
      <div className={classes.content}>
        <RenderComponent />
      </div>
      <Drawer placement="left" open={!!isSidebarOpen} onClose={handleSidebar}>
        <ChatSidebar />
      </Drawer>
      <ChatForm {...{ isChatFormOpen, toggleChatForm }} />
    </div>
  );
};

export default ChatContent;
