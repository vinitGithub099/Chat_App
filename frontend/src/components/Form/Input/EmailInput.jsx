import { useFormContext } from "react-hook-form";
import _ from "underscore";
import FormError from "../FormError";

export default function EmailInput({
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

  const buildClassName = (instanceClassName) => {
    let defaultClassName = `w-full flex items-center outline-none`;

    let errorClassName = ``;
    if (errors && errors[id]) {
      errorClassName = `border border-red-500`;
    }

    return `${defaultClassName} ${instanceClassName} ${className} ${errorClassName} `;
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
        <div></div>
        <input
          type={type}
          id={name}
          name={name}
          defaultValue={defaultValue || ""}
          placeholder={placeholder ? placeholder : ""}
          className={inputClassName}
          {...register(name, validation)}
        />
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
