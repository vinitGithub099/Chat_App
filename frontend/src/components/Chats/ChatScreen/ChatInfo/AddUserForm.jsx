import { useDispatch, useSelector } from "react-redux";
import { authAPI } from "../../../../api/authAPI";
import { chatAPI } from "../../../../api/chatAPI";
import userLogo from "../../../../assets/profile-user_64572.png";
import { ERROR, INFO, SUCCESS } from "../../../../constants/constants";
import { addChatMember } from "../../../../store/Features/Chat/ChatSlice";
import { handelTokenExpiration } from "../../../../utils/Utils";
import Form from "../../../Form/Form";
import { useToast } from "../../../Hooks/useToast";
import UserCard from "../../SideBar/UserCard";

export default function AddUserForm() {
  const currentChat = useSelector((state) => state.chat.currentChat);
  const { notify } = useToast();
  const dispatch = useDispatch();

  const addMemberToChannel = (data, methods) =>
    chatAPI
      .addToGroup(data)
      .then((res) => {
        dispatch(addChatMember(res.users));
        notify("User added successfully", SUCCESS);
        methods.reset();
      })
      .catch((error) => {
        handelTokenExpiration(error, dispatch);
        notify("failed to add user!", ERROR);
      });

  const handleSubmit = (formData, methods) => {
    const userId = formData.user.value;
    if (currentChat.users.find((user) => user._id === userId)) {
      notify("Member already exits!", INFO);
      return;
    }
    const data = { chatId: currentChat._id, userId: userId };
    addMemberToChannel(data, methods);
  };

  const searchUser = (searchTerm, setOptions) => {
    if (!searchTerm) {
      setOptions([]);
      return;
    }
    authAPI
      .searchUser(searchTerm)
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
      .catch((error) => handelTokenExpiration(error, dispatch));
  };

  return (
    <Form
      fields={formFields(searchUser)}
      className="px-4 w-full rounded-md"
      buttonConfigs={{
        type: "submit",
        label: "Add User",
        className: "px-4 py-2 rounded-md bg-btn text-light-1",
      }}
      handleSubmit={handleSubmit}
    ></Form>
  );
}

const formFields = (searchUser) => {
  return [
    {
      type: "singleSelect",
      name: "user",
      id: "user",
      className: "my-4",
      placeholder: "Search User...",
      inputClassName:
        "border-0 bg !bg-opacity-40 !text-light-1 hover:!cursor-text",
      menuClassName: "!bg-light-3 !rounded-md",
      menuListClassName: "!bg-light-3 !scrollbar !rounded-md",
      valueContainerClassName:
        "!bg-light-3 !border-0 !shadow-none !rounded-tl-md !rounded-bl-md",
      containerClassName:
        "!border-0 my-2bg-light-3 py-1 !outline-none !shadow-none !rounded-md",
      controlClassName:
        "!border-0 !bg-light-3 !outline-none !shadow-none !rounded-md",
      dropdownIndicatorClassName:
        "bg-light-3 hover:!cursor-pointer !text-light-2 hover:!text-light-1 !rounded-tr-md !rounded-br-md",
      indicatorsContainerClassName:
        "!border-0 !outline-none !shadow-none !rounded-tr-md !rounded-tr-md !self-start",
      clearIndicatorClassName:
        "!border-0 bg-light-3 hover:!cursor-pointer !text-light-2 hover:!text-light-1",
      validation: {
        required: {
          value: true,
          message: "No user selected",
        },
      },
      isClearable: true,
      handleSearch: searchUser,
      optionComponent: OptionComponent,
      singleValue: SingleValue,
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

function SingleValue(props) {
  const { innerProps, innerRef } = props;
  const labelData = JSON.parse(props.data.label);

  return (
    <div
      {...innerProps}
      ref={innerRef}
      className="border border-light-2 !rounded-md my-2 text-light-1"
    >
      <UserCard
        {...labelData}
        imgSrc={userLogo}
        imgConfig="s"
        className="text-light-1 py-2 bg-dark-1 px-4 rounded-md "
      ></UserCard>
    </div>
  );
}
