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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/20 text-brand-red text-xs font-bold border border-brand-red/30">
          <BookOpen className="w-4 h-4 text-brand-blue" />
          <span>Edukasi & Insight IT</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Tips & Artikel
        </h1>

        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Panduan teknis, tips perawatan perangkat, serta informasi seputar dunia hardware & software dari tim teknisi mdfkingpc Bandung.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-4 sm:p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-blue text-white shadow-glow-blue border border-blue-400/30'
                  : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari artikel tips..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <div
            id={post.slug}
            key={post.id}
            className="glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-brand-blue/50 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-52 overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-md bg-black/80 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider border border-white/10">
                  {post.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                  <span>{post.date}</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-brand-blue" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-brand-blue transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                  {post.snippet}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => setActiveArticle(post)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-blue-400 transition-colors"
              >
                <span>Baca Selengkapnya</span>
                <ChevronRight className="w-4 h-4 text-brand-red" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border border-white/15 relative space-y-6">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-gray-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-3 py-1 rounded bg-brand-blue/20 text-brand-blue text-xs font-bold border border-brand-blue/30 inline-block">
              {activeArticle.category}
            </span>

            <h2 className="text-2xl font-black text-white">{activeArticle.title}</h2>

            <div className="flex items-center gap-3 text-xs text-gray-400 pb-4 border-b border-white/10">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-brand-red" />
                {activeArticle.author}
              </span>
              <span>&bull;</span>
              <span>{activeArticle.date}</span>
            </div>

            <img
              src={activeArticle.imageUrl}
              alt={activeArticle.title}
              className="w-full h-64 object-cover rounded-2xl border border-white/10"
            />

            <div className="prose prose-invert text-xs sm:text-sm text-gray-300 leading-relaxed whitespace-pre-line space-y-4">
              {activeArticle.content}
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-6 py-2.5 rounded-xl bg-white/10 text-xs font-bold text-white hover:bg-white/20"
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
