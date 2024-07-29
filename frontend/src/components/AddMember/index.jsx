import { Button, Spinner, Typography } from "@material-tailwind/react";
import cx from "classnames";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { BUTTON_VARIANT, TYPOGRAPHY_VARIANT } from "../../constants/variants";
import { addChatMember } from "../../store/Features/Chat/chatSlice";
import { useAddGroupMemberMutation } from "../../store/Services/chatAPI";
import Modal from "../Modal";
import UserSelect from "../UserSelect";
import { formFields } from "./formFields";
import classes from "./index.module.css";

const AddMember = ({ openAddMember, handleAddMember }) => {
  const [addGroupMember, { isSuccess, isLoading, isError }] =
    useAddGroupMemberMutation();
  const currentChat = useSelector((state) => state.chat.currentChat);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onchange" });

  const handleSuccess = async (formData) => {
    dispatch(
      addChatMember({ user: formData?.user?.label, chatId: currentChat?._id })
    );
    reset();
  };

  const handleFormSubmit = (formData) => {
    addGroupMember({
      chatId: currentChat?._id,
      userId: formData?.user?.value,
    }).then(() => handleSuccess(formData));
  };

  const Header = () => (
    <>
      <Typography variant={TYPOGRAPHY_VARIANT.H5}>Select Member</Typography>
      <Button
        variant={BUTTON_VARIANT.TEXT}
        onClick={handleAddMember}
        className={classes.closeBtn}
      >
        <AiOutlineClose />
      </Button>
    </>
  );

  const Body = () => (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <UserSelect
        isMulti={false}
        name={formFields.USER}
        control={control}
        disabledOptions={
          currentChat?.users?.length
            ? currentChat?.users?.map((member) => member._id)
            : null
        }
        validationRules={{
          required: "Please Select a member",
        }}
      />
      {errors && errors[formFields.USER] && (
        <Typography
          variant={TYPOGRAPHY_VARIANT.SMALL}
          className={classes.error}
        >
          {errors[formFields.USER].message}
        </Typography>
      )}

      <Button
        variant={BUTTON_VARIANT.TEXT}
        type="submit"
        className={classes.submitBtn}
        disabled={!isValid}
        fullWidth
      >
        <span>Add</span>
        {isLoading ? <Spinner className={classes.spinner} /> : null}
      </Button>
    </form>
  );

  const Footer = () => (
    <Typography
      variant={TYPOGRAPHY_VARIANT.SMALL}
      className={cx(
        { [classes.error]: isError },
        { [classes.success]: isSuccess }
      )}
    >
      {isSuccess
        ? "Group Member added!"
        : isError
        ? "Failed to add Grouo Member"
        : ""}
    </Typography>
  );

  return (
    <Modal
      open={openAddMember}
      handler={handleAddMember}
      classNames={{
        container: classes.addMemberContainer,
        header: classes.addMemberHeader,
        body: classes.addMemberBody,
        footer: classes.addGMemberFooter,
      }}
      header={<Header />}
      body={<Body />}
      footer={<Footer />}
    />
  );
};

export default AddMember;
