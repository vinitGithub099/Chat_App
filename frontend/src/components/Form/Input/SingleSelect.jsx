import { useFormContext } from "react-hook-form";
import FormError from "../FormError";

export default function SingleSelect({
  id,
  className,
  containerClassName,
  labelClassName,
  optionList: options,
  validation,
  optionComponent: OptionComponent,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={containerClassName}>
      {options && options.length ? (
        <select
          className={className}
          selected={null}
          {...register(id, validation)}
        >
          <option disabled>Select</option>
          {options.map((item, index) => {
            return (
              <option key={index} value={item.value} className={labelClassName}>
                {/* {OptionComponent ? ( */}
                <OptionComponent {...item.label}></OptionComponent>
                {/* ) : item.label ? ( */}
                {/* item.label */}
                {/* ) : null} */}
              </option>
            );
          })}
        </select>
      ) : null}
      {errors && errors[id] ? (
        <FormError
          message={errors[id].message}
          className={`text-xs italic text-error`}
        ></FormError>
      ) : null}
    </div>
  );
}
