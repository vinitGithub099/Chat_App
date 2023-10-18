import { useState } from "react";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdArrowDropdown,
} from "react-icons/io";
import { RiAddFill } from "react-icons/ri";
import Button from "../Form/Button";
import Form from "../Form/Form";
import UserCard from "./UserCard";

export default function SideBar({ className }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const toggleSideBar = () => setIsSideBarOpen((prev) => !prev);
  return isSideBarOpen ? (
    <div
      className={`p-1 border-2 max-h-screen inline-flex flex-col ${className}`}
    >
      <CloseSideBar toggleSideBar={toggleSideBar}></CloseSideBar>
      <SearchChats></SearchChats>
      <SearchChatResults></SearchChatResults>
      <UserInfo></UserInfo>
    </div>
  ) : (
    <OpenSideBar toggleSideBar={toggleSideBar}></OpenSideBar>
  );
}

function CloseSideBar({ toggleSideBar }) {
  return (
    <div className="w-full mb-2 border-2 py-2 flex flex-row justify-between">
      <div className="flex gap-2">
        <Button
          className="rounded-sm px-1"
          type="submit"
          handleClick={toggleSideBar}
        >
          <IoIosArrowBack></IoIosArrowBack>
        </Button>
        <h4 className="text-lg font-semibold">Channel</h4>
      </div>
      <Button className="bg-gray-400 rounded-sm px-1 ml-4" type="submit">
        <RiAddFill></RiAddFill>
      </Button>
    </div>
  );
}

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
    <div className="border-2 py-2 mb-2 flex flex-col overflow-y-scroll">
      {names &&
        names.length &&
        names.map(({ name }, index) => {
          return (
            <p key={index} className="p-2 my-1">
              {name}
            </p>
          );
        })}
    </div>
  );
}

function UserInfo() {
  return (
    <div className="border-2 flex flex-row items-center">
      <UserCard className="p-1" name="Hello World!"></UserCard>
      <Button className="px-1 ml-4" type="submit">
        <IoMdArrowDropdown></IoMdArrowDropdown>
      </Button>
    </div>
  );
}

function OpenSideBar({ toggleSideBar }) {
  return (
    <div className="flex ">
      <Button className="border-2" type="submit" handleClick={toggleSideBar}>
        <IoIosArrowForward></IoIosArrowForward>
      </Button>
    </div>
  );
}

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
