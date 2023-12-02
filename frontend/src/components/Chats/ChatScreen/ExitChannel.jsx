import Button from "../../Form/Button";

export default function ExitChannel({ handleChannelExtras }) {
  const exitChannel = () => {
    console.log("exit channel executed");
    handleChannelExtras(null);
  };

  return (
    <div className="mx-auto p-4 rounded-md">
      <p className="mb-2 text-light-1 font-semibold">
        Are you sure to exit channel ?
      </p>
      <Button
        type="button"
        className="px-4 py-1 bg-btn rounded-md text-light-1 font-semibold"
        handleClick={exitChannel}
      >
        Yes
      </Button>
    </div>
  );
}
