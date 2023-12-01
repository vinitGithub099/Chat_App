import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import FormError from "../FormError";

export default function MultiSelect({
  id,
  label,
  validation,
  handleSearch,
  optionComponent: Option,
  multiValueLabel: MultiValueLabel,
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
            options={options}
            isSearchable
            isMulti
            onInputChange={(searchQuery) => {
              if (searchQuery) handleSearch(searchQuery, setOptions);
            }}
            components={{
              Option: Option,
              MultiValueLabel: MultiValueLabel,
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
