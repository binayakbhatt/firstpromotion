import React, { useState } from "react";
import ProfileForm from "./settings/ProfileForm";
import SecuritySettings from "./settings/SecuritySettings";
// Removed AppearanceSettings import

const SettingsTab = ({ user }) => {
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = (formData) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log("Updated Data:", formData);
      alert("Profile updated successfully!");
    }, 1000);
  };

  const handleResetPasskey = () => {
    if (
      window.confirm(
        "Are you sure? This will remove your biometric login data.",
      )
    ) {
      alert("Passkey credentials cleared.");
    }
  };

  return (
    <div className="max-w-3xl animate-in fade-in duration-500">
      <h2 className="text-2xl font-black text-brand-navy mb-8">
        Account Settings
      </h2>

      {/* 1. Profile Details */}
      <ProfileForm
        user={user}
        onSubmit={handleUpdateProfile}
        loading={loading}
      />

      {/* 2. Security (Moved up since Appearance is gone) */}
      <SecuritySettings onResetPasskey={handleResetPasskey} />
    </div>
  );
};

export default SettingsTab;
