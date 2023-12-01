import Modal from "../../Modal";
import CreateChannelForm from "./CreateChannelForm";

export default function ChannelForm({ showModal, toggleModal }) {
  return (
    <Modal
      showModal={showModal}
      toggleModal={toggleModal}
      className="z-60"
      modalComponent={
        <CreateChannelForm toggleModal={toggleModal}></CreateChannelForm>
      }
    ></Modal>
  );
}
