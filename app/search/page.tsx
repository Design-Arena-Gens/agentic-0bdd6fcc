'use client'

import { useState } from 'react'
import { Search, Filter, TrendingUp, Clock } from 'lucide-react'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<'all' | 'articles' | 'sources' | 'topics'>('all')

  const trendingSearches = [
    'Climate change summit',
    'AI breakthrough',
    'Space exploration',
    'Renewable energy',
    'Economic policy',
  ]

  const recentSearches = [
    'Electric vehicles',
    'Quantum computing',
    'Healthcare innovation',
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Search
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover articles, sources, and topics
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for news, topics, or sources..."
          className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          aria-label="Search"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
        {(['all', 'articles', 'sources', 'topics'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
              activeFilter === filter
                ? 'bg-accent-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 font-medium text-sm transition-colors"
          aria-label="More filters"
        >
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Trending Searches */}
      <section className="mb-8" aria-labelledby="trending-heading">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-accent-500" />
          <h2 id="trending-heading" className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Trending Searches
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {trendingSearches.map((search) => (
            <button
              key={search}
              onClick={() => setSearchQuery(search)}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-accent-500 hover:text-accent-500 transition-colors"
            >
              {search}
            </button>
          ))}
        </div>
      </section>

      {/* Recent Searches */}
      <section aria-labelledby="recent-heading">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-gray-500" />
          <h2 id="recent-heading" className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Recent Searches
          </h2>
        </div>
        <div className="space-y-2">
          {recentSearches.map((search) => (
            <button
              key={search}
              onClick={() => setSearchQuery(search)}
              className="flex items-center justify-between w-full p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-accent-500 transition-colors group"
            >
              <span className="text-gray-900 dark:text-gray-100 font-medium">
                {search}
              </span>
              <Search className="w-4 h-4 text-gray-400 group-hover:text-accent-500" />
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
