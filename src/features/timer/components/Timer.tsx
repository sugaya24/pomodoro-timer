import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import Button from "../../../components/ui/Button";

const Timer = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center">
        <CountdownCircleTimer
          // isPlaying
          trailColor="#102326"
          colors="#22B595"
          size={200}
          strokeWidth={10}
          duration={60}
          initialRemainingTime={40}
          onComplete={(totalElapsedTime) => ({
            shouldRepeat: true,
          })}
        >
          {({ elapsedTime, color }) => (
            <div className="flex flex-col text-center">
              <span className="mb-2 text-3xl font-semibold">12:34</span>
              <div>
                <span className="text-secondary">●</span>
                <span className="text-secondary">●</span>
                <span className="text-secondary">●</span>
                <span className="text-base-light-gray">●</span>
              </div>
            </div>
          )}
        </CountdownCircleTimer>
      </div>
      <div className="mt-8 flex justify-center gap-4">
        <button className="btn bg-transparent text-base-gray hover:bg-base-light-gray hover:text-white">
          Stop
        </button>
        <button className="btn bg-transparent text-base-gray hover:bg-base-light-gray hover:text-white">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
