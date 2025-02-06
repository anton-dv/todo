import { FC, useState } from "react";
import { TextField } from "../../../ui/TextField/TextField";
import classes from "./task-new-from.module.scss";

export type NewTaskData = {
  text: string;
  timer: Date;
};

export type TaskNewFromProps = {
  onAddTask: (data: NewTaskData) => void;
};

export const TaskNewFrom: FC<TaskNewFromProps> = ({ onAddTask }) => {
  const [sec, setSec] = useState<number | undefined>();
  const [min, setMin] = useState<number | undefined>();

  const onSec = (value: string) => setSec(!Number.isNaN(+value) ? +value : 0);
  const onMin = (value: string) => setMin(!Number.isNaN(+value) ? +value : 0);

  const onComplete = (text: string) => {
    const minResult = (min && min > 59 ? 59 : min) || 0;
    const secResult = (sec && sec > 59 ? 59 : sec) || 0;
    const timer = new Date(0, 0, 0, 0, minResult, secResult);

    if (text.trim()) onAddTask({ text, timer });
    setSec(undefined);
    setMin(undefined);
  };

  return (
    <div className={classes["task-new-from__wrapper"]}>
      <TextField
        style={{ width: "70%" }}
        className={classes["task-new-from"]}
        onComplete={onComplete}
        placeholder="Task"
      />
      <TextField
        style={{ width: "15%", padding: "16px" }}
        className={classes["task-new-from"]}
        onChange={onMin}
        placeholder="Min"
        text={min?.toString() || undefined}
      />
      <TextField
        style={{ width: "15%", padding: "16px" }}
        className={classes["task-new-from"]}
        onChange={onSec}
        placeholder="Sec"
        text={sec?.toString() || undefined}
      />
    </div>
  );
};
