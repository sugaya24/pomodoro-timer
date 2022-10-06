import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

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
    deleteTask,
    deleteTaskWithoutAuth,
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
            <div className="flex flex-row gap-2">
              {task.id === focusedTaskId && (
                <div className="flex items-center">🍅</div>
              )}
              <div className="flex w-full flex-col">
                <span className="overflow-x-hidden line-clamp-1">
                  {task.title}
                </span>
                <span className="text-xs text-gray-400">
                  Done {task.count} rounds.
                </span>
              </div>
            </div>
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
        <label
          htmlFor={`delete task ${task.id}`}
          className="modal-button btn btn-ghost"
        >
          <FaRegTrashAlt />
        </label>
        <input
          type="checkbox"
          id={`delete task ${task.id}`}
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box relative text-base-gray">
            <label
              htmlFor={`delete task ${task.id}`}
              className="btn btn-circle btn-sm absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="mb-4 text-xl font-bold">Are you sure?</h3>
            <p>
              Delete <span className="font-bold">{task.title}</span>.
            </p>
            <p className="mb-4 text-base-light-gray">
              You won&apos;t be able to revert this.
            </p>
            <div className="modal-action flex w-full justify-end gap-2">
              <label
                htmlFor={`delete task ${task.id}`}
                className="btn btn-warning"
                onClick={() => {
                  const sleep = (ms: number) =>
                    new Promise((resolve) => setTimeout(resolve, ms));
                  sleep(0).then(() => {
                    if (user?.uid) {
                      deleteTask(task.id);
                    } else {
                      deleteTaskWithoutAuth(task.id);
                    }
                  });
                }}
              >
                Delete
              </label>
              <label
                htmlFor={`delete task ${task.id}`}
                className="btn btn-outline"
              >
                Cancel
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
