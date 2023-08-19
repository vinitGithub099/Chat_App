import {
  AiOutlineGithub,
  AiOutlineGoogle,
  AiOutlineLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";
import { IoMdUnlock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { authAPI } from "../../api/authAPI";
import Form from "../Form/Form";
import { EMAIL_REGEX } from "../Form/FormExpressions";
import SocialIconList from "./SocialIconList";

export default function Login({ className }) {
  const handleLoginSubmit = (loginData) => {
    console.log(loginData);
    loginUser(loginData);
  };

  const loginUser = (userData) => {
    authAPI
      .loginUser(userData)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  return (
    <section className={`max-w-sm border-2 rounded-md p-4${className}`}>
      <h1 className="p-2 font-bold text-lg">Login</h1>
      <Form
        className="max-w-sm p-2"
        fields={LoginFields}
        buttonConfigs={{
          type: "submit",
          label: "Submit",
          className: "w-full my-2 py-2 px-1 bg-blue-500 rounded-md text-white",
        }}
        handleSubmit={handleLoginSubmit}
      ></Form>

      {/* Registration link */}
      <p className="text-center font-light text-sm mt-4">
        {`or continue with your social profile`}
      </p>

      <SocialIconList
        className="flex flex-row justify-center my-4"
        iconsList={socialIconList}
      ></SocialIconList>

      {/* Registration link */}
      <div className="text-center font-light text-sm my-2">
        {`Don't have an account yet? `}
        <span className="text-blue-500 font-semibold hover:cursor-pointer">
          Register
        </span>
      </div>
    </section>
  );
}

const socialIconList = [
  {
    component: () => <AiOutlineGoogle size={30}></AiOutlineGoogle>,
    handleClick: (e) => console.log(e, "Google link pressed"),
    className: "border rounded-full text-gray-500 mx-2 p-1",
  },
  {
    component: () => <AiOutlineLinkedin size={30}></AiOutlineLinkedin>,
    handleClick: (e) => console.log(e, "linkedin link pressed"),
    className: "border rounded-full text-gray-500 mx-2 p-1",
  },
  {
    component: () => <AiOutlineGithub size={30}></AiOutlineGithub>,
    handleClick: (e) => console.log(e, "github link pressed"),
    className: "border rounded-full text-gray-500 mx-2 p-1",
  },
  {
    component: () => <AiOutlineTwitter size={30}></AiOutlineTwitter>,
    handleClick: (e) => console.log(e, "twitter link pressed"),
    className: "border rounded-full text-gray-500 mx-2 p-1",
  },
];

const LoginFields = [
  {
    type: "email",
    label: "",
    name: "email",
    id: "email",
    defaultValue: "",
    className: "border-2 rounded-md my-2 p-2",
    inputClassName: "w-full pl-2 outline-none",
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
    label: "password",
    name: "password",
    id: "password",
    defaultValue: "",
    className: "border-2 rounded-md my-2 p-2",
    inputClassName: "w-full pl-2 outline-none",
    placeholder: "password",
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
];

/**
 *  name,
  label,
  type,
  id,
  placeholder,
  validation,
  multiline,
  className,
 */
