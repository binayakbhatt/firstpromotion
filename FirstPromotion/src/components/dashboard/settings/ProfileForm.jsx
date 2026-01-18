import React, { useState } from "react";
import { User, MapPin, Hash, Save, RefreshCw } from "lucide-react";

const ProfileForm = ({ user, onSubmit, loading }) => {
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
    "CEPT",
    "APS",
    "Directorate",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClasses =
    "w-full p-3 pl-10 bg-slate-50 rounded-xl border-2 border-transparent focus:border-brand-navy/20 focus:bg-white transition-all font-semibold outline-none text-slate-700 placeholder:text-slate-400";
  const textareaClasses =
    "w-full p-3 bg-slate-50 rounded-xl border-2 border-transparent focus:border-brand-navy/20 focus:bg-white transition-all font-semibold outline-none resize-none text-slate-700 placeholder:text-slate-400";

  return (
    <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 mb-8">
      <h3 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
        <div className="p-2 bg-slate-100 rounded-lg">
          <User size={18} />
        </div>
        Personal Details
      </h3>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Full Name */}
        <div className="md:col-span-2 space-y-1">
          <Label text="Full Name" />
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
              className={inputClasses}
              placeholder="Enter your full name"
            />
          </div>
        </div>

        {/* Postal Circle */}
        <div className="space-y-1">
          <Label text="Postal Circle" />
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
              className={`${inputClasses} appearance-none`}
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

        {/* Pin Code */}
        <div className="space-y-1">
          <Label text="Pin Code" />
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
              }
              className={inputClasses}
              placeholder="110001"
            />
          </div>
        </div>

        {/* Address */}
        <div className="md:col-span-2 space-y-1">
          <Label text="Home Address" />
          <textarea
            rows="3"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className={textareaClasses}
            placeholder="Enter your full address (House No, Street, Locality)"
          ></textarea>
        </div>

        {/* Submit Button */}
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
  );
};

const Label = ({ text }) => (
  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
    {text}
  </label>
);

export default ProfileForm;
