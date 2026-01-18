import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast, Toaster } from "react-hot-toast";
import {
  Mail,
  ArrowRight,
  Loader2,
  KeyRound,
  CheckCircle2,
  Lock,
  ChevronLeft,
  Circle, // Added for requirement bullets
} from "lucide-react";
import {
  requestPasswordReset,
  confirmPasswordReset,
} from "../services/authService";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("REQUEST"); // 'REQUEST' | 'VERIFY'
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  // --- PASSWORD STRENGTH STATE ---
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    number: false,
    symbol: false,
    match: false,
  });

  // --- EFFECT: REAL-TIME VALIDATION ---
  useEffect(() => {
    const pwd = formData.newPassword || "";
    const confirm = formData.confirmPassword || "";

    setPasswordCriteria({
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      number: /\d/.test(pwd),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
      match: pwd.length > 0 && pwd === confirm,
    });
  }, [formData.newPassword, formData.confirmPassword]);

  // Calculate strength score (0-5)
  const criteriaCount = Object.values(passwordCriteria).filter(Boolean).length;

  // --- MUTATION 1: REQUEST OTP ---
  const requestMutation = useMutation({
    mutationFn: requestPasswordReset,
    onSuccess: () => {
      toast.success(`OTP sent to ${formData.email}`);
      setStep("VERIFY");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send OTP");
    },
  });

  // --- MUTATION 2: CONFIRM RESET ---
  const confirmMutation = useMutation({
    mutationFn: confirmPasswordReset,
    onSuccess: () => {
      toast.success("Password reset successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    },
    onError: (error) => {
      toast.error(error.message || "Reset failed");
    },
  });

  // --- HANDLERS ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRequestOtp = (e) => {
    e.preventDefault();
    if (!formData.email) return toast.error("Email is required");
    requestMutation.mutate(formData.email);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();

    // Strict Validation before submission
    if (!passwordCriteria.length) return toast.error("Password is too short");
    if (!passwordCriteria.match) return toast.error("Passwords do not match");

    // Optional: Enforce all criteria
    const isStrong = Object.values(passwordCriteria).every(Boolean);
    if (!isStrong) return toast.error("Please meet all password requirements");

    confirmMutation.mutate({
      email: formData.email,
      otp: formData.otp,
      newPassword: formData.newPassword,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Toaster position="top-center" />

      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-brand-navy p-8 text-center relative">
          <Link
            to="/login"
            className="absolute left-4 top-4 text-white/60 hover:text-white transition-colors"
          >
            <ChevronLeft size={24} />
          </Link>
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <KeyRound className="text-brand-green" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {step === "REQUEST" ? "Forgot Password?" : "Reset Password"}
          </h1>
          <p className="text-brand-green text-sm font-medium">
            {step === "REQUEST"
              ? "No worries, we'll send you reset instructions."
              : `Enter the OTP sent to ${formData.email}`}
          </p>
        </div>

        <div className="p-8">
          {step === "REQUEST" ? (
            /* --- STEP 1: EMAIL FORM --- */
            <form onSubmit={handleRequestOtp} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-navy transition-colors"
                    size={20}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your registered email"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleRequestOtp}
                disabled={requestMutation.isPending}
                className="w-full bg-brand-navy text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-brand-navy/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {requestMutation.isPending ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    Send OTP <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* --- STEP 2: OTP & NEW PASSWORD FORM --- */
            <form onSubmit={handleResetSubmit} className="space-y-5">
              {/* OTP Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Enter OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="e.g. 1234"
                  maxLength={6}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-center tracking-[0.5em] text-lg text-slate-700 focus:outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 transition-all"
                />
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  New Password
                </label>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-navy transition-colors"
                    size={18}
                  />
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Min. 8 characters"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 transition-all"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Confirm Password
                </label>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-navy transition-colors"
                    size={18}
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter password"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 transition-all"
                  />
                </div>
              </div>

              {/* --- PASSWORD STRENGTH HELPER --- */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Password Strength
                  </h4>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                      criteriaCount === 5
                        ? "text-brand-green"
                        : "text-slate-300"
                    }`}
                  >
                    {criteriaCount}/5 Met
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-slate-200 rounded-full mb-5 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ease-out rounded-full ${
                      criteriaCount <= 2
                        ? "bg-red-400"
                        : criteriaCount < 5
                          ? "bg-yellow-400"
                          : "bg-brand-green"
                    }`}
                    style={{ width: `${(criteriaCount / 5) * 100}%` }}
                  ></div>
                </div>

                {/* Criteria Grid */}
                <div className="grid grid-cols-1 gap-2">
                  <RequirementItem
                    met={passwordCriteria.length}
                    label="Minimum 8 characters"
                  />
                  <RequirementItem
                    met={passwordCriteria.uppercase}
                    label="Uppercase letter (A-Z)"
                  />
                  <RequirementItem
                    met={passwordCriteria.number}
                    label="Number (0-9)"
                  />
                  <RequirementItem
                    met={passwordCriteria.symbol}
                    label="Symbol (!@#$)"
                  />
                  <RequirementItem
                    met={passwordCriteria.match}
                    label="Passwords match"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={confirmMutation.isPending}
                className="w-full bg-brand-green text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-brand-green/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                {confirmMutation.isPending ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Resetting...
                  </>
                ) : (
                  <>
                    Reset Password <CheckCircle2 size={20} />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep("REQUEST")}
                  className="text-sm font-bold text-slate-400 hover:text-brand-navy transition-colors"
                >
                  Wrong email? Change it
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer Link */}
        <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
          <p className="text-slate-500 text-sm font-medium">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-brand-navy font-bold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// --- HELPER COMPONENT ---
const RequirementItem = ({ met, label }) => (
  <div
    className={`flex items-center gap-3 text-xs font-bold transition-all duration-300 ${
      met ? "text-brand-navy translate-x-1" : "text-slate-400"
    }`}
  >
    <div
      className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
        met
          ? "bg-brand-green text-white scale-110 shadow-sm shadow-brand-green/30"
          : "bg-slate-200 text-slate-400"
      }`}
    >
      {met ? <CheckCircle2 size={10} strokeWidth={3} /> : <Circle size={10} />}
    </div>
    <span className={met ? "opacity-100" : "opacity-80"}>{label}</span>
  </div>
);

export default ForgotPasswordPage;
