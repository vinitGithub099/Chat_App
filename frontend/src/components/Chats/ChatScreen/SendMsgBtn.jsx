import { AiOutlineSend } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import _ from "underscore";
import { messageAPI } from "../../../api/messageAPI";
import { ERROR, SUCCESS } from "../../../constants/constants";
import { setMessages } from "../../../store/Features/Chat/ChatSlice";
import Form from "../../Form/Form";
import { useToast } from "../../Hooks/useToast";

export default function SendMsgBtn() {
  const currentChat = useSelector((state) => state.chat.currentChat);
  const { notify } = useToast();
  const chatSocket = useSelector((state) => state.chat.chatSocket);
  const dispatch = useDispatch();

  const handleSuccess = (res) => {
    if (!_.isEmpty(chatSocket)) {
      chatSocket.emit("new message", res);
      // updates the sender messages
      dispatch(setMessages(res));
      notify("Message sent!", SUCCESS);
    }
  };

  const handleFailure = () => notify("Message was not sent!", ERROR);

  const sendMessage = async (data) => {
    messageAPI
      .sendMessage(data)
      .then((res) => handleSuccess(res))
      .catch(() => handleFailure());
  };

  const handleSendMessage = (message) => {
    console.log(message);
    if (!_.isEmpty(currentChat)) {
      const { _id: id } = currentChat;
      sendMessage({ chatId: id, content: message.chatBox });
    }
  };

  return (
    <div className="py-4 px-4 sm:px-8">
      <Form
        className="w-full flex flex-row gap-2"
        fields={formFields}
        buttonConfigs={{
          type: "submit",
          className: "py-2 px-4 bg-btn rounded-lg text-white bg-dark hover:bg-opacity-80",
          children: <AiOutlineSend></AiOutlineSend>,
        }}
        handleSubmit={handleSendMessage}
      ></Form>
    </div>
  );
}

const formFields = [
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
  },
];
