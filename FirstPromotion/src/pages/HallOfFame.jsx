import React, { useState, useEffect, useMemo } from "react";
import {
  Trophy,
  Medal,
  Star,
  Search,
  GraduationCap,
  MapPin,
  Loader2,
  WifiOff,
} from "lucide-react";

/** * Local Fallback Data
 * This shows immediately and stays if the server is unreachable.
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

const HallOfFame = () => {
  // 1. Initialize with dummy data so the page isn't empty
  const [candidates, setCandidates] = useState(DUMMY_ACHIEVERS);
  const [loading, setLoading] = useState(false);
  const [isLive, setIsLive] = useState(false); // Tracks if data came from server
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchLiveAchievers = async () => {
      try {
        setLoading(true);
        // Replace with your real API when ready
        const response = await fetch(
          "https://api.firstpromotion.in/v1/hall-of-fame",
          {
            signal: controller.signal,
          }
        );

        if (response.ok) {
          const data = await response.json();
          setCandidates(data);
          setIsLive(true); // Successfully connected to server
        }
      } catch (err) {
        console.log("Using offline/dummy data due to connection error.");
        setIsLive(false); // Keep showing dummy data
      } finally {
        setLoading(false);
      }
    };

    fetchLiveAchievers();
    return () => controller.abort();
  }, []);

  const filteredCandidates = useMemo(() => {
    return candidates.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.circle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, candidates]);

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-brand-navy pt-24 pb-20 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            Hall of <span className="text-brand-green">Fame</span>
          </h1>
          <p className="text-lg md:text-xl font-medium opacity-90">
            Celebrating the achievements of our successful candidates
          </p>
        </div>
      </header>
      {/* Stats Bar */}
      <section className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100">
          <StatBox number="2,400+" label="Total Selections" />
          <StatBox number="45+" label="Top 100 Ranks" />
          <StatBox number="18" label="Postal Circles" />
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

        {loading && (
          <div className="text-center mb-8 animate-pulse text-slate-400">
            Updating list...
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCandidates.map((candidate) => (
            <AchieverCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </section>
    </main>
  );
};

const AchieverCard = ({ candidate }) => (
  <article className="bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
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

/**
 * StatBox Sub-component
 * Used to display the highlight metrics at the top of the page.
 */
const StatBox = ({ number, label }) => (
  <div className="bg-white p-8 text-center border-b md:border-b-0 md:border-r last:border-0 border-slate-100">
    <div className="text-4xl font-black text-brand-navy mb-1">{number}</div>
    <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
      {label}
    </div>
  </div>
);

export default HallOfFame;
