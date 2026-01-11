import React from "react";
import { UserCircle, ArrowRight } from "lucide-react";
import heroImg from "../assets/hero-image.webp";
import heroImgMobile from "../assets/hero-image-mobile.webp";
import { CONTACT_DETAILS, APP_CONFIG } from "../constants";

/**
 * Hero Component - Full Screen Overlay Design with Responsive Images
 * * FIX: Swapped logic to ensure mobile image is the default fallback,
 * while the <source> tag handles the desktop breakpoint (768px).
 * * @component
 */
const Hero = () => {
  return (
    <section
      className="relative w-full h-screen bg-slate-900 overflow-hidden"
      aria-label="Hero Section"
    >
      {/* 1. IMAGE LAYER - Responsive images for mobile and desktop */}
      <div className="absolute inset-0 w-full h-full z-0">
        <picture className="w-full h-full">
          {/* DESKTOP: Shown only on screens 768px and wider */}
          <source media="(min-width: 768px)" srcSet={heroImg} />

          {/* MOBILE & FALLBACK: The <img> tag should be the mobile version by default */}
          <img
            src={heroImgMobile}
            alt="FirstPromotion Learning"
            className="w-full h-full object-cover object-center transition-transform duration-1000"
            loading="eager"
            fetchPriority="high"
          />
        </picture>

        {/* Gradient Overlay - Adaptive for mobile (top-to-bottom) and desktop (left-to-right) */}
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-slate-900/95 via-slate-900/60 to-slate-900/20 md:to-transparent"></div>
      </div>

      {/* 2. CONTENT LAYER */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6 py-8 md:py-12 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl text-center md:text-left w-full">
          {/* Pulse Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full mb-4 md:mb-6 mx-auto md:mx-0 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
            </span>
            <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest">
              {APP_CONFIG?.currentBatch || "Jan 2026 Batch Open"}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white leading-[1.2] md:leading-[1.1] mb-3 md:mb-6">
            Your Shortcut to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-emerald-400">
              Departmental Promotion
            </span>
          </h1>

          <p className="text-sm md:text-xl text-slate-300 mb-6 md:mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed">
            Trusted coaching for{" "}
            <span className="font-bold text-white">
              PA, SA, Postman & IPO, PS Group B
            </span>{" "}
            Departmental exams.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start">
            <a
              href="#courses"
              className="w-full sm:w-auto bg-brand-green text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-lg shadow-brand-green/20 active:scale-95 text-center flex items-center justify-center gap-2 transition-all hover:bg-emerald-500"
            >
              View Courses
              <ArrowRight size={20} />
            </a>
            <a
              href={`https://wa.me/${CONTACT_DETAILS.phone}`}
              className="w-full sm:w-auto bg-white/10 text-white border border-white/30 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg active:scale-95 text-center transition-all hover:bg-white/20"
            >
              Free Demo Class
            </a>
          </div>

          {/* Social Proof Section */}
          <div className="mt-6 md:mt-12 flex items-center justify-center md:justify-start gap-3">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-slate-500"
                >
                  <UserCircle size={24} />
                </div>
              ))}
            </div>
            <p className="text-xs md:text-sm font-medium text-slate-400">
              <span className="text-white font-bold">1,200+</span> Students
              Enrolled this month
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
