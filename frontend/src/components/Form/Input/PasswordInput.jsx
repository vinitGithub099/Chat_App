import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { BiHide, BiShow } from "react-icons/bi";
import _ from "underscore";
import Button from "../Button";
import FormError from "../FormError";

export default function PasswordInput({
  type,
  label,
  name,
  id,
  defaultValue,
  className,
  containerClassName,
  inputClassName,
  placeholder,
  validation,
  icon,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [passwordType, setPasswordType] = useState(type || "password");

  const buildClassName = (instanceClassName) => {
    let defaultClassName = `w-full flex items-center outline-none`;

    let errorClassName = ``;
    if (errors && errors[id]) {
      errorClassName = `border border-red-500`;
    }

    return `${defaultClassName} ${className} ${instanceClassName} ${errorClassName}`;
  };

  const togglePasswordVisibility = () => {
    setPasswordType((prev) => (prev == "text" ? "password" : "text"));
  };

  const handlePlaceholder = (placeholder) => {
    let content = "";
    if (_.isEmpty(placeholder)) placeholder = "password";
    if (passwordType == "text") content = placeholder;
    else content = "********";

    return content;
  };

  return (
    <div className={`w-full ${containerClassName}`}>
      {!_.isEmpty(label) ? <label htmlFor={name}>{label}</label> : null}
      <div className={buildClassName(``)}>
        {!_.isEmpty(icon) ? (
          <div className={icon.className}>
            <icon.icon size={icon.size}></icon.icon>
          </div>
        ) : null}
        <input
          type={passwordType}
          id={name}
          name={name}
          defaultValue={defaultValue || ""}
          placeholder={handlePlaceholder(placeholder)}
          className={inputClassName}
          {...register(name, validation)}
        />
        <Button type="icon" handleClick={togglePasswordVisibility} className="">
          {passwordType == "text" ? <BiShow></BiShow> : <BiHide></BiHide>}
        </Button>
      </div>
      {errors && errors[id] ? (
        <FormError
          message={errors[id].message}
          className={`text-xs italic text-error`}
        ></FormError>
      ) : null}
    </div>
  );
}
