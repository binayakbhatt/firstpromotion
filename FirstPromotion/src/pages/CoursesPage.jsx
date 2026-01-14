import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Zap,
  Clock,
  Users,
  ArrowRight,
  Loader2,
} from "lucide-react";

/**
 * @typedef {Object} CoursePrice
 * @property {number} current - The active selling price.
 * @property {number} original - The MRP before discount.
 * @property {string} currency - Currency symbol (e.g., ₹).
 */

/**
 * @typedef {Object} Course
 * @property {number} id - Unique identifier.
 * @property {string} title - Exam name.
 * @property {string} category - Departmental category.
 * @property {string[]} features - High-level highlights.
 * @property {CoursePrice} price - Dynamic price object.
 * @property {boolean} isPopular - Highlights the card.
 */

/**
 * MOCK SERVER DATA
 * This acts as the "Database" for our simulation.
 */
const MOCK_DB_RESPONSE = [
  {
    id: 1,
    title: "GDS to MTS / Postman",
    category: "Departmental Exam",
    features: ["Full Syllabus Videos", "Mock Test Series", "PDF Study Notes"],
    duration: "3 Months",
    price: { current: 1499, original: 2999, currency: "₹" },
    isPopular: false,
  },
  {
    id: 2,
    title: "Postman/MTS to PA/SA",
    category: "LGO Promotion",
    features: [
      "Intensive PO Guide Coaching",
      "Live Q&A Sessions",
      "2-Year Validity",
    ],
    duration: "3 Months",
    price: { current: 1999, original: 3999, currency: "₹" },
    isPopular: true,
  },
  {
    id: 3,
    title: "PA to Inspector Posts",
    category: "Officer Grade",
    features: [
      "Gazetted Rules Deep-Dive",
      "Case Study Analysis",
      "Personal Mentorship",
    ],
    duration: "6 Months",
    price: { current: 4999, original: 9999, currency: "₹" },
    isPopular: false,
  },
];

const CoursesPage = () => {
  // 1. State to hold the data coming from the "Backend"
  const [courses, setCourses] = useState([]);
  // 2. State to track if we are currently fetching data
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 3. Simulate a Network Request
    const fetchCourses = async () => {
      try {
        // Wait for 1.5 seconds to mimic server latency
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // "Response Received" - Update state with the mock data
        setCourses(MOCK_DB_RESPONSE);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        // Stop the loading indicator
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <header className="bg-brand-navy pt-20 pb-32 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-brand-green via-transparent to-transparent"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Invest in Your <span className="text-brand-green">Future Rank</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Join 10,000+ Department of Posts employees who have secured their
            promotions using our specialized courses.
          </p>
        </div>
      </header>

      {/* Course Grid Section */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 pb-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* CONDITIONAL RENDERING: Show Skeleton OR Real Data */}
          {isLoading
            ? // Render 3 Skeleton Cards while loading
              [1, 2, 3].map((i) => <CourseSkeleton key={i} />)
            : // Render Real Cards once data arrives
              courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-white py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
          <TrustMetric icon={<Users />} label="10k+ Active Students" />
          <TrustMetric icon={<Clock />} label="24/7 Access" />
          <TrustMetric icon={<Zap />} label="Instant Activation" />
        </div>
      </section>
    </main>
  );
};

/* --- SUB-COMPONENTS --- */

/**
 * Loading Skeleton
 * A gray placeholder that pulses to indicate data is loading.
 */
const CourseSkeleton = () => (
  <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col h-[500px] animate-pulse">
    {/* Badge Placeholder */}
    <div className="w-24 h-6 bg-slate-200 rounded-full mb-8"></div>

    {/* Title Placeholder */}
    <div className="w-1/2 h-4 bg-slate-200 rounded-full mb-4"></div>
    <div className="w-3/4 h-8 bg-slate-200 rounded-full mb-8"></div>

    {/* Features List Placeholder */}
    <div className="space-y-4 grow">
      <div className="w-full h-4 bg-slate-100 rounded-full"></div>
      <div className="w-full h-4 bg-slate-100 rounded-full"></div>
      <div className="w-2/3 h-4 bg-slate-100 rounded-full"></div>
    </div>

    {/* Footer Placeholder */}
    <div className="mt-8 pt-8 border-t border-slate-50">
      <div className="w-1/3 h-10 bg-slate-200 rounded-lg mb-4"></div>
      <div className="w-full h-14 bg-slate-200 rounded-2xl"></div>
    </div>
  </div>
);

/**
 * CourseCard Sub-component
 * @param {{ course: Course }} props
 */
const CourseCard = ({ course }) => {
  const savings = useMemo(() => {
    return Math.round(
      ((course.price.original - course.price.current) / course.price.original) *
        100
    );
  }, [course.price]);

  return (
    <article
      className={`bg-white rounded-[2.5rem] p-8 shadow-xl border-2 flex flex-col transition-all duration-500 hover:-translate-y-3 ${
        course.isPopular
          ? "border-brand-green scale-105 z-10 shadow-brand-green/10"
          : "border-transparent"
      }`}
    >
      {course.isPopular && (
        <div className="bg-brand-green text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full self-start mb-6 shadow-lg shadow-brand-green/20">
          Best Seller
        </div>
      )}

      <header className="mb-8">
        <span className="text-brand-green font-bold text-xs uppercase tracking-widest">
          {course.category}
        </span>
        <h2 className="text-2xl font-black text-brand-navy mt-2 leading-tight">
          {course.title}
        </h2>
      </header>

      <ul className="space-y-4 mb-10 grow">
        {course.features.map((feature, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 text-slate-600 text-sm font-medium"
          >
            <CheckCircle2
              size={18}
              className="text-brand-green shrink-0 mt-0.5"
            />
            {feature}
          </li>
        ))}
      </ul>

      <footer className="mt-auto pt-8 border-t border-slate-100">
        <div className="flex items-end gap-3 mb-6">
          <div className="flex flex-col">
            <span className="text-slate-400 text-sm line-through font-bold">
              {course.price.currency}
              {course.price.original.toLocaleString()}
            </span>
            <span className="text-4xl font-black text-brand-navy tracking-tighter">
              {course.price.currency}
              {course.price.current.toLocaleString()}
            </span>
          </div>
          <span className="bg-green-100 text-brand-green text-[10px] font-black px-2 py-1 rounded-md mb-1.5 animate-bounce">
            SAVE {savings}%
          </span>
        </div>

        <Link
          to="/signup"
          state={{ selectedCourse: course.title }}
          className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 ${
            course.isPopular
              ? "bg-brand-green text-white hover:brightness-110 shadow-lg shadow-brand-green/30"
              : "bg-slate-900 text-white hover:bg-brand-navy"
          }`}
        >
          Enroll Now <ArrowRight size={18} />
        </Link>
      </footer>
    </article>
  );
};

/** @private */
const TrustMetric = ({ icon, label }) => (
  <div className="flex items-center gap-3 font-bold text-slate-900 uppercase tracking-widest text-xs">
    <span className="text-brand-green">
      {React.cloneElement(icon, { size: 20 })}
    </span>
    {label}
  </div>
);

export default CoursesPage;
