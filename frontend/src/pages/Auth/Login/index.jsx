import { Button, Input, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { FaHouseUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FORM_FIELDS } from "../../../constants/formFields";
import { EMAIL_REGEX } from "../../../constants/regex";
import { useLoginMutation } from "../../../store/Services/authAPI";
import classes from "../index.module.css";

const LoginPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const loginUser = async (userData) => {
    try {
      await login(userData);
      // navigate to home page afer successful login
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (formData) => {
    loginUser(formData);
  };

  return (
    <section className={classes.container}>
      <div className={classes.subContainer}>
        <div className={classes.icon}>
          <FaHouseUser size={80} />
        </div>
        <div className={classes.formContainer}>
          <Typography variant="h4">User Login</Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit(handleFormSubmit)}
            noValidate
          >
            <div className={classes.formField}>
              <Input
                variant="outlined"
                className={classes.input}
                type={FORM_FIELDS.EMAIL}
                placeholder="user@gmail.com"
                labelProps={{ className: classes.labelProps }}
                {...register(FORM_FIELDS.EMAIL, {
                  required: {
                    value: true,
                    message: "Please enter your email!",
                  },
                  pattern: { value: EMAIL_REGEX, message: "Invalid email!" },
                })}
              />
              {errors && errors[FORM_FIELDS.EMAIL] && (
                <Typography variant="small" className={classes.error}>
                  {errors[FORM_FIELDS.EMAIL].message}
                </Typography>
              )}
            </div>
            <div className={classes.formField}>
              <Input
                className={classes.input}
                labelProps={{ className: classes.labelProps }}
                variant="outlined"
                type={FORM_FIELDS.PASSWORD}
                placeholder="********"
                {...register(FORM_FIELDS.PASSWORD, {
                  required: { value: true, message: "Please enter the password!" },
                })}
              />
              {errors && errors[FORM_FIELDS.PASSWORD] && (
                <Typography variant="small" className={classes.error}>
                  {errors[FORM_FIELDS.PASSWORD].message}
                </Typography>
              )}
            </div>
            <Button type="submit" className={classes.submitBtn} fullWidth>
              Login
            </Button>
            <div className={classes.linkContainer}>
              <Typography variant="small">
                {`Don't have an account?`}
                <span className={classes.link}>
                  <Link to="/register">Register</Link>
                </span>
              </Typography>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
