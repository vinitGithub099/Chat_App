import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../store/Features/AuthActions";
import Form from "../Form/Form";
import FormNavLink from "./FormNavLink";
import SocialIconList from "./SocialIconList";
import { loginFormFields } from "./utils/formFields";
import { socialIconList } from "./utils/iconsList";

export default function Login({ className }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginSuccess = () => {
    console.log(location);
    const path = location.state?.from ? location.state.from : "/";
    navigate("/intermediate-loader", {
      state: {
        message: "Login Successful! Redirecting to where you left from",
        from: path,
      },
    });
  };

  const handleLoginSubmit = async (loginData) => {
    console.log(loginData);
    dispatch(loginUser(loginData))
      .then(unwrapResult)
      .then((res) => {
        console.log(res);
        // const initialToken = localStorage.getItem("access_token");
        // console.log(initialToken);
        const { accessToken } = res;
        localStorage.setItem("access_token", accessToken);
        // console.log(initialToken == accessToken);
        // console.log(initialToken === accessToken);
        handleLoginSuccess();
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className={`w-full p-2 h-screen bg-dark-3 ${className}`}>
      <section className="mt-20 mx-auto max-w-sm bg-dark-1 rounded-md p-4">
        <h1 className="p-2 font-bold text-lg text-light-2">Login</h1>
        <Form
          className="w-full p-2"
          fields={loginFormFields}
          buttonConfigs={{
            type: "submit",
            label: "Submit",
            className:
              "w-full my-2 py-2 px-1 bg-blue-500 rounded-md text-white",
          }}
          handleSubmit={handleLoginSubmit}
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
          text={`Don't have an account yet? `}
          label={`Register`}
          path={`/register`}
        ></FormNavLink>
      </section>
    </div>
  );
}
