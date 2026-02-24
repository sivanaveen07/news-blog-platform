import { Routes, Route, Link, useLocation,} from 'react-router-dom'
import { Container, Row, Col, Nav as BSNav } from 'react-bootstrap'
import AdminHome from './admin/AdminHome'
import ManageArticles from './admin/ManageArticles'
import ReportedArticles from './admin/ReportedArticles'
import ManageUsers from './admin/ManageUsers'
import './AdminDashboard.css'

const ADMIN_NAV = [
  { path: '', label: 'Overview', icon: '📊' },
  { path: 'articles', label: 'Manage Articles', icon: '📝' },
  { path: 'reports', label: 'Reported Articles', icon: '⚠️' },
  { path: 'users', label: 'Manage Users', icon: '👥' },
]

export default function AdminDashboard() {
  const location = useLocation()
  const basePath = '/admin'

  return (
    <div className="admin-dashboard">
      <Container className="py-4">
        <div className="admin-header mb-4">
          <h1 className="admin-title">Admin Dashboard</h1>
          <p className="admin-subtitle">Moderate content and manage the platform</p>
        </div>

        <Row>
          <Col lg={3} className="mb-4 mb-lg-0">
            <div className="admin-sidebar card-modern p-3">
              <BSNav className="flex-column admin-nav">
                {ADMIN_NAV.map((item) => (
                  <BSNav.Item key={item.path}>
                    <BSNav.Link
                      as={Link}
                      to={item.path ? `${basePath}/${item.path}` : basePath}
                      active={(item.path ? location.pathname === `${basePath}/${item.path}` : location.pathname === basePath)}
                      className="admin-nav-link"
                    >
                      <span className="nav-icon">{item.icon}</span>
                      {item.label}
                    </BSNav.Link>
                  </BSNav.Item>
                ))}
              </BSNav>
              <Link to="/" className="btn btn-outline-secondary w-100 mt-3">← Back to Site</Link>
            </div>
          </Col>
          <Col lg={9}>
            <div className="admin-content card-modern p-4">
              <Routes>
                <Route index element={<AdminHome />} />
                <Route path="articles" element={<ManageArticles />} />
                <Route path="reports" element={<ReportedArticles />} />
                <Route path="users" element={<ManageUsers />} />
              </Routes>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
