import React, {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";

import { useAuth } from "./auth";

export type TTask = {
  id: string;
  title: string;
  active: boolean;
  count: 0;
};
type TTasksContext = {
  state: TTaskState;
  getAll: (uid: string) => Promise<any>;
  children?: ReactNode;
};

enum TaskActionKind {
  GET_ALL = "GET_ALL",
  ADD_TASK = "ADD_TASK",
}
enum TaskActionKindError {
  GET_ALL_ERR = "GET_ALL_ERR",
}

type TTaskState = {
  tasks: TTask[];
  error?: Error | null | undefined;
};

type TaskAction =
  | {
      type: TaskActionKind;
      payload: TTaskState;
    }
  | {
      type: TaskActionKindError;
      payload?: any;
    };

const taskReducer = (state: TTaskState, action: TaskAction): TTaskState => {
  switch (action.type) {
    case TaskActionKind.GET_ALL:
      return { ...state, tasks: action.payload.tasks };
    case TaskActionKindError.GET_ALL_ERR:
      return { ...state, error: action.payload };
    default:
      throw new Error();
  }
};

const initialState: TTaskState = {
  tasks: [],
  error: null,
};

const TasksContext = createContext<TTasksContext>({} as TTasksContext);

export const TasksContextProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  // get task data from db if the user already logged in
  const [state, dispatch] = useReducer(taskReducer, initialState);

  async function getAll(uid: string) {
    try {
      const res = await fetch(`/api/users/${uid}/tasks`);
      const data: TaskAction["payload"] = await res.json();
      if (res.ok) {
        dispatch({
          type: TaskActionKind.GET_ALL,
          payload: { tasks: data.tasks },
        });
      }
    } catch (err) {
      dispatch({ type: TaskActionKindError.GET_ALL_ERR, payload: err });
    }
  }

  const values = useMemo(() => {
    return {
      state,
      getAll,
    };
  }, [state]);

  return (
    <TasksContext.Provider value={values}>{children}</TasksContext.Provider>
  );
};

export const useTasksContext = () => useContext(TasksContext);
