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
  Fingerprint,
  AlertCircle,
  Sparkles,
  Lock,
} from "lucide-react";

// Import the sub-components we created earlier
import PaymentGateway from "../components/signup/PaymentGateway";
import MissedCallVerification from "../components/signup/MissedCallVerification";

/**
 * Server Action Simulation
 */
async function signupAction(prevState, formData) {
  // Simulating server delay
  await new Promise((res) => setTimeout(res, 1500));

  // Note: Most validation happens on client now, but server should double check
  const passkeyCredentialId = formData.get("passkeyCredentialId");

  if (!passkeyCredentialId) {
    return {
      success: false,
      errors: { general: "Biometric setup failed. Please try again." },
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
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  // --- LOCAL ERROR STATE (For pre-passkey validation) ---
  const [clientErrors, setClientErrors] = useState({});

  // --- FORM DATA ---
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    employeeId: "",
    circle: "",
    course: "",
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

  // Advance to Missed Call Step
  useEffect(() => {
    if (state.triggerVerification) setStep("missed_call");
  }, [state.triggerVerification]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear specific error when user types
    if (clientErrors[e.target.name]) {
      setClientErrors((prev) => ({ ...prev, [e.target.name]: null }));
    }
  };

  /**
   * 1. CLIENT SIDE VALIDATION
   * Returns true if valid, false if not.
   */
  const validateForm = () => {
    const errors = {};
    const mobileRegex = /^[6-9]\d{9}$/;
    const empIdRegex = /^\d{8}$/;

    if (!formData.firstName.trim() || formData.firstName.length < 2) {
      errors.firstName = "Name is too short.";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required.";
    }
    if (!formData.email.includes("@")) {
      errors.email = "Invalid email address.";
    }
    if (!mobileRegex.test(formData.mobile)) {
      errors.mobile = "Invalid 10-digit mobile number.";
    }
    if (!empIdRegex.test(formData.employeeId)) {
      errors.employeeId = "Employee ID must be 8 digits.";
    }
    if (!formData.circle) {
      errors.circle = "Please select your Circle.";
    }
    if (!formData.course) {
      errors.course = "Please select a Course.";
    }

    setClientErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * 2. BIOMETRIC REGISTRATION
   * Only triggers if validation passes.
   */
  const handleRegister = async (e) => {
    e.preventDefault();

    // Run Validation First
    const isValid = validateForm();
    if (!isValid) {
      // Scroll to top to see errors if needed, or just return
      return;
    }

    try {
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      const publicKey = {
        challenge,
        rp: { name: "FirstPromotion", id: window.location.hostname },
        user: {
          id: Uint8Array.from(formData.email || "test", (c) => c.charCodeAt(0)),
          name: formData.email,
          displayName: formData.firstName,
        },
        pubKeyCredParams: [{ alg: -7, type: "public-key" }],
        timeout: 60000,
        authenticatorSelection: {
          authenticatorAttachment: "platform", // Forces Windows Hello / TouchID / FaceID
          userVerification: "required",
        },
      };

      const credential = await navigator.credentials.create({ publicKey });

      if (credential) {
        setFormData((prev) => ({
          ...prev,
          passkeyCredentialId: credential.id,
        }));
        // Submit the form programmatically after successful biometric scan
        setTimeout(() => formRef.current.requestSubmit(), 100);
      }
    } catch (err) {
      console.error("Passkey Creation Failed:", err);
      alert("Registration canceled or failed. Please try again.");
    }
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

  // --- NAVIGATION ROUTING ---
  if (step === "payment")
    return (
      <PaymentGateway
        formData={formData}
        onSuccess={() => navigate("/dashboard")}
      />
    );
  if (step === "missed_call")
    return <MissedCallVerification onVerified={() => setStep("payment")} />;

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
            {/* Marketing Badge */}
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
            <input
              type="hidden"
              name="passkeyCredentialId"
              value={formData.passkeyCredentialId}
            />

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
              {clientErrors.circle && (
                <p className="text-[10px] text-red-500 font-bold mt-1 ml-1 flex items-center gap-1">
                  <AlertCircle size={10} /> {clientErrors.circle}
                </p>
              )}
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
              {clientErrors.course && (
                <p className="text-[10px] text-red-500 font-bold mt-1 ml-1 flex items-center gap-1">
                  <AlertCircle size={10} /> {clientErrors.course}
                </p>
              )}
            </div>

            {/* Server Errors (General) */}
            {state?.errors?.general && (
              <div className="md:col-span-2 bg-red-50 text-red-500 p-4 rounded-xl text-center font-bold text-xs flex items-center justify-center gap-2">
                <AlertCircle size={16} /> {state.errors.general}
              </div>
            )}

            <div className="md:col-span-2 pt-6">
              <button
                type="button"
                onClick={handleRegister}
                disabled={isPending}
                className="w-full flex justify-center items-center gap-3 py-4 bg-brand-navy hover:bg-slate-800 disabled:bg-slate-300 text-white rounded-2xl shadow-xl font-black uppercase text-xs tracking-[0.2em] transition-all"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <Fingerprint size={24} className="text-brand-green" />
                    <span>Secure Sign Up</span>
                  </>
                )}
              </button>

              {/* Passkey Explanation Text */}
              <div className="mt-4 text-center px-4">
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                  <Lock size={10} className="inline mr-1 mb-0.5" />
                  We use{" "}
                  <span className="text-slate-600 font-bold">
                    Passkey Technology
                  </span>
                  . Instead of creating a password, you will authenticate using
                  your device's screen lock (Fingerprint, FaceID, or PIN). It is
                  faster and more secure.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <style>{`.input-style { width: 100%; padding: 0.875rem 1rem 0.875rem 3rem; background-color: #f8fafc; border: 2px solid transparent; border-radius: 1rem; outline: none; transition: all 0.2s; font-weight: 600; } .input-style:focus { border-color: #10b981; background-color: white; } .select-style { width: 100%; padding: 0.875rem 1rem 0.875rem 3rem; background-color: #f8fafc; border: 2px solid transparent; border-radius: 1rem; outline: none; appearance: none; font-weight: 600; } .select-style:focus { border-color: #10b981; background-color: white; }`}</style>
    </div>
  );
};

const Label = ({ text }) => (
  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
    {text}
  </label>
);

const Input = ({ label, error, icon, ...props }) => (
  <div className="space-y-1">
    <Label text={label} />
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-green transition-colors">
        {icon}
      </div>
      <input
        {...props}
        className={`input-style ${error ? "border-red-300 bg-red-50" : ""}`}
      />
    </div>
    {error && (
      <p className="text-[10px] text-red-500 font-bold mt-1 ml-1 flex items-center gap-1">
        <AlertCircle size={10} /> {error}
      </p>
    )}
  </div>
);

export default Signup;
