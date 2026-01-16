import React, { useState, useEffect, useCallback } from "react";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
  Menu,
  X,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// --- 1. MOCK API LAYER (Simulating Server) ---
const fetchQuizQuestions = async (topicId, level) => {
  // Simulate Network Latency (e.g., 1.5 seconds)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Throw error simulator (uncomment to test error state)
  // if (Math.random() < 0.1) throw new Error("Failed to fetch questions");

  const baseQuestions = [
    {
      id: 1,
      question:
        "Under which clause of the PO Guide Part 1 are the 'Business Hours' of the Post Office defined?",
      options: ["Clause 1", "Clause 5", "Clause 3", "Clause 8"],
      correct: 1,
    },
    {
      id: 2,
      question:
        "Who is the competent authority to extend the working hours of a Night Post Office?",
      options: [
        "Director General",
        "Head of the Circle (CPMG)",
        "Superintendent of Post Offices",
        "Inspector Posts",
      ],
      correct: 0,
    },
    {
      id: 3,
      question:
        "What is the maximum weight limit for a Book Packet containing periodicals?",
      options: ["2 Kg", "4 Kg", "5 Kg", "10 Kg"],
      correct: 2,
    },
  ];

  // Generate dynamic filler questions based on topicId
  const filler = Array.from({ length: 17 }).map((_, i) => ({
    id: i + 4,
    question: `(Topic ${topicId} - Q${
      i + 4
    }) Which of the following is a primary duty of a Mail Guard?`,
    options: ["Sorting Mail", "Delivery", "Transmission", "Accounting"],
    correct: 0,
  }));

  return [...baseQuestions, ...filler];
};

