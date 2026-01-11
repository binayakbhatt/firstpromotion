import React from "react";
import { Landmark, Cpu, ClipboardCheck, BookOpenText } from "lucide-react";

/**
 * @typedef {Object} AdvantageItem
 * @property {string} title - The heading of the advantage.
 * @property {string} description - Detailed explanation of the benefit.
 * @property {React.ReactNode} icon - Lucide icon component.
 */

/**
 * Data configuration for the Advantages section.
 * Separating data from logic improves maintainability.
 * @type {AdvantageItem[]}
 */
const ADVANTAGES_DATA = [
  {
    title: "Departmental Expertise",
    description:
      "Specialized coaching specifically for India Post exams like GDS to PA/SA and Postman recruitment with deep focus on departmental rules.",
    icon: <Landmark className="w-8 h-8 text-brand-green" />,
  },
  {
    title: "AI-Powered MCQ Practice",
    description:
      "Sectional MCQ practice based on previous years' patterns. Includes AI-generated questions to target and strengthen your weak areas effectively.",
    icon: <Cpu className="w-8 h-8 text-brand-green" />,
  },
  {
    title: "Paper-wise Mock Tests",
    description:
      "Experience real-time exam simulation with instant results and detailed performance analytics to track your progress before the real test.",
    icon: <ClipboardCheck className="w-8 h-8 text-brand-green" />,
  },
  {
    title: "Updated Study Material",
    description:
      "Every module is updated for the 2026 pattern, including the latest postal guides, volume rules, and general awareness updates.",
    icon: <BookOpenText className="w-8 h-8 text-brand-green" />,
  },
];

/**
 * Advantages Component
 * * A grid-based feature section highlighting the USPs of FirstPromotion.in.
 * * Features:
 * - Responsive 1 to 3 column grid transition.
 * - Interactive hover states with hardware-accelerated transforms.
 * - React 19 optimized rendering with clean component separation.
 * * @component
 * @returns {React.JSX.Element} The Advantages section.
 */
const Advantages = () => {
  return (
    <section className="py-20 bg-slate-50" aria-labelledby="advantages-heading">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <header className="text-center mb-16">
          <h2
            id="advantages-heading"
            className="text-brand-green font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3"
          >
            Why Choose Us
          </h2>
          <p className="text-3xl md:text-5xl font-black text-brand-navy">
            The <span className="italic font-serif">FirstPromotion</span>{" "}
            Advantage
          </p>
          <div className="h-1.5 w-24 bg-brand-green mx-auto mt-6 rounded-full shadow-sm"></div>
        </header>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ADVANTAGES_DATA.map((item, index) => (
            <article
              key={item.title} // React 19 prefers stable keys over indexes
              className="group bg-white p-8 rounded-4xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 flex flex-col items-center text-center lg:items-start lg:text-left"
            >
              {/* Icon Container with subtle animation */}
              <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-green group-hover:rotate-360 transition-all duration-700">
                <span className="group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </span>
              </div>

              <h3 className="text-xl font-black text-brand-navy mb-4 group-hover:text-brand-green transition-colors">
                {item.title}
              </h3>

              <p className="text-slate-600 leading-relaxed text-sm font-medium">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Trust Indicator - Mini Banner */}
      <div className="max-w-4xl mx-auto mt-16 px-6">
        <div className="bg-brand-navy rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl overflow-hidden relative">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/10 rounded-full blur-3xl -mr-10 -mt-10"></div>

          <div className="relative z-10">
            <h4 className="text-white text-lg font-bold">
              Ready to secure your promotion?
            </h4>
            <p className="text-blue-100 text-sm">
              Join courses specifically designed for Postal aspirants.
            </p>
          </div>

          <a
            href="#courses"
            className="relative z-10 bg-brand-green text-white px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all inline-block text-center"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
