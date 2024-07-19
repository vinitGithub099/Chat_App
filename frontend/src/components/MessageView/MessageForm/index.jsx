import { Button, Textarea } from "@material-tailwind/react";
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineSend } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import _ from "underscore";
import { chatSocket } from "../../../main";
import { appendMessage } from "../../../store/Features/Message/messageSlice";
import { useSendMessageMutation } from "../../../store/Services/messageAPI";
import classes from "./index.module.css";

const MessageForm = () => {
  const { register, handleSubmit } = useForm();
  const typingTimeout = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const currentChat = useSelector((state) => state.chat.currentChat);
  const [sendChatMessage] = useSendMessageMutation();
  const [messageState, updateMessageState] = useState("");

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

      updateMessageState("");

      emitStopTyping();

      chatSocket.emit("new message", { newMessage: res.data }, () => {
        updateMessages(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const throttleSendMessage = _.throttle(sendMessage, 800);

  const handleChange = (e) => {
    const value = e.currentTarget.value;
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
  );
};

export default MessageForm;
