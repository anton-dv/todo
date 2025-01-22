import { FC } from "react";
import { formatDistanceToNow } from "date-fns";
import { TaskAction } from "../../../types/TaskAction";

import classes from "./task.module.scss";

export type TaskProps = {
  index: number;
  text: string;
  isComplete?: boolean;
  createdDate: Date;
  onAction: (index: number, action: TaskAction) => void;
};

export const Task: FC<TaskProps> = ({
  index,
  text,
  isComplete,
  createdDate,
  onAction,
}) => {
  const date = formatDistanceToNow(createdDate, {
    includeSeconds: true,
    addSuffix: true,
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const action = event.target.checked
      ? TaskAction.Complete
      : TaskAction.UnComplete;

    onAction(index, action);
  };

  const onEdit = () => onAction(index, TaskAction.Edit);
  const onDelete = () => onAction(index, TaskAction.Delete);

  return (
    <li
      className={
        classes.task + (isComplete ? " " + classes["task--completed"] : "")
      }
    >
      <div>
        <input
          type="checkbox"
          checked={isComplete}
          id={text + index}
          className={classes.task__toggle}
          onChange={onChange}
        />
        <label htmlFor={text + index} className={classes.task__label}>
          <span className={classes.task__description}>{text}</span>
          <span className={classes.task__created}>{"created " + date}</span>
        </label>
        <button
          type="button"
          className={`${classes.task__icon} ${classes["task__icon--edit"]}`}
          onClick={onEdit}
        ></button>
        <button
          type="button"
          className={`${classes.task__icon} ${classes["task__icon--destroy"]}`}
          onClick={onDelete}
        ></button>
      </div>
    </li>
  );
};
