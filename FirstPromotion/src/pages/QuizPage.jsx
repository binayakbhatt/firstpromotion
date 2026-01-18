import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
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

/**
 * ------------------------------------------------------------------
 * 1. SERVICE LAYER (Mock)
 * ------------------------------------------------------------------
 */
const fetchQuizQuestions = async (topicId, level) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Base questions to simulate real content
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

  const filler = Array.from({ length: 17 }).map((_, i) => ({
    id: i + 4,
    question: `(Topic ${topicId} - Q${i + 4}) Which of the following is a primary duty of a Mail Guard?`,
    options: ["Sorting Mail", "Delivery", "Transmission", "Accounting"],
    correct: 0,
  }));

  return [...baseQuestions, ...filler];
};

/**
 * ------------------------------------------------------------------
 * 2. CUSTOM HOOK: Quiz Engine
 * Encapsulates all state logic, timer, and submission handling.
 * ------------------------------------------------------------------
 */
const useQuizEngine = (questions, topicId, level) => {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 mins

  const totalQuestions = questions.length;
  const isLastQuestion = currentQ === totalQuestions - 1;

  // -- Navigation Logic --
  const nextQuestion = () =>
    setCurrentQ((prev) => Math.min(totalQuestions - 1, prev + 1));
  const prevQuestion = () => setCurrentQ((prev) => Math.max(0, prev - 1));
  const jumpToQuestion = (index) => setCurrentQ(index);

  // -- Interaction Logic --
  const handleOptionSelect = (optionIdx) => {
    setAnswers((prev) => ({ ...prev, [currentQ]: optionIdx }));
  };

  const clearResponse = () => {
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[currentQ];
      return newAnswers;
    });
  };

  const toggleReview = () => {
    setMarkedForReview((prev) =>
      prev.includes(currentQ)
        ? prev.filter((q) => q !== currentQ)
        : [...prev, currentQ],
    );
  };

  // -- Submission Logic --
  const submitTest = useCallback(() => {
    if (!questions.length) return;

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
      topicId,
      score: correctCount * 2,
      maxScore: totalQuestions * 2,
      totalQuestions,
      correct: correctCount,
      wrong: wrongCount,
      skipped: skippedCount,
      level,
      date: new Date().toISOString(),
    };

    navigate("/result", { state: resultData, replace: true });
  }, [answers, level, navigate, questions, topicId, totalQuestions]);

  // -- Timer Logic --
  useEffect(() => {
    if (!questions.length) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questions.length, submitTest]);

  return {
    state: { currentQ, answers, markedForReview, timeLeft, isLastQuestion },
    actions: {
      nextQuestion,
      prevQuestion,
      jumpToQuestion,
      handleOptionSelect,
      clearResponse,
      toggleReview,
      submitTest,
    },
  };
};

/**
 * ------------------------------------------------------------------
 * 3. PRESENTATIONAL COMPONENTS
 * ------------------------------------------------------------------
 */

const QuizHeader = memo(({ title, level, timeLeft, onMenuClick, onExit }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <header className="h-16 bg-brand-navy text-white flex items-center justify-between px-4 md:px-6 shrink-0 z-30 shadow-md">
      <div className="flex items-center gap-4">
        <button
          onClick={onExit}
          className="p-1 hover:bg-white/10 rounded transition-colors"
          aria-label="Exit Quiz"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-black text-lg tracking-wide hidden md:block">
          {title}
        </h1>
        <span className="bg-white/10 px-3 py-1 rounded text-xs font-bold uppercase text-brand-green border border-white/10">
          {level} Level
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div
          className={`flex items-center gap-2 font-mono text-xl font-bold ${timeLeft < 60 ? "text-red-400 animate-pulse" : "text-white"}`}
        >
          <Clock size={20} />
          {formatTime(timeLeft)}
        </div>
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 bg-white/10 rounded-lg active:bg-white/20"
          aria-label="Open Question Palette"
        >
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
});

