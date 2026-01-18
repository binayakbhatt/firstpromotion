import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  BookOpen,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
  LifeBuoy,
  Timer, // Added Icon
} from "lucide-react";

// Sub-components
import OverviewTab from "../components/dashboard/OverviewTab";
import CoursesTab from "../components/dashboard/CoursesTab";
import SettingsTab from "../components/dashboard/SettingsTab";
import SupportTab from "../components/dashboard/SupportTab";
import PomodoroTimer from "../components/dashboard/PomodoroTimer"; // Imported

// ... [Keep existing fetchNotifications and data structure unchanged] ...
const fetchNotifications = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { unreadCount: 3, items: [] };
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "overview",
  );
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // --- NEW STATE: Timer Visibility ---
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const { data: notifications, isLoading: loadingNotifs } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    staleTime: 1000 * 60 * 5,
  });

  const navItems = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={20} /> },
    { id: "courses", label: "Courses", icon: <BookOpen size={20} /> },
    { id: "support", label: "Support", icon: <LifeBuoy size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        // NOTE: We pass showTimer setter to allow Overview to trigger it if needed
        return (
          <OverviewTab
            user={user}
            setActiveTab={setActiveTab}
            onOpenTimer={() => setShowTimer(true)}
          />
        );
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
      {/* ... [Sidebar Code Remains Exactly Same] ... */}
      <aside className="hidden lg:flex flex-col w-64 bg-brand-navy text-white fixed h-full z-20 shadow-2xl">
        {/* ... (Keep existing sidebar content) ... */}
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
        <div className="p-8 mt-auto opacity-20 pointer-events-none">
          <div className="w-full h-32 bg-gradient-to-t from-white/20 to-transparent rounded-2xl"></div>
        </div>
      </aside>

      {/* ... [Mobile Nav Remains Same] ... */}
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
              className={`p-2 rounded-full ${activeTab === item.id ? "bg-brand-navy/10" : "bg-transparent"}`}
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

      <main className="flex-1 lg:ml-64 relative">
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shadow-sm border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="lg:hidden">
              <span className="text-lg font-black text-brand-navy tracking-tight">
                FP<span className="text-brand-green">.</span>
              </span>
            </div>
            <h1 className="text-xl font-black text-brand-navy capitalize hidden lg:block">
              {activeTab.replace("-", " ")}
            </h1>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* --- TIMER TOGGLE BUTTON --- */}
            <button
              onClick={() => setShowTimer(!showTimer)}
              className={`p-2 rounded-full transition-all border ${
                showTimer
                  ? "bg-brand-navy text-white border-brand-navy shadow-md"
                  : "text-slate-400 hover:text-brand-navy border-transparent hover:bg-slate-50"
              }`}
              title="Toggle Focus Timer"
            >
              <Timer size={22} />
            </button>

            <button className="p-2 text-slate-400 hover:text-brand-navy transition-colors relative">
              <Bell size={22} />
              {!loadingNotifs && notifications?.unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              )}
            </button>

            {/* Profile Menu (Kept same) */}
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
                  className={`text-slate-400 transition-transform duration-200 ${isProfileMenuOpen ? "rotate-180" : ""}`}
                />
              </button>
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

        <div className="p-4 pb-24 sm:p-6 lg:pb-6 max-w-7xl mx-auto animate-in fade-in duration-300">
          {renderContent()}
        </div>

        {/* --- PERSISTENT FLOATING TIMER --- */}
        {/* It stays mounted even if hidden to keep the timer running (logic inside component could check if active)
            However, usually we want to see it if it's running. Here we render conditionally for cleaner DOM,
            but if you need the timer to run in background while closed, you should use style={{ display: showTimer ? 'block' : 'none' }} instead.
        */}
        <div
          className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-50"
          style={{ display: showTimer ? "block" : "none" }}
        >
          <PomodoroTimer onClose={() => setShowTimer(false)} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
