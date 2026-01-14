import React from "react";
// Added BrainCircuit for "Memory/Revision" and BarChart3 for "Analytics"
import { Cpu, BookOpenText, BrainCircuit, BarChart3 } from "lucide-react";

/**
 * @typedef {Object} AdvantageItem
 * @property {string} title - The heading of the advantage.
 * @property {string} description - Detailed explanation of the benefit.
 * @property {React.ReactNode} icon - Lucide icon component.
 */

/**
 * Data configuration for the Advantages section.
 * Refactored to highlight Technical USPs translated into Aspirant Benefits.
 * @type {AdvantageItem[]}
 */
const ADVANTAGES_DATA = [
  {
    title: "Never Forget a Rule",
    description:
      "Our 'Smart Revision Engine' remind you of specific topic exactly when you are about to forget them.",
    icon: <BrainCircuit className="w-8 h-8 text-brand-green" />,
  },
  {
    title: "Real Exam Simulation",
    description:
      "Don't just practice; predict your score. Solve topic-wise MCQs of varied difficulty levels.",
    icon: <Cpu className="w-8 h-8 text-brand-green" />,
  },
  {
    title: "Pinpoint Weak Areas",
    description:
      "Stop wasting time on topics you already know. Our analytics highlight your 'Weak Zones' so you can fix them fast.",
    icon: <BarChart3 className="w-8 h-8 text-brand-green" />,
  },
  {
    title: "Focus-Driven Learning",
    description:
      "Master the syllabus with detailed video lectures, PDF notes, and a built-in Study Timer to maximize your concentration after a long duty shift.",
    icon: <BookOpenText className="w-8 h-8 text-brand-green" />,
  },
];

/**
 * Advantages Component
 * A grid-based feature section highlighting the USPs of FirstPromotion.in.
 * @component
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
          {ADVANTAGES_DATA.map((item) => (
            <article
              key={item.title}
              className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 flex flex-col items-center text-center lg:items-start lg:text-left"
            >
              {/* Icon Container with subtle animation */}
              <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-green group-hover:rotate-180 transition-all duration-700">
                <span className="group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </span>
              </div>

              <h3 className="text-xl font-black text-brand-navy mb-4 group-hover:text-brand-green transition-colors leading-tight">
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
            className="relative z-10 bg-brand-green text-white px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all inline-block text-center shadow-lg shadow-brand-green/20"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
