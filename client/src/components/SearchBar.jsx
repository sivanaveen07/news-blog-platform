import { useState } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import './SearchBar.css'

export default function SearchBar({ onSearch, placeholder = 'Search articles by title, tags, or author...' }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <Form onSubmit={handleSubmit} className="search-bar-modern">
      <InputGroup>
        <Form.Control
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input-modern"
        />
        <Button type="submit" variant="primary" className="search-btn">
          Search
        </Button>
      </InputGroup>
    </Form>
  )
}
