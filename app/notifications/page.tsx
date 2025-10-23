'use client'

import { Bell, BellOff, TrendingUp, MessageCircle, UserPlus, Bookmark } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface Notification {
  id: string
  type: 'breaking' | 'comment' | 'follow' | 'save'
  title: string
  message: string
  timestamp: Date
  read: boolean
  icon: React.ReactNode
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'breaking',
    title: 'Breaking News',
    message: 'Major breakthrough in renewable energy storage technology',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
    icon: <TrendingUp className="w-5 h-5 text-red-500" />,
  },
  {
    id: '2',
    type: 'comment',
    title: 'New reply to your comment',
    message: 'TechEnthusiast42 replied to your comment on "AI Shows Promise in Disease Detection"',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
    icon: <MessageCircle className="w-5 h-5 text-blue-500" />,
  },
  {
    id: '3',
    type: 'follow',
    title: 'New follower',
    message: 'GreenFuture started following you',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    read: true,
    icon: <UserPlus className="w-5 h-5 text-green-500" />,
  },
  {
    id: '4',
    type: 'breaking',
    title: 'Breaking News',
    message: 'Global climate summit reaches historic agreement',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    read: true,
    icon: <TrendingUp className="w-5 h-5 text-red-500" />,
  },
  {
    id: '5',
    type: 'save',
    title: 'Saved article update',
    message: 'New developments on "Space Agency Lunar Base Plans"',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true,
    icon: <Bookmark className="w-5 h-5 text-amber-500" />,
  },
]

export default function NotificationsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Notifications
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Stay updated with your activity
          </p>
        </div>
        <button
          className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Notification settings"
        >
          <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Notification Preferences */}
      <div className="mb-8 p-4 bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800 rounded-xl">
        <div className="flex items-start gap-3">
          <Bell className="w-5 h-5 text-accent-600 dark:text-accent-400 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Push Notifications Enabled
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              You'll receive alerts for breaking news and replies to your comments
            </p>
            <button className="text-sm font-medium text-accent-600 dark:text-accent-400 hover:underline">
              Manage preferences
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {MOCK_NOTIFICATIONS.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-xl border transition-colors ${
              notification.read
                ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                : 'bg-accent-50 dark:bg-accent-900/20 border-accent-200 dark:border-accent-800'
            }`}
          >
            <div className="flex gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 mt-1">
                {notification.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {notification.title}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  {notification.message}
                </p>
                <div className="flex items-center gap-3">
                  <button className="text-sm font-medium text-accent-600 dark:text-accent-400 hover:underline">
                    View
                  </button>
                  {!notification.read && (
                    <button className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:underline">
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (hidden when notifications exist) */}
      {MOCK_NOTIFICATIONS.length === 0 && (
        <div className="text-center py-12">
          <BellOff className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No notifications yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            We'll notify you when something important happens
          </p>
        </div>
      )}
    </div>
  )
}
