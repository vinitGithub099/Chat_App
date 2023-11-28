import { Controller, useFormContext } from "react-hook-form";
import _ from "underscore";
import FormError from "../FormError";

export default function TextInput({
  type,
  label,
  name,
  id,
  defaultValue,
  containerClassName,
  className,
  inputClassName,
  placeholder,
  validation,
  icon,
  onChange: handleChange,
  onFocus: handleFocus,
  onBlur: handleBlur,
}) {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const buildClassName = (instanceClassName) => {
    let defaultClassName = `w-full flex items-center outline-none`;

    let errorClassName = ``;
    if (errors && errors[id]) {
      errorClassName = `border border-error`;
    }

    return `${defaultClassName} ${className} ${instanceClassName} ${errorClassName}`;
  };
  return (
    <Controller
      control={control}
      id={name}
      name={name}
      render={({ field: { onChange } }) => (
        <div className={`w-full ${containerClassName}`}>
          {!_.isEmpty(label) ? <label htmlFor={name}>{label}</label> : null}
          <div className={buildClassName(``)}>
            {!_.isEmpty(icon) ? (
              <div className={icon.className}>
                <icon.icon size={icon.size}></icon.icon>
              </div>
            ) : null}
            <input
              type={type}
              defaultValue={defaultValue || ""}
              placeholder={placeholder ? placeholder : ""}
              className={inputClassName}
              {...register(name, validation)}
              onChange={(e) => {
                onChange(e);
                if (handleChange) handleChange(e);
              }}
              onFocus={handleFocus ? (e) => handleFocus(e) : null}
              onBlur={handleBlur ? (e) => handleBlur(e) : null}
            />
          </div>
          {errors && errors[id] ? (
            <FormError
              message={errors[id].message}
              className={`text-xs italic text-error`}
            ></FormError>
          ) : null}
        </div>
      )}
    />
  );
}
