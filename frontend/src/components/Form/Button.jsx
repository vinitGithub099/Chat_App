import _ from "underscore";

export default function Button({
  type,
  label,
  handleClick,
  className,
  children,
  ...rest
}) {
  const buttonProps = { handleClick, label, className, children, ...rest };
  switch (type) {
    case "submit":
      return <SubmitButton {...buttonProps}></SubmitButton>;
    case "navigate":
      return <NavButton {...buttonProps}></NavButton>;
    case "icon":
      return <IconButton {...buttonProps}></IconButton>;
    default:
      return <button {...buttonProps}>{children}</button>;
  }
}

const SubmitButton = ({ label, handleClick, className, children, ...rest }) => {
  return (
    <button type="submit" className={className} onClick={handleClick} {...rest}>
      {!_.isEmpty(children) ? children : label}
    </button>
  );
};

const NavButton = ({ label, handleClick, className, children, ...rest }) => {
  return (
    <button
      type="button"
      className={`px-4 py-2 font-semibold rounded-sm text-md ${className} transition-all duration-200`}
      onClick={handleClick}
      {...rest}
    >
      {_.isEmpty(label) ? children : label}
    </button>
  );
};

const IconButton = ({ handleClick, className, children, ...rest }) => {
  return (
    <button
      type="button"
      className={`${className} transition-all duration-200`}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
};
