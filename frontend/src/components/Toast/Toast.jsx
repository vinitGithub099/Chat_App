import { IoMdClose } from "react-icons/io";
import Button from "../Form/Button";
import { useTimeout } from "../hooks/useTimeout";

const delay = 5000;

function Toast({ className, content, type, closeToast }) {
  useTimeout(closeToast, delay);
  console.log(type);
  const buildClassName = () => {
    let defaultClassName = `w-80 p-2 flex flex-row items-center justify-between ${className}`;
    let decorator = `border-4 border-${type} bg-dark-1 text-${type}`;
    return `${defaultClassName} ${decorator}`;
  };
  return (
    <div className={buildClassName()}>
      <div className="p-2">{content}</div>
      <Button
        type={"icon"}
        onClick={closeToast}
        className="p-2 hover:bg-light-1 hover:text-dark-1 rounded-full"
      >
        <IoMdClose></IoMdClose>
      </Button>
    </div>
  );
}

export default Toast;
