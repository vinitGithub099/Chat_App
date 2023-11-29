import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { authAPI } from "../../../../api/authAPI";
import { chatAPI } from "../../../../api/chatAPI";
import { ERROR, INFO, SUCCESS } from "../../../../constants/constants";
import { addChatMember } from "../../../../store/Features/Chat/ChatSlice";
import Button from "../../../Form/Button";
import Form from "../../../Form/Form";
import { useToast } from "../../../Hooks/useToast";
import ChatDescription from "./ChatDescription";
import ChatIcon from "./ChatLogo";
import ChatMembers from "./ChatMembers";

export default function ChatInfo({ handleChannelExtras, className }) {
  const currentChat = useSelector((state) => state.chat.currentChat);
  const user = useSelector((state) => state.auth.user);
  return (
    <div
      className={`w-full sm:w-1/2 h-screen bg-dark-3 fixed right-0 flex flex-col rounded-tl-lg rounded-bl-lg overflow-y-scroll scrollbar pb-10 ${className}`}
    >
      <div className="p-4 text-light-1 flex flex-row items-center border-b border-light-3">
        <Button
          className="p-1 rounded-full cursor-pointer hover:bg-light-3 hover:bg-opacity-60"
          onClick={() => handleChannelExtras(null)}
        >
          <BiArrowBack size={20}></BiArrowBack>
        </Button>
      </div>
      <div className="flex-1 sm:px-4">
        <ChatIcon></ChatIcon>
        <ChatDescription></ChatDescription>
        <ChatMembers></ChatMembers>
        {currentChat &&
        user &&
        currentChat.groupAdmin &&
        currentChat.isGroupChat &&
        currentChat.groupAdmin._id === user._id ? (
          <AddUserForm></AddUserForm>
        ) : null}
      </div>
    </div>
  );
}

function AddUserForm() {
  const currentChat = useSelector((state) => state.chat.currentChat);
  const [optionList, setOptionList] = useState([]);
  const { notify } = useToast();
  const dispatch = useDispatch();

  const handleSubmit = (formData) => {
    const selectedOption = JSON.parse(formData.user);
    if (currentChat.users.find((user) => user._id === selectedOption.value)) {
      notify("Member already exits!", INFO);
      return;
    }
    const data = { chatId: currentChat._id, userId: selectedOption.value };
    chatAPI
      .addToGroup(data)
      .then((res) => {
        dispatch(addChatMember(res.users));
        notify("User added successfully", SUCCESS);
      })
      .catch(() => notify("failed to add user!", ERROR));
  };

  const searchUser = (query) => {
    authAPI
      .searchUser(query)
      .then((res) => {
        setOptionList(
          res.map((item) => ({ value: item._id, label: item.name }))
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <Form
      fields={formFields(optionList, searchUser)}
      className="px-4 w-full rounded-md"
      buttonConfigs={{
        type: "submit",
        label: "Add User",
        className:
          "px-4 py-2 rounded-md bg-light-3 btn text-light-1 hover:bg-dark-1",
      }}
      handleSubmit={handleSubmit}
      reset={true}
    ></Form>
  );
}

const formFields = (optionList, searchUser) => {
  return [
    {
      type: "text",
      label: "",
      name: "searchQuery",
      id: "searchQuery",
      defaultValue: "",
      containerClassName: "rounded-md bg-transparent",
      className: "py-2 border-b border-light-2",
      inputClassName:
        "px-2 bg-transparent w-full rounded-md outline-none text-light-1",
      placeholder: "@SearchUsers",
      onChange: (e) => {
        if (e.target.value !== "") {
          searchUser(e.target.value);
        }
      },
    },
    {
      type: "singleSelect",
      name: "user",
      id: "user",
      className:
        "w-full py-2 rounded-md overflow-y-scroll scrollbar bg-dark-1 text-light-2 outline-none",
      labelClassName:
        "w-full py-2 mb-2 rounded-md outline-none hover:bg-light-3",
      containerClassName:
        "my-2 divide-x bg-dark-1 hover:bg-dark-2 bg-transparent",
      optionList: optionList,
      validation: {
        required: {
          value: true,
          message: "No user selected",
        },
      },
    },
  ];
};
