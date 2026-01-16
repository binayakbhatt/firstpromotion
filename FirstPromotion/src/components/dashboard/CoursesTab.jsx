import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Import Sub-components
import CourseLibrary from "./courses/CourseLibrary";
import PaperList from "./courses/PaperList";
import TopicList from "./courses/TopicList";
import TopicPlayer from "./courses/player/TopicPlayer";

// --- REALISTIC DATA FETCHERS (Simulating API) ---

const fetchMyCourses = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network delay
  return [
    {
      id: "c_mts_postman",
      title: "GDS to MTS / Postman Exam Prep",
      progress: 45,
      category: "Departmental (LGO)",
      image: "bg-gradient-to-br from-blue-600 to-cyan-500",
      description:
        "Comprehensive batch covering Paper I (Common), Paper II (Postman), and Paper III (Skill Test).",
      papers: [
        {
          id: "p1_common",
          title: "Paper 1: Basic Postal Knowledge & GK",
          desc: "Common for MTS & Postman (100 Marks)",
          topics: [
            {
              id: "t1_1",
              title: "Organization of Department",
              duration: "25m",
              status: "completed",
            },
            {
              id: "t1_2",
              title: "Type of Post Offices & Business Hours",
              duration: "30m",
              status: "completed",
            },
            {
              id: "t1_3",
              title: "Payment of Postage, Stamps & Stationery",
              duration: "45m",
              status: "in-progress",
            },
            {
              id: "t1_4",
              title: "Rules for Packing, Sealing & Posting",
              duration: "40m",
              status: "not-started",
            },
          ],
        },
        {
          id: "p2_postman",
          title: "Paper 2: Knowledge of Postal Operations",
          desc: "Specialized for Postman/Mail Guard (50 Marks)",
          topics: [
            {
              id: "t2_1",
              title: "Delivery of Mails & Refusal",
              duration: "35m",
              status: "not-started",
            },
            {
              id: "t2_2",
              title: "Money Orders & Redirection",
              duration: "40m",
              status: "not-started",
            },
          ],
        },
        {
          id: "p3_skill",
          title: "Paper 3: Data Entry Skill Test (DEST)",
          desc: "Qualifying Nature (25 Marks)",
          topics: [
            {
              id: "t3_1",
              title: "Typing Practice Session 1",
              duration: "15m",
              status: "not-started",
            },
          ],
        },
      ],
    },
    {
      id: "c_pa_sa",
      title: "GDS/MTS/Postman to PA/SA (LGO)",
      progress: 15,
      category: "Higher Cadre",
      image: "bg-gradient-to-br from-purple-600 to-indigo-500",
      description:
        "Targeted preparation for Postal Assistant & Sorting Assistant promotion.",
      papers: [
        {
          id: "pa_p1",
          title: "Paper 1: Departmental Knowledge",
          desc: "PO Guide 1 & 2, Manuals, IT & Products",
          topics: [
            {
              id: "pa_t1",
              title: "PO Guide Part 1 (Advanced)",
              duration: "60m",
              status: "completed",
            },
            {
              id: "pa_t2",
              title: "PO Guide Part 2 (Foreign Mail)",
              duration: "50m",
              status: "in-progress",
            },
          ],
        },
      ],
    },
  ];
};

// --- POPULATED EXPLORE STORE DATA ---
const fetchExploreCourses = async () => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return [
    {
      id: "store_ipo_2026",
      title: "Inspector of Posts (IPO) Exam 2026",
      category: "Officer Grade",
      price: "₹4,999",
      originalPrice: "₹7,500",
      rating: 4.8,
      students: "1.2k+",
      image: "bg-gradient-to-br from-orange-500 to-red-500",
      description:
        "Complete guide for IPO Exam. Covers Postal Acts, CCS Rules, IPC, CrPC, and Evidence Act.",
      features: ["Live Classes", "Mock Interviews", "50+ Mock Tests"],
      isBestSeller: true,
    },
    {
      id: "store_po_guide",
      title: "Mastering PO Guide Part I & II",
      category: "Module Only",
      price: "₹499",
      originalPrice: "₹999",
      rating: 4.5,
      students: "850+",
      image: "bg-gradient-to-br from-emerald-500 to-teal-500",
      description:
        "In-depth video lectures specifically for PO Guide. Perfect for clearing doubts.",
      features: ["10 Hrs Video", "PDF Notes", "Quiz"],
      isBestSeller: false,
    },
    {
      id: "store_dest_pro",
      title: "DEST Pro: Typing Masterclass",
      category: "Skill Test",
      price: "₹299",
      originalPrice: "₹500",
      rating: 4.9,
      students: "3k+",
      image: "bg-gradient-to-br from-slate-600 to-slate-800",
      description:
        "Guaranteed speed improvement for Data Entry Skill Test. Includes software simulation.",
      features: ["Typing Software", "Practice Sets"],
      isBestSeller: true,
    },
    {
      id: "store_math_reasoning",
      title: "Maths & Reasoning for Departmental Exams",
      category: "General Awareness",
      price: "₹999",
      originalPrice: "₹1,499",
      rating: 4.6,
      students: "500+",
      image: "bg-gradient-to-br from-pink-500 to-rose-500",
      description:
        "Focused mainly on BODMAS, Percentage, Profit/Loss, and Verbal Reasoning.",
      features: ["Shortcuts", "Solved Papers"],
      isBestSeller: false,
    },
  ];
};

