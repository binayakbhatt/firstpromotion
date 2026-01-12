import React, { useState, useEffect, useRef } from "react";
import { PhoneCall, Timer, RefreshCw } from "lucide-react";

const MissedCallVerification = ({ onVerified }) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [simulatedNumber, setSimulatedNumber] = useState("");
  const codeRefs = useRef([]);

  const triggerMissedCall = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const fullNumber = `+91 140 23${randomNum}`;
    setSimulatedNumber(fullNumber);
    setTimeout(() => {
      alert(`📞 Missed Call from: ${fullNumber}\n\nEnter last 4 digits.`);
    }, 3000);
  };

  useEffect(() => {
    triggerMissedCall();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newCode = [...code];
    newCode[index] = value.substring(value.length - 1);
    setCode(newCode);
    if (value && index < 3) codeRefs.current[index + 1].focus();
  };

  const handleConfirm = () => {
    if (simulatedNumber.endsWith(code.join(""))) {
      onVerified();
    } else {
      alert("Incorrect digits. Please check the missed call number.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[3.5rem] p-10 shadow-2xl text-center border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-navy via-brand-green to-brand-navy"></div>
        <div className="w-20 h-20 bg-brand-navy/5 text-brand-navy rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <PhoneCall size={32} />
        </div>
        <h2 className="text-2xl font-black text-brand-navy mb-2">
          Verification Call
        </h2>
        <p className="text-slate-500 text-sm mb-8 font-medium">
          Enter the{" "}
          <span className="text-brand-green font-bold">Last 4 Digits</span> of
          the caller.
        </p>

        <div className="flex justify-center gap-3 mb-8">
          {code.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (codeRefs.current[idx] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              className="w-14 h-16 text-3xl font-black text-center bg-slate-50 border-2 border-slate-200 focus:border-brand-navy rounded-2xl outline-none"
              placeholder="•"
            />
          ))}
        </div>

        <button
          onClick={handleConfirm}
          className="w-full py-4 bg-brand-navy text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all mb-6"
        >
          Verify Number
        </button>

        <div className="text-xs font-bold text-slate-400">
          {timer > 0 ? (
            <span className="flex items-center justify-center gap-2">
              <Timer size={14} /> Expect call in {timer}s
            </span>
          ) : (
            <button
              onClick={() => {
                setTimer(30);
                triggerMissedCall();
              }}
              className="text-brand-green underline flex items-center justify-center gap-2 mx-auto"
            >
              <RefreshCw size={14} /> Request Call Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MissedCallVerification;
