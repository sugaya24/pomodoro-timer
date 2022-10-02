import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import getUserTasks from "../lib/getUserTasks";
import { useAuth } from "./auth";

export type TTask = {
  id: string;
  title: string;
  active: boolean;
  count: 0;
};
type TTasksContext = {
  tasks: TTask[];
  setTasks: React.Dispatch<React.SetStateAction<TTask[]>>;
  children?: ReactNode;
};

const TasksContext = createContext<TTasksContext>({} as TTasksContext);

export const TasksContextProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  // get task data from db if the user already logged in
  const [tasks, setTasks] = useState<TTask[]>([]);

  useEffect(() => {
    const fetcher = async (uid: string) => {
      const tasks = await getUserTasks(uid);
      setTasks(tasks);
    };
    if (!user) {
      setTasks([]);
    } else {
      if (!user.uid) {
        return;
      }
      fetcher(user.uid);
    }
    return () => {
      fetcher;
    };
  }, [user]);

  const values = useMemo(() => ({ tasks, setTasks }), [tasks, setTasks]);

  return (
    <TasksContext.Provider value={values}>{children}</TasksContext.Provider>
  );
};

export const useTasksContext = () => useContext(TasksContext);
