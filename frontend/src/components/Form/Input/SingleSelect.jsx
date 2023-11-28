import { useFormContext } from "react-hook-form";
import FormError from "../FormError";

export default function SingleSelect({
  id,
  className,
  containerClassName,
  labelClassName,
  optionList: options,
  validation,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={containerClassName}>
      <select
        className={className}
        selected={null}
        {...register(id, validation)}
      >
        <option disabled>Select</option>
        {options && options.length
          ? options.map((item, index) => {
              return (
                <option
                  key={index}
                  value={JSON.stringify(item)}
                  className={labelClassName}
                >
                  {item.label ? item.label : "hello"}
                </option>
              );
            })
          : null}
      </select>
      {errors && errors[id] ? (
        <FormError
          message={errors[id].message}
          className={`text-xs italic text-error`}
        ></FormError>
      ) : null}
    </div>
  );
}
