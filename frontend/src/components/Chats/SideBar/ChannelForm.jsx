import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { authAPI } from "../../../api/authAPI";
import { chatAPI } from "../../../api/chatAPI";
import userLogo from "../../../assets/profile-user_64572.png";
import { ERROR, SUCCESS } from "../../../constants/constants";
import Button from "../../Form/Button";
import Form from "../../Form/Form";
import { useToast } from "../../Hooks/useToast";
import Modal from "../../Modal";
import UserCard from "./UserCard";

export default function ChannelForm({ showModal, toggleModal }) {
  return (
    <Modal
      showModal={showModal}
      toggleModal={toggleModal}
      className="z-60"
      modalComponent={
        <CreateChannelForm toggleModal={toggleModal}></CreateChannelForm>
      }
    ></Modal>
  );
}

function CreateChannelForm({ toggleModal }) {
  const { notify } = useToast();
  const [optionsList, setOptionsList] = useState([]);

  const handleSubmit = (channelData) => {
    console.log(channelData);
    const data = {
      name: channelData.channelName,
      users: channelData.userList,
      description: channelData.channelDescription,
    };
    console.log(data);

    chatAPI
      .createGroupChat(data)
      .then(() => notify("Channel created successfully!", SUCCESS))
      .catch(() => notify("Failed to create channel!", ERROR));
  };

  const searchUser = (query) => {
    authAPI
      .searchUser(query)
      .then((res) => {
        console.log(res);
        setOptionsList(
          res.map((item) => ({
            ...item,
            inputClassName:
              "p-2 w-full rounded-md outline-none bg-light-3 text-light-1",
            defaultChecked: false,
          }))
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="w-full h-96 border border-light-3 px-8 py-4 bg-dark-2 rounded-lg overflow-y-scroll scrollbar">
      <ChannelHeader toggleModal={toggleModal}></ChannelHeader>
      <Form
        fields={channelFormFields(optionsList, searchUser)}
        className="w-full rounded-md"
        buttonConfigs={{
          type: "submit",
          label: "Save",
          className: "px-4 py-2 rounded-md bg-btn text-white",
        }}
        handleSubmit={handleSubmit}
      ></Form>
    </div>
  );
}

function ChannelHeader({ toggleModal }) {
  return (
    <div className="w-full mb-4 flex flex-row justify-between items-center rounded-md">
      <h3 className="text-2xl font-semibold text-white">New Channel</h3>
      <Button type="icon" className="text-error text-2xl" onClick={toggleModal}>
        <AiFillCloseCircle></AiFillCloseCircle>
      </Button>
    </div>
  );
}

const channelFormFields = (optionsList, searchUser) => {
  return [
    {
      type: "text",
      label: "",
      name: "channelName",
      id: "channelName",
      defaultValue: "",
      containerClassName: "mb-4 rounded-md",
      className: "my-2 rounded-md bg-light-3",
      inputClassName:
        "p-2 w-full rounded-md outline-none bg-light-3 text-light-1",
      placeholder: "@channelName",
      validation: {
        required: { value: true, message: "Channel Name cannot be empty" },
      },
    },
    {
      type: "textarea",
      label: "",
      name: "channelDescription",
      id: "channelDescription",
      defaultValue: "",
      cols: 60,
      rows: 4,
      containerClassName: "mb-4 rounded-md",
      className: "my-2 rounded-md bg-light-3",
      inputClassName:
        "p-2 w-full rounded-md outline-none bg-light-3 text-light-1",
      placeholder: "Describe your channel here",
    },
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
      type: "checkbox",
      name: "usersList",
      id: "userList",
      className: "py-2 mb-2 rounded-md overflow-y-scroll scrollbar",
      labelClassName: "text-light-1",
      showCheckedItems: true,
      checkedItemsClassName: "w-full flex gap-2 my-2 flex-wrap",
      checkedItemClassName:
        "border border-light-3 text-light-1 bg-dark-1 px-4 py-2 rounded-md",
      checkboxClassName: "w-6 m-2 checked:accent-light-1",
      containerClassName:
        "border border-light-1 divide-x border-light-2 bg-dark-1 hover:bg-dark-2 bg-transparent",
      optionsList: optionsList,
      labelComponent: LabelComponent,
      validation: {
        required: {
          value: true,
          message: "No user selected",
        },
      },
    },
  ];
};

function LabelComponent({ name }) {
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

/* 
function generateFakeUsers() {
  return users && users.length
    ? users.map((user) => ({
        ...user,
        inputClassName:
          "p-2 w-full rounded-md outline-none bg-light-3 text-light-1",
        // checked: false,
        defaultChecked: false,
      }))
    : [];
}
 */

/* 

{
    "_id": "64e899c03ac98a5b778af11a",
    "name": "Vansh",
    "email": "vansh@gmail.com",
    "phone": "995052986",
    "bio": "Hello world",
    "pic": "",
    "isAdmin": false,
    "createdAt": "2023-08-25T12:08:32.631Z",
    "updatedAt": "2023-08-25T12:08:32.631Z",
    "__v": 0
}

*/
