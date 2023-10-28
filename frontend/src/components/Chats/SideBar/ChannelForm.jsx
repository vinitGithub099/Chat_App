import { AiFillCloseCircle } from "react-icons/ai";
import Button from "../../Form/Button";
import Form from "../../Form/Form";
import Modal from "../../Modal";

export default function ChannelForm({ showModal, toggleModal }) {
  return (
    <Modal
      showModal={showModal}
      toggleModal={toggleModal}
      className="w-auto"
      modalComponent={
        <CreateChannelForm toggleModal={toggleModal}></CreateChannelForm>
      }
    ></Modal>
  );
}

function CreateChannelForm({ toggleModal }) {
  return (
    <div className="w-full p-8 bg-dark-2 rounded-lg">
      <ChannelHeader toggleModal={toggleModal}></ChannelHeader>
      <Form
        fields={channelFormFields}
        className="w-full rounded-md"
        buttonConfigs={{
          type: "submit",
          label: "Save",
          className: "px-4 py-2 rounded-md bg-btn text-white",
        }}
        handleSubmit={(e) => console.log(e)}
      ></Form>
    </div>
  );
}

function ChannelHeader({ toggleModal }) {
  return (
    <div className="w-full mb-6 flex flex-row justify-between items-center rounded-md">
      <h3 className="text-2xl font-semibold text-white">New Channel</h3>
      <Button
        type="icon"
        className="text-warning text-2xl"
        onClick={toggleModal}
      >
        <AiFillCloseCircle></AiFillCloseCircle>
      </Button>
    </div>
  );
}

const channelFormFields = [
  {
    type: "text",
    label: "",
    name: "channelName",
    id: "channelName",
    defaultValue: "",
    containerClassName: "mb-4 rounded-md",
    className: "p-2 my-2 rounded-md bg-light-3",
    inputClassName:
      "p-2 w-full rounded-md outline-none bg-light-3 text-light-1",
    placeholder: "@channelName",
    validation: {
      required: { value: true, message: "Channel Name cannot be empty" },
    },
  },
  {
    type: "textarea",
    label: "",
    name: "channelDescription",
    id: "channelDescription",
    defaultValue: "",
    cols: 60,
    rows: 4,
    containerClassName: "mb-4 rounded-md",
    className: "p-2 my-2 rounded-md bg-light-3",
    inputClassName:
      "p-2 w-full rounded-md outline-none bg-light-3 text-light-1",
    placeholder: "Describe your channel here",
    validation: {
      required: { value: true, message: "Channel Description cannot be empty" },
    },
  },
];
