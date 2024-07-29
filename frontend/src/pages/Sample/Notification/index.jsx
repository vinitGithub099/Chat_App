import { Button } from "@material-tailwind/react";
import AuthNotification from "../../../components/Notification/AuthNotification";
import Defaultnotification from "../../../components/Notification/DefaultNotification";
import MessageNotification from "../../../components/Notification/MessageNotification";
import { AUTH_NOTIFICATION_ACTION } from "../../../constants/authNotficationTypes";
import { NOTIFICATION_STATUS } from "../../../constants/notificationStatus";
import { NOTIFICATION_TYPE } from "../../../constants/notificationType";
import { BUTTON_VARIANT } from "../../../constants/variants";
import useNotification from "../../../hooks/useNotification";
import classes from "./index.module.css";

const Notification = () => {
  const { notify } = useNotification();

  const handleAuthToast = () => {
    notify(
      {
        toastType: NOTIFICATION_TYPE.AUTH,
        status: NOTIFICATION_STATUS.SUCCESS,
        action: AUTH_NOTIFICATION_ACTION.LOGIN,
      },
      { position: "top-right" }
    );
  };

  const handleMsgToast = () => {
    notify(
      {
        toastType: NOTIFICATION_TYPE.MESSAGE,
        sender: { name: "Vinit" },
        content: "Hey! What are you doing?",
      },
      { position: "top-right" }
    );
  };

  const handleDefaultToast = () => {
    notify(
      {
        toastType: null,
        status: NOTIFICATION_STATUS.WARNING,
        message: "Default Toast"
      },
      { position: "top-right" }
    );
  }

  return (
    <div className={classes.sampleContainer}>
      <div className={classes.btnContainer}>
        <Button
          variant={BUTTON_VARIANT.TEXT}
          onClick={handleAuthToast}
          className="bg-highlight text-primary-text-1 hover:bg-secondary"
        >
          auth toast
        </Button>
        <Button
          variant={BUTTON_VARIANT.TEXT}
          onClick={handleMsgToast}
          className="bg-highlight text-primary-text-1 hover:bg-secondary"
        >
          message toast
        </Button>
        <Button
          variant={BUTTON_VARIANT.TEXT}
          onClick={handleDefaultToast}
          className="bg-highlight text-primary-text-1 hover:bg-secondary"
        >
          default toast
        </Button>
      </div>
      <div className={classes.componentsContainer}>
        <AuthNotification
          {...{
            toastType: NOTIFICATION_TYPE.AUTH,
            status: NOTIFICATION_STATUS.SUCCESS,
            action: AUTH_NOTIFICATION_ACTION.LOGIN,
          }}
        />
        <AuthNotification
          {...{
            toastType: NOTIFICATION_TYPE.AUTH,
            status: NOTIFICATION_STATUS.FAILURE,
            action: AUTH_NOTIFICATION_ACTION.LOGIN,
          }}
        />
        <MessageNotification
          {...{
            sender: { name: "Vinit" },
            content: "Hey! What are you doing?",
          }}
        />
        <Defaultnotification
          {...{
            message: "Default Notification",
          }}
        />
      </div>
    </div>
  );
};

export default Notification;
