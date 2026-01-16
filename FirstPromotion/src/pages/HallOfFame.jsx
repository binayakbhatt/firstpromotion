import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query"; // 1. Import Hook
import { Search, GraduationCap, MapPin, Wifi, WifiOff } from "lucide-react";

/** * LOCAL FALLBACK DATA
 * Shown initially or when offline.
 */
const DUMMY_ACHIEVERS = [
  {
    id: "d1",
    name: "Suresh Prajapati",
    rank: "MTS to Postman (Rank 1)",
    year: "2025",
    circle: "Gujarat Circle",
    quote:
      "The conceptual clarity provided by the video lectures was the key to my success.",
    image: "",
  },
  {
    id: "d2",
    name: "Anjali Menon",
    rank: "GDS to MTS",
    year: "2025",
    circle: "Kerala Circle",
    quote:
      "I passed in my first attempt! The mock test series is a must-have for every aspirant.",
    image: "",
  },
  {
    id: "d3",
    name: "Vikram Singh",
    rank: "Postman to PA/SA",
    year: "2024",
    circle: "Rajasthan Circle",
    quote:
      "Even with a busy duty schedule, I could study effectively using the mobile app notes.",
    image: "",
  },
];

/**
 * FETCH FUNCTION
 */
const fetchAchievers = async () => {
  // Replace with your real API endpoint
  const response = await fetch("https://api.firstpromotion.in/v1/hall-of-fame");

  if (!response.ok) {
    throw new Error("Failed to fetch achievers");
  }

  return response.json();
};

const HallOfFame = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // 2. Use TanStack Query
  const {
    data: serverData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["hallOfFame"],
    queryFn: fetchAchievers,
    staleTime: 1000 * 60 * 10, // Data stays fresh for 10 minutes
    retry: 1, // Retry once before falling back to dummy data
  });

  // 3. Determine Source Data
  // If loading or error, show dummy data. If success, show server data.
  const activeCandidates = isLoading || isError ? DUMMY_ACHIEVERS : serverData;

  // 4. Client-side Filtering
  const filteredCandidates = useMemo(() => {
    return activeCandidates.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.circle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, activeCandidates]);

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-brand-navy pt-24 pb-20 px-6 text-center text-white relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            Hall of <span className="text-brand-green">Fame</span>
          </h1>
          <p className="text-lg md:text-xl font-medium opacity-90">
            Celebrating the achievements of our successful candidates
          </p>

          {/* Connection Status Indicator */}
          <div className="mt-6 flex justify-center">
            {isLoading ? (
              <span className="text-xs font-bold text-slate-300 animate-pulse flex items-center gap-2">
                Connecting to server...
              </span>
            ) : isError ? (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-slate-300">
                <WifiOff size={12} /> Offline Mode (Archived)
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/20 text-brand-green text-xs font-bold">
                <Wifi size={12} /> Live Data
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <section className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100">
          <StatBox number="2,400+" label="Total Selections" />
          <StatBox number="45+" label="Top 100 Ranks" />
          <StatBox number="23" label="Postal Circles" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-16">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by name or circle..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-none shadow-lg focus:ring-2 focus:ring-brand-green outline-none font-medium"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCandidates.map((candidate) => (
            <AchieverCard key={candidate.id} candidate={candidate} />
          ))}
        </div>

        {/* Empty State if search yields no results */}
        {filteredCandidates.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            <p>No achievers found matching "{searchTerm}"</p>
          </div>
        )}
      </section>
    </main>
  );
};

/* --- SUB COMPONENTS --- */

const AchieverCard = ({ candidate }) => (
  <article className="bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-slate-100 group animate-in fade-in duration-500">
    <div className="flex items-center gap-4 mb-4">
      <img
        src={
          candidate.image ||
          `https://ui-avatars.com/api/?name=${candidate.name}&background=10b981&color=fff&bold=true`
        }
        alt={candidate.name}
        className="w-16 h-16 rounded-2xl object-cover"
      />
      <div>
        <h3 className="font-black text-brand-navy text-lg leading-tight">
          {candidate.name}
        </h3>
        <p className="text-brand-green font-bold text-xs uppercase flex items-center gap-1">
          <GraduationCap size={14} /> {candidate.rank}
        </p>
      </div>
    </div>
    <p className="text-slate-600 text-sm italic leading-relaxed mb-6">
      "{candidate.quote}"
    </p>
    <div className="flex justify-between items-center pt-4 border-t border-slate-50">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
        <MapPin size={12} /> {candidate.circle}
      </span>
      <span className="text-[10px] font-black text-slate-900 bg-slate-100 px-2 py-1 rounded">
        BATCH {candidate.year}
      </span>
    </div>
  </article>
);

const StatBox = ({ number, label }) => (
  <div className="bg-white p-8 text-center border-b md:border-b-0 md:border-r last:border-0 border-slate-100">
    <div className="text-4xl font-black text-brand-navy mb-1">{number}</div>
    <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
      {label}
    </div>
  </div>
);

export default HallOfFame;
