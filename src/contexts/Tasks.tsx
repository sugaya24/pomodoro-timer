import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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
  // get task data from db if the user already logged in
  const [tasks, setTasks] = useState<TTask[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      // if (currentUser) {
      //    const res = await fetch(`/api/users/[id]/tasks`);
      //    const data = await res.json();
      //    setTasks(data)
      // }
      const res = await fetch(`/api/tasks`);
      const data = await res.json();
      setTasks(data);
    };
    fetcher();
  }, []);

  const values = useMemo(() => ({ tasks, setTasks }), [tasks, setTasks]);

  return (
    <TasksContext.Provider value={values}>{children}</TasksContext.Provider>
  );
};

export const useTasksContext = () => useContext(TasksContext);
