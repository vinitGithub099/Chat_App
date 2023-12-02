import Modal from "../../Modal";
import CreateChannelForm from "./CreateChannelForm";

export default function ChannelForm({ showModal, toggleModal, toggleSideBar }) {
  return (
    <Modal
      showModal={showModal}
      toggleModal={toggleModal}
      modalComponent={
        <CreateChannelForm
          toggleModal={toggleModal}
          toggleSideBar={toggleSideBar}
        ></CreateChannelForm>
      }
    ></Modal>
  );
}
