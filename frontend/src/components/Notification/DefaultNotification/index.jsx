import { Button, Typography } from "@material-tailwind/react";
import cx from "classnames";
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { NOTIFICATION_STATUS } from "../../../constants/notificationStatus";
import {
  BUTTON_VARIANT,
  TYPOGRAPHY_VARIANT,
} from "../../../constants/variants";
import classes from "./index.module.css";

const Defaultnotification = ({ status, message, id }) => {
  const removeToast = () => toast.remove(id);

  const getNotificationStyle = () => {
    switch (status) {
      case NOTIFICATION_STATUS.SUCCESS:
        return classes.toastSuccess;
      case NOTIFICATION_STATUS.FAILURE:
        return classes.toastFailure;
      case NOTIFICATION_STATUS.WARNING:
          return classes.toastWarn;
      default:
        return "";
    }
  };

  return (
    <div className={cx(classes.toastContainer, getNotificationStyle())}>
      <Typography
        variant={TYPOGRAPHY_VARIANT.SMALL}
        className={classes.toastessage}
      >
        {message}
      </Typography>
      <Button
        variant={BUTTON_VARIANT.TEXT}
        onClick={removeToast}
        className={classes.toastDimissBtn}
      >
        <AiOutlineClose />
      </Button>
    </div>
  );
};

export default Defaultnotification;
