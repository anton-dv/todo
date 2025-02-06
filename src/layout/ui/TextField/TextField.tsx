import { CSSProperties, FC, useEffect, useState } from "react";
import classes from "./text-field.module.scss";

export type TextFieldProps = {
  text?: string;
  placeholder?: string;
  className?: string;
  onComplete?: (text: string) => void;
  onChange?: (text: string) => void;
  style?: CSSProperties;
};

export const TextField: FC<TextFieldProps> = ({ style, text, onComplete, onChange, placeholder, className }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(text || "");
  }, [text]);

  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (onComplete) {
        onComplete(value);
        setValue("");
      }
    }
  };

  const onPress = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    if (onChange) onChange(event.currentTarget.value);
  };

  return (
    <input
      style={style}
      value={value}
      onKeyUp={onEnter}
      onChange={onPress}
      className={`${classes["text-field"]} ${className}`}
      placeholder={placeholder}
    />
  );
};
