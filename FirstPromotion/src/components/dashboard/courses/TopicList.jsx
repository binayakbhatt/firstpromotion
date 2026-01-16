import React from "react";
import {
  ArrowLeft,
  CheckCircle2,
  PlayCircle,
  Clock,
  ChevronRight,
} from "lucide-react";

const TopicList = ({ paper, courseTitle, onBack, onSelectTopic }) => {
  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <div>
          <h2 className="text-xl font-black text-brand-navy">{paper.title}</h2>
          <p className="text-sm text-slate-500 font-medium">{courseTitle}</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">
          Topics / Chapters
        </h3>

        <div className="space-y-4">
          {paper.topics?.length > 0 ? (
            paper.topics.map((topic) => {
              const isCompleted = topic.status === "completed";
              const isInProgress = topic.status === "in-progress";

              return (
                <div
                  key={topic.id}
                  onClick={() => onSelectTopic && onSelectTopic(topic)}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-brand-navy/20 hover:bg-white hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-colors ${
                        isCompleted
                          ? "bg-green-100 text-green-600"
                          : isInProgress
                          ? "bg-blue-100 text-blue-600"
                          : "bg-slate-200 text-slate-500 group-hover:bg-brand-navy group-hover:text-white"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 size={20} />
                      ) : (
                        <PlayCircle size={20} />
                      )}
                    </div>
                    <div>
                      <h4
                        className={`font-bold text-sm md:text-base ${
                          isCompleted
                            ? "text-slate-500 line-through decoration-2"
                            : "text-brand-navy"
                        }`}
                      >
                        {topic.title}
                      </h4>
                      <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                        <Clock size={12} /> {topic.duration}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider bg-green-50 px-2 py-1 rounded">
                        Done
                      </span>
                    ) : (
                      <button className="text-xs font-bold text-brand-navy group-hover:text-brand-green flex items-center gap-1 transition-colors">
                        {isInProgress ? "Resume" : "Start"}{" "}
                        <ChevronRight size={14} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
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

export default TopicList;
