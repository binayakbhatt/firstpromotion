import React from "react";
import { CheckCircle2, XCircle, AlertCircle, MinusCircle } from "lucide-react";

const DetailedAnalysis = ({ questions, answers }) => {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold text-brand-navy mb-6 uppercase tracking-wider">
        Detailed Analysis
      </h3>
      
      <div className="space-y-6">
        {questions.map((q, index) => {
          const userAnswer = answers[index];
          const isCorrect = userAnswer === q.correct;
          const isSkipped = userAnswer === undefined;
          
          let statusColor = "border-slate-200 bg-white";
          let statusIcon = <MinusCircle className="text-slate-400" size={20} />;
          
          if (isCorrect) {
            statusColor = "border-green-200 bg-green-50/50";
            statusIcon = <CheckCircle2 className="text-green-500" size={20} />;
          } else if (!isSkipped) {
            statusColor = "border-red-200 bg-red-50/50";
            statusIcon = <XCircle className="text-red-500" size={20} />;
          } else {
             statusIcon = <AlertCircle className="text-orange-400" size={20} />;
          }

          return (
            <div 
              key={index} 
              className={`rounded-2xl border p-6 transition-all ${statusColor}`}
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="font-mono text-sm font-bold text-slate-400 mt-1">
                  Q{index + 1}.
                </span>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800 text-lg leading-snug">
                    {q.question}
                  </h4>
                </div>
                <div className="shrink-0">
                  {statusIcon}
                </div>
              </div>

              <div className="space-y-3 pl-0 md:pl-10">
                {q.options.map((option, optIdx) => {
                  const isOptionSelected = userAnswer === optIdx;
                  const isOptionCorrect = q.correct === optIdx;
                  
                  let optionStyle = "border-slate-200 bg-white text-slate-600";
                  
                  if (isOptionCorrect) {
                    optionStyle = "border-green-500 bg-green-100 text-green-800 font-bold ring-1 ring-green-500";
                  } else if (isOptionSelected && !isCorrect) {
                    optionStyle = "border-red-500 bg-red-100 text-red-800 font-bold";
                  }

                  return (
                    <div 
                      key={optIdx}
                      className={`p-3 rounded-lg border text-sm flex items-center gap-3 ${optionStyle}`}
                    >
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs shrink-0 ${
                        isOptionCorrect 
                          ? "border-green-600 bg-green-600 text-white" 
                          : isOptionSelected 
                            ? "border-red-600 bg-red-600 text-white"
                            : "border-slate-300 text-slate-400"
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span>{option}</span>
                      {isOptionCorrect && <span className="ml-auto text-xs font-bold uppercase text-green-600">Correct Answer</span>}
                      {isOptionSelected && !isCorrect && <span className="ml-auto text-xs font-bold uppercase text-red-600">Your Answer</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailedAnalysis;