const QuestionArea = ({
  data,
  currentIndex,
  total,
  selectedOption,
  isMarked,
  onSelect,
  onNext,
  onPrev,
  onReview,
  onClear,
  onSubmit,
  isLast,
}) => {
  if (!data) return null;

  return (
    <main className="flex-1 flex flex-col overflow-y-auto relative z-0">
      {/* Progress Bar */}
      <div className="h-1 w-full bg-slate-200">
        <div
          className="h-full bg-brand-green transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
        />
      </div>

      <div className="p-6 md:p-10 max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <span className="text-slate-400 font-black text-xs uppercase tracking-widest mb-2 block">
            Question {currentIndex + 1} of {total}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug">
            {data.question}
          </h2>
        </div>

        <div className="space-y-4">
          {data.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            return (
              <button
                key={idx}
                onClick={() => onSelect(idx)}
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
                  className={`font-medium ${isSelected ? "text-brand-navy font-bold" : "text-slate-600"}`}
                >
                  {option}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="mt-auto bg-white border-t border-slate-200 p-4 md:p-6 flex items-center justify-between shrink-0 sticky bottom-0 z-10">
        <div className="flex gap-2">
          <button
            onClick={onPrev}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 font-bold text-sm flex items-center gap-2 hover:bg-slate-50 disabled:opacity-50"
          >
            <ChevronLeft size={16} /> Prev
          </button>
          <button
            onClick={onReview}
            className={`px-4 py-2 rounded-lg border font-bold text-sm flex items-center gap-2 transition-colors ${
              isMarked
                ? "bg-purple-100 text-purple-700 border-purple-200"
                : "border-slate-300 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Flag size={16} fill={isMarked ? "currentColor" : "none"} />
            {isMarked ? "Marked" : "Review"}
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClear}
            className="hidden md:block px-4 py-2 text-slate-400 hover:text-red-500 text-sm font-bold transition-colors"
          >
            Clear Response
          </button>
          {isLast ? (
            <button
              onClick={onSubmit}
              className="px-8 py-3 bg-brand-green text-white rounded-xl font-bold text-sm shadow-lg shadow-brand-green/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              Submit <CheckCircle2 size={16} />
            </button>
          ) : (
            <button
              onClick={onNext}
              className="px-8 py-3 bg-brand-navy text-white rounded-xl font-bold text-sm shadow-lg shadow-brand-navy/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              Save & Next <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

const PaletteSidebar = memo(
  ({ isOpen, currentQ, total, answers, marked, onJump, onClose, onSubmit }) => {
    return (
      <>
        {/* Mobile Backdrop */}
        <div
          className={`fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          onClick={onClose}
        />

        {/* Sidebar Panel */}
        <div
          className={`w-80 h-full bg-white border-l border-slate-200 z-50 absolute right-0 top-0 bottom-0 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"} md:static md:translate-x-0 md:shadow-none md:shrink-0 flex flex-col`}
        >
          {/* Header */}
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
              const isCurrent = currentQ === idx;

              let style = "bg-slate-100 text-slate-600 border-slate-200";
              if (isAnswered)
                style = "bg-green-500 text-white border-green-600";
              else if (isMarked)
                style = "bg-purple-500 text-white border-purple-600";
              else if (currentQ > idx && !isAnswered)
                style = "bg-red-50 text-red-500 border-red-200";
              if (isCurrent) style += " ring-2 ring-offset-2 ring-brand-navy";

              return (
                <button
                  key={idx}
                  onClick={() => {
                    onJump(idx);
                    onClose();
                  }}
                  className={`h-10 w-10 rounded-lg font-bold text-sm border flex items-center justify-center transition-all ${style}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Submit Btn */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 mt-auto">
            <button
              onClick={onSubmit}
              className="w-full py-3 bg-brand-green text-white rounded-xl font-black uppercase tracking-widest shadow-lg shadow-brand-green/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Submit Test <CheckCircle2 size={18} />
            </button>
          </div>
        </div>
      </>
    );
  },
);

/**
 * ------------------------------------------------------------------
 * 4. MAIN PAGE CONTAINER
 * Wires the hook and components together.
 * ------------------------------------------------------------------
 */
const QuizPage = () => {
  const navigate = useNavigate();
  const { topicId } = useParams();
  const [searchParams] = useSearchParams();
  const level = searchParams.get("level") || "moderate";
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  // 1. Data Fetching
  const {
    data: questions = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["quizQuestions", topicId, level],
    queryFn: () => fetchQuizQuestions(topicId, level),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  // 2. Logic Hook
  const { state, actions } = useQuizEngine(questions, topicId, level);

  // 3. Handlers
  const handleExit = useCallback(() => {
    navigate("/dashboard", { state: { activeTab: "courses" } });
  }, [navigate]);

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

  return (
    <div className="h-screen w-full flex flex-col bg-slate-50 overflow-hidden">
      <QuizHeader
        title="GDS to MTS Mock Test"
        level={level}
        timeLeft={state.timeLeft}
        onMenuClick={() => setIsPaletteOpen(true)}
        onExit={handleExit}
      />

      <div className="flex flex-1 overflow-hidden relative">
        <QuestionArea
          data={questions[state.currentQ]}
          currentIndex={state.currentQ}
          total={questions.length}
          selectedOption={state.answers[state.currentQ]}
          isMarked={state.markedForReview.includes(state.currentQ)}
          onSelect={actions.handleOptionSelect}
          onNext={actions.nextQuestion}
          onPrev={actions.prevQuestion}
          onReview={actions.toggleReview}
          onClear={actions.clearResponse}
          onSubmit={actions.submitTest}
          isLast={state.isLastQuestion}
        />

        <PaletteSidebar
          isOpen={isPaletteOpen}
          currentQ={state.currentQ}
          total={questions.length}
          answers={state.answers}
          marked={state.markedForReview}
          onJump={actions.jumpToQuestion}
          onClose={() => setIsPaletteOpen(false)}
          onSubmit={actions.submitTest}
        />
      </div>
    </div>
  );
};

export default QuizPage;
