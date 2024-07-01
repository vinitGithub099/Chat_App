import cx from "classnames";
import { useSelector } from "react-redux";
import ChatActivity from "../../components/ChatActivity";
import ChatContent from "../../components/ChatContent";
import classes from "./index.module.css";

const Chats = () => {
  const currentChat = useSelector((state) => state.chat.currentChat);

  return (
    <div className={classes.chatContainer}>
      <ChatContent
        className={cx(classes.chatContentBar, {
          [classes.hide]: !!currentChat === true,
        })}
      />
      <ChatActivity
        className={cx(classes.chatActivity, {
          [classes.hide]: !!currentChat === false,
        })}
      />
    </div>
  );
};

export default Chats;
