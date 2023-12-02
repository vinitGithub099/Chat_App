import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import FormError from "../FormError";

export default function SelectComponent({
  id,
  type,
  label,
  placeholder,
  validation,
  handleSearch,
  optionComponent: Option,
  multiValueLabel: MultiValueLabel,
  singleValue: SingleValue,
  className,
  inputClassName,
  menuClassName,
  menuListClassName,
  valueContainerClassName,
  containerClassName,
  controlClassName,
  dropdownIndicatorClassName,
  singleValueClassName,
  multiValueContainerClassName,
  multiValueRemoveClassName,
  indicatorsContainerClassName,
  clearIndicatorClassName,
  indicatorSeparatorClassName,
  isClearable,
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [options, setOptions] = useState();
  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <Controller
        name={id}
        control={control}
        rules={validation}
        defaultValue=""
        render={({ field }) => (
          <Select
            {...field}
            isClearable={isClearable}
            options={options}
            isSearchable
            placeholder={placeholder}
            isMulti={type === "multiSelect"}
            onInputChange={(searchQuery) =>
              handleSearch(searchQuery, setOptions)
            }
            components={{
              Option: Option,
              MultiValueLabel: MultiValueLabel,
              SingleValue: SingleValue,
            }}
            classNames={{
              input: () => inputClassName,
              menu: () => menuClassName,
              menuList: () => menuListClassName,
              valueContainer: () => valueContainerClassName,
              container: () => containerClassName,
              control: () => controlClassName,
              dropdownIndicator: () => dropdownIndicatorClassName,
              singleValue: () => singleValueClassName,
              multiValueContainer: () => multiValueContainerClassName,
              multiValueRemove: () => multiValueRemoveClassName,
              indicatorsContainer: () => indicatorsContainerClassName,
              clearIndicator: () => clearIndicatorClassName,
              indicatorSeparator: () => indicatorSeparatorClassName,
            }}
          />
        )}
      />
      {errors && errors[id] ? (
        <FormError
          message={errors[id].message}
          className={`text-xs italic text-error`}
        ></FormError>
      ) : null}
    </div>
  );
}
