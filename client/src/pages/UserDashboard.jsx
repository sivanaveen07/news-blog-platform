import { Routes, Route, Link, useLocation, } from 'react-router-dom'
import { Container, Row, Col, Nav as BSNav } from 'react-bootstrap'
import DashboardHome from './dashboard/DashboardHome'
import MyArticles from './dashboard/MyArticles'
import SavedArticles from './dashboard/SavedArticles'
import ReportedByMe from './dashboard/ReportedByMe'
import './UserDashboard.css'

const NAV_ITEMS = [
  { path: '', label: 'Overview', icon: '📊' },
  { path: 'articles', label: 'My Articles', icon: '📝' },
  { path: 'saved', label: 'Saved Articles', icon: '📌' },
  { path: 'reported', label: 'Reported by Me', icon: '⚠️' },
]

export default function UserDashboard() {
  const location = useLocation()
  const basePath = '/dashboard'

  return (
    <div className="user-dashboard">
      <Container className="py-4">
        <Row>
          <Col lg={3} className="mb-4 mb-lg-0">
            <div className="dashboard-sidebar card-modern p-3">
              <h5 className="sidebar-title">Dashboard</h5>
              <BSNav className="flex-column dashboard-nav">
                {NAV_ITEMS.map((item) => (
                  <BSNav.Item key={item.path}>
                    <BSNav.Link
                      as={Link}
                      to={item.path ? `${basePath}/${item.path}` : basePath}
                      active={(item.path ? location.pathname === `${basePath}/${item.path}` : location.pathname === basePath)}
                      className="dashboard-nav-link"
                    >
                      <span className="nav-icon">{item.icon}</span>
                      {item.label}
                    </BSNav.Link>
                  </BSNav.Item>
                ))}
              </BSNav>
              <Link to="/create-article" className="btn btn-primary w-100 mt-3">
                ✏️ Create Article
              </Link>
              <Link to="/profile-settings" className="btn btn-outline-secondary w-100 mt-2">
                ⚙️ Profile Settings
              </Link>
            </div>
          </Col>
          <Col lg={9}>
            <div className="dashboard-content">
              <Routes>
                <Route index element={<DashboardHome />} />
                <Route path="articles" element={<MyArticles />} />
                <Route path="saved" element={<SavedArticles />} />
                <Route path="reported" element={<ReportedByMe />} />
              </Routes>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
