import { Row, Col } from 'react-bootstrap'
import ArticleCard from '../../components/ArticleCard'

const MOCK_SAVED = [
  {
    id: '2',
    title: 'Climate Change: What We Can Do Now',
    excerpt: 'Practical steps every individual can take.',
    coverImage: 'https://images.unsplash.com/photo-1569163138754-1a73527f1a6f?w=600',
    author: { username: 'EcoWarrior' },
    category: 'News',
    tags: ['Climate'],
    views: 2340,
    likes: 156,
    publishDate: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Building Scalable Web Apps with React',
    excerpt: 'Best practices and patterns.',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600',
    author: { username: 'DevPro' },
    category: 'Technology',
    tags: ['React'],
    views: 890,
    likes: 67,
    publishDate: new Date().toISOString(),
  },
]

export default function SavedArticles() {
  return (
    <div>
      <h2 className="section-title mb-4">Saved Articles</h2>
      <p className="text-muted mb-4">Your bookmarked articles appear here.</p>
      <Row xs={1} md={2} lg={3} className="g-4">
        {MOCK_SAVED.map((art) => (
          <Col key={art.id}>
            <ArticleCard {...art} />
          </Col>
        ))}
        {MOCK_SAVED.length === 0 && (
          <Col>
            <div className="empty-state p-5 text-center">
              <p className="text-muted">No saved articles yet. Save articles while reading to see them here.</p>
            </div>
          </Col>
        )}
      </Row>
    </div>
  )
}
