# NewsHub - News & Blog Platform (Client)

A futuristic, light-themed frontend for the NewsHub MERN stack application.

## Tech Stack

- **React 18** + **Vite**
- **Bootstrap 5** + Custom CSS (no Tailwind)
- **React Router**
- **React Bootstrap**

## Setup

```bash
cd client
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

## Mock Credentials

- **Regular user**: Any email/password (e.g. `user@example.com` / `123456`)
- **Admin**: `admin@admin.com` / any password

## Pages & Features

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Search, filters, Popular, Latest, AI Recommended, All Articles |
| Login | `/login` | JWT auth (mock) |
| Register | `/register` | User registration |
| Article Detail | `/article/:id` | Full article, likes, save, share, report, comments |
| User Dashboard | `/dashboard` | Overview, My Articles, Saved, Reported by Me |
| Create Article | `/create-article` | Rich text, cover image, category, tags, publish/draft |
| Profile Settings | `/profile-settings` | Username, password, profile picture |
| Admin Dashboard | `/admin` | Stats, Manage Articles, Reported Articles, Manage Users |

## Connecting to Backend

Replace mock data in components with API calls. Use the proxy in `vite.config.js`:

```js
// Example: fetch('/api/articles')
```

API base URL is proxied to `http://localhost:5000`.
