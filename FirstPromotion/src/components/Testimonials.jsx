import React from "react";
import { Star, Quote, UserCircle } from "lucide-react";

/**
 * @typedef {Object} Testimonial
 * @property {number} id - Unique identifier.
 * @property {string} name - The student's name.
 * @property {string} role - Their current or achieved postal rank.
 * @property {string} quote - The success story or feedback.
 * @property {number} rating - Number of stars (1-5).
 */

/**
 * Success stories from verified aspirants.
 * @type {Testimonial[]}
 */
const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "Sandeep Yadav",
    role: "Postal Assistant (Selected 2024)",
    quote:
      "As a GDS in a rural branch, I had no guidance. FirstPromotion's mobile-friendly lectures allowed me to study during my lunch breaks effectively.",
    rating: 5,
  },
  {
    id: 2,
    name: "Anjali Deshmukh",
    role: "Inspector of Posts (Qualified)",
    quote:
      "The IPO exam is tough, but the faculty here breaks down complex Postal Manuals into simple, easy-to-remember points and mnemonics.",
    rating: 5,
  },
  {
    id: 3,
    name: "Vikram Meena",
    role: "MTS to Postman (Rank 1)",
    quote:
      "The mock tests are exactly like the real exam. I wasn't nervous during the paper because I had already practiced extensively on this platform.",
    rating: 5,
  },
];

/**
 * Testimonials Component
 * * Showcases student success stories using a modern card-based grid.
 * * Features:
 * - Dynamic star rating rendering using Lucide-React.
 * - Quote icons for visual context.
 * - Hardware-accelerated hover effects.
 * - React 19 optimized list rendering.
 * * @component
 * @returns {React.JSX.Element} The Student Success section.
 */
const Testimonials = () => {
  return (
    <section
      className="py-24 bg-slate-50 relative overflow-hidden"
      id="testimonials"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-navy/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <header>
            <h2 className="text-brand-green font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3">
              Student Success
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-brand-navy">
              What Aspirants Say
            </h3>
            <div className="h-1.5 w-20 bg-brand-green mx-auto mt-6 rounded-full"></div>
          </header>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((item) => (
            <article
              key={item.id}
              className="bg-white p-8 rounded-4xl shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              {/* Star Rating & Quote Icon */}
              <div className="flex justify-between items-start mb-6">
                <div
                  className="flex gap-1"
                  aria-label={`Rating: ${item.rating} stars`}
                >
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <Quote
                  className="text-slate-100 group-hover:text-brand-green/20 transition-colors duration-500"
                  size={40}
                />
              </div>

              {/* Success Quote */}
              <blockquote className="grow text-slate-600 italic mb-8 leading-relaxed font-medium">
                "{item.quote}"
              </blockquote>

              {/* Student Profile Section */}
              <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 border border-slate-100 group-hover:border-brand-green/30 group-hover:bg-green-50/50 transition-all duration-300">
                  <UserCircle
                    size={32}
                    strokeWidth={1.5}
                    className="group-hover:text-brand-green transition-colors"
                  />
                </div>
                <div>
                  <h4 className="font-black text-brand-navy group-hover:text-brand-green transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-[10px] md:text-xs text-brand-green font-black uppercase tracking-widest mt-1">
                    {item.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
