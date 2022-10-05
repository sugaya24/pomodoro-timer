import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { TaskInput, TaskList } from ".";
import { useTasksContext } from "../../../contexts";

const AddTaskModal = () => {
  const {
    state: { tasks },
    isLoading,
  } = useTasksContext();

  return (
    <>
      <h3 className="mb-2 text-lg font-bold text-base-light-gray">New Task</h3>
      <div className="form-control">
        <TaskInput />
      </div>
      {isLoading && (
        <div className="mt-4 flex justify-center">
          <AiOutlineLoading3Quarters className="animate-spin" />
        </div>
      )}
      <TaskList tasks={tasks} />
    </>
  );
};

export default AddTaskModal;
