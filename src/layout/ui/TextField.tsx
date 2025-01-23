import { FC, useState } from "react";
import classes from "./text-field.module.scss";

export type TextFieldProps = {
  text?: string;
  placeholder?: string;
  className?: string;
  onComplete: (text: string) => void;
};

export const TextField: FC<TextFieldProps> = ({ text, onComplete, placeholder, className }) => {
  const [value, setValue] = useState(text || "");

  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onComplete(value);
      setValue("");
    }
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  return (
    <input
      value={value}
      onKeyUp={onEnter}
      onChange={onChange}
      className={`${classes["text-field"]} ${className}`}
      placeholder={placeholder}
    />
  );
};
