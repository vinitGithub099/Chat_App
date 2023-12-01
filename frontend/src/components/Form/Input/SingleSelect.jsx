import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { AiFillCheckCircle } from "react-icons/ai";
import FormError from "../FormError";

export default function SingleSelect({
  id,
  containerClassName,
  optionClassName,
  optionList,
  validation,
  inputClassName,
  optionComponent: OptionComponent,
  handleChange,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [selectedValue, setSelectedValue] = useState(null);

  const handleRadioChange = (item) => {
    setSelectedValue(item);
  };

  return (
    <>
      {selectedValue ? (
        <div className="flex flex-row items-center px-2">
          <span className="text-success">
            <AiFillCheckCircle size={25}></AiFillCheckCircle>
          </span>
          <OptionComponent {...selectedValue.label}></OptionComponent>
        </div>
      ) : null}
      <div className={containerClassName}>
        {optionList && optionList.length
          ? optionList.map((item, index) => {
              return (
                <div key={index} className={optionClassName}>
                  <input
                    className={inputClassName}
                    type="radio"
                    value={item.value}
                    defaultChecked={
                      selectedValue && selectedValue.value === item.value
                        ? true
                        : item.checked
                    }
                    {...register(id, validation)}
                    onChange={(e) =>
                      handleChange ? handleChange(e) : handleRadioChange(item)
                    }
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
    </>
  );
}
