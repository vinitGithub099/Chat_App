import { Button, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaHouseUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FORM_FIELD } from "../../../constants/formFields";
import { EMAIL_REGEX } from "../../../constants/regex";
import {
  BUTTON_VARIANT,
  INPUT_VARIANT,
  TYPOGRAPHY_VARIANT,
} from "../../../constants/variants";
import { useLoginMutation } from "../../../store/Services/authAPI";
import classes from "../index.module.css";
import { FIELD_NAME } from "./fieldNames";

const LoginPage = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const [successMessage, setSuccessMessage] = useState("");

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
     {successMessage ?  <div className={classes.subContainer}>
        <div className={classes.icon}>
          <FaHouseUser size={80} />
        </div>
        <div className={classes.formContainer}>
          <Typography variant={TYPOGRAPHY_VARIANT.H4}>User Login</Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit(handleFormSubmit)}
            noValidate
          >
            <div className={classes.formField}>
              <Input
                variant={INPUT_VARIANT.OUTLINED}
                className={classes.input}
                type={FORM_FIELD.EMAIL}
                placeholder="user@gmail.com"
                labelProps={{ className: classes.labelProps }}
                {...register(FIELD_NAME.EMAIL, {
                  required: {
                    value: true,
                    message: "Please enter your email!",
                  },
                  pattern: {
                    value: EMAIL_REGEX,
                    message: "Invalid email!",
                  },
                })}
              />
              {errors?.[FIELD_NAME.EMAIL] && (
                <Typography
                  variant={TYPOGRAPHY_VARIANT.SMALL}
                  className={classes.error}
                >
                  {errors[FIELD_NAME.EMAIL].message}
                </Typography>
              )}
            </div>
            <div className={classes.formField}>
              <Input
                variant={INPUT_VARIANT.OUTLINED}
                className={classes.input}
                type={FORM_FIELD.PASSWORD}
                placeholder="********"
                labelProps={{ className: classes.labelProps }}
                {...register(FIELD_NAME.PASSWORD, {
                  required: {
                    value: true,
                    message: "Please enter your password!",
                  },
                })}
              />
              {errors?.[FIELD_NAME.PASSWORD] && (
                <Typography
                  variant={TYPOGRAPHY_VARIANT.SMALL}
                  className={classes.error}
                >
                  {errors[FIELD_NAME.PASSWORD].message}
                </Typography>
              )}
            </div>
            <Button
              variant={BUTTON_VARIANT.TEXT}
              type="submit"
              className={classes.submitBtn}
              fullWidth
              disabled={!isValid}
            >
              Login
            </Button>
            <div className={classes.linkContainer}>
              <Typography variant={TYPOGRAPHY_VARIANT.SMALL}>
                {`Don't have an account?`}
                <span className={classes.link}>
                  <Link to="/register">Register</Link>
                </span>
              </Typography>
            </div>
          </form>
        </div>
      </div> :
      <div className="w-full border">
        <Typography variant={TYPOGRAPHY_VARIANT.H2}>Hey {user.name}!</Typography>
        <Typography variant={TYPOGRAPHY_VARIANT.LEAD}>You have logged in successfully!</Typography>
        <Typography variant={TYPOGRAPHY_VARIANT.LEAD}>Redirecting to Home!</Typography>
      </div>}
    </section>
  );
};

export default LoginPage;
