import { FilterMode } from "../types/FilterMode";
import { TaskObject } from "../types/TaskObject";

type FilterSet = {
  [key in FilterMode]: (task: TaskObject) => boolean;
};

export const useFilter = (mode: FilterMode) => {
  const modes: FilterSet = {
    [FilterMode.All]: task => !!task,
    [FilterMode.Active]: task => !task.complete,
    [FilterMode.Completed]: task => task.complete,
  };

  return modes[mode];
};
