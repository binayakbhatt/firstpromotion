import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Lightbulb, Play, Clock, BarChart } from "lucide-react";

const VideoSection = ({ videoUrl, title }) => {
  // --- MOCK PLAYLIST GENERATOR ---
  // In a real app, this array would come from your backend (e.g., topic.videos)
  // We automatically split the "Main Topic" into bite-sized 6-10 min chunks.
  const playlist = [
    {
      id: 1,
      title: "Part 1: Core Concepts & Definitions",
      duration: "08:30",
      url: videoUrl, // Using same URL for demo
      difficulty: "Easy",
    },
    {
      id: 2,
      title: "Part 2: Operational Rules & Guidelines",
      duration: "06:45",
      url: videoUrl,
      difficulty: "Medium",
    },
    {
      id: 3,
      title: "Part 3: Common Exceptions & Examples",
      duration: "09:20",
      url: videoUrl,
      difficulty: "Hard",
    },
    {
      id: 4,
      title: "Part 4: Summary & Key Takeaways",
      duration: "05:15",
      url: videoUrl,
      difficulty: "Easy",
    },
  ];

  const [activeVideo, setActiveVideo] = useState(playlist[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
      {/* --- LEFT: MAIN PLAYER (Takes up 2 columns) --- */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-black text-brand-navy leading-tight">
            {activeVideo.title}
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-500">{title}</span>
            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              <Lightbulb size={12} className="text-yellow-500" />
              <span>Focus Mode: {activeVideo.duration}</span>
            </div>
          </div>
        </div>

        <div className="relative pt-[56.25%] bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-slate-900 group">
          <ReactPlayer
            key={activeVideo.id} // Forces player to reload on change
            url={activeVideo.url}
            className="absolute top-0 left-0"
            width="100%"
            height="100%"
            controls={true}
            playing={true} // Auto-play when switching parts
          />
        </div>
      </div>

      {/* --- RIGHT: BITE-SIZED GALLERY (Playlist) --- */}
      <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col h-full">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <BarChart size={16} /> Micro-Modules
        </h3>

        <div className="space-y-3 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
          {playlist.map((video, index) => {
            const isActive = activeVideo.id === video.id;

            return (
              <button
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 group ${
                  isActive
                    ? "bg-brand-navy text-white border-brand-navy shadow-lg shadow-brand-navy/20 scale-105 z-10"
                    : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-md"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    Part 0{index + 1}
                  </span>
                  {isActive && (
                    <div className="animate-pulse w-2 h-2 bg-green-400 rounded-full"></div>
                  )}
                </div>

                <h4
                  className={`font-bold text-sm leading-snug mb-3 ${
                    isActive ? "text-white" : "text-brand-navy"
                  }`}
                >
                  {video.title}
                </h4>

                <div
                  className={`flex items-center gap-4 text-xs font-medium ${
                    isActive ? "text-slate-300" : "text-slate-400"
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {video.duration}
                  </span>
                  {isActive ? (
                    <span className="flex items-center gap-1 text-brand-green font-bold bg-brand-green/10 px-2 py-0.5 rounded">
                      Now Playing
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-brand-navy">
                      <Play size={14} fill="currentColor" /> Play
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
