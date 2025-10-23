'use client'

import { useState } from 'react'
import { ArrowUp, ArrowDown, Reply, MoreHorizontal } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: Date
  votes: number
  replies: Comment[]
  level: number
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    author: 'TechEnthusiast42',
    avatar: '👨‍💻',
    content: 'This is a game-changer! Finally seeing real progress in renewable energy storage. The implications for grid stability are enormous.',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    votes: 23,
    level: 0,
    replies: [
      {
        id: '2',
        author: 'GreenFuture',
        avatar: '🌱',
        content: 'Agreed! This could accelerate the transition away from fossil fuels by at least a decade.',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        votes: 12,
        level: 1,
        replies: [],
      },
    ],
  },
  {
    id: '3',
    author: 'SkepticalScientist',
    avatar: '🔬',
    content: 'Interesting development, but I\'d like to see the peer-reviewed papers before getting too excited. Lab results don\'t always translate to commercial viability.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    votes: 18,
    level: 0,
    replies: [],
  },
  {
    id: '4',
    author: 'EnergyExpert',
    avatar: '⚡',
    content: 'The cost per kWh is the real question here. Even if the technology works, it needs to be economically competitive with existing solutions.',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    votes: 15,
    level: 0,
    replies: [],
  },
]

export default function CommentSection({ articleId }: { articleId: string }) {
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS)
  const [newComment, setNewComment] = useState('')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const [commentVotes, setCommentVotes] = useState<Record<string, number>>({})

  const handleVote = (commentId: string, voteType: 'up' | 'down') => {
    setCommentVotes(prev => {
      const currentVote = prev[commentId] || 0
      if (voteType === 'up') {
        return { ...prev, [commentId]: currentVote === 1 ? 0 : 1 }
      } else {
        return { ...prev, [commentId]: currentVote === -1 ? 0 : -1 }
      }
    })
  }

  const handleSubmitComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      avatar: '👤',
      content: newComment,
      timestamp: new Date(),
      votes: 0,
      level: 0,
      replies: [],
    }

    setComments([comment, ...comments])
    setNewComment('')
  }

  const handleSubmitReply = (parentId: string) => {
    if (!replyText.trim()) return

    const reply: Comment = {
      id: Date.now().toString(),
      author: 'You',
      avatar: '👤',
      content: replyText,
      timestamp: new Date(),
      votes: 0,
      level: 1,
      replies: [],
    }

    setComments(comments.map(comment => {
      if (comment.id === parentId) {
        return { ...comment, replies: [...comment.replies, reply] }
      }
      return comment
    }))

    setReplyText('')
    setReplyingTo(null)
  }

  const renderComment = (comment: Comment) => {
    const totalVotes = comment.votes + (commentVotes[comment.id] || 0)

    return (
      <div
        key={comment.id}
        className={`${comment.level > 0 ? 'ml-8 mt-3' : 'mt-4'}`}
        style={{ marginLeft: comment.level > 0 ? `${comment.level * 2}rem` : 0 }}
      >
        <div className="flex gap-3">
          {/* Vote Column */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={() => handleVote(comment.id, 'up')}
              className={`p-1 rounded transition-colors ${
                commentVotes[comment.id] === 1
                  ? 'text-accent-500'
                  : 'text-gray-400 hover:text-accent-500'
              }`}
              aria-label="Upvote comment"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              {totalVotes}
            </span>
            <button
              onClick={() => handleVote(comment.id, 'down')}
              className={`p-1 rounded transition-colors ${
                commentVotes[comment.id] === -1
                  ? 'text-red-500'
                  : 'text-gray-400 hover:text-red-500'
              }`}
              aria-label="Downvote comment"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>

          {/* Comment Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg" role="img" aria-label="User avatar">
                {comment.avatar}
              </span>
              <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                {comment.author}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
              </span>
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
              {comment.content}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-accent-500 transition-colors"
              >
                <Reply className="w-3 h-3" />
                Reply
              </button>
              <button className="text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-accent-500 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Reply Input */}
            {replyingTo === comment.id && (
              <div className="mt-3">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
                  rows={2}
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleSubmitReply(comment.id)}
                    className="px-4 py-1.5 text-sm font-medium bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors"
                  >
                    Reply
                  </button>
                  <button
                    onClick={() => {
                      setReplyingTo(null)
                      setReplyText('')
                    }}
                    className="px-4 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Nested Replies */}
            {comment.replies.map(reply => renderComment(reply))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="space-y-4" aria-label="Comments">
      {/* New Comment Input */}
      <div className="space-y-3">
        <label htmlFor="new-comment" className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
          Join the discussion
        </label>
        <textarea
          id="new-comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
          rows={3}
        />
        <button
          onClick={handleSubmitComment}
          disabled={!newComment.trim()}
          className="px-6 py-2 bg-accent-500 text-white font-medium rounded-lg hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Post Comment
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
          {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
        </h4>
        {comments.map(comment => renderComment(comment))}
      </div>
    </section>
  )
}
