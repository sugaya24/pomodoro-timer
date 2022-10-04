import React from "react";

import { TaskInput, TaskList } from ".";
import { useTasksContext } from "../../../contexts";

const AddTaskModal = () => {
  const {
    state: { tasks },
  } = useTasksContext();
  // const [input, setInput] = useState("");

  return (
    <>
      <h3 className="mb-2 text-lg font-bold text-base-light-gray">New Task</h3>
      <div className="form-control">
        <TaskInput />
      </div>
      <TaskList tasks={tasks} />
    </>
  );
};

export default AddTaskModal;
