import React, { useState, useMemo } from "react";
import {
  Search,
  Download,
  FileText,
  BookOpen,
  Filter,
  FileCheck,
  Shield,
  ArrowRight,
  Clock,
} from "lucide-react";

// --- MOCK DATA (Ideally fetched from an API) ---
const RESOURCES_DATA = [
  {
    id: "doc-001",
    title: "PO Guide Part I (Official)",
    category: "Manuals",
    description:
      "Comprehensive guide covering general rules of Post Office operations.",
    fileSize: "4.2 MB",
    updatedAt: "Jan 10, 2024",
    type: "PDF",
    isNew: false,
  },
  {
    id: "doc-002",
    title: "Postal Manual Volume V",
    category: "Regulations",
    description:
      "Detailed regulations regarding mail processing and delivery standards.",
    fileSize: "12.5 MB",
    updatedAt: "Dec 15, 2023",
    type: "PDF",
    isNew: true,
  },
  {
    id: "doc-003",
    title: "GDS Conduct & Engagement Rules 2020",
    category: "Rules",
    description:
      "Complete rulebook for Gramin Dak Sevaks engagement and conduct.",
    fileSize: "2.8 MB",
    updatedAt: "Feb 01, 2024",
    type: "PDF",
    isNew: true,
  },
  {
    id: "doc-004",
    title: "SB Order 26/2023 - Interest Rates",
    category: "Circulars",
    description: "Latest amendments to Small Savings Scheme interest rates.",
    fileSize: "850 KB",
    updatedAt: "Jan 20, 2024",
    type: "PDF",
    isNew: false,
  },
  {
    id: "doc-005",
    title: "PO Guide Part II (Foreign Mail)",
    category: "Manuals",
    description: "Rules and regulations governing foreign mail exchanges.",
    fileSize: "5.1 MB",
    updatedAt: "Nov 20, 2023",
    type: "PDF",
    isNew: false,
  },
  {
    id: "doc-006",
    title: "IT Modernization Project 2.0 Overview",
    category: "Tech Manuals",
    description:
      "Technical manual for the new McCamish and Core Banking implementation.",
    fileSize: "15.0 MB",
    updatedAt: "Oct 05, 2023",
    type: "PDF",
    isNew: false,
  },
];

const CATEGORIES = [
  "All",
  "Manuals",
  "Rules",
  "Regulations",
  "Circulars",
  "Tech Manuals",
];

const FreeResources = () => {
  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // --- FILTERING LOGIC (Memoized for Performance) ---
  const filteredResources = useMemo(() => {
    return RESOURCES_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // --- HANDLERS ---
  const handleDownload = (docId, title) => {
    // In production: analytics.track('download', { docId })
    console.log(`Downloading: ${title} (${docId})`);
    // Simulate download
    alert(`Starting download for: ${title}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* --- HERO SECTION --- */}
      <div className="bg-brand-navy pt-24 pb-32 px-6 relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Shield size={400} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green/20 text-brand-green text-[10px] font-black uppercase tracking-widest border border-brand-green/20 mb-6">
            <BookOpen size={14} /> Knowledge Repository
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
            Departmental Rules & Manuals
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Access official study materials, rulebooks, and updated circulars
            for your departmental exams. Free for all aspirants.
          </p>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20 pb-20">
        {/* --- CONTROLS CARD --- */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-10 border border-slate-100">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            {/* Search Input */}
            <div className="w-full md:max-w-md relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-navy transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="Search manuals, circulars, or topics..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-brand-navy/20 focus:bg-white rounded-2xl outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter Pills (Desktop) */}
            <div className="w-full md:w-auto flex flex-wrap gap-2 justify-center md:justify-end">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-all ${
                    selectedCategory === cat
                      ? "bg-brand-navy text-white shadow-lg shadow-brand-navy/30 scale-105"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- RESULTS GRID --- */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                data={resource}
                onDownload={() => handleDownload(resource.id, resource.title)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-brand-navy mb-2">
              No documents found
            </h3>
            <p className="text-slate-400">
              Try adjusting your search terms or filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-6 text-brand-green font-bold text-sm hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: Resource Card ---
const ResourceCard = ({ data, onDownload }) => (
  <div className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 relative overflow-hidden flex flex-col h-full">
    {/* Decorative Top Line */}
    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-navy to-brand-green opacity-0 group-hover:opacity-100 transition-opacity" />

    {/* New Badge */}
    {data.isNew && (
      <span className="absolute top-6 right-6 px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest rounded-full">
        New
      </span>
    )}

    {/* Header */}
    <div className="flex items-start gap-4 mb-4">
      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-brand-navy shrink-0 group-hover:bg-brand-navy group-hover:text-white transition-colors">
        <FileText size={24} />
      </div>
      <div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
          {data.category}
        </span>
        <h3 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-brand-navy transition-colors">
          {data.title}
        </h3>
      </div>
    </div>

    {/* Description */}
    <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
      {data.description}
    </p>

    {/* Footer Meta & Action */}
    <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
          <Clock size={12} /> {data.updatedAt}
        </div>
        <span className="text-[10px] font-black text-slate-300 uppercase">
          {data.type} • {data.fileSize}
        </span>
      </div>

      <button
        onClick={onDownload}
        className="flex items-center gap-2 px-5 py-2.5 bg-brand-green/10 text-brand-green rounded-xl text-xs font-black uppercase tracking-wide hover:bg-brand-green hover:text-white transition-all group-active:scale-95"
      >
        <span>Download</span>
        <Download size={14} />
      </button>
    </div>
  </div>
);

export default FreeResources;
