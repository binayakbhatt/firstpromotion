import React from "react";
import { BrainCircuit, Trophy, Flame } from "lucide-react";

const QuizLevelCard = ({
  level,
  icon: Icon,
  color,
  questionCount,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="flex-1 flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 transition-all group"
  >
    <div
      className={`p-3 rounded-full ${color} text-white shadow-md group-hover:scale-110 transition-transform`}
    >
      <Icon size={20} />
    </div>
    <div className="text-center">
      <h4 className="font-black text-brand-navy text-sm uppercase tracking-wider">
        {level}
      </h4>
      <p className="text-xs text-slate-400 font-bold">
        {questionCount} Questions
      </p>
    </div>
  </button>
);

const QuizSection = ({ onStartQuiz }) => {
  return (
    <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 animate-in slide-in-from-bottom-8 duration-700">
      <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">
        Test Your Knowledge
      </h3>
      <div className="flex flex-col md:flex-row gap-4">
        <QuizLevelCard
          level="Easy"
          icon={BrainCircuit}
          color="bg-green-500"
          questionCount={10}
          onClick={() => onStartQuiz("easy")}
        />
        <QuizLevelCard
          level="Moderate"
          icon={Trophy}
          color="bg-blue-500"
          questionCount={15}
          onClick={() => onStartQuiz("moderate")}
        />
        <QuizLevelCard
          level="Hard"
          icon={Flame}
          color="bg-red-500"
          questionCount={20}
          onClick={() => onStartQuiz("hard")}
        />
      </div>
    </div>
  );
};

export default QuizSection;
