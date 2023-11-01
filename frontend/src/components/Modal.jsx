export default function Modal({
  className,
  showModal,
  toggleModal,
  modalComponent,
}) {
  const handleCloseOutSide = (e) =>
    e.target.id == "modal" ? toggleModal() : null;
  return showModal ? (
    <>
      <div
        className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        onClick={handleCloseOutSide}
        id="modal"
      >
        <div
          className={`relative my-6 mx-auto max-w-3xl rounded-md ${className}`}
        >
          {modalComponent}
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-dark-3"></div>
    </>
  ) : null;
}
