import React, { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { useLocation } from "react-router-dom"; // 1. Import useLocation
import { CONTACT_DETAILS, APP_CONFIG } from "../constants";

/**
 * MobileCTA Component
 * * A fixed bottom navigation bar that appears only on mobile devices (md:hidden)
 * after the user has scrolled a certain distance.
 * * Automatically hides itself on non-marketing pages (Dashboard, Login, etc.)
 */
const MobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation(); // 2. Get current route

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // 3. Logic to hide CTA on specific routes
  const hiddenRoutes = ["/dashboard", "/login", "/signup", "/payment-gateway"];
  const isHiddenPage = hiddenRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  // If on a hidden page OR not scrolled enough, render nothing
  if (isHiddenPage || !isVisible) return null;

  return (
    <div
      className="md:hidden fixed bottom-6 left-0 right-0 z-50 px-6 animate-in fade-in slide-in-from-bottom-10 duration-500"
      role="complementary"
      aria-label="Mobile Call to Action"
    >
      <div className="bg-white/90 backdrop-blur-lg p-3 rounded-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex items-center justify-between gap-4">
        {/* Batch Information Section */}
        <div className="pl-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
            Next Batch
          </p>
          <p className="text-sm font-black text-brand-navy truncate max-w-[120px]">
            {APP_CONFIG?.currentBatch || "Jan 2026 Batch"}
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
