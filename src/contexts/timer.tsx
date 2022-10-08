import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

const INIT_FOCUS_DURATION = 25 * 60;
const INIT_SHORT_TIME_DURATION = 5 * 60;
const INIT_LONG_TIME_DURATION = 15 * 60;

type TTimerContext = {
  state: TTimerState;
  setFocusDuration: (sec: number) => Promise<void>;
  setShortBreakDuration: (sec: number) => Promise<void>;
  setLongBreakDuration: (sec: number) => Promise<void>;
  setToLocalStorage: (durationValue: {
    focusDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
  }) => void;
};

type TTimerState = {
  duration: number;
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
};

type TimerAction = {
  type: TimerActionKind;
  payload: any;
};

enum TimerActionKind {
  SET_INIT = "SET_INIT",
  SET_DURATION = "SET_DURATION",
  SET_FOCUS_DURATION = "SET_FOCUS_DURATION",
  SET_SHORT_BREAK_DURATION = "SET_SHORT_BREAK_DURATION",
  SET_LONG_BREAK_DURATION = "SET_LONG_BREAK_DURATION",
  SET_TO_LOCAL_STORAGE = "SET_TO_LOCAL_STORAGE",
}

const timerReducer = (state: TTimerState, action: TimerAction): TTimerState => {
  const { type, payload } = action;
  switch (type) {
    case TimerActionKind.SET_INIT:
      return {
        ...state,
        focusDuration: payload.focusDuration,
        shortBreakDuration: payload.shortBreakDuration,
        longBreakDuration: payload.longBreakDuration,
      };
    case TimerActionKind.SET_FOCUS_DURATION:
      return { ...state, focusDuration: payload };
    case TimerActionKind.SET_SHORT_BREAK_DURATION:
      return { ...state, shortBreakDuration: payload };
    case TimerActionKind.SET_LONG_BREAK_DURATION:
      return { ...state, longBreakDuration: payload };
    case TimerActionKind.SET_TO_LOCAL_STORAGE:
      localStorage.setItem("timerDuration", JSON.stringify(payload));
      return {
        ...state,
        focusDuration: payload.focusDuration,
        shortBreakDuration: payload.shortBreakDuration,
        longBreakDuration: payload.longBreakDuration,
      };
    default:
      return state;
  }
};

const TimerContext = createContext({} as TTimerContext);

const initialState: TTimerState = {
  duration: 0,
  focusDuration: INIT_FOCUS_DURATION,
  shortBreakDuration: INIT_SHORT_TIME_DURATION,
  longBreakDuration: INIT_LONG_TIME_DURATION,
};

export const TimerContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  useEffect(() => {
    if (typeof window !== undefined) {
      if (!localStorage.getItem("timerDuration")) {
        localStorage.setItem(
          "timerDuration",
          JSON.stringify({
            focusDuration: INIT_FOCUS_DURATION,
            shortBreakDuration: INIT_SHORT_TIME_DURATION,
            longBreakDuration: INIT_LONG_TIME_DURATION,
          }),
        );
      }
      dispatch({
        type: TimerActionKind.SET_INIT,
        payload: JSON.parse(localStorage.getItem("timerDuration") || ""),
      });
    }
  }, []);

  async function setFocusDuration(sec: number) {
    dispatch({ type: TimerActionKind.SET_FOCUS_DURATION, payload: sec });
  }

  async function setShortBreakDuration(sec: number) {
    dispatch({ type: TimerActionKind.SET_SHORT_BREAK_DURATION, payload: sec });
  }

  async function setLongBreakDuration(sec: number) {
    dispatch({ type: TimerActionKind.SET_LONG_BREAK_DURATION, payload: sec });
  }

  async function setToLocalStorage(durationValue: {
    focusDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
  }) {
    dispatch({
      type: TimerActionKind.SET_TO_LOCAL_STORAGE,
      payload: durationValue,
    });
  }

  const value = useMemo(() => {
    return {
      state,
      setFocusDuration,
      setShortBreakDuration,
      setLongBreakDuration,
      setToLocalStorage,
    };
  }, [state]);

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
