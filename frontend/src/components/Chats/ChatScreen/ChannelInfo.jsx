import { AiOutlineClose } from "react-icons/ai";

export default function ChannelInfo({ handleChannelExtras }) {
  return (
    <div className="w-full sm:w-1/2 h-screen bg-dark-3 fixed right-0 flex flex-col">
      <div className="p-4 text-light-1 flex flex-row justify-between border-b-2 border-light-3">
        <h3 className="text-xl text-center flex-1">Channel Info</h3>
        <div
          className="bg-light-3 bg-opacity-60 p-2 rounded-full cursor-pointer"
          onClick={() => handleChannelExtras(null)}
        >
          <AiOutlineClose size={20}></AiOutlineClose>
        </div>
      </div>
      <div className="flex-1"></div>
    </div>
  );
}
