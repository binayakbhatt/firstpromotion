import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, ArrowRight, Loader2 } from "lucide-react";

// --- MOCK API ---
const fetchWeakAreas = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return [
    { topic: "Product & Services", accuracy: 42 },
    { topic: "IT Modernization", accuracy: 55 },
    { topic: "Mail Operations", accuracy: 61 },
  ];
};

const WeakAreasWidget = () => {
  const { data: weakAreas, isLoading } = useQuery({
    queryKey: ["weakAreas"],
    queryFn: fetchWeakAreas,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  if (isLoading) {
    return (
      <div className="lg:col-span-3 bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex items-center justify-center min-h-[160px]">
        <Loader2 className="animate-spin text-brand-navy" size={24} />
      </div>
    );
  }

  return (
    <div className="lg:col-span-3 bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col animate-in fade-in duration-500">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-red-50 text-red-500 rounded-lg">
          <AlertTriangle size={18} />
        </div>
        <div>
          <h3 className="font-black text-brand-navy text-sm uppercase tracking-wide">
            Focus Needed
          </h3>
          <p className="text-[10px] text-slate-400 font-bold">
            Based on recent quiz performance
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {weakAreas?.map((area, idx) => (
          <div key={idx} className="group cursor-default">
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-slate-600 truncate mr-2 group-hover:text-brand-navy transition-colors">
                {area.topic}
              </span>
              <span className="text-red-500 shrink-0 bg-red-50 px-2 py-0.5 rounded text-[10px]">
                {area.accuracy}% Accuracy
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-400 rounded-full transition-all duration-1000 ease-out group-hover:bg-red-500"
                style={{ width: `${area.accuracy}%` }}
              ></div>
            </div>
            <div className="mt-2 text-right">
              <button className="text-[10px] font-bold text-brand-navy hover:text-brand-green transition-colors flex items-center justify-end gap-1 w-full">
                Practice <ArrowRight size={10} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeakAreasWidget;
