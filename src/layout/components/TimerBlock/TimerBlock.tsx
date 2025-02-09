import { FC } from "react";
import classes from "./timer-block.module.scss";
import { TimerDate } from "../../../types/TimerDate";

export type TimerBlockProps = {
  timer: TimerDate;
  onPlay: () => void;
  onPause: () => void;
};

export const TimerBlock: FC<TimerBlockProps> = ({ timer, onPlay, onPause }) => {
  return (
    <div className={classes["timer-block"]}>
      <button
        type="button"
        onClick={onPlay}
        className={`${classes["timer-block__button"]} ${classes["timer-block__button--play"]}`}
      ></button>
      <button
        type="button"
        onClick={onPause}
        className={`${classes["timer-block__button"]} ${classes["timer-block__button--pause"]}`}
      ></button>
      <span className={classes["timer-block__clock"]}>{formatDate(timer)}</span>
    </div>
  );
};

const formatDate = (timer: TimerDate) => {
  return `${timer.min.toString().padStart(2, "0")}:${timer.sec.toString().padStart(2, "0")}`;
};
