import React, { useState, useEffect, useMemo } from "react";
import {
  Bell,
  Calendar,
  ArrowRight,
  Newspaper,
  Loader2,
  WifiOff,
  RefreshCcw,
  Megaphone,
} from "lucide-react";

/**
 * Latest Updates Component
 * Optimized for real-time departmental announcements.
 */
const LatestUpdates = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUpdates = async (signal) => {
    try {
      setLoading(true);
      // Replace with your actual backend URL when ready
      const response = await fetch("https://api.firstpromotion.in/v1/updates", {
        signal,
      });

      if (!response.ok) throw new Error("Could not sync with update server");

      const data = await response.json();
      setUpdates(data);
      setError(null);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError("Currently showing archived updates.");
        // Fallback dummy data for UI development
        setUpdates([
          {
            id: 1,
            title: "GDS to MTS 2026 Exam Date Announced",
            description:
              "The official notification for the GDS to MTS promotion exam has been released. Exams are scheduled for March 15th.",
            date: "Jan 10, 2026",
            tag: "Exam Alert",
            priority: "high",
          },
          {
            id: 2,
            title: "New Study Material for PA/SA Exam",
            description:
              "We have uploaded fresh mock tests covering the latest PO Guide Part II updates.",
            date: "Jan 08, 2026",
            tag: "New Content",
            priority: "normal",
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchUpdates(controller.signal);
    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic Header */}
      <header className="bg-brand-navy pt-24 pb-32 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <Megaphone className="absolute -left-10 top-10 w-64 h-64 -rotate-12" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-brand-green/20 text-brand-green px-4 py-1.5 rounded-full text-xs font-black uppercase mb-6 tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
            </span>
            Live Updates
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            Stay <span className="text-brand-green">Ahead</span>
          </h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            Get the latest notifications, exam schedules, and departmental
            results delivered instantly.
          </p>
        </div>
      </header>

      {/* Updates List Section */}
      <section className="max-w-4xl mx-auto px-6 -mt-16 pb-24 relative z-20">
        <div className="flex flex-col gap-6">
          {loading && (
            <div className="bg-white p-12 rounded-[2.5rem] shadow-xl text-center flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-brand-green" size={40} />
              <p className="font-bold text-slate-400">
                Fetching latest circulars...
              </p>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-between bg-amber-50 border border-amber-100 p-4 rounded-2xl mb-4">
              <div className="flex items-center gap-3 text-amber-700 font-bold text-sm">
                <WifiOff size={18} /> {error}
              </div>
              <button
                onClick={() => fetchUpdates()}
                className="text-amber-700 hover:rotate-180 transition-transform duration-500"
              >
                <RefreshCcw size={18} />
              </button>
            </div>
          )}

          {!loading &&
            updates.map((update) => (
              <UpdateCard key={update.id} update={update} />
            ))}
        </div>
      </section>
    </div>
  );
};

/**
 * Individual Update Card
 */
const UpdateCard = ({ update }) => (
  <article
    className={`bg-white p-8 rounded-[2.5rem] shadow-lg border-2 transition-all duration-300 hover:shadow-2xl flex flex-col md:flex-row gap-6 items-start ${
      update.priority === "high" ? "border-brand-green/20" : "border-slate-50"
    }`}
  >
    <div
      className={`p-4 rounded-2xl shrink-0 ${
        update.priority === "high"
          ? "bg-brand-green/10 text-brand-green"
          : "bg-slate-100 text-slate-400"
      }`}
    >
      <Bell
        size={24}
        className={update.priority === "high" ? "animate-bounce" : ""}
      />
    </div>

    <div className="grow">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span className="bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
          {update.tag}
        </span>
        <span className="text-slate-400 text-xs font-bold flex items-center gap-1">
          <Calendar size={14} /> {update.date}
        </span>
      </div>

      <h3 className="text-xl md:text-2xl font-black text-brand-navy mb-3">
        {update.title}
      </h3>

      <p className="text-slate-600 text-sm leading-relaxed mb-6">
        {update.description}
      </p>

      <button className="inline-flex items-center gap-2 text-brand-green font-black text-xs uppercase tracking-widest hover:gap-4 transition-all">
        View Details <ArrowRight size={16} />
      </button>
    </div>
  </article>
);

export default LatestUpdates;
