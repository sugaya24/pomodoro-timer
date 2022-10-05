import React, { useState } from "react";

import { TTask, useTasksContext } from "../../../contexts";

type TaskItemProps = {
  task: TTask;
};

const TaskItem = ({ task }: TaskItemProps) => {
  const { setFocusedTaskId } = useTasksContext();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      key={task.id}
      className="mb-2 w-full rounded-lg bg-base-light-gray p-4 text-white"
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {task.active && <div>🍅</div>}
          <span className="">{task.title}</span>
        </div>
        <div className="">
          <label
            className="btn btn-ghost btn-sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            ▼
          </label>
        </div>
      </div>
      {isEditing && (
        <div className="">
          <div className="flex flex-col">
            <span>id: {task.id}</span>
            <span>title: {task.title}</span>
            <span>focus: {task.active.toString()}</span>
            <span>count: {task.count}</span>
          </div>
          <div className="flex justify-end gap-2">
            <label
              htmlFor="focus"
              className="btn btn-outline btn-error"
              onClick={() => {
                setFocusedTaskId(task.id);
                localStorage.setItem("focusedTaskId", task.id);
              }}
            >
              🍅
            </label>
            <label
              htmlFor="save button"
              className="btn btn-outline btn-warning"
            >
              Save
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
