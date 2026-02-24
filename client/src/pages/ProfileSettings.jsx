import { useState } from 'react'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import './ProfileSettings.css'

export default function ProfileSettings() {
  const { user, updateUser } = useAuth()
  const [username, setUsername] = useState(user?.username || '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleProfileUpdate = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      updateUser({ ...user, username })
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      setLoading(false)
    }, 800)
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'danger', text: 'Passwords do not match' })
      return
    }
    if (newPassword.length < 6) {
      setMessage({ type: 'danger', text: 'Password must be at least 6 characters' })
      return
    }
    setLoading(true)
    setTimeout(() => {
      setMessage({ type: 'success', text: 'Password changed successfully!' })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setLoading(false)
    }, 800)
  }

  return (
    <div className="profile-settings-page">
      <Container className="py-4">
        <h1 className="page-title mb-4">Profile Settings</h1>

        {message && (
          <div className={`alert alert-${message.type} alert-dismissible`} role="alert">
            {message.text}
            <button type="button" className="btn-close" onClick={() => setMessage(null)} aria-label="Close" />
          </div>
        )}

        <Row>
          <Col md={6}>
            <Card className="settings-card card-modern mb-4">
              <Card.Header>
                <h5 className="mb-0">Profile Information</h5>
              </Card.Header>
              <Card.Body>
                <div className="profile-avatar-preview mb-4 text-center">
                  <div className="profile-avatar-large">
                    {user?.username?.[0]?.toUpperCase() || 'U'}
                  </div>
                </div>
                <Form onSubmit={handleProfileUpdate}>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Profile Picture URL (optional)</Form.Label>
                    <Form.Control
                      type="url"
                      placeholder="https://..."
                      value={profileImage}
                      onChange={(e) => setProfileImage(e.target.value)}
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="settings-card card-modern mb-4">
              <Card.Header>
                <h5 className="mb-0">Change Password</h5>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handlePasswordChange}>
                  <Form.Group className="mb-3">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button type="submit" variant="outline-primary" disabled={loading}>
                    Update Password
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
