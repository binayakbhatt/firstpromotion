import React from "react";
import { Shield, Fingerprint } from "lucide-react";

const SecuritySettings = ({ onResetPasskey }) => {
  // Define standard input styles to avoid repetition
  const inputClasses =
    "w-full p-3 bg-slate-50 rounded-xl font-medium text-sm outline-none border-2 border-transparent focus:bg-white focus:border-brand-navy/20 text-slate-700 placeholder:text-slate-400 transition-all";

  return (
    <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
      <h3 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
        <div className="p-2 bg-slate-100 rounded-lg">
          <Shield size={18} className="text-slate-500" />
        </div>
        Security & Login
      </h3>

      <div className="space-y-8">
        {/* Change Password Form */}
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-8 border-b border-slate-50">
          <input
            type="password"
            placeholder="Current Password"
            className={inputClasses}
          />
          <input
            type="password"
            placeholder="New Password"
            className={inputClasses}
          />
          <button
            type="button"
            className="bg-slate-100 text-slate-600 hover:bg-brand-navy hover:text-white font-bold rounded-xl text-xs transition-colors py-3 md:py-0"
          >
            Update Password
          </button>
        </form>

        {/* Passkey Reset Section */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-brand-navy text-sm">
              Biometric Login (Passkeys)
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Manage your FaceID / Fingerprint data.
            </p>
          </div>
          <button
            onClick={onResetPasskey}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl font-bold text-xs transition-all border border-red-100"
          >
            <Fingerprint size={16} /> Reset Passkeys
          </button>
        </div>
      </div>
    </section>
  );
};

export default SecuritySettings;
