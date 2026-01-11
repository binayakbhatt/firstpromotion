import React, { useState } from "react";
import { Mail, Phone, Send, MapPin } from "lucide-react";
import { CONTACT_DETAILS } from "../constants";

/**
 * List of available courses for the dropdown menu.
 * @constant {string[]}
 */
const COURSE_OPTIONS = [
  "GDS to MTS / Postman",
  "Postman/MTS to PA/SA",
  "PA to Inspector of Posts",
  "PS Group B Exam",
];

/**
 * Contact Component
 * * A dual-column layout featuring contact details on the left and an interactive form on the right.
 * * Uses client-side validation for phone numbers and redirects to the user's default mail client
 * via a constructed `mailto:` link.
 * * @component
 * @returns {React.JSX.Element} The Contact Us section.
 */
const Contact = () => {
  /**
   * State object to manage form input values.
   * @type {[{name: string, phone: string, course: string, message: string}, Function]}
   */
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    course: COURSE_OPTIONS[0],
    message: "",
  });

  /**
   * State to handle validation error messages for the phone input.
   * @type {[string, Function]}
   */
  const [phoneError, setPhoneError] = useState("");

  /**
   * Updates form state on user input.
   * Clears specific error messages when the user begins correcting them.
   * * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} e - The change event.
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // UX Improvement: Clear error immediately when user types in the phone field
    if (e.target.name === "phone") setPhoneError("");
  };

  /**
   * Validates inputs and constructs a `mailto` URL to open the user's email client.
   * * @param {React.FormEvent} e - The form submission event.
   */
  const handleSendEmail = (e) => {
    e.preventDefault();

    // 1. Strict Validation: Checks for exactly 10 digits
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(formData.phone)) {
      setPhoneError("Please enter a valid 10-digit mobile number.");
      return;
    }

    // 2. Construct the Email Body with proper encoding
    const subject = encodeURIComponent(
      `Inquiry from ${formData.name} - FirstPromotion.in`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
        `Phone: ${formData.phone}\n` +
        `Interested Course: ${formData.course}\n\n` +
        `Message:\n${formData.message}`
    );

    // 3. Trigger Mail Client
    window.location.href = `mailto:${CONTACT_DETAILS.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      className="py-20 bg-white"
      id="contact"
      aria-label="Contact Section"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-brand-navy rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          {/* Left Side: Contact Information Panel */}
          <div className="lg:w-1/3 bg-brand-navy p-10 lg:p-16 text-white relative overflow-hidden">
            {/* Decorative Background Element */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

            <h3 className="text-3xl font-black mb-6 relative z-10">
              Get in Touch
            </h3>
            <p className="text-blue-100 mb-12 leading-relaxed relative z-10">
              Have questions about the PA/SA batch? Our team is here to guide
              you toward your promotion.
            </p>

            <div className="space-y-8 relative z-10">
              {/* Email Item */}
              <div className="flex items-start gap-4 group">
                <div className="bg-white/10 p-3 rounded-xl text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-blue-200 uppercase font-bold tracking-widest mb-1">
                    Email Us
                  </p>
                  <a
                    href={`mailto:${CONTACT_DETAILS.email}`}
                    className="text-lg font-medium hover:text-brand-green transition-colors"
                  >
                    {CONTACT_DETAILS.email}
                  </a>
                </div>
              </div>

              {/* Phone Item */}
              <div className="flex items-start gap-4 group">
                <div className="bg-white/10 p-3 rounded-xl text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-blue-200 uppercase font-bold tracking-widest mb-1">
                    Call / WhatsApp
                  </p>
                  <a
                    href={`tel:${CONTACT_DETAILS.phone}`}
                    className="text-lg font-medium hover:text-brand-green transition-colors"
                  >
                    {CONTACT_DETAILS.displayPhone}
                  </a>
                </div>
              </div>

              {/* Location Item (Optional addition for credibility) */}
              <div className="flex items-start gap-4 group">
                <div className="bg-white/10 p-3 rounded-xl text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-blue-200 uppercase font-bold tracking-widest mb-1">
                    Location
                  </p>
                  <p className="text-lg font-medium">India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Form */}
          <div className="lg:w-2/3 bg-white p-10 lg:p-16">
            <form
              onSubmit={handleSendEmail}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Name Input */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-bold text-slate-700"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-green focus:ring-4 focus:ring-green-50 outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Phone Input with Validation Styling */}
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-bold text-slate-700"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  aria-invalid={phoneError ? "true" : "false"}
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition-all placeholder:text-slate-400 ${
                    phoneError
                      ? "border-red-500 ring-4 ring-red-50"
                      : "border-slate-200 focus:border-brand-green focus:ring-4 focus:ring-green-50"
                  }`}
                />
                {/* Live Region for Screen Readers */}
                <div aria-live="polite">
                  {phoneError && (
                    <p className="text-red-500 text-xs font-bold mt-1 animate-pulse">
                      {phoneError}
                    </p>
                  )}
                </div>
              </div>

              {/* Course Selection Dropdown */}
              <div className="space-y-2 md:col-span-2">
                <label
                  htmlFor="course"
                  className="text-sm font-bold text-slate-700"
                >
                  Select Course
                </label>
                <div className="relative">
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-green focus:ring-4 focus:ring-green-50 outline-none transition-all bg-white appearance-none cursor-pointer"
                  >
                    {COURSE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {/* Custom Arrow Icon for Select */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message Textarea */}
              <div className="space-y-2 md:col-span-2">
                <label
                  htmlFor="message"
                  className="text-sm font-bold text-slate-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-green focus:ring-4 focus:ring-green-50 outline-none transition-all placeholder:text-slate-400 resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 mt-2">
                <button
                  type="submit"
                  className="w-full bg-brand-green text-white font-black py-4 rounded-xl shadow-xl shadow-brand-green/20 hover:bg-green-600 hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all uppercase tracking-widest cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <span>Send Message</span>
                  <Send
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
