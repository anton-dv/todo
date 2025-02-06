import { dataKey } from "../hooks/useTasks";
import { TaskObject } from "../types/TaskObject";

export type TicHandler = (tasks: TaskObject[]) => void;

export class Tic {
  static #timerId: number | undefined;

  static #delay: number = 1000;

  static #handlers: Map<number, TicHandler> = new Map<number, TicHandler>();

  static setDelay = (ms: number) => {
    if (ms > 4) Tic.#delay = ms;
  };

  static start = () => {
    if (this.#timerId) return;

    setInterval(() => {
      const json = localStorage.getItem(dataKey);
      const tasks = json ? (JSON.parse(json) as TaskObject[]) : [];
      const normTasks = tasks.map(e => (e.timer ? e : { ...e, timer: new Date(0) }));
      this.#tack(normTasks);
      this.#handlers.forEach((func: TicHandler) => func(normTasks));
    }, this.#delay);
  };

  static stop = () => {
    clearInterval(this.#timerId);
  };

  static add = (id: number, handler: TicHandler) => {
    if (!this.#handlers.get(id)) {
      this.#handlers.set(id, handler);
    }
  };

  static #tack = (tasks: TaskObject[]) => {
    if (tasks.every(task => !task.activeTimer)) return;
    const result = tasks.map(task => {
      if (task.activeTimer) {
        if (new Date(task.timer).getMinutes() === 59 && new Date(task.timer).getSeconds() === 59)
          return {
            ...task,
            activeTimer: false,
          };

        return {
          ...task,
          timer: new Date(new Date(task.timer).getTime() + this.#delay / 2),
        };
      }
      return task;
    });

    const json = JSON.stringify(result);
    localStorage.setItem(dataKey, json);
  };
}
