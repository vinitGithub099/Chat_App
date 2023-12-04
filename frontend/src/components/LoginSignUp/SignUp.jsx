import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ERROR, SUCCESS } from "../../constants/constants";
import { registerUser } from "../../store/Features/User/AuthActions";
import { handelTokenExpiration } from "../../utils/Utils";
import { useToast } from "../Hooks/useToast";
import Template from "./Template";
import { signUpFormFields } from "./utils/registerFormFields";

export default function SignUp({ className }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { notify } = useToast();

  const handleRegisterSuccess = () => {
    const path = location.state?.from ? location.state.from : "/";
    notify("Registered in Successfully!", SUCCESS);
    navigate(path);
  };

  const handelLoginFailure = (error) => {
    handelTokenExpiration(error, dispatch);
    notify("Sign Up failed!", ERROR);
  };

  const handleRegisterSubmit = async (signUpData) =>
    dispatch(registerUser(signUpData))
      .then(() => handleRegisterSuccess())
      .catch((error) => handelLoginFailure(error));

  return (
    <Template
      type="register"
      className={className}
      formConfigs={{
        formClassName: "max-w-sm p-2",
        fields: signUpFormFields,
        buttonConfigs: {
          type: "submit",
          label: "Submit",
          className: "w-full my-2 py-2 px-1 bg-blue-500 rounded-md text-white",
        },
        handleSubmit: handleRegisterSubmit,
      }}
      heading={"Register"}
      navConfigs={{
        text: "Already have an account? ",
        path: "/login",
        label: "Login",
      }}
    ></Template>
  );
}
