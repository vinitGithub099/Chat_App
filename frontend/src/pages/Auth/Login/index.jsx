import { Button, Input, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Logo from "../../../components/Logo";
import { EMAIL_REGEX } from "../../../constants/regex";
import { useLoginMutation } from "../../../store/Services/authAPI";
import classes from "./index.module.css";

const LoginPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [login] = useLoginMutation();

  const loginUser = async (userData) => {
    try {
      await login(userData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (formData) => {
    loginUser(formData);
  };

  return (
    <section className={classes.container}>
      <div className={classes.formContainer}>
        <Logo size="xxl" />
        <Typography variant="h2" className="text-left mb-4">
          Login
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
        >
          <div className={classes.formField}>
            <Input
              type="email"
              variant="outlined"
              label="Email"
              placeholder="user@gmail.com"
              className={classes.input}
              labelProps={{ className: classes.labelProps }}
              {...register("email", {
                required: {
                  value: true,
                  message: "Please enter your email!",
                },
                pattern: { value: EMAIL_REGEX, message: "Invalid email!" },
              })}
            />
            {errors && errors["email"] && (
              <Typography color="red" variant="small" className={classes.error}>
                {errors["email"].message}
              </Typography>
            )}
          </div>
          <div className={classes.formField}>
            <Input
              type="password"
              variant="outlined"
              label="Password"
              placeholder="********"
              className={classes.input}
              labelProps={{ className: classes.labelProps }}
              {...register("password", {
                required: { value: true, message: "Please enter your name!" },
              })}
            />
            {errors && errors["password"] && (
              <Typography color="red" variant="small" className={classes.error}>
                {errors["password"].message}
              </Typography>
            )}
          </div>
          <Typography variant="small" className={classes.forgotPswd}>
            <Link to="/login">Forgot password?</Link>
          </Typography>
          <Button type="submit" className={classes.submitBtn} fullWidth>
            SUBMIT
          </Button>
          <div className={classes.registerLinkContainer}>
            <Typography variant="small" className="">
              {`Don't have an account?`}
            </Typography>
            <Typography variant="small" className={classes.registerLink}>
              <Link to="/register">Register</Link>
            </Typography>
          </div>
        </form>
      </div>
      <div className={classes.coverImageContainer}></div>
    </section>
  );
};

export default LoginPage;
