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
}) {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  // const handleChange = (e) => onChange(e);/

  const buildClassName = (instanceClassName) => {
    let defaultClassName = `w-full flex items-center outline-none`;

    let errorClassName = ``;
    if (errors && errors[id]) {
      errorClassName = `border border-warning`;
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
            />
          </div>
          {errors && errors[id] ? (
            <FormError
              message={errors[id].message}
              className={`text-xs italic text-warning`}
            ></FormError>
          ) : null}
        </div>
      )}
    />
  );
}
