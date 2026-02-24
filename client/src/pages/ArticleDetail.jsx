import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Button, Badge, Form, Modal, Dropdown } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import CommentSection from '../components/CommentSection'
import './ArticleDetail.css'

const MOCK_ARTICLE = {
  id: '1',
  title: 'The Future of AI in Healthcare',
  content: `
    <p>Artificial intelligence is rapidly transforming the healthcare industry. From diagnostic imaging to personalized treatment plans, AI is enabling doctors to provide better care.</p>
    <h3>Key Applications</h3>
    <p>Machine learning algorithms can now detect diseases like cancer at earlier stages than ever before. Natural language processing helps analyze patient records and clinical notes.</p>
    <h3>Ethical Considerations</h3>
    <p>As we integrate AI into healthcare, we must ensure patient privacy, transparency in decision-making, and equitable access to these technologies.</p>
    <p>The future of healthcare lies in the thoughtful integration of human expertise with artificial intelligence capabilities.</p>
  `,
  coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
  author: { username: 'DrSarah', id: '1' },
  category: 'AI / ML',
  tags: ['AI', 'Healthcare', 'Technology'],
  views: 1250,
  likes: 89,
  publishDate: new Date().toISOString(),
}

const MOCK_COMMENTS = [
  { id: '1', text: 'Great article! AI in healthcare has so much potential.', author: { username: 'TechFan' }, createdAt: new Date().toISOString(), replies: [] },
  { id: '2', text: 'What about data privacy concerns?', author: { username: 'PrivacyAdvocate' }, createdAt: new Date().toISOString(), replies: [{ id: 'r1', text: 'Valid point - regulations will be crucial.', author: { username: 'DrSarah' }, createdAt: new Date().toISOString() }] },
]

const REPORT_REASONS = ['Fake news', 'Hate speech', 'Spam', 'Plagiarism', 'Violence', 'Other']

export default function ArticleDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [article] = useState(MOCK_ARTICLE)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likeCount, setLikeCount] = useState(article.likes || 0)
  const [reportModal, setReportModal] = useState(false)
  const [reportReason, setReportReason] = useState('')
  const [reportDetail, setReportDetail] = useState('')

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const shareUrl = window.location.href

  const handleShare = (platform) => {
    const text = encodeURIComponent(article.title)
    const urls = {
      whatsapp: `https://wa.me/?text=${text}%20${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    }
    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl)
      alert('Link copied to clipboard!')
    } else {
      window.open(urls[platform], '_blank', 'width=600,height=400')
    }
  }

  const handleReport = () => {
    console.log('Report:', reportReason, reportDetail)
    setReportModal(false)
    setReportReason('')
    setReportDetail('')
    alert('Report submitted. Thank you.')
  }

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount((c) => (liked ? c - 1 : c + 1))
  }

  return (
    <div className="article-detail-page">
      <div className="article-cover">
        <img src={article.coverImage || 'https://via.placeholder.com/1200x400/f1f5f9/64748b?text=No+Image'} alt={article.title} />
        <div className="cover-overlay" />
      </div>

      <Container>
        <article className="article-content-block">
          <Badge className="category-badge mb-3">{article.category}</Badge>
          <h1 className="article-title">{article.title}</h1>
          <div className="article-meta">
            <Link to="#" className="author-link">{article.author?.username}</Link>
            <span className="date">{formatDate(article.publishDate)}</span>
            <span className="stats">👁 {article.views} views</span>
          </div>

          <div className="article-actions">
            <Button
              variant={liked ? 'danger' : 'outline-danger'}
              size="sm"
              onClick={handleLike}
            >
              ❤ {likeCount}
            </Button>
            <Button variant="outline-secondary" size="sm" onClick={() => setSaved(!saved)}>
              {saved ? '📌 Saved' : '📌 Save'}
            </Button>
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary" size="sm">Share</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleShare('whatsapp')}>WhatsApp</Dropdown.Item>
                <Dropdown.Item onClick={() => handleShare('twitter')}>X (Twitter)</Dropdown.Item>
                <Dropdown.Item onClick={() => handleShare('linkedin')}>LinkedIn</Dropdown.Item>
                <Dropdown.Item onClick={() => handleShare('copy')}>Copy Link</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {user && (
              <Button variant="outline-warning" size="sm" onClick={() => setReportModal(true)}>
                Report
              </Button>
            )}
          </div>

          <div className="article-body" dangerouslySetInnerHTML={{ __html: article.content }} />

          {article.tags?.length > 0 && (
            <div className="article-tags mt-4">
              {article.tags.map((tag) => (
                <Badge key={tag} bg="light" text="dark" className="tag-badge">{tag}</Badge>
              ))}
            </div>
          )}
        </article>

        <CommentSection articleId={id} comments={MOCK_COMMENTS} />
      </Container>

      <Modal show={reportModal} onHide={() => setReportModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Report Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Reason</Form.Label>
            <Form.Select value={reportReason} onChange={(e) => setReportReason(e.target.value)}>
              <option value="">Select a reason</option>
              {REPORT_REASONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Additional details (optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={reportDetail}
              onChange={(e) => setReportDetail(e.target.value)}
              placeholder="Provide more context..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setReportModal(false)}>Cancel</Button>
          <Button variant="warning" onClick={handleReport} disabled={!reportReason}>Submit Report</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
