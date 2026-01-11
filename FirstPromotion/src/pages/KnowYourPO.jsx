import React, { useState, useEffect, useMemo } from "react";
import {
  BookOpen,
  Clock,
  Search,
  Newspaper,
  Loader2,
  WifiOff,
  AlertCircle,
} from "lucide-react";

const KnowYourPO = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchArticles = async () => {
      try {
        setLoading(true);
        // Replace with your actual endpoint: e.g., https://api.firstpromotion.in/articles
        const response = await fetch(
          "https://api.firstpromotion.in/v1/articles",
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) throw new Error("Server responded with an error");

        const data = await response.json();
        setArticles(data);
        setError(null);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            "Failed to sync with the Knowledge Base. Showing offline mode."
          );
          console.error("Fetch Error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
    return () => controller.abort();
  }, []);

  // Performance-optimized filtering
  const filteredArticles = useMemo(() => {
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
            {!loading && !error && (
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-green bg-brand-green/10 px-3 py-1 rounded-full animate-pulse">
                ● Live from Server
              </span>
            )}
            {error && (
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full flex items-center gap-1">
                <WifiOff size={12} /> Offline Archives
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
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-400">
            <Loader2 className="animate-spin text-brand-green" size={40} />
            <p className="font-bold">Syncing Articles...</p>
          </div>
        )}

        {/* Error/Empty State */}
        {!loading && filteredArticles.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
            <AlertCircle className="mx-auto text-slate-300 mb-4" size={48} />
            <h3 className="text-xl font-black text-brand-navy">
              No Topics Found
            </h3>
            <p className="text-slate-500">
              Check your connection or try a different search.
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
  <article className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group">
    <div className="h-56 overflow-hidden">
      <img
        src={
          article.image ||
          "https://images.unsplash.com/photo-1596649299486-4cdea56fd59f"
        }
        alt={article.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
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
      <p className="text-slate-600 text-sm line-clamp-3 mb-6">
        {article.excerpt}
      </p>
      <button className="text-xs font-black uppercase tracking-widest text-brand-navy flex items-center gap-2 group-hover:translate-x-2 transition-transform">
        Read Story <span className="text-brand-green">→</span>
      </button>
    </div>
  </article>
);

export default KnowYourPO;
