import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

export type TTask = {
  id: string;
  title: string;
  active: boolean;
  count: 0;
};
type TTasksContext = {
  state: TTaskState;
  getAll: (uid: string) => Promise<any>;
  createTask: (body: TTask) => Promise<void>;
  focusedTaskId: string | null | undefined;
  setFocusedTaskId: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
  addTask: (body: TTask) => Promise<void>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updateTask: (id: string, task: TTask) => Promise<void>;
  updateTaskWithoutAuth: (id: string, task: TTask) => Promise<void>;
  children?: ReactNode;
};

enum TaskActionKind {
  GET_ALL = "GET_ALL",
  CREATE_TASK = "CREATE_TASK",
  ADD_TASK = "ADD_TASK",
  UPDATE_TASK = "UPDATE_TASK",
  UPDATE_TASK_WITHOUT_AUTH = "UPDATE_TASK_WITHOUT_AUTH",
}
enum TaskActionKindError {
  GET_ALL_ERR = "GET_ALL_ERR",
  CREATE_TASK_ERR = "CREATE_TASK_ERR",
}

type TTaskState = {
  tasks: TTask[];
  focusedTaskId?: string | null;
  error?: Error | null;
};

type TaskAction =
  | {
      type: TaskActionKind;
      payload?: any;
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
    case TaskActionKind.ADD_TASK:
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case TaskActionKind.UPDATE_TASK:
      return { ...state };
    case TaskActionKind.UPDATE_TASK_WITHOUT_AUTH:
      return { ...state };
    default:
      throw new Error();
  }
};

const initialState: TTaskState = {
  tasks: [],
  focusedTaskId: null,
  error: null,
};

const TasksContext = createContext<TTasksContext>({} as TTasksContext);

export const TasksContextProvider = ({ children }: { children: ReactNode }) => {
  // get task data from db if the user already logged in
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [focusedTaskId, setFocusedTaskId] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      setFocusedTaskId(localStorage.getItem("focusedTaskId"));
    }
  }, []);

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

  async function addTask(body: TTask) {
    dispatch({
      type: TaskActionKind.ADD_TASK,
      payload: body,
    });
  }

  async function updateTask(id: string, task: TTask) {
    try {
      dispatch({
        type: TaskActionKind.UPDATE_TASK,
      });
      await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, task: task }),
      });
    } catch (err) {
      // TODO: error
    }
  }

  async function updateTaskWithoutAuth(id: string, task: TTask) {
    const updatedTasks = state.tasks.map((t) => {
      if (t.id === id) {
        t.title = task.title;
      }
      return t;
    });
    dispatch({
      type: TaskActionKind.UPDATE_TASK_WITHOUT_AUTH,
      payload: updatedTasks,
    });
  }

  const values = useMemo(() => {
    return {
      state,
      getAll,
      createTask,
      focusedTaskId,
      setFocusedTaskId,
      addTask,
      updateTask,
      updateTaskWithoutAuth,
      isLoading,
      setIsLoading,
    };
  }, [state, focusedTaskId, isLoading]);

  return (
    <TasksContext.Provider value={values}>{children}</TasksContext.Provider>
  );
};

export const useTasksContext = () => useContext(TasksContext);
