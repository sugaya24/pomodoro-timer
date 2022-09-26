import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import { secToFormattedMin } from "../../../lib/secToFormattedMin";

type TMode = "focus" | "shortBreak" | "longBreak";

const INIT_FOCUS_DURATION = 3;
const INIT_SHORT_TIME_DURATION = 5;
const INIT_LONG_TIME_DURATION = 15;

const Timer = () => {
  const [key, setKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [focusDuration, setFocusDuration] = useState(INIT_FOCUS_DURATION);
  const [shortBreakDuration, setShortBreakDuration] = useState(
    INIT_SHORT_TIME_DURATION,
  );
  const [longBreakDuration, setLongBreakDuration] = useState(
    INIT_LONG_TIME_DURATION,
  );
  const [mode, setMode] = useState<TMode>("focus");
  const [rounds, setRounds] = useState(4);
  const [doneRounds, setDoneRounds] = useState(0);
  const [totalDoneRounds, setTotalDoneRounds] = useState(0);

  useEffect(() => {
    setDuration(focusDuration);
    // TODO: set rounds already done
  }, []);

  const handleComplete = () => {
    if (mode === "focus") {
      if (doneRounds === rounds - 1) {
        setMode("longBreak");
        setDuration(longBreakDuration);
        setDoneRounds(0);
      } else {
        setMode("shortBreak");
        setDuration(shortBreakDuration);
        setDoneRounds(doneRounds + 1);
      }
      setTotalDoneRounds(totalDoneRounds + 1);
    } else {
      setMode("focus");
      setDuration(focusDuration);
    }
    setKey((prev) => prev + 1);
    setIsPlaying(false);
    return {
      shouldRepeat: false,
    };
  };

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <CountdownCircleTimer
          key={key}
          isPlaying={isPlaying}
          trailColor="#102326"
          colors={mode === "focus" ? "#C6570D" : "#22B595"}
          size={200}
          strokeWidth={10}
          duration={duration}
          onComplete={handleComplete}
        >
          {({ elapsedTime, color }) => (
            <div className="flex flex-col text-center">
              <span className="mb-2 text-3xl font-semibold">
                {secToFormattedMin(duration - elapsedTime)}
              </span>
              <div>
                {Array(rounds)
                  .fill(null)
                  .map((_, i) => {
                    return (
                      <span
                        key={i}
                        className={
                          doneRounds > i
                            ? "text-secondary"
                            : "text-base-light-gray"
                        }
                      >
                        ●
                      </span>
                    );
                  })}
              </div>
            </div>
          )}
        </CountdownCircleTimer>
      </div>
      <div className="mt-8 flex justify-center gap-4">
        <button
          className="btn bg-transparent text-base-gray hover:bg-base-light-gray hover:text-white"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? "Stop" : "Play"}
        </button>
        <button
          className="btn bg-transparent text-base-gray hover:bg-base-light-gray hover:text-white"
          onClick={() => {
            setKey((prev) => prev + 1);
            setIsPlaying(false);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
