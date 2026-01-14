import React from "react";
import {
  Book,
  CheckCircle2,
  ShoppingCart,
  Lock,
  Clock,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CoursesTab = () => {
  const navigate = useNavigate();

  // --- MOCK DATA ---
  // Added 'expiryDate' to simulate subscription end
  const myLibrary = [
    {
      id: 101,
      title: "Postal Manual Vol V",
      progress: 35,
      active: true,
      expiryDate: "2026-03-15", // Healthy subscription
    },
    {
      id: 102,
      title: "GDS Conduct Rules",
      progress: 88,
      active: false,
      expiryDate: "2026-01-20", // Expiring soon (Urgent)
    },
    {
      id: 103,
      title: "Product & Services",
      progress: 12,
      active: false,
      expiryDate: "2026-06-30", // Long term
    },
  ];

  const courseStore = [
    {
      id: 201,
      title: "Inspector Posts Fast Track",
      price: "₹1,499",
      features: ["Vol 1-8", "Mock Tests", "6 Months Validity"],
    },
    {
      id: 202,
      title: "PO Guide Part I & II",
      price: "₹999",
      features: ["Video Lectures", "Notes", "3 Months Validity"],
    },
  ];

  // --- HELPER: Calculate Days Left ---
  const getDaysLeft = (dateString) => {
    const today = new Date();
    const expiry = new Date(dateString);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleBuy = (courseId) => {
    navigate("/payment-gateway", { state: { courseId } });
  };

  const handleSelectCourse = (courseId) => {
    alert(`Switched active course to ID: ${courseId}`);
  };

  return (
    <div className="space-y-10">
      {/* SECTION 1: MY LIBRARY */}
      <section>
        <h2 className="text-xl font-black text-brand-navy mb-6 flex items-center gap-2">
          <Book className="text-brand-green" /> My Library
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myLibrary.map((course) => {
            const daysLeft = getDaysLeft(course.expiryDate);
            const isUrgent = daysLeft > 0 && daysLeft <= 7;
            const isExpired = daysLeft <= 0;

            return (
              <div
                key={course.id}
                className={`group bg-white rounded-3xl p-6 border-2 transition-all flex flex-col ${
                  course.active
                    ? "border-brand-green shadow-lg shadow-green-100"
                    : "border-transparent shadow-sm hover:border-slate-200"
                }`}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-brand-navy font-bold text-lg">
                    {course.title.charAt(0)}
                  </div>
                  {course.active && (
                    <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-brand-green bg-green-50 px-2 py-1 rounded-lg">
                      <CheckCircle2 size={12} /> Active
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-lg text-slate-800 mb-1 leading-tight">
                  {course.title}
                </h3>

                {/* Subscription Timer */}
                <div className="mb-4 mt-2">
                  {!isExpired ? (
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${
                        isUrgent
                          ? "bg-red-50 text-red-500"
                          : "bg-indigo-50 text-indigo-500"
                      }`}
                    >
                      {isUrgent ? (
                        <AlertCircle size={14} />
                      ) : (
                        <Clock size={14} />
                      )}
                      <span>{daysLeft} Days Left</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-500">
                      <Lock size={14} /> Expired
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="mt-auto">
                  <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mb-6 overflow-hidden">
                    <div
                      className={`h-full ${
                        isExpired ? "bg-slate-300" : "bg-brand-navy"
                      }`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>

                  <button
                    onClick={() => handleSelectCourse(course.id)}
                    disabled={course.active || isExpired}
                    className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                      course.active
                        ? "bg-transparent text-brand-green border border-green-100 cursor-default"
                        : isExpired
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-brand-navy text-white hover:bg-slate-800 shadow-lg shadow-brand-navy/20"
                    }`}
                  >
                    {course.active
                      ? "Currently Studying"
                      : isExpired
                      ? "Renew Subscription"
                      : "Study Now"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: COURSE STORE */}
      <section>
        <h2 className="text-xl font-black text-brand-navy mb-6 flex items-center gap-2">
          <ShoppingCart className="text-indigo-500" /> New Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseStore.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 text-brand-navy">
                <Lock size={100} />
              </div>

              <h3 className="font-bold text-lg text-slate-800 mb-2 relative z-10">
                {course.title}
              </h3>
              <ul className="space-y-2 mb-6 relative z-10">
                {course.features.map((f, i) => (
                  <li
                    key={i}
                    className="text-xs text-slate-500 font-medium flex items-center gap-2"
                  >
                    <div className="w-1 h-1 rounded-full bg-slate-300"></div>{" "}
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between mt-auto relative z-10 pt-4 border-t border-slate-50">
                <span className="text-xl font-black text-brand-navy">
                  {course.price}
                </span>
                <button
                  onClick={() => handleBuy(course.id)}
                  className="px-6 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl text-xs font-black uppercase tracking-wide transition-all"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CoursesTab;
