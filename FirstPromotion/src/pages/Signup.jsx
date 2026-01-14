import React, { useState, useActionState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Hash,
  MapPin,
  GraduationCap,
  ArrowLeft,
  Loader2,
  Lock,
  AlertCircle,
  Sparkles,
  Fingerprint,
  ShieldCheck,
  CheckCircle2,
  Circle,
  Eye,
  EyeOff, // Added for password toggle
} from "lucide-react";
// Import existing sub-components
import PaymentGateway from "../components/signup/PaymentGateway";
import MissedCallVerification from "../components/signup/MissedCallVerification";

/**
 * Server Action Simulation
 */
async function signupAction(prevState, formData) {
  // Simulating server delay
  await new Promise((res) => setTimeout(res, 1500));

  const password = formData.get("password");

  if (!password || password.length < 8) {
    return {
      success: false,
      errors: { general: "Password does not meet security requirements." },
    };
  }

  return { success: true, triggerVerification: true };
}

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef(null);

  // --- UI STEPS ---
  const [step, setStep] = useState("register");
  const [showPasskeyModal, setShowPasskeyModal] = useState(false);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  // --- LOCAL ERROR STATE ---
  const [clientErrors, setClientErrors] = useState({});

  // --- PASSWORD CRITERIA STATE ---
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    number: false,
    symbol: false,
    match: false,
  });

  // --- FORM DATA ---
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    employeeId: "",
    circle: "",
    course: "",
    password: "",
    confirmPassword: "",
    passkeyCredentialId: "",
  });

  const [state, formAction, isPending] = useActionState(signupAction, {
    success: false,
    errors: null,
    triggerVerification: false,
  });

  // --- FETCH COURSES ---
  useEffect(() => {
    setTimeout(() => {
      setAvailableCourses([
        "GDS to MTS / Postman",
        "Postman/MTS to PA/SA",
        "PA to Inspector Posts",
        "IP Fast Track",
        "PS Group B",
      ]);
      setLoadingCourses(false);
    }, 800);
  }, []);

  // Handle auto-selected course
  useEffect(() => {
    if (location.state?.selectedCourse) {
      setFormData((prev) => ({
        ...prev,
        course: location.state.selectedCourse,
      }));
    }
  }, [location.state]);

  // --- REAL-TIME PASSWORD VALIDATION ---
  useEffect(() => {
    const pwd = formData.password || "";
    const confirm = formData.confirmPassword || "";

    setPasswordCriteria({
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      number: /\d/.test(pwd),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
      match: pwd.length > 0 && pwd === confirm,
    });
  }, [formData.password, formData.confirmPassword]);

  // --- SUCCESS HANDLING ---
  useEffect(() => {
    if (state.success && state.triggerVerification) {
      setShowPasskeyModal(true);
    }
  }, [state.success, state.triggerVerification]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (clientErrors[e.target.name]) {
      setClientErrors((prev) => ({ ...prev, [e.target.name]: null }));
    }
  };

  /**
   * CLIENT SIDE VALIDATION
   */
  const validateForm = () => {
    const errors = {};
    const mobileRegex = /^[6-9]\d{9}$/;
    const empIdRegex = /^\d{8}$/;

    if (!formData.firstName.trim() || formData.firstName.length < 2)
      errors.firstName = "Name is too short.";
    if (!formData.lastName.trim()) errors.lastName = "Last Name is required.";
    if (!formData.email.includes("@")) errors.email = "Invalid email address.";
    if (!mobileRegex.test(formData.mobile))
      errors.mobile = "Invalid 10-digit mobile number.";
    if (!empIdRegex.test(formData.employeeId))
      errors.employeeId = "Employee ID must be 8 digits.";
    if (!formData.circle) errors.circle = "Please select your Circle.";
    if (!formData.course) errors.course = "Please select a Course.";

    // Strict Password Validation
    if (!passwordCriteria.length)
      errors.password = "Password must be at least 8 characters.";
    else if (!passwordCriteria.uppercase)
      errors.password = "Password needs an uppercase letter.";
    else if (!passwordCriteria.number)
      errors.password = "Password needs a number.";
    else if (!passwordCriteria.symbol)
      errors.password = "Password needs a symbol (!@#$).";

    if (!passwordCriteria.match)
      errors.confirmPassword = "Passwords do not match.";

    setClientErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePrimarySubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      formRef.current.requestSubmit();
    }
  };

  const handleBiometricSetup = async () => {
    if (!window.PublicKeyCredential) {
      alert("Biometrics not supported on this device.");
      proceedToNextStep();
      return;
    }
    // ... (Biometric logic remains the same)
    proceedToNextStep();
  };

  const proceedToNextStep = () => {
    setShowPasskeyModal(false);
    setStep("missed_call");
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
    "North East",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Tamil Nadu",
    "Telangana",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "APS",
    "Directorate",
  ];

  if (step === "payment")
    return (
      <PaymentGateway
        formData={formData}
        onSuccess={() => navigate("/dashboard")}
      />
    );

  if (step === "missed_call")
    return <MissedCallVerification onVerified={() => setStep("payment")} />;

  const criteriaCount = Object.values(passwordCriteria).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-6 relative">
      <Link
        to="/login"
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-brand-navy transition-all"
      >
        <ArrowLeft size={18} /> Back to Login
      </Link>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl">
        <div className="bg-white py-10 px-8 md:px-12 shadow-2xl rounded-[3.5rem] border border-slate-100">
          <header className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
              <Sparkles size={14} /> Your Step Towards Promotion Starts Here
            </div>
            <h1 className="text-3xl font-black text-brand-navy tracking-tight">
              Create Your Account
            </h1>
          </header>

          <form
            ref={formRef}
            action={formAction}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
          >
            <Input
              icon={<User />}
              name="firstName"
              label="First Name"
              placeholder="Rahul"
              value={formData.firstName}
              onChange={handleInputChange}
              error={clientErrors.firstName}
            />
            <Input
              icon={<User />}
              name="lastName"
              label="Last Name"
              placeholder="Sharma"
              value={formData.lastName}
              onChange={handleInputChange}
              error={clientErrors.lastName}
            />
            <Input
              icon={<Mail />}
              name="email"
              type="email"
              label="Email ID"
              placeholder="rahul@example.com"
              value={formData.email}
              onChange={handleInputChange}
              error={clientErrors.email}
            />
            <Input
              icon={<Phone />}
              name="mobile"
              type="tel"
              label="Mobile No."
              placeholder="9876543210"
              value={formData.mobile}
              onChange={handleInputChange}
              error={clientErrors.mobile || state?.errors?.mobile}
            />
            <Input
              icon={<Hash />}
              name="employeeId"
              label="Employee ID"
              placeholder="12345678"
              value={formData.employeeId}
              onChange={handleInputChange}
              error={clientErrors.employeeId || state?.errors?.employeeId}
            />

            <div className="space-y-1">
              <Label text="Postal Circle" />
              <div className="relative group">
                <MapPin
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-green"
                  size={18}
                />
                <select
                  name="circle"
                  className={`select-style ${
                    clientErrors.circle ? "border-red-300 bg-red-50" : ""
                  }`}
                  value={formData.circle}
                  onChange={handleInputChange}
                >
                  <option value="">Select Circle</option>
                  {circles.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              {clientErrors.circle && <ErrorMsg msg={clientErrors.circle} />}
            </div>

            <div className="md:col-span-2 space-y-1">
              <Label text="Course Selection" />
              <div className="relative group">
                <GraduationCap
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-green"
                  size={18}
                />
                <select
                  name="course"
                  className={`select-style ${
                    clientErrors.course ? "border-red-300 bg-red-50" : ""
                  }`}
                  value={formData.course}
                  onChange={handleInputChange}
                  disabled={loadingCourses}
                >
                  <option value="">
                    {loadingCourses ? "Loading..." : "Select Exam Batch"}
                  </option>
                  {!loadingCourses &&
                    availableCourses.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
              </div>
              {clientErrors.course && <ErrorMsg msg={clientErrors.course} />}
            </div>

            {/* --- PASSWORD SECTION (Last) --- */}
            <Input
              icon={<Lock />}
              name="password"
              type="password"
              label="Create Secure Password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              error={clientErrors.password}
            />
            <Input
              icon={<Lock />}
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={clientErrors.confirmPassword}
            />

            {/* --- Password Requirements --- */}
            <div className="md:col-span-2 bg-slate-50/50 rounded-2xl p-6 border border-slate-100 mt-2">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Password Strength
                </h4>
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                    criteriaCount === 5 ? "text-brand-green" : "text-slate-300"
                  }`}
                >
                  {criteriaCount}/5 Met
                </span>
              </div>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
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

            {state?.errors?.general && (
              <div className="md:col-span-2 bg-red-50 text-red-500 p-4 rounded-xl text-center font-bold text-xs flex items-center justify-center gap-2">
                <AlertCircle size={16} /> {state.errors.general}
              </div>
            )}

            <div className="md:col-span-2 pt-4">
              <button
                type="button"
                onClick={handlePrimarySubmit}
                disabled={isPending}
                className="w-full flex justify-center items-center gap-3 py-4 bg-brand-navy hover:bg-slate-800 disabled:bg-slate-300 text-white rounded-2xl shadow-xl font-black uppercase text-xs tracking-[0.2em] transition-all cursor-pointer"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <ShieldCheck size={24} className="text-brand-green" />
                    <span>Create Account</span>
                  </>
                )}
              </button>
              <div className="mt-4 text-center px-4">
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                  <Lock size={10} className="inline mr-1 mb-0.5" />
                  Standard secure encryption. You can enable biometric login
                  later in settings.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      {showPasskeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl text-center border border-white/20">
            <div className="w-16 h-16 bg-green-100 text-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-black text-brand-navy mb-2">
              Account Created!
            </h3>
            <p className="text-slate-500 text-sm mb-8">
              Would you like to enable <strong>Fingerprint/FaceID</strong> for
              faster login next time?
            </p>
            <button
              onClick={handleBiometricSetup}
              className="w-full py-3 bg-brand-green text-white rounded-xl font-bold text-sm mb-3 flex items-center justify-center gap-2 shadow-lg shadow-green-200 hover:brightness-110 transition-all"
            >
              <Fingerprint size={18} /> Enable Now
            </button>
            <button
              onClick={proceedToNextStep}
              className="w-full py-3 bg-transparent text-slate-400 font-bold text-xs hover:text-brand-navy transition-colors"
            >
              Skip for Now
            </button>
          </div>
        </div>
      )}

      <style>{`.input-style { width: 100%; padding: 0.875rem 1rem 0.875rem 3rem; background-color: #f8fafc; border: 2px solid transparent; border-radius: 1rem; outline: none; transition: all 0.2s; font-weight: 600; } .input-style:focus { border-color: #10b981; background-color: white; } .select-style { width: 100%; padding: 0.875rem 1rem 0.875rem 3rem; background-color: #f8fafc; border: 2px solid transparent; border-radius: 1rem; outline: none; appearance: none; font-weight: 600; } .select-style:focus { border-color: #10b981; background-color: white; }`}</style>
    </div>
  );
};

