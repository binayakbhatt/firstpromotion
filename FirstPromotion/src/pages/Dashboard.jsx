import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 1. Import Auth Context
import {
  BookOpen,
  Clock,
  TrendingUp,
  AlertCircle,
  PlayCircle,
  PlusCircle,
  BarChart3,
  LogOut,
  BrainCircuit,
  LayoutDashboard,
  Settings, // New Icon
  Save, // New Icon
  MapPin, // New Icon
  Lock, // New Icon
} from "lucide-react";

/**
 * MOCK DATA: Simulating Learning Database
 * (Separate from User Profile Data)
 */
const DASHBOARD_DATA = {
  // We remove 'user' from here since we use AuthContext now
  enrolledCourses: [
    {
      id: 101,
      title: "GDS to MTS / Postman",
      progress: 68,
      lastPlayed: "Volume V: Definitions",
      thumbnailColor: "bg-blue-100 text-blue-600",
    },
    {
      id: 102,
      title: "General Awareness Booster",
      progress: 15,
      lastPlayed: "Indian Geography Part 1",
      thumbnailColor: "bg-purple-100 text-purple-600",
    },
  ],
  weakAreas: [
    { topic: "PO Guide Part 1: Clauses 1-10", accuracy: 35 },
    { topic: "Speed Post Regulations", accuracy: 42 },
    { topic: "Math: Time & Work", accuracy: 48 },
  ],
  studyHistory: [
    { topic: "Money Order Rules", lastStudied: "2023-10-25" },
    { topic: "SB Order 2024", lastStudied: "2023-10-24" },
    { topic: "PLI/RPLI Rules", lastStudied: "2023-10-20" },
    { topic: "Article 200-250", lastStudied: "2023-10-10" },
    { topic: "IT Modernization", lastStudied: "2023-10-01" },
  ],
};

