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
      this.#tack(tasks);
      this.#handlers.forEach((func: TicHandler) => func(tasks));
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
        const newTimer = task.timer;
        const newSec = newTimer.sec + 1;

        if (newSec === 60) {
          newTimer.sec = 0;
          newTimer.min += 1;
        } else {
          newTimer.sec = newSec;
        }
        return {
          ...task,
          timer: newTimer,
        };
      }
      return task;
    });

    const json = JSON.stringify(result);
    localStorage.setItem(dataKey, json);
  };
}
