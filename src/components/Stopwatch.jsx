import { useState, useEffect } from "react";

export default function Stopwatch({ time, setTime, isRunning, setIsRunning }) {

  let interval;
  useEffect(() => {
    if (isRunning) {
      interval = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  function toggleTimer() {
    setIsRunning(!isRunning);
  }

  function resetTimer() {
    setTime(0);
  }

  return (
    <div className="stopWatchContainer">
      <p className="stopwatchTimeDisplay">
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </p>
    </div>
  )
}