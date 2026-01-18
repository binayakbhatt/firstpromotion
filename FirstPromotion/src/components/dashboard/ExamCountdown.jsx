import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CalendarClock,
  Sparkles,
  Loader2,
  AlertCircle,
  X,
  Maximize2,
} from "lucide-react";

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

const ExamCountdown = ({ autoCloseAfter = 8000 }) => {
  // Default: 8 seconds
  const [timeLeft, setTimeLeft] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false); // Track if minimized or fully closed

  // 1. Fetch Data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["examTimer"],
    queryFn: fetchExamDetails,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });

  // 2. Auto-Close Logic (Notification Style)
  useEffect(() => {
    // Only set auto-close if data is loaded and currently visible
    if (data && isVisible && !isMinimized) {
      const timer = setTimeout(() => {
        setIsVisible(false); // Hide the main card
        setIsMinimized(true); // Switch to minimized state (optional, for UX)
      }, autoCloseAfter);

      return () => clearTimeout(timer);
    }
  }, [data, isVisible, isMinimized, autoCloseAfter]);

  // 3. Countdown Logic
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
  if (isLoading) return null; // Don't show anything while loading to prevent jumpiness

  // State: Error
  if (isError) return null;

  // State: Minimized (Small floating icon to reopen)
  if (isMinimized) {
    return (
      <button
        onClick={() => {
          setIsMinimized(false);
          setIsVisible(true);
        }}
        className="fixed bottom-6 right-6 z-40 bg-brand-navy text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform animate-in fade-in"
        title="Show Exam Timer"
      >
        <CalendarClock size={20} />
      </button>
    );
  }

  // State: Hidden (Completely gone)
  if (!isVisible) return null;

  // State: Visible (Full Card)
  return (
    <div
      className="fixed bottom-6 right-6 z-40 animate-in slide-in-from-bottom-10 duration-700"
      onMouseEnter={() => setIsVisible(true)} // Keep open if user hovers
    >
      <div className="bg-brand-navy text-white p-6 rounded-[1.5rem] shadow-2xl shadow-brand-navy/30 border border-white/10 relative overflow-hidden max-w-xs group">
        {/* Progress Bar for Auto-Close (Visual Indicator) */}
        <div className="absolute bottom-0 left-0 h-1 bg-brand-green/50 w-full">
          <div
            className="h-full bg-brand-green"
            style={{
              width: "0%",
              animation: `shrinkWidth ${autoCloseAfter}ms linear forwards`,
            }}
          />
        </div>
        <style>{`
          @keyframes shrinkWidth {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}</style>

        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/20 rounded-full blur-3xl -mr-8 -mt-8 pointer-events-none"></div>

        {/* Header */}
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-brand-green rounded-lg">
              <CalendarClock size={16} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-brand-green uppercase tracking-widest">
                Target Exam
              </p>
              <h3 className="font-bold text-sm leading-none">
                {data.examName}
              </h3>
            </div>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setIsMinimized(true)}
              className="text-white/40 hover:text-white transition-colors p-1"
            >
              <Maximize2 size={14} className="rotate-45" />{" "}
              {/* Mimic minimize icon */}
            </button>
            <button
              onClick={() => {
                setIsVisible(false);
                setIsMinimized(true);
              }}
              className="text-white/40 hover:text-red-400 transition-colors p-1"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Countdown Display */}
        <div className="flex items-end gap-2 mb-4 relative z-10">
          <div className="bg-white/10 rounded-xl p-3 text-center min-w-[70px] backdrop-blur-sm">
            <span className="text-2xl font-black block leading-none">
              {timeLeft?.days || 0}
            </span>
            <span className="text-[9px] uppercase font-bold text-white/60">
              Days
            </span>
          </div>
          <div className="text-2xl font-black text-brand-green pb-4">:</div>
          <div className="bg-white/10 rounded-xl p-3 text-center min-w-[70px] backdrop-blur-sm">
            <span className="text-2xl font-black block leading-none">
              {timeLeft?.hours || 0}
            </span>
            <span className="text-[9px] uppercase font-bold text-white/60">
              Hours
            </span>
          </div>
        </div>

        {/* Motivational Footer */}
        <div className="bg-brand-green/10 rounded-xl p-3 border border-brand-green/20 relative z-10 mb-1">
          <p className="text-xs font-medium text-blue-100 flex gap-2 leading-relaxed">
            <Sparkles size={14} className="text-brand-green shrink-0 mt-0.5" />"
            {data.motivationalMessage}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExamCountdown;
