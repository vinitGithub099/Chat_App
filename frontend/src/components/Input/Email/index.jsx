import Input from "..";
import { EMAIL_REGEX } from "../../../constants/regex";

const EmailField = (props) => {
  return (
    <Input
      {...{
        ...props,
        type: "email",
        validation: {
          required: { value: true, message: "Please fill the above field" },
          pattern: { value: EMAIL_REGEX, message: "Invalid email!" },
        },
      }}
    />
  );
};

export default EmailField;
