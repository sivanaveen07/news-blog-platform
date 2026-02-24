import { useState } from 'react'
import { Table, Badge, Button, Form, Dropdown, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MOCK_ARTICLES = [
  { id: '1', title: 'Article One', author: 'user1', category: 'News', reports: 3, status: 'Active', publishDate: new Date().toISOString() },
  { id: '2', title: 'Article Two', author: 'user2', category: 'Tech', reports: 0, status: 'Active', publishDate: new Date().toISOString() },
  { id: '3', title: 'Reported Article', author: 'user3', category: 'Politics', reports: 5, status: 'Reported', publishDate: new Date().toISOString() },
]

export default function ManageArticles() {
  const [articles, setArticles] = useState(MOCK_ARTICLES)
  const [filterCategory, setFilterCategory] = useState('')
  const [filterAuthor, setFilterAuthor] = useState('')
  const [deleteModal, setDeleteModal] = useState(null)

  const handleDelete = (id) => {
    setArticles(articles.filter((a) => a.id !== id))
    setDeleteModal(null)
  }

  const filtered = articles.filter((a) => {
    const matchCat = !filterCategory || a.category === filterCategory
    const matchAuthor = !filterAuthor || a.author.toLowerCase().includes(filterAuthor.toLowerCase())
    return matchCat && matchAuthor
  })

  return (
    <div>
      <h2 className="section-title mb-4">Manage Articles</h2>

      <div className="d-flex gap-2 mb-4 flex-wrap">
        <Form.Select style={{ width: '160px' }} value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="News">News</option>
          <option value="Tech">Tech</option>
          <option value="Politics">Politics</option>
        </Form.Select>
        <Form.Control
          type="text"
          placeholder="Filter by author"
          value={filterAuthor}
          onChange={(e) => setFilterAuthor(e.target.value)}
          style={{ maxWidth: '200px' }}
        />
      </div>

      <Table hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Reports</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((art) => (
            <tr key={art.id}>
              <td><Link to={`/article/${art.id}`}>{art.title}</Link></td>
              <td>{art.author}</td>
              <td>{art.category}</td>
              <td>{art.reports}</td>
              <td><Badge bg={art.reports > 0 ? 'warning' : 'success'}>{art.status}</Badge></td>
              <td>{new Date(art.publishDate).toLocaleDateString()}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" size="sm">Actions</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={`/article/${art.id}`}>View</Dropdown.Item>
                    <Dropdown.Item className="text-warning">Warn User</Dropdown.Item>
                    <Dropdown.Item className="text-danger" onClick={() => setDeleteModal(art.id)}>Delete Article</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={!!deleteModal} onHide={() => setDeleteModal(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>Permanently delete this article? This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModal(null)}>Cancel</Button>
          <Button variant="danger" onClick={() => handleDelete(deleteModal)}>Delete Permanently</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
