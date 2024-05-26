import { MdEmail, MdPassword, MdTextFields } from "react-icons/md";
import { authAPI } from "../../../api/authAPI";
import Button from "../../../components/Button";
import Form from "../../../components/Form";
import EmailField from "../../../components/Input/Email";
import PasswordField from "../../../components/Input/Password";
import TextField from "../../../components/Input/Text";
import styles from "./index.module.css";

const RegisterPage = () => {
  const registerUser = async (data) => {
    try {
      const res = await authAPI.loginUser(data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (formData) => {
    console.log(formData);
    // registerUser(formData);
  };

  return (
    <div className={styles.registerContainer}>
      <h3 className={styles.registerHeading}>Sign Up</h3>
      <Form
        {...{
          className: styles.registerForm,
          handleSubmit: handleSubmit,
        }}
      >
        <TextField
          {...{
            wrapperClassName: styles.wrapperClassName,
            className: styles.className,
            errorClassName: styles.errorClassName,
            labelClassName: styles.labelClassName,
            inpClassName: styles.inpClassName,
            label: <MdTextFields size={30} />,
            name: "name",
            placeholder: "Name",
          }}
        />
        <EmailField
          {...{
            wrapperClassName: styles.wrapperClassName,
            className: styles.className,
            errorClassName: styles.errorClassName,
            labelClassName: styles.labelClassName,
            inpClassName: styles.inpClassName,
            label: <MdEmail size={30} />,
            name: "email",
            placeholder: "abc@gmail.com",
          }}
        />
        <PasswordField
          {...{
            wrapperClassName: styles.wrapperClassName,
            className: styles.className,
            errorClassName: styles.errorClassName,
            labelClassName: styles.labelClassName,
            inpClassName: styles.inpClassName,
            label: <MdPassword size={30} />,
            name: "password",
            placeholder: "********",
          }}
        />
        <Button type="submit" className={styles.submitBtnClassName}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
