import { useState } from 'react'
import { Row, Col, Button, Badge, Table, Modal, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ArticleCard from '../../components/ArticleCard'

const MOCK_ARTICLES = [
  { id: '1', title: 'AI in Healthcare', category: 'AI / ML', status: 'Active', views: 125, likes: 12, publishDate: new Date().toISOString(), author: { username: 'You' } },
  { id: '2', title: 'Draft: Web Dev Tips', category: 'Technology', status: 'Draft', views: 0, likes: 0, publishDate: null, author: { username: 'You' } },
  { id: '3', title: 'Reported Article', category: 'News', status: 'Reported', views: 50, likes: 5, publishDate: new Date().toISOString(), author: { username: 'You' } },
]

export default function MyArticles() {
  const [articles, setArticles] = useState(MOCK_ARTICLES)
  const [deleteModal, setDeleteModal] = useState(null)

  const handleDelete = (id) => {
    setArticles(articles.filter((a) => a.id !== id))
    setDeleteModal(null)
  }

  const getStatusBadge = (status) => {
    const variants = { Active: 'success', Draft: 'secondary', Reported: 'warning', Deleted: 'danger' }
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="section-title mb-0">My Articles</h2>
        <Button as={Link} to="/create-article" variant="primary">+ Create Article</Button>
      </div>

      <div className="table-responsive">
        <Table hover className="dashboard-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Views</th>
              <th>Likes</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((art) => (
              <tr key={art.id}>
                <td>
                  <Link to={`/article/${art.id}`} className="article-link">{art.title}</Link>
                </td>
                <td>{art.category}</td>
                <td>{getStatusBadge(art.status)}</td>
                <td>{art.views}</td>
                <td>{art.likes}</td>
                <td>{art.publishDate ? new Date(art.publishDate).toLocaleDateString() : '-'}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary" size="sm">⋮</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to={`/article/${art.id}`}>View</Dropdown.Item>
                      <Dropdown.Item href="#">Edit</Dropdown.Item>
                      <Dropdown.Item className="text-danger" onClick={() => setDeleteModal(art.id)}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={!!deleteModal} onHide={() => setDeleteModal(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this article? This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModal(null)}>Cancel</Button>
          <Button variant="danger" onClick={() => handleDelete(deleteModal)}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
