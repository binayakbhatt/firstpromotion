import React, { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  Loader2,
  RefreshCw,
  CreditCard,
  Lock,
} from "lucide-react";

const PaymentGateway = ({ formData, onSuccess }) => {
  const [status, setStatus] = useState("idle"); // 'idle' | 'processing' | 'failed' | 'success'

  const handlePayment = async () => {
    setStatus("processing");
    setTimeout(() => {
      // Simulate random success/failure
      const isSuccess = Math.random() > 0.3;

      if (isSuccess) {
        setStatus("success");
        setTimeout(() => onSuccess(), 1500); // Trigger navigation in parent
      } else {
        setStatus("failed");
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-slate-100 relative overflow-hidden">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-brand-navy mb-2">
            Complete Registration
          </h2>
          <p className="text-slate-500 text-sm">
            Secure seat in{" "}
            <span className="font-bold text-brand-green">
              {formData.course}
            </span>
          </p>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              STUDENT
            </span>
            <span className="text-sm font-bold">{formData.firstName}</span>
          </div>
          <div className="border-t border-slate-200 my-4"></div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold">Total</span>
            <span className="text-2xl font-black text-brand-green">₹1,999</span>
          </div>
        </div>

        {status === "failed" && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6 animate-shake">
            <div className="flex items-center gap-3 text-red-600 font-bold mb-2">
              <AlertTriangle size={20} /> Payment Failed
            </div>
            <p className="text-xs text-red-500 leading-relaxed font-medium">
              Transaction failed. Please try again.
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6 text-center">
            <div className="w-12 h-12 bg-green-100 text-brand-green rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 size={24} />
            </div>
            <p className="text-brand-green font-bold">Payment Successful!</p>
            <p className="text-xs text-green-600 mt-1">
              Redirecting to Dashboard...
            </p>
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={status === "processing" || status === "success"}
          className={`w-full py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-2 ${
            status === "failed"
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-brand-navy hover:bg-slate-800 text-white"
          }`}
        >
          {status === "processing" ? (
            <>
              <Loader2 className="animate-spin" size={18} /> Processing...
            </>
          ) : status === "failed" ? (
            <>
              <RefreshCw size={18} /> Retry Payment
            </>
          ) : (
            <>
              <CreditCard size={18} /> Pay Now
            </>
          )}
        </button>

        <div className="mt-6 text-center">
          <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
            <Lock size={10} /> 256-bit SSL Secured Payment
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
