import React, { useState } from "react";
import { Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Import Components
import DemoUnlockForm from "../components/demo/DemoUnlockForm";
import DemoVideoPlayer from "../components/demo/DemoVideoPlayer";

const DemoPage = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleUnlock = (formData) => {
    setLoading(true);

    // 1. Capture the selected course
    setSelectedCourse(formData.course);

    // 2. TODO: Send 'formData' to your Backend/CRM here (Lead Generation)
    console.log("Lead Captured:", formData);

    // 3. Simulate API delay & Unlock
    setTimeout(() => {
      setLoading(false);
      setIsUnlocked(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 flex flex-col items-center">
      {/* Back Button */}
      <div className="w-full max-w-5xl mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-brand-navy transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>

      {/* Header */}
      <div className="text-center max-w-2xl mb-8">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-brand-navy border border-slate-200 font-black text-[10px] uppercase tracking-widest mb-4 shadow-sm">
          <Sparkles size={12} className="text-brand-green" /> Free Preview Mode
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-brand-navy mb-3 tracking-tight">
          {isUnlocked ? "Enjoy Your Class" : "Select Your Course"}
        </h1>
        <p className="text-slate-500 font-medium text-sm md:text-base">
          {isUnlocked
            ? "Watch this exclusive preview from our premium batch."
            : "Choose the exam you are preparing for to see relevant content."}
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden relative">
        {!isUnlocked ? (
          <DemoUnlockForm onUnlock={handleUnlock} loading={loading} />
        ) : (
          <DemoVideoPlayer courseName={selectedCourse} />
        )}
      </div>
    </div>
  );
};

export default DemoPage;
