import { useFormContext } from "react-hook-form";
import FormError from "../FormError";

export default function SingleSelect({
  id,
  containerClassName,
  optionClassName,
  optionList: options,
  validation,
  inputClassName,
  optionComponent: OptionComponent,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={containerClassName}>
      {options && options.length
        ? options.map((item, index) => {
            return (
              <div key={index} className={optionClassName}>
                <input
                  className={inputClassName}
                  type="radio"
                  value={item.value}
                  {...register(id, validation)}
                ></input>
                <OptionComponent {...item.label}></OptionComponent>
              </div>
            );
          })
        : null}
      {errors && errors[id] ? (
        <FormError
          message={errors[id].message}
          className={`text-xs italic text-error`}
        ></FormError>
      ) : null}
    </div>
  );
}
