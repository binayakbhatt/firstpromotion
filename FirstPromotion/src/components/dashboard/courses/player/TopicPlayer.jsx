import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Loader2,
  AlertCircle,
  PlayCircle,
  FileText,
  BrainCircuit,
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

// Import Sub-Components
import VideoSection from "./VideoSection";
import NotesSection from "./NotesSection";
import QuizSection from "./QuizSection";

// --- MOCK API FETCHER ---
const fetchTopicDetails = async (topicId) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    id: topicId,
    title: "Organization of Department",
    videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
    pdfUrl: "/notes/sample.pdf",
    isCompleted: false,
  };
};

const TopicPlayer = ({ topicId, onBack, user = { name: "Student" } }) => {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);

  // --- NEW: TAB STATE ---
  const [activeTab, setActiveTab] = useState("video"); // 'video', 'notes', or 'quiz'

  // 1. TANSTACK QUERY
  const {
    data: topic,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["topic", topicId],
    queryFn: () => fetchTopicDetails(topicId),
    staleTime: 1000 * 60 * 10,
  });

  // 2. HANDLERS
  const handleMarkComplete = () => {
    setIsCompleted(true);
    const revisionDate = new Date();
    revisionDate.setDate(revisionDate.getDate() + 3);
    const dateString = revisionDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    toast.success(
      <div className="text-sm">
        <span className="font-bold block">Topic Completed!</span>
        <span className="text-xs opacity-90">Next revision: {dateString}</span>
      </div>,
      { duration: 4000, icon: "🎉" }
    );
  };

  const handleStartQuiz = (difficulty) => {
    // Navigates only when a difficulty card is explicitly clicked
    navigate(`/quiz/${topicId}?level=${difficulty}`);
  };

  // 3. LOADING STATE
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-400">
        <Loader2 className="animate-spin text-brand-green" size={40} />
        <p className="font-bold">Loading Class...</p>
      </div>
    );
  }

  // 4. ERROR STATE
  if (isError) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-red-400">
        <AlertCircle size={40} />
        <p className="font-bold">Failed to load topic.</p>
        <button onClick={onBack} className="text-slate-600 underline text-sm">
          Go Back
        </button>
      </div>
    );
  }

  // 5. RENDER
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <Toaster position="bottom-center" />

      {/* Navigation Header */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-brand-navy font-bold text-sm transition-colors"
      >
        <ArrowLeft size={18} /> Back to Syllabus
      </button>

      {/* --- TAB NAVIGATION --- */}
      <div className="bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("video")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === "video"
              ? "bg-brand-navy text-white shadow-md"
              : "text-slate-500 hover:bg-slate-50"
          }`}
        >
          <PlayCircle size={18} />{" "}
          <span className="hidden md:inline">Video Class</span>
        </button>

        <button
          onClick={() => setActiveTab("notes")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === "notes"
              ? "bg-brand-navy text-white shadow-md"
              : "text-slate-500 hover:bg-slate-50"
          }`}
        >
          <FileText size={18} />{" "}
          <span className="hidden md:inline">Study Notes</span>
        </button>

        <button
          onClick={() => setActiveTab("quiz")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === "quiz"
              ? "bg-brand-navy text-white shadow-md"
              : "text-slate-500 hover:bg-slate-50"
          }`}
        >
          <BrainCircuit size={18} />{" "}
          <span className="hidden md:inline">Take Quiz</span>
        </button>
      </div>

      {/* --- CONTENT AREA (Conditionally Rendered) --- */}
      <div className="min-h-[400px]">
        {activeTab === "video" && (
          <VideoSection title={topic.title} videoUrl={topic.videoUrl} />
        )}

        {activeTab === "notes" && <NotesSection username={user.name} />}

        {activeTab === "quiz" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <QuizSection onStartQuiz={handleStartQuiz} />
          </div>
        )}
      </div>

      {/* Completion Action */}
      <div className="flex justify-end pt-6 border-t border-slate-100">
        <button
          onClick={handleMarkComplete}
          disabled={isCompleted}
          className={`flex items-center gap-2 px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${
            isCompleted
              ? "bg-green-100 text-green-600 cursor-default"
              : "bg-brand-green text-white shadow-xl shadow-brand-green/30 hover:bg-emerald-600 hover:scale-105 active:scale-95"
          }`}
        >
          {isCompleted ? (
            <>
              {" "}
              <CheckCircle2 size={18} /> Completed{" "}
            </>
          ) : (
            <>
              Mark as Complete
              <span className="ml-2 text-[10px] bg-white/20 px-2 py-0.5 rounded text-white/90 normal-case tracking-normal">
                +10 XP
              </span>
            </>
          )}
        </button>
      </div>

      {isCompleted && (
        <div className="flex justify-end">
          <p className="text-xs font-bold text-slate-400 flex items-center gap-1 animate-in fade-in">
            <Calendar size={12} /> Next Revision scheduled automatically
          </p>
        </div>
      )}
    </div>
  );
};

export default TopicPlayer;
