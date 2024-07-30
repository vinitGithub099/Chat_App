import { Button } from "@material-tailwind/react";
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillSendFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import _ from "underscore";
import { BUTTON_VARIANT } from "../../../constants/variants";
import { chatSocket } from "../../../main";
import { appendMessage } from "../../../store/Features/Message/messageSlice";
import { useSendMessageMutation } from "../../../store/Services/messageAPI";
import AutoResizeTextArea from "../../AutoResizeTextArea";
import { FORM_FIELD } from "./fieldNames";
import classes from "./index.module.css";

const MessageForm = () => {
  const { handleSubmit, control } = useForm();
  const typingTimeout = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const currentChat = useSelector((state) => state.chat.currentChat);
  const [sendChatMessage] = useSendMessageMutation();
  const [messageState, setMessageState] = useState("");

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
      setMessageState("");
      emitStopTyping();
      updateMessages(res.data);
      chatSocket.emit("new message", { newMessage: res.data }, () => {});
    } catch (error) {
      console.log(error);
    }
  };

  const throttleSendMessage = _.throttle(sendMessage, 800);

  const handleChange = (e) => {
    const value = e.currentTarget.value;
    if (value) emitStartTyping();

    // immediately update the messageState
    setMessageState(value);
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
        <AutoResizeTextArea
          control={control}
          name={FORM_FIELD.MESSAGE}
          placeholder={"Type your message here..."}
          className={classes.textarea}
          rows={1}
          cols={70}
          value={messageState}
          onChange={handleChange}
        />
        <Button
          variant={BUTTON_VARIANT.TEXT}
          type="submit"
          className={classes.sendMsgBtn}
        >
          <BsFillSendFill size={20} />
        </Button>
      </form>
    </div>
  );
};

export default MessageForm;
