import { FC } from "react";
import { TaskFilter } from "./TaskFilter/TaskFilter";
import { FilterMode } from "../../../types/FilterMode";

import classes from "./footer.module.scss";

export type FooterProps = {
  itemsLeft: number;
  onSelectFilter: (mode: FilterMode) => void;
  onDeleteCompleted: () => void;
};

export const Footer: FC<FooterProps> = ({
  itemsLeft,
  onSelectFilter,
  onDeleteCompleted,
}) => {
  return (
    <footer className={classes.footer}>
      <span className={classes.footer__count}>{`${itemsLeft} items left`}</span>
      <TaskFilter onSelectFilter={onSelectFilter} />
      <button
        className={classes.footer__clear}
        onClick={onDeleteCompleted}
        type="button"
      >
        Clear completed
      </button>
    </footer>
  );
};
