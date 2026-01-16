import React from "react";
import { useNavigate } from "react-router-dom"; // 1. Import Hook
import { ArrowRight, Award, GraduationCap, ShieldCheck } from "lucide-react";

/**
 * @typedef {Object} Course
 * @property {number} id - Unique identifier for the course.
 * @property {string} title - Main heading of the course.
 * @property {string} subtitle - Examination category.
 * @property {string} description - Brief summary of course content.
 * @property {'Entry Level' | 'Intermediate' | 'Officer Level'} level - Difficulty/Cadre rank.
 * @property {string} color - Tailwind border color class.
 */

/**
 * Course catalog data.
 */
const COURSES_DATA = [
  {
    id: 1,
    title: "GDS to MTS / Postman",
    subtitle: "Departmental Exam",
    description:
      "Complete preparation for Gramin Dak Sevaks aiming for MTS or Postman cadre. Covers Paper 1 & 2 thoroughly.",
    level: "Entry Level",
    color: "border-brand-green",
    duration: "3 Months",
  },
  {
    id: 2,
    title: "MTS to Postman / Mail Guard",
    subtitle: "Promotion Batch",
    description:
      "Targeted course for MTS staff looking to upgrade to Postman or Mail Guard. Includes full DTE syllabus coverage.",
    level: "Intermediate",
    color: "border-brand-green",
    duration: "3 Months",
  },
  {
    id: 3,
    title: "Postman/MTS to PA/SA",
    subtitle: "LGO Examination",
    description:
      "Crack the LGO exam to become a Postal Assistant or Sorting Assistant. Intensive coaching on PO Guides and Rules.",
    level: "Intermediate",
    color: "border-brand-green",
    duration: "6 Months",
  },
  {
    id: 4,
    title: "PA to Inspector of Posts (IPO)",
    subtitle: "Officer Grade Exam",
    description:
      "Elite batch for aspiring Inspectors. Deep dive into IPO Acts, Rules, and advanced administrative procedures.",
    level: "Officer Level",
    color: "border-brand-navy",
    duration: "6 Months",
  },
  {
    id: 5,
    title: "PS Group 'B' Exam",
    subtitle: "Gazetted Officer",
    description:
      "Premium coaching for the Postal Service Group B exam. Strategic focus on management and gazetted rules.",
    level: "Officer Level",
    color: "border-brand-navy",
    duration: "9 Months",
  },
];

/**
 * Courses Component
 */
const Courses = () => {
  const navigate = useNavigate(); // 2. Initialize Hook

  // 3. Handler to redirect to Dashboard > Courses Tab
  const handleCourseClick = () => {
    navigate("/courses", { state: { activeTab: "courses" } });
  };

  return (
    <section
      className="py-24 bg-white"
      id="courses"
      aria-labelledby="courses-title"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <header>
            <h2 className="text-brand-green font-bold tracking-[0.25em] uppercase text-xs md:text-sm mb-4">
              Our Batches
            </h2>
            <h3
              id="courses-title"
              className="text-4xl md:text-5xl font-black text-brand-navy mb-6"
            >
              Select Your <span className="text-brand-green">Target Exam</span>
            </h3>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
              Comprehensive video courses and study materials designed strictly
              according to the latest{" "}
              <span className="text-brand-navy font-semibold">
                Department of Posts
              </span>{" "}
              syllabus.
            </p>
          </header>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {COURSES_DATA.map((course) => (
            <article
              key={course.id}
              className={`group relative bg-white rounded-4xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 border-t-8 ${course.color} border-x border-b border-slate-50 flex flex-col`}
            >
              {/* Cadre Level Badge */}
              <div className="flex justify-end mb-6">
                <span
                  className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full transition-colors duration-300 ${
                    course.level.includes("Officer")
                      ? "bg-brand-navy text-white"
                      : "bg-green-50 text-brand-green group-hover:bg-brand-green group-hover:text-white"
                  }`}
                >
                  {course.level.includes("Officer") ? (
                    <Award size={12} />
                  ) : (
                    <GraduationCap size={12} />
                  )}
                  {course.level}
                </span>
              </div>

              {/* Content Area */}
              <div className="grow">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {course.subtitle}
                </p>
                <h4 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-brand-navy transition-colors">
                  {course.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-8">
                  {course.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-auto">
                <button
                  onClick={handleCourseClick} // 4. Attach Handler
                  className="w-full py-4 rounded-xl border-2 border-slate-100 font-black text-slate-600 flex items-center justify-center gap-2 group-hover:bg-brand-navy group-hover:text-white group-hover:border-brand-navy group-hover:shadow-lg group-hover:shadow-brand-navy/20 transition-all duration-300 active:scale-95"
                  aria-label={`View details for ${course.title}`}
                >
                  <span>View Course Details</span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>

              {/* Decorative Corner Icon (Only visible on Desktop hover) */}
              <div className="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-5 group-hover:scale-110 transition-all duration-700 pointer-events-none">
                <ShieldCheck size={120} className="text-brand-navy" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
