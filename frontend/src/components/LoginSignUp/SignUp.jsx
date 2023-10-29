import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { registerUser } from "../../store/Features/AuthActions";
import Form from "../Form/Form";
import FormNavLink from "./FormNavLink";
import SocialIconList from "./SocialIconList";
import { signUpFormFields } from "./utils/formFields";
import { socialIconList } from "./utils/iconsList";

export default function SignUp({ className }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegisterSuccess = () => {
    const path = location.state?.from ? location.state.from : "/";
    navigate("/intermediate-loader", {
      state: {
        message: "Registration Successful! Redirecting to login",
        from: path,
        to: "/login",
      },
    });
  };

  const handleRegisterSubmit = async (signUpData) => {
    // console.log(signUpData);
    dispatch(registerUser(signUpData))
      .then(unwrapResult)
      .then((res) => {
        console.log(res);
        // handleRegisterSuccess();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={`w-full h-screen p-2 bg-dark-3  ${className}`}>
      <section className="mt-20 mx-auto max-w-sm bg-dark-1 rounded-md p-4">
        <h1 className="p-2 font-bold text-lg text-light-2">SignUp</h1>
        <Form
          className="max-w-sm p-2"
          fields={signUpFormFields}
          buttonConfigs={{
            type: "submit",
            label: "Submit",
            className:
              "w-full my-2 py-2 px-1 bg-blue-500 rounded-md text-white",
          }}
          handleSubmit={handleRegisterSubmit}
        ></Form>
        <p className="text-center font-light text-sm mt-4 text-light-1">
          {`or continue with your social profile`}
        </p>
        <SocialIconList
          className="flex flex-row justify-center my-4"
          iconsList={socialIconList}
        ></SocialIconList>
        <FormNavLink
          className={`text-light-1`}
          text={`Already have an account? `}
          label={`Login`}
          path={`/login`}
        ></FormNavLink>
      </section>
    </div>
  );
}
