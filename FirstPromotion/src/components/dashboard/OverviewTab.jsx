import React from "react";
import {
  Clock,
  Trophy,
  PlayCircle,
  AlertTriangle,
  BookOpen,
  Calendar,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Zap, // Imported for the Streak icon
} from "lucide-react";
import PomodoroTimer from "./PomodoroTimer";

const OverviewTab = ({ user, setActiveTab }) => {
  // --- DATA & LOGIC ---
  const firstName = user?.name?.split(" ")[0] || "Aspirant";

  const activeCourse = {
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
  ];

  // Helper: Calculate Due Date
  const getRevisionDetails = (daysAgo) => {
    const intervals = [1, 3, 7, 14, 30];
    const isDue = intervals.includes(daysAgo);

    // Calculate Next Date
    const today = new Date();
    let nextReviewDays = 0;

    if (isDue) {
      nextReviewDays = 0;
    } else {
      const nextInterval = intervals.find((i) => i > daysAgo) || 30;
      nextReviewDays = nextInterval - daysAgo;
    }

    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + nextReviewDays);

    return {
      due: isDue,
      label: isDue
        ? "Today"
        : nextDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
      daysLeft: nextReviewDays,
    };
  };

  // Filter topics due TODAY for the greeting message
  const dueTopics = revisionTopics.filter(
    (t) => getRevisionDetails(t.lastStudiedDaysAgo).due
  );
  const dueTopicNames =
    dueTopics.length > 0
      ? dueTopics.map((t) => t.topic).join(", ")
      : "No pending revisions! Great job.";

  return (
    <div className="space-y-8">
      {/* 1. GREETING & HEADER */}
      <header className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div>
          <h1 className="text-2xl font-black text-brand-navy flex items-center gap-2">
            Hello, {firstName} <span className="animate-wave text-2xl">👋</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1 text-sm flex items-center gap-2">
            <AlertCircle
              size={14}
              className={
                dueTopics.length > 0 ? "text-red-500" : "text-green-500"
              }
            />
            Your topics to revise today:{" "}
            <span className="font-bold text-brand-navy">{dueTopicNames}</span>
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex flex-wrap gap-4">
          {/* Total Time */}
          <div className="px-5 py-3 bg-slate-50 rounded-xl flex flex-col items-center min-w-[100px] border border-transparent hover:border-slate-200 transition-colors">
            <span className="text-[10px] font-black uppercase text-slate-400 mb-1">
              Total Hours
            </span>
            <span className="font-black text-brand-navy text-lg leading-none">
              42h 15m
            </span>
          </div>

          {/* Percentile */}
          <div className="px-5 py-3 bg-slate-50 rounded-xl flex flex-col items-center min-w-[100px] border border-transparent hover:border-slate-200 transition-colors">
            <span className="text-[10px] font-black uppercase text-slate-400 mb-1">
              Percentile
            </span>
            <span className="font-black text-brand-green text-lg leading-none">
              Top 5%
            </span>
          </div>

          {/* NEW: Days Streak */}
          <div className="px-5 py-3 bg-orange-50 rounded-xl flex flex-col items-center min-w-[100px] border border-orange-100 shadow-sm">
            <span className="text-[10px] font-black uppercase text-orange-400 mb-1 flex items-center gap-1">
              <Zap size={12} fill="currentColor" /> Streak
            </span>
            <span className="font-black text-orange-600 text-lg leading-none">
              12 Days
            </span>
          </div>
        </div>
      </header>

      {/* 2. MAIN ROW (Side-by-Side: Active Course, Pomodoro, Weak Areas) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* COL 1: CONTINUE LEARNING */}
        <div className="bg-brand-navy rounded-[2rem] p-6 text-white relative overflow-hidden shadow-xl flex flex-col justify-between group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <BookOpen size={150} />
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                Continue Learning
              </span>
              <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center font-bold text-xs shadow-lg">
                {activeCourse.progress}%
              </div>
            </div>

            <h2
              className="text-xl font-black mb-1 line-clamp-1"
              title={activeCourse.title}
            >
              {activeCourse.title}
            </h2>
            <p className="text-slate-300 text-xs font-medium mb-6 line-clamp-1">
              {activeCourse.lastTopic}
            </p>

            <button className="w-full flex items-center justify-center gap-2 bg-brand-green hover:bg-emerald-400 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-brand-green/20">
              <PlayCircle size={18} /> Resume
            </button>
          </div>
        </div>

        {/* COL 2: POMODORO TIMER */}
        <PomodoroTimer />

        {/* COL 3: WEAK AREAS */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-red-50 text-red-500 rounded-lg">
              <AlertTriangle size={16} />
            </div>
            <h3 className="font-black text-brand-navy text-sm">Weak Areas</h3>
          </div>
          <div className="space-y-3 flex-1">
            {weakAreas.map((area, idx) => (
              <div key={idx} className="group">
                <div className="flex justify-between text-[10px] font-bold mb-1">
                  <span className="text-slate-600">{area.topic}</span>
                  <span className="text-red-500">{area.accuracy}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-400"
                    style={{ width: area.accuracy }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. SMART REVISION TABLE */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 pb-4 flex justify-between items-center border-b border-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Calendar size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black text-brand-navy">
                Smart Revision Schedule
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Topics due based on Ebbinghaus Forgetting Curve
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] uppercase tracking-widest text-slate-400 border-b border-slate-100">
                <th className="px-6 py-4 font-black">Topic Name</th>
                <th className="px-6 py-4 font-black">Category</th>
                <th className="px-6 py-4 font-black">Last Studied</th>
                <th className="px-6 py-4 font-black">Next Revision</th>
                <th className="px-6 py-4 font-black text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-600">
              {revisionTopics.map((item) => {
                const details = getRevisionDetails(item.lastStudiedDaysAgo);
                return (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0"
                  >
                    <td className="px-6 py-4 font-bold text-brand-navy">
                      {item.topic}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded-md text-[10px] font-bold uppercase">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {item.lastStudiedDaysAgo} days ago
                    </td>
                    <td className="px-6 py-4">
                      {details.due ? (
                        <span className="inline-flex items-center gap-1.5 text-red-500 font-bold bg-red-50 px-3 py-1 rounded-full text-xs">
                          <AlertCircle size={12} /> Today
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-slate-400 font-bold bg-slate-100 px-3 py-1 rounded-full text-xs">
                          <Calendar size={12} /> {details.label}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        disabled={!details.due}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          details.due
                            ? "bg-brand-navy text-white hover:bg-slate-800 shadow-md hover:shadow-lg"
                            : "bg-slate-100 text-slate-300 cursor-not-allowed"
                        }`}
                      >
                        {details.due ? "Revise Now" : "Locked"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
