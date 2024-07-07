import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { IoNavigate } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import classes from "./index.module.css";

const LoginDialog = () => {
  const navigate = useNavigate();
  const redirectToHome = () => navigate("/");
  const redirectToLogin = () =>
    navigate("/login", {
      state: {
        from: location.pathname,
      },
    });

  return (
    <Dialog open={true} size={"md"} className={classes.loginDialog}>
      <DialogHeader className={classes.loginDialogFeader}>
        Login Expired
      </DialogHeader>
      <DialogBody className={classes.loginDialogBody}>
        Your login session has expired. Kindly login again to continue!
      </DialogBody>
      <DialogFooter className={classes.loginDialogFooter}>
        <Button
          variant="text"
          onClick={redirectToHome}
          className={classes.cancelBtn}
          ripple={false}
        >
          <span>Home</span>
          <IoNavigate size={15} />
        </Button>
        <Button
          onClick={redirectToLogin}
          className={classes.navigateBtn}
          ripple={false}
        >
          <span>Login</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default LoginDialog;
