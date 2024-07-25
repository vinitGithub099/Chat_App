import { TOAST_TYPE } from "../../constants/toastTypes";
import AuthNotification from "./AuthNotification";
import MessageNotification from "./MessageNotification";

const Notification = ({ toastType, id, ...rest }) => {
  switch (toastType) {
    case TOAST_TYPE.AUTH:
      return <AuthNotification {...{ ...rest, id }} />;
    case TOAST_TYPE.MESSAGE:
      return <MessageNotification {...{ ...rest, id }} />;
    default:
      return <></>;
  }
};

export default Notification;
