import { Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const STATS = [
  { label: 'Total Users', value: 1250, icon: '👥', color: '#3b82f6' },
  { label: 'Total Articles', value: 342, icon: '📝', color: '#10b981' },
  { label: 'Total Reports', value: 23, icon: '⚠️', color: '#f59e0b' },
  { label: 'Most Reported', value: 5, icon: '🔴', color: '#ef4444' },
]

export default function AdminHome() {
  return (
    <div>
      <h2 className="section-title mb-4">Stats Overview</h2>
      <Row className="g-4 mb-5">
        {STATS.map((stat) => (
          <Col md={6} lg={3} key={stat.label}>
            <Card className="admin-stat-card border-0 h-100">
              <Card.Body>
                <div className="admin-stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
                  {stat.icon}
                </div>
                <h3 className="admin-stat-value">{stat.value}</h3>
                <p className="admin-stat-label">{stat.label}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h5 className="section-title mb-3">Quick Actions</h5>
      <Row>
        <Col md={4}>
          <Card className="quick-action-card">
            <Card.Body>
              <h6>Review Pending Reports</h6>
              <p className="text-muted small mb-0">5 reports awaiting review</p>
              <Link to="/admin/reports" className="btn btn-sm btn-primary mt-2">View Reports</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="quick-action-card">
            <Card.Body>
              <h6>Manage Articles</h6>
              <p className="text-muted small mb-0">Filter and moderate articles</p>
              <Link to="/admin/articles" className="btn btn-sm btn-outline-primary mt-2">Manage</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="quick-action-card">
            <Card.Body>
              <h6>User Management</h6>
              <p className="text-muted small mb-0">Ban/unban users</p>
              <Link to="/admin/users" className="btn btn-sm btn-outline-primary mt-2">Manage Users</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
