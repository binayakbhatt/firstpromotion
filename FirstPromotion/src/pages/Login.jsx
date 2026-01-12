import React, { useActionState, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Mail,
  Loader2,
  AlertCircle,
  Fingerprint,
  ShieldCheck,
} from "lucide-react";

/**
 * Server Action Simulation
 * Validates the Passkey signature against the server's stored public key.
 */
async function loginAction(prevState, formData) {
  const email = formData.get("email");
  const passkeyAssertion = formData.get("passkeyAssertion");

  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (!email || !passkeyAssertion) {
    return {
      success: false,
      error: "Authentication failed. Please use your device PIN or Biometrics.",
    };
  }

  // Mock Success: In production, the backend verifies the 'passkeyAssertion'
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

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const formRef = useRef(null);

  const [email, setEmail] = useState("");
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
   * 🔐 PASSWORDLESS LOGIN HANDLER
   * Optimized to trigger Windows Hello / TouchID and ignore Bluetooth.
   */
  const handleLoginClick = async (e) => {
    e.preventDefault();

    if (!email || !formRef.current.checkValidity()) {
      formRef.current.reportValidity();
      return;
    }

    if (!window.PublicKeyCredential) {
      alert("Your browser/device does not support Passkeys.");
      return;
    }

    try {
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      // REQUESTING CREDENTIAL
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge,
          rpId: window.location.hostname,
          userVerification: "required", // Forces PIN or Biometrics
          // This line prevents the "Turn on Bluetooth" popup by forcing local hardware
          authenticatorSelection: {
            authenticatorAttachment: "platform",
          },
        },
      });

      if (credential) {
        setPasskeyAssertion(credential.id);
        // Submit the form to the server action
        setTimeout(() => {
          formRef.current.requestSubmit();
        }, 100);
      }
    } catch (err) {
      console.error("Passkey Login Error:", err);
      // If user cancels, we don't need to show a massive error, just stop loading
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100">
        <header className="text-center mb-10">
          <div className="w-20 h-20 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-3xl font-black text-brand-navy">Sign In</h1>
          <p className="text-slate-500 font-medium mt-2">
            Secure access via Device PIN/FaceID
          </p>
        </header>

        <form ref={formRef} action={formAction} className="space-y-6">
          {/* Hidden input to carry the Passkey Data */}
          <input
            type="hidden"
            name="passkeyAssertion"
            value={passkeyAssertion}
          />

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

          {state.error && (
            <div className="bg-red-50 text-red-500 text-[11px] font-bold p-4 rounded-xl flex items-center gap-2 justify-center">
              <AlertCircle size={16} /> {state.error}
            </div>
          )}

          <div className="pt-4">
            <button
              type="button"
              onClick={handleLoginClick}
              disabled={isPending}
              className="w-full py-4 bg-brand-navy hover:bg-slate-800 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3 group"
            >
              {isPending ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <Fingerprint
                    size={22}
                    className="text-brand-green group-hover:scale-110 transition-transform"
                  />
                  Confirm Identity
                </>
              )}
            </button>
            <p className="text-center text-[10px] text-slate-400 mt-4 leading-relaxed">
              We'll use your computer's PIN or Biometrics <br /> to verify it's
              really you.
            </p>
          </div>
        </form>

        <footer className="mt-10 pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-400 text-sm font-medium">
            New aspirant?{" "}
            <Link
              to="/signup"
              className="text-brand-green font-bold hover:underline ml-1"
            >
              Register Now
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
