import { FC } from "react";
import classes from "./header.module.scss";
import { TaskNewFrom } from "./TaskNewForm/TaskNewForm";

export type HeaderProps = {
  onAddTask: (text: string) => void;
};

export const Header: FC<HeaderProps> = ({ onAddTask }) => {
  return (
    <header>
      <h1 className={classes.header}>todos</h1>
      <TaskNewFrom onAddTask={onAddTask} />
    </header>
  );
};
