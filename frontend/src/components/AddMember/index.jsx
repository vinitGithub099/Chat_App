import { Button, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addChatMember } from "../../store/Features/Chat/chatSlice";
import { useAddGroupMemberMutation } from "../../store/Services/chatAPI";
import Modal from "../Modal";
import UserSelect from "../UserSelect";
import classes from "./index.module.css";

const AddMember = ({ openAddMember, handleAddMember }) => {
  const [addGroupMember] = useAddGroupMemberMutation();
  const currentChat = useSelector((state) => state.chat.currentChat);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const addMember = async (formData) => {
    try {
      await addGroupMember({
        chatId: currentChat?._id,
        userId: formData?.value,
      });
      dispatch(
        addChatMember({ chatId: currentChat?._id, user: formData?.user?.label })
      );
      handleAddMember();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (formData) => {
    console.log(formData);
    addMember(formData);
  };

  const header = (
    <>
      <Typography variant="h5">Select Member</Typography>
      <Button
        variant="text"
        onClick={handleAddMember}
        className={classes.closeBtn}
      >
        <AiOutlineClose />
      </Button>
    </>
  );

  const disabledOptions = currentChat?.users?.map((member) => member._id);

  const body = (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <UserSelect
        isMulti={false}
        name={"user"}
        control={control}
        disabledOptions={disabledOptions}
      />
      {errors && errors["user"] && (
        <Typography variant="small" className={classes.error}>
          {errors["user"].message}
        </Typography>
      )}
      <Button type="submit" className={classes.submitBtn} fullWidth>
        Add
      </Button>
    </form>
  );

  return (
    <Modal
      open={openAddMember}
      handler={handleAddMember}
      classNames={{
        container: classes.addMemberContainer,
        header: classes.addMemberHeader,
        body: classes.addMemberBody,
        footer: classes.addMemberFooter,
      }}
      header={header}
      body={body}
      footer={null}
    />
  );
};

export default AddMember;
