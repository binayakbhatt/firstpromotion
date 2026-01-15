import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  BookOpen,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
  LifeBuoy, // Icon for Support
} from "lucide-react";

// Sub-components
import OverviewTab from "../components/dashboard/OverviewTab";
import CoursesTab from "../components/dashboard/CoursesTab";
import SettingsTab from "../components/dashboard/SettingsTab";
import SupportTab from "../components/dashboard/SupportTab";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // --- NAVIGATION CONFIG ---
  const navItems = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={20} /> },
    { id: "courses", label: "Courses", icon: <BookOpen size={20} /> },
    { id: "support", label: "Support", icon: <LifeBuoy size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab user={user} setActiveTab={setActiveTab} />;
      case "courses":
        return <CoursesTab />;
      case "support":
        return <SupportTab user={user} />;
      case "settings":
        return <SettingsTab user={user} />;
      default:
        return <OverviewTab user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      {/* ==============================================
          DESKTOP SIDEBAR (Hidden on Mobile)
      =============================================== */}
      <aside className="hidden lg:flex flex-col w-64 bg-brand-navy text-white fixed h-full z-20 shadow-2xl">
        <div className="p-8">
          <h2 className="text-2xl font-black tracking-tighter">
            FirstPromotion
          </h2>
          <p className="text-xs text-slate-400 font-bold tracking-widest uppercase mt-1">
            Student Portal
          </p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
                activeTab === item.id
                  ? "bg-brand-green text-white shadow-lg shadow-brand-green/20"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Decorative Element (Visual balance since Logout is moved) */}
        <div className="p-8 mt-auto opacity-20 pointer-events-none">
          <div className="w-full h-32 bg-gradient-to-t from-white/20 to-transparent rounded-2xl"></div>
        </div>
      </aside>

      {/* ==============================================
          MOBILE BOTTOM NAVIGATION (Visible only on Mobile)
      =============================================== */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 z-40 px-6 py-3 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] safe-area-bottom">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              activeTab === item.id
                ? "text-brand-navy scale-110"
                : "text-slate-400"
            }`}
          >
            <div
              className={`p-2 rounded-full ${
                activeTab === item.id ? "bg-brand-navy/10" : "bg-transparent"
              }`}
            >
              {React.cloneElement(item.icon, {
                size: 24,
                strokeWidth: activeTab === item.id ? 2.5 : 2,
              })}
            </div>
            <span className="text-[10px] font-bold">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* ==============================================
          MAIN CONTENT AREA
      =============================================== */}
      <main className="flex-1 lg:ml-64 relative">
        {/* --- Header --- */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shadow-sm border-b border-slate-100">
          <div className="flex items-center gap-4">
            {/* Mobile Logo / Branding */}
            <div className="lg:hidden">
              <span className="text-lg font-black text-brand-navy tracking-tight">
                FP<span className="text-brand-green">.</span>
              </span>
            </div>

            {/* Desktop Page Title */}
            <h1 className="text-xl font-black text-brand-navy capitalize hidden lg:block">
              {activeTab.replace("-", " ")}
            </h1>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button className="p-2 text-slate-400 hover:text-brand-navy transition-colors relative">
              <Bell size={22} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>

            {/* User Profile Toggle */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-sm shadow-md">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <ChevronDown
                  size={14}
                  className={`text-slate-400 transition-transform duration-200 ${
                    isProfileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40 bg-transparent cursor-default"
                    onClick={() => setIsProfileMenuOpen(false)}
                  ></div>
                  <div className="absolute top-full right-0 mt-2 z-50 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-slate-50 mb-1">
                      <p className="text-sm font-bold text-brand-navy truncate">
                        {user?.name || "Aspirant"}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {user?.email}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab("settings");
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-colors"
                    >
                      <Settings size={16} /> Account Settings
                    </button>

                    <div className="h-px bg-slate-50 my-1"></div>

                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl flex items-center gap-2 transition-colors"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* --- Content Body --- */}
        {/* pb-24 is crucial for Mobile to prevent content hiding behind bottom nav */}
        <div className="p-4 pb-24 sm:p-6 lg:pb-6 max-w-7xl mx-auto animate-in fade-in duration-300">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
