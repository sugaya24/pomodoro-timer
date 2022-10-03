import React, { useState } from "react";

import { TaskItem } from ".";
import { AddIcon } from "../../../components/icons";
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
        <div className="input-group">
          <input
            type="text"
            placeholder="Math assignment"
            className="input input-bordered w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="btn btn-square" onClick={addTaskHandle}>
            <AddIcon />
          </button>
        </div>
      </div>
      <div className="mt-4">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </>
  );
};

export default AddTaskModal;
