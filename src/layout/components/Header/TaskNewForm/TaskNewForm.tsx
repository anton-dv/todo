import { FC } from "react";
import { TextField } from "../../../ui/TextField";
import classes from "./task-new-from.module.scss";

export type TaskNewFromProps = {
  onAddTask: (text: string) => void;
};

export const TaskNewFrom: FC<TaskNewFromProps> = ({ onAddTask }) => {
  const onComplete = (text: string) => {
    if (text.trim()) onAddTask(text);
  };

  return (
    <TextField
      className={classes["task-new-from"]}
      onComplete={onComplete}
      placeholder="What needs to be done?"
    />
  );
};
