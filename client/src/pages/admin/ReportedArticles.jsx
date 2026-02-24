import { useState } from 'react'
import { Table, Badge, Button, Modal, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MOCK_REPORTS = [
  { id: '1', articleId: '1', articleTitle: 'Fake News Article', author: 'user1', reportCount: 5, reasons: ['Fake news', 'Spam'], status: 'Pending' },
  { id: '2', articleId: '2', articleTitle: 'Hate Speech Post', author: 'user2', reportCount: 3, reasons: ['Hate speech'], status: 'Pending' },
  { id: '3', articleId: '3', articleTitle: 'Plagiarized Content', author: 'user3', reportCount: 2, reasons: ['Plagiarism'], status: 'Action Taken' },
]

export default function ReportedArticles() {
  const [reports, setReports] = useState(MOCK_REPORTS)
  const [actionModal, setActionModal] = useState(null)

  const handleAction = (id, action) => {
    setReports(reports.map((r) => (r.id === id ? { ...r, status: action } : r)))
    setActionModal(null)
  }

  return (
    <div>
      <h2 className="section-title mb-4">Reported Articles</h2>
      <p className="text-muted mb-4">Review and take action on reported content.</p>

      <Table hover>
        <thead>
          <tr>
            <th>Article</th>
            <th>Author</th>
            <th>Report Count</th>
            <th>Reasons</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r.id}>
              <td><Link to={`/article/${r.articleId}`}>{r.articleTitle}</Link></td>
              <td>{r.author}</td>
              <td>{r.reportCount}</td>
              <td>{r.reasons?.join(', ')}</td>
              <td><Badge bg={r.status === 'Pending' ? 'warning' : 'success'}>{r.status}</Badge></td>
              <td>
                {r.status === 'Pending' && (
                  <Dropdown>
                    <Dropdown.Toggle variant="outline-primary" size="sm">Take Action</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleAction(r.id, 'Ignored')}>Ignore Report</Dropdown.Item>
                      <Dropdown.Item onClick={() => setActionModal({ id: r.id, type: 'warn' })}>Warn User</Dropdown.Item>
                      <Dropdown.Item onClick={() => setActionModal({ id: r.id, type: 'delete' })}>Delete Article</Dropdown.Item>
                      <Dropdown.Item className="text-danger" onClick={() => handleAction(r.id, 'Banned')}>Ban User</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={!!actionModal} onHide={() => setActionModal(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{actionModal?.type === 'delete' ? 'Delete Article' : 'Warn User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {actionModal?.type === 'delete'
            ? 'Are you sure you want to delete this article?'
            : 'Send a warning to the article author?'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setActionModal(null)}>Cancel</Button>
          <Button variant="primary" onClick={() => { handleAction(actionModal.id, actionModal.type === 'delete' ? 'Deleted' : 'Warned'); setActionModal(null); }}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
