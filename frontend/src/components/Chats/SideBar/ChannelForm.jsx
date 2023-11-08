import { AiFillCloseCircle } from "react-icons/ai";
import Button from "../../Form/Button";
import Form from "../../Form/Form";
import Modal from "../../Modal";

export default function ChannelForm({ showModal, toggleModal }) {
  return (
    <Modal
      showModal={showModal}
      toggleModal={toggleModal}
      className="w-auto z-60"
      modalComponent={
        <CreateChannelForm toggleModal={toggleModal}></CreateChannelForm>
      }
    ></Modal>
  );
}

function CreateChannelForm({ toggleModal }) {
  const handleSubmit = (channelData) => {
    console.log(channelData);
    // const data = {
    //   name: channelData.channelName,
    //   users: [],
    //   description: channelData.description,
    // };
  };
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
        handleSubmit={handleSubmit}
      ></Form>
    </div>
  );
}

function ChannelHeader({ toggleModal }) {
  return (
    <div className="w-full mb-6 flex flex-row justify-between items-center rounded-md">
      <h3 className="text-2xl font-semibold text-white">New Channel</h3>
      <Button type="icon" className="text-error text-2xl" onClick={toggleModal}>
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
  },
  {
    type: "checkbox",
    name: "usersList",
    label: "Select Users",
    className: "p-2 my-2 rounded-md bg-dark-1",
    showCheckedItems: true,
    checkedItemsClassName: "w-full p-2",
    labelClassName: "",
    optionsList: generateFakeUsers(),
  },
];

function generateFakeUsers() {
  let arr = [];
  for (let i = 0; i < 10; i++) {
    arr = [
      ...arr,
      {
        id: i,
        label: `user${i}`,
        inputClassName:
          "p-2 w-full rounded-md outline-none bg-light-3 text-light-1",
        // checked: false,
        defaultChecked: false,
      },
    ];
  }
  return arr;
}

/* 

{
    "_id": "64e899c03ac98a5b778af11a",
    "name": "Vansh",
    "email": "vansh@gmail.com",
    "phone": "995052986",
    "bio": "Hello world",
    "pic": "",
    "isAdmin": false,
    "createdAt": "2023-08-25T12:08:32.631Z",
    "updatedAt": "2023-08-25T12:08:32.631Z",
    "__v": 0
}

*/
