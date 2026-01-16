import React from "react";
import {
  GraduationCap,
  ShoppingCart,
  Loader2,
  BookOpen,
  ChevronRight,
} from "lucide-react";

const CourseLibrary = ({
  activeSection,
  setActiveSection,
  myCourses,
  loadingMy,
  exploreCourses,
  loadingExplore,
  onSelectCourse,
  onBuyNow,
}) => {
  return (
    <div className="space-y-8 pb-20 animate-in fade-in">
      {/* Toggle Switches */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex w-full md:w-auto p-1 bg-slate-50 rounded-xl">
          <button
            onClick={() => setActiveSection("my_courses")}
            className={`flex-1 md:w-40 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              activeSection === "my_courses"
                ? "bg-white text-brand-navy shadow-sm"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <GraduationCap size={16} /> My Learning
          </button>
          <button
            onClick={() => setActiveSection("explore")}
            className={`flex-1 md:w-40 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              activeSection === "explore"
                ? "bg-white text-brand-navy shadow-sm"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <ShoppingCart size={16} /> Explore Store
          </button>
        </div>

        <p className="hidden md:block text-xs font-bold text-slate-400 px-2">
          {activeSection === "my_courses"
            ? "Continue where you left off"
            : "Upgrade your skills"}
        </p>
      </div>

      {/* --- CONTENT AREA --- */}

      {activeSection === "my_courses" ? (
        // 1. MY COURSES GRID
        loadingMy ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-brand-green" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => onSelectCourse(course)}
                className="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-xl transition-all cursor-pointer h-full flex flex-col"
              >
                {/* Image */}
                <div
                  className={`h-32 ${course.image} relative p-6 flex flex-col justify-between`}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                  <span className="relative z-10 self-start px-2 py-1 bg-white/20 backdrop-blur-md text-white rounded text-[10px] font-black uppercase tracking-widest">
                    {course.category}
                  </span>
                </div>
                {/* Body */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-black text-brand-navy mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <div className="mt-auto">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-brand-green">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-green"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs font-bold text-brand-navy group-hover:translate-x-1 transition-transform">
                      View Papers <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : // 2. EXPLORE GRID
      loadingExplore ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-brand-green" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exploreCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col h-full"
            >
              <div
                className={`w-12 h-12 ${course.color} rounded-xl mb-4 flex items-center justify-center text-white shadow-lg shadow-gray-200`}
              >
                <BookOpen size={24} />
              </div>
              <div className="mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {course.category}
                </span>
                <h3 className="text-xl font-black text-brand-navy mt-1">
                  {course.title}
                </h3>
              </div>
              <div className="mt-auto pt-6">
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-2xl font-black text-brand-navy">
                    {course.price}
                  </span>
                  <span className="text-xs text-slate-400 font-bold mb-1 line-through">
                    ₹2,999
                  </span>
                </div>
                <button
                  onClick={() => onBuyNow(course.id)}
                  className="w-full py-3 bg-brand-navy text-white rounded-xl font-bold text-sm shadow-lg shadow-brand-navy/20 hover:bg-slate-800 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={16} /> Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseLibrary;
