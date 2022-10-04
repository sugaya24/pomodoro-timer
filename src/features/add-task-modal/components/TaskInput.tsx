import React, { useState } from "react";

import { AddIcon } from "../../../components/icons";

function TaskInput({ addTaskHandle }: { addTaskHandle: () => Promise<void> }) {
  const [input, setInput] = useState("");
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
