import React, { useState, useActionState, useTransition } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ArrowLeft,
  Loader2,
} from "lucide-react";

/**
 * @typedef {Object} LoginResponse
 * @property {boolean} success - Whether the login was successful.
 * @property {string|null} error - Error message if login failed.
 */

/**
 * Server Action for handling Login logic.
 * In React 19, actions can be passed directly to the form 'action' prop.
 * * @param {LoginResponse|null} prevState - The result from the previous execution.
 * @param {FormData} formData - The native FormData object from the login form.
 * @returns {Promise<LoginResponse>} The result of the authentication attempt.
 */
async function loginAction(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  // Simulated API Call
  await new Promise((res) => setTimeout(res, 1500));

  if (email === "test@postoffice.com" && password === "password123") {
    return { success: true, error: null };
  } else {
    return {
      success: false,
      error: "Invalid email or password. Please try again.",
    };
  }
}

/**
 * Login Component
 * * A conversion-optimized authentication page built for React 19.
 * Features:
 * - React 19 `useActionState` for native form handling.
 * - Progressive enhancement (works even if JS is slow).
 * - Accessible iconography and high-contrast focus states.
 * * @component
 * @returns {React.JSX.Element} The rendered Login page.
 */
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  /**
   * state: The return value from the action (LoginResponse).
   * formAction: The function to pass to the <form action={...}> prop.
   * isPending: React 19's native way to track if the action is running.
   */
  const [state, formAction, isPending] = useActionState(loginAction, {
    success: false,
    error: null,
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none" />

      {/* Navigation: Back to Home */}
      <Link
        to="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-brand-navy transition-all hover:-translate-x-1"
      >
        <ArrowLeft size={18} /> Back to Home
      </Link>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-10 px-8 md:px-12 shadow-2xl rounded-[3.5rem] border border-slate-100">
          <header className="text-center mb-10">
            <h1 className="text-3xl font-black text-brand-navy tracking-tight">
              Student Login
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-2">
              Enter your credentials to access your dashboard.
            </p>
          </header>

          {/* Error Message Display */}
          {state?.error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold flex items-center gap-2 animate-shake">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
              >
                Email
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-green transition-colors"
                  size={18}
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-brand-green focus:bg-white rounded-2xl outline-none transition-all font-semibold text-brand-navy"
                  placeholder="name@postoffice.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
              >
                Password
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-green transition-colors"
                  size={18}
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-transparent focus:border-brand-green focus:bg-white rounded-2xl outline-none transition-all font-semibold text-brand-navy"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-brand-green transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Link
                to="/forgot-password"
                className="text-[11px] font-black text-brand-green uppercase tracking-tighter hover:underline"
              >
                Reset Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center items-center gap-3 py-4 bg-brand-navy hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-2xl shadow-xl shadow-brand-navy/10 transition-all font-black uppercase text-xs tracking-[0.2em]"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Authenticating...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <footer className="mt-10 text-center pt-8 border-t border-slate-50">
            <p className="text-xs text-slate-500 font-bold">
              New to FirstPromotion?{" "}
              <Link
                to="/signup"
                className="text-brand-green font-black hover:text-brand-navy transition-colors ml-1"
              >
                Join Now
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;
