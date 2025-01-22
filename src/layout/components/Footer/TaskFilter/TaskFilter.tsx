import { FC, useState } from "react";
import { FilterMode } from "../../../../types/FilterMode";

import classes from "./task-filter.module.scss";

export type TaskFilterProps = {
  onSelectFilter: (mode: FilterMode) => void;
};

export const TaskFilter: FC<TaskFilterProps> = ({ onSelectFilter }) => {
  const [selected, setSelected] = useState(FilterMode.All);

  const onClick = (mode: FilterMode) => {
    setSelected(mode);
    onSelectFilter(mode);
  };

  const items = Object.values(FilterMode);

  return (
    <ul className={classes["task-filters"]}>
      {items.map((mode, index) => {
        return (
          <li key={index} className={classes["task-filters__item"]}>
            <button
              type="button"
              onClick={() => onClick(mode)}
              className={
                classes["task-filters__button"] +
                (mode === selected
                  ? " " + classes["task-filters__button--selected"]
                  : "")
              }
            >
              {mode}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
