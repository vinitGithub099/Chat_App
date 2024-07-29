import { NOTIFICATION_TYPE } from "../../constants/notificationType";
import AuthNotification from "./AuthNotification";
import Defaultnotification from "./DefaultNotification";
import MessageNotification from "./MessageNotification";

const Notification = ({ toastType, id, ...rest }) => {
  switch (toastType) {
    case NOTIFICATION_TYPE.AUTH:
      return <AuthNotification {...{ ...rest, id }} />;
    case NOTIFICATION_TYPE.MESSAGE:
      return <MessageNotification {...{ ...rest, id }} />;
    default:
      return (
        <Defaultnotification {...{ message: "Default Message", ...rest, id }} />
      );
  }
};

export default Notification;
