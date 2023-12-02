import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ERROR, SUCCESS } from "../../constants/constants";
import { loginUser } from "../../store/Features/User/AuthActions";
import { useToast } from "../Hooks/useToast";
import Template from "./Template";
import { loginFormFields } from "./utils/loginFormFields";

export default function Login({ className }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { notify } = useToast();

  const handleLoginSuccess = () => {
    const path = location.state?.from ? location.state.from : "/";
    notify("Logged in Successfully!", SUCCESS);
    navigate(path);
  };

  const handelLoginFailure = () => notify("Log in failed!", ERROR);

  const handleLoginSubmit = async (loginData) =>
    dispatch(loginUser(loginData))
      .then(unwrapResult)
      .then(() => handleLoginSuccess())
      .catch(() => handelLoginFailure());

  return (
    <Template
      className={className}
      formConfigs={{
        formClassName: "max-w-sm p-2",
        fields: loginFormFields,
        buttonConfigs: {
          type: "submit",
          label: "Submit",
          className: "w-full my-2 py-2 px-1 bg-blue-500 rounded-md text-white",
        },
        handleSubmit: handleLoginSubmit,
      }}
      heading={"Login"}
      navConfigs={{
        text: "Don't have an account yet? ",
        path: "/register",
        label: "Register",
      }}
    ></Template>
  );
}
