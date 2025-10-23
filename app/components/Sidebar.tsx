'use client'

import { X, Sun, Moon, Settings, TrendingUp, Newspaper, Globe, Zap } from 'lucide-react'
import { useTheme } from '../providers/ThemeProvider'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { theme, toggleTheme } = useTheme()

  const topics = [
    { name: 'Trending', icon: TrendingUp, count: 234 },
    { name: 'Technology', icon: Zap, count: 156 },
    { name: 'World News', icon: Globe, count: 423 },
    { name: 'Science', icon: Newspaper, count: 89 },
  ]

  const sources = [
    { name: 'Tech Today', icon: '🔬', following: true },
    { name: 'World News Network', icon: '🌍', following: true },
    { name: 'Medical Journal Today', icon: '🏥', following: true },
    { name: 'Space News', icon: '🚀', following: false },
    { name: 'Economic Times', icon: '💼', following: false },
    { name: 'Auto Innovation', icon: '🚗', following: true },
  ]

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 z-40 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        aria-label="Sidebar navigation"
      >
        <div className="p-6">
          {/* Close Button (Mobile) */}
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Theme Toggle */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Appearance
            </h3>
            <button
              onClick={toggleTheme}
              className="flex items-center justify-between w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <span className="flex items-center gap-3 text-gray-900 dark:text-gray-100">
                {theme === 'light' ? (
                  <>
                    <Sun className="w-5 h-5" />
                    <span className="font-medium">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5" />
                    <span className="font-medium">Dark Mode</span>
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Topics */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Topics
            </h3>
            <div className="space-y-2">
              {topics.map((topic) => (
                <button
                  key={topic.name}
                  className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <topic.icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-accent-500" />
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {topic.name}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                    {topic.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Sources */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Sources
            </h3>
            <div className="space-y-2">
              {sources.map((source) => (
                <button
                  key={source.name}
                  className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl" role="img" aria-label={source.name}>
                      {source.icon}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {source.name}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      source.following
                        ? 'bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {source.following ? 'Following' : 'Follow'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div>
            <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-gray-100">
                Advanced Settings
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
