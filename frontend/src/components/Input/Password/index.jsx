import Input from "..";

const PasswordField = (props) => {
  return (
    <Input
      {...{ ...props, type: "password", validation: { requried: true } }}
    />
  );
};

export default PasswordField;
