import { useState, useEffect } from 'react'
import { Container, Row, Col, Button, ButtonGroup, Badge } from 'react-bootstrap'
import SearchBar from '../components/SearchBar'
import ArticleCard from '../components/ArticleCard'
import './Home.css'

const CATEGORIES = [
  'All',
  'News',
  'Blogs',
  'Technology',
  'Politics',
  'Education',
  'Sports',
  'AI / ML',
]

// Mock data - replace with API calls
const MOCK_ARTICLES = [
  {
    id: '1',
    title: 'The Future of AI in Healthcare',
    excerpt: 'Exploring how artificial intelligence is transforming medical diagnostics and patient care.',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600',
    author: { username: 'DrSarah' },
    category: 'AI / ML',
    tags: ['AI', 'Healthcare', 'Technology'],
    views: 1250,
    likes: 89,
    publishDate: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Climate Change: What We Can Do Now',
    excerpt: 'Practical steps every individual can take to reduce their carbon footprint.',
    coverImage: 'https://images.unsplash.com/photo-1569163138754-1a73527f1a6f?w=600',
    author: { username: 'EcoWarrior' },
    category: 'News',
    tags: ['Climate', 'Environment'],
    views: 2340,
    likes: 156,
    publishDate: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    title: 'Building Scalable Web Apps with React',
    excerpt: 'Best practices and patterns for creating performant React applications.',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600',
    author: { username: 'DevPro' },
    category: 'Technology',
    tags: ['React', 'Web Development'],
    views: 890,
    likes: 67,
    publishDate: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: '4',
    title: 'Education Revolution in 2025',
    excerpt: 'How online learning is reshaping traditional education models.',
    coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600',
    author: { username: 'EduTech' },
    category: 'Education',
    tags: ['Education', 'EdTech'],
    views: 567,
    likes: 42,
    publishDate: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: '5',
    title: 'Sports Analytics: Data-Driven Performance',
    excerpt: 'Using big data to improve athletic performance and strategy.',
    coverImage: 'https://images.unsplash.com/photo-1461896836934-ff607b4f415a?w=600',
    author: { username: 'SportsAnalyst' },
    category: 'Sports',
    tags: ['Sports', 'Analytics'],
    views: 1100,
    likes: 78,
    publishDate: new Date(Date.now() - 345600000).toISOString(),
  },
  {
    id: '6',
    title: 'Global Politics in the Digital Age',
    excerpt: 'How social media and technology are influencing political discourse.',
    coverImage: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600',
    author: { username: 'PoliTech' },
    category: 'Politics',
    tags: ['Politics', 'Technology'],
    views: 1890,
    likes: 134,
    publishDate: new Date(Date.now() - 432000000).toISOString(),
  },
]

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [articles] = useState(MOCK_ARTICLES)

  const popularArticles = [...articles].sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 3)
  const latestArticles = [...articles].sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate)).slice(0, 4)
  const aiRecommended = [...articles].slice(0, 3) // Replace with AI API

  const filteredArticles = articles.filter((a) => {
    const matchCategory = selectedCategory === 'All' || a.category === selectedCategory
    const matchSearch =
      !searchQuery ||
      a.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      a.author?.username?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div className="home-page">
      {/* Hero + Search */}
      <section className="hero-section">
        <div className="hero-bg" />
        <Container>
          <div className="hero-content text-center">
            <Badge className="hero-badge">Community-Driven Platform</Badge>
            <h1 className="hero-title">Discover Stories That Matter</h1>
            <p className="hero-subtitle">
              Read, share, and discuss news and blogs from around the world. Your voice matters.
            </p>
            <div className="hero-search">
              <SearchBar onSearch={setSearchQuery} />
            </div>
          </div>
        </Container>
      </section>

      {/* Category Filters */}
      <section className="filters-section">
        <Container>
          <ButtonGroup className="filter-buttons">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'primary' : 'outline-secondary'}
                onClick={() => setSelectedCategory(cat)}
                className="filter-btn"
              >
                {cat}
              </Button>
            ))}
          </ButtonGroup>
        </Container>
      </section>

      <Container className="py-5">
        {/* Popular Articles */}
        <section className="section-block mb-5">
          <div className="section-header">
            <h2 className="section-title">🔥 Popular Articles</h2>
            <span className="section-badge">Most liked</span>
          </div>
          <Row xs={1} md={3} className="g-4">
            {popularArticles.map((art) => (
              <Col key={art.id}>
                <ArticleCard {...art} />
              </Col>
            ))}
          </Row>
        </section>

        {/* Latest + AI Recommended + Main Feed */}
        <Row>
          <Col lg={8}>
            {/* Latest News */}
            <section className="section-block mb-5">
              <div className="section-header">
                <h2 className="section-title">🆕 Latest News</h2>
              </div>
              <Row xs={1} sm={2} className="g-4">
                {latestArticles.map((art) => (
                  <Col key={art.id}>
                    <ArticleCard {...art} compact />
                  </Col>
                ))}
              </Row>
            </section>

            {/* All Articles Feed */}
            <section className="section-block">
              <div className="section-header">
                <h2 className="section-title">📰 All Articles</h2>
              </div>
              <Row xs={1} className="g-4">
                {filteredArticles.map((art) => (
                  <Col key={art.id}>
                    <ArticleCard {...art} />
                  </Col>
                ))}
                {filteredArticles.length === 0 && (
                  <Col>
                    <div className="empty-state">
                      <p>No articles found. Try a different filter or search.</p>
                    </div>
                  </Col>
                )}
              </Row>
            </section>
          </Col>

          <Col lg={4}>
            {/* AI Recommended Sidebar */}
            <section className="section-block sidebar-section">
              <div className="section-header">
                <h2 className="section-title">🤖 AI Recommended</h2>
                <span className="section-badge ai-badge">For You</span>
              </div>
              <div className="recommended-list">
                {aiRecommended.map((art) => (
                  <ArticleCard key={art.id} {...art} compact />
                ))}
              </div>
            </section>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
