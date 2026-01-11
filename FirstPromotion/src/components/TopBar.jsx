import React from "react";
import { Instagram, Facebook, Youtube, Send, Twitter } from "lucide-react";

/**
 * @typedef {Object} SocialLink
 * @property {React.ReactNode} icon - The Lucide icon component or custom SVG.
 * @property {string} url - Destination URL for the social platform.
 * @property {string} label - Accessible name for screen readers.
 */

/**
 * Social media configuration for the top bar.
 * Replaced the inline SVG for X with a consistent Lucide component for cleaner code.
 * @type {SocialLink[]}
 */
const SOCIAL_LINKS = [
  { icon: <Facebook size={14} />, url: "#", label: "Facebook" },
  { icon: <Instagram size={14} />, url: "#", label: "Instagram" },
  { icon: <Youtube size={14} />, url: "#", label: "Youtube" },
  { icon: <Twitter size={14} />, url: "#", label: "X (Twitter)" },
  { icon: <Send size={14} />, url: "#", label: "Telegram" },
];

/**
 * TopBar Component
 * * * A utility header bar for social links and high-level marketing text.
 * * Features:
 * - React 19 optimized rendering.
 * - Hardware-accelerated hover transformations.
 * - Responsive visibility logic for mobile vs desktop.
 * - Centralized link management for better maintenance.
 * * @component
 * @returns {React.JSX.Element} The promotional top bar.
 */
const TopBar = () => {
  return (
    <aside
      className="bg-brand-navy text-white py-2.5 border-b border-white/5 select-none"
      aria-label="Social and Promotions"
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Promotional Tagline */}
        <p className="hidden md:block text-[10px] font-black uppercase tracking-[0.25em] text-blue-100/80">
          Your Next Promotion Starts Here{" "}
          <span className="text-brand-green">!</span>
        </p>

        {/* Social Navigation */}
        <nav className="flex items-center gap-6 mx-auto md:mx-0">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label} // Using stable label as key in React 19
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-brand-green transition-all duration-300 hover:scale-125 active:scale-90 flex items-center justify-center"
              aria-label={social.label}
              title={social.label}
            >
              {social.icon}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default TopBar;
