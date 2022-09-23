import type { NextPage } from "next";
import React from "react";

import Modal from "../components/Modal";
import { AddIcon, ListIcon } from "../components/icons";
import { Header } from "../features/header/components";
import { MainTaskTitle } from "../features/main-task-title/components";
import { Timer } from "../features/timer/components";

const btnText = (
  <div className="flex items-center gap-2">
    <AddIcon />
    <span className="font-bold">Add Task</span>
  </div>
);

const modalContent = () => {
  return (
    <>
      <h3 className="mb-2 text-lg font-bold text-base-light-gray">New Task</h3>
      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            placeholder="Math assignment"
            className="input input-bordered w-full"
          />
          <button className="btn btn-square">
            <AddIcon />
          </button>
        </div>
      </div>
    </>
  );
};

const Home: NextPage = () => {
  return (
    <div className="mx-auto h-screen bg-base-white">
      <div className="mx-auto mb-8 h-full max-w-xl p-8">
        <Header />
        <MainTaskTitle />
        <div className="my-16">
          <Timer />
        </div>
        <div className="flex w-full flex-col justify-center gap-4">
          <Modal id="add-task" btnText={btnText} content={modalContent()} />
          <div className="flex items-center justify-center">
            <button className="btn btn-ghost gap-2 hover:bg-transparent">
              <ListIcon />
              <span className="font-bold">Task List</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
