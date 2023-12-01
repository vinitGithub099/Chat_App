import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAPI } from "../../../../api/authAPI";
import { chatAPI } from "../../../../api/chatAPI";
import userLogo from "../../../../assets/profile-user_64572.png";
import { ERROR, INFO, SUCCESS } from "../../../../constants/constants";
import { addChatMember } from "../../../../store/Features/Chat/ChatSlice";
import Form from "../../../Form/Form";
import { useToast } from "../../../Hooks/useToast";
import UserCard from "../../SideBar/UserCard";

export default function AddUserForm() {
  const currentChat = useSelector((state) => state.chat.currentChat);
  const [optionList, setOptionList] = useState([]);
  const { notify } = useToast();
  const dispatch = useDispatch();

  const handleSubmit = (formData, methods) => {
    const selectedOption = formData.user;
    if (currentChat.users.find((user) => user._id === selectedOption)) {
      notify("Member already exits!", INFO);
      return;
    }
    const data = { chatId: currentChat._id, userId: selectedOption };
    chatAPI
      .addToGroup(data)
      .then((res) => {
        dispatch(addChatMember(res.users));
        notify("User added successfully", SUCCESS);
        methods.reset(true);
      })
      .catch(() => notify("failed to add user!", ERROR));
  };

  const searchUser = (e) => {
    const query = e.target.value;
    const searchTerm = query?.trim();
    if (!searchTerm) {
      setOptionList([]);
      return;
    }
    authAPI
      .searchUser(searchTerm)
      .then((res) => {
        setOptionList(
          res && res.length
            ? res.map((item) => ({
                value: item._id,
                label: item,
                checked: false,
              }))
            : []
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
          "my-2 px-4 py-2 rounded-md bg-light-3 btn text-light-1 hover:bg-dark-1",
      }}
      handleSubmit={handleSubmit}
    ></Form>
  );
}

function OptionComponent({ name, children }) {
  return (
    <div className="flex flex-row items-center justify-start gap-4 py-2 px-4 hover:bg-transparent hover:cursor-pointer">
      {children}
      <UserCard
        imgSrc={userLogo}
        imgConfig="s"
        className="text-light-1"
        name={name}
      ></UserCard>
    </div>
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
      onChange: (e) => searchUser(e),
    },
    {
      type: "singleSelect",
      name: "user",
      id: "user",
      containerClassName: `${
        optionList && optionList.length ? `block` : `hidden`
      } my-2 bg-dark-1 divide-y divide-light-3 rounded-md max-h-40 overflow-y-scroll scrollbar`,
      inputClassName: "accent-light-1 w-5 h-5 hover:cursor-pointer",
      optionClassName:
        "w-full flex flex-row items-center justify-start px-2 hover:bg-light-3 hover:cursor-pointer",
      optionList: optionList,
      optionComponent: OptionComponent,
      validation: {
        required: {
          value: true,
          message: "No user selected",
        },
      },
    },
  ];
};
