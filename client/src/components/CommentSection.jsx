import { useState } from 'react'
import { Button, Form, Card } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import './CommentSection.css'

export default function CommentSection({ articleId, comments: initialComments }) {
  const { user } = useAuth()
  const [comments, setComments] = useState(initialComments || [])
  const [newComment, setNewComment] = useState('')
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyText, setReplyText] = useState('')

  const addComment = () => {
    if (!newComment.trim() || !user) return
    setComments([
      ...comments,
      {
        id: Date.now().toString(),
        text: newComment,
        author: { username: user.username },
        createdAt: new Date().toISOString(),
        replies: [],
      },
    ])
    setNewComment('')
  }

  const addReply = (parentId) => {
    if (!replyText.trim() || !user) return
    const parent = comments.find((c) => c.id === parentId)
    const reply = {
      id: `r-${Date.now()}`,
      text: replyText,
      author: { username: user.username },
      createdAt: new Date().toISOString(),
    }
    setComments(
      comments.map((c) =>
        c.id === parentId
          ? { ...c, replies: [...(c.replies || []), reply] }
          : c
      )
    )
    setReplyText('')
    setReplyingTo(null)
  }

  const deleteComment = (id, isReply, parentId) => {
    if (isReply) {
      setComments(
        comments.map((c) =>
          c.id === parentId
            ? { ...c, replies: (c.replies || []).filter((r) => r.id !== id) }
            : c
        )
      )
    } else {
      setComments(comments.filter((c) => c.id !== id))
    }
  }

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <section className="comment-section mt-5">
      <h3 className="section-title mb-4">Comments ({comments.length})</h3>

      {user && (
        <div className="comment-form-block mb-4">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="comment-input"
          />
          <Button variant="primary" className="mt-2" onClick={addComment} disabled={!newComment.trim()}>
            Post Comment
          </Button>
        </div>
      )}

      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-item">
            <div className="comment-avatar">{comment.author?.username?.[0]?.toUpperCase() || 'U'}</div>
            <div className="comment-body">
              <div className="comment-header">
                <span className="comment-author">{comment.author?.username}</span>
                <span className="comment-date">{formatDate(comment.createdAt)}</span>
                {user && (
                  <Button
                    variant="link"
                    size="sm"
                    className="text-muted ms-auto"
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  >
                    Reply
                  </Button>
                )}
              </div>
              <p className="comment-text">{comment.text}</p>

              {replyingTo === comment.id && (
                <div className="reply-form mt-2">
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Write a reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <Button size="sm" variant="primary" className="mt-1 me-2" onClick={() => addReply(comment.id)}>Post</Button>
                  <Button size="sm" variant="outline-secondary" onClick={() => { setReplyingTo(null); setReplyText('') }}>Cancel</Button>
                </div>
              )}

              {(comment.replies || []).map((reply) => (
                <div key={reply.id} className="reply-item">
                  <div className="reply-avatar">{reply.author?.username?.[0]?.toUpperCase() || 'U'}</div>
                  <div>
                    <span className="comment-author">{reply.author?.username}</span>
                    <span className="comment-date ms-2">{formatDate(reply.createdAt)}</span>
                    <p className="comment-text mb-0">{reply.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {comments.length === 0 && (
        <p className="text-muted text-center py-4">No comments yet. Be the first to comment!</p>
      )}
    </section>
  )
}
