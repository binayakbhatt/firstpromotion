import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { Calendar, Award, BookOpen } from "lucide-react";

// Components
// Components
import ScoreGauge from "../components/quiz/results/ScoreGauge";
import PerformanceStats from "../components/quiz/results/PerformanceStats";
import ActionFooter from "../components/quiz/results/ActionFooter";
import DetailedAnalysis from "../components/quiz/results/DetailedAnalysis";

const ResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // 1. Redirect if accessed directly without state
  if (!state) {
    return <Navigate to="/dashboard" replace />;
  }

  const {
    score,
    maxScore,
    totalQuestions,
    correct,
    wrong,
    skipped,
    level,
    date,
    questions,
    answers,
  } = state;

  // 2. Derived Metrics
  const percentage = Math.round((score / maxScore) * 100);
  const isPassed = percentage >= 40; // Assuming 40% passing
  const accuracy =
    totalQuestions > 0
      ? Math.round((correct / (correct + wrong)) * 100) || 0
      : 0;

  // Format Date safely
  const formattedDate = useMemo(() => {
    try {
      return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (e) {
      return "Just now";
    }
  }, [date]);

  // 3. Handlers
  const handleRetry = () => {
    if (state?.topicId) {
      navigate(`/quiz/${state.topicId}?level=${state.level || "moderate"}`, {
        replace: true,
      });
    } else {
      // Fallback only if data is corrupted/missing
      console.warn("Retry failed: Missing topicId in result state");
      navigate("/dashboard", { state: { activeTab: "courses" } });
    }
  };

  const handleHome = () => {
    navigate("/dashboard", { state: { activeTab: "overview" } });
  };

  // Sound effect or analytics could go here in useEffect

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-32">
      <Toaster position="bottom-center" />

      {/* --- HEADER --- */}
      <header className="bg-brand-navy pt-12 pb-32 px-6 relative overflow-hidden text-center rounded-b-[3rem]">
        <div className="relative z-10">
          <h1 className="text-white text-lg font-bold opacity-80 uppercase tracking-widest mb-2">
            Result Summary
          </h1>
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-3 py-1 rounded-full text-xs font-bold border border-white/10">
            <Calendar size={12} /> {formattedDate}
          </div>
        </div>

        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-green rounded-full blur-3xl"></div>
          <div className="absolute top-20 -left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
      </header>

      {/* --- MAIN CARD --- */}
      <main className="max-w-2xl mx-auto px-6 -mt-20 relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-8 md:p-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Score Visualization */}
          <ScoreGauge score={score} total={maxScore} passed={isPassed} />

          <div className="w-full h-px bg-slate-100 my-8"></div>

          {/* Stats Grid */}
          <PerformanceStats
            correct={correct}
            wrong={wrong}
            skipped={skipped}
            total={totalQuestions}
            accuracy={accuracy}
          />

          {/* Insights / Motivation */}
          <div className="mt-8 bg-slate-50 rounded-2xl p-5 border border-slate-100 flex gap-4 items-start">
            <div
              className={`p-3 rounded-full shrink-0 ${isPassed ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"}`}
            >
              {isPassed ? <Award size={24} /> : <BookOpen size={24} />}
            </div>
            <div>
              <h4 className="font-bold text-brand-navy text-sm mb-1">
                {isPassed ? "Promotion Ready!" : "Focus Area Detected"}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isPassed
                  ? "You have cleared the cut-off for this module. Try attempting the 'Hard' difficulty level next to secure your rank."
                  : "Review the 'Wrong' answers in the study material section. Specifically, revise PO Guide Part 1 Clauses 1-15."}
              </p>
            </div>
          </div>
          
          {/* Detailed Analysis */}
          <DetailedAnalysis questions={questions} answers={answers} />
        </div>
      </main>

      {/* --- FOOTER ACTIONS --- */}
      <ActionFooter onRetry={handleRetry} onHome={handleHome} />
    </div>
  );
};

export default ResultPage;
