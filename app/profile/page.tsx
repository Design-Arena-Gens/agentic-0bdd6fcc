'use client'

import { useState } from 'react'
import { Edit, Mail, MapPin, Calendar, Bookmark, MessageCircle, TrendingUp } from 'lucide-react'
import NewsCard from '../components/NewsCard'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'comments'>('posts')
  const [savedArticles] = useState<Set<string>>(new Set(['1']))
  const [articleVotes] = useState<Record<string, number>>({})

  const userStats = [
    { label: 'Articles Read', value: '342', icon: TrendingUp },
    { label: 'Comments', value: '89', icon: MessageCircle },
    { label: 'Saved', value: '156', icon: Bookmark },
  ]

  const savedArticle = {
    id: '1',
    title: 'Major Breakthrough in Renewable Energy Storage Technology',
    summary: 'Scientists announce a new battery technology that could revolutionize how we store solar and wind energy.',
    source: 'Tech Today',
    sourceIcon: '🔬',
    author: 'Dr. Sarah Chen',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    votes: 342,
    comments: 89,
    saves: 156,
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-primary-500 to-accent-500" />

        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16 mb-4">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-5xl shadow-lg">
              👤
            </div>

            {/* Actions */}
            <div className="flex-1 flex justify-end gap-3 mt-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-accent-500 text-white font-medium rounded-lg hover:bg-accent-600 transition-colors">
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* User Details */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              Alex Johnson
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              @alexjohnson
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Tech enthusiast, news junkie, and coffee lover ☕ Passionate about renewable energy and space exploration.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                alex.johnson@email.com
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                San Francisco, CA
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Joined January 2024
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            {userStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <stat.icon className="w-4 h-4 text-accent-500" />
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {stat.value}
                  </span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex gap-8" aria-label="Profile sections">
            {(['posts', 'saved', 'comments'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 font-medium text-sm transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'border-accent-500 text-accent-600 dark:text-accent-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'posts' && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No posts yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Start sharing your thoughts on news articles
            </p>
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="grid gap-6 lg:grid-cols-2">
            <NewsCard
              article={savedArticle}
              userVote={articleVotes[savedArticle.id] || 0}
              isSaved={savedArticles.has(savedArticle.id)}
              onVote={() => {}}
              onSave={() => {}}
            />
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="space-y-4">
            {[
              {
                id: '1',
                article: 'Major Breakthrough in Renewable Energy',
                comment: 'This is a game-changer! Finally seeing real progress in renewable energy storage.',
                timestamp: '2 hours ago',
                votes: 23,
              },
              {
                id: '2',
                article: 'AI Shows Promise in Disease Detection',
                comment: 'The accuracy rates mentioned in this study are impressive. This could save countless lives.',
                timestamp: '5 hours ago',
                votes: 18,
              },
            ].map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Commented on <span className="text-accent-600 dark:text-accent-400">{item.article}</span>
                </p>
                <p className="text-gray-900 dark:text-gray-100 mb-3">
                  {item.comment}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>{item.timestamp}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {item.votes} votes
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
