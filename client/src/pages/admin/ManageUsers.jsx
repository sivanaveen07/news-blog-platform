import { useState } from 'react'
import { Table, Badge, Button, Form, Dropdown, Modal } from 'react-bootstrap'

const MOCK_USERS = [
  { id: '1', username: 'user1', email: 'user1@example.com', articlesCount: 5, status: 'Active' },
  { id: '2', username: 'user2', email: 'user2@example.com', articlesCount: 12, status: 'Active' },
  { id: '3', username: 'banned_user', email: 'banned@example.com', articlesCount: 2, status: 'Banned' },
]

export default function ManageUsers() {
  const [users, setUsers] = useState(MOCK_USERS)
  const [search, setSearch] = useState('')
  const [banModal, setBanModal] = useState(null)

  const handleBan = (id) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, status: u.status === 'Banned' ? 'Active' : 'Banned' } : u)))
    setBanModal(null)
  }

  const filtered = users.filter(
    (u) =>
      !search ||
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2 className="section-title mb-4">Manage Users</h2>
      <p className="text-muted mb-4">View, ban, or unban users.</p>

      <Form.Control
        type="search"
        placeholder="Search by username or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
        style={{ maxWidth: '320px' }}
      />

      <Table hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Articles</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.articlesCount}</td>
              <td><Badge bg={u.status === 'Banned' ? 'danger' : 'success'}>{u.status}</Badge></td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" size="sm">Actions</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setBanModal(u.id)}>
                      {u.status === 'Banned' ? 'Unban User' : 'Ban User'}
                    </Dropdown.Item>
                    <Dropdown.Item className="text-danger">Delete User Content</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={!!banModal} onHide={() => setBanModal(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {users.find((u) => u.id === banModal)?.status === 'Banned'
            ? 'Unban this user?'
            : 'Ban this user? They will not be able to post or comment.'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setBanModal(null)}>Cancel</Button>
          <Button variant={users.find((u) => u.id === banModal)?.status === 'Banned' ? 'success' : 'danger'} onClick={() => handleBan(banModal)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
