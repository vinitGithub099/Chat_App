import { AiOutlineUser } from "react-icons/ai";
import { IoMdUnlock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import userLogo from "../assets/profile-user_64572.png";
import UserCard from "./Chats/SideBar/UserCard";
import Form from "./Form/Form";
import { EMAIL_REGEX } from "./Form/FormExpressions";

export default function DemoForm() {
  const handleSubmit = (data) => console.log(data);
  return (
    <div className="w-full bg-dark-2 min-h-screen">
      <h3 className="text-light-2 text-3xl font-bold text-center py-4">
        Demo Form
      </h3>
      <Form
        className={"max-w-3xl mx-auto"}
        fields={formFields}
        buttonConfigs={{
          type: "submit",
          label: "Submit",
          className:
            "px-4 py-2 bg-btn rounded-lg my-4 text-light-1 font-semibold",
        }}
        handleSubmit={handleSubmit}
      ></Form>
    </div>
  );
}

const containerClassName = "mb-4";
const className = "rounded-md my-2 p-2 bg-light-3";
const inputClassName = "w-full pl-2 outline-none bg-light-3 text-light-1";

const users = [
  {
    _id: "64e899c03ac98a5b778af11a",
    name: "Vansh",
    email: "vansh@gmail.com",
    phone: "995052986",
    bio: "Hello world",
    pic: "",
    isAdmin: false,
    createdAt: "2023-08-25T12:08:32.631Z",
    updatedAt: "2023-08-25T12:08:32.631Z",
    __v: 0,
  },
  {
    _id: "64e899b13ac98a5b778af117",
    name: "Ayush",
    email: "ayush@gmail.com",
    phone: "995052986",
    bio: "Hello world",
    pic: "",
    isAdmin: false,
    createdAt: "2023-08-25T12:08:17.708Z",
    updatedAt: "2023-08-25T12:08:17.708Z",
    __v: 0,
  },
  {
    _id: "64edbbfed350a2df7f9cbe3a",
    name: "Demo user",
    email: "demo@gmail.com",
    phone: "9932432344",
    bio: "",
    pic: "",
    isAdmin: false,
    createdAt: "2023-08-29T09:35:58.208Z",
    updatedAt: "2023-08-29T09:35:58.208Z",
    __v: 0,
  },
];

const formFields = [
  {
    type: "text",
    label: "",
    name: "name",
    id: "name",
    defaultValue: "",
    containerClassName: containerClassName,
    className: className,
    inputClassName: inputClassName,
    placeholder: "Name",
    icon: {
      className: "text-gray-500",
      icon: AiOutlineUser,
      size: 20,
    },
    validation: {
      required: {
        value: true,
        message: "Name is required",
      },
    },
  },
  {
    type: "email",
    label: "",
    name: "email",
    id: "email",
    containerClassName: containerClassName,
    className: className,
    inputClassName: inputClassName,
    placeholder: "Email",
    required: true,
    icon: {
      className: "text-gray-500",
      icon: MdEmail,
      size: 20,
    },
    validation: {
      required: {
        value: true,
        message: "Email is required",
      },
      pattern: {
        value: EMAIL_REGEX,
        message: "Please enter a valid email",
      },
    },
  },
  {
    type: "password",
    label: "",
    name: "password",
    id: "password",
    containerClassName: containerClassName,
    className: className + " text-light-2",
    inputClassName: inputClassName + " text-light-2",
    placeholder: "******",
    required: true,
    icon: {
      className: "text-gray-500",
      icon: IoMdUnlock,
      size: 20,
    },
    validation: {
      required: {
        value: true,
        message: "Password is required",
      },
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
  },
  {
    type: "checkbox",
    name: "usersList",
    id: "userList",
    label: "Add Users",
    className: "p-2 my-2 rounded-md bg-light-3",
    labelClassName: "px-2 text-light-2 mb-4 font-semibold",
    showCheckedItems: true,
    checkedItemsClassName: "w-full p-2 flex gap-2 my-2",
    checkedItemClassName: "border border-light-2 text-light-1 bg-dark-3 px-4 py-2 rounded-md",
    checkboxClassName: "w-6 m-2 checked:accent-light-1",
    containerClassName: "border divide-x border-light-2 bg-dark-1 hover:bg-dark-2",
    optionsList: generateFakeUsers(),
    labelComponent: LabelComponent,
    validation: {
      required: {
        value: true,
        message: "No user selected",
      },
    },
  },
];

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
