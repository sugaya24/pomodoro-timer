import type { NextPage } from "next";
import React, { useCallback, useEffect } from "react";

import Modal from "../components/Modal";
import { AddIcon } from "../components/icons";
import { useAuth, useTasksContext } from "../contexts";
import { Header } from "../features/header/components";
import { MainTaskTitle } from "../features/main-task-title/components";
import { Timer } from "../features/timer/components";

const btnText = (
  <div className="flex items-center gap-2">
    <AddIcon />
    <span className="font-bold">Add Task</span>
  </div>
);

const Home: NextPage = () => {
  const { user } = useAuth();
  const { getAll, getTasksEmpty } = useTasksContext();
  const stableGetAll = useCallback(getAll, [user]);

  useEffect(() => {
    if (!user?.uid) {
      getTasksEmpty();
    } else {
      stableGetAll(user?.uid);
    }
  }, [user]);

  return (
    <div className="mx-auto min-h-screen bg-base-white">
      <div className="mx-auto h-full max-w-xl p-8">
        <Header />
        <MainTaskTitle />
        <div className="my-16">
          <Timer />
        </div>
        <div className="flex w-full justify-center">
          <Modal id="add-task" btnText={btnText} />
        </div>
      </div>
    </div>
  );
};

export default Home;
