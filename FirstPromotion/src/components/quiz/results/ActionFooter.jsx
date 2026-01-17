import React from "react";
import { RefreshCcw, LayoutDashboard, Share2 } from "lucide-react";

const ActionFooter = ({ onRetry, onHome }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 p-4 md:p-6 z-30">
      <div className="max-w-2xl mx-auto flex gap-4">
        <button
          onClick={onHome}
          className="flex-1 py-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
        >
          <LayoutDashboard size={18} />
          <span className="hidden sm:inline">Dashboard</span>
        </button>

        <button
          onClick={onRetry}
          className="flex-1 py-4 rounded-xl font-bold text-brand-navy border-2 border-brand-navy hover:bg-brand-navy hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <RefreshCcw size={18} /> Retry
        </button>
      </div>
    </div>
  );
};

export default ActionFooter;
