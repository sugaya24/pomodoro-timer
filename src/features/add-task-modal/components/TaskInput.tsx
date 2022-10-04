import React, { useState } from "react";

import { AddIcon } from "../../../components/icons";
import { TTask, useAuth, useTasksContext } from "../../../contexts";

function TaskInput() {
  const { user } = useAuth();
  const { getAll, createTask } = useTasksContext();
  const [input, setInput] = useState("");

  const addTaskHandle = async () => {
    if (!user) {
      setInput("");
    } else {
      if (!user.uid) {
        return;
      }
      const newTask: TTask = {
        title: input,
        active: false,
        count: 0,
        uid: user.uid,
      };
      await createTask(newTask);
      await getAll(user.uid);
      setInput("");
    }
  };

  return (
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
  );
}

export default TaskInput;
