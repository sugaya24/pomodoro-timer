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
    <div className="p-2">
      <h1 className="mb-2 text-2xl font-semibold text-base-light-gray">
        Now focusing on...
      </h1>
      <h2 className="border-b border-gray-800 pb-2 text-2xl font-bold">
        {activeTask?.title || "🐶 Add a task first"}
      </h2>
    </div>
  );
};

export default MainTaskTitle;
