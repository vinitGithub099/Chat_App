import { Avatar, Button, Textarea, Typography } from "@material-tailwind/react";
import cx from "classnames";
import { useForm } from "react-hook-form";
import { AiOutlineSend } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import userIcon from "../../assets/profile-user_64572.png";
import { setCurrentChat } from "../../store/Features/Chat/ChatSlice";
import MessageCard from "../MessageCard";
import { fakeMessages } from "./fakeMessages";
import classes from "./index.module.css";

const MessageView = ({ className, chatHeader, messages = fakeMessages }) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const sendMessage = (formData) => {
    console.log(formData);
  };

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
          {chatHeader || "Chat Name"}
        </Typography>
      </div>
      {/* messages window */}
      <div className={classes.messageContainer}>
        {messages?.length ? (
          messages.map((message, index) => (
            <MessageCard key={index} {...message} />
          ))
        ) : (
          <Typography variant="gradient" className="text-center">
            No messages to show!
          </Typography>
        )}
      </div>
      {/* send message form */}
      <div className={classes.sendMsgForm}>
        <form
          className={classes.messageForm}
          onSubmit={handleSubmit(sendMessage)}
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
