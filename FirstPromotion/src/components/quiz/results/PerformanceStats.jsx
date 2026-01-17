import React from "react";
import { CheckCircle2, XCircle, MinusCircle, Zap } from "lucide-react";

/**
 * Reusable Stat Box
 */
const StatBox = ({ icon: Icon, label, value, color, bg }) => (
  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-2 transition-transform hover:scale-105">
    <div className={`p-2 rounded-full ${bg} ${color}`}>
      <Icon size={20} />
    </div>
    <div className="text-center">
      <div className="text-2xl font-black text-slate-800">{value}</div>
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {label}
      </div>
    </div>
  </div>
);

const PerformanceStats = ({ correct, wrong, skipped, total, accuracy }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl mx-auto">
      <StatBox
        icon={CheckCircle2}
        label="Correct"
        value={correct}
        color="text-green-600"
        bg="bg-green-50"
      />
      <StatBox
        icon={XCircle}
        label="Wrong"
        value={wrong}
        color="text-red-500"
        bg="bg-red-50"
      />
      <StatBox
        icon={MinusCircle}
        label="Skipped"
        value={skipped}
        color="text-slate-500"
        bg="bg-slate-100"
      />
      <StatBox
        icon={Zap}
        label="Accuracy"
        value={`${accuracy}%`}
        color="text-purple-600"
        bg="bg-purple-50"
      />
    </div>
  );
};

export default PerformanceStats;
