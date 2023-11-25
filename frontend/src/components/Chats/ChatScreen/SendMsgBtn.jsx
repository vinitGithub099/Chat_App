import { AiOutlineSend } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import _ from "underscore";
import { messageAPI } from "../../../api/messageAPI";
import { ERROR, SUCCESS } from "../../../constants/constants";
import { socketClient } from "../../../main";
import { sendChatMessage } from "../../../store/Features/Chat/ChatActions";
import Form from "../../Form/Form";
import { useToast } from "../../Hooks/useToast";

export default function SendMsgBtn() {
  const currentChat = useSelector((state) => state.chat.currentChat);
  const user = useSelector((state) => state.auth.user);
  const { notify } = useToast();
  const dispatch = useDispatch();

  const emitStartTyping = async () =>
    await socketClient.emit("typing", { room: currentChat, user: user });

  const emitStopTyping = async () =>
    await socketClient.emit("stop typing", { room: currentChat, user: user });

  const handleSuccess = (res) =>
    dispatch(sendChatMessage({ newMessage: res })).then(() => {
      notify("Message sent!", SUCCESS);
      emitStopTyping();
    });

  const handleFailure = () => notify("Message was not sent!", ERROR);

  const sendMessage = async (data) =>
    messageAPI
      .sendMessage(data)
      .then((res) => handleSuccess(res))
      .catch(() => handleFailure());

  const handleSendMessage = (message) => {
    if (!_.isEmpty(currentChat)) {
      const { _id: id } = currentChat;
      sendMessage({ chatId: id, content: message.chatBox });
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
