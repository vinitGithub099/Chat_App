import { Button, Checkbox, Input, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../../components/Logo";
import { EMAIL_REGEX } from "../../../constants/regex";
import { loginUser } from "../../../store/Features/User/AuthActions";
import classes from "./index.module.css";

const LoginPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();

  const login = async (data) => {
    try {
      const res = await dispatch(loginUser(data));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (formData) => {
    console.log(formData);
    // login(formData);
  };

  const formContainer = (
    <div className={classes.formContainer}>
      <Logo className={""} size="xxl" />
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

        <div className={classes.extras}>
          <Checkbox
            label={<Typography variant="small">Remember Me</Typography>}
            containerProps={{ className: "-ml-2.5" }}
          />
          <Typography variant="small">
            <Link to="/login">Forgot password?</Link>
          </Typography>
        </div>

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
  );

  return (
    <section className={classes.container}>
      {formContainer}
      <div className={classes.coverImageContainer}></div>
    </section>
  );
};

export default LoginPage;