import { FC, useState } from "react";
import { TextField } from "../../../ui/TextField/TextField";
import classes from "./task-new-from.module.scss";
import { TimerDate } from "../../../../types/TimerDate";

export type NewTaskData = {
  text: string;
  timer: TimerDate;
};

export type TaskNewFromProps = {
  onAddTask: (data: NewTaskData) => void;
};

export const TaskNewFrom: FC<TaskNewFromProps> = ({ onAddTask }) => {
  const [sec, setSec] = useState<number | undefined>();
  const [min, setMin] = useState<number | undefined>();
  const [text, setText] = useState("");

  const onSec = (value: string) => setSec(!Number.isNaN(+value) ? +value : 0);
  const onMin = (value: string) => setMin(!Number.isNaN(+value) ? +value : 0);

  const onComplete = () => {
    const resMin = min || 0;
    let resSec = sec || 0;
    const secMin = Math.floor(resSec / 60);
    resSec -= 60 * secMin;

    const timer = {
      min: resMin + secMin,
      sec: resSec,
    };

    if (text.trim()) {
      onAddTask({ text, timer });
      setSec(undefined);
      setMin(undefined);
      setText("");
    }
  };

  return (
    <div className={classes["task-new-from__wrapper"]}>
      <TextField
        style={{ width: "70%" }}
        className={classes["task-new-from"]}
        onComplete={onComplete}
        onChange={setText}
        placeholder="Task"
        text={text}
      />
      <TextField
        style={{ width: "15%", padding: "16px" }}
        className={classes["task-new-from"]}
        onChange={onMin}
        onComplete={onComplete}
        placeholder="Min"
        text={min?.toString() || undefined}
      />
      <TextField
        style={{ width: "15%", padding: "16px" }}
        className={classes["task-new-from"]}
        onChange={onSec}
        onComplete={onComplete}
        placeholder="Sec"
        text={sec?.toString() || undefined}
      />
    </div>
  );
};
