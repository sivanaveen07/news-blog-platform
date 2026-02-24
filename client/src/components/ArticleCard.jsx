import { Link } from 'react-router-dom'
import { Card, Badge } from 'react-bootstrap'
import './ArticleCard.css'

export default function ArticleCard({
  id,
  title,
  excerpt,
  coverImage,
  author,
  category,
  views,
  likes,
  publishDate,
  compact = false,
}) {
  const formatDate = (date) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <Card as={Link} to={`/article/${id}`} className={`article-card-modern ${compact ? 'article-card-compact' : ''}`}>
      <div className="article-card-image">
        <img
          src={coverImage || 'https://via.placeholder.com/400x220/1e293b/64748b?text=NewsHub'}
          alt={title}
        />
        <Badge className="article-category-badge">{category || 'General'}</Badge>
      </div>

      <Card.Body className="article-card-body">
        <h5 className="article-card-title">{title}</h5>
        
        {!compact && (
          <p className="article-card-excerpt">
            {excerpt}
          </p>
        )}

        <div className="article-card-meta">
          <div className="author-info">
             <span className="author-name">@{author?.username || 'user'}</span>
             <span className="text-muted" style={{fontSize: '0.75rem'}}>• {formatDate(publishDate)}</span>
          </div>
          
          <div className="article-card-stats">
            <span className="stat-item" title="Views">👁 {views || 0}</span>
            <span className="stat-item" title="Likes">❤ {likes || 0}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}