import { FC, useEffect, useState } from "react";
import classes from "./timer-block.module.scss";

export type TimerBlockProps = {
  timer: Date;
  onPlay: () => void;
  onPause: () => void;
};
export const TimerBlock: FC<TimerBlockProps> = ({ timer, onPlay, onPause }) => {
  const [time, setTime] = useState(new Date(timer as Date));

  useEffect(() => {
    setTime(new Date(timer as Date));
  }, [timer]);

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
      <span className={classes["timer-block__clock"]}>{formatTime(time)}</span>
    </div>
  );
};

const formatTime = (time: Date) => {
  return `${time.getMinutes().toString().padStart(2, "0")}:${time.getSeconds().toString().padStart(2, "0")}`;
};
