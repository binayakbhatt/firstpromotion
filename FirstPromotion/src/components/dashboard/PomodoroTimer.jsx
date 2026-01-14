import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Coffee, Brain, Armchair } from "lucide-react";

const PomodoroTimer = () => {
  const MODES = {
    focus: {
      time: 25 * 60,
      label: "Deep Focus",
      color: "text-brand-navy",
      bg: "bg-brand-navy",
      icon: <Brain size={16} />,
    },
    short: {
      time: 5 * 60,
      label: "Short Break",
      color: "text-green-600",
      bg: "bg-green-600",
      icon: <Coffee size={16} />,
    },
    long: {
      time: 15 * 60,
      label: "Long Break",
      color: "text-indigo-600",
      bg: "bg-indigo-600",
      icon: <Armchair size={16} />,
    },
  };

  const [mode, setMode] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(MODES.focus.time);
  const [isActive, setIsActive] = useState(false);

  // Timer Logic
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Optional: Play a sound here
      alert("Timer Complete!");
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Handlers
  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(MODES[mode].time);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(MODES[newMode].time);
  };

  // Format Time (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const currentConfig = MODES[mode];

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 relative overflow-hidden">
      {/* Background Decoration */}
      <div
        className={`absolute top-0 left-0 w-full h-1.5 ${currentConfig.bg} opacity-80 transition-colors duration-500`}
      ></div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-black text-brand-navy flex items-center gap-2">
          Focused Study
        </h3>
        <div
          className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 bg-slate-100 ${currentConfig.color}`}
        >
          {currentConfig.icon} {currentConfig.label}
        </div>
      </div>

      {/* Timer Display */}
      <div className="text-center mb-8">
        <div
          className={`text-6xl font-black tabular-nums tracking-tight transition-colors duration-500 ${
            isActive ? currentConfig.color : "text-slate-300"
          }`}
        >
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={toggleTimer}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-105 active:scale-95 ${
            isActive ? "bg-slate-800" : currentConfig.bg
          }`}
        >
          {isActive ? (
            <Pause size={24} fill="currentColor" />
          ) : (
            <Play size={24} fill="currentColor" className="ml-1" />
          )}
        </button>

        <button
          onClick={resetTimer}
          className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors"
          title="Reset Timer"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Mode Toggles */}
      <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1 rounded-xl">
        {Object.keys(MODES).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`py-2 rounded-lg text-xs font-bold transition-all ${
              mode === m
                ? "bg-white text-brand-navy shadow-sm"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {m === "focus" ? "Focus" : m === "short" ? "Short" : "Long"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PomodoroTimer;
