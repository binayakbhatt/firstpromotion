import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQ_DATA } from "../constants";

/**
 * FAQ Component
 * * An interactive accordion-style section that displays frequently asked questions.
 * Uses CSS Grid transitions (0fr to 1fr) for smooth height animation without
 * the limitations of fixed max-height.
 * * @component
 * @example
 * return (
 * <FAQ />
 * )
 */
const FAQ = () => {
  /**
   * State to track the index of the currently open accordion item.
   * Defaulted to 0 to show the first question on load.
   * @type {[number|null, function]}
   */
  const [openIndex, setOpenIndex] = useState(0);

  /**
   * Toggles the visibility of an accordion item.
   * If the clicked item is already open, it closes it (sets state to null).
   * * @param {number} index - The index of the FAQ item in the FAQ_DATA array.
   * @returns {void}
   */
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-slate-50" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-brand-navy px-4 py-2 rounded-full mb-4">
            <HelpCircle size={16} className="text-brand-green" />
            <span className="text-xs font-bold uppercase tracking-widest">
              Support
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-brand-navy mb-4">
            Common Questions
          </h2>
          <p className="text-slate-600">
            Everything you need to know about the batch and our teaching
            process.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => (
            <div
              key={index}
              className={`border rounded-2xl transition-all duration-300 ${
                openIndex === index
                  ? "bg-white border-brand-green/30 shadow-xl shadow-brand-navy/5"
                  : "bg-white/50 border-slate-200"
              }`}
            >
              {/* Question Trigger */}
              <button
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left outline-none group"
              >
                <span
                  className={`font-bold transition-colors ${
                    openIndex === index ? "text-brand-navy" : "text-slate-700"
                  }`}
                >
                  {item.question}
                </span>
                <ChevronDown
                  className={`text-slate-400 transition-transform duration-300 ${
                    openIndex === index
                      ? "rotate-180 text-brand-green"
                      : "group-hover:text-slate-600"
                  }`}
                  size={20}
                />
              </button>

              {/* Animated Answer Container (CSS Grid Method) */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-50">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm italic">
            Still have questions?{" "}
            <a
              href="#contact"
              className="text-brand-green font-bold underline decoration-2 underline-offset-4 hover:text-green-600 transition-colors"
            >
              Ask us directly
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
