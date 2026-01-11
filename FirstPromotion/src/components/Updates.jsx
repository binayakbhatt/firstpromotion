import React, { useState, useEffect } from "react";
import { Bell, Calendar, ChevronRight, Megaphone } from "lucide-react";

/**
 * @typedef {Object} NewsUpdate
 * @property {number} id - Unique identifier for the update.
 * @property {'New' | 'Alert' | 'Result'} tag - Category of the news item.
 * @property {string} text - The main announcement text.
 * @property {string} date - Display date of the update.
 */

/**
 * Latest Updates Section
 * * Optimized for React 19.
 * * Features:
 * - Dynamic data fetching simulation with cleanup.
 * - Skeleton loader for improved User Experience (UX).
 * - Interactive hover states and Lucide icon integration.
 * - Categorized color coding for news tags.
 * * @component
 */
const Updates = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // AbortController or a simple boolean flag to prevent state updates on unmounted components
    let isMounted = true;

    const fetchUpdates = async () => {
      try {
        // Simulate API latency
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const mockData = [
          {
            id: 1,
            tag: "New",
            text: "GDS to MTS/Postman Exam 2026 Notification Released.",
            date: "Jan 05",
          },
          {
            id: 2,
            tag: "Alert",
            text: "Last date to apply for PS Group B is Jan 20th.",
            date: "Jan 02",
          },
          {
            id: 3,
            tag: "Result",
            text: "IPO 2025 Final Merit List is now available.",
            date: "Dec 28",
          },
        ];

        if (isMounted) {
          setUpdates(mockData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch updates:", error);
        if (isMounted) setLoading(false);
      }
    };

    fetchUpdates();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      className="bg-slate-50 py-12 border-b border-slate-200"
      aria-label="Exam Updates"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Status Indicator */}
          <div className="flex items-center gap-3 bg-red-600 text-white px-6 py-4 rounded-2xl font-black text-sm tracking-tighter shadow-lg shadow-red-200 animate-pulse lg:w-48 justify-center shrink-0">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            LATEST NEWS
          </div>

          {/* Main Feed Container */}
          <div className="grow bg-white rounded-2xl border border-slate-200 shadow-sm p-2 md:p-4 flex flex-col justify-center min-h-40">
            {loading ? (
              <LoadingSkeleton />
            ) : (
              <div className="divide-y divide-slate-50">
                {updates.map((item) => (
                  <NewsRow key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Fixed Schedule Sidebar */}
          <aside className="lg:w-72 w-full bg-brand-navy rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
            <Megaphone className="absolute -right-4 -top-4 w-24 h-24 text-white/5 group-hover:rotate-12 transition-transform duration-700" />

            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-green mb-4">
              Upcoming Exams
            </h4>
            <div className="space-y-4 relative z-10">
              <ScheduleItem label="PA/SA LGO" date="Mar 12" />
              <ScheduleItem label="IP Exam" date="Apr 05" />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

/** @private */
const NewsRow = ({ item }) => (
  <div className="flex items-center justify-between group cursor-pointer p-3 hover:bg-slate-50 rounded-xl transition-all duration-300">
    <div className="flex items-center gap-4 truncate">
      <span
        className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md shrink-0 ${
          item.tag === "New"
            ? "bg-green-100 text-brand-green"
            : "bg-blue-100 text-brand-navy"
        }`}
      >
        {item.tag}
      </span>
      <p className="text-slate-700 font-bold group-hover:text-brand-navy transition-colors text-sm md:text-base truncate">
        {item.text}
      </p>
    </div>
    <div className="flex items-center gap-3 shrink-0 ml-4">
      <span className="text-slate-400 text-xs font-mono hidden sm:block">
        {item.date}
      </span>
      <ChevronRight
        size={16}
        className="text-slate-300 group-hover:text-brand-green group-hover:translate-x-1 transition-all"
      />
    </div>
  </div>
);

/** @private */
const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-6 p-4">
    <div className="h-4 bg-slate-100 rounded-full w-3/4"></div>
    <div className="h-4 bg-slate-100 rounded-full w-1/2"></div>
    <div className="h-4 bg-slate-100 rounded-full w-2/3"></div>
  </div>
);

/** @private */
const ScheduleItem = ({ label, date }) => (
  <div className="flex justify-between items-center border-b border-white/10 pb-2 last:border-0 last:pb-0">
    <span className="text-sm font-medium text-slate-200">{label}</span>
    <span className="text-sm font-black text-brand-green bg-brand-green/10 px-2 py-0.5 rounded uppercase">
      {date}
    </span>
  </div>
);

export default Updates;
