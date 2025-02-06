import { FC, useLayoutEffect, useState } from "react";

import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { useTasks } from "../../hooks/useTasks";
import { TaskAction } from "../../types/TaskAction";
import { TaskList } from "../components/TaskLIst/TaskList";
import { FilterMode } from "../../types/FilterMode";

import classes from "./todo-page.module.scss";
import { NewTaskData } from "../components/Header/TaskNewForm/TaskNewForm";
import { Tic } from "../../tic/Tic";

export const TodoPage: FC = () => {
  const [filterMode, setFilterMode] = useState(FilterMode.All);

  const manager = useTasks();
  const [list, setList] = useState(manager.get());

  useLayoutEffect(() => {
    Tic.add(1, tasks => setList(tasks));
  }, []);

  const onAction = (index: number, action: TaskAction) => {
    if (action === TaskAction.Delete) setList(manager.delete(index));
    if (action === TaskAction.Complete) setList(manager.complete(index, true));
    if (action === TaskAction.UnComplete) setList(manager.complete(index, false));
    if (action === TaskAction.Play) setList(manager.timer(index, true));
    if (action === TaskAction.Pause) setList(manager.timer(index, false));
  };

  const onAddTask = (data: NewTaskData) => {
    setList(manager.add(data));
  };

  const onSelectFilter = (mode: FilterMode) => {
    setFilterMode(mode);
  };

  const onEdit = (index: number, text: string) => {
    if (!text.trim()) setList(manager.delete(index));
    else setList(manager.edit(index, text));
  };

  const itemLeft = () => {
    return list.filter(task => !task.complete).length;
  };

  const onDeleteCompleted = () => {
    setList(manager.deleteCompleted());
  };

  return (
    <div className={classes["todo-page"]}>
      <Header onAddTask={onAddTask} />
      <section className={classes.main}>
        <TaskList list={list} onAction={onAction} onEdit={onEdit} filterMode={filterMode} />
      </section>
      <Footer itemsLeft={itemLeft()} onSelectFilter={onSelectFilter} onDeleteCompleted={onDeleteCompleted} />
    </div>
  );
};
