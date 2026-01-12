import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  UserCircle,
  LogOut,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext"; // 1. Import Auth Context

/**
 * Navbar Component for FirstPromotion.in
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth(); // 2. Get User State & Logout Function
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home after logout
    setIsMenuOpen(false);
  };

  const navLinks = [
    { label: "Courses", href: "/courses" },
    { label: "Hall of Fame", href: "/hall-of-fame" },
    { label: "Know Your PO", href: "/know-your-po" },
    { label: "Latest Updates", href: "/latest-updates" },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex justify-between items-center">
        {/* Branding Section */}
        <Link
          to="/"
          className="flex items-center gap-2 md:gap-3 shrink-0 group"
        >
          <img
            src={logo}
            alt="FirstPromotion Logo"
            className="h-9 w-auto md:h-11 rounded shadow-sm group-hover:scale-105 transition-transform"
          />
          <h1 className="text-lg md:text-2xl font-black tracking-tight">
            <span className="text-brand-navy">First</span>
            <span className="text-brand-green">Promotion</span>
            <span className="hidden xs:inline text-black">.in</span>
          </h1>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`text-sm font-bold transition-all flex items-center gap-1.5 ${
                link.highlight
                  ? "text-brand-navy hover:text-brand-green"
                  : "text-slate-600 hover:text-brand-green"
              }`}
            >
              {link.label}
              {link.highlight && (
                <Sparkles
                  size={14}
                  className="text-brand-green animate-pulse"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Action Group: Auth Logic + Toggle */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* 3. CONDITIONAL RENDERING (Desktop) */}
          {user ? (
            // STATE: LOGGED IN
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 bg-slate-100 text-brand-navy px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all"
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-50 text-red-500 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-red-100 transition-all"
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            // STATE: LOGGED OUT (Guest)
            <Link
              to="/login"
              className="hidden lg:flex items-center gap-2 bg-brand-navy text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-brand-navy/10 hover:bg-brand-navy/90 active:scale-95 transition-all"
            >
              <UserCircle size={18} />
              <span>Login</span>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-slate-50 ${
          isMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`text-xl font-black uppercase tracking-tight flex justify-between items-center transition-colors ${
                link.highlight ? "text-brand-green" : "text-slate-800"
              }`}
            >
              {link.label}
              <ChevronIcon />
            </Link>
          ))}

          {/* 4. CONDITIONAL RENDERING (Mobile) */}
          <div className="border-t border-slate-100 pt-6 mt-2">
            {user ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-brand-navy text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {user.name ? user.name.charAt(0) : "U"}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-navy">
                      {user.name || "Student"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {user.circle || "India Post"}
                    </p>
                  </div>
                </div>

                <Link
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-brand-navy text-white p-4 rounded-2xl font-black uppercase tracking-widest text-sm"
                >
                  <LayoutDashboard size={20} /> Go to Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 bg-red-50 text-red-500 p-4 rounded-2xl font-black uppercase tracking-widest text-sm"
                >
                  <LogOut size={20} /> Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-slate-100 p-4 rounded-2xl font-black text-brand-navy uppercase tracking-widest text-sm"
              >
                <UserCircle size={20} /> Student Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

/** @private */
const ChevronIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-slate-200"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default Navbar;
