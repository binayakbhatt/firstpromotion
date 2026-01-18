import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Coffee,
  Brain,
  Armchair,
  Minimize2,
  Maximize2,
  X,
} from "lucide-react";

const PomodoroTimer = ({ className, onClose }) => {
  const MODES = {
    focus: {
      time: 25 * 60,
      label: "Focus",
      color: "text-brand-navy",
      bg: "bg-brand-navy",
      icon: <Brain size={14} />,
    },
    short: {
      time: 5 * 60,
      label: "Short Break",
      color: "text-green-600",
      bg: "bg-green-600",
      icon: <Coffee size={14} />,
    },
    long: {
      time: 15 * 60,
      label: "Long Break",
      color: "text-indigo-600",
      bg: "bg-indigo-600",
      icon: <Armchair size={14} />,
    },
  };

  const [mode, setMode] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(MODES.focus.time);
  const [isActive, setIsActive] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Timer Logic
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play sound logic would go here
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Handlers
  const toggleTimer = (e) => {
    e.stopPropagation();
    setIsActive(!isActive);
  };

  const resetTimer = (e) => {
    e.stopPropagation();
    setIsActive(false);
    setTimeLeft(MODES[mode].time);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(MODES[newMode].time);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const currentConfig = MODES[mode];

  // --- MINIMIZED VIEW ---
  if (isMinimized) {
    return (
      <div
        className={`flex items-center gap-3 bg-white p-3 rounded-2xl shadow-xl border border-slate-200 animate-in fade-in slide-in-from-bottom-4 ${className}`}
      >
        <div className={`p-2 rounded-full text-white ${currentConfig.bg}`}>
          {isActive ? (
            <Pause size={14} fill="currentColor" />
          ) : (
            <Play size={14} fill="currentColor" />
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
            {currentConfig.label}
          </span>
          <span
            className={`text-lg font-black leading-none ${currentConfig.color}`}
          >
            {formatTime(timeLeft)}
          </span>
        </div>

        <div className="flex gap-1 ml-2 border-l border-slate-100 pl-2">
          <button
            onClick={toggleTimer}
            className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-500 transition-colors"
          >
            {isActive ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            onClick={() => setIsMinimized(false)}
            className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-500 transition-colors"
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>
    );
  }

  // --- EXPANDED VIEW ---
  return (
    <div
      className={`bg-white rounded-[2rem] p-6 shadow-2xl border border-slate-100 relative overflow-hidden w-full max-w-sm animate-in zoom-in-95 duration-300 ${className}`}
    >
      {/* Background Decoration */}
      <div
        className={`absolute top-0 left-0 w-full h-1.5 ${currentConfig.bg} opacity-80 transition-colors duration-500`}
      ></div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-black text-brand-navy flex items-center gap-2 text-sm">
          {currentConfig.icon} Focus Timer
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <Minimize2 size={16} />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Timer Display */}
      <div className="text-center mb-8">
        <div
          className={`text-6xl font-black tabular-nums tracking-tight transition-colors duration-500 ${isActive ? currentConfig.color : "text-slate-300"}`}
        >
          {formatTime(timeLeft)}
        </div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">
          {isActive ? "Running..." : "Paused"}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <button
          onClick={toggleTimer}
          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand-navy/10 transition-all hover:scale-105 active:scale-95 ${isActive ? "bg-slate-800" : currentConfig.bg}`}
        >
          {isActive ? (
            <Pause size={28} fill="currentColor" />
          ) : (
            <Play size={28} fill="currentColor" className="ml-1" />
          )}
        </button>

        <button
          onClick={resetTimer}
          className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors"
          title="Reset Timer"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      {/* Mode Toggles */}
      <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1.5 rounded-xl">
        {Object.keys(MODES).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
              mode === m
                ? "bg-white text-brand-navy shadow-sm scale-105"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {m === "focus" ? "Focus" : m}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PomodoroTimer;
