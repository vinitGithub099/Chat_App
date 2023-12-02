import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Button from "../Form/Button";
import Form from "../Form/Form";
import Header from "../Header";
import Loader from "../Loader";
import FormNavLink from "./FormNavLink";

export default function Template({
  className,
  formConfigs: { formClassName, fields, buttonConfigs, handleSubmit },
  heading,
  navConfigs: { text, path, label },
}) {
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const buildClassName = (className) => {
    let defaultClassName = "w-full p-2 h-screen bg-dark-3 ";
    defaultClassName += className;
    if (loading) defaultClassName += "opacity-80 ";
    return defaultClassName;
  };

  return (
    <div className={buildClassName(className)}>
      <div className="max-w-sm mx-auto">
        <Button
          type="navigate"
          handleClick={() => navigate("/")}
          label="← Got to Home"
          className="bg-dark-1 px-4 py-2 mt-4 text-light-1 rounded-md"
        ></Button>
      </div>
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
