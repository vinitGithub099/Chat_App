import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

const Modal = ({
  open,
  size,
  handler,
  header,
  body,
  footer,
  classNames,
  children,
}) => {
  return (
    <Dialog
      open={open}
      size={size}
      handler={handler}
      className={classNames?.container}
    >
      {header && (
        <DialogHeader className={classNames?.header}>{header}</DialogHeader>
      )}
      {body && <DialogBody className={classNames?.body}>{body}</DialogBody>}
      {footer && (
        <DialogFooter className={classNames?.footer}>{footer}</DialogFooter>
      )}
      {children}
    </Dialog>
  );
};

export default Modal;
