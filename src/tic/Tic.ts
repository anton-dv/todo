import { dataKey } from "../hooks/useTasks";
import { TaskObject } from "../types/TaskObject";

export type TicHandler = (tasks: TaskObject[]) => void;

const timerId = "timer-instance-id";

type TicIds = { id: string; inter: number }[];

export class Tic {
  static #timerId: number | undefined;

  static #ticId: string = Math.random().toString(32).slice(2);

  static #delay: number = 1000;

  static #handlers: Map<number, TicHandler> = new Map<number, TicHandler>();

  static setDelay = (ms: number) => {
    if (ms > 4) Tic.#delay = ms;
  };

  static start = () => {
    if (this.#timerId) return;

    this.#initTic();

    this.#timerId = setInterval(() => {
      const json = localStorage.getItem(dataKey);
      const tasks = json ? (JSON.parse(json) as TaskObject[]) : [];
      if (this.#iteration()) this.#tack(tasks);
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

  static #initTic = () => {
    const res = localStorage.getItem(timerId);
    const data = { id: this.#ticId, inter: 0 };

    if (!res) {
      localStorage.setItem(timerId, JSON.stringify([data]));
      return;
    }

    const resObj = JSON.parse(res) as TicIds;

    if (!resObj.find(i => i.id === this.#ticId)) {
      const inter = resObj.reduce((i, item) => (item.inter > i ? item.inter : i), 0);
      resObj.push({ id: this.#ticId, inter });
      localStorage.setItem(timerId, JSON.stringify(resObj));
    }
  };

  static #iteration = () => {
    const res = localStorage.getItem(timerId);
    let timers = JSON.parse(res as string) as TicIds;
    const item = timers.find(i => i.id === this.#ticId);

    if (timers.length === 1) return true;

    if (!item) {
      this.#initTic();
      return;
    }

    const itemMain = timers.find(i => i.inter > item?.inter);

    if (itemMain) {
      const result = timers.map(i => (i.id === this.#ticId ? { ...i, inter: itemMain.inter } : i));
      localStorage.setItem(timerId, JSON.stringify(result));
      return false;
    }

    timers = timers.filter(i => i.inter > item.inter - 15);

    const result = timers.map(i => (i.id === this.#ticId ? { ...i, inter: item.inter + 1 } : i));
    localStorage.setItem(timerId, JSON.stringify(result));
    return true;
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
