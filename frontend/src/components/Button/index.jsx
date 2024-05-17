const Button = ({ className, children, type, handleClick, ...rest }) => {
  return (
    <button className={className} type={type} onClick={handleClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
