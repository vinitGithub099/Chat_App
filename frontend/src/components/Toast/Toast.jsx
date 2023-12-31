import {
  AiFillCheckCircle,
  AiFillExclamationCircle,
  AiFillInfoCircle,
  AiFillWarning,
} from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { ERROR, INFO, SUCCESS, WARNING } from "../../constants/constants";
import Button from "../Form/Button";
import { useTimeout } from "../hooks/useTimeout";

const delay = 5000;

function Toast({ className, content, type, closeToast, hideIcon }) {
  useTimeout(closeToast, delay);
  const buildClassName = () => {
    let defaultClassName = `w-72 flex flex-row items-center ${className}`;
    let decorator = `border-4 border-${type} bg-dark-1 text-${type}`;
    return `${defaultClassName} ${decorator}`;
  };

  return (
    <div className={buildClassName()}>
      {!hideIcon ? (
        <NotificationIcon type={type} size={20}></NotificationIcon>
      ) : null}
      <div className="px-2 text-light-1 flex-1">{content}</div>
      <Button
        type={"icon"}
        handleClick={closeToast}
        className="p-2 hover:bg-light-1 hover:text-dark-1 rounded-full"
      >
        <IoMdClose></IoMdClose>
      </Button>
    </div>
  );
}

export default Toast;

function NotificationIcon({ type, size }) {
  if (type === SUCCESS)
    return <AiFillCheckCircle size={size}></AiFillCheckCircle>;
  else if (type === WARNING) return <AiFillWarning size={size}></AiFillWarning>;
  else if (type === ERROR)
    return <AiFillExclamationCircle size={size}></AiFillExclamationCircle>;
  else if (type === INFO)
    return <AiFillInfoCircle size={size}></AiFillInfoCircle>;
  else return null;
}
