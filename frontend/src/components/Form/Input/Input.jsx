import _ from "underscore";
import { Checkbox } from "./CheckBox";
import EmailInput from "./EmailInput";
import MultiLineInput from "./MultiLineInput";
import PasswordInput from "./PasswordInput";
import PhoneNumberInput from "./PhoneNumberInput";
import TextInput from "./TextInput";
export default function Input({ field }) {
  switch (field.type) {
    case "email":
      return <EmailInput {...field}></EmailInput>;
    case "text":
      return <TextInput {...field}></TextInput>;
    case "textarea":
      return <MultiLineInput {...field}></MultiLineInput>;
    case "tel":
      return <PhoneNumberInput {...field}></PhoneNumberInput>;
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
