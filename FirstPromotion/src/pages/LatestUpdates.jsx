import React from "react";
import { useQuery } from "@tanstack/react-query"; // 1. Import Hook
import {
  Bell,
  Calendar,
  ArrowRight,
  Loader2,
  WifiOff,
  RefreshCcw,
  Megaphone,
} from "lucide-react";

/**
 * MOCK DATA / ARCHIVED UPDATES
 * Used as fallback when the API is unreachable
 */
const ARCHIVED_UPDATES = [
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
];

/**
 * FETCH FUNCTION
 */
const fetchUpdates = async () => {
  // Replace with your actual backend URL
  const response = await fetch("https://api.firstpromotion.in/v1/updates");

  if (!response.ok) {
    throw new Error("Could not sync with update server");
  }

  return response.json();
};

const LatestUpdates = () => {
  // 2. Use TanStack Query
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["departmentalUpdates"],
    queryFn: fetchUpdates,
    refetchInterval: 1000 * 60 * 5, // Auto-refresh every 5 minutes
    retry: 1, // Retry once before showing error
    refetchOnWindowFocus: true, // Refresh when user comes back to tab
  });

  // Determine which data to show: Real data or Fallback
  const displayUpdates = isError ? ARCHIVED_UPDATES : data;

  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic Header */}
      <header className="bg-brand-navy pt-24 pb-32 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <Megaphone className="absolute -left-10 top-10 w-64 h-64 -rotate-12" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Live Badge - Shows 'Syncing...' when refetching in background */}
          <div className="inline-flex items-center gap-2 bg-brand-green/20 text-brand-green px-4 py-1.5 rounded-full text-xs font-black uppercase mb-6 tracking-widest">
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75 ${
                  isFetching ? "animate-ping" : ""
                }`}
              ></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
            </span>
            {isFetching ? "Syncing..." : "Live Updates"}
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
          {/* Loading State (Initial Load Only) */}
          {isLoading && (
            <div className="bg-white p-12 rounded-[2.5rem] shadow-xl text-center flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-brand-green" size={40} />
              <p className="font-bold text-slate-400">
                Fetching latest circulars...
              </p>
            </div>
          )}

          {/* Error Banner - Shows retry button */}
          {isError && (
            <div className="flex items-center justify-between bg-amber-50 border border-amber-100 p-4 rounded-2xl mb-4 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-3 text-amber-700 font-bold text-sm">
                <WifiOff size={18} />
                <span>Connection failed. Showing archived updates.</span>
              </div>
              <button
                onClick={() => refetch()}
                disabled={isFetching}
                className={`text-amber-700 transition-all duration-500 p-2 hover:bg-amber-100 rounded-full ${
                  isFetching ? "animate-spin opacity-50" : "hover:rotate-180"
                }`}
              >
                <RefreshCcw size={18} />
              </button>
            </div>
          )}

          {/* Updates List */}
          {!isLoading &&
            displayUpdates?.map((update) => (
              <UpdateCard key={update.id} update={update} />
            ))}

          {/* Empty State Safety Check */}
          {!isLoading && !isError && displayUpdates?.length === 0 && (
            <div className="text-center p-10 text-slate-400 font-bold">
              No updates found.
            </div>
          )}
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
