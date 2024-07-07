import { Button, Input, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Logo from "../../../components/Logo";
import { EMAIL_REGEX } from "../../../constants/regex";
import { useRegisterMutation } from "../../../store/Services/authAPI";
import classes from "./index.module.css";

const RegisterPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [registerUser] = useRegisterMutation();

  const signup = async (data) => {
    try {
      await registerUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (formData) => {
    signup(formData);
  };

  return (
    <section className={classes.container}>
      <div className={classes.coverImageContainer}></div>
      <div className={classes.formContainer}>
        <Logo className="" size="xxl" />
        <Typography variant="h2" className="text-left mb-4">
          Sign Up
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
              label="Name"
              placeholder="name"
              className={classes.input}
              labelProps={{ className: classes.labelProps }}
              {...register("name", {
                required: {
                  value: true,
                  message: "Please enter your email!",
                },
              })}
            />
            {errors && errors["name"] && (
              <Typography color="red" variant="small" className={classes.error}>
                {errors["name"].message}
              </Typography>
            )}
          </div>
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
                required: {
                  value: true,
                  message: "Please enter your password!",
                },
              })}
            />
            {errors && errors["password"] && (
              <Typography color="red" variant="small" className={classes.error}>
                {errors["password"].message}
              </Typography>
            )}
          </div>
          <Button type="submit" className={classes.submitBtn} fullWidth>
            SUBMIT
          </Button>
          <div className={classes.loginLinkContainer}>
            <Typography variant="small" className="">
              {`Already have an account?`}
            </Typography>
            <Typography variant="small" className={classes.loginLink}>
              <Link to="/login">Login</Link>
            </Typography>
          </div>
        </form>
      </div>
      );
    </section>
  );
};

export default RegisterPage;
