import React from "react";
import { Trophy, Star } from "lucide-react";

/**
 * ScoreGauge Component
 * Renders an animated circular progress bar representing the score percentage.
 *
 * @param {number} score - User's score
 * @param {number} total - Maximum possible score
 * @param {boolean} passed - Whether the user passed (e.g., > 40%)
 */
const ScoreGauge = ({ score, total, passed }) => {
  const percentage = Math.round((score / total) * 100);
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Color logic based on performance
  const colorClass =
    percentage >= 80
      ? "text-brand-green"
      : percentage >= 50
        ? "text-yellow-500"
        : "text-red-500";

  return (
    <div className="relative flex flex-col items-center justify-center mb-8">
      {/* Background Glow */}
      <div
        className={`absolute inset-0 blur-3xl opacity-20 rounded-full ${
          passed ? "bg-brand-green" : "bg-red-500"
        }`}
      ></div>

      <div className="relative w-48 h-48 md:w-56 md:h-56">
        {/* SVG Circle */}
        <svg className="w-full h-full transform -rotate-90">
          {/* Track */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            className="stroke-slate-100"
            strokeWidth="12"
            fill="transparent"
          />
          {/* Progress Indicator */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            className={`transition-all duration-1000 ease-out ${colorClass}`}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {percentage >= 90 ? (
            <Trophy className="w-8 h-8 text-yellow-500 mb-1 animate-bounce" />
          ) : (
            <Star className="w-8 h-8 text-slate-300 mb-1" />
          )}
          <span className="text-4xl md:text-5xl font-black text-brand-navy tracking-tight">
            {percentage}%
          </span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
            Score
          </span>
        </div>
      </div>

      <div className="mt-4 text-center">
        <h2 className="text-2xl font-black text-brand-navy">
          {percentage >= 80
            ? "Outstanding!"
            : percentage >= 50
              ? "Good Job!"
              : "Keep Practicing"}
        </h2>
        <p className="text-slate-500 font-medium text-sm">
          You scored <strong className="text-brand-navy">{score}</strong> out of{" "}
          <strong>{total}</strong>
        </p>
      </div>
    </div>
  );
};

export default ScoreGauge;
