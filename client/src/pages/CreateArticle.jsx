import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button, Card, Image } from 'react-bootstrap'
import './CreateArticle.css'

const CATEGORIES = ['News', 'Blogs', 'Technology', 'Politics', 'Education', 'Sports', 'AI / ML']

export default function CreateArticle() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')
  const [imagePreview, setImagePreview] = useState(null) // For UI preview
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real MERN app, you would upload this to ImageKit/Cloudinary here
      // For now, we create a local URL to show the preview
      setImagePreview(URL.createObjectURL(file));
    }
  }

  const handleSubmit = (e, isDraft = false) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      alert(isDraft ? 'Draft saved!' : 'Article published!')
      navigate('/dashboard')
      setLoading(false)
    }, 800)
  }

  return (
    <div className="create-article-page">
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="page-title">Create Article</h1>
          <Button variant="outline-secondary" onClick={() => navigate('/dashboard')}>← Back</Button>
        </div>

        <Card className="create-article-card card-modern">
          <Card.Body className="p-4">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter article title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>

              {/* NEW: Image Upload Field */}
              <Form.Group className="mb-4">
                <Form.Label>Cover Image</Form.Label>
                <Form.Control 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  className="mb-2"
                />
                {imagePreview && (
                  <div className="image-preview-container mt-2">
                    <Image src={imagePreview} rounded className="img-thumbnail" style={{maxHeight: '200px'}} />
                    <Button variant="link" size="sm" className="text-danger d-block" onClick={() => setImagePreview(null)}>Remove</Button>
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Category</Form.Label>
                <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} required>
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  placeholder="Write your story..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="create-actions">
                <Button type="button" variant="outline-secondary" onClick={(e) => handleSubmit(e, true)}>
                  Save Draft
                </Button>
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? 'Publishing...' : 'Publish Article'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}