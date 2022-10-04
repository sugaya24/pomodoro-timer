import React from "react";

import { TaskItem } from ".";
import { TTask } from "../../../contexts";

function TaskList({ tasks }: { tasks: TTask[] }) {
  return (
    <div className="mt-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
