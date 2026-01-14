import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  BookOpen,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
} from "lucide-react";

// Sub-components
import OverviewTab from "../components/dashboard/OverviewTab";
import CoursesTab from "../components/dashboard/CoursesTab";
import SettingsTab from "../components/dashboard/SettingsTab";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- NAVIGATION CONFIG ---
  const navItems = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={20} /> },
    { id: "courses", label: "My Courses", icon: <BookOpen size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab user={user} setActiveTab={setActiveTab} />;
      case "courses":
        return <CoursesTab />;
      case "settings":
        return <SettingsTab user={user} />;
      default:
        return <OverviewTab user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      {/* --- SIDEBAR (Desktop) --- */}
      <aside className="hidden lg:flex flex-col w-64 bg-brand-navy text-white fixed h-full z-20 shadow-2xl">
        <div className="p-8">
          <h2 className="text-2xl font-black tracking-tighter">
            FirstPromotion
          </h2>
          <p className="text-xs text-slate-400 font-bold tracking-widest uppercase mt-1">
            Student Portal
          </p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
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

        <div className="p-4 mt-auto border-t border-white/10">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-colors font-bold text-sm"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* --- MOBILE DRAWER OVERLAY --- */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* --- MOBILE SIDEBAR --- */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-brand-navy text-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-xl font-black">Menu</h2>
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm ${
                activeTab === item.id ? "bg-brand-green" : "text-slate-300"
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 font-bold text-sm mt-8"
          >
            <LogOut size={20} /> Sign Out
          </button>
        </nav>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 lg:ml-64 relative">
        {/* Top Header (Mobile Only Toggle + User Profile) */}
        <header className="bg-white sticky top-0 z-10 px-6 py-4 flex items-center justify-between shadow-sm border-b border-slate-100">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-slate-500"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-black text-brand-navy capitalize hidden sm:block">
              {activeTab.replace("-", " ")}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-brand-navy transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-xs">
              {user?.name?.charAt(0) || "U"}
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-6 max-w-7xl mx-auto animate-in fade-in duration-300">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
