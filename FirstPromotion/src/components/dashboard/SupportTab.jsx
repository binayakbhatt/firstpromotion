import React, { useState } from "react";
import {
  LifeBuoy,
  MessageSquare,
  FileQuestion,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Clock,
} from "lucide-react";
import { CONTACT_DETAILS } from "../../constants"; // Assuming you have this from footer logic

const SupportTab = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ticketType, setTicketType] = useState("academic"); // 'academic' | 'tech' | 'billing'

  // Form State
  const [formData, setFormData] = useState({
    subject: "",
    courseId: "",
    message: "",
  });

  // Mock Enrolled Courses for Dropdown
  const myCourses = [
    { id: "c1", title: "Postal Manual Vol V" },
    { id: "c2", title: "GDS to MTS Crash Course" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ subject: "", courseId: "", message: "" });

      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 4000);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-brand-navy flex items-center gap-2">
            <LifeBuoy className="text-brand-green" /> Help & Support
          </h2>
          <p className="text-slate-500 text-sm font-medium mt-1">
            Raise a doubt or contact our support team directly.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* 2. MAIN FORM SECTION (Left Column - Spans 2) */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100 relative overflow-hidden">
          {/* Success Overlay */}
          {success && (
            <div className="absolute inset-0 z-10 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 animate-in fade-in">
              <div className="w-16 h-16 bg-green-100 text-brand-green rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-black text-brand-navy mb-2">
                Ticket Raised Successfully!
              </h3>
              <p className="text-slate-500 max-w-xs">
                We have received your query. Our team usually responds within 24
                hours.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-6 font-bold text-sm text-brand-navy hover:underline"
              >
                Raise another ticket
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Ticket Type Toggles */}
            <div className="flex p-1 bg-slate-50 rounded-xl overflow-hidden">
              {[
                {
                  id: "academic",
                  label: "Ask a Doubt",
                  icon: <FileQuestion size={16} />,
                },
                {
                  id: "tech",
                  label: "App Issue",
                  icon: <MessageSquare size={16} />,
                },
                {
                  id: "billing",
                  label: "Billing",
                  icon: <AlertCircle size={16} />,
                },
              ].map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setTicketType(type.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider transition-all rounded-lg ${
                    ticketType === type.id
                      ? "bg-white text-brand-navy shadow-sm"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {type.icon}{" "}
                  <span className="hidden sm:inline">{type.label}</span>
                </button>
              ))}
            </div>

            {/* Dynamic Fields based on Type */}
            <div className="space-y-4">
              {/* Show Course Dropdown ONLY for Academic Doubts */}
              {ticketType === "academic" && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    Select Course
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={formData.courseId}
                      onChange={(e) =>
                        setFormData({ ...formData, courseId: e.target.value })
                      }
                      className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-700 outline-none border-2 border-transparent focus:border-brand-green/20 focus:bg-white transition-all appearance-none"
                    >
                      <option value="">-- Related Course --</option>
                      {myCourses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      size={16}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    ticketType === "academic"
                      ? "e.g., Explanation for Clause 5..."
                      : "e.g., Video not playing..."
                  }
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-700 outline-none border-2 border-transparent focus:border-brand-green/20 focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Description
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Describe your query in detail..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full p-4 bg-slate-50 rounded-2xl font-medium text-slate-700 outline-none border-2 border-transparent focus:border-brand-green/20 focus:bg-white transition-all resize-none"
                ></textarea>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-brand-navy text-white rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-brand-navy/20 disabled:opacity-70 active:scale-95"
              >
                {loading ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send size={16} /> Submit Ticket
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* 3. CONTACT INFO & HISTORY (Right Column) */}
        <div className="space-y-6">
          {/* Contact Card */}
          <div className="bg-brand-navy text-white rounded-[2rem] p-6 shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-black text-lg mb-4">Urgent Issue?</h3>
              <p className="text-slate-300 text-xs mb-6 leading-relaxed">
                For payment failures or login issues, you can contact us
                directly during working hours (10 AM - 6 PM).
              </p>

              <div className="space-y-3">
                <a
                  href={`tel:${CONTACT_DETAILS?.phone || ""}`}
                  className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-brand-green transition-colors"
                >
                  <Phone size={18} />
                  <span className="text-sm font-bold">
                    {CONTACT_DETAILS?.phone || "+91 98765 43210"}
                  </span>
                </a>
                <a
                  href={`mailto:${CONTACT_DETAILS?.email || ""}`}
                  className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-brand-green transition-colors"
                >
                  <Mail size={18} />
                  <span className="text-sm font-bold">
                    {CONTACT_DETAILS?.email || "help@firstpromotion.com"}
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Recent Activity Mini-List */}
          <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-brand-navy mb-4 flex items-center gap-2 text-sm">
              <Clock size={16} className="text-slate-400" /> Recent Tickets
            </h3>

            <div className="space-y-4">
              {/* Mock Item 1 */}
              <div className="pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-black uppercase text-brand-green bg-green-50 px-2 py-0.5 rounded">
                    Resolved
                  </span>
                  <span className="text-[10px] text-slate-400">Jan 12</span>
                </div>
                <p className="text-xs font-bold text-slate-700 line-clamp-1">
                  Login issue on Android 13
                </p>
              </div>

              {/* Mock Item 2 */}
              <div className="pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                    Pending
                  </span>
                  <span className="text-[10px] text-slate-400">Yesterday</span>
                </div>
                <p className="text-xs font-bold text-slate-700 line-clamp-1">
                  Doubt regarding SB Order 26/2023
                </p>
              </div>
            </div>

            <button className="w-full mt-4 text-[10px] font-bold text-slate-400 hover:text-brand-navy uppercase tracking-widest text-center">
              View All History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTab;
