import React, { useState } from "react";
import {
  FileText,
  Download,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Printer,
} from "lucide-react";

const NotesSection = ({ username }) => {
  const [zoom, setZoom] = useState(100);
  const [page, setPage] = useState(1);
  const totalPages = 5; // Mock total pages

  const handleZoom = () => {
    setZoom((prev) => (prev >= 150 ? 100 : prev + 25));
  };

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-700">
      {/* --- 1. HEADER & TOOLBAR --- */}
      <div className="border-b border-slate-100 p-4 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50/50">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <FileText size={20} />
          </div>
          <div>
            <h3 className="text-sm font-black text-brand-navy">
              Lecture Notes
            </h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              PDF • 2.4 MB
            </p>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs font-bold text-slate-600 w-16 text-center">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500 disabled:opacity-30 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
          <div className="w-px h-4 bg-slate-200 mx-1"></div>
          <button
            onClick={handleZoom}
            className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500 transition-colors flex items-center gap-1"
            title="Zoom"
          >
            <ZoomIn size={16} /> <span className="text-[10px]">{zoom}%</span>
          </button>
        </div>

        {/* Primary Action */}
        <button className="bg-brand-navy text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-brand-navy/20 hover:scale-105 transition-transform">
          <Download size={14} /> Download
        </button>
      </div>

      {/* --- 2. DOCUMENT VIEWER (The "Reading" Area) --- */}
      <div className="bg-slate-100 p-8 h-[600px] overflow-y-auto flex justify-center relative custom-scrollbar">
        {/* The "Paper" */}
        <div
          className="bg-white shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col"
          style={{
            width: `${zoom * 5}px`, // Dynamic Width based on zoom
            minHeight: `${zoom * 7}px`, // Maintain A4 Aspect Ratio roughly
            maxWidth: "100%",
          }}
        >
          {/* WATERMARK OVERLAY (Visual only, no warning text) */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] rotate-[-45deg] z-50">
            <span className="text-6xl md:text-8xl font-black text-slate-900 whitespace-nowrap select-none">
              {username} • {username} • {username}
            </span>
          </div>

          {/* MOCK CONTENT (This would be your PDF Canvas or Iframe in production) */}
          <div className="p-10 md:p-16 space-y-6 text-slate-800">
            <h1 className="text-3xl font-black text-brand-navy border-b-4 border-brand-green/20 pb-4 mb-8">
              Organization of the Department
            </h1>

            <div className="space-y-4 text-sm md:text-base leading-relaxed font-serif text-slate-600">
              <p>
                <strong>1. Introduction:</strong> The Department of Posts comes
                under the Ministry of Communications. The Secretary, Department
                of Posts is the Director General, Postal Services.
              </p>

              <p>
                <strong>2. Administrative Setup:</strong> The Department is
                divided into 23 Postal Circles for administrative convenience.
                Each Circle is headed by a Chief Postmaster General (CPMG).
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                <p className="font-bold text-blue-800 italic">
                  Key Exam Point:
                </p>
                <p className="text-blue-700">
                  The Base Circle is intended to serve the communication needs
                  of the Armed Forces. It is headed by an Additional Director
                  General (APS).
                </p>
              </div>

              <p>
                <strong>3. Functional Units:</strong> Apart from circles, the
                department has functional units like Postal Directorate, PLI
                Directorate, and Business Development Directorate.
              </p>

              {/* Mock Lines to fill page */}
              {[...Array(5)].map((_, i) => (
                <p key={i} className="opacity-50 blur-[0.5px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </p>
              ))}
            </div>

            {/* Page Footer */}
            <div className="mt-auto pt-20 flex justify-center text-xs text-slate-300 font-mono">
              Page {page} of {totalPages}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesSection;
