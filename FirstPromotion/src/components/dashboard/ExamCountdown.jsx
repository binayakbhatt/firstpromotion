import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { CalendarClock, Sparkles, Loader2, AlertCircle } from "lucide-react";

// --- MOCK API FETCHER ---
const fetchExamDetails = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return {
    examName: "GDS to MTS 2026",
    examDate: "2026-04-15T09:00:00",
    motivationalMessage:
      "Success is the sum of small efforts repeated day in and day out.",
  };
};

const ExamCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(null);

  // 1. Fetch Data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["examTimer"],
    queryFn: fetchExamDetails,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });

  // 2. Countdown Logic
  useEffect(() => {
    if (!data?.examDate) return;

    const calculateTimeLeft = () => {
      const difference = +new Date(data.examDate) - +new Date();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);

    return () => clearInterval(timer);
  }, [data]);

  // --- RENDER STATES ---

  // State: Loading
  if (isLoading) {
    return (
      <div className="bg-brand-navy rounded-[2rem] p-6 text-white min-h-[220px] flex flex-col items-center justify-center border border-brand-navy shadow-xl">
        <Loader2 className="animate-spin text-white/50" size={24} />
      </div>
    );
  }

  // State: Error
  if (isError) {
    return (
      <div className="bg-brand-navy rounded-[2rem] p-6 text-white min-h-[220px] flex flex-col items-center justify-center border border-brand-navy shadow-xl">
        <AlertCircle className="text-red-400 mb-2" size={24} />
        <p className="text-xs text-red-200">Unable to load exam date</p>
      </div>
    );
  }

  // State: Success (Static Card)
  return (
    <div className="bg-brand-navy text-white p-6 rounded-[2rem] shadow-xl border border-brand-navy relative overflow-hidden w-full h-full flex flex-col justify-between min-h-[220px]">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-green/20 rounded-full blur-2xl -ml-5 -mb-5 pointer-events-none"></div>

      {/* Header */}
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CalendarClock size={18} className="text-brand-green" />
            <p className="text-[10px] font-black text-brand-green uppercase tracking-widest">
              Upcoming Exam
            </p>
          </div>
          <h3 className="font-black text-lg leading-tight">{data.examName}</h3>
        </div>

        {/* Date Badge */}
        <div className="text-right">
          <span className="block text-xs font-bold text-slate-300">
            Target Date
          </span>
          <span className="block text-sm font-bold text-white">
            {new Date(data.examDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>
      </div>

      {/* Countdown Display */}
      <div className="flex items-end gap-2 mb-6 relative z-10">
        <div className="bg-white/10 rounded-2xl p-3 text-center min-w-[70px] backdrop-blur-sm border border-white/5">
          <span className="text-3xl font-black block leading-none">
            {timeLeft?.days || 0}
          </span>
          <span className="text-[9px] uppercase font-bold text-slate-300 tracking-wider">
            Days Left
          </span>
        </div>
        <div className="text-2xl font-black text-brand-green pb-4">:</div>
        <div className="bg-white/10 rounded-2xl p-3 text-center min-w-[70px] backdrop-blur-sm border border-white/5">
          <span className="text-3xl font-black block leading-none">
            {timeLeft?.hours || 0}
          </span>
          <span className="text-[9px] uppercase font-bold text-slate-300 tracking-wider">
            Hours
          </span>
        </div>
      </div>

      {/* Motivational Footer */}
      <div className="bg-brand-green/10 rounded-xl p-3 border border-brand-green/20 relative z-10 mt-auto">
        <p className="text-xs font-medium text-blue-100 flex gap-2 leading-relaxed italic">
          <Sparkles size={14} className="text-brand-green shrink-0 mt-0.5" />"
          {data.motivationalMessage}"
        </p>
      </div>
    </div>
  );
};

export default ExamCountdown;
