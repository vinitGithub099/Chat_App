import { ERROR, SUCCESS, WARNING } from "../../constants/constants";
import Button from "../Form/Button";
import { useToast } from "../hooks/useToast";

export default function ToastDemo() {
  const { populateToast } = useToast();

  const notify = (content, type) => populateToast(content, type);

  const types = [
    { type: SUCCESS, content: `${SUCCESS} notification` },
    { type: WARNING, content: `${WARNING} notification` },
    { type: ERROR, content: `${ERROR} notification` },
  ];

  return (
    <div className="w-full h-screen bg-dark-3 p-2">
      <div className="border-2 p-4  my-10 max-w-3xl mx-auto bg-light-1">
        <div className="text-2xl font-semibold my-4">
          This is a demo component for testing toast notifications
        </div>
        <div className="flex flex-col items-start">
          {types &&
            types.length &&
            types.map(({ content, type }, index) => {
              return (
                <Button
                  key={index}
                  type="submit"
                  onClick={() => notify(content, type)}
                  className={`py-2 px-4 my-2 text-${type} bg-dark-1 text-light-1 text-xl rounded-md`}
                  label={content}
                ></Button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
