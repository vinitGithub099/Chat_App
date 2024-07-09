import toast, { Toaster } from "react-hot-toast";
import Notification from "../../components/Notification";
import NotificationContext from "../../context/NotificationContext";

const NotificationProvider = ({ children }) => {
  const notify = (props, options = {}) => {
    toast.custom((t) => <Notification id={t.id} {...props} />, options);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <Toaster />
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
