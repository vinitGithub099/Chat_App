import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAPI } from "../../../../api/authAPI";
import userLogo from "../../../../assets/profile-user_64572.png";
import Form from "../../../Form/Form";
import { useToast } from "../../../Hooks/useToast";
import UserCard from "../../SideBar/UserCard";
import { ERROR, INFO, SUCCESS } from "../../../../constants/constants";
import { addChatMember } from "../../../../store/Features/Chat/ChatSlice";
import { chatAPI } from "../../../../api/chatAPI";

export default function AddUserForm() {
  const currentChat = useSelector((state) => state.chat.currentChat);
  const [optionList, setOptionList] = useState([]);
  const { notify } = useToast();
  const dispatch = useDispatch();

  const handleSubmit = (formData) => {
    console.log(formData);
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
      })
      .catch(() => notify("failed to add user!", ERROR));
  };

  const searchUser = (query) => {
    authAPI
      .searchUser(query)
      .then((res) => {
        console.log(res);
        setOptionList(res.map((item) => ({ value: item._id, label: item })));
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

function OptionComponent({ name }) {
  return (
    <div className="flex flex-row items-center justify-between gap-4 py-2 px-4">
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
