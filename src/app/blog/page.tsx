'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, BookOpen, Clock, ChevronRight, X, User, RefreshCw } from 'lucide-react';

interface BlogItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  snippet: string;
  content: string;
  imageUrl: string;
  author: string;
  readTime: string;
  date: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [activeArticle, setActiveArticle] = useState<BlogItem | null>(null);

  useEffect(() => {
    fetch('/api/blog')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setPosts(data.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Dynamically build category list from fetched data
  const categories = ['Semua', ...Array.from(new Set(posts.map((p) => p.category)))];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.snippet.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-sans text-slate-100">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-bold text-cyan-400 tracking-wider uppercase">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>Edukasi &amp; Insight IT</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent font-display uppercase tracking-tight">
          Tips &amp; Artikel
        </h1>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Panduan teknis, tips perawatan perangkat, serta informasi seputar dunia hardware &amp; software dari tim teknisi mdfkingpc Bandung.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#0D0F18]/90 backdrop-blur-md border border-white/[0.08] p-4 sm:p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn-hitboox text-xs !py-2 !px-4 ${
                selectedCategory === cat
                  ? 'btn-hitboox-primary shadow-xs'
                  : 'btn-hitboox-secondary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari artikel tips..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
          />
        </div>
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
          <span className="text-slate-400 text-sm">Memuat artikel...</span>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>Tidak ada artikel ditemukan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              id={post.slug}
              key={post.id}
              className="bg-[#0D0F18]/90 backdrop-blur-md rounded-3xl cut-corner-card overflow-hidden border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 group flex flex-col justify-between shadow-lg hover:shadow-[0_15px_40px_rgba(0,102,255,0.12)]"
            >
              <div>
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F18]/90 via-[#0D0F18]/20 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur text-cyan-300 text-[10px] font-bold uppercase tracking-wider border border-white/10">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <span>{post.date}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors font-sans line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {post.snippet}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setActiveArticle(post)}
                  className="btn-hitboox btn-hitboox-secondary text-xs !py-1.5 !px-3.5 gap-1"
                >
                  <span>Baca Selengkapnya</span>
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0D0F18] border border-white/[0.1] max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.9)] relative space-y-6">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/[0.06] border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-400 text-xs font-bold inline-block">
              {activeArticle.category}
            </span>

            <h2 className="text-2xl font-bold text-white font-sans">{activeArticle.title}</h2>

            <div className="flex items-center gap-3 text-xs text-slate-500 pb-4 border-b border-white/[0.08]">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                {activeArticle.author}
              </span>
              <span>&bull;</span>
              <span>{activeArticle.date}</span>
            </div>

            <img
              src={activeArticle.imageUrl}
              alt={activeArticle.title}
              className="w-full h-64 object-cover rounded-2xl border border-white/[0.08]"
            />

            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-4">
              {activeArticle.content}
            </div>

            <div className="pt-6 border-t border-white/[0.08] flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-6 py-2.5 rounded-full bg-white/[0.06] border border-white/10 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                Tutup Artikel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
