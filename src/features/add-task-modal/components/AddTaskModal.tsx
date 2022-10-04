import React, { useState } from "react";

import { TaskInput, TaskList } from ".";
import { useAuth, useTasksContext } from "../../../contexts";

const AddTaskModal = () => {
  const { user } = useAuth();
  const {
    state: { tasks },
  } = useTasksContext();
  const [input, setInput] = useState("");

  const addTaskHandle = async () => {
    if (!user) {
      setInput("");
    } else {
      await fetch(`/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: input,
          active: false,
          count: 0,
          uid: user.uid,
        }),
      });
      setInput("");
    }
  };

  return (
    <>
      <h3 className="mb-2 text-lg font-bold text-base-light-gray">New Task</h3>
      <div className="form-control">
        <TaskInput addTaskHandle={addTaskHandle} />
      </div>
      <TaskList tasks={tasks} />
    </>
  );
};

export default AddTaskModal;
