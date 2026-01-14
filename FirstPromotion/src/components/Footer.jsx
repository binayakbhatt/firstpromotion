import React from "react";
import {
  Instagram,
  Facebook,
  Youtube,
  Send,
  Twitter,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import logo from "../assets/logo.png";

/**
 * @typedef {Object} FooterLink
 * @property {string} name - Display text for the link.
 * @property {string} href - URL or section ID.
 * @property {boolean} [external] - Whether the link opens in a new tab.
 */

/** @type {FooterLink[]} */
const QUICK_LINKS = [
  { name: "All Courses", href: "#courses" },
  { name: "Know Your Post Office", href: "#" },
  { name: "Hall of Fame", href: "#" },
  { name: "Support", href: "#contact" },
];

/** @type {FooterLink[]} */
const RESOURCES = [
  {
    name: "India Post Official Site",
    href: "https://www.indiapost.gov.in",
    external: true,
  },
  { name: "Syllabus PDF", href: "#" },
  { name: "Previous Year Papers", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

/**
 * Footer Component
 * * Optimized for React 19.
 * Features:
 * - Dynamic year rendering.
 * - Organized link metadata for easy maintenance.
 * - Social media integration with Lucide icons.
 * - Newsletter subscription UI.
 * * @component
 * @returns {React.JSX.Element} The site footer.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-slate-950 text-slate-400 pt-20 pb-10"
      aria-label="Site Footer"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section: Branding and Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Column 1: Brand Pitch */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="FirstPromotion Logo"
                className="h-12 w-auto rounded-lg shadow-lg shadow-brand-green/10"
                loading="lazy"
              />
              <span className="text-2xl font-black tracking-tighter text-white">
                First<span className="text-brand-green">Promotion</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed font-medium">
              A focused preparation platform for Department of Posts
              departmental exams, helping GDS and postal employees study smarter
              through topic-wise MCQs, planned revision, and performance
              tracking.
            </p>
            {/* Social Icons Container */}
            <div className="flex gap-4">
              {[
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Facebook, href: "#", label: "Facebook" },
                { Icon: Youtube, href: "#", label: "YouTube" },
                { Icon: Send, href: "#", label: "Telegram" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-300 hover:bg-brand-green hover:text-white hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-brand-green rounded-full translate-y-2"></span>
            </h4>
            <ul className="space-y-4">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-sm hover:text-brand-green transition-colors"
                  >
                    <ChevronRight
                      size={14}
                      className="text-brand-green opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                    />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Important Resources */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
              Resources
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-brand-green rounded-full translate-y-2"></span>
            </h4>
            <ul className="space-y-4">
              {RESOURCES.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : "_self"}
                    rel={link.external ? "noopener noreferrer" : ""}
                    className="flex items-center gap-2 text-sm hover:text-brand-green transition-colors"
                  >
                    {link.name}
                    {link.external && (
                      <ExternalLink size={12} className="opacity-50" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter/CTA */}
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            <h4 className="text-white font-bold mb-4">Stay Informed</h4>
            <p className="text-xs mb-6 leading-relaxed text-slate-400">
              Receive instant alerts about new departmental notifications and
              batch openings.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Work Email Address"
                required
                className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green transition-all"
              />
              <button
                type="submit"
                className="w-full bg-brand-green text-white font-black py-3 rounded-xl text-xs uppercase tracking-[0.2em] hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-brand-green/10"
              >
                Join Updates
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="border-t border-slate-800/50 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[11px] font-bold tracking-wider uppercase text-slate-500">
            © {currentYear} FirstPromotion.in •{" "}
            <span className="text-slate-600">Built for Postal Aspirants</span>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <p className="text-[10px] text-slate-600 max-w-xs text-center md:text-right italic leading-tight">
              FirstPromotion is an independent coaching platform and is not
              officially affiliated with the Department of Posts.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
