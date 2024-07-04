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
import { chatSocket } from "../../main";
import { setCurrentChat } from "../../store/Features/Chat/ChatSlice";
import { appendMessage } from "../../store/Features/Message/MessageSlice";
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

  // fetch chat messages of the current chat when this compoenent mounts and  updates
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

  // join chat room when this compoenent is mounts and updates
  useEffect(() => {
    chatSocket.emit("join chat", { user: user, room: currentChat });
  }, [currentChat, user]);

  const updateMessages = (newMessage) => {
    dispatch(appendMessage(newMessage));
  };

  const sendMessage = async (formData) => {
    try {
      const res = await sendChatMessage({
        content: formData?.message,
        chatId: currentChat?._id,
      });
      chatSocket.emit("new message", { newMessage: res.data }, () => {
        updateMessages(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // optimized send message using throttling
  const throttleSendMessage = _.throttle(sendMessage, 800);

  // deselect currentChat when back button is clicked
  // this function is meant for mobile screens only
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
