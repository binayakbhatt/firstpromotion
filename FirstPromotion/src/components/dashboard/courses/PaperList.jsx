import React from "react";
import { ArrowLeft, Layers, ChevronRight, FileText } from "lucide-react";

const PaperList = ({ course, onBack, onSelectPaper }) => {
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
          <h2 className="text-xl font-black text-brand-navy">{course.title}</h2>
          <p className="text-sm text-slate-500 font-medium">
            Select a Paper to view syllabus topics
          </p>
        </div>
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 gap-4">
        {course.papers.map((paper, index) => (
          <div
            key={paper.id}
            onClick={() => onSelectPaper(paper)}
            className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group flex items-center justify-between"
          >
            <div className="flex items-start gap-5">
              {/* Paper Number Badge */}
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex flex-col items-center justify-center shrink-0 border border-slate-100 group-hover:bg-brand-navy group-hover:text-white transition-colors">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white/60">
                  Paper
                </span>
                <span className="text-xl font-black text-slate-700 group-hover:text-white">
                  {index + 1}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-brand-navy mb-1 group-hover:text-brand-green transition-colors">
                  {paper.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium max-w-sm leading-relaxed">
                  {paper.desc}
                </p>
                <div className="mt-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <FileText size={12} /> {paper.topics.length} Topics inside
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-full text-slate-400 group-hover:bg-brand-green group-hover:text-white transition-all">
              <ChevronRight size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaperList;
