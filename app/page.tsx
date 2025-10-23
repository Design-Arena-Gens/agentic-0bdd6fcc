'use client'

import { useState } from 'react'
import NewsCard from './components/NewsCard'
import Sidebar from './components/Sidebar'
import { Menu } from 'lucide-react'

const MOCK_NEWS = [
  {
    id: '1',
    title: 'Major Breakthrough in Renewable Energy Storage Technology',
    summary: 'Scientists announce a new battery technology that could revolutionize how we store solar and wind energy, making renewable sources more viable for large-scale deployment.',
    source: 'Tech Today',
    sourceIcon: '🔬',
    author: 'Dr. Sarah Chen',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    votes: 342,
    comments: 89,
    saves: 156,
  },
  {
    id: '2',
    title: 'Global Climate Summit Reaches Historic Agreement',
    summary: 'World leaders commit to ambitious carbon reduction targets at COP30, with new frameworks for international cooperation and funding mechanisms for developing nations.',
    source: 'World News Network',
    sourceIcon: '🌍',
    author: 'James Martinez',
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    category: 'Environment',
    imageUrl: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800&q=80',
    votes: 521,
    comments: 203,
    saves: 287,
  },
  {
    id: '3',
    title: 'Artificial Intelligence Shows Promise in Early Disease Detection',
    summary: 'New AI models demonstrate unprecedented accuracy in identifying early-stage cancers from routine medical imaging, potentially saving thousands of lives annually.',
    source: 'Medical Journal Today',
    sourceIcon: '🏥',
    author: 'Dr. Emily Thompson',
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    category: 'Health',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    votes: 478,
    comments: 134,
    saves: 412,
  },
  {
    id: '4',
    title: 'Space Agency Announces Plans for Lunar Base Construction',
    summary: 'International space consortium reveals detailed roadmap for establishing permanent human presence on the Moon by 2035, marking a new era in space exploration.',
    source: 'Space News',
    sourceIcon: '🚀',
    author: 'Michael Roberts',
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    category: 'Science',
    imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80',
    votes: 892,
    comments: 312,
    saves: 534,
  },
  {
    id: '5',
    title: 'New Economic Policy Aims to Address Income Inequality',
    summary: 'Government proposes comprehensive reform package including progressive taxation, universal basic services, and investment in education and infrastructure.',
    source: 'Economic Times',
    sourceIcon: '💼',
    author: 'Alexandra Wong',
    publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
    category: 'Politics',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    votes: 267,
    comments: 445,
    saves: 189,
  },
  {
    id: '6',
    title: 'Revolutionary Electric Vehicle Achieves 1000-Mile Range',
    summary: 'Startup unveils prototype EV with breakthrough battery technology that could eliminate range anxiety and accelerate transition to electric transportation.',
    source: 'Auto Innovation',
    sourceIcon: '🚗',
    author: 'David Kim',
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
    votes: 612,
    comments: 178,
    saves: 298,
  },
]

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [savedArticles, setSavedArticles] = useState<Set<string>>(new Set())
  const [articleVotes, setArticleVotes] = useState<Record<string, number>>({})

  const handleVote = (articleId: string, voteType: 'up' | 'down') => {
    setArticleVotes(prev => {
      const currentVote = prev[articleId] || 0
      if (voteType === 'up') {
        return { ...prev, [articleId]: currentVote === 1 ? 0 : 1 }
      } else {
        return { ...prev, [articleId]: currentVote === -1 ? 0 : -1 }
      }
    })
  }

  const handleSave = (articleId: string) => {
    setSavedArticles(prev => {
      const newSet = new Set(prev)
      if (newSet.has(articleId)) {
        newSet.delete(articleId)
      } else {
        newSet.add(articleId)
      }
      return newSet
    })
  }

  return (
    <div className="relative">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
              <h1 className="text-2xl font-bold text-primary-700 dark:text-primary-300">
                NewsSphere
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-sm text-gray-600 dark:text-gray-400">
                Your personalized news feed
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Top Stories
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Curated news from your followed sources and topics
            </p>
          </div>

          {/* News Feed */}
          <div className="grid gap-6 lg:grid-cols-2">
            {MOCK_NEWS.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                userVote={articleVotes[article.id] || 0}
                isSaved={savedArticles.has(article.id)}
                onVote={(voteType) => handleVote(article.id, voteType)}
                onSave={() => handleSave(article.id)}
              />
            ))}
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