// --- Helper Components ---

const RequirementItem = ({ met, label }) => (
  <div
    className={`flex items-center gap-3 text-xs font-bold transition-all duration-300 ${
      met ? "text-brand-navy translate-x-1" : "text-slate-400"
    }`}
  >
    <div
      className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
        met
          ? "bg-brand-green text-white scale-110 shadow-sm shadow-brand-green/30"
          : "bg-slate-200 text-slate-400"
      }`}
    >
      {met ? <CheckCircle2 size={12} strokeWidth={3} /> : <Circle size={12} />}
    </div>
    <span className={met ? "opacity-100" : "opacity-80"}>{label}</span>
  </div>
);

const Label = ({ text }) => (
  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
    {text}
  </label>
);

const ErrorMsg = ({ msg }) => (
  <p className="text-[10px] text-red-500 font-bold mt-1 ml-1 flex items-center gap-1">
    <AlertCircle size={10} /> {msg}
  </p>
);

// --- REFACTORED INPUT COMPONENT ---
// Now handles Password Visibility Toggle internally
const Input = ({ label, error, icon, type, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = isPasswordType
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="space-y-1">
      <Label text={label} />
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-green transition-colors">
          {icon}
        </div>
        <input
          type={inputType}
          {...props}
          className={`input-style ${error ? "border-red-300 bg-red-50" : ""} ${
            isPasswordType ? "pr-12" : ""
          }`}
        />
        {isPasswordType && (
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-navy transition-colors cursor-pointer outline-none p-1 rounded-md focus:bg-slate-100"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <ErrorMsg msg={error} />}
    </div>
  );
};

export default Signup;
