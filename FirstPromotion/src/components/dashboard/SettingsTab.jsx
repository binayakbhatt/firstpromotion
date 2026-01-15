import React, { useState } from "react";
import {
  User,
  Shield,
  Fingerprint,
  MapPin,
  Save,
  RefreshCw,
  Hash,
} from "lucide-react";

const SettingsTab = ({ user }) => {
  const [loading, setLoading] = useState(false);

  // Updated state to include pincode
  const [formData, setFormData] = useState({
    name: user?.name || "",
    circle: user?.circle || "",
    pincode: user?.pincode || "",
    address: "",
  });

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
  ];

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Profile updated successfully!");
    }, 1000);
  };

  const handleResetPasskey = () => {
    if (
      window.confirm(
        "Are you sure? This will remove your biometric login data."
      )
    ) {
      alert("Passkey credentials cleared.");
    }
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-black text-brand-navy mb-8">
        Account Settings
      </h2>

      {/* 1. PROFILE SECTION */}
      <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 mb-8">
        <h3 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
          <div className="p-2 bg-slate-100 rounded-lg">
            <User size={18} />
          </div>{" "}
          Personal Details
        </h3>

        <form
          onSubmit={handleUpdateProfile}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Full Name - Spans full width now for better layout */}
          <div className="md:col-span-2 space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Full Name
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-3 top-3.5 text-slate-400"
              />
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 pl-10 bg-slate-50 rounded-xl border-2 border-transparent focus:border-brand-navy/20 focus:bg-white transition-all font-semibold outline-none"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* Postal Circle */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Postal Circle
            </label>
            <div className="relative">
              <MapPin
                size={16}
                className="absolute left-3 top-3.5 text-slate-400"
              />
              <select
                value={formData.circle}
                onChange={(e) =>
                  setFormData({ ...formData, circle: e.target.value })
                }
                className="w-full p-3 pl-10 bg-slate-50 rounded-xl border-2 border-transparent focus:border-brand-navy/20 focus:bg-white transition-all font-semibold outline-none appearance-none"
              >
                <option value="">Select Circle</option>
                {circles.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* NEW: Pin Code Field */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Pin Code
            </label>
            <div className="relative">
              <Hash
                size={16}
                className="absolute left-3 top-3.5 text-slate-400"
              />
              <input
                type="text"
                maxLength={6}
                value={formData.pincode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pincode: e.target.value.replace(/\D/g, ""),
                  })
                } // Numbers only
                className="w-full p-3 pl-10 bg-slate-50 rounded-xl border-2 border-transparent focus:border-brand-navy/20 focus:bg-white transition-all font-semibold outline-none"
                placeholder="110001"
              />
            </div>
          </div>

          {/* Address */}
          <div className="md:col-span-2 space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Home Address
            </label>
            <textarea
              rows="3"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full p-3 bg-slate-50 rounded-xl border-2 border-transparent focus:border-brand-navy/20 focus:bg-white transition-all font-semibold outline-none resize-none"
              placeholder="Enter your full address (House No, Street, Locality)"
            ></textarea>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-brand-navy text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all disabled:opacity-50"
            >
              {loading ? (
                <RefreshCw size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              Save Changes
            </button>
          </div>
        </form>
      </section>

      {/* 2. SECURITY SECTION */}
      <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
          <div className="p-2 bg-slate-100 rounded-lg">
            <Shield size={18} />
          </div>{" "}
          Security & Login
        </h3>

        <div className="space-y-8">
          {/* Change Password */}
          <form className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-8 border-b border-slate-50">
            <input
              type="password"
              placeholder="Current Password"
              className="p-3 bg-slate-50 rounded-xl font-medium text-sm outline-none border-2 border-transparent focus:bg-white focus:border-slate-200"
            />
            <input
              type="password"
              placeholder="New Password"
              className="p-3 bg-slate-50 rounded-xl font-medium text-sm outline-none border-2 border-transparent focus:bg-white focus:border-slate-200"
            />
            <button
              type="button"
              className="bg-slate-100 text-slate-600 hover:bg-brand-navy hover:text-white font-bold rounded-xl text-xs transition-colors"
            >
              Update Password
            </button>
          </form>

          {/* Passkey Reset */}
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
              onClick={handleResetPasskey}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl font-bold text-xs transition-all border border-red-100"
            >
              <Fingerprint size={16} /> Reset Passkeys
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SettingsTab;
