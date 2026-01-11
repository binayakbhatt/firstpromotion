import React, { useState, useActionState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Hash,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  ArrowLeft,
  Loader2,
  UserPlus,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Timer,
  RefreshCw,
} from "lucide-react";

/**
 * Validates password strength against industry standards (OWASP)
 * @param {string} password
 * @returns {Object} validation status flags
 */
const validatePassword = (password) => {
  return {
    length: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
};

/**
 * Sanitizes input strings to prevent basic XSS and SQL injection patterns.
 * @param {string} str
 * @returns {string}
 */
const sanitize = (str) =>
  typeof str === "string" ? str.replace(/[<>'"%;()&+]/g, "").trim() : str;

/**
 * React 19 Server Action for Handling Registration Logic
 */
async function signupAction(prevState, formData) {
  const errors = {};

  // Extracting and Sanitizing Data
  const firstName = sanitize(formData.get("firstName"));
  const mobile = formData.get("mobile");
  const employeeId = formData.get("employeeId");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  // Validation Logic
  if (firstName.length < 2) errors.firstName = "First name is too short.";
  if (!/^[6-9]\d{9}$/.test(mobile))
    errors.mobile = "Enter a valid 10-digit mobile.";
  if (!/^\d{8}$/.test(employeeId))
    errors.employeeId = "Employee ID must be 8 digits.";

  const strength = validatePassword(password);
  if (
    !strength.length ||
    !strength.hasUpper ||
    !strength.hasNumber ||
    !strength.hasSpecial
  ) {
    errors.password = "Security requirements not met.";
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (Object.keys(errors).length > 0) return { success: false, errors };

  // Simulate API Call for sending OTP
  await new Promise((res) => setTimeout(res, 1500));
  return { success: true, errors: null, triggerOtp: true };
}

const Signup = () => {
  // State management
  const [step, setStep] = useState("register"); // 'register' | 'verify'
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passValue, setPassValue] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(60);
  const otpRefs = useRef([]);

  const [state, formAction, isPending] = useActionState(signupAction, {
    success: false,
    errors: null,
    triggerOtp: false,
  });

  // Effects
  useEffect(() => {
    if (state.triggerOtp) setStep("verify");
  }, [state.triggerOtp]);

  useEffect(() => {
    if (step === "verify" && resendTimer > 0) {
      const interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [step, resendTimer]);

  const strength = validatePassword(passValue);

  // OTP Input Logic
  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1].focus();
  };

  const circles = [
    "Andhra Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Delhi",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu & Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "North Eastern",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Tamil Nadu",
    "Telangana",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "APS",
    "CEPT",
    "PTC",
    "Postal Directorate",
  ];
  const courses = [
    "MTS to Postman/Mail Guard",
    "GDS to MTS",
    "Postman to PA/SA",
    "GDS to PA/SA",
    "IP Fast Track",
    "PS Group B",
  ];

  // --- OTP VERIFICATION VIEW ---
  if (step === "verify") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[3.5rem] p-10 shadow-2xl text-center border border-slate-100">
          <div className="w-20 h-20 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-3xl font-black text-brand-navy mb-2">
            Verify OTP
          </h2>
          <p className="text-slate-500 text-sm mb-8 font-medium">
            We've sent a 6-digit code to your email.
          </p>
          <div className="flex justify-between gap-2 mb-8">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (otpRefs.current[idx] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Backspace" &&
                  !otp[idx] &&
                  idx > 0 &&
                  otpRefs.current[idx - 1].focus()
                }
                className="w-12 h-16 text-2xl font-black text-center bg-slate-50 border-2 border-transparent focus:border-brand-green focus:bg-white rounded-2xl outline-none transition-all"
              />
            ))}
          </div>
          <button className="w-full py-4 bg-brand-navy text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all mb-6">
            Confirm & Join
          </button>
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Timer size={14} />{" "}
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Code expired"}
            </div>
            {resendTimer === 0 && (
              <button
                onClick={() => setResendTimer(60)}
                className="text-brand-green font-black text-xs uppercase tracking-widest flex items-center gap-2"
              >
                <RefreshCw size={14} /> Resend OTP
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- REGISTRATION FORM VIEW ---
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-6">
      <Link
        to="/login"
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-brand-navy transition-all"
      >
        <ArrowLeft size={18} /> Back to Login
      </Link>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl">
        <div className="bg-white py-10 px-8 md:px-12 shadow-2xl rounded-[3.5rem] border border-slate-100">
          <header className="text-center mb-10">
            <h1 className="text-3xl font-black text-brand-navy tracking-tight">
              Registration
            </h1>
          </header>

          <form
            action={formAction}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
          >
            <Input
              icon={<User />}
              name="firstName"
              label="First Name"
              placeholder="Rahul"
              error={state?.errors?.firstName}
            />
            <Input
              icon={<User />}
              name="lastName"
              label="Last Name"
              placeholder="Sharma"
            />
            <Input
              icon={<Mail />}
              name="email"
              type="email"
              label="Email ID"
              placeholder="rahul@example.com"
            />
            <Input
              icon={<Phone />}
              name="mobile"
              type="tel"
              label="Mobile No."
              placeholder="9876543210"
              error={state?.errors?.mobile}
            />
            <Input
              icon={<Hash />}
              name="employeeId"
              label="Employee ID"
              placeholder="12345678"
              error={state?.errors?.employeeId}
            />

            <div className="space-y-1">
              <Label text="Postal Circle" />
              <div className="relative group">
                <MapPin
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-green"
                  size={18}
                />
                <select name="circle" required className="select-style">
                  <option value="">Select Circle</option>
                  {circles.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Previously "Current Office of Posting" - Removed */}

            <div className="md:col-span-2 space-y-1">
              <Label text="Interested Course" />
              <div className="relative group">
                <GraduationCap
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-green"
                  size={18}
                />
                <select name="course" required className="select-style">
                  <option value="">Choose Exam Course</option>
                  {courses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Password Fields */}
            <div className="space-y-1 relative">
              <Label text="Create Password" />
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-green"
                  size={18}
                />
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  required
                  onChange={(e) => setPassValue(e.target.value)}
                  className="input-style"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {state?.errors?.password && (
                <ErrorText text={state.errors.password} />
              )}
            </div>

            <div className="space-y-1 relative">
              <Label text="Confirm Password" />
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-green"
                  size={18}
                />
                <input
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  required
                  className="input-style"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {state?.errors?.confirmPassword && (
                <ErrorText text={state.errors.confirmPassword} />
              )}
            </div>

            {/* Strength Meter */}
            <div className="md:col-span-2 bg-slate-50 p-5 rounded-2xl border border-slate-100 grid grid-cols-2 gap-2">
              <Requirement met={strength.length} text="8+ Characters" />
              <Requirement met={strength.hasUpper} text="Uppercase" />
              <Requirement met={strength.hasNumber} text="Number" />
              <Requirement met={strength.hasSpecial} text="Symbol" />
            </div>

            <div className="md:col-span-2 pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="w-full flex justify-center items-center gap-3 py-4 bg-brand-green hover:bg-emerald-600 disabled:bg-slate-300 text-white rounded-2xl shadow-xl font-black uppercase text-xs tracking-[0.2em] transition-all"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <UserPlus size={18} /> Register Now
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .input-style { width: 100%; padding: 0.875rem 1rem 0.875rem 3rem; background-color: #f8fafc; border: 2px solid transparent; border-radius: 1rem; outline: none; transition: all 0.2s; font-weight: 600; }
        .input-style:focus { border-color: #10b981; background-color: white; }
        .select-style { width: 100%; padding: 0.875rem 1rem 0.875rem 3rem; background-color: #f8fafc; border: 2px solid transparent; border-radius: 1rem; outline: none; appearance: none; font-weight: 600; }
        .select-style:focus { border-color: #10b981; background-color: white; }
      `}</style>
    </div>
  );
};

/* Helper Components */
const Label = ({ text }) => (
  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
    {text}
  </label>
);
const ErrorText = ({ text }) => (
  <p className="text-[10px] text-red-500 font-bold mt-1 ml-1 flex items-center gap-1">
    <AlertCircle size={10} /> {text}
  </p>
);
const Requirement = ({ met, text }) => (
  <div
    className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-tighter ${
      met ? "text-brand-green" : "text-slate-300"
    }`}
  >
    <CheckCircle2 size={12} /> {text}
  </div>
);
const Input = ({ label, error, icon, ...props }) => (
  <div className="space-y-1">
    <Label text={label} />
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-green transition-colors">
        {icon}
      </div>
      <input
        required
        className={`input-style ${error ? "border-red-300 bg-red-50" : ""}`}
        {...props}
      />
    </div>
    {error && <ErrorText text={error} />}
  </div>
);

export default Signup;