const CoursesTab = () => {
  const navigate = useNavigate();

  // --- NAVIGATION STATE ---
  const [activeSection, setActiveSection] = useState("my_courses");

  // 1. Load state from sessionStorage if available (Persist user journey)
  const [selectedCourse, setSelectedCourse] = useState(() => {
    try {
      const saved = sessionStorage.getItem("fp_course");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [selectedPaper, setSelectedPaper] = useState(() => {
    try {
      const saved = sessionStorage.getItem("fp_paper");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [selectedTopic, setSelectedTopic] = useState(() => {
    try {
      const saved = sessionStorage.getItem("fp_topic");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // 2. Sync state to sessionStorage
  useEffect(() => {
    if (selectedCourse)
      sessionStorage.setItem("fp_course", JSON.stringify(selectedCourse));
    else sessionStorage.removeItem("fp_course");

    if (selectedPaper)
      sessionStorage.setItem("fp_paper", JSON.stringify(selectedPaper));
    else sessionStorage.removeItem("fp_paper");

    if (selectedTopic)
      sessionStorage.setItem("fp_topic", JSON.stringify(selectedTopic));
    else sessionStorage.removeItem("fp_topic");
  }, [selectedCourse, selectedPaper, selectedTopic]);

  // --- TANSTACK QUERIES ---
  const myCoursesQuery = useQuery({
    queryKey: ["myCourses"],
    queryFn: fetchMyCourses,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const exploreQuery = useQuery({
    queryKey: ["exploreCourses"],
    queryFn: fetchExploreCourses,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  const handleBuyNow = (id) => {
    // Navigate to payment or checkout page
    console.log("Buying course:", id);
    // navigate(`/checkout/${id}`); // Uncomment when route exists
    alert("Redirecting to Payment Gateway...");
  };

  // --- RENDER LOGIC (Drill Down Architecture) ---

  // LEVEL 4: TOPIC PLAYER (Watch Video / Read Notes)
  if (selectedTopic && selectedPaper) {
    return (
      <TopicPlayer
        topicId={selectedTopic.id}
        onBack={() => setSelectedTopic(null)}
        user={{ name: "Aspirant" }}
      />
    );
  }

  // LEVEL 3: TOPIC LIST (Chapters inside a Paper)
  if (selectedPaper && selectedCourse) {
    return (
      <TopicList
        paper={selectedPaper}
        courseTitle={selectedCourse.title}
        onBack={() => setSelectedPaper(null)}
        onSelectTopic={(topic) => setSelectedTopic(topic)}
      />
    );
  }

  // LEVEL 2: PAPER LIST (Papers inside a Course)
  if (selectedCourse) {
    return (
      <PaperList
        course={selectedCourse}
        onBack={() => setSelectedCourse(null)}
        onSelectPaper={setSelectedPaper}
      />
    );
  }

  // LEVEL 1: MAIN LIBRARY (My Courses / Explore Store)
  return (
    <CourseLibrary
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      myCourses={myCoursesQuery.data || []}
      loadingMy={myCoursesQuery.isLoading}
      exploreCourses={exploreQuery.data || []}
      loadingExplore={exploreQuery.isLoading}
      onSelectCourse={setSelectedCourse}
      onBuyNow={handleBuyNow}
    />
  );
};

export default CoursesTab;
