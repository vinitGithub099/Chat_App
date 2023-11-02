import { AiOutlineUser } from "react-icons/ai";
import { IoMdUnlock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { EMAIL_REGEX } from "../../Form/FormExpressions";
const containerClassName = "mb-4";
const className = "rounded-md my-2 p-2 bg-light-3";
const inputClassName = "w-full pl-2 outline-none bg-light-3 text-light-1";

export const signUpFormFields = [
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
      // pattern: {
      //   value: PASSWORD_REGEX,
      //   message:
      //     "Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      // },
    },
  },
];
