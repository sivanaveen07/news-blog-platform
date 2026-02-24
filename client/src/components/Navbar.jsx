import { Link, useNavigate } from 'react-router-dom'
import { Container, Nav, Navbar as BSNavbar, Dropdown, Button } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <BSNavbar className="navbar-modern" expand="lg" fixed="top">
      <Container>
        {/* Brand/Logo */}
        <BSNavbar.Brand as={Link} to="/" className="navbar-brand-custom">
          <span className="brand-icon">◇</span>
          <span>NewsHub</span>
        </BSNavbar.Brand>

        {/* Navigation Links - Left Side */}
        <Nav className="me-auto d-none d-lg-flex">
          <Nav.Link as={Link} to="/" className="nav-link-left">Home</Nav.Link>
        </Nav>

        <BSNavbar.Toggle aria-controls="main-nav" />
        
        <BSNavbar.Collapse id="main-nav">
          {/* Mobile Home Link (Only shows when collapsed) */}
          <Nav className="d-lg-none">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          </Nav>

          {/* User Actions - Right Side */}
          <Nav className="ms-auto align-items-lg-center gap-2">
            {user ? (
              <>
                {user.isAdmin && (
                  <Nav.Link as={Link} to="/admin" className="admin-link-glow">
                    Admin Panel
                  </Nav.Link>
                )}

                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" className="nav-user-toggle">
                    <div className="nav-avatar">
                      {user?.username?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="d-none d-md-inline">{user?.username}</span>
                  </Dropdown.Toggle>
                  
                  <Dropdown.Menu className="dropdown-menu-modern">
                    <Dropdown.Header>Navigation</Dropdown.Header>
                    <Dropdown.Item as={Link} to="/dashboard">📊 Dashboard</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/create-article">✏️ Create Article</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item as={Link} to="/profile-settings">⚙️ Settings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout} className="text-danger">Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Button as={Link} to="/login" variant="outline-primary" size="sm" className="px-3">Login</Button>
                <Button as={Link} to="/register" variant="primary" size="sm" className="px-3">Sign Up</Button>
              </>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  )
}