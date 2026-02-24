import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate(user.isAdmin ? '/admin' : '/dashboard', { replace: true })
  }, [user, navigate])

  const handleSubmit = async (e) => {
  e.preventDefault()
  setError('')
  setLoading(true)

  // FIX: Admin detection logic
  // We'll treat 'admin@newshub.com' as the superuser
  const isAdmin = email.toLowerCase() === 'admin@newshub.com' && password === 'admin123';
  
  setTimeout(() => {
    if (email && password) {
      login(
        { 
          username: isAdmin ? 'System Admin' : email.split('@')[0], 
          email, 
          isAdmin 
        },
        'mock-jwt-token'
      )
      
      // Redirect based on role
      if (isAdmin) {
        navigate('/admin')
      } else {
        navigate('/dashboard')
      }
    } else {
      setError('Invalid credentials')
    }
    setLoading(false)
  }, 1000)
}

  return (
    <div className="auth-page">
      <div className="auth-bg" />
      <Container className="auth-container">
        <div className="auth-card-wrapper">
          <Card className="auth-card glass-panel">
            <Card.Body className="p-5">
              <div className="auth-header text-center mb-4">
                <h1>Welcome Back</h1>
                <p>Sign in to continue to NewsHub</p>
              </div>

              {error && (
                <Alert variant="danger" dismissible onClose={() => setError('')}>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email or Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email or username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="auth-input"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="auth-input"
                  />
                </Form.Group>

                <div className="mb-4">
                  <a href="#forgot" className="auth-link">Forgot password?</a>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-100 auth-btn"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </Form>

              <p className="auth-footer mt-4 text-center">
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  )
}
