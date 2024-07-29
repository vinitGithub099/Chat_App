import { Button, Input, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { RiShieldUserFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import {
  AUTH_NOTIFICATION_ACTION,
  AUTH_NOTIFICATION_STATUS,
} from "../../../constants/authNotficationTypes";
import { FORM_FIELD } from "../../../constants/formFields";
import { EMAIL_REGEX } from "../../../constants/regex";
import { TOAST_TYPE } from "../../../constants/toastTypes";
import {
  BUTTON_VARIANT,
  INPUT_VARIANT,
  TYPOGRAPHY_VARIANT,
} from "../../../constants/variants";
import useNotification from "../../../hooks/useNotification";
import { useRegisterMutation } from "../../../store/Services/authAPI";
import classes from "../index.module.css";
import { FIELD_NAME } from "./fieldNames";

const RegisterPage = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });
  const [registerUser] = useRegisterMutation();
  const { notify } = useNotification();
  const navigate = useNavigate();

  const signup = async (data) => {
    try {
      await registerUser(data);
      notify(
        {
          toastType: TOAST_TYPE.AUTH,
          status: AUTH_NOTIFICATION_STATUS.SUCCESS,
          action: AUTH_NOTIFICATION_ACTION.REGISTER,
        },
        { position: "top-right" }
      );
      navigate("/login");
    } catch (error) {
      notify(
        {
          toastType: TOAST_TYPE.AUTH,
          status: AUTH_NOTIFICATION_STATUS.FAILURE,
          action: AUTH_NOTIFICATION_ACTION.REGISTER,
        },
        { position: "top-right" }
      );
      console.log(error);
    }
  };

  const handleFormSubmit = (formData) => {
    signup(formData);
  };

  return (
    <section className={classes.container}>
      <div className={classes.subContainer}>
        <div className={classes.icon}>
          <RiShieldUserFill size={80} />
        </div>
        <div className={classes.formContainer}>
          <Typography variant={TYPOGRAPHY_VARIANT.H4}>Register User</Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit(handleFormSubmit)}
            noValidate
          >
            <div className={classes.formField}>
              <Input
                variant={INPUT_VARIANT.OUTLINED}
                type={FORM_FIELD.TEXT}
                placeholder="name"
                className={classes.input}
                labelProps={{ className: classes.labelProps }}
                {...register(FIELD_NAME.NAME, {
                  required: {
                    value: true,
                    message: "Please enter your name!",
                  },
                })}
              />
              {errors?.[FIELD_NAME.NAME] && (
                <Typography
                  variant={TYPOGRAPHY_VARIANT.SMALL}
                  className={classes.error}
                >
                  {errors[FIELD_NAME.NAME].message}
                </Typography>
              )}
            </div>
            <div className={classes.formField}>
              <Input
                variant={INPUT_VARIANT.OUTLINED}
                type={FORM_FIELD.EMAIL}
                placeholder="user@gmail.com"
                className={classes.input}
                labelProps={{ className: classes.labelProps }}
                {...register(FIELD_NAME.EMAIL, {
                  required: {
                    value: true,
                    message: "Please enter your email!",
                  },
                  pattern: { value: EMAIL_REGEX, message: "Invalid email!" },
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
                type={FORM_FIELD.PASSWORD}
                placeholder="********"
                className={classes.input}
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
              Register
            </Button>
            <div className={classes.linkContainer}>
              <Typography variant={TYPOGRAPHY_VARIANT.SMALL}>
                {`Already have an account?`}
              </Typography>
              <Typography
                variant={TYPOGRAPHY_VARIANT.SMALL}
                className={classes.link}
              >
                <Link to="/login">Login</Link>
              </Typography>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
