import React from "react";
import { ArrowRight, CheckCircle, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DEMO_COURSES } from "../../data/demoData";

const DemoVideoPlayer = ({ courseName }) => {
  const navigate = useNavigate();

  // Get course data or fallback if something goes wrong
  const courseData =
    DEMO_COURSES[courseName] || DEMO_COURSES["GDS to MTS / Postman"];

  const handleEnroll = () => {
    // Pass the selected course to the signup page so it's auto-selected there
    navigate("/signup", { state: { selectedCourse: courseName } });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Video Container */}
      <div className="aspect-video bg-black w-full relative group">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${courseData.videoId}?autoplay=1&rel=0`}
          title={courseData.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>

      {/* Dynamic Course Info & CTA */}
      <div className="p-8 bg-brand-navy text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/20 text-brand-green text-[10px] font-black uppercase tracking-widest border border-brand-green/20">
            <PlayCircle size={12} /> Now Playing: {courseName}
          </div>
          <h3 className="text-2xl font-bold">{courseData.title}</h3>
          <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
            {courseData.description} This is just 1% of the complete course
            content.
          </p>
        </div>

        {/* Pricing & Button */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto bg-white/5 p-4 rounded-2xl border border-white/10">
          <div className="text-center sm:text-left">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">
              Full Course
            </p>
            <p className="text-2xl font-black text-brand-green">
              {courseData.price}
            </p>
          </div>
          <button
            onClick={handleEnroll}
            className="w-full sm:w-auto px-8 py-4 bg-brand-green hover:bg-emerald-500 text-white rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-lg hover:shadow-green-500/20 flex items-center justify-center gap-2"
          >
            Enroll Now <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Syllabus Preview / Trust Indicators */}
      <div className="bg-slate-50 p-6 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          "Full Syllabus Coverage",
          "Live Doubt Sessions",
          "PDF Study Material",
          "Mock Test Series",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 text-slate-600 font-bold text-xs uppercase tracking-wider"
          >
            <CheckCircle size={14} className="text-brand-green" /> {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemoVideoPlayer;
