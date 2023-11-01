import { useFormContext } from "react-hook-form";
import _ from "underscore";
import FormError from "../FormError";

export default function MultiLineInput({
  type,
  label,
  name,
  id,
  rows,
  cols,
  defaultValue,
  containerClassName,
  className,
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

    return `${defaultClassName} ${className} ${instanceClassName} ${errorClassName}`;
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
        <textarea
          type={type}
          id={name}
          name={name}
          defaultValue={defaultValue || ""}
          placeholder={placeholder ? placeholder : ""}
          className={inputClassName}
          {...register(name, validation)}
          rows={rows}
          cols={cols}
        />
      </div>
      {errors && errors[id] ? (
        <FormError
          message={errors[id].message}
          className={`text-xs italic text-red-500`}
        ></FormError>
      ) : null}
    </div>
  );
}
