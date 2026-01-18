import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  Loader2,
} from "lucide-react";

// --- MOCK API ---
const fetchRevisionTopics = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return [
    {
      id: 1,
      topic: "SB Orders 2023",
      category: "Circulars",
      lastStudiedDaysAgo: 1,
    },
    {
      id: 2,
      topic: "Foreign Mail Regulations",
      category: "Manuals",
      lastStudiedDaysAgo: 3,
    },
    {
      id: 3,
      topic: "GDS Conduct Rules",
      category: "Rules",
      lastStudiedDaysAgo: 6,
    },
    { id: 4, topic: "RTI Act 2005", category: "Law", lastStudiedDaysAgo: 14 },
    {
      id: 5,
      topic: "PNOP Guidelines",
      category: "Operations",
      lastStudiedDaysAgo: 30,
    },
  ];
};

const SmartRevisionWidget = () => {
  const { data: topics, isLoading } = useQuery({
    queryKey: ["revisionTopics"],
    queryFn: fetchRevisionTopics,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  // Helper: Calculate Spaced Repetition
  const getRevisionDetails = (daysAgo) => {
    const intervals = [1, 3, 7, 14, 30];
    const isDue = intervals.includes(daysAgo) || daysAgo > 30;
    const today = new Date();
    const nextInterval = intervals.find((i) => i > daysAgo) || 30;
    const daysUntilNext = isDue ? 0 : nextInterval - daysAgo;

    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + daysUntilNext);

    return {
      due: isDue,
      label: isDue
        ? "Today"
        : nextDate.toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
          }),
    };
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-12 flex justify-center">
        <Loader2 className="animate-spin text-brand-navy" size={24} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden animate-in fade-in duration-500 slide-in-from-bottom-4">
      <div className="p-6 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-50">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <Calendar size={22} />
          </div>
          <div>
            <h3 className="text-lg font-black text-brand-navy">
              Smart Revision
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Spaced repetition schedule
            </p>
          </div>
        </div>
        <button className="text-xs font-bold text-brand-navy hover:text-brand-green transition-colors bg-slate-50 px-4 py-2 rounded-lg">
          View Calendar
        </button>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 text-[10px] uppercase tracking-widest text-slate-400 border-b border-slate-100">
              <th className="px-6 py-4 font-black">Topic Name</th>
              <th className="px-6 py-4 font-black">Category</th>
              <th className="px-6 py-4 font-black">Last Studied</th>
              <th className="px-6 py-4 font-black">Status</th>
              <th className="px-6 py-4 font-black text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium text-slate-600">
            {topics?.map((item) => {
              const details = getRevisionDetails(item.lastStudiedDaysAgo);
              return (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 group"
                >
                  <td className="px-6 py-4 font-bold text-brand-navy group-hover:text-brand-green transition-colors">
                    {item.topic}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-md text-[10px] font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {item.lastStudiedDaysAgo} days ago
                  </td>
                  <td className="px-6 py-4">
                    {details.due ? (
                      <span className="inline-flex items-center gap-1.5 text-red-500 font-bold text-xs bg-red-50 px-2 py-1 rounded-full">
                        <AlertCircle size={12} /> Today
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-slate-400 font-bold text-xs">
                        <CheckCircle2 size={12} /> {details.label}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      disabled={!details.due}
                      className={`text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all ${
                        details.due
                          ? "bg-brand-navy text-white hover:bg-brand-green shadow-md hover:shadow-lg"
                          : "bg-slate-100 text-slate-300 cursor-not-allowed"
                      }`}
                    >
                      Revise
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {topics?.map((item) => {
          const details = getRevisionDetails(item.lastStudiedDaysAgo);
          return (
            <div
              key={item.id}
              className="p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-brand-navy text-sm">
                  {item.topic}
                </h4>
                {details.due ? (
                  <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-black uppercase text-red-500 bg-red-50 px-2 py-1 rounded">
                    Due Now
                  </span>
                ) : (
                  <span className="shrink-0 text-[10px] font-bold text-slate-400">
                    {details.label}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase">
                  {item.category}
                </span>
                <span className="text-[10px] text-slate-400">
                  • {item.lastStudiedDaysAgo}d ago
                </span>
              </div>
              <button
                disabled={!details.due}
                className={`w-full py-2 rounded-lg text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 ${
                  details.due
                    ? "bg-brand-navy text-white"
                    : "bg-slate-100 text-slate-300"
                }`}
              >
                {details.due ? (
                  <>
                    <BookOpen size={14} /> Start Revision
                  </>
                ) : (
                  "Up to Date"
                )}
              </button>
            </div>
          );
        })}
        <div className="p-4 text-center">
          <button className="text-xs font-bold text-brand-navy hover:underline">
            View Full Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmartRevisionWidget;
