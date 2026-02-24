import { Link } from 'react-router-dom'
import { Row, Col, Card, Badge, Button } from 'react-bootstrap'
import ArticleCard from '../../components/ArticleCard'
import { useAuth } from '../../context/AuthContext'

const MOCK_MY_ARTICLES = [
  {
    id: '1',
    title: 'My First Article on AI',
    excerpt: 'Exploring AI applications...',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
    author: { username: 'You' },
    category: 'AI / ML',
    tags: ['AI'],
    views: 125,
    likes: 12,
    publishDate: new Date().toISOString(),
    status: 'Active',
  },
]

const MOCK_SAVED = [
  {
    id: '2',
    title: 'Climate Change: What We Can Do',
    excerpt: 'Practical steps...',
    coverImage: 'https://images.unsplash.com/photo-1569163138754-1a73527f1a6f?w=400',
    author: { username: 'EcoWarrior' },
    category: 'News',
    tags: ['Climate'],
    views: 2340,
    likes: 156,
    publishDate: new Date().toISOString(),
  },
]

export default function DashboardHome() {
  const { user } = useAuth()

  return (
    <div>
      <h2 className="section-title mb-4">Welcome back, {user?.username || 'User'}!</h2>

      <Row className="mb-4 g-3">
        <Col md={4}>
          <Card className="stat-card card-modern border-0 h-100">
            <Card.Body>
              <div className="stat-icon">📝</div>
              <h4 className="stat-value">3</h4>
              <p className="stat-label">My Articles</p>
              <Link to="/dashboard/articles" className="stat-link">View all →</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="stat-card card-modern border-0 h-100">
            <Card.Body>
              <div className="stat-icon">📌</div>
              <h4 className="stat-value">5</h4>
              <p className="stat-label">Saved Articles</p>
              <Link to="/dashboard/saved" className="stat-link">View all →</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="stat-card card-modern border-0 h-100">
            <Card.Body>
              <div className="stat-icon">⚠️</div>
              <h4 className="stat-value">1</h4>
              <p className="stat-label">Reports</p>
              <Link to="/dashboard/reported" className="stat-link">View all →</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="section-title mb-0">My Uploaded Articles</h5>
          <Button as={Link} to="/create-article" variant="primary" size="sm">Create New</Button>
        </div>
        <Row xs={1} md={2} lg={3} className="g-4">
          {MOCK_MY_ARTICLES.map((art) => (
            <Col key={art.id}>
              <ArticleCard {...art} />
            </Col>
          ))}
          {MOCK_MY_ARTICLES.length === 0 && (
            <Col>
              <div className="empty-state p-4 text-center">
                <p className="text-muted mb-2">No articles yet.</p>
                <Button as={Link} to="/create-article" variant="primary">Create your first article</Button>
              </div>
            </Col>
          )}
        </Row>
      </div>

      <div>
        <h5 className="section-title mb-3">Recently Saved</h5>
        <Row xs={1} md={2} className="g-4">
          {MOCK_SAVED.slice(0, 2).map((art) => (
            <Col key={art.id}>
              <ArticleCard {...art} compact />
            </Col>
          ))}
          {MOCK_SAVED.length === 0 && (
            <Col>
              <div className="empty-state p-4 text-center">
                <p className="text-muted">No saved articles.</p>
              </div>
            </Col>
          )}
        </Row>
      </div>
    </div>
  )
}
