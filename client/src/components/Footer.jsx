import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer-modern">
      <Container>
        <Row className="py-5">
          <Col lg={4} className="mb-4 mb-lg-0">
            <div className="footer-brand">
              <span className="brand-icon">◇</span>
              <span>NewsHub</span>
            </div>
            <p className="footer-desc mt-3">
              A community-driven platform for news, blogs, and discussions. Share, discover, and engage.
            </p>
          </Col>
          <Col lg={2} className="mb-4 mb-lg-0">
            <h6>Explore</h6>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/">News</Link></li>
              <li><Link to="/">Blogs</Link></li>
              <li><Link to="/">Popular</Link></li>
            </ul>
          </Col>
          <Col lg={2} className="mb-4 mb-lg-0">
            <h6>Account</h6>
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Sign Up</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
          </Col>
          <Col lg={2} className="mb-4 mb-lg-0">
            <h6>Legal</h6>
            <ul>
              <li><a href="#privacy">Privacy</a></li>
              <li><a href="#terms">Terms</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </Col>
        </Row>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} NewsHub. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}
