import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ListComponent from "../../ListComponent";
import FormError from "../FormError";

export const Checkbox = ({
  type,
  id,
  className,
  label,
  showCheckedItems,
  checkedItemsClassName,
  labelClassName,
  checkedItemClassName,
  checkboxClassName,
  containerClassName,
  labelComponent,
  optionsList,
  validation,
}) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const [checkedItems, setCheckedItems] = useState([]);

  const handleChange = (e) => {
    console.log(checkedItems);
    if (e.target.checked) {
      setCheckedItems((prev) => [
        ...prev,
        { name: e.target.value, id: e.target.id },
      ]);
    } else {
      setCheckedItems((prev) => prev.filter((item) => item.id != e.target.id));
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={labelClassName}>{label}</div>
      {showCheckedItems && checkedItems && checkedItems.length ? (
        <ListComponent
          list={checkedItems}
          className={`w-full ${checkedItemsClassName}`}
          subComponent={CheckedItem}
          checkedItemClassName={checkedItemClassName}
        ></ListComponent>
      ) : null}
      <Controller
        name={id}
        control={control}
        render={() => (
          <ListComponent
            list={optionsList}
            className="w-full flex flex-col"
            subComponent={ListInputItem}
            handleChange={handleChange}
            type={type}
            id={id}
            labelComponent={labelComponent}
            checkboxClassName={checkboxClassName}
            register={register}
            validation={validation}
            containerClassName={containerClassName}
          ></ListComponent>
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
};

function ListInputItem({
  type,
  id,
  defaultChecked,
  checkboxClassName,
  labelComponent: LabelComponent,
  register,
  handleChange,
  validation,
  index,
  containerClassName,
  ...rest
}) {
  return (
    <div className={`w-full mx-auto flex flex-row ${containerClassName}`}>
      <input
        type={type}
        value={rest.name}
        className={checkboxClassName}
        defaultChecked={defaultChecked}
        {...register(id, validation)}
        onChange={handleChange}
        id={rest._id ? rest._id : index}
      ></input>
      <label htmlFor={rest.name} className="flex-1">
        <LabelComponent {...rest}></LabelComponent>
      </label>
    </div>
  );
}

function CheckedItem({ name, id, checkedItemClassName }) {
  return (
    <div className={checkedItemClassName} id={id}>
      {name}
    </div>
  );
}
