import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  Calendar,
  AlertCircle,
  Zap,
  Clock,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  CalendarClock, // New icon for Exam Timer
  Sparkles, // New icon for motivation
  Loader2,
} from "lucide-react";
import ContinueLearningCard from "./ContinueLearningCard";

// --- MOCK API: FETCH EXAM SCHEDULE ---
const fetchExamSchedule = async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Returns exam details (This would come from your DB)
  return {
    examName: "GDS to MTS 2026",
    examDate: "2026-04-15T09:00:00", // Target Date
    motivation:
      "Success is the sum of small efforts repeated day in and day out.",
  };
};

const OverviewTab = ({ user }) => {
  const navigate = useNavigate();

  // --- 1. NEW: TANSTACK QUERY FOR EXAM TIMER ---
  const { data: examData, isLoading: loadingExam } = useQuery({
    queryKey: ["examSchedule"],
    queryFn: fetchExamSchedule,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    refetchOnWindowFocus: false,
  });

  // --- 2. COUNTDOWN LOGIC ---
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

    // Initial Set
    setTimeLeft(calculateTime());

    // Update every minute
    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 60000);

    return () => clearInterval(timer);
  }, [examData]);

  // --- EXISTING MOCK DATA ---
  const firstName = user?.name?.split(" ")[0] || "Aspirant";

  const activeCourse = {
    id: 101,
    title: "Postal Manual Vol V",
    lastTopic: "PO Guide Part 1: Clause 10",
    progress: 35,
  };

  const weakAreas = [
    { topic: "Product & Services", accuracy: "42%" },
    { topic: "IT Modernization", accuracy: "55%" },
    { topic: "Mail Operations", accuracy: "61%" },
  ];

  const revisionTopics = [
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

  // --- EXISTING LOGIC ---
  const handleResumeLearning = () => {
    navigate("/demo");
  };

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
      daysLeft: daysUntilNext,
    };
  };

  const dueTopics = revisionTopics.filter(
    (t) => getRevisionDetails(t.lastStudiedDaysAgo).due,
  );
  const dueTopicNames =
    dueTopics.length > 0
      ? dueTopics.map((t) => t.topic).join(", ")
      : "No pending revisions! Great job.";

  return (
    <div className="space-y-6 md:space-y-8 pb-20">
      {/* 1. HEADER & STATS */}
      <header className="bg-white p-5 md:p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div className="w-full">
          <h1 className="text-2xl font-black text-brand-navy flex items-center gap-2 mb-2">
            Hello, {firstName} <span className="animate-wave text-2xl">👋</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm leading-relaxed flex items-start gap-2">
            <AlertCircle
              size={16}
              className={`shrink-0 mt-0.5 ${dueTopics.length > 0 ? "text-red-500" : "text-green-500"}`}
            />
            <span>
              Your topics to revise today:{" "}
              <span className="font-bold text-brand-navy block sm:inline">
                {dueTopicNames}
              </span>
            </span>
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 w-full xl:w-auto">
          <div className="px-2 py-3 md:px-5 bg-slate-50 rounded-xl flex flex-col items-center justify-center border border-slate-100 transition-colors hover:border-slate-200">
            <span className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1">
              <Clock size={10} /> Total Hours
            </span>
            <span className="font-black text-brand-navy text-base md:text-lg leading-none">
              42h 15m
            </span>
          </div>
          <div className="px-2 py-3 md:px-5 bg-slate-50 rounded-xl flex flex-col items-center justify-center border border-slate-100 transition-colors hover:border-slate-200">
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
        {/* COL 1: CONTINUE LEARNING (Spans 2 cols) */}
        <div className="lg:col-span-2">
          <ContinueLearningCard
            course={activeCourse}
            onResume={handleResumeLearning}
          />
        </div>

        {/* COL 2: EXAM COUNTDOWN (Replaces Pomodoro Timer) */}
        <div className="lg:col-span-1 bg-brand-navy rounded-[2rem] p-6 text-white relative overflow-hidden flex flex-col justify-between shadow-xl border border-brand-navy min-h-[220px]">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-green/20 rounded-full blur-2xl -ml-5 -mb-5"></div>

          {loadingExam ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-white/50">
              <Loader2 className="animate-spin" size={24} />
              <span className="text-xs font-bold uppercase tracking-widest">
                Syncing Schedule...
              </span>
            </div>
          ) : (
            <div className="relative z-10 h-full flex flex-col">
              {/* Header */}
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

              {/* Countdown Digits */}
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

              {/* Motivation Footer */}
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

        {/* ROW 2: WEAK AREAS (Spans full width) */}
        <div className="lg:col-span-3 bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col">
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
            {weakAreas.map((area, idx) => (
              <div key={idx} className="group cursor-default">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-600 truncate mr-2 group-hover:text-brand-navy transition-colors">
                    {area.topic}
                  </span>
                  <span className="text-red-500 shrink-0 bg-red-50 px-2 py-0.5 rounded text-[10px]">
                    {area.accuracy} Accuracy
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-400 rounded-full transition-all duration-1000 ease-out group-hover:bg-red-500"
                    style={{ width: area.accuracy }}
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
      </div>

      {/* 3. SMART REVISION SCHEDULE */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
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

        {/* Desktop Table View */}
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
              {revisionTopics.map((item) => {
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

        {/* Mobile Card View */}
        <div className="md:hidden">
          {revisionTopics.map((item) => {
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
    </div>
  );
};

export default OverviewTab;
