import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query"; // 1. Import Hook
import {
  BookOpen,
  Clock,
  Search,
  Loader2,
  WifiOff,
  AlertCircle,
  Wifi,
} from "lucide-react";

/**
 * FETCH FUNCTION
 */
const fetchArticles = async () => {
  // Replace with actual API endpoint
  const response = await fetch("https://api.firstpromotion.in/v1/articles");

  if (!response.ok) {
    throw new Error("Failed to sync knowledge base");
  }

  return response.json();
};

const KnowYourPO = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // 2. Use TanStack Query
  const {
    data: articles = [], // Default to empty array
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
    staleTime: 1000 * 60 * 30, // Data fresh for 30 mins
    retry: 1,
  });

  // 3. Client-Side Search Logic (Memoized for performance)
  const filteredArticles = useMemo(() => {
    if (!articles) return [];
    return articles.filter(
      (art) =>
        art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, articles]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-brand-navy pt-24 pb-20 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            Know Your <span className="text-brand-green">Post Office</span>
          </h1>

          {/* API Status Indicator */}
          <div className="flex justify-center items-center gap-2">
            {!isLoading && !isError && (
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-green bg-brand-green/10 px-3 py-1 rounded-full flex items-center gap-1">
                <Wifi size={12} /> Live from Server
              </span>
            )}
            {isError && (
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full flex items-center gap-1">
                <WifiOff size={12} /> Offline Mode
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Search Field */}
        <div className="relative max-w-xl mx-auto mb-16">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by topic or category..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-none shadow-xl focus:ring-2 focus:ring-brand-green outline-none font-medium"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-400">
            <Loader2 className="animate-spin text-brand-green" size={40} />
            <p className="font-bold">Syncing Articles...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-red-200">
            <AlertCircle className="mx-auto text-red-300 mb-4" size={48} />
            <h3 className="text-xl font-black text-slate-800">
              Unable to load Knowledge Base
            </h3>
            <p className="text-slate-500 mt-2">
              Please check your internet connection.
            </p>
          </div>
        )}

        {/* Empty Search Results */}
        {!isLoading && !isError && filteredArticles.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
            <Search className="mx-auto text-slate-300 mb-4" size={48} />
            <h3 className="text-xl font-black text-brand-navy">
              No Topics Found
            </h3>
            <p className="text-slate-500 mt-1">
              Try searching for something else like "Savings" or "Mail".
            </p>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id || article._id} article={article} />
          ))}
        </div>
      </main>
    </div>
  );
};

const ArticleCard = ({ article }) => (
  <article className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group animate-in fade-in slide-in-from-bottom-4">
    <div className="h-56 overflow-hidden">
      <img
        src={
          article.image ||
          "https://images.unsplash.com/photo-1596649299486-4cdea56fd59f"
        }
        alt={article.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
    </div>
    <div className="p-8">
      <div className="flex gap-4 text-[10px] font-black text-slate-400 uppercase mb-4">
        <span className="flex items-center gap-1">
          <Clock size={12} /> {article.readTime || "5 min"}
        </span>
        <span className="text-brand-green">{article.category}</span>
      </div>
      <h3 className="text-xl font-black text-brand-navy mb-4 leading-tight group-hover:text-brand-green transition-colors">
        {article.title}
      </h3>
      <p className="text-slate-600 text-sm line-clamp-3 mb-6 leading-relaxed">
        {article.excerpt}
      </p>
      <button className="text-xs font-black uppercase tracking-widest text-brand-navy flex items-center gap-2 group-hover:gap-4 transition-all">
        Read Story <span className="text-brand-green">→</span>
      </button>
    </div>
  </article>
);

export default KnowYourPO;
