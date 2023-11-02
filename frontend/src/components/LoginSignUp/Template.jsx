import { useSelector } from "react-redux";
import Form from "../Form/Form";
import Header from "../Header";
import Loader from "../Loader";
import FormNavLink from "./FormNavLink";
import SocialIconList from "./SocialIconList";
import { socialIconList } from "./utils/iconsList";

export default function Template({
  className,
  formConfigs: { formClassName, fields, buttonConfigs, handleSubmit },
  heading,
  navConfigs: { text, path, label },
}) {
  const { loading } = useSelector((state) => state.auth);

  const buildClassName = (className) => {
    let defaultClassName = "w-full p-2 h-screen bg-dark-3 ";
    defaultClassName += className;
    if (loading) defaultClassName += "opacity-80 ";
    return defaultClassName;
  };

  return (
    <div className={buildClassName(className)}>
      {loading && <Loader></Loader>}
      <section className="mt-20 mx-auto max-w-sm bg-dark-1 rounded-md p-4">
        <Header className="p-2 font-bold text-lg text-light-2">
          {heading}
        </Header>
        <Form
          className={formClassName}
          fields={fields}
          buttonConfigs={buttonConfigs}
          handleSubmit={handleSubmit}
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
          text={text}
          label={label}
          path={path}
        ></FormNavLink>
      </section>
    </div>
  );
}
