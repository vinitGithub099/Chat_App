import _ from "underscore";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import TextInput from "./TextInput";
export default function Input({ field }) {
  switch (field.type) {
    case "email":
      return <EmailInput {...field}></EmailInput>;
    case "text":
      return <TextInput {...field}></TextInput>;
    case "select":
      return <SelectInput {...field}></SelectInput>;
    case "password":
      return <PasswordInput {...field}></PasswordInput>;
    case "checkbox":
      return <Checkbox {...field}></Checkbox>;
    default:
      return null;
  }
}

const SelectInput = ({
  label,
  name,
  defaultValue,
  onChange,
  options,
  className,
  required,
}) => (
  <div>
    {_.isEmpty(label) ? <label htmlFor={name}>{label}</label> : null}
    <select
      id={name}
      name={name}
      defaultValue={defaultValue || ""}
      onChange={onChange}
      className={`w-full border p-2 my-2 outline-none ${className}`}
      required={required}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const Checkbox = ({
  type,
  label,
  name,
  onChange,
  className,
  checked,
  defaultChecked,
  checkboxClassName,
  labelClassName,
}) => {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <input
        type={type}
        id={name}
        name={name}
        value={label}
        className={`form-checkbox h-4 w-4 text-indigo-600 ${checkboxClassName}`}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
      <p className={`ml-2 text-sm ${labelClassName}`}>{label}</p>
    </div>
  );
};
