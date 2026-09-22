'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, BookOpen, Clock, ChevronRight, X, User } from 'lucide-react';
import { BLOG_POSTS, BlogItem } from '@/data/mockData';

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [activeArticle, setActiveArticle] = useState<BlogItem | null>(null);

  const categories = ['Semua', 'Tips Laptop', 'Hardware & PC'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.snippet.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-sans">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/80">
          <BookOpen className="w-4 h-4 text-red-500" />
          <span>Edukasi & Insight IT</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display uppercase tracking-tight">
          Tips & Artikel
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Panduan teknis, tips perawatan perangkat, serta informasi seputar dunia hardware & software dari tim teknisi mdfkingpc Bandung.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-50 border border-slate-200/80 p-4 sm:p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
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
            className="w-full bg-white border border-slate-200 rounded-full pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 shadow-xs"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <div
            id={post.slug}
            key={post.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-blue-500/40 transition-all group flex flex-col justify-between shadow-xs hover:shadow-md"
          >
            <div>
              <div className="relative h-52 overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-slate-900 text-[10px] font-bold uppercase tracking-wider border border-slate-200/80 shadow-xs">
                  {post.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                  <span>{post.date}</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-blue-600" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-sans line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
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
                <ChevronRight className="w-3.5 h-3.5 text-blue-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative space-y-6">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/80 inline-block">
              {activeArticle.category}
            </span>

            <h2 className="text-2xl font-bold text-slate-900 font-sans">{activeArticle.title}</h2>

            <div className="flex items-center gap-3 text-xs text-slate-500 pb-4 border-b border-slate-100">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-red-500" />
                {activeArticle.author}
              </span>
              <span>&bull;</span>
              <span>{activeArticle.date}</span>
            </div>

            <img
              src={activeArticle.imageUrl}
              alt={activeArticle.title}
              className="w-full h-64 object-cover rounded-2xl border border-slate-200"
            />

            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-4">
              {activeArticle.content}
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-6 py-2.5 rounded-full bg-slate-100 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors"
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
