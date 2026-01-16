import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Advantages from "./components/Advantages";
import Courses from "./components/Courses";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Standard Imports (Critical pages)
import DemoPage from "./pages/DemoPage";
import FreeResources from "./pages/FreeResources";
// Note: You can lazy load these too if you want, but standard import is fine.

// Lazy Loaded Components
const QuizPage = lazy(() => import("./pages/QuizPage")); // Lazy Load this for performance
const CoursesPage = lazy(() => import("./pages/CoursesPage"));
const Updates = lazy(() => import("./components/Updates"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const FAQ = lazy(() => import("./components/FAQ"));
const Contact = lazy(() => import("./components/contact"));
const Footer = lazy(() => import("./components/Footer"));
const WhatsAppButton = lazy(() => import("./components/WhatsAppButton"));
const MobileCTA = lazy(() => import("./components/MobileCTA"));
const HallOfFame = lazy(() => import("./pages/HallOfFame"));
const KnowYourPO = lazy(() => import("./pages/KnowYourPO"));
const LatestUpdates = lazy(() => import("./pages/LatestUpdates"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

/**
 * ScrollToTop Helper
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const SectionLoader = () => (
  <div className="w-full py-20 flex flex-col items-center justify-center">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-brand-green"></div>
  </div>
);

const Home = () => (
  <>
    <Hero />
    <Advantages />
    <Courses />
    <Suspense fallback={<SectionLoader />}>
      <Updates />
      <Testimonials />
      <FAQ />
      <Contact />
    </Suspense>
  </>
);

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-white">
          <title>India Post LDCE Coaching | FirstPromotion.in</title>

          <header className="sticky top-0 z-50">
            {" "}
            {/* Changed z-100 to z-50 (Tailwind standard) */}
            <TopBar />
            <Navbar />
          </header>

          <main>
            <Suspense fallback={<SectionLoader />}>
              <Routes>
                {/* --- Public Routes --- */}
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/hall-of-fame" element={<HallOfFame />} />
                <Route path="/know-your-po" element={<KnowYourPO />} />
                <Route path="/latest-updates" element={<LatestUpdates />} />
                <Route path="/resources" element={<FreeResources />} />
                <Route path="/demo" element={<DemoPage />} />

                {/* --- Auth Routes --- */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* --- PROTECTED ROUTES --- */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Fixed: Moved Quiz route INSIDE the Routes container */}
                <Route
                  path="/quiz/:topicId"
                  element={
                    <ProtectedRoute>
                      <QuizPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Suspense>
          </main>

          <Suspense fallback={null}>
            <Footer />
            <WhatsAppButton />
            <MobileCTA />
          </Suspense>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
