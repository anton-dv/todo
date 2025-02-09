import { TimerDate } from "./TimerDate";

export type TaskObject = {
  timer: TimerDate;
  text: string;
  date: Date;
  complete: boolean;
  activeTimer: boolean;
};
