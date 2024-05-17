import { useFormContext } from "react-hook-form";

const Input = ({
  type,
  name,
  defaultValue,
  placeholder,
  wrapperClassName,
  className,
  inpClassName,
  label,
  labelClassName,
  errorClassName,
  validation,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={wrapperClassName}>
      {/* wrapped input compoent */}
      <div className={className}>
        <label htmlFor={name} className={labelClassName}>
          {label}
        </label>
        <input
          id={name}
          type={type}
          name={name}
          defaultValue={defaultValue || ""}
          placeholder={placeholder || ""}
          className={inpClassName}
          {...register(name, validation)}
        />
      </div>
      {/* validation error message component */}
      {errors && errors[name] ? (
        <div className={errorClassName}>{errors[name].message}</div>
      ) : null}
    </div>
  );
};

export default Input;
