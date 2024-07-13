import {
  Avatar,
  Button,
  Spinner,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import cx from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineSend } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import _ from "underscore";
import userIcon from "../../assets/profile-user_64572.png";
import { buildChatName } from "../../helpers/helpers";
import useTypingStatus from "../../hooks/useTypingStatus";
import { chatSocket } from "../../main";
import { updateCurrentChat } from "../../store/Features/Chat/chatSlice";
import { appendMessage } from "../../store/Features/Message/messageSlice";
import {
  useLazyFetchChatMessagesQuery,
  useSendMessageMutation,
} from "../../store/Services/messageAPI";
import MessageCard from "../MessageCard";
import classes from "./index.module.css";

const MessageView = ({ className }) => {
  const user = useSelector((state) => state.auth.user);
  const currentChat = useSelector((state) => state.chat.currentChat);
  const messages = useSelector((state) => state.message.messages);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [fetchCurrChatMessages, { isLoading }] =
    useLazyFetchChatMessagesQuery();
  const [sendChatMessage] = useSendMessageMutation();
  const [messageState, updateMessageState] = useState("");
  const typingTimeout = useRef();

  // fetch chat messages of the current chat when this compoenent mounts and  updates
  useEffect(() => {
    if (currentChat) {
      fetchCurrChatMessages(currentChat._id).catch(console.error);
    }
  }, [currentChat, fetchCurrChatMessages]);

  // Continuously listen to the typing events of currently selected chat
  const [typingStatus] = useTypingStatus(currentChat?._id);

  // used for updating messages ui of sender
  const updateMessages = (newMessage) => {
    dispatch(appendMessage(newMessage));
  };

  const emitStartTyping = useCallback(
    _.debounce(() => {
      if (currentChat && user) {
        chatSocket.emit("typing", { room: currentChat, user });
      }
    }, 200),
    [currentChat, user]
  );

  const emitStopTyping = useCallback(
    _.debounce(() => {
      if (currentChat && user) {
        chatSocket.emit("stop typing", { room: currentChat, user });
      }
    }, 800),
    [currentChat, user]
  );

  const sendMessage = async (formData) => {
    try {
      const res = await sendChatMessage({
        content: formData?.message,
        chatId: currentChat?._id,
      });

      // update message input value to empty when message is saved in DB
      updateMessageState("");

      // stop typing effect once message is saved in DB
      emitStopTyping();

      // emit new message event when message is saved in DB
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
    dispatch(updateCurrentChat(null));
  };

  const handleChange = (e) => {
    const value = e.currentTarget.value;
    // console.log(value);
    if (value) emitStartTyping();

    // immediately update the messageState
    updateMessageState(value);

    // clear previous timeout
    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      emitStopTyping();
    }, 1000);
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
        <div className={classes.chatHeaderDetails}>
          <Typography variant="h5" className={classes.chatName}>
            {buildChatName(currentChat, user)}
          </Typography>
          {typingStatus.isTyping ? (
            <Typography
              variant="small"
              className={classes.typingStatus}
            >{`${typingStatus.name} is typing`}</Typography>
          ) : (
            <Typography variant="small" className={classes.onlineStatus}>
              Unvavailable
            </Typography>
          )}
        </div>
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
            spellCheck={true}
            value={messageState}
            onInput={handleChange}
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
