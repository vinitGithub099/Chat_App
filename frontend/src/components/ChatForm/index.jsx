import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { MENU_ITEMS } from "../../constants/sideMenu";
import {
  insertChat,
  updateCurrentChat,
} from "../../store/Features/Chat/chatSlice";
import { setActitvityLabel } from "../../store/Features/UI/uiSlice";
import { useCreateGroupChatMutation } from "../../store/Services/chatAPI";
import Modal from "../Modal";
import UserSelect from "../UserSelect";
import classes from "./index.module.css";

const ChatForm = ({ isChatFormOpen, toggleChatForm }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [createGroup] = useCreateGroupChatMutation();
  const dispatch = useDispatch();

  const buildGroupChat = (formData) => ({
    ...formData,
    users: JSON.stringify(formData.users.map((option) => option.value)),
  });

  const handleFormSubmit = async (formData) => {
    const groupChat = buildGroupChat(formData);
    try {
      const res = await createGroup(groupChat);
      dispatch(insertChat(res?.data));
      dispatch(updateCurrentChat(res?.data));
      dispatch(setActitvityLabel(MENU_ITEMS.CHATS.label));
      toggleChatForm();
    } catch (error) {
      console.error(error);
    }
  };

  const Header = () => (
    <>
      <Typography variant="h5">Create Group</Typography>
      <Button
        variant="text"
        onClick={toggleChatForm}
        className={classes.closeBtn}
      >
        <AiOutlineClose />
      </Button>
    </>
  );

  const Body = () => (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={classes.formField}>
        <Input
          type="text"
          variant="outlined"
          label="Channel Name"
          placeholder="Channel Name"
          className={classes.input}
          labelProps={{ className: classes.labelProps }}
          containerProps={{
            className: classes.containerProps,
          }}
          {...register("name", {
            required: {
              value: true,
              message: "Please enter the Group Name!",
            },
          })}
        />
        {errors && errors["name"] && (
          <Typography variant="small" className={classes.error}>
            {errors["name"].message}
          </Typography>
        )}
      </div>
      <Textarea
        rows={2}
        placeholder="Enter channel description here..."
        className={classes.input}
        containerProps={{
          className: classes.containerProps,
        }}
        labelProps={{
          className: classes.labelProps,
        }}
        spellCheck={true}
        {...register("description")}
      />
      <div className={classes.formField}>
        <UserSelect isMulti={true} name={"users"} control={control} />
        {errors && errors["users"] && (
          <Typography variant="small" className={classes.error}>
            {errors["users"].message}
          </Typography>
        )}
      </div>
      <Button type="submit" className={classes.submitBtn} fullWidth>
        SUBMIT
      </Button>
    </form>
  );

  return (
    <Modal
      open={isChatFormOpen}
      size={"sm"}
      classNames={{
        container: classes.chatFormDialog,
        header: classes.chatFormHeader,
        body: classes.chatFormBody,
        footer: classes,
      }}
      handler={toggleChatForm}
      header={<Header />}
      body={<Body />}
    />
  );
};

export default ChatForm;
