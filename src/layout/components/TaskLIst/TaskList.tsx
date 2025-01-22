import { FC, useState } from "react";
import { TaskObject } from "../../../types/TaskObject";
import { Task } from "../Task/Task";
import { TaskAction } from "../../../types/TaskAction";
import { TaskEdit } from "../TaskEdit/TaskEdit";
import { FilterMode } from "../../../types/FilterMode";
import { useFilter } from "../../../hooks/useFilter";

import classes from "./task-list.module.scss";

export type TaskListProps = {
  list: TaskObject[];
  filterMode: FilterMode;
  onAction: (index: number, action: TaskAction) => void;
  onEdit: (index: number, text: string) => void;
};

export const TaskList: FC<TaskListProps> = ({
  list,
  onAction,
  onEdit,
  filterMode,
}) => {
  const [editIndexes, setEditIndexes] = useState<number[]>([]);
  const filter = useFilter(filterMode);

  const onActionFilter = (index: number, action: TaskAction) => {
    if (action === TaskAction.Edit) setEditIndexes([...editIndexes, index]);
    else onAction(index, action);
  };

  const onEditComplete = (index: number, text: string) => {
    const indexes = editIndexes.filter((editIndex) => editIndex !== index);
    setEditIndexes(indexes);
    onEdit(index, text);
  };

  return (
    <ul className={classes["task-list"]}>
      {list.map((task, index) => {
        if (!filter(task)) return;
        if (editIndexes.includes(index)) {
          return (
            <TaskEdit
              text={task.text}
              onEditComplete={(text) => onEditComplete(index, text)}
            />
          );
        } else {
          return (
            <Task
              key={index}
              index={index}
              text={task.text}
              isComplete={task.complete}
              createdDate={task.date}
              onAction={onActionFilter}
            />
          );
        }
      })}
    </ul>
  );
};
