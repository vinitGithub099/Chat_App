import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowBack, IoMdArrowDropdown } from "react-icons/io";
import { RiAddFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Button from "../Form/Button";
import Form from "../Form/Form";
import Modal from "../Modal";
import UserCard from "./UserCard";

export default function SideBar({ className, sidebarOpen, toggleSideBar }) {
  return sidebarOpen ? (
    <div
      className={`max-mobile:w-full p-2 max-mobile:fixed max-h-screen flex flex-row ${className}`}
    >
      <div className="max-mobile:w-sidebar border-2 w-full inline-flex flex-col justify-between bg-white">
        <CloseSideBar toggleSideBar={toggleSideBar}></CloseSideBar>
        <SearchChats></SearchChats>
        <SearchChatResults></SearchChatResults>
        <UserInfo></UserInfo>
      </div>
      <div className="mobile:hidden flex flex-1 opacity-25 bg-black"></div>
    </div>
  ) : null;
}

function CloseSideBar({ toggleSideBar }) {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal((prev) => !prev);
  return (
    <div className="w-full mb-2 border-2 p-2 flex flex-row justify-between">
      <div className="flex gap-2">
        <Button
          className="mobile:hidden rounded-sm pr-1"
          type="submit"
          handleClick={toggleSideBar}
        >
          <IoIosArrowBack></IoIosArrowBack>
        </Button>
        <h4 className="px-2 text-xl font-semibold">Channel</h4>
      </div>
      <Button
        className="bg-gray-400 rounded-sm px-1 ml-4"
        onClick={toggleModal}
        type="submit"
      >
        <RiAddFill></RiAddFill>
      </Button>
      <CreateChannelFormModal
        showModal={showModal}
        toggleModal={toggleModal}
      ></CreateChannelFormModal>
    </div>
  );
}

function CreateChannelFormModal({ showModal, toggleModal }) {
  return (
    <Modal
      showModal={showModal}
      toggleModal={toggleModal}
      className="w-auto"
      modalComponent={
        <CreateChannelForm toggleModal={toggleModal}></CreateChannelForm>
      }
    ></Modal>
  );
}

function CreateChannelForm({ toggleModal }) {
  return (
    <div className="w-full">
      <div className="w-full mb-6 flex flex-row justify-between items-center rounded-md">
        <h3 className="text-2xl font-semibold ">Create Channel</h3>
        <Button
          type="icon"
          className="text-red-500 text-2xl"
          onClick={toggleModal}
        >
          <AiFillCloseCircle></AiFillCloseCircle>
        </Button>
      </div>
      <Form
        fields={channelFormFields}
        className="w-full rounded-md"
        buttonConfigs={{
          type: "submit",
          label: "Create",
          className: "px-4 py-1 border-2 rounded-md",
        }}
        handleSubmit={(e) => console.log(e)}
      ></Form>
    </div>
  );
}

const channelFormFields = [
  {
    type: "text",
    label: "",
    name: "channelName",
    id: "channelName",
    defaultValue: "",
    containerClassName: "rounded-md",
    className: "mb-4 rounded-md",
    inputClassName: "p-2 w-full rounded-md outline-none",
    placeholder: "@channelName",
    required: true,
    validation: {
      required: true,
      message: "Channel Name cannot be empty",
    },
  },
  {
    type: "textarea",
    label: "",
    name: "channelName",
    id: "channelName",
    defaultValue: "",
    cols: 60,
    rows: 4,
    containerClassName: "rounded-md",
    className: "mb-4 rounded-md",
    inputClassName: "p-2 w-full rounded-md outline-none",
    placeholder: "@channelName",
    required: true,
    validation: {
      required: true,
      message: "Channel Name cannot be empty",
    },
  },
];

function SearchChats() {
  return (
    <Form
      className="mb-2"
      fields={formFields}
      handleSubmit={(e) => console.log(e)}
    ></Form>
  );
}

function SearchChatResults() {
  return (
    <div className="border-2 p-2 mb-2 flex flex-col overflow-y-scroll">
      {names &&
        names.length &&
        names.map(({ name }, index) => {
          return (
            <p key={index} className="py-2 my-1">
              {name}
            </p>
          );
        })}
    </div>
  );
}

function UserInfo() {
  const [hideDropdown, setHideDropdown] = useState(true);
  const toggleDropDown = () => setHideDropdown((prev) => !prev);
  return (
    <div className="border-2 px-2 flex flex-row items-center justify-between">
      <UserCard className="p-1" name="Hello World!"></UserCard>
      <Button className="px-2" type="submit" onClick={toggleDropDown}>
        <IoMdArrowDropdown></IoMdArrowDropdown>
        {!hideDropdown && (
          <UserDropDownList className="border-2 absolute bottom-20 bg-white"></UserDropDownList>
        )}
      </Button>
    </div>
  );
}

function UserDropDownList({ className }) {
  return (
    <div className={`w-dropdown p-1 rounded-md ${className}`}>
      {userDropDownList.map((item, index) => {
        return <UserDropDown key={index} {...item}></UserDropDown>;
      })}
    </div>
  );
}

function UserDropDown({ label, path }) {
  const navigate = useNavigate();
  const handelClick = () => navigate(path);
  return (
    <p
      className="w-full my-1 px-2 py-1 text-md text-left font-semibold"
      onClick={handelClick}
    >
      {label}
    </p>
  );
}

const userDropDownList = [
  {
    label: "Profile",
    path: "/profile",
  },
  {
    label: "Sign Out",
    path: "/login",
  },
];

const containerClassName = "";
const className = "rounded-md";
const formFields = [
  {
    type: "text",
    label: "",
    name: "searchChat",
    id: "searchChat",
    defaultValue: "",
    containerClassName: containerClassName,
    className: className,
    inputClassName: "p-2 w-full outline-none",
    placeholder: "Search @chat",
    required: true,
    onChange: (e) => console.log(e.target.value),
    icon: { icon: FiSearch, size: 20, className: "p-2" },
  },
];

const names = [
  { name: "Hello" },
  { name: "Hello" },
  { name: "Hello" },
  { name: "Hello" },
  { name: "Hello" },
  { name: "Hello" },
  { name: "Hello" },
  { name: "Hello" },
  { name: "Hello" },
  { name: "Hello" },
  { name: "Hello" },
  { name: "Hello" },
  { name: "Hello" },
];
