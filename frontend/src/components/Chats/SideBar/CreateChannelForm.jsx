import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { authAPI } from "../../../api/authAPI";
import { chatAPI } from "../../../api/chatAPI";
import userLogo from "../../../assets/profile-user_64572.png";
import { ERROR, SUCCESS, WARNING } from "../../../constants/constants";
import {
  populateChat,
  setCurrentChat,
} from "../../../store/Features/Chat/ChatSlice";
import Button from "../../Form/Button";
import Form from "../../Form/Form";
import { useToast } from "../../Hooks/useToast";
import UserCard from "./UserCard";

export default function CreateChannelForm({ toggleModal, toggleSideBar }) {
  const { notify } = useToast();
  const dispatch = useDispatch();

  const createGroupChat = (data) =>
    chatAPI
      .createGroupChat(data)
      .then((res) => {
        dispatch(populateChat(res));
        toggleModal();
        dispatch(setCurrentChat(res));
        toggleSideBar();
        notify("Channel created successfully!", SUCCESS);
      })
      .catch(() => notify("Failed to create channel!", ERROR));

  const handleSubmit = (channelData) => {
    if (
      channelData &&
      channelData.userList &&
      channelData.userList.length <= 2
    ) {
      notify("Please select 2 or more members", WARNING);
      return;
    }
    const users = channelData.userList.map((item) => item.value);
    const data = {
      name: channelData.channelName,
      users: JSON.stringify(users),
      description: channelData.channelDescription,
    };
    createGroupChat(data);
  };

  const searchUser = (query, setOptions) => {
    authAPI
      .searchUser(query)
      .then((res) => {
        setOptions(
          res && res.length
            ? res.map((item) => ({
                value: item._id,
                label: JSON.stringify(item),
              }))
            : []
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="w-full sm:w-[90%] h-96 border border-light-3 px-8 py-4 bg-dark-2 rounded-lg overflow-y-scroll scrollbar">
      <ChannelHeader toggleModal={toggleModal}></ChannelHeader>
      <Form
        fields={channelFormFields(searchUser)}
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
    <div className="w-full mb-4 flex flex-row justify-between items-center rounded-md">
      <h3 className="text-2xl font-semibold text-white">New Channel</h3>
      <Button
        type="icon"
        className="text-error text-2xl"
        handleClick={toggleModal}
      >
        <AiFillCloseCircle></AiFillCloseCircle>
      </Button>
    </div>
  );
}

const channelFormFields = (searchUser) => {
  return [
    {
      type: "text",
      label: "",
      name: "channelName",
      id: "channelName",
      defaultValue: "",
      containerClassName: "mb-4 rounded-md",
      className: "my-2 rounded-md bg-light-3",
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
      className: "my-2 rounded-md bg-light-3",
      inputClassName:
        "p-2 w-full rounded-md outline-none bg-light-3 text-light-1",
      placeholder: "Describe your channel here",
    },
    {
      type: "multiSelect",
      name: "usersList",
      id: "userList",
      placeholder: "Search Users..",
      className: "my-4",
      inputClassName: "!text-light-1 hover:!cursor-text",
      menuClassName: "!bg-light-3 !rounded-md",
      menuListClassName: "!bg-light-3 !scrollbar !rounded-md",
      valueContainerClassName:
        "!bg-light-3 !border-0 !shadow-none !rounded-tl-md !rounded-bl-md",
      containerClassName:
        "!border-0 bg-light-3 py-1 !outline-none !shadow-none !rounded-md",
      controlClassName:
        "!border-0 !bg-light-3 !outline-none !shadow-none !rounded-md",
      dropdownIndicatorClassName:
        "bg-light-3 hover:!cursor-pointer !text-light-2 hover:!text-light-1 !rounded-tr-md !rounded-br-md",
      singleValueClassName: "bg-light-1",
      multiValueContainerClassName:
        "border !bg-dark-1 !rounded-md !flex !flex-wrap",
      multiValueRemoveClassName:
        "bg-dark-1 !rounded-none !rounded-tr-sm !rounded-br-sm text-light-2 hover:!bg-dark-1 hover:!text-light-1",
      indicatorsContainerClassName:
        "!border-none !outline-none !shadow-none !rounded-tr-md !rounded-tr-md",
      clearIndicatorClassName:
        "bg-light-3 hover:!cursor-pointer !text-light-2 hover:!text-light-1",
      indicatorSeparatorClassName: "!bg-light-3",
      validation: {
        required: {
          value: true,
          message: "No user selected",
        },
      },
      handleSearch: searchUser,
      optionComponent: OptionComponent,
      multiValueLabel: MultiValueLabel,
    },
  ];
};

function OptionComponent(props) {
  const { label, innerProps, innerRef } = props;
  const optionData = JSON.parse(label);
  return (
    <div
      className="flex flex-row items-center justify-between gap-4 py-2 px-4 bg-dark-1 hover:bg-light-3 hover:cursor-pointer"
      ref={innerRef}
      {...innerProps}
    >
      <UserCard
        imgSrc={userLogo}
        imgConfig="s"
        className="text-light-1"
        name={optionData.name}
      ></UserCard>
    </div>
  );
}

function MultiValueLabel(props) {
  const { innerProps, innerRef } = props;
  const labelData = JSON.parse(props.data.label);

  return (
    <div
      {...innerProps}
      ref={innerRef}
      className="bg-dark-1 text-light-1 rounded-tl-sm rounded-bl-md"
    >
      <UserCard
        {...labelData}
        imgSrc={userLogo}
        imgConfig="xs"
        className="text-light-1 py-1 bg-dark-1 px-2 rounded-tl-sm rounded-bl-sm"
      ></UserCard>
    </div>
  );
}
