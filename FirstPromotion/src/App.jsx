import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Advantages from "./components/Advantages";
import Courses from "./components/Courses";

// Lazy Loaded Components
const CoursesPage = lazy(() => import("./pages/CoursesPage"));
const Updates = lazy(() => import("./components/Updates"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const FAQ = lazy(() => import("./components/FAQ"));
const Contact = lazy(() => import("./components/contact"));
const Footer = lazy(() => import("./components/Footer"));
const WhatsAppButton = lazy(() => import("./components/WhatsAppButton"));
const MobileCTA = lazy(() => import("./components/MobileCTA.jsx"));
const HallOfFame = lazy(() => import("./pages/HallOfFame"));
const KnowYourPO = lazy(() => import("./pages/KnowYourPO"));
const LatestUpdates = lazy(() => import("./pages/LatestUpdates"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

/**
 * ScrollToTop Helper
 * Ensures the page starts at the top when navigating between routes.
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
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        {/* React 19 SEO Hoisting */}
        <title>India Post LDCE Coaching | FirstPromotion.in</title>

        <header className="sticky top-0 z-100">
          <TopBar />
          <Navbar />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/courses"
              element={
                <Suspense fallback={<SectionLoader />}>
                  <CoursesPage />
                </Suspense>
              }
            />

            <Route
              path="/hall-of-fame"
              element={
                <Suspense fallback={<SectionLoader />}>
                  <HallOfFame />
                </Suspense>
              }
            />
          </Routes>

          <Routes>
            <Route
              path="/know-your-po"
              element={
                <Suspense fallback={<SectionLoader />}>
                  <KnowYourPO />
                </Suspense>
              }
            />
          </Routes>
          <Routes>
            <Route
              path="/latest-updates"
              element={
                <Suspense fallback={<SectionLoader />}>
                  <LatestUpdates />
                </Suspense>
              }
            />
          </Routes>
          <Routes>
            <Route
              path="/login"
              element={
                <Suspense fallback={<SectionLoader />}>
                  <Login />
                </Suspense>
              }
            />
          </Routes>
          <Routes>
            <Route
              path="/signup"
              element={
                <Suspense fallback={<SectionLoader />}>
                  <Signup />
                </Suspense>
              }
            />
          </Routes>
        </main>

        <Suspense fallback={null}>
          <Footer />
          <WhatsAppButton />
          <MobileCTA />
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
