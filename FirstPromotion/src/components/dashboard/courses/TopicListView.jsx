import React from "react";
import { ArrowLeft, CheckCircle2, Lock, PlayCircle, Clock } from "lucide-react";

const TopicListView = ({ selectedPaper, selectedCourse, onBack }) => {
  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <div>
          <h2 className="text-xl font-black text-brand-navy">
            {selectedPaper.title}
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            {selectedCourse.title}
          </p>
        </div>
      </div>

      {/* Topics List */}
      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">
          Topics / Chapters
        </h3>
        <div className="space-y-4">
          {selectedPaper.topics?.length > 0 ? (
            selectedPaper.topics.map((topic) => (
              <div
                key={topic.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-brand-navy/20 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${
                      topic.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : topic.status === "locked"
                        ? "bg-slate-200 text-slate-400"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {topic.status === "completed" ? (
                      <CheckCircle2 size={20} />
                    ) : topic.status === "locked" ? (
                      <Lock size={18} />
                    ) : (
                      <PlayCircle size={20} />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy text-sm md:text-base">
                      {topic.title}
                    </h4>
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <Clock size={12} /> {topic.duration}
                    </span>
                  </div>
                </div>
                {topic.status !== "locked" && (
                  <button className="text-xs font-bold text-white bg-brand-navy px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    Start
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-400">
              <p>No topics uploaded yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicListView;
