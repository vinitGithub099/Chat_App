import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../store/Features/User/AuthActions";
import Form from "../Form/Form";
import FormNavLink from "./FormNavLink";
import SocialIconList from "./SocialIconList";
import { loginFormFields } from "./utils/formFields";
import { socialIconList } from "./utils/iconsList";

export default function Login({ className }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);

  const handleLoginSuccess = () => {
    const path = location.state?.from ? location.state.from : "/";
    navigate("/intermediate-loader", {
      state: {
        message: "Login Successful! Redirecting to where you left from",
        from: path,
      },
    });
  };

  const handleLoginSubmit = async (loginData) => {
    dispatch(loginUser(loginData))
      .then(unwrapResult)
      .then(() => handleLoginSuccess())
      .catch((error) => console.log(error));
  };

  const buildClassName = () => {
    let defaultClassName = "w-full p-2 h-screen bg-dark-3 ";
    defaultClassName += className;
    if (loading) defaultClassName += "opacity-80 ";
    return defaultClassName;
  };

  return (
    <div className={buildClassName()}>
      {loading && <Loader></Loader>}
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

function Loader() {
  return (
    <div className="fixed w-full h-screen bg-transparent flex items-start justify-center">
      <div className="w-20 h-20 my-10 rounded-full border-2 border-t-dark-2 animate-spin"></div>
    </div>
  );
}
