import { FC } from "react";
import { TextField } from "../../ui/TextField";
import classes from "./task-edit.module.scss";

export type TaskEditProps = {
  text: string;
  onEditComplete: (text: string) => void;
};

export const TaskEdit: FC<TaskEditProps> = ({ text, onEditComplete }) => {
  return (
    <TextField text={text} className={classes["task-edit"]} onComplete={onEditComplete} placeholder="Editing task" />
  );
};
