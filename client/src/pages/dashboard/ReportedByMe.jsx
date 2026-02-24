import { Table, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MOCK_REPORTS = [
  { id: '1', articleTitle: 'Suspicious Article XYZ', reason: 'Fake news', status: 'Under Review', reportDate: new Date().toISOString() },
  { id: '2', articleTitle: 'Another Report', reason: 'Spam', status: 'Action Taken', reportDate: new Date(Date.now() - 86400000).toISOString() },
]

export default function ReportedByMe() {
  const getStatusBadge = (status) => {
    const variants = { 'Under Review': 'warning', 'Action Taken': 'success', 'Ignored': 'secondary' }
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>
  }

  return (
    <div>
      <h2 className="section-title mb-4">Reported by You</h2>
      <p className="text-muted mb-4">Articles you have reported. Status is updated by admins.</p>
      <Table hover className="dashboard-table">
        <thead>
          <tr>
            <th>Article</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_REPORTS.map((r) => (
            <tr key={r.id}>
              <td><Link to={`/article/${r.id}`}>{r.articleTitle}</Link></td>
              <td>{r.reason}</td>
              <td>{getStatusBadge(r.status)}</td>
              <td>{new Date(r.reportDate).toLocaleDateString()}</td>
            </tr>
          ))}
          {MOCK_REPORTS.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center text-muted py-4">No reports yet.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}