const Dashboard = () => {
  // 2. Get User & Actions from Context
  const { user, updateProfile, logout } = useAuth();

  // 3. UI State
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'settings'
  const [notification, setNotification] = useState("");

  // 4. Form State (Pre-filled with Context Data)
  const [circle, setCircle] = useState(user?.circle || "");

  // Ebbinghaus Logic
  const revisionPlan = useMemo(() => {
    const today = new Date();
    return DASHBOARD_DATA.studyHistory.map((item) => {
      const studiedDate = new Date(item.lastStudied);
      const diffTime = Math.abs(today - studiedDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let nextRevisionDays = 1;
      if (diffDays > 1) nextRevisionDays = 3;
      if (diffDays > 3) nextRevisionDays = 7;
      if (diffDays > 7) nextRevisionDays = 30;

      const dueDate = new Date(studiedDate);
      dueDate.setDate(dueDate.getDate() + nextRevisionDays);
      const isOverdue = today > dueDate;

      return {
        ...item,
        diffDays,
        dueDate: dueDate.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
        }),
        status: isOverdue ? "Overdue" : "On Track",
        color: isOverdue
          ? "text-red-500 bg-red-50"
          : "text-brand-green bg-green-50",
      };
    });
  }, []);

  // Settings Handlers
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateProfile({ circle });
    setNotification("Profile updated successfully!");
    setTimeout(() => setNotification(""), 3000);
  };

  const circles = [
    "Andhra Pradesh",
    "Assam",
    "Bihar",
    "Delhi",
    "Gujarat",
    "Karnataka",
    "Maharashtra",
    "Tamil Nadu",
    "West Bengal",
    "Uttar Pradesh",
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-72 bg-brand-navy text-white fixed h-full z-20">
        <div className="p-8">
          <h2 className="text-2xl font-black tracking-tight">
            First<span className="text-brand-green">Promotion</span>
          </h2>
          <p className="text-xs text-blue-200 mt-1 uppercase tracking-widest font-bold">
            Aspirant Panel
          </p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {/* Navigation Items with Active State Logic */}
          <NavItem
            icon={<LayoutDashboard size={20} />}
            label="Overview"
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          />
          <NavItem
            icon={<BookOpen size={20} />}
            label="My Learning"
            active={activeTab === "learning"}
            onClick={() => setActiveTab("overview")} // Keeps staying on overview for now
          />
          <NavItem
            icon={<Settings size={20} />}
            label="Settings"
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          />
          <Link to="/courses">
            <NavItem icon={<PlusCircle size={20} />} label="Browse Courses" />
          </Link>
        </nav>
        <div className="p-6">
          <button
            onClick={logout} // Wired to AuthContext
            className="flex items-center gap-3 text-sm font-bold text-red-300 hover:text-white transition-colors"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 lg:ml-72 p-6 md:p-10 max-w-7xl mx-auto">
        {/* GLOBAL HEADER */}
        <header className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-black text-brand-navy">
              Hello, {user?.firstName || "Aspirant"} 👋
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              {activeTab === "settings"
                ? "Manage your account preferences."
                : "Let's reach that promotion goal today."}
            </p>
          </div>

          {activeTab === "overview" && (
            <div className="hidden md:flex items-center gap-4 bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-10 h-10 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                  Total Study Time
                </p>
                <p className="text-lg font-black text-brand-navy leading-none">
                  42h 15m
                </p>
              </div>
            </div>
          )}
        </header>

        {/* -----------------------------------------------------------
            CONDITIONAL RENDERING: VIEW SWITCHER
           ----------------------------------------------------------- */}

        {activeTab === "settings" ? (
          /* === SETTINGS VIEW === */
          <div className="max-w-3xl animate-fade-in">
            {notification && (
              <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-6 font-bold text-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                {notification}
              </div>
            )}

            <div className="space-y-6">
              {/* Change Circle Card */}
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-brand-navy mb-6 flex items-center gap-2">
                  <MapPin className="text-brand-green" /> Postal Circle
                </h2>
                <form onSubmit={handleUpdateProfile}>
                  <label className="block text-xs font-black uppercase text-slate-400 mb-2">
                    Current Circle
                  </label>
                  <select
                    value={circle}
                    onChange={(e) => setCircle(e.target.value)}
                    className="w-full p-4 bg-slate-50 rounded-xl font-bold text-brand-navy mb-4 border-2 border-transparent focus:border-brand-green focus:bg-white transition-all outline-none"
                  >
                    <option value="">Select Circle</option>
                    {circles.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <button className="bg-brand-navy text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2">
                    <Save size={16} /> Update Circle
                  </button>
                </form>
              </div>

              {/* Change Password Card */}
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-brand-navy mb-6 flex items-center gap-2">
                  <Lock className="text-brand-green" /> Security
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setNotification("Password updated!");
                  }}
                >
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-xs font-black uppercase text-slate-400 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full p-4 bg-slate-50 rounded-xl font-bold outline-none border-2 border-transparent focus:border-brand-green focus:bg-white"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase text-slate-400 mb-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className="w-full p-4 bg-slate-50 rounded-xl font-bold outline-none border-2 border-transparent focus:border-brand-green focus:bg-white"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  <button className="bg-slate-100 text-slate-500 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-green hover:text-white transition-all flex items-center gap-2">
                    <Save size={16} /> Update Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          /* === OVERVIEW VIEW === */
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-fade-in">
            {/* LEFT COLUMN */}
            <div className="xl:col-span-2 space-y-8">
              {/* Enrolled Courses */}
              <section>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2">
                    <PlayCircle className="text-brand-green" /> Continue
                    Learning
                  </h2>
                </div>
                <div className="grid gap-6">
                  {DASHBOARD_DATA.enrolledCourses.map((course) => (
                    <CourseProgressCard key={course.id} course={course} />
                  ))}
                  <Link
                    to="/courses"
                    className="group border-2 border-dashed border-slate-300 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center gap-4 hover:border-brand-green hover:bg-green-50/50 transition-all cursor-pointer h-40"
                  >
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-brand-green text-slate-400 group-hover:text-white transition-colors">
                      <PlusCircle size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-navy">
                        Enroll in New Course
                      </h3>
                      <p className="text-xs text-slate-500">
                        Unlock PA/SA material
                      </p>
                    </div>
                  </Link>
                </div>
              </section>

              {/* Weak Areas */}
              <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-red-100 p-2 rounded-lg text-red-600">
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-brand-navy">
                      Focus Areas
                    </h2>
                    <p className="text-xs text-slate-400 font-medium">
                      Topics needing improvement based on recent MCQs
                    </p>
                  </div>
                </div>
                <div className="space-y-5">
                  {DASHBOARD_DATA.weakAreas.map((area, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm font-bold mb-1">
                        <span className="text-slate-700">{area.topic}</span>
                        <span className="text-red-500">
                          {area.accuracy}% Accuracy
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500 rounded-full"
                          style={{ width: `${area.accuracy}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-8">
              {/* Revision Widget */}
              <div className="bg-brand-navy text-white p-6 rounded-[2rem] shadow-xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-green/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10 flex items-center gap-2 mb-6">
                  <BrainCircuit className="text-brand-green" />
                  <h3 className="font-bold text-lg">Smart Revision</h3>
                </div>
                <p className="text-blue-100 text-xs mb-6 leading-relaxed">
                  Based on the <strong>Ebbinghaus Curve</strong>, these topics
                  are fading from memory.
                </p>
                <div className="space-y-3">
                  {revisionPlan.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 p-3 rounded-xl border border-white/10 flex justify-between items-center"
                    >
                      <div>
                        <p className="text-sm font-bold truncate w-32 md:w-40">
                          {item.topic}
                        </p>
                        <p className="text-[10px] text-blue-200">
                          Studied {item.diffDays} days ago
                        </p>
                      </div>
                      <div
                        className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${item.color}`}
                      >
                        {item.status}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 bg-brand-green text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-brand-green/20 hover:bg-emerald-500 transition-all">
                  Start Revision Session
                </button>
              </div>

              {/* Motivation Card */}
              <div className="bg-gradient-to-br from-brand-green to-emerald-600 p-6 rounded-[2rem] text-white text-center">
                <TrendingUp className="mx-auto mb-3 opacity-80" size={32} />
                <div className="text-3xl font-black mb-1">Top 5%</div>
                <p className="text-xs font-medium opacity-90 mb-4">
                  You are studying more consistently than 95% of other
                  aspirants.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const NavItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
      active
        ? "bg-white/10 text-white shadow-inner"
        : "text-slate-400 hover:text-white hover:bg-white/5"
    }`}
  >
    {icon} {label}
  </div>
);

const CourseProgressCard = ({ course }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
    <div
      className={`w-16 h-16 ${course.thumbnailColor} rounded-2xl flex items-center justify-center shrink-0`}
    >
      <BookOpen size={24} />
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-start mb-1">
        <h4 className="font-bold text-brand-navy text-lg">{course.title}</h4>
        <span className="text-xs font-black text-slate-400">
          {course.progress}%
        </span>
      </div>
      <p className="text-xs text-slate-500 mb-3">Last: {course.lastPlayed}</p>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-green rounded-full"
          style={{ width: `${course.progress}%` }}
        ></div>
      </div>
    </div>
    <button className="hidden sm:flex h-10 w-10 bg-brand-navy text-white rounded-full items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-brand-navy/30">
      <PlayCircle size={20} />
    </button>
  </div>
);

export default Dashboard;
