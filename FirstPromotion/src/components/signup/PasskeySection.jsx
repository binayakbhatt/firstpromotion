import React from "react";
import { Fingerprint, CheckCircle2, AlertCircle } from "lucide-react";

const PasskeySection = ({ formData, isRegistered, onRegister }) => {
  const handlePasskeyRegister = async () => {
    if (!window.PublicKeyCredential) {
      alert("Passkeys are not supported on this device.");
      return;
    }

    try {
      // Simulate Server Challenge
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      const publicKey = {
        challenge,
        rp: { name: "FirstPromotion", id: window.location.hostname },
        user: {
          id: Uint8Array.from(formData.email || "test", (c) => c.charCodeAt(0)),
          name: formData.email || "user@example.com",
          displayName: formData.firstName || "User",
        },
        pubKeyCredParams: [{ alg: -7, type: "public-key" }],
        timeout: 60000,
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "required",
        },
      };

      const credential = await navigator.credentials.create({ publicKey });

      if (credential) {
        onRegister(); // Notify parent
        alert("Passkey created successfully!");
      }
    } catch (err) {
      console.error("Passkey Error:", err);
      alert("Passkey registration failed or cancelled.");
    }
  };

  return (
    <div className="md:col-span-2 bg-blue-50/50 p-6 rounded-3xl border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-4">
      <div>
        <h3 className="font-bold text-brand-navy flex items-center gap-2">
          <Fingerprint className="text-brand-green" size={20} />
          Go Passwordless?
        </h3>
        <p className="text-[10px] text-slate-500 font-medium mt-1">
          Use your device biometrics (FaceID/TouchID) instead of a password.
        </p>
      </div>

      {!isRegistered ? (
        <button
          type="button"
          onClick={handlePasskeyRegister}
          className="bg-white border-2 border-brand-navy/10 hover:border-brand-green text-brand-navy px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-sm hover:shadow-md"
        >
          Create Passkey
        </button>
      ) : (
        <div className="bg-green-100 text-brand-green px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2">
          <CheckCircle2 size={16} /> Passkey Active
        </div>
      )}
    </div>
  );
};

export default PasskeySection;
