import React, { useState } from "react";
import { User, Phone, Unlock, Lock, GraduationCap } from "lucide-react";
import { DEMO_COURSES } from "../../data/demoData";

const DemoUnlockForm = ({ onUnlock, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    course: "", // Crucial: The user must select this
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUnlock(formData);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-12 p-8 md:p-16">
      {/* Left Side: Visual Hook */}
      <div className="w-full md:w-1/2 relative group hidden md:block">
        <div className="aspect-square max-w-sm mx-auto bg-slate-900 rounded-[2rem] flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy to-black opacity-90"></div>
          <div className="relative z-10 w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 mb-6">
            <Lock className="text-white" size={32} />
          </div>
          <p className="relative z-10 text-center text-slate-300 font-bold uppercase tracking-widest text-sm">
            Premium Content
            <br />
            Locked
          </p>
        </div>
      </div>

      {/* Right Side: The Form */}
      <div className="w-full md:w-1/2">
        <h3 className="text-2xl font-black text-brand-navy mb-2">
          Unlock Free Demo
        </h3>
        <p className="text-slate-500 text-sm mb-8 font-medium">
          Select your target exam and enter details to watch the class
          instantly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Input */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Full Name
            </label>
            <div className="relative group">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-green"
                size={18}
              />
              <input
                required
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-transparent focus:border-brand-green rounded-xl outline-none font-bold text-slate-700 transition-all"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>

          {/* Mobile Input */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Mobile Number
            </label>
            <div className="relative group">
              <Phone
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-green"
                size={18}
              />
              <input
                required
                type="tel"
                pattern="[0-9]{10}"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-transparent focus:border-brand-green rounded-xl outline-none font-bold text-slate-700 transition-all"
                placeholder="9876543210"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
              />
            </div>
          </div>

          {/* Course Selector */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Select Exam
            </label>
            <div className="relative group">
              <GraduationCap
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-green"
                size={18}
              />
              <select
                required
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-transparent focus:border-brand-green rounded-xl outline-none font-bold text-slate-700 appearance-none transition-all cursor-pointer"
                value={formData.course}
                onChange={(e) =>
                  setFormData({ ...formData, course: e.target.value })
                }
              >
                <option value="">Choose Course...</option>
                {Object.keys(DEMO_COURSES).map((courseName) => (
                  <option key={courseName} value={courseName}>
                    {courseName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full mt-2 py-4 bg-brand-navy hover:bg-slate-800 text-white rounded-xl font-black uppercase text-xs tracking-[0.2em] transition-all flex justify-center items-center gap-2 shadow-lg hover:shadow-xl translate-y-0 hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {loading ? (
              "Verifying..."
            ) : (
              <>
                <Unlock size={16} /> Unlock Class
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DemoUnlockForm;
