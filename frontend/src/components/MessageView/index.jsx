import {
  Avatar,
  Button,
  Spinner,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import cx from "classnames";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineSend } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import _ from "underscore";
import userIcon from "../../assets/profile-user_64572.png";
import { buildChatName } from "../../helpers/helpers";
import { setCurrentChat } from "../../store/Features/Chat/ChatSlice";
import {
  useLazyFetchChatMessagesQuery,
  useSendMessageMutation,
} from "../../store/Services/messageAPI";
import MessageCard from "../MessageCard";
import classes from "./index.module.css";

const MessageView = ({ className }) => {
  const user = useSelector((state) => state.auth.user);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [fetchCurrChatMessages, { isLoading }] =
    useLazyFetchChatMessagesQuery();
  const [sendChatMessage] = useSendMessageMutation();
  const currentChat = useSelector((state) => state.chat.currentChat);
  const messages = useSelector((state) => state.message.messages);

  useEffect(() => {
    const fetchChatMessages = async (chatId) => {
      try {
        await fetchCurrChatMessages(chatId);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentChat) fetchChatMessages(currentChat._id);
  }, [currentChat, fetchCurrChatMessages]);

  const sendMessage = async (formData) => {
    try {
      await sendChatMessage({
        content: formData?.message,
        chatId: currentChat?._id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const throttleSendMessage = _.throttle(sendMessage, 800);

  const closeActivity = () => {
    dispatch(setCurrentChat(null));
  };

  return (
    <div className={cx(classes.messageViewContainer, className)}>
      {/* chat header */}
      <div className={classes.chatHeader}>
        <Button
          variant="text"
          onClick={closeActivity}
          className={classes.closeBtn}
        >
          <IoIosArrowBack size={20} />
        </Button>
        <Avatar src={userIcon} alt={""} size="sm" className={classes.avatar} />
        <Typography variant="h5" className={classes.chatName}>
          {buildChatName(currentChat, user)}
        </Typography>
      </div>
      {/* messages window */}
      <div className={classes.messageContainer}>
        {isLoading ? (
          <div className={classes.spinLoaderContainer}>
            <Spinner className={classes.spinner} />
            <span>Loading messages</span>
          </div>
        ) : messages?.length ? (
          messages.map((message) => (
            <MessageCard key={message._id} {...message} />
          ))
        ) : (
          <Typography variant="h6" className={classes.noMessage}>
            No messages to show!
          </Typography>
        )}
      </div>
      {/* send message form */}
      <div className={classes.sendMsgForm}>
        <form
          className={classes.messageForm}
          onSubmit={handleSubmit(throttleSendMessage)}
        >
          <Textarea
            rows={1}
            resize={true}
            placeholder="Type your message"
            className={classes.textArea}
            containerProps={{
              className: classes.containerProps,
            }}
            labelProps={{
              className: classes.labelProps,
            }}
            {...register("message", { required: true })}
          />
          <Button type="submit" className={classes.sendMsgBtn}>
            <AiOutlineSend />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MessageView;
