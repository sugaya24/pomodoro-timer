import React, { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";

import { useTimer } from "../../../contexts";

const timeInput = (
  label: string,
  sec: number,
  setSec: React.Dispatch<React.SetStateAction<number>>,
) => {
  const [mm, setMM] = useState(Math.floor(sec / 60));
  const [ss, setSS] = useState(sec % 60);

  useEffect(() => {
    setMM(Math.floor(sec / 60));
    setSS(sec % 60);
  }, [sec]);

  useEffect(() => {
    setSec(mm * 60 + ss);
  }, [mm, ss]);

  return (
    <div className="flex w-full items-center justify-between px-2">
      <span className="text-md w-32 font-bold">{label}</span>
      <div className="flex">
        <div>
          <input
            type="number"
            className="input input-bordered w-20"
            placeholder="mm"
            value={mm}
            min={0}
            max={59}
            onChange={(e) => {
              if (0 <= +e.target.value && +e.target.value < 60) {
                setMM(+e.target.value);
              }
            }}
          />{" "}
          :{" "}
          <input
            type="number"
            className="input input-bordered w-20"
            placeholder="ss"
            min={0}
            max={59}
            value={ss}
            onChange={(e) => {
              if (0 <= +e.target.value && +e.target.value < 60) {
                setSS(+e.target.value);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Setting = () => {
  const {
    state: { focusDuration, shortBreakDuration, longBreakDuration },
    setFocusDuration,
    setShortBreakDuration,
    setLongBreakDuration,
    setToLocalStorage,
  } = useTimer();
  const [tmpFocusDuration, setTmpFocusDuration] = useState(focusDuration);
  const [tmpShortBreakDuration, setTmpShortBreakDuration] =
    useState(shortBreakDuration);
  const [tmpLongBreakDuration, setTmpLongBreakDuration] =
    useState(longBreakDuration);

  useEffect(() => {
    setTmpFocusDuration(focusDuration);
    setTmpShortBreakDuration(shortBreakDuration);
    setTmpLongBreakDuration(longBreakDuration);
  }, [focusDuration, shortBreakDuration, longBreakDuration]);

  return (
    <>
      <label htmlFor="timer-setting" className="modal-button btn btn-ghost">
        <FiSettings size={24} />
      </label>
      <input type="checkbox" id="timer-setting" className="modal-toggle" />
      <label htmlFor="timer-setting" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <label
            htmlFor="timer-setting"
            className="btn btn-circle btn-sm absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="mb-4 text-xl font-bold">Timer Setting</h3>
          <div className="mb-4 flex w-full flex-col gap-2">
            {timeInput("Focus Time", tmpFocusDuration, setTmpFocusDuration)}
            {timeInput(
              "Short Break",
              tmpShortBreakDuration,
              setTmpShortBreakDuration,
            )}
            {timeInput(
              "Long Break",
              tmpLongBreakDuration,
              setTmpLongBreakDuration,
            )}
          </div>
          <div className="flex w-full items-center justify-between px-2">
            <button
              className="btn btn-ghost btn-sm text-gray-500 hover:text-base-light-gray"
              onClick={() => {
                setTmpFocusDuration(focusDuration);
                setTmpShortBreakDuration(shortBreakDuration);
                setTmpLongBreakDuration(longBreakDuration);
              }}
            >
              Reset Default
            </button>
            <button
              className="btn"
              onClick={() => {
                setToLocalStorage({
                  focusDuration: tmpFocusDuration,
                  shortBreakDuration: tmpShortBreakDuration,
                  longBreakDuration: tmpLongBreakDuration,
                });
              }}
            >
              Save
            </button>
          </div>
        </label>
      </label>
    </>
  );
};

export default Setting;
