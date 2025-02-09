import { NewTaskData } from "../layout/components/Header/TaskNewForm/TaskNewForm";
import { TaskObject } from "../types/TaskObject";

export const dataKey = "tasks-2";

export const useTasks = () => {
  const getItems = (): TaskObject[] => {
    const json = localStorage.getItem(dataKey);
    return json ? (JSON.parse(json) as TaskObject[]) : [];
  };

  const setItems = (list: TaskObject[]): TaskObject[] => {
    const json = JSON.stringify(list);
    localStorage.setItem(dataKey, json);
    return list;
  };

  return {
    get: getItems,
    set: setItems,

    add: (data: NewTaskData): TaskObject[] => {
      const task: TaskObject = {
        timer: data.timer,
        text: data.text,
        complete: false,
        date: new Date(),
        activeTimer: false,
      };

      const tasks = [task, ...getItems()];

      return setItems(tasks);
    },

    complete: (index: number, complete: boolean): TaskObject[] => {
      const tasks = getItems();

      if (!tasks[index]) return tasks;
      tasks[index].complete = complete;

      return setItems(tasks);
    },

    edit: (index: number, text: string) => {
      const tasks = getItems();

      if (!tasks[index]) return tasks;
      tasks[index].text = text;

      return setItems(tasks);
    },

    delete: (index: number): TaskObject[] => {
      const tasks = getItems().filter((_, i) => i !== index);
      return setItems(tasks);
    },

    deleteCompleted: (): TaskObject[] => {
      const tasks = getItems().filter(task => !task.complete);
      return setItems(tasks);
    },

    timer: (index: number, active: boolean): TaskObject[] => {
      const tasks = getItems();
      if (!tasks[index]) return tasks;
      tasks[index].activeTimer = active;

      return setItems(tasks);
    },
  };
};
