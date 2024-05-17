import { FormProvider, useForm } from "react-hook-form";

const Form = ({ className, handleSubmit, children }) => {
  const methods = useForm();
  const handleFormSubmit = (e) => {
    handleSubmit(e);
  };

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={methods.handleSubmit(handleFormSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
