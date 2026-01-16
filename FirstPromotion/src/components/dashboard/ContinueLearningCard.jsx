import React from "react";
import { Play, BookOpen, Clock, Video, FileText } from "lucide-react";

// 1. Accept 'onResume' prop
const ContinueLearningCard = ({ course, onResume }) => {
  const contentType = "video";

  const renderIcon = () => {
    switch (contentType) {
      case "video":
        return <Video size={14} />;
      case "quiz":
        return <FileText size={14} />;
      default:
        return <BookOpen size={14} />;
    }
  };

  return (
    <div className="group relative w-full bg-gradient-to-br from-brand-navy to-slate-900 rounded-[2rem] p-6 text-white overflow-hidden shadow-xl transition-all hover:shadow-2xl hover:shadow-brand-navy/20 flex flex-col justify-between min-h-[240px] h-full">
      {/* ... Background Decoration & Top Badge ... */}
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700 ease-out origin-top-right">
        <BookOpen size={180} />
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-green/10 blur-[50px] rounded-full"></div>

      <div className="relative z-10 flex justify-between items-start mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
          </span>
          In Progress
        </div>
        <div className="flex flex-col items-end">
          <span className="text-2xl font-black text-brand-green leading-none">
            {course.progress}%
          </span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Completed
          </span>
        </div>
      </div>

      <div className="relative z-10 mb-6">
        <h2
          className="text-xl font-black mb-3 leading-tight line-clamp-2"
          title={course.title}
        >
          {course.title}
        </h2>

        <div className="flex items-center gap-3 text-sm text-blue-100 font-medium bg-white/5 p-3 rounded-xl border border-white/5 backdrop-blur-sm">
          <div className="w-8 h-8 rounded-lg bg-brand-green/20 flex items-center justify-center text-brand-green shrink-0">
            {renderIcon()}
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider mb-0.5">
              Next Lesson
            </p>
            <p className="truncate text-xs text-white font-bold">
              {course.lastTopic}
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-auto">
        <div className="flex items-center gap-4">
          {/* 2. Attach onClick handler here */}
          <button
            onClick={onResume}
            className="flex-1 flex items-center justify-center gap-2 bg-brand-green hover:bg-emerald-500 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-green-900/20 active:scale-95 group/btn"
          >
            <div className="bg-white/20 p-1 rounded-full group-hover/btn:scale-110 transition-transform">
              <Play size={10} fill="currentColor" />
            </div>
            <span className="text-xs uppercase tracking-wider">Resume</span>
          </button>

          <div className="flex flex-col items-center justify-center px-2">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">
              Left
            </span>
            <span className="text-xs font-bold flex items-center gap-1">
              <Clock size={12} className="text-brand-green" /> 15m
            </span>
          </div>
        </div>

        <div className="absolute -bottom-6 -left-6 -right-6 h-1.5 bg-white/10">
          <div
            className="h-full bg-brand-green shadow-[0_0_10px_rgba(34,197,94,0.5)]"
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ContinueLearningCard;
