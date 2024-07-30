import {
  Button,
  Input,
  Spinner,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { FORM_FIELD } from "../../constants/formFields";
import { NOTIFICATION_STATUS } from "../../constants/notificationStatus";
import { MENU_ITEMS } from "../../constants/sideMenu";
import {
  BUTTON_VARIANT,
  INPUT_VARIANT,
  TYPOGRAPHY_VARIANT,
} from "../../constants/variants";
import useNotification from "../../hooks/useNotification";
import {
  insertChat,
  updateCurrentChat,
} from "../../store/Features/Chat/chatSlice";
import { setActitvityLabel } from "../../store/Features/UI/uiSlice";
import { useCreateGroupChatMutation } from "../../store/Services/chatAPI";
import Modal from "../Modal";
import UserSelect from "../UserSelect";
import { FIELD_NAME } from "./fieldNames";
import classes from "./index.module.css";

const ChatForm = ({ isChatFormOpen, toggleChatForm }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm();
  const [createGroup, { isLoading, isError }] = useCreateGroupChatMutation();
  const dispatch = useDispatch();
  const { notify } = useNotification();

  const buildGroupChat = (formData) => ({
    ...formData,
    users: JSON.stringify(formData.users.map((option) => option.value)),
  });

  const handleSucces = (res) => {
    dispatch(insertChat(res?.data));
    dispatch(updateCurrentChat(res?.data));
    dispatch(setActitvityLabel(MENU_ITEMS.CHATS.label));
    toggleChatForm();
    notify(
      { message: "Group created!", status: NOTIFICATION_STATUS.SUCCESS },
      { position: "top-right" }
    );
  };

  const handleFormSubmit = async (formData) => {
    const groupChat = buildGroupChat(formData);
    createGroup(groupChat).then(handleSucces);
  };

  const Header = () => (
    <>
      <Typography variant={TYPOGRAPHY_VARIANT.H5}>Create Group</Typography>
      <Button
        variant={BUTTON_VARIANT.TEXT}
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
          variant={INPUT_VARIANT.OUTLINED}
          type={FORM_FIELD.TEXT}
          placeholder="Channel Name"
          className={classes.input}
          labelProps={{ className: classes.labelProps }}
          containerProps={{
            className: classes.containerProps,
          }}
          {...register(FIELD_NAME.NAME, {
            required: {
              value: true,
              message: "Please enter the Group Name!",
            },
          })}
        />
        {errors?.[FIELD_NAME.NAME] && (
          <Typography
            variant={TYPOGRAPHY_VARIANT.SMALL}
            className={classes.error}
          >
            {errors[FIELD_NAME.NAME].message}
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
        {...register(FIELD_NAME.DESCRIPTION)}
      />
      <div className={classes.formField}>
        <UserSelect
          isMulti={true}
          name={FIELD_NAME.USERS}
          control={control}
          validationRules={{
            validate: (value) =>
              value?.length < 3
                ? "Select at least 3 users"
                : value?.length > 10 || "Only 10 member per group allowed",
          }}
        />
        {errors?.[FIELD_NAME.USERS] && (
          <Typography
            variant={TYPOGRAPHY_VARIANT.SMALL}
            className={classes.error}
          >
            {errors[FIELD_NAME.USERS].message}
          </Typography>
        )}
      </div>
      <Button
        variant={BUTTON_VARIANT.TEXT}
        type="submit"
        className={classes.submitBtn}
        disabled={!isValid}
        fullWidth
      >
        SUBMIT
      </Button>
    </form>
  );

  const Footer = () =>
    isError ? (
      <Typography
        variant={TYPOGRAPHY_VARIANT.SMALL}
        className={classes.errorMsg}
      >
        Failed to create group!
      </Typography>
    ) : null;

  return (
    <Modal
      open={isChatFormOpen}
      classNames={{
        container: classes.chatFormDialog,
        header: classes.chatFormHeader,
        body: classes.chatFormBody,
        footer: classes.chatFormFooter,
      }}
      handler={toggleChatForm}
      header={<Header />}
      body={<Body />}
      footer={<Footer />}
    >
      {isLoading ? (
        <div className={classes.overlay}>
          <Spinner />
        </div>
      ) : null}
    </Modal>
  );
};

export default ChatForm;
