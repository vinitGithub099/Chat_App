import { useToast } from "../../../Hooks/useToast";
import userLogo from "../../../assets/profile-user_64572.png";
import Button from "../../../components/Button";
import UserAvatar from "../../../components/UserAvatar";
import { ERROR, INFO, SUCCESS, WARNING } from "../../../constants/constants";
import { getShortenedString } from "../../../helpers/helpers";

const ToastDemo = () => {
  const { notify } = useToast();

  const types = [
    { type: SUCCESS, content: `${SUCCESS} notification`, hideIcon: false },
    { type: WARNING, content: `${WARNING} notification`, hideIcon: false },
    { type: ERROR, content: `${ERROR} notification`, hideIcon: false },
    { type: INFO, content: `${INFO} notification`, hideIcon: false },
    { type: INFO, content: notificationComponent(), hideIcon: true },
  ];

  function notificationComponent() {
    return (
      <div className="w-full flex flex-row items-center">
        <UserAvatar
          altText={"hello world"}
          className=""
          imgSrc={userLogo}
          config={"s"}
        ></UserAvatar>
        <div className="pl-2 flex flex-col items-baseline ">
          <div className="text-light-1 font-semibold pb-1 text-sm">{`Ayush`}</div>
          <div className="text-light-2 text-xs">
            {getShortenedString(
              "Hello World! This is a demo toast notification for receiving messages!"
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-screen bg-dark-3 p-2">
      <div className="border-2 p-4  my-10 max-w-3xl mx-auto bg-light-1">
        <div className="text-2xl font-semibold my-4">
          This is a demo component for testing toast notifications
        </div>
        <div className="flex flex-col items-start">
          {types &&
            types.length &&
            types.map(({ content, type, hideIcon }, index) => {
              return (
                <Button
                  key={index}
                  type="submit"
                  handleClick={() => notify(content, type, hideIcon)}
                  className={`py-2 px-4 my-2 text-${type} bg-dark-1 text-light-1 text-xl rounded-md`}
                >
                  {content}
                </Button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ToastDemo;
