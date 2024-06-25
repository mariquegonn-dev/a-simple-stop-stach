"use client";

import { cn } from "@/lib/utils";
import {
  ArrowCounterClockwise,
  Flag,
  FlagPennant,
  PauseCircle,
  Play,
  PlayCircle,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

export const Timer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [flag, setFlag] = useState<String[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimerRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      if (intervalRef) {
        intervalRef.current = setInterval(() => {
          setTime(Date.now() - startTimerRef.current);
        }, 10);
      }
    }
    return () => clearInterval(intervalRef.current!);
  }, [isRunning]);

  function startTimer() {
    setIsRunning(true);
    if (startTimerRef) startTimerRef.current = Date.now() - time;
  }
  function stopTimer() {
    setIsRunning(false);
  }
  function resetTimer() {
    setTime(0);
    setIsRunning(false);
    setFlag([]);
  }

  function formatTimer() {
    let hours = Math.floor(time / (1000 * 60 * 60))
      .toString()
      .padStart(2, "0");
    let minutes = Math.floor((time / (1000 * 60)) % 60)
      .toString()
      .padStart(2, "0");
    let seconds = Math.floor((time / 1000) % 60)
      .toString()
      .padStart(2, "0");
    let milliseconds = Math.floor((time % 1000) / 10)
      .toString()
      .padStart(2, "0");

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }
  return (
    <div className="bg-white/10 h-[250px] w-[680px] p-6 rounded-lg text-gray-50 mx-auto flex items-center flex-col gap-5 mt-20">
      <h1 className="text-[2.5rem] sm:text-[5rem] max-w-[680px] h-[100px] font-mono">
        {formatTimer()}
      </h1>
      <div className="flex gap-5 items-center">
        {isRunning ? (
          <>
            <button onClick={stopTimer}>
              <PauseCircle
                weight="fill"
                className="text-white hover:scale-110 transition-all sm:text-6xl text-4xl"
              />
            </button>
            <button
              onClick={() => {
                setFlag([...flag, formatTimer()]);
              }}
            >
              <Flag className="text-gray-50 hover:scale-110 transition-all sm:text-6xl text-4xl" />
            </button>
          </>
        ) : (
          <button
            onClick={startTimer}
            className="border-b-4 active:h-[50px] active:mt-[5px] active:border-b-0 border-gray-300 font-semibold items-center w-[200px] text-2xl h-[55px] rounded-md justify-center flex bg-white text-[rgb(57,_112,_151)]"
          >
            START
          </button>
        )}

        {isRunning && (
          <button onClick={resetTimer} disabled={time === 0}>
            <ArrowCounterClockwise
              weight="fill"
              className={cn(
                "hover:scale-110 transition-all sm:text-6xl text-4xl",
                time === 0 && "cursor-not-allowed opacity-50"
              )}
            />
          </button>
        )}
      </div>
      {flag.length > 0 && (
        <ul className="flex flex-col gap-2 mt-10 w-[680px]">
          {flag.map((item, index) => (
            <li
              key={item.toString()}
              className="flex gap-10 justify-between text-xl"
            >
              <span>Posição {index + 1}</span>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
