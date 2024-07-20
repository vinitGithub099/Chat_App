import { Button, Typography } from "@material-tailwind/react";
import cx from "classnames";
import { toast } from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { AUTH_NOTIFICATION_STATUS } from "../../../constants/authNotficationTypes";
import classes from "./index.module.css";
import { BUTTON_VARIANT, TYPOGRAPHY_VARIANT } from "../../../constants/variants";

const AuthNotification = ({ status, action, id }) => {
  const removeToast = () => toast.remove(id);
  const getNotificationStyle = () => {
    switch (status) {
      case AUTH_NOTIFICATION_STATUS.SUCCESS:
        return classes.authSuccess;
      case AUTH_NOTIFICATION_STATUS.FAILURE:
        return classes.authFailure;
      default:
        return "";
    }
  };

  const getDefaultMessage = () => {
    switch (status) {
      case AUTH_NOTIFICATION_STATUS.SUCCESS:
        return `${capitalizeFirstLetter(action)} successful!`;
      case AUTH_NOTIFICATION_STATUS.FAILURE:
        return `${capitalizeFirstLetter(action)} failed.`;
      default:
        return "Operation status unknown.";
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string?.charAt(0).toUpperCase() + string.slice(1);
  };

  const renderAuthIcon = () => {
    switch (status) {
      case AUTH_NOTIFICATION_STATUS.SUCCESS:
        return <FaCheckCircle size={20} />;
        case AUTH_NOTIFICATION_STATUS.FAILURE:
        return <MdError size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className={cx(classes.authToastContainer, getNotificationStyle())}>
      {renderAuthIcon()}
      <Typography variant={TYPOGRAPHY_VARIANT.SMALL} className={classes.authToastMessage}>
        {getDefaultMessage()}
      </Typography>
      <Button
        variant={BUTTON_VARIANT.TEXT}
        onClick={removeToast}
        className={classes.authToastDimissBtn}
      >
        <AiOutlineClose />
      </Button>
    </div>
  );
};

export default AuthNotification;
