import { useSelector } from "react-redux";

export default function ChatDescription() {
  const currChat = useSelector((state) => state.chat.currentChat);
  const desc = currChat.description;
  return (
    <div className="p-4 my-4">
      <h3 className="text-lg text-light-2 font-semibold border-b border-b-light-3 py-2">
        Description
      </h3>
      <p className="text-light-1 text-sm py-2">
        {desc ? desc : "Hey Everyone!"}
      </p>
    </div>
  );
}