// --- 2. SUB-COMPONENT: QUESTION PALETTE ---
const QuestionPalette = ({
  current,
  total,
  answers,
  marked,
  onJump,
  onClose,
  onSubmit,
}) => {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Mobile Header */}
      <div className="md:hidden p-4 border-b flex justify-between items-center bg-brand-navy text-white">
        <span className="font-bold">Question Palette</span>
        <button onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      {/* Legend */}
      <div className="p-4 grid grid-cols-2 gap-3 text-[10px] font-bold text-slate-500 border-b border-slate-100 bg-slate-50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" /> Answered
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-100 border border-red-300" />{" "}
          Not Answered
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500" /> Review
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-200" /> Not Visited
        </div>
      </div>

      {/* Grid */}
      <div className="p-4 grid grid-cols-5 gap-3 overflow-y-auto flex-1 content-start custom-scrollbar">
        {Array.from({ length: total }).map((_, idx) => {
          const isAnswered = answers[idx] !== undefined;
          const isMarked = marked.includes(idx);
          const isCurrent = current === idx;

          let style = "bg-slate-100 text-slate-600 border-slate-200";
          if (isAnswered) style = "bg-green-500 text-white border-green-600";
          else if (isMarked)
            style = "bg-purple-500 text-white border-purple-600";
          else if (current > idx && !isAnswered)
            style = "bg-red-50 text-red-500 border-red-200";

          if (isCurrent) style += " ring-2 ring-offset-2 ring-brand-navy";

          return (
            <button
              key={idx}
              onClick={() => onJump(idx)}
              className={`h-10 w-10 rounded-lg font-bold text-sm border flex items-center justify-center transition-all ${style}`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Submit Footer */}
      <div className="p-4 border-t border-slate-200 bg-slate-50 mt-auto">
        <button
          onClick={onSubmit}
          className="w-full py-3 bg-brand-green text-white rounded-xl font-black uppercase tracking-widest shadow-lg shadow-brand-green/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          Submit Test <CheckCircle2 size={18} />
        </button>
      </div>
    </div>
  );
};

// --- 3. MAIN COMPONENT ---
const QuizPage = () => {
  const navigate = useNavigate();
  const { topicId } = useParams(); // Get ID from URL
  const [searchParams] = useSearchParams();
  const level = searchParams.get("level") || "moderate";

  // --- STATE ---
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  // --- TANSTACK QUERY ---
  const {
    data: questions = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["quizQuestions", topicId, level],
    queryFn: () => fetchQuizQuestions(topicId, level),
    staleTime: Infinity, // Questions shouldn't change during the exam
    refetchOnWindowFocus: false, // Don't refetch if user alt-tabs
  });

  const totalQuestions = questions.length;

  // --- SUBMIT LOGIC ---
  const submitTest = useCallback(() => {
    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;

    questions.forEach((q, index) => {
      const userAnswer = answers[index];
      if (userAnswer === undefined) {
        skippedCount++;
      } else if (userAnswer === q.correct) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    const resultData = {
      score: correctCount * 2,
      maxScore: totalQuestions * 2,
      totalQuestions: totalQuestions,
      correct: correctCount,
      wrong: wrongCount,
      skipped: skippedCount,
      level: level,
      date: new Date().toISOString(),
    };

    navigate("/result", { state: resultData, replace: true });
  }, [answers, level, navigate, questions, totalQuestions]);

  // --- TIMER LOGIC ---
  useEffect(() => {
    // Only start timer if data is loaded
    if (isLoading || isError || !questions.length) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitTest(); // Auto-submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitTest, isLoading, isError, questions.length]);

  // --- HELPERS ---
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleOptionSelect = (optionIdx) => {
    setAnswers({ ...answers, [currentQ]: optionIdx });
  };

  const toggleReview = () => {
    setMarkedForReview((prev) =>
      prev.includes(currentQ)
        ? prev.filter((q) => q !== currentQ)
        : [...prev, currentQ]
    );
  };

  // --- LOADING STATE ---
  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 gap-4">
        <Loader2 className="h-10 w-10 text-brand-navy animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">
          Preparing your exam environment...
        </p>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (isError) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 gap-4 p-4 text-center">
        <div className="p-4 bg-red-100 text-red-600 rounded-full">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-800">
          Failed to load quiz
        </h2>
        <p className="text-slate-500 max-w-md">
          {error?.message ||
            "Something went wrong while fetching the questions."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-brand-navy text-white rounded-lg font-bold"
        >
          Try Again
        </button>
      </div>
    );
  }

  // --- MAIN RENDER ---
  const currentQuestionData = questions[currentQ];
  const isLastQuestion = currentQ === totalQuestions - 1;

  return (
    <div className="h-screen w-full flex flex-col bg-slate-50 overflow-hidden">
      {/* 1. Header */}
      <header className="h-16 bg-brand-navy text-white flex items-center justify-between px-4 md:px-6 shrink-0 z-30 shadow-md">
        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              navigate("/dashboard", { state: { activeTab: "courses" } })
            } // <--- THE FIX
            className="p-1 hover:bg-white/10 rounded transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="font-black text-lg tracking-wide hidden md:block">
            GDS to MTS Mock Test
          </h1>
          <span className="bg-white/10 px-3 py-1 rounded text-xs font-bold uppercase text-brand-green border border-white/10">
            {level} Level
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-2 font-mono text-xl font-bold ${
              timeLeft < 60 ? "text-red-400 animate-pulse" : "text-white"
            }`}
          >
            <Clock size={20} />
            {formatTime(timeLeft)}
          </div>
          <button
            onClick={() => setIsPaletteOpen(true)}
            className="md:hidden p-2 bg-white/10 rounded-lg active:bg-white/20"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* 2. Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* LEFT: Question Area */}
        <main className="flex-1 flex flex-col overflow-y-auto relative z-0">
          {/* Progress Bar */}
          <div className="h-1 w-full bg-slate-200">
            <div
              className="h-full bg-brand-green transition-all duration-300"
              style={{ width: `${((currentQ + 1) / totalQuestions) * 100}%` }}
            />
          </div>

          <div className="p-6 md:p-10 max-w-4xl mx-auto w-full">
            {/* Question Text */}
            <div className="mb-8">
              <span className="text-slate-400 font-black text-xs uppercase tracking-widest mb-2 block">
                Question {currentQ + 1} of {totalQuestions}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug">
                {currentQuestionData.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-4">
              {currentQuestionData.options.map((option, idx) => {
                const isSelected = answers[currentQ] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center gap-4 group ${
                      isSelected
                        ? "border-brand-navy bg-indigo-50"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                        isSelected
                          ? "bg-brand-navy border-brand-navy text-white"
                          : "border-slate-300 text-slate-400 group-hover:border-slate-400"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span
                      className={`font-medium ${
                        isSelected
                          ? "text-brand-navy font-bold"
                          : "text-slate-600"
                      }`}
                    >
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Actions Bar */}
          <div className="mt-auto bg-white border-t border-slate-200 p-4 md:p-6 flex items-center justify-between shrink-0 sticky bottom-0 z-10">
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                disabled={currentQ === 0}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 font-bold text-sm flex items-center gap-2 hover:bg-slate-50 disabled:opacity-50"
              >
                <ChevronLeft size={16} /> Prev
              </button>
              <button
                onClick={toggleReview}
                className={`px-4 py-2 rounded-lg border font-bold text-sm flex items-center gap-2 transition-colors ${
                  markedForReview.includes(currentQ)
                    ? "bg-purple-100 text-purple-700 border-purple-200"
                    : "border-slate-300 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Flag
                  size={16}
                  fill={
                    markedForReview.includes(currentQ) ? "currentColor" : "none"
                  }
                />
                {markedForReview.includes(currentQ) ? "Marked" : "Review"}
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() =>
                  setAnswers({ ...answers, [currentQ]: undefined })
                }
                className="hidden md:block px-4 py-2 text-slate-400 hover:text-red-500 text-sm font-bold transition-colors"
              >
                Clear Response
              </button>

              {isLastQuestion ? (
                <button
                  onClick={submitTest}
                  className="px-8 py-3 bg-brand-green text-white rounded-xl font-bold text-sm shadow-lg shadow-brand-green/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  Submit <CheckCircle2 size={16} />
                </button>
              ) : (
                <button
                  onClick={() =>
                    setCurrentQ(Math.min(totalQuestions - 1, currentQ + 1))
                  }
                  className="px-8 py-3 bg-brand-navy text-white rounded-xl font-bold text-sm shadow-lg shadow-brand-navy/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  Save & Next <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        </main>

        {/* RIGHT: Sidebar (Palette) */}

        {/* Mobile Backdrop */}
        {isPaletteOpen && (
          <div
            className="absolute inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
            onClick={() => setIsPaletteOpen(false)}
          />
        )}

        {/* Responsive Palette Container */}
        <div
          className={`
            w-80 h-full bg-white border-l border-slate-200 z-50
            absolute right-0 top-0 bottom-0 shadow-2xl
            transform transition-transform duration-300 ease-in-out
            ${isPaletteOpen ? "translate-x-0" : "translate-x-full"}
            md:static md:translate-x-0 md:shadow-none md:shrink-0
        `}
        >
          <QuestionPalette
            current={currentQ}
            total={totalQuestions}
            answers={answers}
            marked={markedForReview}
            onJump={(idx) => {
              setCurrentQ(idx);
              setIsPaletteOpen(false);
            }}
            onClose={() => setIsPaletteOpen(false)}
            onSubmit={submitTest}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
