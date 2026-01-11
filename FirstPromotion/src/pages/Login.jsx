import React, { useActionState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 1. IMPORT HOOK
import { Mail, Lock, ArrowRight, Loader2, AlertCircle } from "lucide-react";

async function loginAction(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (email === "test@postoffice.com" && password === "password123") {
    // Return mock user data on success
    return {
      success: true,
      user: { name: "Demo Student", email, circle: "Delhi" }, // Mock Data
      error: null,
    };
  } else {
    return {
      success: false,
      error: "Invalid credentials. Try test@postoffice.com",
    };
  }
}

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // 2. GET LOGIN FUNCTION

  const [state, formAction, isPending] = useActionState(loginAction, {
    success: false,
    error: null,
  });

  useEffect(() => {
    if (state.success) {
      // 3. UPDATE GLOBAL STATE
      login(state.user);
      navigate("/dashboard");
    }
  }, [state.success, navigate, login, state.user]); // Added dependencies

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-black text-brand-navy">Welcome Back</h1>
          <p className="text-slate-500 font-medium mt-2">
            Login to access your courses
          </p>
        </header>

        <form action={formAction} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Email ID
            </label>
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-green"
                size={18}
              />
              <input
                name="email"
                type="email"
                defaultValue="test@postoffice.com"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-transparent focus:border-brand-green focus:bg-white rounded-xl outline-none transition-all font-bold text-slate-700"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Password
            </label>
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-green"
                size={18}
              />
              <input
                name="password"
                type="password"
                defaultValue="password123"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-transparent focus:border-brand-green focus:bg-white rounded-xl outline-none transition-all font-bold text-slate-700"
              />
            </div>
          </div>

          {state.error && (
            <div className="bg-red-50 text-red-500 text-xs font-bold p-3 rounded-lg flex items-center gap-2">
              <AlertCircle size={14} /> {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-4 bg-brand-navy hover:bg-slate-800 text-white rounded-xl font-black uppercase text-xs tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {isPending ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                Sign In <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <footer className="mt-8 text-center">
          <p className="text-slate-400 text-sm font-medium">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-brand-green font-bold hover:underline"
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
