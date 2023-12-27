import { AiOutlineSend } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import _ from "underscore";
import { messageAPI } from "../../../api/messageAPI";
import { chatSocket } from "../../../main";
import { populateMessages } from "../../../store/Features/Chat/ChatSlice";
import { handelTokenExpiration } from "../../../utils/Utils";
import Form from "../../Form/Form";

export default function SendMsgBtn() {
  const currentChat = useSelector((state) => state.chat.currentChat);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const emitStartTyping = () =>
    chatSocket.emit("typing", { room: currentChat, user: user });

  const emitStopTyping = () =>
    chatSocket.emit("stop typing", { room: currentChat, user: user });

  const sendMessage = async (data) =>
    messageAPI
      .sendMessage(data)
      .then((res) => {
        chatSocket.emit("new message", { newMessage: res }, () => {
          dispatch(populateMessages(res));
          emitStopTyping();
        });
      })
      .catch((error) => handelTokenExpiration(error, dispatch));

  const handleSendMessage = (message, methods) => {
    if (!_.isEmpty(currentChat)) {
      const { _id: id } = currentChat;
      sendMessage({ chatId: id, content: message.chatBox });
      methods.reset();
    }
  };

  const typingHandler = (e) => {
    const val = e.target.value;

    if (val) emitStartTyping();

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && val) {
        emitStopTyping();
      }
    }, timerLength);
  };

  return (
    <div className="py-4 px-4 sm:px-8">
      <Form
        className="w-full flex flex-row gap-2"
        fields={formFields(typingHandler)}
        buttonConfigs={{
          type: "submit",
          className:
            "py-2 px-4 bg-btn rounded-lg text-white bg-dark hover:bg-opacity-80",
          children: <AiOutlineSend></AiOutlineSend>,
        }}
        handleSubmit={handleSendMessage}
        reset={true}
      ></Form>
    </div>
  );
}

const formFields = (handleChange) => [
  {
    type: "text",
    label: "",
    name: "chatBox",
    id: "chat",
    defaultValue: "",
    containerClassName: "",
    className: "rounded-md bg-light-3 px-4",
    inputClassName:
      "p-2 w-full outline-none rounded-md bg-light-3 text-light-1",
    placeholder: "Send Message",
    onChange: handleChange,
  },
];
