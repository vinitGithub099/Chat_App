import { Button } from "@material-tailwind/react";
import AuthNotification from "../../../components/Notification/AuthNotification";
import MessageNotification from "../../../components/Notification/MessageNotification";
import {
  AUTH_NOTIFICATION_ACTION,
  AUTH_NOTIFICATION_STATUS,
} from "../../../constants/authNotficationTypes";
import { TOAST_TYPE } from "../../../constants/toastTypes";
import useNotification from "../../../hooks/useNotification";
import classes from "./index.module.css";

const Notification = () => {
  const { notify } = useNotification();

  const handleAuthToast = () => {
    notify(
      {
        toastType: TOAST_TYPE.AUTH,
        status: AUTH_NOTIFICATION_STATUS.SUCCESS,
        action: AUTH_NOTIFICATION_ACTION.LOGIN,
      },
      { position: "top-right" }
    );
  };

  const handleMsgToast = () => {
    notify(
      {
        toastType: TOAST_TYPE.MESSAGE,
        sender: { name: "Vinit" },
        content: "Hey! What are you doing?",
      },
      { position: "top-right" }
    );
  };

  return (
    <div className={classes.sampleContainer}>
      <div className={classes.btnContainer}>
        <Button
          variant="text"
          onClick={handleAuthToast}
          className="bg-highlight text-primary-text-1 hover:bg-secondary"
        >
          auth toast
        </Button>
        <Button
          variant="text"
          onClick={handleMsgToast}
          className="bg-highlight text-primary-text-1 hover:bg-secondary"
        >
          message toast
        </Button>
      </div>
      <div className={classes.componentsContainer}>
        <AuthNotification
          {...{
            toastType: TOAST_TYPE.AUTH,
            status: AUTH_NOTIFICATION_STATUS.SUCCESS,
            action: AUTH_NOTIFICATION_ACTION.LOGIN,
          }}
        />
        <AuthNotification
          {...{
            toastType: TOAST_TYPE.AUTH,
            status: AUTH_NOTIFICATION_STATUS.FAILURE,
            action: AUTH_NOTIFICATION_ACTION.LOGIN,
          }}
        />
        <MessageNotification
          {...{
            sender: { name: "Vinit" },
            content: "Hey! What are you doing?",
          }}
        />
      </div>
    </div>
  );
};

export default Notification;
