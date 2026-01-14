import React, { useActionState, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  Fingerprint,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

/**
 * Server Action Simulation
 * Handles both standard Password and Passkey login methods
 */
async function loginAction(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const passkeyAssertion = formData.get("passkeyAssertion");

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // LOGIC BRANCH 1: Passkey Login
  if (passkeyAssertion) {
    // Backend would verify assertion here
    return {
      success: true,
      user: {
        name: "Postal Aspirant",
        email,
        circle: "Maharashtra",
        role: "student",
      },
      error: null,
    };
  }

  // LOGIC BRANCH 2: Password Login
  if (email && password) {
    // Backend would verify hash here
    if (password === "password") {
      // Mock check
      return {
        success: true,
        user: {
          name: "Postal Aspirant",
          email,
          circle: "Maharashtra",
          role: "student",
        },
        error: null,
      };
    } else {
      // Allow any password for demo, but strict in production
      return {
        success: true,
        user: {
          name: "Postal Aspirant",
          email,
          circle: "Maharashtra",
          role: "student",
        },
        error: null,
      };
    }
  }

  return {
    success: false,
    error: "Invalid credentials. Please check your email and password.",
  };
}

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const formRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passkeyAssertion, setPasskeyAssertion] = useState("");

  const [state, formAction, isPending] = useActionState(loginAction, {
    success: false,
    error: null,
  });

  useEffect(() => {
    if (state.success) {
      login(state.user);
      navigate("/dashboard");
    }
  }, [state.success, navigate, login, state.user]);

  /**
   * 🔐 PASSKEY HANDLER (SECONDARY)
   * Triggers device biometrics, then submits form with assertion
   */
  const handlePasskeyLogin = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your registered email first.");
      return;
    }

    if (!window.PublicKeyCredential) {
      alert("Your device does not support biometric login.");
      return;
    }

    try {
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      const credential = await navigator.credentials.get({
        publicKey: {
          challenge,
          rpId: window.location.hostname,
          userVerification: "required",
          authenticatorSelection: { authenticatorAttachment: "platform" },
        },
      });

      if (credential) {
        setPasskeyAssertion(credential.id);
        // Force submit the form to the server action with the assertion
        setTimeout(() => {
          formRef.current.requestSubmit();
        }, 100);
      }
    } catch (err) {
      console.error("Passkey Login Cancelled:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100">
        <header className="text-center mb-10">
          <div className="w-20 h-20 bg-brand-navy text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-brand-navy/20">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-3xl font-black text-brand-navy">Sign In</h1>
          <p className="text-slate-500 font-medium mt-2 text-sm">
            Access your dashboard and study materials
          </p>
        </header>

        <form ref={formRef} action={formAction} className="space-y-5">
          {/* Hidden input to carry Passkey Data if used */}
          <input
            type="hidden"
            name="passkeyAssertion"
            value={passkeyAssertion}
          />

          {/* Email Field */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Registered Email
            </label>
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-green transition-colors"
                size={18}
              />
              <input
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rahul@example.com"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-brand-green focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Password
            </label>
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-green transition-colors"
                size={18}
              />
              <input
                name="password"
                type="password"
                // Not required if passkey is present, but required for standard login
                // Handling this logic via 'required' attribute can be tricky with dual modes,
                // so we leave it open and handle validation in the action or handlePasskeyLogin.
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-brand-green focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700"
              />
            </div>
            <div className="text-right mt-1">
              <Link
                to="/forgot-password"
                class="text-[11px] font-bold text-slate-400 hover:text-brand-navy transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {state.error && (
            <div className="bg-red-50 text-red-500 text-[11px] font-bold p-4 rounded-xl flex items-center gap-2 justify-center">
              <AlertCircle size={16} /> {state.error}
            </div>
          )}

          {/* --- SECTION 1: PRIMARY LOGIN --- */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-4 bg-brand-navy hover:bg-slate-800 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-2 group"
            >
              {isPending ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span>Secure Login</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </div>
        </form>

        {/* --- DIVIDER --- */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-4 text-slate-400 font-black uppercase tracking-widest">
              — OR —
            </span>
          </div>
        </div>

        {/* --- SECTION 2: BIOMETRIC LOGIN --- */}
        <div>
          <button
            type="button"
            onClick={handlePasskeyLogin}
            disabled={isPending}
            className="w-full py-4 bg-white border-2 border-brand-green text-brand-green hover:bg-green-50 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all flex items-center justify-center gap-3"
          >
            <Fingerprint size={22} />
            Quick Login (Fingerprint/FaceID)
          </button>
        </div>

        <footer className="mt-10 pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-400 text-sm font-medium">
            New aspirant?{" "}
            <Link
              to="/signup"
              className="text-brand-green font-bold hover:underline ml-1"
            >
              Join Now
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
