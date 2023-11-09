import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  PHONE_REGEX,
} from "../Form/FormExpressions";

const containerClassName = "mb-4 flex flex-col";
const className = "rounded-lg mt-1 mb-2 p-2 col-span-2 bg-light-3";

export const getProfileFields = (userProfile) => [
  {
    type: "text",
    label: "Name",
    name: "name",
    id: "name",
    defaultValue: userProfile.name,
    containerClassName: containerClassName,
    className: className,
    inputClassName: "w-full bg-light-3 pl-2 outline-none",
    placeholder: "Name",
    required: true,
    validation: {
      required: {
        value: true,
        message: "Name is required",
      },
    },
  },
  {
    type: "textarea",
    label: "Bio",
    name: "bio",
    id: "bio",
    rows: 5,
    cols: 40,
    defaultValue: userProfile.bio,
    containerClassName: containerClassName,
    className: className,
    inputClassName: "w-full bg-light-3 pl-2 outline-none",
    placeholder: "Enter your bio",
    required: true,
    validation: {
      required: {
        value: false,
        message: "Bio is required",
      },
    },
  },
  {
    type: "tel",
    label: "Phone",
    name: "phone",
    id: "phone",
    rows: 5,
    cols: 40,
    defaultValue: userProfile.phone,
    containerClassName: containerClassName,
    className: className,
    inputClassName: "w-full bg-light-3 pl-2 outline-none",
    placeholder: "Enter phone number",
    required: true,
    validation: {
      required: {
        value: true,
        message: "Phone Number is required",
      },
      pattern: {
        value: PHONE_REGEX,
        message: "Please enter a valid phone number",
      },
    },
  },
  {
    type: "email",
    label: "Email",
    name: "email",
    id: "email",
    defaultValue: userProfile.email,
    containerClassName: containerClassName,
    className: className,
    inputClassName: "w-full bg-light-3 pl-2 outline-none",
    placeholder: "Email",
    required: true,
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
    label: "Password",
    name: "password",
    id: "password",
    defaultValue: userProfile.password,
    containerClassName: containerClassName,
    className: className,
    inputClassName: "w-full bg-light-3 pl-2 outline-none",
    placeholder: "******",
    required: true,
    validation: {
      required: {
        value: true,
        message: "Password is required",
      },
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
      pattern: {
        value: PASSWORD_REGEX,
        message:
          "Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      },
    },
  },
];
