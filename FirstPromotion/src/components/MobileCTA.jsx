import React, { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { CONTACT_DETAILS, APP_CONFIG } from "../constants";

/**
 * MobileCTA Component
 * * A fixed bottom navigation bar that appears only on mobile devices (md:hidden)
 * after the user has scrolled a certain distance. Designed to drive conversions
 * via WhatsApp integration.
 * * @component
 * @returns {React.JSX.Element|null} The sticky CTA bar or null if hidden/desktop.
 */
const MobileCTA = () => {
  /**
   * State to control the visibility of the CTA bar based on scroll position.
   * @type {[boolean, function]}
   */
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Effect hook to manage the scroll event listener.
   * Shows the CTA after 300px of vertical scrolling.
   */
  useEffect(() => {
    /**
     * Evaluates scroll position and updates visibility state.
     * Uses window.scrollY (modern standard) over window.pageYOffset.
     */
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Clean up the event listener on component unmount to prevent memory leaks
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // React 19: Returning null is still the standard way to skip rendering
  if (!isVisible) return null;

  return (
    <div
      className="md:hidden fixed bottom-6 left-0 right-0 z-100 px-6 animate-in fade-in slide-in-from-bottom-10 duration-500"
      role="complementary"
      aria-label="Mobile Call to Action"
    >
      <div className="bg-white/80 backdrop-blur-lg p-3 rounded-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex items-center justify-between gap-4">
        {/* Batch Information Section */}
        <div className="pl-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
            Next Batch
          </p>
          <p className="text-sm font-black text-brand-navy truncate max-w-30">
            {APP_CONFIG.currentBatch || "Jan 2026 Batch"}
          </p>
        </div>

        {/* WhatsApp Enrollment Link */}
        <a
          href={`https://wa.me/${
            CONTACT_DETAILS.phone
          }?text=${encodeURIComponent(
            CONTACT_DETAILS.whatsappDefaultMessage ||
              "I am interested in joining the Jan 2026 Batch"
          )}`}
          className="flex-1 bg-brand-green text-white font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-green-200 active:scale-95 transition-transform"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Send size={18} />
          <span>Enroll Now</span>
        </a>
      </div>
    </div>
  );
};

export default MobileCTA;
