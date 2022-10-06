import React, { useEffect, useState } from "react";

import { TTask, useTasksContext } from "../../../contexts";

const MainTaskTitle = () => {
  const {
    state: { tasks },
    focusedTaskId,
  } = useTasksContext();
  const [activeTask, setActiveTask] = useState<TTask>();

  useEffect(() => {
    const newActiveTask = tasks.find((task) => task.id === focusedTaskId);
    setActiveTask(newActiveTask);
  }, [focusedTaskId, tasks]);

  return (
    <div className="w-full p-2">
      <h1 className="mb-2 text-2xl font-semibold text-base-light-gray">
        Now focusing on...
      </h1>
      <div className="flex w-full border-b-2 border-base-light-gray">
        <h2 className="w-full pb-2 text-2xl font-bold line-clamp-1">
          {activeTask?.title || "🐶 Add a task first"}
        </h2>
        <span className="ml-auto">{activeTask?.count}</span>
      </div>
    </div>
  );
};

export default MainTaskTitle;
