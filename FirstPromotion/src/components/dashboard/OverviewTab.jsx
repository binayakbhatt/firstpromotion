import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  Zap,
  Clock,
  TrendingUp,
  CalendarClock,
  Sparkles,
  Loader2,
} from "lucide-react";

import ContinueLearningCard from "./ContinueLearningCard";
import WeakAreasWidget from "./overview/WeakAreasWidget"; // Imported
import SmartRevisionWidget from "./overview/SmartRevisionWidget"; // Imported

const fetchExamSchedule = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return {
    examName: "GDS to MTS 2026",
    examDate: "2026-04-15T09:00:00",
    motivation:
      "Success is the sum of small efforts repeated day in and day out.",
  };
};

const OverviewTab = ({ user }) => {
  const navigate = useNavigate();

  // Fetch Exam Data
  const { data: examData, isLoading: loadingExam } = useQuery({
    queryKey: ["examSchedule"],
    queryFn: fetchExamSchedule,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });

  // Countdown Logic
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0 });
  useEffect(() => {
    if (!examData?.examDate) return;

    const calculateTime = () => {
      const difference = +new Date(examData.examDate) - +new Date();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        };
      }
      return { days: 0, hours: 0 };
    };

    setTimeLeft(calculateTime());
    const timer = setInterval(() => setTimeLeft(calculateTime()), 60000);
    return () => clearInterval(timer);
  }, [examData]);

  // Mock User Data
  const firstName = user?.name?.split(" ")[0] || "Aspirant";
  const activeCourse = {
    id: 101,
    title: "Postal Manual Vol V",
    lastTopic: "PO Guide Part 1: Clause 10",
    progress: 35,
  };

  const handleResumeLearning = () => navigate("/demo");

  return (
    <div className="space-y-6 md:space-y-8 pb-20">
      {/* 1. HEADER */}
      <header className="bg-white p-5 md:p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div className="w-full">
          <h1 className="text-2xl font-black text-brand-navy flex items-center gap-2 mb-2">
            Hello, {firstName} <span className="animate-wave text-2xl">👋</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm leading-relaxed flex items-start gap-2">
            <AlertCircle
              size={16}
              className="shrink-0 mt-0.5 text-brand-green"
            />
            <span>
              Welcome back! Check your{" "}
              <span className="font-bold text-brand-navy">Smart Revision</span>{" "}
              schedule below.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 w-full xl:w-auto">
          <div className="px-2 py-3 md:px-5 bg-slate-50 rounded-xl flex flex-col items-center justify-center border border-slate-100 transition-colors">
            <span className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1">
              <Clock size={10} /> Total Hours
            </span>
            <span className="font-black text-brand-navy text-base md:text-lg leading-none">
              42h 15m
            </span>
          </div>
          <div className="px-2 py-3 md:px-5 bg-slate-50 rounded-xl flex flex-col items-center justify-center border border-slate-100 transition-colors">
            <span className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1">
              <TrendingUp size={10} /> Percentile
            </span>
            <span className="font-black text-brand-green text-base md:text-lg leading-none">
              Top 5%
            </span>
          </div>
          <div className="px-2 py-3 md:px-5 bg-orange-50 rounded-xl flex flex-col items-center justify-center border border-orange-100 shadow-sm">
            <span className="text-[9px] md:text-[10px] font-black uppercase text-orange-400 mb-1 flex items-center gap-1">
              <Zap size={10} fill="currentColor" /> Streak
            </span>
            <span className="font-black text-orange-600 text-base md:text-lg leading-none">
              12 Days
            </span>
          </div>
        </div>
      </header>

      {/* 2. MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* COL 1: Active Course */}
        <div className="lg:col-span-2">
          <ContinueLearningCard
            course={activeCourse}
            onResume={handleResumeLearning}
          />
        </div>

        {/* COL 2: Exam Timer */}
        <div className="lg:col-span-1 bg-brand-navy rounded-[2rem] p-6 text-white relative overflow-hidden flex flex-col justify-between shadow-xl border border-brand-navy min-h-[220px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-green/20 rounded-full blur-2xl -ml-5 -mb-5"></div>

          {loadingExam ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-white/50">
              <Loader2 className="animate-spin" size={24} />
            </div>
          ) : (
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CalendarClock className="text-brand-green" size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-green">
                      Upcoming Exam
                    </span>
                  </div>
                  <h3 className="text-lg font-black leading-tight text-white">
                    {examData?.examName}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="block text-xs font-bold text-slate-300">
                    Target Date
                  </span>
                  <span className="block text-sm font-bold text-white">
                    {new Date(examData?.examDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-end gap-2 mb-6">
                <div className="bg-white/10 rounded-2xl p-3 text-center min-w-[70px] backdrop-blur-sm border border-white/5">
                  <span className="text-3xl font-black block leading-none text-white">
                    {timeLeft.days}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-slate-300 tracking-wider">
                    Days Left
                  </span>
                </div>
                <div className="text-2xl font-black text-brand-green pb-4">
                  :
                </div>
                <div className="bg-white/10 rounded-2xl p-3 text-center min-w-[70px] backdrop-blur-sm border border-white/5">
                  <span className="text-3xl font-black block leading-none text-white">
                    {timeLeft.hours}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-slate-300 tracking-wider">
                    Hours
                  </span>
                </div>
              </div>
              <div className="mt-auto bg-brand-green/10 rounded-xl p-3 border border-brand-green/20">
                <p className="text-xs font-medium text-blue-100 flex gap-2 leading-relaxed italic">
                  <Sparkles
                    size={14}
                    className="text-brand-green shrink-0 mt-0.5"
                  />
                  "{examData?.motivation}"
                </p>
              </div>
            </div>
          )}
        </div>

        {/* COL 3: Weak Areas Widget (New Component) */}
        <WeakAreasWidget />
      </div>

      {/* 3. SMART REVISION (New Component) */}
      <SmartRevisionWidget />
    </div>
  );
};

export default OverviewTab;
