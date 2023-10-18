/**
 * * reference links: ["https://www.freecodecamp.org/news/how-to-validate-forms-in-react/", "https://www.react-hook-form.com/api/useform/seterror/"]
 */

import { FormProvider, useForm } from "react-hook-form";
import _ from "underscore";
import Button from "./Button";
import Input from "./Input/Input";

export default function Form({
  className,
  fields,
  buttonConfigs,
  handleSubmit,
}) {
  const methods = useForm();

  const handelFormSubmit = (e) => {
    handleSubmit(e);
  };

  return !_.isEmpty(fields) && fields.length ? (
    <FormProvider {...methods}>
      <form
        className={`w-full ${className}`}
        onSubmit={methods.handleSubmit(handelFormSubmit)}
        noValidate
      >
        {fields.map((field, index) => {
          return <Input key={index} field={field}></Input>;
        })}
        {buttonConfigs && <Button {...buttonConfigs}></Button>}
      </form>
    </FormProvider>
  ) : (
    <FormFallBack></FormFallBack>
  );
}

const FormFallBack = () => {
  return (
    <div className="w-full mb-8 text-xl text-center font-semibold text-error">
      Oops! Login Form not found.
    </div>
  );
};
