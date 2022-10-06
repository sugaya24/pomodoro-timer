import React, { useState } from "react";

import { TTask, useAuth, useTasksContext } from "../../../contexts";

type TaskItemProps = {
  task: TTask;
};

const TaskItem = ({ task }: TaskItemProps) => {
  const { user } = useAuth();
  const {
    setFocusedTaskId,
    focusedTaskId,
    updateTask,
    updateTaskWithoutAuth,
    getAll,
  } = useTasksContext();
  const [isEditingInput, setIsEditingInput] = useState(false);
  const [input, setInput] = useState(task.title);

  return (
    <div
      key={task.id}
      className="mb-2 w-full rounded-lg bg-base-light-gray p-4 text-white"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex w-full gap-2">
          {isEditingInput ? (
            <>
              <input
                className="input w-full text-base-gray"
                autoFocus
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </>
          ) : (
            <>
              {task.id === focusedTaskId && <div>🍅</div>}
              <span className="">{task.title}</span>
            </>
          )}
        </div>
        <div className="flex justify-end gap-2">
          {!isEditingInput && (
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
          )}
          {isEditingInput ? (
            <label
              htmlFor="cancel edit"
              className="btn btn-ghost"
              onClick={() => {
                setIsEditingInput(false);
                setInput(task.title);
              }}
            >
              ⏎
            </label>
          ) : (
            <label
              htmlFor="start edit"
              className="btn btn-outline btn-warning"
              onClick={() => {
                setIsEditingInput(true);
              }}
            >
              ✏️
            </label>
          )}
          {isEditingInput ? (
            <label
              htmlFor="save edit"
              className="btn btn-outline btn-success"
              onClick={async () => {
                setIsEditingInput(false);
                if (user?.uid) {
                  await updateTask(task.id, { ...task, title: input });
                  await getAll(user?.uid);
                } else {
                  await updateTaskWithoutAuth(task.id, {
                    ...task,
                    title: input,
                  });
                }
              }}
            >
              ✅
            </label>
          ) : (
            <label className="hidden"></label>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
