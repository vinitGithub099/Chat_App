import { MdEmail, MdPassword } from "react-icons/md";
import { authAPI } from "../../../api/authAPI";
import Button from "../../../components/Button";
import Form from "../../../components/Form";
import EmailField from "../../../components/Input/Email";
import PasswordField from "../../../components/Input/Password";
import styles from "./index.module.css";

const LoginPage = () => {
  const loginUser = async (data) => {
    try {
      const res = await authAPI.loginUser(data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (formData) => {
    console.log(formData);
    // loginUser(formData);
  };

  return (
    <div className={styles.loginContainer}>
      <h3 className={styles.loginHeading}>Login</h3>
      <Form
        {...{
          className: styles.loginForm,
          handleSubmit: handleSubmit,
        }}
      >
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

export default LoginPage;
