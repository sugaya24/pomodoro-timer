import React, {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";

export type TTask = {
  uid: string;
  title: string;
  active: boolean;
  count: 0;
};
type TTasksContext = {
  state: TTaskState;
  getAll: (uid: string) => Promise<any>;
  createTask: (body: TTask) => Promise<void>;
  children?: ReactNode;
};

enum TaskActionKind {
  GET_ALL = "GET_ALL",
  CREATE_TASK = "CREATE_TASK",
}
enum TaskActionKindError {
  GET_ALL_ERR = "GET_ALL_ERR",
  CREATE_TASK_ERR = "CREATE_TASK_ERR",
}

type TTaskState = {
  tasks: TTask[];
  error?: Error | null | undefined;
};

type TaskAction =
  | {
      type: TaskActionKind;
      payload?: TTaskState;
    }
  | {
      type: TaskActionKindError;
      payload?: any;
    };

const taskReducer = (state: TTaskState, action: TaskAction): TTaskState => {
  switch (action.type) {
    case TaskActionKind.GET_ALL:
      return { ...state, tasks: action.payload?.tasks || [] };
    case TaskActionKindError.GET_ALL_ERR:
      return { ...state, error: action.payload };
    case TaskActionKind.CREATE_TASK:
      return { ...state };
    case TaskActionKindError.CREATE_TASK_ERR:
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

  async function createTask(body: TTask) {
    try {
      dispatch({ type: TaskActionKind.CREATE_TASK });
      await fetch(`/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (err) {
      dispatch({ type: TaskActionKindError.CREATE_TASK_ERR, payload: err });
    }
  }

  const values = useMemo(() => {
    return {
      state,
      getAll,
      createTask,
    };
  }, [state]);

  return (
    <TasksContext.Provider value={values}>{children}</TasksContext.Provider>
  );
};

export const useTasksContext = () => useContext(TasksContext);
