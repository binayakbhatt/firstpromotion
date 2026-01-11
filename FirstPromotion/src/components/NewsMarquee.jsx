import React from "react";
import { Zap, ArrowRightCircle } from "lucide-react";

/**
 * @typedef {Object} MarqueeItem
 * @property {number} id - Unique identifier.
 * @property {string} text - The announcement text.
 */

/** @type {MarqueeItem[]} */
const MARQUEE_DATA = [
  { id: 1, text: "GDS to MTS Exam 2026: Application portal is now live." },
  { id: 2, text: "New Batch for IP Exam starting from next Monday." },
  {
    id: 3,
    text: "Congratulations to our 500+ selections in the recent PA/SA LGO Exam!",
  },
  {
    id: 4,
    text: "Download the updated Post Office Guide Part-1 PDF from the resources section.",
  },
];

/**
 * NewsMarquee Component
 * * A high-performance, CSS-animated scrolling ticker for urgent alerts.
 * * Optimized for React 19 with clean semantic structure.
 * * Features:
 * - Pause-on-hover functionality for better readability.
 * - Hardware-accelerated CSS animations.
 * - Infinite loop effect using duplicated content.
 * * @component
 */
const NewsMarquee = () => {
  return (
    <div className="bg-brand-navy border-y border-white/10 py-3 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 flex items-center">
        {/* Fixed Label */}
        <div className="flex items-center gap-2 bg-brand-green text-white px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest z-10 shrink-0 mr-6 shadow-lg shadow-brand-green/20">
          <Zap size={12} className="fill-current" />
          Alerts
        </div>

        {/* Marquee Container */}
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-12 group">
            {/* First Set of items */}
            <MarqueeContent items={MARQUEE_DATA} />
            {/* Duplicated set for seamless loop */}
            <MarqueeContent items={MARQUEE_DATA} ariaHidden={true} />
          </div>
        </div>
      </div>

      {/* Tailwind Custom Animation Injection */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

/** * Internal helper to render the marquee items
 * @private
 */
const MarqueeContent = ({ items, ariaHidden = false }) => (
  <div className="flex items-center gap-12" aria-hidden={ariaHidden}>
    {items.map((item) => (
      <div key={item.id} className="flex items-center gap-3">
        <span className="text-white font-bold text-sm tracking-wide">
          {item.text}
        </span>
        <ArrowRightCircle size={14} className="text-brand-green opacity-50" />
      </div>
    ))}
  </div>
);

export default NewsMarquee;
