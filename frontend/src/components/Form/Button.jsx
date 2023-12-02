import _ from "underscore";

export default function Button({
  type,
  label,
  handleClick,
  className,
  children,
  disabled,
  ...rest
}) {
  const buttonProps = {
    disabled,
    handleClick,
    label,
    className,
    children,
    ...rest,
  };
  switch (type) {
    case "submit":
      return <SubmitButton {...buttonProps}></SubmitButton>;
    case "navigate":
      return <NavButton {...buttonProps}></NavButton>;
    case "icon":
      return <IconButton {...buttonProps}></IconButton>;
    default:
      return (
        <button className={className} onClick={handleClick} disabled={disabled}>
          {children}
        </button>
      );
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
    <button type="button" className={className} onClick={handleClick} {...rest}>
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
