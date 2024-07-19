import { Button, Input, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { RiShieldUserFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FORM_FIELDS } from "../../../constants/formFields";
import { EMAIL_REGEX } from "../../../constants/regex";
import { useRegisterMutation } from "../../../store/Services/authAPI";
import classes from "../index.module.css";

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
      <div className={classes.subContainer}>
        <div className={classes.icon}>
          <RiShieldUserFill size={80} />
        </div>
        <div className={classes.formContainer}>
          <Typography variant="h4">Register User</Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit(handleFormSubmit)}
            noValidate
          >
            <div className={classes.formField}>
              <Input
                type={FORM_FIELDS.NAME}
                variant="outlined"
                placeholder="name"
                className={classes.input}
                labelProps={{ className: classes.labelProps }}
                {...register(FORM_FIELDS.NAME, {
                  required: {
                    value: true,
                    message: "Please enter your name!",
                  },
                })}
              />
              {errors && errors[FORM_FIELDS.NAME] && (
                <Typography variant="small" className={classes.error}>
                  {errors[FORM_FIELDS.NAME].message}
                </Typography>
              )}
            </div>
            <div className={classes.formField}>
              <Input
                type={FORM_FIELDS.NAME}
                variant="outlined"
                placeholder="user@gmail.com"
                className={classes.input}
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
                type={FORM_FIELDS.PASSWORD}
                variant="outlined"
                placeholder="********"
                className={classes.input}
                labelProps={{ className: classes.labelProps }}
                {...register(FORM_FIELDS.PASSWORD, {
                  required: {
                    value: true,
                    message: "Please enter your password!",
                  },
                })}
              />
              {errors && errors[FORM_FIELDS.PASSWORD] && (
                <Typography variant="small" className={classes.error}>
                  {errors[FORM_FIELDS.PASSWORD].message}
                </Typography>
              )}
            </div>
            <Button type="submit" className={classes.submitBtn} fullWidth>
              Register
            </Button>
            <div className={classes.linkContainer}>
              <Typography variant="small">
                {`Already have an account?`}
              </Typography>
              <Typography variant="small" className={classes.link}>
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
