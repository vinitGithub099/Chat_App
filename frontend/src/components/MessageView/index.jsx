import cx from "classnames";
import { useState } from "react";
import ChatInfo from "../ChatInfo";
import ChatHeader from "./ChatHeader";
import classes from "./index.module.css";
import MessageForm from "./MessageForm";
import MessagesContainer from "./MessagesContainer";

const MessageView = ({ className }) => {
  const [openChatInfo, setOpenChatInfo] = useState(false);

  const handleChatInfo = () => setOpenChatInfo((prev) => !prev);

  return (
    <div className={cx(classes.messageViewContainer, className)}>
      <ChatHeader handleChatInfo={handleChatInfo} />
      <MessagesContainer />
      <MessageForm />
      {openChatInfo ? (
        <ChatInfo openChatInfo={openChatInfo} handleChatInfo={handleChatInfo} />
      ) : null}
    </div>
  );
};

export default MessageView;
