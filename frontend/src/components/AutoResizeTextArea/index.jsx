import { useEffect, useRef } from "react";
import { Controller } from "react-hook-form";
import classes from "./index.module.css";

const AutoResizeTextArea = ({
  name,
  placeholder,
  className,
  rows,
  cols,
  value,
  onChange,
  control,
}) => {
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    if (onChange) onChange(e);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to shrink if needed
      textarea.style.height = "auto";
      // Set height to match content
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  useEffect(() => {
    // Adjust height on initial render and when messageState changes
    adjustTextareaHeight();
  }, [value]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <textarea
          {...field}
          ref={textareaRef}
          cols={cols}
          rows={rows}
          value={value || field.value}
          placeholder={placeholder || "Type your text here.."}
          className={className || classes.textarea}
          spellCheck={true}
          onInput={handleChange}
        />
      )}
    />
  );
};

export default AutoResizeTextArea;
