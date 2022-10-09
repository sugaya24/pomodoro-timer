import React, { useState } from "react";

import { AddIcon } from "../../../components/icons";
import { TTask, useAuth, useTasksContext } from "../../../contexts";

function TaskInput() {
  const { user } = useAuth();
  const { getAll, createTask, addTask, isLoading, setIsLoading } =
    useTasksContext();
  const [input, setInput] = useState("");

  const addTaskHandle = async () => {
    setIsLoading(true);
    if (!user) {
      const newTask: TTask = {
        title: input,
        active: false,
        count: 0,
        id: Date.now().toString(),
      };
      await addTask(newTask);
      setInput("");
    } else {
      if (!user.uid) {
        return;
      }
      const newTask: TTask = {
        title: input,
        active: false,
        count: 0,
        id: user.uid,
      };
      await createTask(newTask);
      await getAll(user.uid);
      setInput("");
    }
    setIsLoading(false);
  };

  return (
    <div className="input-group">
      <input
        disabled={isLoading}
        type="text"
        placeholder="Math assignment"
        className="input input-bordered w-full"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        disabled={isLoading}
        className="btn btn-square"
        onClick={addTaskHandle}
      >
        <AddIcon />
      </button>
    </div>
  );
}

export default TaskInput;
