'use client'

import { useState } from 'react'
import { ArrowUp, ArrowDown, MessageCircle, Bookmark, Share2, ExternalLink } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import CommentSection from './CommentSection'

interface Article {
  id: string
  title: string
  summary: string
  source: string
  sourceIcon: string
  author: string
  publishedAt: Date
  category: string
  imageUrl?: string
  votes: number
  comments: number
  saves: number
}

interface NewsCardProps {
  article: Article
  userVote: number
  isSaved: boolean
  onVote: (voteType: 'up' | 'down') => void
  onSave: () => void
}

export default function NewsCard({ article, userVote, isSaved, onVote, onSave }: NewsCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const totalVotes = article.votes + userVote

  const handleShare = (platform: string) => {
    const url = `https://newsphere.app/article/${article.id}`
    const text = article.title

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'facebook':
        window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        alert('Link copied to clipboard!')
        break
    }
    setShowShareMenu(false)
  }

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden card-hover border border-gray-200 dark:border-gray-700">
      {/* Image */}
      {article.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-lg">
              {article.category}
            </span>
          </div>
        </div>
      )}

      <div className="p-5">
        {/* Source Info */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl" role="img" aria-label={article.source}>
            {article.sourceIcon}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
              {article.source}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {article.author} • {formatDistanceToNow(article.publishedAt, { addSuffix: true })}
            </p>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight">
          {article.title}
        </h3>

        {/* Summary */}
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed">
          {article.summary}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          {/* Vote Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onVote('up')}
              className={`p-2 rounded-lg transition-all ${
                userVote === 1
                  ? 'bg-accent-500 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
              aria-label="Upvote"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
            <span className="min-w-[3rem] text-center font-semibold text-gray-900 dark:text-gray-100">
              {totalVotes}
            </span>
            <button
              onClick={() => onVote('down')}
              className={`p-2 rounded-lg transition-all ${
                userVote === -1
                  ? 'bg-red-500 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
              aria-label="Downvote"
            >
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>

          {/* Comments Button */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
            aria-label={`${article.comments} comments`}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">{article.comments}</span>
          </button>

          {/* Save Button */}
          <button
            onClick={onSave}
            className={`p-2 rounded-lg transition-all ${
              isSaved
                ? 'bg-amber-500 text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}
            aria-label={isSaved ? 'Remove from saved' : 'Save for later'}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          {/* Share Button */}
          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
              aria-label="Share article"
            >
              <Share2 className="w-5 h-5" />
            </button>
            {showShareMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-10">
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  Share on Twitter
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  Share on Facebook
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  Copy Link
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <CommentSection articleId={article.id} />
          </div>
        )}
      </div>
    </article>
  )
}
